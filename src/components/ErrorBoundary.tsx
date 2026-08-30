import { Component, type ErrorInfo, type ReactNode } from 'react'
import * as Sentry from '@sentry/react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

// Fängt Render-Fehler ab, die sonst die gesamte App mit einem weißen
// Bildschirm crashen lassen würden (z.B. ein korrupter localStorage-Wert).
// Meldet den Fehler an Sentry, falls konfiguriert (s. src/lib/sentry.ts) –
// Sentry.captureException() ist ansonsten ein No-Op.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info)
    Sentry.captureException(error)
  }

  handleReset = () => {
    try {
      localStorage.clear()
    } catch {
      // localStorage evtl. nicht verfügbar (z.B. Privacy-Modus) – kein Problem,
      // der Reload selbst reicht dann meist schon
    }
    window.location.href = '/'
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="min-h-screen bg-sand-light flex items-center justify-center p-6 font-sans">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-2xl text-ink mb-3">Etwas ist schiefgelaufen</h1>
          <p className="text-sm text-muted-dark mb-6">
            Ein unerwarteter Fehler ist aufgetreten. Das kann an veralteten
            lokal gespeicherten Daten liegen. Ein Zurücksetzen behebt das in
            den meisten Fällen.
          </p>
          <button
            onClick={this.handleReset}
            className="bg-ink text-sand-light px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-ink-light transition-colors"
          >
            Daten zurücksetzen und neu laden
          </button>
        </div>
      </div>
    )
  }
}
