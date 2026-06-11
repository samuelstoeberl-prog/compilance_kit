# Verzeichnis von Verarbeitungstätigkeiten (VVT)

gemäß Art. 30 DSGVO – Verantwortlicher: Samuel Stoeberl (ComplianceKit)

Internes Dokument. Nicht für die Veröffentlichung bestimmt.

Stand: siehe Git-Historie dieser Datei.

---

## 1. Verarbeitung: Kontoverwaltung & Authentifizierung

| Feld | Angabe |
|---|---|
| Zweck | Registrierung, Login und Verwaltung von Nutzerkonten |
| Datenkategorien | E-Mail-Adresse, Session-Token, Login-Zeitstempel |
| Betroffene Personen | Registrierte Nutzer (Geschäftsführer/Inhaber von KMU) |
| Empfänger | Clerk.com Inc. (Auftragsverarbeiter, USA, SCC) |
| Rechtsgrundlage | Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) |
| Drittlandtransfer | USA – Standardvertragsklauseln (SCC) gem. Art. 46 DSGVO |
| Löschfrist | Bis zur Kontolöschung durch den Nutzer (selbstständig über `/konto`) |
| TOMs | TLS-Verschlüsselung, HttpOnly-Session-Cookies, Passwort-/OAuth-Handling vollständig bei Clerk |

---

## 2. Verarbeitung: Unternehmensprofil & Compliance-Status

| Feld | Angabe |
|---|---|
| Zweck | Bereitstellung der Compliance- und Fördermittel-Übersicht; Generierung von Dokumentvorlagen |
| Datenkategorien | Unternehmensname, Rechtsform, Branche, Bundesland, Mitarbeiterzahl, Umsatz, Gründungsjahr, Bearbeitungsstatus einzelner Pflichten, optional: E-Mail, Telefon, Adresse, Website |
| Betroffene Personen | Registrierte Nutzer |
| Empfänger | Neon Tech Inc. (Auftragsverarbeiter, PostgreSQL-Hosting auf AWS, USA, SCC) |
| Rechtsgrundlage | Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) |
| Drittlandtransfer | USA – Standardvertragsklauseln (SCC) gem. Art. 46 DSGVO |
| Löschfrist | Bis zur Kontolöschung (CASCADE-Löschung über `companies` → `regulation_status`) |
| TOMs | TLS-verschlüsselte DB-Verbindung (Zertifikatsprüfung aktiv), parametrisierte SQL-Queries, App-seitige Ownership-Prüfung pro Request (`requireCompanyOwnership`), Rate-Limiting |

---

## 3. Verarbeitung: Lokales Caching (ohne Login)

| Feld | Angabe |
|---|---|
| Zweck | Offline-Fähigkeit, schnelle Erstanzeige vor/ohne Login |
| Datenkategorien | Wie Punkt 2, ausschließlich im Browser des Nutzers (localStorage) |
| Betroffene Personen | Besucher ohne Account |
| Empfänger | Keine – Daten verlassen das Endgerät nicht |
| Rechtsgrundlage | Technisch notwendig, keine gesonderte Rechtsgrundlage erforderlich |
| Drittlandtransfer | Entfällt |
| Löschfrist | Bis der Nutzer den Browser-Cache/localStorage leert |
| TOMs | Keine Übertragung an Server |

---

## 4. Verarbeitung: KI-gestützte Dokumentgenerierung

| Feld | Angabe |
|---|---|
| Zweck | Generierung von Vorlagen-Texten (Datenschutzerklärung, Impressum etc.) auf Basis des Unternehmensprofils |
| Datenkategorien | Unternehmensname, Rechtsform, Branche, Mitarbeiterzahl, Bundesland, Umsatz, Gründungsjahr (aus Punkt 2) |
| Betroffene Personen | Registrierte Nutzer |
| Empfänger | Anthropic (API-Anbieter), serverseitiger Aufruf über `/api/ai/documents` |
| Rechtsgrundlage | Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) |
| Drittlandtransfer | Zu prüfen – abhängig vom Anthropic-DPA/Standort der Verarbeitung |
| Löschfrist | Keine Speicherung der Anfrage-Inhalte über den einzelnen Request hinaus serverseitig vorgesehen |
| TOMs | Authentifizierung (`requireAuth`) und Rate-Limiting (10 Anfragen/Stunde) auf dem Endpoint |

---

## 5. Verarbeitung: Hosting & technische Logs

| Feld | Angabe |
|---|---|
| Zweck | Bereitstellung der Webanwendung (Frontend + Serverless API) |
| Datenkategorien | IP-Adressen, technische Zugriffslogs |
| Betroffene Personen | Alle Besucher der Website |
| Empfänger | Vercel Inc. (Auftragsverarbeiter, USA, SCC) |
| Rechtsgrundlage | Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen – Betriebssicherheit) |
| Drittlandtransfer | USA – Standardvertragsklauseln (SCC) gem. Art. 46 DSGVO |
| Löschfrist | Gemäß Vercel-Standardaufbewahrung für Zugriffslogs |
| TOMs | Security-Header (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`), `trust proxy` für korrekte Client-IP-Erkennung beim Rate-Limiting |

---

## Offene Punkte / TODO

- [ ] Anthropic-DPA/Drittlandtransfer für Punkt 4 final klären und ggf. in Datenschutzerklärung ergänzen
- [ ] DPA-Status bei Clerk, Neon, Vercel im jeweiligen Dashboard aktiv bestätigen (siehe `docs/dpa-checkliste.md`)
- [ ] Bei neuen Features: dieses Dokument um neue Verarbeitungstätigkeiten ergänzen
