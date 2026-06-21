import { Router } from 'express'
import { clerkClient } from '@clerk/express'
import { db } from '../db/client.js'
import { requireAuth, getCurrentUserId } from '../middleware/auth.js'
import type { CompanyRow } from '../types.js'

export const userRouter = Router()

// ── GET /api/user/export – alle gespeicherten Daten als JSON (Art. 20 DSGVO) ──
userRouter.get('/export', requireAuth, async (req, res) => {
  try {
    const clerkUserId = getCurrentUserId(req)

    const { rows: companyRows } = await db.query<CompanyRow>(
      'SELECT * FROM companies WHERE clerk_user_id = $1',
      [clerkUserId]
    )
    const company = companyRows[0] ?? null

    let regulationStatus: unknown[] = []
    if (company) {
      const { rows } = await db.query(
        'SELECT regulation_id, status, updated_at FROM regulation_status WHERE company_id = $1',
        [company.id]
      )
      regulationStatus = rows
    }

    const clerkUser = await clerkClient.users.getUser(clerkUserId)

    res.setHeader('Content-Disposition', 'attachment; filename="compliancekit-export.json"')
    res.json({
      exported_at: new Date().toISOString(),
      account: {
        clerk_user_id: clerkUserId,
        email: clerkUser.emailAddresses.find(e => e.id === clerkUser.primaryEmailAddressId)?.emailAddress ?? null,
        created_at: new Date(clerkUser.createdAt).toISOString(),
        last_sign_in_at: clerkUser.lastSignInAt ? new Date(clerkUser.lastSignInAt).toISOString() : null,
      },
      company,
      regulation_status: regulationStatus,
    })
  } catch (err) {
    console.error('[GET /user/export]', err)
    res.status(500).json({ error: 'Export fehlgeschlagen' })
  }
})

// ── DELETE /api/user/account – Konto und alle Daten löschen (Art. 17 DSGVO) ───
userRouter.delete('/account', requireAuth, async (req, res) => {
  try {
    const clerkUserId = getCurrentUserId(req)

    // companies löschen → regulation_status wird per ON DELETE CASCADE mitgelöscht
    await db.query('DELETE FROM companies WHERE clerk_user_id = $1', [clerkUserId])

    // Clerk-Account löschen (Auth-Daten: E-Mail, Session-Token, Login-Zeitstempel)
    await clerkClient.users.deleteUser(clerkUserId)

    res.json({ ok: true })
  } catch (err) {
    console.error('[DELETE /user/account]', err)
    res.status(500).json({ error: 'Löschung fehlgeschlagen' })
  }
})
