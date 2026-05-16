import { Router } from 'express'
import { db } from '../db/client.js'
import { validateBody, validateUUID, CompanySchema } from '../middleware/validate.js'
import type { CompanyRow } from '../types.js'

export const companiesRouter = Router()

// POST /api/companies – Unternehmen anlegen
companiesRouter.post('/', validateBody(CompanySchema), async (req, res) => {
  try {
    const { rows } = await db.query<CompanyRow>(`
      INSERT INTO companies (name, rechtsform, branche, mitarbeiter, bundesland, umsatz, gruendungsjahr)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
    `, [req.body.name, req.body.rechtsform, req.body.branche,
        req.body.mitarbeiter, req.body.bundesland, req.body.umsatz, req.body.gruendungsjahr])
    res.status(201).json(rows[0])
  } catch (err) {
    console.error('[POST /companies]', err)
    res.status(500).json({ error: 'Datenbankfehler' })
  }
})

// GET /api/companies/:id – Unternehmen abrufen
companiesRouter.get('/:id', validateUUID('id'), async (req, res) => {
  try {
    const { rows } = await db.query<CompanyRow>(
      'SELECT * FROM companies WHERE id = $1', [req.params.id]
    )
    if (!rows[0]) { res.status(404).json({ error: 'Nicht gefunden' }); return }
    res.json(rows[0])
  } catch (err) {
    console.error('[GET /companies/:id]', err)
    res.status(500).json({ error: 'Datenbankfehler' })
  }
})

// PUT /api/companies/:id – Unternehmen aktualisieren
companiesRouter.put('/:id', validateUUID('id'), validateBody(CompanySchema), async (req, res) => {
  try {
    const { rows } = await db.query<CompanyRow>(`
      UPDATE companies
      SET name=$1, rechtsform=$2, branche=$3, mitarbeiter=$4,
          bundesland=$5, umsatz=$6, gruendungsjahr=$7
      WHERE id=$8 RETURNING *
    `, [req.body.name, req.body.rechtsform, req.body.branche,
        req.body.mitarbeiter, req.body.bundesland, req.body.umsatz,
        req.body.gruendungsjahr, req.params.id])
    if (!rows[0]) { res.status(404).json({ error: 'Nicht gefunden' }); return }
    res.json(rows[0])
  } catch (err) {
    console.error('[PUT /companies/:id]', err)
    res.status(500).json({ error: 'Datenbankfehler' })
  }
})
