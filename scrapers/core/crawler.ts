import { fetchHtml, extractLinks, extractPageText, closeBrowser } from './fetcher.js'
import { saveCheckpoint, loadCheckpoint, generateRunId } from './checkpoint.js'
import type { DomainConfig } from '../config/seeds-foerderung.js'

export interface CrawledPage {
  url: string
  domainLabel: string
  region: string
  rawText: string
  title: string
}

// HTML-Map: url → rohes HTML (für Antrag-URL-Extraktion im Keyword-Extraktor)
export type HtmlMap = Map<string, string>

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url)
    u.hash = ''
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'ref', 'fbclid'])
      u.searchParams.delete(k)
    // Doppelte Sprachpräfixe entfernen (/DE/DE/ → /DE/, /de/de/ → /de/)
    u.pathname = u.pathname
      .replace(/\/DE\/DE\//gi, '/DE/')
      .replace(/\/de\/de\//gi, '/de/')
    return u.href.replace(/\/$/, '')
  } catch { return url }
}

function isRelevant(text: string, url: string, keywords: string[]): boolean {
  const lower = text.toLowerCase()
  const keywordHits = keywords.filter(kw => lower.includes(kw)).length
  if (keywordHits >= 2) return true
  // URL-basierte Relevanz: Förder-Seiten auch bei wenig Text aufnehmen
  const urlLower = url.toLowerCase()
  const urlRelevant = /foerd|zuschuss|kredit|programm|beihilfe|antrag|finanzier/.test(urlLower)
  return urlRelevant && keywordHits >= 1
}

class Semaphore {
  private queue: Array<() => void> = []
  constructor(private slots: number) {}
  acquire(): Promise<void> {
    if (this.slots > 0) { this.slots--; return Promise.resolve() }
    return new Promise(r => this.queue.push(r))
  }
  release() {
    if (this.queue.length > 0) this.queue.shift()!()
    else this.slots++
  }
}

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
): Promise<{ pages: CrawledPage[]; htmlMap: HtmlMap }> {
  const {
    keywords,
    maxDepth = 3,
    concurrency = 4,
    delayMs = 1200,
    checkpointPrefix = 'crawl',
  } = opts

  const runId = opts.resumeRunId ?? generateRunId(checkpointPrefix)
  const checkpoint = opts.resumeRunId ? loadCheckpoint(runId) : null

  const visited = new Set<string>(checkpoint?.visitedUrls ?? [])
  const pages: CrawledPage[] = (checkpoint?.results ?? []) as CrawledPage[]
  const htmlMap: HtmlMap = new Map()

  type QItem = { url: string; depth: number; domain: string }
  const queue: QItem[] = (checkpoint?.pendingQueue as QItem[]) ?? []

  if (!checkpoint) {
    for (const d of domains)
      for (const seed of d.seeds)
        queue.push({ url: normalizeUrl(d.origin + seed), depth: 0, domain: d.origin })
    console.log(`[Crawler] Start ${runId} – ${queue.length} Seeds, ${domains.length} Domains`)
  } else {
    console.log(`[Crawler] Resume ${runId} – ${queue.length} pending, ${visited.size} visited`)
  }

  const domainMap = new Map(domains.map(d => [d.origin, d]))
  const sem = new Semaphore(concurrency)
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
  let processed = 0

  async function crawlUrl(item: QItem): Promise<void> {
    await sem.acquire()
    const url = normalizeUrl(item.url)
    const cfg = domainMap.get(item.domain)
    try {
      if (visited.has(url) || !cfg) return
      if (!url.startsWith(cfg.origin)) return
      if (cfg.skipPatterns.some(re => re.test(url))) return
      if (visited.size >= cfg.maxPages) return

      visited.add(url)
      process.stdout.write(`  [${cfg.label}] ${url.replace(cfg.origin, '').slice(0, 70)} … `)

      const html = await fetchHtml(url)
      const { text, title } = extractPageText(html)

      if (item.depth < maxDepth) {
        for (const link of extractLinks(html, url)) {
          const n = normalizeUrl(link)
          if (!visited.has(n) && n.startsWith(cfg.origin) && !cfg.skipPatterns.some(re => re.test(n)))
            queue.push({ url: n, depth: item.depth + 1, domain: cfg.origin })
        }
      }

      if (isRelevant(text, url, keywords)) {
        const page: CrawledPage = { url, domainLabel: cfg.label, region: cfg.region, rawText: text.slice(0, 10_000), title }
        pages.push(page)
        htmlMap.set(url, html)
        console.log(`✓ (${pages.length}) "${title.slice(0, 50)}"`)
      } else {
        const hits = keywords.filter(kw => text.toLowerCase().includes(kw)).length
        console.log(`– (${hits} keywords, ${text.length} chars)`)
      }

      processed++
      if (processed % 50 === 0) {
        saveCheckpoint(runId, { runId, startedAt: new Date().toISOString(), visitedUrls: [...visited], pendingQueue: queue, results: pages })
        console.log(`  ── Checkpoint: ${pages.length} relevant, ${visited.size} besucht ──`)
      }

      await sleep(delayMs + Math.random() * 400)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      // Fehlertypen kategorisieren
      if (/429|rate.limit/i.test(msg)) console.log(`✗ [RATE-LIMIT] ${msg.slice(0, 80)}`)
      else if (/403|forbidden/i.test(msg)) console.log(`✗ [BLOCKED] ${msg.slice(0, 80)}`)
      else if (/timeout|ETIMEDOUT/i.test(msg)) console.log(`✗ [TIMEOUT]`)
      else if (/ENOTFOUND|ECONNREFUSED|CERT/i.test(msg)) console.log(`✗ [NETZ] ${msg.slice(0, 80)}`)
      else console.log(`✗ [ERR] ${msg.slice(0, 80)}`)
    } finally {
      sem.release()
    }
  }

  while (queue.length > 0) {
    const batch = queue.splice(0, concurrency * 3)
    await Promise.all(batch.map(crawlUrl))
  }

  await closeBrowser()

  saveCheckpoint(runId, { runId, startedAt: new Date().toISOString(), visitedUrls: [...visited], pendingQueue: [], results: pages })
  console.log(`\n[Crawler] Fertig – ${pages.length} relevante Seiten von ${visited.size} gecrawlt`)
  return { pages, htmlMap }
}
