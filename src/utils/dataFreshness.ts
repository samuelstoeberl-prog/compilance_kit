export interface ScraperMeta {
  regulations_updated_at: string | null
  fundings_updated_at: string | null
}

// Ab diesem Alter gilt der Datenbestand als "möglicherweise veraltet"
// und wird in der UI hervorgehoben, statt still zu altern.
export const STALE_AFTER_DAYS = 60

export interface DataFreshness {
  date: Date
  daysOld: number
  isStale: boolean
  label: string
}

export function describeFreshness(isoTimestamp: string | null, now: Date = new Date()): DataFreshness | null {
  if (!isoTimestamp) return null
  const date = new Date(isoTimestamp)
  if (isNaN(date.getTime())) return null

  const daysOld = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  const label = date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return { date, daysOld, isStale: daysOld >= STALE_AFTER_DAYS, label }
}
