import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '../_db'
import { getUserId } from '../_auth'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PUT') return res.status(405).end()

  const userId = await getUserId(req.headers.authorization)
  if (!userId) return res.status(401).json({ error: 'Nicht authentifiziert' })

  const { id } = req.query as { id: string }
  const b = req.body

  const rows = await sql`
    UPDATE companies SET
      name        = ${b.name},
      rechtsform  = ${b.rechtsform},
      branche     = ${b.branche},
      mitarbeiter = ${b.mitarbeiter},
      bundesland  = ${b.bundesland},
      umsatz      = ${b.umsatz},
      gruendungsjahr = ${b.gruendungsjahr},
      foerderzweck   = ${b.foerderzweck ?? []},
      email       = ${b.email ?? null},
      telefon     = ${b.telefon ?? null},
      strasse     = ${b.strasse ?? null},
      plz_ort     = ${b.plz_ort ?? null},
      website     = ${b.website ?? null},
      updated_at  = NOW()
    WHERE id = ${id} AND clerk_user_id = ${userId}
    RETURNING *
  `
  if (!rows[0]) return res.status(404).json({ error: 'Nicht gefunden oder kein Zugriff' })
  res.json(rows[0])
}
