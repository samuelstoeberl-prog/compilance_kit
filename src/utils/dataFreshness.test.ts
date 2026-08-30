import { describe, it, expect } from 'vitest'
import { describeFreshness, STALE_AFTER_DAYS } from './dataFreshness'

describe('describeFreshness', () => {
  it('returns null when there is no timestamp', () => {
    expect(describeFreshness(null)).toBeNull()
  })

  it('returns null for an unparseable timestamp instead of throwing', () => {
    expect(describeFreshness('not-a-date')).toBeNull()
  })

  it('computes days-old and a de-DE formatted label', () => {
    const now = new Date('2026-08-30T12:00:00Z')
    const result = describeFreshness('2026-08-01T00:00:00Z', now)
    expect(result).not.toBeNull()
    expect(result!.daysOld).toBe(29)
    expect(result!.label).toBe('01.08.2026')
  })

  it('is not stale just under the threshold, and stale at/over it', () => {
    const now = new Date('2026-08-30T00:00:00Z')
    const justUnder = new Date(now.getTime() - (STALE_AFTER_DAYS - 1) * 86_400_000).toISOString()
    const atThreshold = new Date(now.getTime() - STALE_AFTER_DAYS * 86_400_000).toISOString()

    expect(describeFreshness(justUnder, now)!.isStale).toBe(false)
    expect(describeFreshness(atThreshold, now)!.isStale).toBe(true)
  })
})
