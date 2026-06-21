import express from 'express'
import cors from 'cors'
import { clerkMiddleware } from '@clerk/express'
import { companiesRouter } from './routes/companies.js'
import { matchRouter } from './routes/match.js'
import { aiRouter } from './routes/ai.js'
import { userRouter } from './routes/user.js'
import { generalLimiter, aiLimiter } from './middleware/rateLimit.js'

export const app = express()

// Hinter dem Vercel/Reverse-Proxy: X-Forwarded-For für korrekte Client-IPs vertrauen
app.set('trust proxy', 1)

// ── Clerk-Middleware (muss vor allen Routes stehen) ───────────────────────────
// Liest CLERK_SECRET_KEY aus process.env und verifiziert JWTs automatisch
app.use(clerkMiddleware())

// ── Standard-Middleware ───────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json({ limit: '1mb' }))

// Security-Header
app.use((_, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  next()
})

// ── Rate-Limiting ─────────────────────────────────────────────────────────────
app.use('/api', generalLimiter)
app.use('/api/ai', aiLimiter)

// ── Routes ────────────────────────────────────────────────────────────────────
app.get('/api/health', (_, res) => res.json({ status: 'ok', ts: new Date().toISOString() }))
app.use('/api/companies', companiesRouter)
app.use('/api/match', matchRouter)
app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter)

// 404-Fallback
app.use((req, res) => res.status(404).json({ error: `Route nicht gefunden: ${req.path}` }))

// Globaler Fehler-Handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Unhandled Error]', err)
  res.status(500).json({ error: 'Interner Serverfehler' })
})
