import * as Sentry from '@sentry/react'

// Optionales Error-Tracking. Ohne VITE_SENTRY_DSN passiert nichts – kein
// Account, kein Setup nötig, um die App lokal/im Test zu betreiben.
// Sentry.captureException() ist ein No-Op, solange init() nie aufgerufen wurde.
export function initSentry(): void {
  const dsn = import.meta.env.VITE_SENTRY_DSN
  if (!dsn) return

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.1,
  })
}
