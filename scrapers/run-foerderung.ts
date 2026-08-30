/**
 * Förder-Scraper – komplett ohne API, nur Keyword-Scanning + Regex
 *
 * npm run scrape:foerderung
 * npm run scrape:foerderung -- --dry-run
 * npm run scrape:foerderung -- --domain=kfw
 * npm run scrape:foerderung -- --priority=high
 * npm run scrape:foerderung -- --resume=<runId>
 * npm run scrape:foerderung -- --concurrency=6
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { loadEnv } from './env.js'
import { ALL_FUNDING_DOMAINS, PROGRAM_KEYWORDS } from './config/seeds-foerderung.js'
import { crawlDomains } from './core/crawler.js'
import { batchExtractFundings } from './processors/keyword-extractor.js'
import { touchFundingsUpdatedAt } from './core/meta.js'
import type { Funding } from '../src/types.js'

loadEnv()

const __dir = dirname(fileURLToPath(import.meta.url))
const FUNDINGS_PATH = resolve(__dir, '../src/data/fundings.json')

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const domainFilter = args.find(a => a.startsWith('--domain='))?.split('=')[1]?.toLowerCase()
const priorityFilter = args.find(a => a.startsWith('--priority='))?.split('=')[1]
const resumeRunId = args.find(a => a.startsWith('--resume='))?.split('=')[1]
const concurrency = parseInt(args.find(a => a.startsWith('--concurrency='))?.split('=')[1] ?? '4')

function loadExisting(): Funding[] {
  if (!existsSync(FUNDINGS_PATH)) return []
  return JSON.parse(readFileSync(FUNDINGS_PATH, 'utf-8'))
}

function mergeAndSave(existing: Funding[], fresh: Funding[]): Funding[] {
  const map = new Map(existing.map(f => [f.id, f]))
  for (const f of fresh) map.set(f.id, f)
  const merged = Array.from(map.values()).sort((a, b) => (b.max_betrag ?? 0) - (a.max_betrag ?? 0))
  writeFileSync(FUNDINGS_PATH, JSON.stringify(merged, null, 2))
  return merged
}

async function main() {
  console.log('╔════════════════════════════════════════════════════╗')
  console.log('║   ComplianceKit – Förder-Scraper (kein API)        ║')
  console.log('╚════════════════════════════════════════════════════╝\n')

  if (dryRun) console.log('⚠  DRY RUN\n')

  let domains = ALL_FUNDING_DOMAINS
  if (domainFilter) domains = domains.filter(d =>
    d.label.toLowerCase().includes(domainFilter) || d.region.toLowerCase().includes(domainFilter)
  )
  if (priorityFilter) domains = domains.filter(d => d.priority === priorityFilter)

  console.log(`Domains: ${domains.length} | Concurrency: ${concurrency}\n`)

  const { pages, htmlMap } = await crawlDomains(domains, {
    keywords: PROGRAM_KEYWORDS,
    maxDepth: 3,
    concurrency,
    delayMs: 1200,
    resumeRunId,
    checkpointPrefix: 'foerderung',
  })

  console.log(`\n══ ${pages.length} relevante Seiten gecrawlt ══\n`)
  if (pages.length === 0) { console.log('Nichts gefunden.'); return }

  if (dryRun) {
    pages.forEach(p => console.log(`  • [${p.region}] ${p.title} → ${p.url}`))
    return
  }

  const fresh = batchExtractFundings(pages, htmlMap)
  const existing = loadExisting()
  const merged = mergeAndSave(existing, fresh)
  touchFundingsUpdatedAt()

  console.log('\n══ Ergebnis ══════════════════════════════════════════')
  console.log(`  Vorher  : ${existing.length} Programme`)
  console.log(`  Neu     : ${fresh.length} Programme`)
  console.log(`  Gesamt  : ${merged.length} Programme`)
  console.log(`  Datei   : ${FUNDINGS_PATH}`)
  console.log('═════════════════════════════════════════════════════')
}

main().catch(e => { console.error('✗ Fatal:', e); process.exit(1) })
