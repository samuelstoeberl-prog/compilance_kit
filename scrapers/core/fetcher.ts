// Browser-basierter Fetcher: Playwright (headless Chrome) mit fetch-Fallback.
// Playwright umgeht JS-Rendering-Schutz und ist schwerer als Bot erkennbar.

import * as cheerio from 'cheerio'

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15',
]

function randomUA() { return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)] }

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

// ── Playwright Browser-Pool ───────────────────────────────────────────────────
let browser: import('playwright').Browser | null = null
let playwrightAvailable = true

async function getBrowser(): Promise<import('playwright').Browser | null> {
  if (!playwrightAvailable) return null
  if (browser) return browser
  try {
    const { chromium } = await import('playwright')
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
        '--disable-infobars',
        '--window-size=1920,1080',
      ],
    })
    return browser
  } catch {
    playwrightAvailable = false
    console.log('  [Fetcher] Playwright nicht verfügbar – nutze fetch-Fallback')
    return null
  }
}

async function fetchWithPlaywright(url: string): Promise<string> {
  const b = await getBrowser()
  if (!b) throw new Error('Playwright nicht verfügbar')

  const ctx = await b.newContext({
    userAgent: randomUA(),
    locale: 'de-DE',
    viewport: { width: 1920, height: 1080 },
    extraHTTPHeaders: {
      'Accept-Language': 'de-DE,de;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  })
  const page = await ctx.newPage()

  // Ressourcen-Blocking: Bilder, Fonts, Media sparen Bandbreite
  await page.route('**/*', route => {
    const type = route.request().resourceType()
    if (['image', 'media', 'font', 'stylesheet'].includes(type)) return route.abort()
    return route.continue()
  })

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20_000 })
    // Kurz warten damit lazy-geladene Inhalte erscheinen
    await page.waitForTimeout(1500)
    return page.content()
  } finally {
    await ctx.close()
  }
}

async function fetchWithFetch(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': randomUA(),
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Language': 'de-DE,de;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'max-age=0',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
    },
    signal: AbortSignal.timeout(20_000),
    redirect: 'follow',
  })
  if (res.status === 429) {
    const wait = parseInt(res.headers.get('retry-after') ?? '10') * 1000
    await sleep(wait)
    throw new Error(`429 – retry after ${wait}ms`)
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

export async function fetchHtml(url: string, retries = 3): Promise<string> {
  for (let i = 0; i < retries; i++) {
    if (i > 0) await sleep(2 ** i * 1000)
    try {
      // Playwright zuerst, dann fetch als Fallback
      return playwrightAvailable
        ? await fetchWithPlaywright(url)
        : await fetchWithFetch(url)
    } catch (err) {
      if (i === retries - 1) throw err
    }
  }
  throw new Error('Max retries reached')
}

export function extractLinks(html: string, base: string): string[] {
  const $ = cheerio.load(html)
  const links: string[] = []
  $('a[href]').each((_, el) => {
    try { links.push(new URL($(el).attr('href')!, base).href) } catch { /* skip */ }
  })
  return links
}

export function extractPageText(html: string): { text: string; title: string; $: ReturnType<typeof cheerio.load> } {
  const $ = cheerio.load(html)
  const title = $('h1').first().text().trim() || $('title').first().text().trim()
  $('nav,footer,header,script,style,noscript,iframe,.cookie-banner,#cookie-consent,.breadcrumb,.pagination,.sidebar,aside').remove()
  const text = ($('main,article,.content,#content,.main-content,body').first().text())
    .replace(/\s+/g, ' ').trim()
  return { text, title, $ }
}

export async function closeBrowser() {
  if (browser) { await browser.close(); browser = null }
}
