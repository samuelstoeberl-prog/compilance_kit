import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Request, Response } from 'express'

const { getAuthMock } = vi.hoisted(() => ({ getAuthMock: vi.fn() }))
vi.mock('@clerk/express', () => ({ getAuth: getAuthMock }))

const { requireAuth, getCurrentUserId } = await import('./auth.js')

function mockRes() {
  const res = {} as Response
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

beforeEach(() => {
  getAuthMock.mockReset()
})

describe('requireAuth', () => {
  it('returns 401 and does not call next() when there is no userId', () => {
    getAuthMock.mockReturnValue({ userId: null })
    const req = {} as Request
    const res = mockRes()
    const next = vi.fn()

    requireAuth(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: 'Nicht authentifiziert. Bitte einloggen.' })
    expect(next).not.toHaveBeenCalled()
  })

  it('calls next() without touching the response when a userId is present', () => {
    getAuthMock.mockReturnValue({ userId: 'user_123' })
    const req = {} as Request
    const res = mockRes()
    const next = vi.fn()

    requireAuth(req, res, next)

    expect(next).toHaveBeenCalledOnce()
    expect(res.status).not.toHaveBeenCalled()
  })
})

describe('getCurrentUserId', () => {
  it('returns the userId from the Clerk session', () => {
    getAuthMock.mockReturnValue({ userId: 'user_abc' })
    expect(getCurrentUserId({} as Request)).toBe('user_abc')
  })

  it('throws when there is no authenticated user, instead of silently returning undefined', () => {
    getAuthMock.mockReturnValue({ userId: null })
    expect(() => getCurrentUserId({} as Request)).toThrow()
  })
})
