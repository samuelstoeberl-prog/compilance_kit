import { Component, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // In production you could send this to a logging service.
    console.error('[ErrorBoundary] Uncaught error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-sand-light flex flex-col items-center justify-center px-6">
          {/* CK Logo */}
          <Link to="/" className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 bg-ink rounded flex items-center justify-center">
              <span className="text-sand-light text-sm font-mono font-bold">CK</span>
            </div>
            <span className="font-serif text-ink text-xl">ComplianceKit</span>
          </Link>

          <div className="bg-white border border-sand-border rounded-xl p-8 max-w-md w-full text-center space-y-4 shadow-sm">
            <h1 className="font-serif text-2xl text-ink">Etwas ist schiefgelaufen</h1>
            <p className="font-sans text-sm text-muted-dark leading-relaxed">
              Ein unerwarteter Fehler ist aufgetreten. Bitte laden Sie die Seite neu.
              Sollte das Problem weiterhin bestehen, kontaktieren Sie uns.
            </p>

            {this.state.error && (
              <pre className="text-left bg-sand-mid rounded-lg p-3 text-xs font-mono text-muted-dark overflow-x-auto whitespace-pre-wrap break-all">
                {this.state.error.message}
              </pre>
            )}

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-2 w-full bg-ink text-sand-light font-mono text-sm py-3 rounded-lg hover:opacity-80 transition-opacity"
            >
              Seite neu laden
            </button>
          </div>

          <p className="mt-6 text-xs font-mono text-muted">
            <Link to="/" className="hover:text-ink transition-colors">
              ← Zur Startseite
            </Link>
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
