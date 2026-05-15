import * as cheerio from 'cheerio'
import { fetchHtml } from './fetcher.js'
import { saveCheckpoint, loadCheckpoint, generateRunId } from './checkpoint.js'
import type { DomainConfig } from '../config/seeds-foerderung.js'

export interface CrawledPage {
  url: string
  domainLabel: string
  region: string
  rawText: string
  title: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url)
    u.hash = ''
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'ref', 'fbclid'])
      u.searchParams.delete(k)
    // Remove trailing slash for dedup
    return u.href.replace(/\/$/, '')
  } catch {
    return url
  }
}

function extractLinks(html: string, base: string): string[] {
  const $ = cheerio.load(html)
  const links: string[] = []
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') ?? ''
    try { links.push(new URL(href, base).href) } catch { /* skip */ }
  })
  return links
}

function extractPage(html: string): { text: string; title: string } {
  const $ = cheerio.load(html)
  const title = $('h1').first().text().trim() || $('title').first().text().trim()
  $(
    'nav, footer, header, script, style, noscript, iframe, ' +
    '.cookie-banner, #cookie-consent, .breadcrumb, .pagination, ' +
    '.sidebar, aside, .teaser-list, .related'
  ).remove()
  const text = ($('main, article, .content, #content, .main-content, body').first().text())
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 10_000)
  return { text, title }
}

function isRelevant(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase()
  return keywords.filter(kw => lower.includes(kw)).length >= 3
}

// Simple semaphore for concurrency control
class Semaphore {
  private queue: Array<() => void> = []
  constructor(private slots: number) {}
  acquire(): Promise<void> {
    if (this.slots > 0) { this.slots--; return Promise.resolve() }
    return new Promise(resolve => this.queue.push(resolve))
  }
  release(): void {
    if (this.queue.length > 0) { this.queue.shift()!() } else { this.slots++ }
  }
}

// ── Main crawler ──────────────────────────────────────────────────────────────

export interface CrawlOptions {
  keywords: string[]
  maxDepth?: number
  concurrency?: number
  delayMs?: number
  resumeRunId?: string
  checkpointPrefix?: string
}

export async function crawlDomains(
  domains: DomainConfig[],
  opts: CrawlOptions,
): Promise<CrawledPage[]> {
  const {
    keywords,
    maxDepth = 3,
    concurrency = 4,
    delayMs = 1200,
    checkpointPrefix = 'crawl',
  } = opts

  const runId = opts.resumeRunId ?? generateRunId(checkpointPrefix)
  const checkpoint = opts.resumeRunId ? loadCheckpoint(runId) : null

  // Restore or initialize state
  const visited = new Set<string>(checkpoint?.visitedUrls ?? [])
  const results: CrawledPage[] = (checkpoint?.results ?? []) as CrawledPage[]

  type QueueItem = { url: string; depth: number; domain: string }
  const queue: QueueItem[] = checkpoint?.pendingQueue as QueueItem[] ?? []

  if (!checkpoint) {
    for (const d of domains) {
      for (const seed of d.seeds) {
        const url = normalizeUrl(d.origin + seed)
        queue.push({ url, depth: 0, domain: d.origin })
      }
    }
    console.log(`[Crawler] New run ${runId} – ${queue.length} seed URLs`)
  } else {
    console.log(`[Crawler] Resuming ${runId} – ${queue.length} pending, ${visited.size} visited`)
  }

  const domainMap = new Map(domains.map(d => [d.origin, d]))
  const sem = new Semaphore(concurrency)
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

  // Checkpoint every 50 pages
  let pageCount = 0
  const CHECKPOINT_EVERY = 50

  async function processItem(item: QueueItem): Promise<void> {
    await sem.acquire()
    const url = normalizeUrl(item.url)
    const config = domainMap.get(item.domain)

    try {
      if (visited.has(url) || !config) return
      if (!url.startsWith(config.origin)) return
      if (config.skipPatterns.some(re => re.test(url))) return
      if (visited.size >= config.maxPages) return

      visited.add(url)
      const shortUrl = url.replace(config.origin, '')
      process.stdout.write(`  [${config.label}] ${shortUrl.slice(0, 70)} … `)

      const html = await fetchHtml(url)
      const { text, title } = extractPage(html)

      // Discover new links
      if (item.depth < maxDepth) {
        const links = extractLinks(html, url)
        for (const link of links) {
          const norm = normalizeUrl(link)
          if (!visited.has(norm) && norm.startsWith(config.origin)) {
            queue.push({ url: norm, depth: item.depth + 1, domain: config.origin })
          }
        }
      }

      if (isRelevant(text, keywords)) {
        results.push({ url, domainLabel: config.label, region: config.region, rawText: text, title })
        console.log(`✓ (${title.slice(0, 50)})`)
      } else {
        console.log(`–`)
      }

      pageCount++
      if (pageCount % CHECKPOINT_EVERY === 0) {
        saveCheckpoint(runId, {
          runId,
          startedAt: new Date().toISOString(),
          visitedUrls: Array.from(visited),
          pendingQueue: queue,
          results,
        })
        console.log(`  [Checkpoint saved – ${results.length} relevant pages so far]`)
      }

      await sleep(delayMs + Math.random() * 500)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.log(`✗ ${msg}`)
    } finally {
      sem.release()
    }
  }

  // Process queue with concurrency
  while (queue.length > 0) {
    const batch = queue.splice(0, concurrency * 2)
    await Promise.all(batch.map(item => processItem(item)))
  }

  // Final checkpoint
  saveCheckpoint(runId, {
    runId,
    startedAt: new Date().toISOString(),
    visitedUrls: Array.from(visited),
    pendingQueue: [],
    results,
  })

  console.log(`\n[Crawler] Done – ${results.length} relevant pages from ${visited.size} visited`)
  return results
}
