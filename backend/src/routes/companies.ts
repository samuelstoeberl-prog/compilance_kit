import { Router } from 'express'
import { db } from '../db/client.js'
import { validateBody, validateUUID, CompanySchema } from '../middleware/validate.js'
import { requireAuth, getCurrentUserId } from '../middleware/auth.js'
import { requireCompanyOwnership } from '../middleware/ownership.js'
import type { CompanyRow } from '../types.js'

export const companiesRouter = Router()

// ── GET /api/companies/me – Unternehmen des eingeloggten Nutzers ──────────────
companiesRouter.get('/me', requireAuth, async (req, res) => {
  try {
    const clerkUserId = getCurrentUserId(req)
    const { rows } = await db.query<CompanyRow>(
      'SELECT * FROM companies WHERE clerk_user_id = $1',
      [clerkUserId]
    )
    if (!rows[0]) {
      res.status(404).json({ error: 'Noch kein Unternehmen angelegt' })
      return
    }
    res.json(rows[0])
  } catch (err) {
    console.error('[GET /companies/me]', err)
    res.status(500).json({ error: 'Datenbankfehler' })
  }
})

// ── POST /api/companies – Unternehmen anlegen (UPSERT per Clerk-User) ─────────
companiesRouter.post('/', requireAuth, validateBody(CompanySchema), async (req, res) => {
  try {
    const clerkUserId = getCurrentUserId(req)
    const b = req.body

    // UPSERT: Falls der Nutzer bereits ein Unternehmen hat, wird es aktualisiert.
    // ON CONFLICT auf clerk_user_id → UPDATE
    const { rows } = await db.query<CompanyRow>(`
      INSERT INTO companies
        (clerk_user_id, name, rechtsform, branche, mitarbeiter, bundesland,
         umsatz, gruendungsjahr, foerderzweck,
         email, telefon, strasse, plz_ort, website)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      ON CONFLICT (clerk_user_id) DO UPDATE SET
        name=$2, rechtsform=$3, branche=$4, mitarbeiter=$5, bundesland=$6,
        umsatz=$7, gruendungsjahr=$8, foerderzweck=$9,
        email=$10, telefon=$11, strasse=$12, plz_ort=$13, website=$14,
        updated_at=NOW()
      RETURNING *
    `, [
      clerkUserId,
      b.name, b.rechtsform, b.branche, b.mitarbeiter,
      b.bundesland, b.umsatz, b.gruendungsjahr, b.foerderzweck ?? [],
      b.email ?? null, b.telefon ?? null, b.strasse ?? null,
      b.plz_ort ?? null, b.website ?? null,
    ])

    res.status(201).json(rows[0])
  } catch (err) {
    console.error('[POST /companies]', err)
    res.status(500).json({ error: 'Datenbankfehler' })
  }
})

// ── GET /api/companies/:id – Unternehmen abrufen (nur eigenes) ────────────────
companiesRouter.get('/:id', requireAuth, validateUUID('id'), async (req, res) => {
  try {
    const clerkUserId = getCurrentUserId(req)
    const { rows } = await db.query<CompanyRow>(
      'SELECT * FROM companies WHERE id = $1 AND clerk_user_id = $2',
      [req.params.id, clerkUserId]
    )
    if (!rows[0]) {
      res.status(404).json({ error: 'Nicht gefunden oder kein Zugriff' })
      return
    }
    res.json(rows[0])
  } catch (err) {
    console.error('[GET /companies/:id]', err)
    res.status(500).json({ error: 'Datenbankfehler' })
  }
})

// ── PUT /api/companies/:id – Unternehmen aktualisieren (nur eigenes) ──────────
companiesRouter.put('/:id', requireAuth, validateUUID('id'), requireCompanyOwnership('id'), validateBody(CompanySchema), async (req, res) => {
  try {
    const clerkUserId = getCurrentUserId(req)
    const b = req.body
    const { rows } = await db.query<CompanyRow>(`
      UPDATE companies
      SET name=$1, rechtsform=$2, branche=$3, mitarbeiter=$4,
          bundesland=$5, umsatz=$6, gruendungsjahr=$7, foerderzweck=$8,
          email=$9, telefon=$10, strasse=$11, plz_ort=$12, website=$13
      WHERE id=$14 AND clerk_user_id=$15
      RETURNING *
    `, [
      b.name, b.rechtsform, b.branche, b.mitarbeiter,
      b.bundesland, b.umsatz, b.gruendungsjahr, b.foerderzweck ?? [],
      b.email ?? null, b.telefon ?? null, b.strasse ?? null,
      b.plz_ort ?? null, b.website ?? null,
      req.params.id, clerkUserId,
    ])

    if (!rows[0]) {
      res.status(404).json({ error: 'Nicht gefunden' })
      return
    }
    res.json(rows[0])
  } catch (err) {
    console.error('[PUT /companies/:id]', err)
    res.status(500).json({ error: 'Datenbankfehler' })
  }
})
