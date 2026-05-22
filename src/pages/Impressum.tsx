import { Link } from 'react-router-dom'
import { useProfil } from '../context/ProfilContext'

function Row({ label, value, missing }: { label: string; value?: string; missing?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 py-2.5 border-b border-sand-border last:border-0">
      <dt className="w-44 shrink-0 text-xs font-mono text-muted uppercase tracking-wider pt-0.5">{label}</dt>
      <dd className={`font-sans text-sm ${value ? 'text-ink' : 'text-amber-dark'}`}>
        {value ?? <span className="italic">{missing ?? '[Bitte eintragen]'}</span>}
      </dd>
    </div>
  )
}

export default function Impressum() {
  const { profil } = useProfil()

  const rechtsformHinweis = (() => {
    const rf = profil?.rechtsform ?? ''
    if (['GmbH', 'UG (haftungsbeschränkt)', 'gGmbH (gemeinnützig)', 'GmbH & Co. KG'].includes(rf))
      return 'GmbH / UG / gGmbH: Handelsregister + Registergericht + Geschäftsführer erforderlich.'
    if (['AG'].includes(rf))
      return 'AG: Handelsregister + Registergericht + Vorstand + Aufsichtsratsvorsitzender erforderlich.'
    if (['e.V. (Verein)'].includes(rf))
      return 'e.V.: Vereinsregister + Registergericht + Vorstand erforderlich.'
    if (['eG (Genossenschaft)'].includes(rf))
      return 'eG: Genossenschaftsregister + Vorstand erforderlich.'
    return null
  })()

  return (
    <div className="min-h-screen bg-sand-light">
      {/* Header */}
      <header className="border-b border-sand-border bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-ink rounded flex items-center justify-center">
            <span className="text-sand-light text-xs font-mono font-bold">CK</span>
          </div>
          <span className="font-serif text-ink text-lg">ComplianceKit</span>
        </div>
        <Link to="/dashboard" className="text-sm font-mono text-muted hover:text-ink transition-colors">
          ← Dashboard
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="font-serif text-3xl text-ink mb-2">Impressum</h1>
        <p className="text-sm text-muted-dark font-sans mb-8">
          Angaben gemäß § 5 TMG
        </p>

        {rechtsformHinweis && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs font-sans text-amber-dark">
            <strong>Hinweis für Ihre Rechtsform:</strong> {rechtsformHinweis}
          </div>
        )}

        <dl className="bg-white border border-sand-border rounded-xl px-6 divide-y-0 mb-8">
          <Row label="Unternehmensname" value={profil?.name || undefined} missing="[Unternehmensname]" />
          <Row label="Rechtsform" value={profil?.rechtsform || undefined} />
          <Row label="Straße & Nr." value={profil?.strasse || undefined} missing="[Straße und Hausnummer]" />
          <Row label="PLZ & Ort" value={profil?.plz_ort || undefined} missing="[PLZ und Ort]" />
          <Row label="Bundesland" value={profil?.bundesland || undefined} />
          <Row label="E-Mail" value={profil?.email || undefined} missing="[E-Mail-Adresse]" />
          <Row label="Telefon" value={profil?.telefon || undefined} missing="[Telefonnummer]" />
          {profil?.website && <Row label="Website" value={profil.website} />}
        </dl>

        <div className="bg-white border border-sand-border rounded-xl px-6 mb-8">
          <div className="py-3 border-b border-sand-border">
            <h2 className="font-sans font-semibold text-ink text-sm">Angaben je nach Rechtsform zu ergänzen</h2>
            <p className="text-xs text-muted font-sans mt-1">
              Tragen Sie die folgenden Angaben manuell in Ihrem veröffentlichten Impressum ein:
            </p>
          </div>
          <dl className="divide-y-0">
            <Row label="Handelsregister" missing="[z.B. HRB 12345]" />
            <Row label="Registergericht" missing="[z.B. Amtsgericht Berlin]" />
            <Row label="Geschäftsführung" missing="[Vor- und Nachname]" />
            <Row label="USt-IdNr." missing="[z.B. DE123456789 — falls vorhanden]" />
            <Row label="Steuernummer" missing="[Finanzamt / Steuernummer]" />
          </dl>
        </div>

        <div className="bg-white border border-sand-border rounded-xl p-6 mb-8">
          <h2 className="font-sans font-semibold text-ink text-sm mb-3">Haftungsausschluss</h2>
          <p className="text-sm font-sans text-muted-dark leading-relaxed">
            Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich.
          </p>
          <h3 className="font-sans font-semibold text-ink text-sm mt-4 mb-2">Haftung für Links</h3>
          <p className="text-sm font-sans text-muted-dark leading-relaxed">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
          <h3 className="font-sans font-semibold text-ink text-sm mt-4 mb-2">Urheberrecht</h3>
          <p className="text-sm font-sans text-muted-dark leading-relaxed">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
            Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb
            der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw.
            Erstellers.
          </p>
        </div>

        <p className="text-xs text-muted font-sans text-center">
          Diese Seite wurde automatisch mit Ihren Profildaten befüllt.{' '}
          <Link to="/onboarding" className="underline hover:text-ink transition-colors">
            Profil bearbeiten
          </Link>{' '}
          um fehlende Angaben zu ergänzen.
        </p>
      </main>
    </div>
  )
}
