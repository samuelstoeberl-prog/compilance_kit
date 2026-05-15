/**
 * ComplianceKit – Förder-Scraper
 *
 * Usage:
 *   npx tsx scrapers/run.ts                  # crawl all domains, update fundings.json
 *   npx tsx scrapers/run.ts --domain kfw     # only crawl domains whose label matches
 *   npx tsx scrapers/run.ts --dry-run        # crawl but skip AI + file write
 *
 * Requires: VITE_ANTHROPIC_API_KEY in .env.local
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { config } from './env.js'
import { DOMAINS } from './seeds.js'
import { crawlDomain } from './crawler.js'
import { processPages } from './ai-processor.js'
import type { Funding } from '../src/types.js'

// Load env before anything else
config()

const __dir = dirname(fileURLToPath(import.meta.url))
const FUNDINGS_PATH = resolve(__dir, '../src/data/fundings.json')

// ── CLI args ────────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const domainFilter = args.find(a => a.startsWith('--domain='))?.split('=')[1]?.toLowerCase()
const dryRun = args.includes('--dry-run')

// ── Helpers ─────────────────────────────────────────────────────────────────
function loadExisting(): Funding[] {
  if (!existsSync(FUNDINGS_PATH)) return []
  return JSON.parse(readFileSync(FUNDINGS_PATH, 'utf-8'))
}

function mergeAndSave(existing: Funding[], fresh: Funding[]): Funding[] {
  const map = new Map<string, Funding>()
  for (const f of existing) map.set(f.id, f)
  // Fresh data overwrites existing; new ids are appended
  for (const f of fresh) map.set(f.id, f)
  const merged = Array.from(map.values())
  writeFileSync(FUNDINGS_PATH, JSON.stringify(merged, null, 2), 'utf-8')
  return merged
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('╔══════════════════════════════════════════════╗')
  console.log('║   ComplianceKit Förder-Scraper               ║')
  console.log('╚══════════════════════════════════════════════╝')
  if (dryRun) console.log('⚠  DRY RUN – no file will be written\n')

  const domains = domainFilter
    ? DOMAINS.filter(d => d.label.toLowerCase().includes(domainFilter))
    : DOMAINS

  if (domains.length === 0) {
    console.error(`No domain matched filter "${domainFilter}"`)
    process.exit(1)
  }

  console.log(`Domains to crawl: ${domains.map(d => d.label).join(', ')}\n`)

  // ── Step 1: Crawl all domains ────────────────────────────────────────────
  const allPages = []
  for (const domain of domains) {
    const pages = await crawlDomain(domain)
    allPages.push(...pages)
  }

  console.log(`\n══ Crawl complete: ${allPages.length} relevant pages collected ══`)

  if (allPages.length === 0) {
    console.log('Nothing to process.')
    return
  }

  if (dryRun) {
    console.log('Dry run – skipping AI processing and file write.')
    console.log('Pages that would be processed:')
    allPages.forEach(p => console.log(`  • ${p.title} (${p.url})`))
    return
  }

  // ── Step 2: AI extraction ────────────────────────────────────────────────
  if (!process.env.VITE_ANTHROPIC_API_KEY && !process.env.ANTHROPIC_API_KEY) {
    console.error('\n✗ No API key found. Set VITE_ANTHROPIC_API_KEY in .env.local')
    process.exit(1)
  }

  const freshFundings = await processPages(allPages)

  // ── Step 3: Merge with existing data ─────────────────────────────────────
  const existing = loadExisting()
  const merged = mergeAndSave(existing, freshFundings)

  console.log('\n══ Summary ══════════════════════════════════════')
  console.log(`  Previously in fundings.json : ${existing.length}`)
  console.log(`  Newly extracted             : ${freshFundings.length}`)
  console.log(`  Total after merge           : ${merged.length}`)
  console.log(`  Saved to                    : ${FUNDINGS_PATH}`)
  console.log('═════════════════════════════════════════════════')
}

main().catch(err => {
  console.error('\n✗ Fatal error:', err)
  process.exit(1)
})
