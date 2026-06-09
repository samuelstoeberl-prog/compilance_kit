import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '../_db'
import { getUserId } from '../_auth'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).end()

  const userId = await getUserId(req.headers.authorization)
  if (!userId) return res.status(401).json({ error: 'Nicht authentifiziert' })

  const rows = await sql`SELECT * FROM companies WHERE clerk_user_id = ${userId}`
  if (!rows[0]) return res.status(404).json({ error: 'Noch kein Unternehmen angelegt' })
  res.json(rows[0])
}
