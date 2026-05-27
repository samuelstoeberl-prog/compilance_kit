import { getAuth } from '@clerk/express'
import type { Request, Response, NextFunction } from 'express'

/**
 * Middleware: Stellt sicher dass ein gültiger Clerk-Token vorhanden ist.
 * Gibt 401 zurück wenn nicht authentifiziert.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const { userId } = getAuth(req)

  if (!userId) {
    res.status(401).json({ error: 'Nicht authentifiziert. Bitte einloggen.' })
    return
  }

  next()
}

/**
 * Gibt die Clerk-User-ID aus dem Request zurück.
 * Wirft einen Fehler wenn kein authentifizierter Nutzer vorhanden.
 */
export function getCurrentUserId(req: Request): string {
  const { userId } = getAuth(req)
  if (!userId) throw new Error('Kein authentifizierter Nutzer im Request')
  return userId
}

/**
 * Prüft ob ein Unternehmen dem aktuellen Nutzer gehört.
 * Gibt false zurück wenn die Zuordnung nicht stimmt (→ 403).
 */
export async function assertOwnership(
  db: import('pg').Pool,
  companyId: string,
  clerkUserId: string,
): Promise<boolean> {
  const { rows } = await db.query(
    'SELECT 1 FROM companies WHERE id = $1 AND clerk_user_id = $2',
    [companyId, clerkUserId]
  )
  return rows.length > 0
}
