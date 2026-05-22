/**
 * Regulatorik-Scraper – kein API, nur Keyword-Scanning + Regex
 *
 * npm run scrape:regulatorik
 * npm run scrape:regulatorik -- --dry-run
 * npm run scrape:regulatorik -- --domain=bsi
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { loadEnv } from './env.js'
import { ALL_REGULATION_DOMAINS, REGULATION_KEYWORDS } from './config/seeds-regulatorik.js'
import { crawlDomains } from './core/crawler.js'
import { batchExtractRegulations } from './processors/keyword-extractor.js'
import type { Regulation } from '../src/types.js'

loadEnv()

const __dir = dirname(fileURLToPath(import.meta.url))
const REGULATIONS_PATH = resolve(__dir, '../src/data/regulations.json')

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const domainFilter = args.find(a => a.startsWith('--domain='))?.split('=')[1]?.toLowerCase()
const resumeRunId = args.find(a => a.startsWith('--resume='))?.split('=')[1]
const concurrency = parseInt(args.find(a => a.startsWith('--concurrency='))?.split('=')[1] ?? '3')

function loadExisting(): Regulation[] {
  if (!existsSync(REGULATIONS_PATH)) return []
  return JSON.parse(readFileSync(REGULATIONS_PATH, 'utf-8'))
}

function mergeAndSave(existing: Regulation[], fresh: Regulation[]): Regulation[] {
  const map = new Map(existing.map(r => [r.id, r]))
  for (const r of fresh) map.set(r.id, r)
  const merged = Array.from(map.values())
  writeFileSync(REGULATIONS_PATH, JSON.stringify(merged, null, 2))
  return merged
}

async function main() {
  console.log('╔════════════════════════════════════════════════════╗')
  console.log('║   ComplianceKit – Regulatorik-Scraper (kein API)   ║')
  console.log('╚════════════════════════════════════════════════════╝\n')

  if (dryRun) console.log('⚠  DRY RUN\n')

  let domains = ALL_REGULATION_DOMAINS
  if (domainFilter) domains = domains.filter(d =>
    d.label.toLowerCase().includes(domainFilter) || d.origin.toLowerCase().includes(domainFilter)
  )

  const { pages } = await crawlDomains(domains, {
    keywords: REGULATION_KEYWORDS,
    maxDepth: 2,
    concurrency,
    delayMs: 1500,
    resumeRunId,
    checkpointPrefix: 'regulatorik',
  })

  console.log(`\n══ ${pages.length} relevante Seiten gecrawlt ══\n`)
  if (pages.length === 0) { console.log('Nichts gefunden.'); return }

  if (dryRun) {
    pages.forEach(p => console.log(`  • ${p.title} → ${p.url}`))
    return
  }

  const fresh = batchExtractRegulations(pages)
  const existing = loadExisting()
  const merged = mergeAndSave(existing, fresh)

  console.log('\n══ Ergebnis ══════════════════════════════════════════')
  console.log(`  Vorher  : ${existing.length} Pflichten`)
  console.log(`  Neu     : ${fresh.length} Pflichten`)
  console.log(`  Gesamt  : ${merged.length} Pflichten`)
  console.log('═════════════════════════════════════════════════════')
}

main().catch(e => { console.error('✗ Fatal:', e); process.exit(1) })
