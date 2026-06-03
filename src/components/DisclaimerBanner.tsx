import { useState } from 'react'

const STORAGE_KEY = 'ck_disclaimer_dismissed'

export default function DisclaimerBanner() {
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  if (dismissed) return null

  function handleDismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // localStorage not available — dismiss in memory only
    }
    setDismissed(true)
  }

  return (
    <div className="bg-amber-light border-b border-amber/30 px-4 py-2 flex items-center justify-between gap-4">
      <p className="text-xs font-sans text-amber-dark leading-snug">
        ComplianceKit ersetzt keine individuelle Rechtsberatung. Alle Angaben ohne Gewähr
        auf Vollständigkeit und Aktualität.
      </p>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Hinweis schließen"
        className="shrink-0 text-amber-dark hover:text-ink transition-colors text-sm leading-none"
      >
        ×
      </button>
    </div>
  )
}
