# Security

Stand: 2026-08-30. Beschreibt den **tatsächlichen** Ist-Zustand nach einem
Audit des Codes (nicht den Wunschzustand). Wo etwas fehlt, steht das
explizit dabei.

> **Kein Zertifikat.** Dieses Dokument ist kein Ersatz für einen externen
> Penetrationstest oder eine formale Security-Zertifizierung. Es beschreibt,
> was implementiert und lokal verifiziert wurde. Vor einem Produktivbetrieb
> mit echten Unternehmensdaten sollte ein unabhängiger Review stattfinden.

## Authentifizierung & Session-Management

Auth läuft vollständig über **[Clerk](https://clerk.com)**
(`@clerk/express` im Backend, `@clerk/clerk-react` im Frontend). Das
Projekt implementiert **kein eigenes** Passwort-Hashing, keine eigene
Session-/JWT-Ausstellung und keine eigene Passwort-Reset-Logik — das ist
bewusst so gewählt: Auth selbst zu bauen ist eine der häufigsten Quellen
für kritische Sicherheitslücken, und Clerk übernimmt Passwort-Hashing,
Session-Cookies, JWT-Verifikation, OAuth und Passwort-Reset als
verwalteten Dienst.

- `backend/src/middleware/auth.ts` — `requireAuth` verifiziert das
  Clerk-Session-Token auf jeder geschützten Route und gibt `401` zurück,
  wenn kein gültiger Nutzer erkannt wird. Getestet in
  `backend/src/middleware/auth.test.ts`.
- Clerk läuft im Backend als globale Middleware (`clerkMiddleware()` in
  `app.ts`) **vor** allen Routen.

## Autorisierung / Broken Access Control (OWASP A01)

`backend/src/middleware/ownership.ts` (`requireCompanyOwnership`) lädt das
Unternehmen zur angeforderten ID und vergleicht `company.clerk_user_id`
mit dem eingeloggten Nutzer:

- Unternehmen existiert nicht → `404`
- Unternehmen gehört einem anderen Nutzer → `403`
- Nur bei Übereinstimmung wird `req.company` gesetzt und die Route
  weiterverarbeitet

Das verhindert IDOR (Insecure Direct Object Reference) — ein Nutzer kann
nicht durch Erraten/Iterieren von IDs auf fremde Unternehmensdaten
zugreifen. Getestet in `ownership.test.ts`, inklusive eines Falls, der
prüft, dass die Company-ID als gebundener SQL-Parameter übergeben wird
und nicht in den Query-String interpoliert wird.

## Input-Validierung & Injection (OWASP A03)

Alle Request-Bodies laufen durch **Zod-Schemas**
(`backend/src/middleware/validate.ts`): `CompanySchema` (feste Enum-Werte
für Rechtsform/Mitarbeiterzahl, Längenlimits auf allen Strings),
`StatusUpdateSchema`, `DocumentRequestSchema` (in `routes/ai.ts`).
Route-Parameter, die als DB-Lookup-Key dienen, laufen durch
`validateUUID()` (Regex-Format-Check, bevor die ID überhaupt an die DB
geht).

Datenbankzugriffe laufen ausschließlich über parametrisierte Queries
(`pg`, `$1`/`$2`-Platzhalter) — keine String-Konkatenation von
Nutzereingaben in SQL. Verifiziert per Test (s.o.).

## Secrets-Management

- `ANTHROPIC_API_KEY` und `CLERK_SECRET_KEY` existieren **nur** als
  Backend-Umgebungsvariablen (`backend/.env`, nie mit `VITE_`-Prefix —
  alles mit `VITE_`-Prefix landet im Client-Bundle und wäre damit
  öffentlich einsehbar).
- `routes/ai.ts` ruft die Anthropic-API ausschließlich serverseitig auf;
  das Frontend bekommt nur den fertigen Dokumenttext zurück, nie den Key.
- `.env`, `.env.local` sind in `.gitignore`; `.env.example` /
  `backend/.env.example` enthalten nur Platzhalter.
- **Bekannte Lücke:** Kein Secret-Rotation-Prozess und kein Vault/KMS —
  angemessen für die aktuelle Größenordnung (Vercel-Env-Vars), aber bei
  mehr Nutzern/Team-Mitgliedern zu überdenken.

## Rate Limiting

`backend/src/middleware/rateLimit.ts`:

- `generalLimiter`: 300 Requests / 15 Min pro IP auf `/api/*`
- `aiLimiter`: 10 Requests / Stunde pro IP auf `/api/ai/*` (kostenpflichtige
  Anthropic-Calls — verhindert sowohl Kosten-Abuse als auch DoS)
- `trust proxy` ist in `app.ts` korrekt gesetzt, damit Rate-Limiting hinter
  dem Vercel-Reverse-Proxy die echte Client-IP sieht und nicht die
  Proxy-IP für alle Requests

**Bekannte Lücke:** Kein dediziertes Login-Rate-Limiting — das liegt aber
in der Verantwortung von Clerk (verwaltet Auth-Versuche/Brute-Force-Schutz
selbst), nicht im eigenen Code.

## Transport & Header-Security

- TLS zur Datenbank erzwungen in Production
  (`backend/src/db/client.ts`: `ssl: { rejectUnauthorized: true }` wenn
  `NODE_ENV === 'production'`)
- CORS in `app.ts` auf eine feste `FRONTEND_URL`-Origin beschränkt
  (kein `*`), nur die tatsächlich benötigten Methoden/Header erlaubt
- Security-Header gesetzt: `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`
- Deployment über Vercel liefert HTTPS für Frontend und (bei
  Vercel-Hosting des Backends) auch für die API automatisch

## Fehlerbehandlung

Ein globaler Error-Handler in `app.ts` fängt unerwartete Exceptions ab und
gibt eine generische `500`-Antwort zurück (`err` wird geloggt, aber nicht
an den Client durchgereicht) — verhindert Stack-Trace-/Interna-Leaks.

## Dependency-Sicherheit

`npm audit` lief am 2026-08-30 gegen beide Packages (Frontend, Backend)
und war zu diesem Zeitpunkt clean (0 offene Advisories) nach Behebung von:

- Frontend: `react-router-dom`/`react-router` (mehrere CVEs: Open
  Redirect, CSRF, ReDoS/DoS, XSS)
- Backend: `body-parser` (DoS), `ip-address` (SSRF-Bypass durch
  Oktal-Fehlinterpretation), `qs` (DoS)

Alle Fixes waren Semver-kompatible Lockfile-Updates (kein Code betroffen).
`npm audit` läuft jetzt außerdem als informativer CI-Job
(`.github/workflows/ci.yml`, Job `audit`) bei jedem Push/PR — er blockiert
den Merge nicht (`continue-on-error: true`), macht neue Advisories aber
sichtbar, statt dass sie unbemerkt bleiben.

## DSGVO / Datenschutz der App selbst

Getrennt von reiner Anwendungssicherheit, aber eng verwandt:

- `docs/vvt.md` — Verzeichnis von Verarbeitungstätigkeiten (Art. 30 DSGVO),
  dokumentiert Clerk als Auftragsverarbeiter mit SCC-Grundlage für den
  USA-Transfer
- `docs/incident-response-template.md` — Vorlage für Datenpannen-Meldung
- `GET /api/user/export` (Art. 20 DSGVO, Datenportabilität) und
  `DELETE /api/user/account` (Art. 17 DSGVO, Recht auf Löschung) sind
  implementiert und über `/konto` im Frontend erreichbar
- Rechtlicher Disclaimer im Dashboard-Footer: "ComplianceKit ersetzt keine
  individuelle Rechtsberatung. Alle Angaben ohne Gewähr auf Vollständigkeit
  und Aktualität."

## Bekannte Lücken (ehrlich, nicht beschönigt)

| Lücke | Risiko | Empfehlung |
|---|---|---|
| Kein externer Penetrationstest | Unbekannte Schwachstellen nicht ausgeschlossen | Vor Produktivbetrieb mit echten Unternehmensdaten in größerem Umfang durchführen |
| Kein Error-/Security-Monitoring (z.B. Sentry) | Angriffe/Fehler in Produktion bleiben unbemerkt, außer in Vercel-Logs | Fast-Follow, kein Blocker |
| Kein CSP-Header (Content-Security-Policy) | Zusätzliche XSS-Tiefenverteidigung fehlt | Nachrüstbar ohne große Umstellung |
| Kein dediziertes Secret-Rotation-Verfahren | Bei Kompromittierung eines Keys keine automatisierte Rotation | Bei Wachstum des Teams relevant |
