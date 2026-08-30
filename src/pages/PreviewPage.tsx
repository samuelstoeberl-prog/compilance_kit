import { useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignIn } from '@clerk/clerk-react'
import { useProfil } from '../context/ProfilContext'
import { sortedFundings, filterRegulations } from '../utils/filter'
import fundingData from '../data/fundings.json'
import regulationData from '../data/regulations.json'
import type { Funding, Regulation } from '../types'

export default function PreviewPage() {
  const { profil } = useProfil()
  const navigate = useNavigate()

  useEffect(() => {
    if (!profil) navigate('/onboarding')
  }, [profil, navigate])

  const fundings = useMemo(() => profil ? sortedFundings(fundingData as Funding[], profil) : [], [profil])
  const regulations = useMemo(() => profil ? filterRegulations(regulationData as Regulation[], profil, {}) : [], [profil])
  const offenCount = regulations.filter(r => r.status !== 'nicht_relevant').length

  if (!profil) return null

  return (
    <div className="min-h-screen bg-sand-light flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-lg">

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10">
          <div className="w-8 h-8 bg-ink rounded flex items-center justify-center">
            <span className="text-sand-light text-xs font-mono font-bold">CK</span>
          </div>
          <span className="font-serif text-ink text-xl">ComplianceKit</span>
        </div>

        {/* Ergebnis-Teaser */}
        <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">Ihre Ergebnisse sind bereit</p>
        <h1 className="font-serif text-3xl text-ink mb-2">{profil.name}</h1>
        <p className="text-sm text-muted-dark font-sans mb-8">
          {profil.rechtsform} · {profil.branche} · {profil.bundesland}
        </p>

        {/* Zahlen */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-white border border-sand-border rounded-xl p-5">
            <div className="font-serif text-4xl text-ink leading-none">{fundings.length}</div>
            <div className="text-xs font-mono text-muted-dark mt-1.5 uppercase tracking-wider">Förderprogramme</div>
          </div>
          <div className="bg-white border border-sand-border rounded-xl p-5">
            <div className="font-serif text-4xl text-ink leading-none">{offenCount}</div>
            <div className="text-xs font-mono text-muted-dark mt-1.5 uppercase tracking-wider">Rechtspflichten</div>
          </div>
        </div>

        {/* Hard Lock */}
        <div className="bg-white border border-sand-border rounded-xl p-6">
          <p className="text-sm font-sans text-muted-dark mb-4 text-center">
            Kostenloses Konto anlegen um Ihre Ergebnisse zu sehen
          </p>
          <SignIn
            routing="path"
            path="/preview"
            afterSignInUrl="/dashboard"
            afterSignUpUrl="/dashboard"
            appearance={{
              layout: { showOptionalFields: false },
              elements: {
                rootBox: 'w-full',
                card: 'shadow-none p-0 bg-transparent gap-4',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                header: 'hidden',
                socialButtonsBlockButton:
                  'border border-sand-border bg-white hover:bg-sand-mid transition-colors text-ink font-sans font-medium rounded-lg h-11',
                socialButtonsBlockButtonText: 'text-ink font-sans font-medium text-sm',
                socialButtonsBlockButtonArrow: 'hidden',
                dividerLine: 'bg-sand-border',
                dividerText: 'text-muted text-xs bg-white px-3 font-mono',
                formFieldLabel: 'text-xs font-mono text-muted-dark uppercase tracking-wider',
                formFieldInput:
                  'border border-sand-border bg-white focus:ring-0 focus:border-ink rounded-lg text-sm h-11 px-4 text-ink placeholder-muted transition-colors font-sans',
                formButtonPrimary:
                  'bg-ink hover:bg-ink-light transition-colors font-sans font-medium rounded-lg h-11 text-sm text-sand-light',
                footerActionLink: 'text-teal-dark hover:text-teal font-medium font-sans',
                footerActionText: 'text-muted-dark font-sans text-sm',
                alertTextDanger: 'text-danger text-sm font-sans',
                otpCodeFieldInput:
                  'border border-sand-border rounded-lg text-center font-mono font-semibold text-ink focus:border-ink',
              },
            }}
          />
        </div>

        <button
          onClick={() => navigate('/onboarding')}
          className="w-full text-center mt-4 text-xs font-mono text-muted hover:text-ink transition-colors"
        >
          ← Profil bearbeiten
        </button>
      </div>
    </div>
  )
}
