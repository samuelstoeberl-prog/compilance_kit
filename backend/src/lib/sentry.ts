import * as Sentry from '@sentry/node'

// Optionales Error-Tracking. Ohne SENTRY_DSN passiert nichts – kein
// Sentry-Account nötig, um das Backend lokal/im Test/in CI zu betreiben.
export function initSentry(): void {
  if (!process.env.SENTRY_DSN) return

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV ?? 'development',
    tracesSampleRate: 0.1,
  })
}

export { Sentry }
