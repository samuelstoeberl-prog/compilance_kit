import { Link } from 'react-router-dom'

const BETREIBER = {
  name:    'Samuel Stoeberl',
  strasse: 'Josef Schaab Straße 7',
  plz_ort: '94559 Niederwinkling',
  email:   'samuelstoeberl@gmail.com',
  bundesland: 'Bayern',
}

export default function Datenschutz() {
  const stand = new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })

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

        <div className="space-y-6">

          {/* Kurzfassung */}
          <section className="bg-teal-light border border-teal/30 rounded-xl p-5">
            <p className="text-sm font-sans text-teal-dark leading-relaxed">
              <strong>Kurzfassung:</strong> Solange Sie nicht eingeloggt sind, verlassen Ihre Daten Ihr Gerät nicht —
              alles liegt im Browser-Speicher (localStorage). Sobald Sie ein Konto erstellen, werden Firmenprofil und
              Compliance-Status in einer Cloud-Datenbank gespeichert, damit Sie geräteübergreifend weiterarbeiten können.
              Kein Tracking, keine Werbung, keine Weitergabe an Dritte.
            </p>
          </section>

          <Section nr="1" titel="Verantwortlicher">
            <p><strong>{BETREIBER.name}</strong></p>
            <p>{BETREIBER.strasse}</p>
            <p>{BETREIBER.plz_ort}</p>
            <p className="mt-1">E-Mail: <a href={`mailto:${BETREIBER.email}`} className="underline hover:text-ink">{BETREIBER.email}</a></p>
            <p className="mt-2 text-xs text-muted-dark">
              Vollständige Angaben:{' '}
              <Link to="/impressum" className="underline hover:text-ink">Impressum</Link>
            </p>
          </Section>

          <Section nr="2" titel="Übersicht der verarbeiteten Daten">
            <p className="font-medium text-ink">Nicht eingeloggte Nutzer</p>
            <p className="mt-1">
              Alle eingegebenen Daten (Firmenprofil, Compliance-Status) werden ausschließlich im
              lokalen Speicher Ihres Browsers (localStorage) gespeichert. Diese Daten verlassen Ihr
              Gerät nicht. Wir haben keinen Zugriff darauf.
            </p>
            <p className="font-medium text-ink mt-4">Eingeloggte Nutzer</p>
            <p className="mt-1">
              Nach dem Anlegen eines Kontos werden folgende Daten in unserer Cloud-Datenbank gespeichert:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Unternehmensname, Rechtsform, Branche, Bundesland</li>
              <li>Mitarbeiterzahl, Jahresumsatz, Gründungsjahr</li>
              <li>Ausgewählte Förderschwerpunkte</li>
              <li>Compliance-Status einzelner Pflichten (offen / erledigt / nicht relevant)</li>
            </ul>
            <p className="mt-2">
              Die Zuordnung zur Person erfolgt über eine pseudonyme Nutzer-ID (clerk_user_id) —
              keine Klarnamen oder Kontaktdaten werden serverseitig gespeichert, sofern Sie diese
              nicht freiwillig im Profil hinterlegen.
            </p>
          </Section>

          <Section nr="3" titel="Auftragsverarbeiter">
            <p className="text-xs text-muted-dark mb-4">
              Wir setzen folgende Dienstleister ein, die als Auftragsverarbeiter gemäß Art. 28 DSGVO
              handeln und mit denen entsprechende Verträge bestehen.
            </p>

            <Auftragsverarbeiter
              buchstabe="a"
              name="Clerk.com Inc."
              adresse="354 Oyster Point Blvd, South San Francisco, CA 94080, USA"
              daten="E-Mail-Adresse, Session-Token, Login-Zeitstempel"
              zweck="Authentifizierung und Session-Management"
              grundlage="Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)"
              transfer="Drittlandtransfer USA: Standardvertragsklauseln (SCC) gem. Art. 46 DSGVO"
              url="https://clerk.com/legal/privacy"
              urlLabel="clerk.com/legal/privacy"
            />

            <Auftragsverarbeiter
              buchstabe="b"
              name="Neon Tech Inc."
              adresse="1 Front Street Suite 2800, San Francisco, CA 94111, USA"
              daten="Firmenprofil, Compliance-Status (ausschließlich eingeloggte Nutzer)"
              zweck="Geräteübergreifende Datenpersistenz (Cloud-Datenbank auf AWS-Infrastruktur)"
              grundlage="Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)"
              transfer="Drittlandtransfer USA: Standardvertragsklauseln (SCC) gem. Art. 46 DSGVO"
              url="https://neon.tech/privacy-policy"
              urlLabel="neon.tech/privacy-policy"
            />

            <Auftragsverarbeiter
              buchstabe="c"
              name="Vercel Inc."
              adresse="340 Pine Street Suite 701, San Francisco, CA 94104, USA"
              daten="IP-Adressen, technische Zugriffslogs (beim Aufruf der Website)"
              zweck="Hosting der Webanwendung und der Serverless-API-Funktionen"
              grundlage="Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen an stabilem Betrieb)"
              transfer="Drittlandtransfer USA: Standardvertragsklauseln (SCC) gem. Art. 46 DSGVO"
              url="https://vercel.com/legal/privacy-policy"
              urlLabel="vercel.com/legal/privacy-policy"
            />
          </Section>

          <Section nr="4" titel="Rechtsgrundlagen">
            <div className="space-y-2">
              <div>
                <p className="font-medium text-ink">Art. 6 Abs. 1 lit. b DSGVO — Vertragserfüllung</p>
                <p className="mt-0.5">Verarbeitung von Firmenprofil und Compliance-Status zur Erbringung der App-Leistung für eingeloggte Nutzer sowie Authentifizierung via Clerk.</p>
              </div>
              <div>
                <p className="font-medium text-ink">Art. 6 Abs. 1 lit. f DSGVO — Berechtigte Interessen</p>
                <p className="mt-0.5">Technische Zugriffslogs durch Vercel zum stabilen und sicheren Betrieb der Webanwendung.</p>
              </div>
            </div>
          </Section>

          <Section nr="5" titel="Speicherdauer">
            <ul className="list-disc list-inside space-y-1">
              <li><strong>localStorage:</strong> Bis der Nutzer die Browserdaten löscht oder das Konto abmeldet</li>
              <li><strong>Neon PostgreSQL:</strong> Bis zur Löschung des Nutzerkontos (siehe §&nbsp;7)</li>
              <li><strong>Clerk:</strong> Bis zur Löschung des Nutzerkontos</li>
              <li><strong>Vercel-Logs:</strong> Gemäß Vercel-Datenschutzrichtlinie (typisch 30 Tage)</li>
            </ul>
          </Section>

          <Section nr="6" titel="Cookies und lokaler Speicher">
            <p>
              <strong>Session-Cookies (Clerk):</strong> Clerk setzt technisch notwendige Cookies zur
              Aufrechterhaltung der Anmeldesitzung. Diese erfordern keine Einwilligung, da sie für die
              Bereitstellung des Dienstes unerlässlich sind (§ 25 Abs. 2 TDDDG).
            </p>
            <p className="mt-2">
              <strong>localStorage:</strong> Wird für Performance-Caching des Firmenprofils genutzt
              (schnelle Erstanzeige, Offline-Fähigkeit). Kein Tracking, keine gerätübergreifende
              Identifikation. Keine Einwilligung erforderlich.
            </p>
            <p className="mt-2">
              Es werden <strong>keine</strong> Analyse-, Werbe- oder Tracking-Cookies eingesetzt.
            </p>
          </Section>

          <Section nr="7" titel="Datenlöschung">
            <p className="font-medium text-ink">Eingeloggte Nutzer</p>
            <p className="mt-1">
              Sie können Ihr Konto und alle serverseitig gespeicherten Daten jederzeit löschen:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Per E-Mail an <a href={`mailto:${BETREIBER.email}`} className="underline hover:text-ink">{BETREIBER.email}</a> — Löschung erfolgt binnen 7 Werktagen</li>
            </ul>
            <p className="font-medium text-ink mt-4">Nicht eingeloggte Nutzer</p>
            <p className="mt-1">
              Browserdaten löschen: Browser-Einstellungen → Websitedaten / localStorage für diese Seite leeren.
              Serverseitig sind keine Daten gespeichert.
            </p>
          </Section>

          <Section nr="8" titel="Ihre Rechte (Art. 15–22 DSGVO)">
            <p>Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Auskunft</strong> über gespeicherte Daten (Art. 15)</li>
              <li><strong>Berichtigung</strong> unrichtiger Daten (Art. 16)</li>
              <li><strong>Löschung</strong> Ihrer Daten (Art. 17)</li>
              <li><strong>Einschränkung</strong> der Verarbeitung (Art. 18)</li>
              <li><strong>Datenübertragbarkeit</strong> in maschinenlesbarem Format (Art. 20)</li>
              <li><strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21)</li>
            </ul>
            <p className="mt-3">
              Anfragen richten Sie an:{' '}
              <a href={`mailto:${BETREIBER.email}`} className="underline hover:text-ink">{BETREIBER.email}</a>
            </p>
          </Section>

          <Section nr="9" titel="Beschwerderecht">
            <p>
              Sie haben das Recht, sich bei der zuständigen Datenschutzaufsichtsbehörde zu beschweren.
              Zuständig für {BETREIBER.bundesland}:
            </p>
            <p className="mt-2 font-medium text-ink">Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)</p>
            <p>Promenade 18, 91522 Ansbach</p>
            <p className="mt-1">
              <a href="https://www.lda.bayern.de" className="underline hover:text-ink"
                target="_blank" rel="noopener noreferrer">
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

function Auftragsverarbeiter({
  buchstabe, name, adresse, daten, zweck, grundlage, transfer, url, urlLabel,
}: {
  buchstabe: string; name: string; adresse: string; daten: string
  zweck: string; grundlage: string; transfer: string; url: string; urlLabel: string
}) {
  return (
    <div className="border border-sand-border rounded-lg p-4 mt-3 first:mt-0">
      <p className="font-medium text-ink text-sm">
        <span className="font-mono text-muted mr-1.5">{buchstabe})</span>{name}
      </p>
      <p className="text-xs text-muted-dark mt-0.5">{adresse}</p>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
        <dt className="font-mono text-muted whitespace-nowrap">Daten</dt>
        <dd>{daten}</dd>
        <dt className="font-mono text-muted whitespace-nowrap">Zweck</dt>
        <dd>{zweck}</dd>
        <dt className="font-mono text-muted whitespace-nowrap">Grundlage</dt>
        <dd>{grundlage}</dd>
        <dt className="font-mono text-muted whitespace-nowrap">Transfer</dt>
        <dd>{transfer}</dd>
        <dt className="font-mono text-muted whitespace-nowrap">Datenschutz</dt>
        <dd>
          <a href={url} target="_blank" rel="noopener noreferrer"
            className="underline hover:text-ink">{urlLabel}</a>
        </dd>
      </dl>
    </div>
  )
}
