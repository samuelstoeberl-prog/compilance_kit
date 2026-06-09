import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '../../../_db'
import { getUserId } from '../../../_auth'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PATCH') return res.status(405).end()

  const userId = await getUserId(req.headers.authorization)
  if (!userId) return res.status(401).json({ error: 'Nicht authentifiziert' })

  const { companyId, regulationId } = req.query as { companyId: string; regulationId: string }
  const { status } = req.body as { status: 'offen' | 'erledigt' | 'nicht_relevant' }

  // Ownership prüfen
  const company = await sql`SELECT id FROM companies WHERE id = ${companyId} AND clerk_user_id = ${userId}`
  if (!company[0]) return res.status(403).json({ error: 'Kein Zugriff' })

  await sql`
    INSERT INTO regulation_status (company_id, regulation_id, status)
    VALUES (${companyId}, ${regulationId}, ${status})
    ON CONFLICT (company_id, regulation_id) DO UPDATE SET
      status     = EXCLUDED.status,
      updated_at = NOW()
  `
  res.status(200).json({ ok: true })
}
