import { SignIn } from '@clerk/clerk-react'

const STATS = [
  { zahl: '346', einheit: 'Förderprogramme', sub: 'laufend aktualisiert' },
  { zahl: '558', einheit: 'Rechtspflichten', sub: 'nach Branche & Größe' },
  { zahl: '< 3 min', einheit: 'Ersteinrichtung', sub: 'kein Papierkram' },
]

export default function LoginPage() {
  return (
    <div className="min-h-screen flex font-sans">

      {/* ── Linke Spalte ──────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[46%] bg-ink flex-col justify-between p-12 relative overflow-hidden">

        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-teal/5 rounded-full blur-3xl translate-x-20 -translate-y-20" />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-2.5">
          <div className="w-8 h-8 bg-sand-light rounded flex items-center justify-center flex-shrink-0">
            <span className="text-ink text-xs font-mono font-bold">CK</span>
          </div>
          <span className="font-serif text-sand-light text-xl">ComplianceKit</span>
        </div>

        {/* Headline */}
        <div className="relative">
          <p className="text-xs font-mono text-teal uppercase tracking-widest mb-5">
            Für Gründer & KMU in Deutschland
          </p>
          <h1 className="font-serif text-[2.6rem] text-sand-light leading-[1.15]">
            Nie wieder<br />eine Pflicht<br />
            <span className="text-teal">übersehen.</span>
          </h1>
          <p className="mt-6 text-muted font-sans text-sm leading-relaxed max-w-[17rem]">
            ComplianceKit zeigt dir exakt welche Gesetze für dein
            Unternehmen gelten — und welche Fördergelder du gerade liegenlässt.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {STATS.map(s => (
              <div key={s.einheit}>
                <div className="font-serif text-2xl text-sand-light leading-none">{s.zahl}</div>
                <div className="text-xs font-sans text-sand-light/80 mt-0.5 leading-tight">{s.einheit}</div>
                <div className="text-xs font-mono text-muted mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative border-t border-ink-border pt-5">
          <p className="text-muted text-xs font-mono leading-relaxed">
            Datenschutz nach DSGVO · Hosting in Deutschland ·
            Daten werden nicht weiterverkauft
          </p>
        </div>
      </div>

      {/* ── Rechte Spalte ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center bg-sand-light px-6 py-12">
        <div className="w-full max-w-[400px]">

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10 justify-center">
            <div className="w-8 h-8 bg-ink rounded flex items-center justify-center">
              <span className="text-sand-light text-xs font-mono font-bold">CK</span>
            </div>
            <span className="font-serif text-ink text-xl">ComplianceKit</span>
          </div>

          {/* Heading über dem Clerk-Widget */}
          <div className="mb-6">
            <h2 className="font-serif text-2xl text-ink">Kostenlos starten</h2>
            <p className="text-sm text-muted-dark font-sans mt-1">
              Konto anlegen oder einloggen — dauert unter einer Minute.
            </p>
          </div>

          <SignIn
            routing="path"
            path="/login"
            afterSignInUrl="/"
            afterSignUpUrl="/"
            appearance={{
              layout: { showOptionalFields: false },
              elements: {
                rootBox: 'w-full',
                card: 'shadow-none p-0 bg-transparent gap-5',

                // Clerk-eigenen Header ausblenden — wir haben unseren eigenen
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                header: 'hidden',

                socialButtonsBlockButton:
                  'border border-sand-border bg-white hover:bg-sand-mid transition-colors text-ink font-sans font-medium rounded-lg h-11',
                socialButtonsBlockButtonText: 'text-ink font-sans font-medium text-sm',
                socialButtonsBlockButtonArrow: 'hidden',

                dividerLine: 'bg-sand-border',
                dividerText: 'text-muted text-xs bg-sand-light px-3 font-mono',

                formFieldLabel: 'text-xs font-mono text-muted-dark uppercase tracking-wider',
                formFieldInput:
                  'border border-sand-border bg-white focus:ring-0 focus:border-ink rounded-lg text-sm h-11 px-4 text-ink placeholder-muted transition-colors font-sans',
                formFieldInputShowPasswordButton: 'text-muted hover:text-ink',

                formButtonPrimary:
                  'bg-ink hover:bg-ink-light transition-colors font-sans font-medium rounded-lg h-11 text-sm text-sand-light',

                footerActionLink: 'text-teal-dark hover:text-teal font-medium font-sans',
                footerActionText: 'text-muted-dark font-sans text-sm',

                alertText: 'text-sm font-sans',
                alertTextDanger: 'text-danger',

                otpCodeFieldInput:
                  'border border-sand-border rounded-lg text-center font-mono font-semibold text-ink focus:border-ink',
              },
            }}
          />

          <p className="mt-6 text-center text-xs text-muted font-sans">
            <a href="/impressum" className="hover:text-ink transition-colors">Impressum</a>
            <span className="mx-2 text-sand-border">·</span>
            <a href="/datenschutz" className="hover:text-ink transition-colors">Datenschutz</a>
            <span className="mx-2 text-sand-border">·</span>
            <a href="/statistik" className="hover:text-ink transition-colors">Statistik</a>
          </p>
        </div>
      </div>
    </div>
  )
}
