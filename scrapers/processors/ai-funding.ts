import Anthropic from '@anthropic-ai/sdk'
import type { Funding } from '../../src/types.js'
import type { CrawledPage } from '../core/crawler.js'

const client = new Anthropic()

const SYSTEM = `Du bist Experte für deutsche Förderprogramme und staatliche Zuschüsse.
Antworte AUSSCHLIESSLICH mit einem validen JSON-Array. Kein Markdown, keine Erklärungen, kein Text davor oder danach.`

function buildPrompt(page: CrawledPage): string {
  return `Analysiere diesen Webseiteninhalt und extrahiere ALLE Förderprogramme.

Quelle: ${page.url}
Anbieter: ${page.domainLabel}
Region: ${page.region}
Seitentitel: ${page.title}

Inhalt:
---
${page.rawText}
---

Gib ein JSON-Array zurück. Jedes gefundene Programm als Objekt:
{
  "id": "kebab-case-id-ohne-sonderzeichen",
  "title": "Offizieller vollständiger Programmname",
  "beschreibung": "2-3 präzise Sätze: was wird gefördert, Förderhöhe, wer ist förderfähig",
  "typ": "Zuschuss" | "Kredit" | "Steuervorteil",
  "quelle": "EU" | "Bund" | "Bundesland",
  "foerderer": "Name der Förderinstitution",
  "max_betrag": Zahl in Euro (nur Zahl, kein €-Zeichen) oder null,
  "zins": "z.B. ab 1,5 % p.a." oder null,
  "antrag_url": "DIREKTE URL zur Antragsseite oder ${page.url} falls keine spezifischere URL gefunden",
  "bearbeitungszeit_wochen": [min_wochen, max_wochen],
  "ausschlusskriterien": ["Ausschlusskriterium 1", "..."],
  "benoetigte_dokumente": [
    {"name": "Dokumentname", "auto": false}
  ],
  "gilt_fuer": {
    "rechtsformen": ["alle"] oder ["GmbH", "AG", "UG (haftungsbeschränkt)", "GbR", "e.K.", "Einzelunternehmen"],
    "mitarbeiter_max": Zahl oder null,
    "umsatz_max": "z.B. 50 Mio. €" oder null,
    "bundeslaender": ["alle"] oder ["Bayern", "NRW", ...]
  },
  "relevanz_boost": {
    "branchen": aus dieser Liste wählen: ["Software / IT", "Produktion / Fertigung", "Handel / E-Commerce", "Dienstleistungen", "Bau / Handwerk", "Gastronomie / Hotellerie", "Gesundheit", "Landwirtschaft"],
    "mitarbeiter": aus ["1–9", "10–49", "50–249", "250+"]
  }
}

WICHTIG:
- "antrag_url" muss eine echte, direkte URL zur Antragsseite sein
- Fehlende Werte: null setzen, nicht weglassen
- Wenn kein konkretes Programm vorhanden: leeres Array [] zurückgeben
- Schätze Bearbeitungszeiten wenn nicht explizit genannt`
}

export async function extractFundings(pages: CrawledPage[]): Promise<Funding[]> {
  const all: Funding[] = []
  const seenIds = new Set<string>()

  console.log(`\n[AI-Förderung] Verarbeite ${pages.length} Seiten …`)

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
      const programs: Funding[] = JSON.parse(cleaned)

      if (!Array.isArray(programs)) { console.log('✗ kein Array'); continue }

      let added = 0
      for (const p of programs) {
        if (!p.id || seenIds.has(p.id)) continue
        // Ensure antrag_url is set
        if (!p.antrag_url) p.antrag_url = page.url
        seenIds.add(p.id)
        all.push(p)
        added++
      }
      console.log(`✓ ${added} Programme`)
    } catch (err) {
      console.log(`✗ ${err instanceof Error ? err.message : err}`)
    }
  }

  console.log(`[AI-Förderung] Gesamt: ${all.length} eindeutige Programme`)
  return all
}
