import { Link } from 'react-router-dom'
import regulationData from '../data/regulations.json'
import fundingData from '../data/fundings.json'

// ── Static computation (runs at module load = "build time" for Vite) ──────────

const BRANCHEN_LIST = [
  'Gastronomie & Cafés',
  'Handwerk',
  'IT-Dienstleistungen & Software',
  'Einzelhandel',
  'Transport & Logistik',
  'Gesundheitswesen & Soziales',
] as const

type Regulation = (typeof regulationData)[number]

function countForBranche(branche: string): number {
  return (regulationData as Regulation[]).filter((r) => {
    const b = r.gilt_fuer?.branchen ?? []
    return b.includes(branche) || b.includes('alle')
  }).length
}

const totalRegulations = regulationData.length
const totalFundings = fundingData.length

// "Typisches KMU" = GmbH, 10–49 MA, average across all Branchen
const BRANCHEN_ALL = [
  'Gastronomie & Cafés',
  'Handwerk',
  'IT-Dienstleistungen & Software',
  'Einzelhandel',
  'Transport & Logistik',
  'Gesundheitswesen & Soziales',
  'Baugewerbe',
  'Industrie & Fertigung',
  'Großhandel',
  'E-Commerce',
  'KI & Hochtechnologie',
  'Unternehmensberatung & Agentur',
  'Kreativwirtschaft',
  'Hotellerie & Beherbergung',
  'Freie Berufe (Recht, Steuern, Architektur)',
  'Immobilienwesen',
  'Land- & Forstwirtschaft',
]

function kmuCountForBranche(branche: string): number {
  return (regulationData as Regulation[]).filter((r) => {
    const rf = r.gilt_fuer?.rechtsformen ?? []
    const br = r.gilt_fuer?.branchen ?? []
    const mi = r.gilt_fuer?.mitarbeiter_min ?? 0
    const rechtsformOk = rf.includes('GmbH') || rf.includes('alle')
    const brancheOk = br.includes(branche) || br.includes('alle')
    const mitarbeiterOk = mi <= 10
    return rechtsformOk && brancheOk && mitarbeiterOk
  }).length
}

const kmuCounts = BRANCHEN_ALL.map((b) => kmuCountForBranche(b))
const kmuAvg = Math.round(kmuCounts.reduce((a, c) => a + c, 0) / kmuCounts.length)
const aufwandStunden = kmuAvg * 2

const branchenStats = BRANCHEN_LIST.map((b) => ({
  branche: b,
  count: countForBranche(b),
})).sort((a, b) => b.count - a.count)

const maxCount = branchenStats[0]?.count ?? 1

// ─────────────────────────────────────────────────────────────────────────────

export default function StatistikPage() {
  const tweetText = `Deutschland+hat+${totalRegulations}+Compliance-Pflichten+f%C3%BCr+KMU.+%23ComplianceKit`
  const pageUrl = 'https://compilance-kit.vercel.app/statistik'

  return (
    <div className="min-h-screen bg-sand-light">
      {/* ── Navigation ── */}
      <header className="border-b border-sand-border bg-white px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-ink rounded flex items-center justify-center">
            <span className="text-sand-light text-xs font-mono font-bold">CK</span>
          </div>
          <span className="font-serif text-ink text-lg">ComplianceKit</span>
        </Link>
        <Link
          to="/onboarding"
          className="text-sm font-mono text-muted hover:text-ink transition-colors"
        >
          Jetzt starten →
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-14 space-y-14">

        {/* ── 1. Header ── */}
        <section className="text-center space-y-4">
          <p className="font-mono text-xs text-muted uppercase tracking-widest">Statistik</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-ink leading-tight">
            Bürokratie in Zahlen
          </h1>
          <p className="text-base font-sans text-muted-dark max-w-xl mx-auto leading-relaxed">
            Kleine und mittlere Unternehmen in Deutschland tragen eine der höchsten
            Regulierungslasten Europas. Hier sind die nüchternen Zahlen dahinter.
          </p>
        </section>

        {/* ── 2. Stats grid ── */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              label="Gesetzliche Pflichten"
              value={String(totalRegulations)}
              sub="in der Datenbank"
            />
            <StatCard
              label="Typisches KMU"
              value={String(kmuAvg)}
              sub="Pflichten im Schnitt (GmbH, 10–49 MA)"
            />
            <StatCard
              label="Geschätzter Aufwand"
              value={`${aufwandStunden}`}
              sub="Stunden / Jahr"
            />
            <StatCard
              label="Förderprogramme"
              value={String(totalFundings)}
              sub="verfügbar"
            />
          </div>
        </section>

        {/* ── 3. Top Branchen ── */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-ink">Top Branchen nach Pflichten</h2>
          <p className="text-sm font-sans text-muted-dark">
            Anzahl geltender Vorschriften je Branche (inkl. branchenübergreifender Pflichten).
          </p>
          <div className="space-y-3">
            {branchenStats.map(({ branche, count }) => (
              <BrancheBar key={branche} branche={branche} count={count} max={maxCount} />
            ))}
          </div>
        </section>

        {/* ── 4. Political statement ── */}
        <section>
          <blockquote className="bg-ink text-sand-light rounded-xl px-8 py-7 font-sans text-base leading-relaxed">
            „Diese Zahlen zeigen: Deutschland reguliert kleine Unternehmen in einem Ausmaß,
            das Eigenverantwortung und Wachstum strukturell hemmt. ComplianceKit macht
            Bürokratie sichtbar — als ersten Schritt zur Vereinfachung."
          </blockquote>
        </section>

        {/* ── 5. Share buttons ── */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl text-ink">Teilen</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0A66C2] text-white text-sm font-sans px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(pageUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-sand-light text-sm font-sans px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
            >
              <XIcon />
              X / Twitter
            </a>
          </div>
        </section>

        {/* ── 6. CTA ── */}
        <section className="text-center space-y-3">
          <p className="text-sm font-sans text-muted-dark">
            Welche Pflichten gelten konkret für Ihr Unternehmen?
          </p>
          <Link
            to="/onboarding"
            className="inline-block bg-ink text-sand-light font-mono text-sm px-6 py-3 rounded-lg hover:opacity-80 transition-opacity"
          >
            Jetzt eigene Pflichten prüfen →
          </Link>
        </section>

      </main>

      {/* ── 7. Footer ── */}
      <footer className="border-t border-sand-border py-6 text-center space-x-6">
        <Link to="/impressum" className="text-xs font-mono text-muted hover:text-ink transition-colors">
          Impressum
        </Link>
        <Link to="/datenschutz" className="text-xs font-mono text-muted hover:text-ink transition-colors">
          Datenschutz
        </Link>
      </footer>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-white border border-sand-border rounded-xl p-5 flex flex-col gap-1">
      <span className="font-mono text-xs text-muted uppercase tracking-wider leading-tight">{label}</span>
      <span className="font-serif text-3xl text-ink leading-none">{value}</span>
      <span className="font-sans text-xs text-muted-dark leading-snug">{sub}</span>
    </div>
  )
}

function BrancheBar({ branche, count, max }: { branche: string; count: number; max: number }) {
  const pct = Math.round((count / max) * 100)
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="font-sans text-sm text-ink">{branche}</span>
        <span className="font-mono text-xs text-muted">{count}</span>
      </div>
      <div className="h-2 bg-sand-mid rounded-full overflow-hidden">
        <div
          className="h-full bg-ink rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
