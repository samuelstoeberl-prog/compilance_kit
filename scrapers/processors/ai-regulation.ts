import Anthropic from '@anthropic-ai/sdk'
import type { Regulation } from '../../src/types.js'
import type { CrawledPage } from '../core/crawler.js'

const client = new Anthropic()

const SYSTEM = `Du bist Experte für deutsches und europäisches Unternehmensrecht und Compliance.
Antworte AUSSCHLIESSLICH mit einem validen JSON-Array. Kein Markdown, kein Text davor oder danach.`

function buildPrompt(page: CrawledPage): string {
  return `Analysiere diesen Gesetzestext / Behördenseite und extrahiere alle Compliance-Pflichten für KMU.

Quelle: ${page.url}
Behörde: ${page.domainLabel}
Titel: ${page.title}

Inhalt:
---
${page.rawText}
---

Gib ein JSON-Array zurück. Jede Pflicht als Objekt:
{
  "id": "kebab-case-id",
  "title": "Kurzname der Pflicht (z.B. 'NIS2-Meldepflicht', 'DSGVO-Datenschutzbeauftragter')",
  "category": "Datenschutz" | "IT-Sicherheit" | "Arbeitsrecht" | "Buchführung" | "Umwelt" | "Lieferkette" | "Vertragsrecht" | "Sonstiges",
  "beschreibung": "2-3 Sätze: Was muss das Unternehmen konkret tun? Welche Frist gilt? Welche Sanktion droht?",
  "rechtsgrundlage": "z.B. 'Art. 33 DSGVO' oder '§ 8a BSIG'",
  "quelle_url": "${page.url}",
  "gilt_fuer": {
    "rechtsformen": ["alle"] oder spezifische Liste,
    "branchen": ["alle"] oder spezifische Branchen,
    "mitarbeiter_min": Mindestzahl oder null
  },
  "hat_dokument_generator": false
}

WICHTIG:
- Nur echte, konkrete Pflichten (keine allgemeinen Empfehlungen)
- "quelle_url" ist die direkte URL zur Rechtsgrundlage
- Kein Programm: leeres Array [] zurückgeben`
}

export async function extractRegulations(pages: CrawledPage[]): Promise<Regulation[]> {
  const all: Regulation[] = []
  const seenIds = new Set<string>()

  console.log(`\n[AI-Regulatorik] Verarbeite ${pages.length} Seiten …`)

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    process.stdout.write(`  [${i + 1}/${pages.length}] ${page.title.slice(0, 55)} … `)

    try {
      const msg = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 3000,
        system: SYSTEM,
        messages: [{ role: 'user', content: buildPrompt(page) }],
      })

      const raw = msg.content[0].type === 'text' ? msg.content[0].text.trim() : '[]'
      const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim()
      const regs: Regulation[] = JSON.parse(cleaned)

      if (!Array.isArray(regs)) { console.log('✗ kein Array'); continue }

      let added = 0
      for (const r of regs) {
        if (!r.id || seenIds.has(r.id)) continue
        seenIds.add(r.id)
        all.push(r)
        added++
      }
      console.log(`✓ ${added} Pflichten`)
    } catch (err) {
      console.log(`✗ ${err instanceof Error ? err.message : err}`)
    }
  }

  console.log(`[AI-Regulatorik] Gesamt: ${all.length} eindeutige Pflichten`)
  return all
}
