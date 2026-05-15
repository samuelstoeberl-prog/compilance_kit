/**
 * Förder-Scraper
 *
 * npm run scrape:foerderung
 * npm run scrape:foerderung -- --dry-run
 * npm run scrape:foerderung -- --domain=kfw
 * npm run scrape:foerderung -- --resume=<runId>
 * npm run scrape:foerderung -- --concurrency=6
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { loadEnv } from './env.js'
import { ALL_FUNDING_DOMAINS, PROGRAM_KEYWORDS } from './config/seeds-foerderung.js'
import { crawlDomains } from './core/crawler.js'
import { extractFundings } from './processors/ai-funding.js'
import type { Funding } from '../src/types.js'

loadEnv()

const __dir = dirname(fileURLToPath(import.meta.url))
const FUNDINGS_PATH = resolve(__dir, '../src/data/fundings.json')

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const domainFilter = args.find(a => a.startsWith('--domain='))?.split('=')[1]?.toLowerCase()
const resumeRunId = args.find(a => a.startsWith('--resume='))?.split('=')[1]
const concurrency = parseInt(args.find(a => a.startsWith('--concurrency='))?.split('=')[1] ?? '4')
const priorityFilter = args.find(a => a.startsWith('--priority='))?.split('=')[1] as 'high' | 'medium' | 'low' | undefined

function loadExisting(): Funding[] {
  if (!existsSync(FUNDINGS_PATH)) return []
  return JSON.parse(readFileSync(FUNDINGS_PATH, 'utf-8'))
}

function mergeAndSave(existing: Funding[], fresh: Funding[]): Funding[] {
  const map = new Map(existing.map(f => [f.id, f]))
  for (const f of fresh) map.set(f.id, f)
  const merged = Array.from(map.values())
    .sort((a, b) => (b.max_betrag ?? 0) - (a.max_betrag ?? 0)) // sort by max amount desc
  writeFileSync(FUNDINGS_PATH, JSON.stringify(merged, null, 2))
  return merged
}

async function main() {
  console.log('╔════════════════════════════════════════════════════╗')
  console.log('║   ComplianceKit – Förder-Scraper                   ║')
  console.log('╚════════════════════════════════════════════════════╝\n')

  if (dryRun) console.log('⚠  DRY RUN – kein API-Call, kein Schreiben\n')

  let domains = ALL_FUNDING_DOMAINS
  if (domainFilter) domains = domains.filter(d => d.label.toLowerCase().includes(domainFilter) || d.region.toLowerCase().includes(domainFilter))
  if (priorityFilter) domains = domains.filter(d => d.priority === priorityFilter)

  console.log(`Domains: ${domains.map(d => d.label).join(', ')}\n`)
  console.log(`Quellen gesamt: ${domains.length} | Concurrency: ${concurrency}\n`)

  const pages = await crawlDomains(domains, {
    keywords: PROGRAM_KEYWORDS,
    maxDepth: 3,
    concurrency,
    delayMs: 1200,
    resumeRunId,
    checkpointPrefix: 'foerderung',
  })

  console.log(`\n══ Crawl abgeschlossen: ${pages.length} relevante Seiten ══\n`)

  if (pages.length === 0) { console.log('Keine Seiten zum Verarbeiten.'); return }

  if (dryRun) {
    console.log('Dry run – folgende Seiten würden verarbeitet:')
    pages.forEach(p => console.log(`  • [${p.region}] ${p.title} → ${p.url}`))
    return
  }

  if (!process.env.ANTHROPIC_API_KEY && !process.env.VITE_ANTHROPIC_API_KEY) {
    console.error('✗ VITE_ANTHROPIC_API_KEY fehlt in .env.local')
    process.exit(1)
  }

  const fresh = await extractFundings(pages)
  const existing = loadExisting()
  const merged = mergeAndSave(existing, fresh)

  console.log('\n══ Zusammenfassung ══════════════════════════════════')
  console.log(`  Vorher in fundings.json : ${existing.length}`)
  console.log(`  Neu extrahiert          : ${fresh.length}`)
  console.log(`  Gesamt nach Merge       : ${merged.length}`)
  console.log(`  Gespeichert             : ${FUNDINGS_PATH}`)
  console.log('═════════════════════════════════════════════════════')
}

main().catch(e => { console.error('✗ Fatal:', e); process.exit(1) })
