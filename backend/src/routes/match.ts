import { Router } from 'express'
import { validateUUID, validateBody, StatusUpdateSchema } from '../middleware/validate.js'
import { requireAuth } from '../middleware/auth.js'
import { requireCompanyOwnership } from '../middleware/ownership.js'
import { matchFundings, matchRegulations, updateRegulationStatus, getDashboardSummary } from '../matching/engine.js'

export const matchRouter = Router()

// ── GET /api/match/:companyId/fundings – passende Förderprogramme ─────────────
matchRouter.get('/:companyId/fundings', requireAuth, validateUUID('companyId'), requireCompanyOwnership('companyId'), async (req, res) => {
  try {
    const company = req.company!

    const limit    = Math.min(parseInt(req.query.limit    as string ?? '50'),  100)
    const minScore = Math.min(parseInt(req.query.minScore as string ?? '1'),   100)

    const fundings = await matchFundings(req.params.companyId, company, { limit, minScore })
    res.json({ total: fundings.length, items: fundings })
  } catch (err) {
    console.error('[GET /match/:id/fundings]', err)
    res.status(500).json({ error: 'Datenbankfehler' })
  }
})

// ── GET /api/match/:companyId/regulations – anwendbare Pflichten ──────────────
matchRouter.get('/:companyId/regulations', requireAuth, validateUUID('companyId'), requireCompanyOwnership('companyId'), async (req, res) => {
  try {
    const company = req.company!

    const regulations    = await matchRegulations(req.params.companyId, company)
    const relevant       = regulations.filter(r => r.status !== 'nicht_relevant')
    const nicht_relevant = regulations.filter(r => r.status === 'nicht_relevant')

    res.json({
      total_relevant:   relevant.length,
      erledigt:         relevant.filter(r => r.status === 'erledigt').length,
      offen:            relevant.filter(r => r.status === 'offen').length,
      items:            regulations,
      nicht_relevant_ids: nicht_relevant.map(r => r.id),
    })
  } catch (err) {
    console.error('[GET /match/:id/regulations]', err)
    res.status(500).json({ error: 'Datenbankfehler' })
  }
})

// ── PATCH /api/match/:companyId/regulations/:regulationId – Status setzen ─────
matchRouter.patch(
  '/:companyId/regulations/:regulationId',
  requireAuth,
  validateUUID('companyId'),
  requireCompanyOwnership('companyId'),
  validateBody(StatusUpdateSchema),
  async (req, res) => {
    try {
      await updateRegulationStatus(
        req.params.companyId,
        req.params.regulationId,
        req.body.status,
      )
      res.json({ ok: true })
    } catch (err) {
      console.error('[PATCH /match/.../regulations/...]', err)
      res.status(500).json({ error: 'Datenbankfehler' })
    }
  }
)

// ── GET /api/match/:companyId/summary – Dashboard-Zusammenfassung ─────────────
matchRouter.get('/:companyId/summary', requireAuth, validateUUID('companyId'), requireCompanyOwnership('companyId'), async (req, res) => {
  try {
    const company = req.company!

    const summary = await getDashboardSummary(req.params.companyId, company)
    res.json(summary)
  } catch (err) {
    console.error('[GET /match/:id/summary]', err)
    res.status(500).json({ error: 'Datenbankfehler' })
  }
})
