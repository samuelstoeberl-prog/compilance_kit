import { Router } from 'express'
import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import { validateBody } from '../middleware/validate.js'

export const aiRouter = Router()

// API-Key liegt nur im Backend – nie im Frontend-Bundle
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const DocumentRequestSchema = z.object({
  typ: z.enum(['datenschutzerklaerung', 'impressum', 'arbeitszeitnachweis', 'arbeitsschutz-unterweisung']),
  profil: z.object({
    name: z.string().min(1).max(255),
    rechtsform: z.string().min(1),
    branche: z.string().min(1),
    mitarbeiter: z.string().min(1),
    bundesland: z.string().min(1),
    umsatz: z.string().min(1),
    gruendungsjahr: z.string().min(1),
  }),
})

const DOK_LABELS: Record<string, string> = {
  datenschutzerklaerung: 'Datenschutzerklärung (DSGVO-konform)',
  impressum: 'Impressum (DDG § 5)',
  arbeitszeitnachweis: 'Arbeitszeitnachweis (MiLoG § 17)',
  'arbeitsschutz-unterweisung': 'Arbeitsschutzunterweisung (ArbSchG § 12)',
}

// POST /api/ai/documents – AI-gestützte Dokumentgenerierung
// Der Key bleibt Server-seitig, das Frontend bekommt nur den fertigen Text
aiRouter.post('/documents', validateBody(DocumentRequestSchema), async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(503).json({ error: 'AI-Dokumentgenerierung nicht konfiguriert' })
    return
  }

  const { typ, profil } = req.body

  try {
    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: `Erstelle eine professionelle ${DOK_LABELS[typ]} für folgendes deutsches Unternehmen:

Unternehmensname: ${profil.name}
Rechtsform: ${profil.rechtsform}
Branche: ${profil.branche}
Mitarbeiter: ${profil.mitarbeiter}
Bundesland: ${profil.bundesland}
Jahresumsatz: ${profil.umsatz}
Gründungsjahr: ${profil.gruendungsjahr}

Das Dokument soll:
- Rechtlich korrekt und aktuell sein (Stand 2026)
- Auf die spezifische Branche und Rechtsform zugeschnitten sein
- Alle Pflichtangaben enthalten
- Platzhalter für firmenspezifische Angaben mit [PLATZHALTER] markieren
- In professionellem Deutsch verfasst sein

Gib NUR das fertige Dokument zurück, ohne Erklärungen.`,
      }],
    })

    const text = msg.content[0].type === 'text' ? msg.content[0].text : ''
    res.json({ content: text, typ, generated_at: new Date().toISOString() })
  } catch (err) {
    console.error('[POST /ai/documents]', err)
    res.status(500).json({ error: 'Dokumentgenerierung fehlgeschlagen' })
  }
})
