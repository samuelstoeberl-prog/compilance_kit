import { describe, it, expect, vi } from 'vitest'
import { z } from 'zod'
import type { Request, Response } from 'express'
import { validateBody, validateUUID, CompanySchema, StatusUpdateSchema } from './validate.js'

function mockRes() {
  const res = {} as Response
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

describe('validateBody', () => {
  const schema = z.object({ name: z.string().min(1).max(10) })
  const middleware = validateBody(schema)

  it('calls next() and replaces req.body with the parsed/typed data on success', () => {
    const req = { body: { name: 'ok' } } as unknown as Request
    const res = mockRes()
    const next = vi.fn()

    middleware(req, res, next)

    expect(next).toHaveBeenCalledOnce()
    expect(req.body).toEqual({ name: 'ok' })
  })

  it('returns 400 with field errors and does not call next() on invalid input', () => {
    const req = { body: { name: '' } } as unknown as Request
    const res = mockRes()
    const next = vi.fn()

    middleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(next).not.toHaveBeenCalled()
  })

  it('rejects unexpected extra/oversized fields rather than passing them through unchecked', () => {
    const req = { body: { name: 'x'.repeat(50) } } as unknown as Request
    const res = mockRes()
    const next = vi.fn()

    middleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(next).not.toHaveBeenCalled()
  })

  it('CompanySchema rejects an unknown Rechtsform (guards the enum used for downstream matching logic)', () => {
    const result = CompanySchema.safeParse({
      name: 'Test GmbH',
      rechtsform: 'Not A Real Legal Form',
      branche: 'IT',
      mitarbeiter: '1–9',
      bundesland: 'Bayern',
      umsatz: '100k',
      gruendungsjahr: '2024',
    })
    expect(result.success).toBe(false)
  })

  it('StatusUpdateSchema only accepts the three known status values', () => {
    expect(StatusUpdateSchema.safeParse({ status: 'erledigt' }).success).toBe(true)
    expect(StatusUpdateSchema.safeParse({ status: 'geloescht' }).success).toBe(false)
  })
})

describe('validateUUID', () => {
  const middleware = validateUUID('companyId')

  it('calls next() for a well-formed UUID', () => {
    const req = { params: { companyId: '123e4567-e89b-12d3-a456-426614174000' } } as unknown as Request
    const res = mockRes()
    const next = vi.fn()

    middleware(req, res, next)

    expect(next).toHaveBeenCalledOnce()
    expect(res.status).not.toHaveBeenCalled()
  })

  it('returns 400 for a non-UUID param, including SQL-injection-shaped input', () => {
    const req = { params: { companyId: "1' OR '1'='1" } } as unknown as Request
    const res = mockRes()
    const next = vi.fn()

    middleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(next).not.toHaveBeenCalled()
  })
})
