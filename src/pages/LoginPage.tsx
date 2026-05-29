import { SignIn } from '@clerk/clerk-react'
import { ShieldCheck } from 'lucide-react'

const FEATURES = [
  '346 Förderprogramme automatisch gematcht',
  'Rechtspflichten nach deinem Profil gefiltert',
  'Anschreiben & Dokumente per KI in Sekunden',
]

// ── Login-Seite ───────────────────────────────────────────────────────────────

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">

      {/* ── Linke Spalte: Branding (nur Desktop) ─────────────────────────── */}
      <div className="hidden lg:flex lg:w-[46%] bg-slate-900 flex-col justify-between p-12 relative overflow-hidden">

        {/* Hintergrund-Dekoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            ComplianceKit
          </span>
        </div>

        {/* Headline */}
        <div className="relative">
          <p className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-4">
            Für Gründer & KMU
          </p>
          <h1 className="text-4xl font-bold text-white leading-tight">
            Compliance &<br />Fördermittel<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              auf einen Blick.
            </span>
          </h1>
          <p className="mt-5 text-slate-400 text-base leading-relaxed max-w-sm">
            Alle rechtlichen Pflichten und passenden Förderprogramme
            automatisch für dein Unternehmen zusammengestellt.
          </p>
        </div>

        {/* Features + Footer */}
        <div className="relative space-y-3">
          {FEATURES.map(f => (
            <div key={f} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-slate-300 text-sm">{f}</span>
            </div>
          ))}

          <div className="pt-5 mt-2 border-t border-slate-700/60">
            <p className="text-slate-500 text-xs">
              Kostenlos bis 50.000 Nutzer · DSGVO-konform · Keine Kreditkarte nötig
            </p>
          </div>
        </div>
      </div>

      {/* ── Rechte Spalte: Sign-In-Formular ──────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-[400px]">

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg text-slate-900 tracking-tight">
              ComplianceKit
            </span>
          </div>

          {/* Clerk Sign-In mit angepasstem Styling */}
          <SignIn
            routing="path"
            path="/login"
            appearance={{
              layout: {
                showOptionalFields: false,
              },
              elements: {
                // Container
                rootBox: 'w-full',
                card: 'shadow-none p-0 bg-transparent gap-6',

                // Header
                headerTitle: 'text-2xl font-bold text-slate-900 tracking-tight',
                headerSubtitle: 'text-slate-500 text-sm',

                // Social Buttons
                socialButtonsBlockButton:
                  'border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-150 text-slate-700 font-medium rounded-xl h-11',
                socialButtonsBlockButtonText: 'text-slate-700 font-medium text-sm',
                socialButtonsBlockButtonArrow: 'hidden',

                // Divider
                dividerLine: 'bg-slate-100',
                dividerText: 'text-slate-400 text-xs bg-white px-3',

                // Form fields
                formFieldLabel: 'text-sm font-medium text-slate-700 mb-1',
                formFieldInput:
                  'border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-xl text-sm h-11 px-4 bg-white placeholder-slate-400 transition-all',
                formFieldInputShowPasswordButton: 'text-slate-400 hover:text-slate-600',

                // Primary Button
                formButtonPrimary:
                  'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium rounded-xl h-11 text-sm shadow-sm shadow-blue-600/20',

                // Links
                footerActionLink: 'text-blue-600 hover:text-blue-700 font-medium',
                identityPreviewText: 'text-slate-700 text-sm',
                identityPreviewEditButtonIcon: 'text-slate-400',

                // Alerts
                alertText: 'text-sm',
                alertTextDanger: 'text-red-600',

                // OTP-Eingabe
                otpCodeFieldInput:
                  'border border-slate-200 rounded-xl text-center font-semibold text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
              },
            }}
          />

          {/* Footer Links */}
          <p className="mt-8 text-center text-xs text-slate-400">
            Mit der Anmeldung stimmst du unseren{' '}
            <a href="/datenschutz" className="underline hover:text-slate-600">
              Datenschutzbestimmungen
            </a>{' '}
            und dem{' '}
            <a href="/impressum" className="underline hover:text-slate-600">
              Impressum
            </a>{' '}
            zu.
          </p>
        </div>
      </div>
    </div>
  )
}
