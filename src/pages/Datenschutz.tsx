import { Link } from 'react-router-dom'

// ─── HIER DEINE DATEN EINTRAGEN ───────────────────────────────────────────────
const BETREIBER = {
  name:    'Samuel Stoeberl',           // Dein Vor- und Nachname
  firma:   'ComplianceKit',             // Firmenname
  strasse: 'Josef Schwaab Straße 7 ',                         
  plz_ort: '94559 Niederwinkling',                          
  email:   'samuelstoeberl@gmail.com',
  bundesland: 'Bayern',
}
// ──────────────────────────────────────────────────────────────────────────────

export default function Datenschutz() {
  const stand = new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })

  const missingFields = !BETREIBER.strasse || !BETREIBER.plz_ort

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
        <h1 className="font-serif text-3xl text-ink mb-2">Datenschutzerklärung</h1>
        <p className="text-sm text-muted-dark font-sans mb-10">gemäß Art. 13, 14 DSGVO · Stand: {stand}</p>

        {missingFields && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs font-sans text-amber-dark">
            Fehlende Pflichtangaben sind orange markiert.{' '}
            <Link to="/onboarding" className="underline">Profil vervollständigen →</Link>
          </div>
        )}

        <div className="space-y-8">

          <section className="bg-teal-light border border-teal/30 rounded-xl p-5">
            <p className="text-sm font-sans text-teal-dark leading-relaxed">
              <strong>Kurzfassung:</strong> ComplianceKit speichert alle Ihre Daten ausschließlich lokal
              in Ihrem Browser. Es werden keine personenbezogenen Daten an unsere Server übertragen oder
              dort gespeichert. Kein Tracking, keine Cookies.
            </p>
          </section>

          <Section nr="1" titel="Verantwortlicher">
            <p><strong>{BETREIBER.name}</strong></p>
            <p className={BETREIBER.strasse ? 'text-ink' : 'text-amber-dark italic'}>{BETREIBER.strasse || '[Straße und Hausnummer]'}</p>
            <p className={BETREIBER.plz_ort ? 'text-ink' : 'text-amber-dark italic'}>{BETREIBER.plz_ort || '[PLZ und Ort]'}</p>
            <p className="mt-1">E-Mail: {BETREIBER.email}</p>
            <p className="text-muted-dark mt-2 text-xs">
              Vollständige Angaben: <Link to="/impressum" className="underline hover:text-ink">Impressum</Link>
            </p>
          </Section>

          <Section nr="2" titel="Besonderheit dieser Anwendung">
            <p>
              ComplianceKit ist eine browserbasierte Anwendung. Alle eingegebenen Daten
              (Unternehmensprofil, Compliance-Status, Kontaktdaten) werden ausschließlich im
              lokalen Speicher Ihres Browsers (localStorage) gespeichert.
            </p>
            <p className="mt-2">
              Es findet <strong>keine Übertragung</strong> dieser Daten an unsere Server statt.
              Wir haben keinen Zugriff auf Ihre eingegebenen Informationen.
            </p>
          </Section>

          <Section nr="3" titel="Verarbeitete Daten">
            <ul className="list-disc list-inside space-y-1">
              <li>Unternehmensdaten (Name, Rechtsform, Branche, Bundesland)</li>
              <li>Kontaktdaten (E-Mail, Telefon, Adresse) – nur lokal im Browser</li>
              <li>Compliance-Status einzelner Pflichten – nur lokal im Browser</li>
            </ul>
            <p className="mt-2">All diese Daten verlassen Ihr Gerät nicht und werden nicht an Dritte weitergegeben.</p>
          </Section>

          <Section nr="4" titel="Zweck und Rechtsgrundlagen">
            <p><strong>Art. 6 Abs. 1 lit. b DSGVO</strong> — Vertragserfüllung</p>
            <p className="mt-1 text-muted-dark">
              Bereitstellung der Compliance- und Fördermittel-Übersicht auf Basis Ihrer Unternehmensangaben.
            </p>
            <p className="mt-3"><strong>Art. 6 Abs. 1 lit. f DSGVO</strong> — Berechtigte Interessen</p>
            <p className="mt-1 text-muted-dark">Verbesserung und Weiterentwicklung der Anwendung.</p>
          </Section>

          <Section nr="5" titel="Cookies und Tracking">
            <p>
              Diese Website verwendet <strong>keine</strong> Tracking-Cookies, Analyse-Tools
              (z.B. Google Analytics) oder Marketing-Tools.
            </p>
            <p className="mt-2">
              Es wird ausschließlich der technisch notwendige Browser-Speicher (localStorage)
              verwendet, der keine Einwilligung erfordert.
            </p>
          </Section>

          <Section nr="6" titel="Hosting">
            <p>
              Diese Website wird gehostet von <strong>Vercel Inc.</strong> (340 Pine Street, Suite 701,
              San Francisco, CA 94104, USA). Vercel verarbeitet technische Zugriffsdaten
              (z.B. IP-Adressen) beim Aufruf der Website gemäß deren Datenschutzrichtlinie.
            </p>
            <p className="mt-2">
              Weitere Informationen:{' '}
              <a href="https://vercel.com/legal/privacy-policy" className="underline hover:text-ink" target="_blank" rel="noopener noreferrer">
                vercel.com/legal/privacy-policy
              </a>
            </p>
          </Section>

          <Section nr="7" titel="Datenlöschung">
            <p>Sie können alle gespeicherten Daten jederzeit löschen:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Browser-Einstellungen → Websitedaten löschen</li>
              <li>Oder: Browsercache / localStorage für diese Seite leeren</li>
            </ul>
            <p className="mt-2">Eine serverseitige Speicherung findet nicht statt.</p>
          </Section>

          <Section nr="8" titel="Ihre Rechte (Art. 15–22 DSGVO)">
            <ul className="list-disc list-inside space-y-1">
              <li>Auskunft über Ihre gespeicherten Daten (Art. 15)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16)</li>
              <li>Löschung Ihrer Daten (Art. 17)</li>
              <li>Einschränkung der Verarbeitung (Art. 18)</li>
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
