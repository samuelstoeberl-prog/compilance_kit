import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

// ─── HIER DEINE DATEN EINTRAGEN ───────────────────────────────────────────────
const BETREIBER = {
  name:    'Samuel Stoeberl',           // Dein Vor- und Nachname
  firma:   'ComplianceKit',             // Firmenname
  strasse: 'Josef Schwab Straße 7',
  plz_ort: '94559 Niederwinkling',
  email:   'samuelstoeberl@gmail.com',
  bundesland: 'Bayern',
}
// ──────────────────────────────────────────────────────────────────────────────

export default function Datenschutz() {
  const stand = new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })

  return (
    <div className="min-h-screen bg-sand-light">
      <Seo title="Datenschutzerklärung – ComplianceKit" description="Datenschutzerklärung von ComplianceKit gemäß Art. 13, 14 DSGVO." />
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
        <h1 className="font-serif text-3xl text-ink mb-2">Datenschutzerklärung</h1>
        <p className="text-sm text-muted-dark font-sans mb-10">gemäß Art. 13, 14 DSGVO · Stand: {stand}</p>

        <div className="space-y-8">

          <section className="bg-teal-light border border-teal/30 rounded-xl p-5">
            <p className="text-sm font-sans text-teal-dark leading-relaxed">
              <strong>Kurzfassung:</strong> Ohne Login speichert ComplianceKit Ihre Eingaben nur lokal
              in Ihrem Browser (localStorage) – diese Daten verlassen Ihr Gerät nicht. Mit Login werden
              Ihr Unternehmensprofil und Ihr Compliance-Status zusätzlich in einer Cloud-Datenbank
              (Neon, USA) gespeichert, damit Sie geräteübergreifend darauf zugreifen können. Die
              Anmeldung selbst läuft über Clerk, gehostet wird die App über Vercel. Es findet kein
              Tracking, keine Analyse-Software und kein Einsatz von Marketing-Cookies statt.
            </p>
          </section>

          <Section nr="1" titel="Verantwortlicher">
            <p><strong>{BETREIBER.name}</strong></p>
            <p>{BETREIBER.strasse}</p>
            <p>{BETREIBER.plz_ort}</p>
            <p className="mt-1">E-Mail: {BETREIBER.email}</p>
            <p className="text-muted-dark mt-2 text-xs">
              Vollständige Angaben: <Link to="/impressum" className="underline hover:text-ink">Impressum</Link>
            </p>
          </Section>

          <Section nr="2" titel="Übersicht der verarbeiteten Daten">
            <p>
              <strong>Ohne Login:</strong> Ihr Unternehmensprofil und der Status Ihrer Compliance-Pflichten
              werden ausschließlich im lokalen Speicher (localStorage) Ihres Browsers abgelegt. Diese
              Daten werden nicht an unsere Server übertragen.
            </p>
            <p className="mt-2">
              <strong>Mit Login:</strong> Zusätzlich werden folgende Daten in unserer Datenbank gespeichert,
              damit Sie Ihre Daten geräteübergreifend nutzen können:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Unternehmensname, Rechtsform, Branche, Bundesland</li>
              <li>Mitarbeiterzahl, Umsatz, Gründungsjahr</li>
              <li>Bearbeitungsstatus der einzelnen Compliance-Pflichten</li>
            </ul>
          </Section>

          <Section nr="3" titel="Eingesetzte Auftragsverarbeiter">
            <p className="mb-4">
              Für den Betrieb dieser Anwendung setzen wir folgende Dienstleister (Auftragsverarbeiter
              gemäß Art. 28 DSGVO) ein:
            </p>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-ink">a) Clerk.com Inc.</p>
                <p className="text-muted-dark">354 Oyster Point Blvd, South San Francisco, CA 94080, USA</p>
                <p className="mt-1">Verarbeitete Daten: E-Mail-Adresse, Session-Token, Login-Zeitstempel</p>
                <p>Zweck: Authentifizierung und Session-Management</p>
                <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO</p>
                <p>Drittlandtransfer (USA): Standardvertragsklauseln (SCC) gemäß Art. 46 DSGVO</p>
                <p>
                  Datenschutz:{' '}
                  <a href="https://clerk.com/legal/privacy" className="underline hover:text-ink" target="_blank" rel="noopener noreferrer">
                    clerk.com/legal/privacy
                  </a>
                </p>
              </div>

              <div>
                <p className="font-medium text-ink">b) Neon Tech Inc.</p>
                <p className="text-muted-dark">1 Front Street Suite 2800, San Francisco, CA 94111, USA</p>
                <p className="mt-1">Verarbeitete Daten: Unternehmensprofil, Compliance-Status (nur eingeloggte Nutzer)</p>
                <p>Zweck: Geräteübergreifende Datenpersistenz (PostgreSQL-Datenbank, gehostet auf AWS)</p>
                <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO</p>
                <p>Drittlandtransfer (USA): Standardvertragsklauseln (SCC) gemäß Art. 46 DSGVO</p>
                <p>
                  Datenschutz:{' '}
                  <a href="https://neon.tech/privacy-policy" className="underline hover:text-ink" target="_blank" rel="noopener noreferrer">
                    neon.tech/privacy-policy
                  </a>
                </p>
              </div>

              <div>
                <p className="font-medium text-ink">c) Vercel Inc.</p>
                <p className="text-muted-dark">340 Pine Street Suite 701, San Francisco, CA 94104, USA</p>
                <p className="mt-1">Verarbeitete Daten: IP-Adressen, technische Zugriffslogs</p>
                <p>Zweck: Hosting und Bereitstellung der Webanwendung (Frontend und Serverless API-Funktionen)</p>
                <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen)</p>
                <p>Drittlandtransfer (USA): Standardvertragsklauseln (SCC) gemäß Art. 46 DSGVO</p>
                <p>
                  Datenschutz:{' '}
                  <a href="https://vercel.com/legal/privacy-policy" className="underline hover:text-ink" target="_blank" rel="noopener noreferrer">
                    vercel.com/legal/privacy-policy
                  </a>
                </p>
              </div>
            </div>
          </Section>

          <Section nr="4" titel="Rechtsgrundlagen">
            <p><strong>Art. 6 Abs. 1 lit. b DSGVO</strong> — Vertragserfüllung</p>
            <p className="mt-1 text-muted-dark">
              Bereitstellung der Compliance- und Fördermittel-Übersicht sowie Verwaltung Ihres
              Nutzerkontos auf Basis Ihrer Unternehmensangaben.
            </p>
            <p className="mt-3"><strong>Art. 6 Abs. 1 lit. f DSGVO</strong> — Berechtigte Interessen</p>
            <p className="mt-1 text-muted-dark">
              Sicherer und stabiler Betrieb der Anwendung (technische Zugriffslogs über Vercel).
            </p>
          </Section>

          <Section nr="5" titel="Speicherdauer">
            <ul className="list-disc list-inside space-y-1">
              <li>localStorage: bis Sie Ihre Browserdaten löschen oder die Daten selbst entfernen</li>
              <li>Neon-Datenbank: bis zur Löschung Ihres Kontos</li>
              <li>Clerk: bis zur Löschung Ihres Kontos</li>
            </ul>
          </Section>

          <Section nr="6" titel="Cookies und localStorage">
            <p>
              Clerk setzt technisch notwendige Session-Cookies, um Sie eingeloggt zu halten. Diese
              dienen keinem Tracking und keiner Analyse.
            </p>
            <p className="mt-2">
              Zusätzlich nutzt ComplianceKit den localStorage Ihres Browsers als Performance-Cache für
              Ihr Unternehmensprofil und Ihren Compliance-Status. Da es sich um technisch notwendige
              Funktionen handelt, ist hierfür keine gesonderte Einwilligung erforderlich.
            </p>
          </Section>

          <Section nr="7" titel="Datenlöschung">
            <p>
              <strong>Eingeloggte Nutzer</strong> können ihr Konto und alle damit verknüpften Daten
              jederzeit löschen über: <Link to="/konto" className="underline hover:text-ink">Konto-Einstellungen → Konto löschen</Link>,
              oder per E-Mail an {BETREIBER.email}.
            </p>
            <p className="mt-2">
              <strong>Ohne Login</strong> können Sie die lokal gespeicherten Daten über die
              Browser-Einstellungen (Websitedaten / localStorage für diese Seite löschen) entfernen.
            </p>
          </Section>

          <Section nr="8" titel="Ihre Rechte (Art. 15–22 DSGVO)">
            <ul className="list-disc list-inside space-y-1">
              <li>Auskunft über Ihre gespeicherten Daten (Art. 15)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16)</li>
              <li>Löschung Ihrer Daten (Art. 17)</li>
              <li>Einschränkung der Verarbeitung (Art. 18)</li>
              <li>Datenübertragbarkeit (Art. 20) – Export als JSON über <Link to="/konto" className="underline hover:text-ink">Konto-Einstellungen</Link></li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21)</li>
            </ul>
            <p className="mt-3">Anfragen richten Sie an: {BETREIBER.email}</p>
          </Section>

          <Section nr="9" titel="Beschwerderecht">
            <p>
              Sie haben das Recht, sich bei der zuständigen Datenschutzaufsichtsbehörde zu beschweren.
              {` Für ${BETREIBER.bundesland}:`}
            </p>
            <p className="mt-2 font-medium">Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)</p>
            <p className="text-muted-dark">Promenade 18, 91522 Ansbach</p>
            <p>
              <a href="https://www.lda.bayern.de" className="underline hover:text-ink" target="_blank" rel="noopener noreferrer">
                www.lda.bayern.de
              </a>
            </p>
          </Section>

        </div>
      </main>
    </div>
  )
}

function Section({ nr, titel, children }: { nr: string; titel: string; children: React.ReactNode }) {
  return (
    <section className="bg-white border border-sand-border rounded-xl p-6">
      <h2 className="font-sans font-semibold text-ink text-sm mb-3">
        <span className="text-muted font-mono mr-2">{nr}.</span>{titel}
      </h2>
      <div className="text-sm font-sans text-muted-dark leading-relaxed space-y-1">
        {children}
      </div>
    </section>
  )
}
