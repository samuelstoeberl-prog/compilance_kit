import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '../_db'
import { getUserId } from '../_auth'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const userId = await getUserId(req.headers.authorization)
  if (!userId) return res.status(401).json({ error: 'Nicht authentifiziert' })

  const b = req.body
  const rows = await sql`
    INSERT INTO companies (
      clerk_user_id, name, rechtsform, branche, mitarbeiter, bundesland,
      umsatz, gruendungsjahr, foerderzweck,
      email, telefon, strasse, plz_ort, website
    ) VALUES (
      ${userId}, ${b.name}, ${b.rechtsform}, ${b.branche}, ${b.mitarbeiter}, ${b.bundesland},
      ${b.umsatz}, ${b.gruendungsjahr}, ${b.foerderzweck ?? []},
      ${b.email ?? null}, ${b.telefon ?? null}, ${b.strasse ?? null}, ${b.plz_ort ?? null}, ${b.website ?? null}
    )
    ON CONFLICT (clerk_user_id) DO UPDATE SET
      name        = EXCLUDED.name,
      rechtsform  = EXCLUDED.rechtsform,
      branche     = EXCLUDED.branche,
      mitarbeiter = EXCLUDED.mitarbeiter,
      bundesland  = EXCLUDED.bundesland,
      umsatz      = EXCLUDED.umsatz,
      gruendungsjahr = EXCLUDED.gruendungsjahr,
      foerderzweck   = EXCLUDED.foerderzweck,
      email       = EXCLUDED.email,
      telefon     = EXCLUDED.telefon,
      strasse     = EXCLUDED.strasse,
      plz_ort     = EXCLUDED.plz_ort,
      website     = EXCLUDED.website,
      updated_at  = NOW()
    RETURNING *
  `
  res.status(201).json(rows[0])
}
