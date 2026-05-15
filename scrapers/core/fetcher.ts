// Browser-like HTTP fetcher with User-Agent rotation, full headers and retry logic

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
]

function randomUA(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]
}

function buildHeaders(url: string): Record<string, string> {
  const origin = new URL(url).origin
  return {
    'User-Agent': randomUA(),
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'de-DE,de;q=0.9,en-US;q=0.5,en;q=0.3',
    'Accept-Encoding': 'gzip, deflate, br',
    'DNT': '1',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
    'Cache-Control': 'max-age=0',
    'Referer': origin,
  }
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

export async function fetchHtml(url: string, retries = 3): Promise<string> {
  let lastError: Error = new Error('Unknown')

  for (let attempt = 0; attempt < retries; attempt++) {
    if (attempt > 0) await sleep(2 ** attempt * 1000) // 2s, 4s backoff

    try {
      const res = await fetch(url, {
        headers: buildHeaders(url),
        signal: AbortSignal.timeout(20_000),
        redirect: 'follow',
      })

      // Soft 403/429: wait and retry
      if (res.status === 429) {
        const retryAfter = parseInt(res.headers.get('retry-after') ?? '10')
        await sleep(retryAfter * 1000)
        continue
      }

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const ct = res.headers.get('content-type') ?? ''
      if (!ct.includes('html') && !ct.includes('text')) {
        throw new Error(`Non-HTML content-type: ${ct}`)
      }

      return res.text()
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
    }
  }

  throw lastError
}
