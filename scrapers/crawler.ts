import * as cheerio from 'cheerio'
import type { DomainConfig } from './seeds.js'
import { PROGRAM_KEYWORDS } from './seeds.js'

export interface CrawledPage {
  url: string
  domainLabel: string
  rawText: string
  title: string
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'ComplianceKit-Research-Bot/1.0 (contact: info@compliancekit.de)',
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Language': 'de-DE,de;q=0.9',
    },
    signal: AbortSignal.timeout(20_000),
    redirect: 'follow',
  })

  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const ct = res.headers.get('content-type') ?? ''
  if (!ct.includes('html')) throw new Error(`Not HTML (${ct})`)
  return res.text()
}

function extractLinks(html: string, base: string): string[] {
  const $ = cheerio.load(html)
  const links: string[] = []
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') ?? ''
    try {
      const resolved = new URL(href, base).href
      links.push(resolved)
    } catch {
      // ignore malformed hrefs
    }
  })
  return links
}

function extractText(html: string): { text: string; title: string } {
  const $ = cheerio.load(html)
  const title = $('title').first().text().trim()
  $('nav, footer, header, script, style, noscript, iframe, .cookie-banner, #cookie-consent, .breadcrumb').remove()
  const text = ($('main, article, .content, #content, body').first().text())
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 8_000)
  return { text, title }
}

function isRelevantPage(text: string): boolean {
  const lower = text.toLowerCase()
  const hits = PROGRAM_KEYWORDS.filter(kw => lower.includes(kw))
  return hits.length >= 3
}

function shouldSkipUrl(url: string, config: DomainConfig): boolean {
  return config.skipPatterns.some(re => re.test(url))
}

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url)
    u.hash = ''
    // Drop tracking params
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'ref']) {
      u.searchParams.delete(key)
    }
    return u.href
  } catch {
    return url
  }
}

export async function crawlDomain(config: DomainConfig): Promise<CrawledPage[]> {
  const visited = new Set<string>()
  const queue: Array<{ url: string; depth: number }> = []
  const results: CrawledPage[] = []

  const MAX_DEPTH = 3
  const CRAWL_DELAY_MS = 1_500

  // Seed the queue
  for (const seed of config.seeds) {
    const url = config.origin + seed
    queue.push({ url, depth: 0 })
  }

  console.log(`\n[${config.label}] Starting crawl – ${config.seeds.length} seeds, max ${config.maxPages} pages`)

  while (queue.length > 0 && visited.size < config.maxPages) {
    const item = queue.shift()!
    const url = normalizeUrl(item.url)

    if (visited.has(url)) continue
    if (!url.startsWith(config.origin)) continue
    if (shouldSkipUrl(url, config)) continue

    visited.add(url)
    process.stdout.write(`  [${visited.size}/${config.maxPages}] ${url.replace(config.origin, '')} … `)

    try {
      const html = await fetchHtml(url)
      const { text, title } = extractText(html)

      // Discover new links regardless of content quality
      if (item.depth < MAX_DEPTH) {
        const links = extractLinks(html, url)
        for (const link of links) {
          const norm = normalizeUrl(link)
          if (!visited.has(norm) && norm.startsWith(config.origin) && !shouldSkipUrl(norm, config)) {
            queue.push({ url: norm, depth: item.depth + 1 })
          }
        }
      }

      if (isRelevantPage(text)) {
        results.push({ url, domainLabel: config.label, rawText: text, title })
        console.log(`✓ relevant (${text.length} chars, "${title.slice(0, 50)}")`)
      } else {
        console.log(`– skipped (not a program page)`)
      }

      await sleep(CRAWL_DELAY_MS)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.log(`✗ error: ${msg}`)
      await sleep(500)
    }
  }

  console.log(`[${config.label}] Done – ${results.length} relevant pages from ${visited.size} crawled`)
  return results
}
