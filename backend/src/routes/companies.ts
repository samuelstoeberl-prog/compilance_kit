import { Router } from 'express'
import { db } from '../db/client.js'
import { validateBody, validateUUID, CompanySchema } from '../middleware/validate.js'
import type { CompanyRow } from '../types.js'

export const companiesRouter = Router()

// POST /api/companies – Unternehmen anlegen
companiesRouter.post('/', validateBody(CompanySchema), async (req, res) => {
  try {
    const b = req.body
    const { rows } = await db.query<CompanyRow>(`
      INSERT INTO companies
        (name, rechtsform, branche, mitarbeiter, bundesland, umsatz, gruendungsjahr, foerderzweck,
         email, telefon, strasse, plz_ort, website)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING *
    `, [b.name, b.rechtsform, b.branche, b.mitarbeiter,
        b.bundesland, b.umsatz, b.gruendungsjahr, b.foerderzweck ?? [],
        b.email ?? null, b.telefon ?? null, b.strasse ?? null, b.plz_ort ?? null, b.website ?? null])
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
    const b = req.body
    const { rows } = await db.query<CompanyRow>(`
      UPDATE companies
      SET name=$1, rechtsform=$2, branche=$3, mitarbeiter=$4,
          bundesland=$5, umsatz=$6, gruendungsjahr=$7, foerderzweck=$8,
          email=$9, telefon=$10, strasse=$11, plz_ort=$12, website=$13
      WHERE id=$14 RETURNING *
    `, [b.name, b.rechtsform, b.branche, b.mitarbeiter,
        b.bundesland, b.umsatz, b.gruendungsjahr, b.foerderzweck ?? [],
        b.email ?? null, b.telefon ?? null, b.strasse ?? null, b.plz_ort ?? null, b.website ?? null,
        req.params.id])
    if (!rows[0]) { res.status(404).json({ error: 'Nicht gefunden' }); return }
    res.json(rows[0])
  } catch (err) {
    console.error('[PUT /companies/:id]', err)
    res.status(500).json({ error: 'Datenbankfehler' })
  }
})
