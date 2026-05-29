import { SignIn } from '@clerk/clerk-react'

const FEATURES = [
  { label: '346 Förderprogramme', sub: 'automatisch auf dein Profil gematcht' },
  { label: 'Rechtspflichten', sub: 'gefiltert nach Branche & Größe' },
  { label: 'Compliance-Dokumente', sub: 'per KI in Sekunden generiert' },
]

export default function LoginPage() {
  return (
    <div className="min-h-screen flex font-sans">

      {/* ── Linke Spalte: Branding ─────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[46%] bg-ink flex-col justify-between p-12 relative overflow-hidden">

        {/* Subtile Hintergrund-Dekoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-sand/5 rounded-full blur-3xl -translate-x-8 translate-y-8" />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-2.5">
          <div className="w-8 h-8 bg-sand-light rounded flex items-center justify-center">
            <span className="text-ink text-xs font-mono font-bold">CK</span>
          </div>
          <span className="font-serif text-sand-light text-xl">ComplianceKit</span>
          <span className="text-xs font-mono bg-ink-light border border-ink-border text-muted px-2 py-0.5 rounded ml-1">BETA</span>
        </div>

        {/* Headline */}
        <div className="relative">
          <p className="text-xs font-mono text-teal uppercase tracking-widest mb-4">
            Für Gründer & KMU
          </p>
          <h1 className="font-serif text-4xl text-sand-light leading-tight">
            Compliance &<br />Fördermittel<br />
            <span className="text-teal">auf einen Blick.</span>
          </h1>
          <p className="mt-5 text-muted font-sans text-sm leading-relaxed max-w-sm">
            Alle rechtlichen Pflichten und passenden Förderprogramme
            automatisch für dein Unternehmen zusammengestellt.
          </p>
        </div>

        {/* Features + Footer */}
        <div className="relative space-y-3">
          {FEATURES.map(f => (
            <div key={f.label} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 bg-teal/20">
                <span className="text-teal text-xs font-mono font-bold">✓</span>
              </div>
              <div>
                <span className="text-sand-light text-sm font-sans font-medium">{f.label}</span>
                <span className="text-muted text-sm font-sans"> · {f.sub}</span>
              </div>
            </div>
          ))}

          <div className="pt-5 mt-2 border-t border-ink-border">
            <p className="text-muted text-xs font-mono">
              Kostenlos bis 50.000 Nutzer · DSGVO-konform · Keine Kreditkarte
            </p>
          </div>
        </div>
      </div>

      {/* ── Rechte Spalte: Sign-In ─────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center bg-sand-light px-6 py-12">
        <div className="w-full max-w-[400px]">

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10 justify-center">
            <div className="w-8 h-8 bg-ink rounded flex items-center justify-center">
              <span className="text-sand-light text-xs font-mono font-bold">CK</span>
            </div>
            <span className="font-serif text-ink text-xl">ComplianceKit</span>
          </div>

          <SignIn
            routing="path"
            path="/login"
            appearance={{
              layout: { showOptionalFields: false },
              elements: {
                rootBox: 'w-full',
                card: 'shadow-none p-0 bg-transparent gap-6',

                headerTitle: 'font-serif text-2xl text-ink',
                headerSubtitle: 'text-muted-dark text-sm font-sans',

                socialButtonsBlockButton:
                  'border border-sand-border bg-white hover:bg-sand-mid transition-colors text-ink font-sans font-medium rounded-lg h-11',
                socialButtonsBlockButtonText: 'text-ink font-sans font-medium text-sm',
                socialButtonsBlockButtonArrow: 'hidden',

                dividerLine: 'bg-sand-border',
                dividerText: 'text-muted text-xs bg-sand-light px-3 font-mono',

                formFieldLabel: 'text-xs font-mono text-muted-dark mb-1 uppercase tracking-wider',
                formFieldInput:
                  'border border-sand-border bg-white focus:ring-0 focus:border-ink rounded-lg text-sm h-11 px-4 text-ink placeholder-muted transition-colors font-sans',

                formButtonPrimary:
                  'bg-ink hover:bg-ink-light transition-colors font-sans font-medium rounded-lg h-11 text-sm text-sand-light',

                footerActionLink: 'text-teal-dark hover:text-teal font-medium font-sans',
                identityPreviewText: 'text-ink text-sm font-sans',

                alertText: 'text-sm font-sans',
                alertTextDanger: 'text-danger',

                otpCodeFieldInput:
                  'border border-sand-border rounded-lg text-center font-mono font-semibold text-ink focus:border-ink',
              },
            }}
          />

          <p className="mt-8 text-center text-xs text-muted font-sans">
            Mit der Anmeldung stimmst du unseren{' '}
            <a href="/datenschutz" className="underline hover:text-ink-light transition-colors">
              Datenschutzbestimmungen
            </a>{' '}
            und dem{' '}
            <a href="/impressum" className="underline hover:text-ink-light transition-colors">
              Impressum
            </a>{' '}
            zu.
          </p>
        </div>
      </div>
    </div>
  )
}
