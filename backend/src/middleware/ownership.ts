import type { Request, Response, NextFunction } from 'express'
import { db } from '../db/client.js'
import { getCurrentUserId } from './auth.js'
import type { CompanyRow } from '../types.js'

declare module 'express-serve-static-core' {
  interface Request {
    company?: CompanyRow
  }
}

/**
 * Middleware-Factory: Lädt das Unternehmen aus dem Routenparameter `paramName`
 * und stellt sicher, dass es dem eingeloggten Nutzer gehört.
 *
 * - 404, falls kein Unternehmen mit dieser ID existiert
 * - 403, falls es einem anderen Nutzer gehört
 * - Bei Erfolg: req.company ist gesetzt, next() wird aufgerufen
 *
 * Muss NACH requireAuth und validateUUID(paramName) registriert werden.
 */
export function requireCompanyOwnership(paramName: string = 'companyId') {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkUserId = getCurrentUserId(req)
      const companyId = req.params[paramName]

      const { rows } = await db.query<CompanyRow>(
        'SELECT * FROM companies WHERE id = $1',
        [companyId]
      )
      const company = rows[0]

      if (!company) {
        res.status(404).json({ error: 'Unternehmen nicht gefunden' })
        return
      }
      if (company.clerk_user_id !== clerkUserId) {
        res.status(403).json({ error: 'Kein Zugriff auf dieses Unternehmen' })
        return
      }

      req.company = company
      next()
    } catch (err) {
      console.error('[requireCompanyOwnership]', err)
      res.status(500).json({ error: 'Datenbankfehler' })
    }
  }
}
