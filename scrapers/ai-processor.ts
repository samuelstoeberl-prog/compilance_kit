import Anthropic from '@anthropic-ai/sdk'
import type { Funding } from '../src/types.js'
import type { CrawledPage } from './crawler.js'

const client = new Anthropic()

const SYSTEM_PROMPT = `Du bist ein Experte für deutsche Förderprogramme.
Du analysierst Texte von Webseiten und extrahierst strukturierte Daten über Förderprogramme für KMU.
Antworte ausschließlich mit validen JSON-Arrays. Kein Markdown, keine Erklärungen.`

const USER_PROMPT_TEMPLATE = (page: CrawledPage) => `
Analysiere diesen Seitentext und extrahiere ALLE Förderprogramme, die du darin findest.

Quelle: ${page.url}
Anbieter: ${page.domainLabel}
Seitentitel: ${page.title}

Seiteninhalt:
---
${page.rawText}
---

Gib ein JSON-Array zurück. Für jedes gefundene Programm:
{
  "id": "eindeutiger-kebab-case-identifier",
  "title": "Offizieller Programmname",
  "beschreibung": "1-2 Sätze: was wird gefördert, wie hoch, für wen",
  "typ": "Zuschuss" | "Kredit" | "Steuervorteil",
  "quelle": "EU" | "Bund" | "Bundesland",
  "foerderer": "Name der Förderinstitution",
  "max_betrag": Zahl in Euro oder null,
  "zins": "z.B. ab 1,5 %" oder null,
  "antrag_url": "${page.url}",
  "bearbeitungszeit_wochen": [min, max],
  "ausschlusskriterien": ["...", "..."],
  "benoetigte_dokumente": [{"name": "...", "auto": false}],
  "gilt_fuer": {
    "rechtsformen": ["alle"] oder ["GmbH", "AG", ...],
    "mitarbeiter_max": Zahl oder null,
    "umsatz_max": "z.B. 50 Mio. €" oder null,
    "bundeslaender": ["alle"] oder ["Bayern", "NRW", ...]
  },
  "relevanz_boost": {
    "branchen": ["Software / IT", "Produktion / Fertigung", ...],
    "mitarbeiter": ["1–9", "10–49", "50–249", "250+"]
  }
}

Wenn die Seite kein konkretes Förderprogramm beschreibt (nur Navigation, Kontakt, etc.), gib [] zurück.
Fehlende Informationen: schätze sinnvoll oder setze null.
`

export async function processPages(pages: CrawledPage[]): Promise<Funding[]> {
  const all: Funding[] = []
  const seenIds = new Set<string>()

  console.log(`\n[AI] Processing ${pages.length} pages with Claude …`)

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    process.stdout.write(`  [${i + 1}/${pages.length}] ${page.title.slice(0, 60)} … `)

    try {
      const msg = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: USER_PROMPT_TEMPLATE(page) }],
      })

      const raw = msg.content[0].type === 'text' ? msg.content[0].text.trim() : '[]'

      // Strip accidental markdown fences
      const cleaned = raw.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim()
      const programs: Funding[] = JSON.parse(cleaned)

      if (!Array.isArray(programs)) {
        console.log('✗ AI returned non-array')
        continue
      }

      // Deduplicate by id
      let added = 0
      for (const p of programs) {
        if (!p.id || seenIds.has(p.id)) continue
        seenIds.add(p.id)
        all.push(p)
        added++
      }
      console.log(`✓ ${added} programme extrahiert`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.log(`✗ error: ${msg}`)
    }
  }

  console.log(`[AI] Total: ${all.length} unique Förderprogramme`)
  return all
}
