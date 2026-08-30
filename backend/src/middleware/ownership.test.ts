import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Request, Response } from 'express'

const { getAuthMock, queryMock } = vi.hoisted(() => ({
  getAuthMock: vi.fn(),
  queryMock: vi.fn(),
}))
vi.mock('@clerk/express', () => ({ getAuth: getAuthMock }))
vi.mock('../db/client.js', () => ({ db: { query: queryMock } }))

const { requireCompanyOwnership } = await import('./ownership.js')

function mockRes() {
  const res = {} as Response
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

beforeEach(() => {
  getAuthMock.mockReset()
  queryMock.mockReset()
})

describe('requireCompanyOwnership', () => {
  const middleware = requireCompanyOwnership('companyId')

  it('returns 404 when no company with that id exists', async () => {
    getAuthMock.mockReturnValue({ userId: 'user_1' })
    queryMock.mockResolvedValue({ rows: [] })
    const req = { params: { companyId: 'missing-id' } } as unknown as Request
    const res = mockRes()
    const next = vi.fn()

    await middleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(next).not.toHaveBeenCalled()
  })

  it('returns 403 (not 404) when the company belongs to a different user — does not leak existence vs ownership distinction incorrectly', async () => {
    getAuthMock.mockReturnValue({ userId: 'user_1' })
    queryMock.mockResolvedValue({ rows: [{ id: 'c1', clerk_user_id: 'user_2' }] })
    const req = { params: { companyId: 'c1' } } as unknown as Request
    const res = mockRes()
    const next = vi.fn()

    await middleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(next).not.toHaveBeenCalled()
  })

  it('attaches the company to the request and calls next() when the owner matches', async () => {
    getAuthMock.mockReturnValue({ userId: 'user_1' })
    const company = { id: 'c1', clerk_user_id: 'user_1' }
    queryMock.mockResolvedValue({ rows: [company] })
    const req = { params: { companyId: 'c1' } } as unknown as Request
    const res = mockRes()
    const next = vi.fn()

    await middleware(req, res, next)

    expect(req.company).toEqual(company)
    expect(next).toHaveBeenCalledOnce()
    expect(res.status).not.toHaveBeenCalled()
  })

  it('passes the companyId as a bound parameter rather than interpolating it into the SQL string', async () => {
    getAuthMock.mockReturnValue({ userId: 'user_1' })
    queryMock.mockResolvedValue({ rows: [] })
    const maliciousId = "x'; DROP TABLE companies; --"
    const req = { params: { companyId: maliciousId } } as unknown as Request
    const res = mockRes()
    const next = vi.fn()

    await middleware(req, res, next)

    const [sql, params] = queryMock.mock.calls[0]
    expect(sql).not.toContain(maliciousId)
    expect(params).toEqual([maliciousId])
  })

  it('returns 500 and does not call next() when the database query fails', async () => {
    getAuthMock.mockReturnValue({ userId: 'user_1' })
    queryMock.mockRejectedValue(new Error('connection lost'))
    const req = { params: { companyId: 'c1' } } as unknown as Request
    const res = mockRes()
    const next = vi.fn()

    await middleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(next).not.toHaveBeenCalled()
  })
})
