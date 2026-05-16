import { z } from 'zod'
import type { Request, Response, NextFunction } from 'express'

export const CompanySchema = z.object({
  name:          z.string().min(1).max(255),
  rechtsform:    z.enum(['GmbH', 'UG (haftungsbeschränkt)', 'AG', 'GbR', 'e.K.', 'Einzelunternehmen', 'OHG', 'KG']),
  branche:       z.string().min(1).max(100),
  mitarbeiter:   z.enum(['1–9', '10–49', '50–249', '250+']),
  bundesland:    z.string().min(1).max(100),
  umsatz:        z.string().min(1).max(50),
  gruendungsjahr: z.string().min(1).max(20),
})

export const StatusUpdateSchema = z.object({
  status: z.enum(['offen', 'erledigt', 'nicht_relevant']),
})

// Middleware-Factory für Body-Validierung
export function validateBody<T>(schema: z.ZodType<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({
        error: 'Ungültige Eingabe',
        details: result.error.flatten().fieldErrors,
      })
      return
    }
    req.body = result.data
    next()
  }
}

// UUID-Format prüfen
export function validateUUID(param: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params[param]
    const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!UUID_RE.test(id)) {
      res.status(400).json({ error: 'Ungültige ID' })
      return
    }
    next()
  }
}
