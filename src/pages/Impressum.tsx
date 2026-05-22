import { Link } from 'react-router-dom'

// ─── HIER DEINE DATEN EINTRAGEN ───────────────────────────────────────────────
const BETREIBER = {
  name:       'Samuel Stoeberl',          // Dein Vor- und Nachname
  firma:      'ComplianceKit',            // Firmenname
  strasse:    'Josef Schaab Straße 7',                         
  plz_ort:    '94559 Niederwinkling',             
  email:      'samuelstoeberl@gmail.com',
  telefon:    '016093369093',                         
}
// ──────────────────────────────────────────────────────────────────────────────

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 py-2.5 border-b border-sand-border last:border-0">
      <dt className="w-44 shrink-0 text-xs font-mono text-muted uppercase tracking-wider pt-0.5">{label}</dt>
      <dd className={`font-sans text-sm ${value ? 'text-ink' : 'text-amber-dark italic'}`}>
        {value || '[Bitte eintragen]'}
      </dd>
    </div>
  )
}

export default function Impressum() {
  return (
    <div className="min-h-screen bg-sand-light">
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
        <p className="text-sm text-muted-dark font-sans mb-8">Angaben gemäß § 5 TMG</p>

        <dl className="bg-white border border-sand-border rounded-xl px-6 divide-y-0 mb-8">
          <Row label="Name" value={BETREIBER.name} />
          <Row label="Firma" value={BETREIBER.firma} />
          <Row label="Rechtsform" value={BETREIBER.rechtsform} />
          <Row label="Straße & Nr." value={BETREIBER.strasse} />
          <Row label="PLZ & Ort" value={BETREIBER.plz_ort} />
          <Row label="E-Mail" value={BETREIBER.email} />
          {BETREIBER.telefon && <Row label="Telefon" value={BETREIBER.telefon} />}
          {BETREIBER.website && <Row label="Website" value={BETREIBER.website} />}
        </dl>

        <div className="bg-white border border-sand-border rounded-xl p-6 mb-8">
          <h2 className="font-sans font-semibold text-ink text-sm mb-3">Haftungsausschluss</h2>
          <p className="text-sm font-sans text-muted-dark leading-relaxed">
            Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.
          </p>
          <h3 className="font-sans font-semibold text-ink text-sm mt-4 mb-2">Haftung für Links</h3>
          <p className="text-sm font-sans text-muted-dark leading-relaxed">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.
          </p>
          <h3 className="font-sans font-semibold text-ink text-sm mt-4 mb-2">Urheberrecht</h3>
          <p className="text-sm font-sans text-muted-dark leading-relaxed">
            Die durch die Seitenbetreiber erstellten Inhalte unterliegen dem deutschen Urheberrecht.
            Vervielfältigung und Verbreitung bedürfen der schriftlichen Zustimmung des Autors.
          </p>
        </div>
      </main>
    </div>
  )
}
