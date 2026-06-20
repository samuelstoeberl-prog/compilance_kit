# Projekt: ComplianceKit

## Kontext

SaaS-Tool für kleine und mittlere Unternehmen (KMU) in Deutschland: zeigt anhand eines
Unternehmensprofils (Rechtsform, Branche, Bundesland, Mitarbeiterzahl, Umsatz, ...) passende
gesetzliche Compliance-Pflichten und Förderprogramme an und generiert dazu passende Dokumentvorlagen
(PDF/DOCX). Frontend: React 19 + TypeScript + Vite + Tailwind CSS, Routing über React Router v7.
Backend: Node.js/Express + TypeScript, PostgreSQL (Neon) über `pg`. Auth: Clerk
(`@clerk/clerk-react` Frontend, `@clerk/express` Backend). Hosting: Vercel. KI-Dokumentgenerierung
über die Anthropic API (`@anthropic-ai/sdk`).

## Architektur

* `/src` – Frontend (React/Vite)
  * `src/pages` – Seiten/Routen (Onboarding, Dashboard, Konto, Impressum, Datenschutz, ...)
  * `src/components` – wiederverwendbare UI-Komponenten (u.a. `DocumentGenerator.tsx`, `Seo.tsx`)
  * `src/api/client.ts` – Fetch-Wrapper für Backend-Calls
  * `src/context` – React-Context (z.B. `ProfilContext` für das Unternehmensprofil)
  * `src/utils/exportDoc.ts` – PDF/DOCX-Export inkl. `[[TABLE]]...[[/TABLE]]`-Tabellensyntax
  * `src/data` – statische JSON-Datensätze (`fundings.json`, `regulations.json`)
* `/backend/src` – Backend (Express)
  * `backend/src/routes` – API-Routen (`companies`, `match`, `ai`, `user`, ...)
  * `backend/src/middleware` – `auth.ts` (Clerk `requireAuth`), `ownership.ts`
    (zentrale Ownership-Middleware `requireCompanyOwnership`), `rateLimit.ts`
    (`generalLimiter`, `aiLimiter`)
  * `backend/src/db` – DB-Client (`client.ts`), Migrationen, Seeds
  * `backend/src/matching` – Logik zum Abgleich Profil ↔ Pflichten/Förderprogramme
* `/scrapers` – Scripts zum Einlesen von Förder-/Regulatorik-Daten in `src/data/*.json`
* `/docs` – `vvt.md` (Verarbeitungsverzeichnis Art. 30 DSGVO), `incident-response-template.md`
* Konfiguration/Secrets: `.env` im Root (Frontend, z.B. Clerk Publishable Key) und `backend/.env`
  (DB-Connection-String, Clerk Secret Key, Anthropic API Key). Beide sind gitignored;
  `.env.example` bzw. `backend/.env.example` zeigen die benötigten Variablen.

## Build, Test, Run

```bash
npm install                 # Frontend-Dependencies (Root)
npm run backend:dev         # Backend-Dependencies installieren + Dev-Server starten (separat)
npm run dev                 # Frontend (Vite) + Backend gemeinsam starten (concurrently)
npm run build                # Typecheck (tsc -b) + Vite-Production-Build
npm run lint                  # ESLint
cd backend && npm run build   # Backend-Typecheck/Build (tsc)
cd backend && npm run db:migrate   # DB-Migrationen ausführen
cd backend && npm run db:seed      # Seed-Daten einspielen
```

Es gibt aktuell keine automatisierten Tests (kein Test-Runner konfiguriert). Vor Abschluss einer
Aufgabe gelten ersatzweise: `npm run build` (Frontend) und `cd backend && npm run build`
(Backend) müssen fehlerfrei durchlaufen, sowie `npm run lint`.

## Arbeitsweise: Autonomie

Du arbeitest eigenständig an mehrstufigen Aufgaben. Grundregeln:

1. Plane, bevor du loslegst. Bei Aufgaben, die mehr als eine Datei oder mehr als einen
   offensichtlichen Schritt betreffen: kurz die Schritte auflisten (Todo-Liste), dann abarbeiten.
   Bei wirklich trivialen Änderungen (Tippfehler, eine Zeile) direkt machen, keine Planungs-Show.
2. Bleib dran, bis es fertig UND verifiziert ist. "Fertig" heißt: Code geschrieben, Build/Typecheck
   grün, Linter sauber, manuell nachvollzogen dass das Verhalten stimmt. Nicht nach dem ersten
   Compile-Erfolg aufhören.
3. Triff Routine-Entscheidungen selbst. Variablennamen, Dateistruktur für neue Module, welche
   Bibliotheksfunktion für einen Standardfall, Formatierung – das sind keine Rückfragen wert. Triff
   eine vernünftige Entscheidung, nenne sie kurz, mach weiter.
4. Frag nach, bevor du:
   * das Datenbankschema oder eine Migration änderst
   * eine Abhängigkeit hinzufügst, die nicht trivial ist
   * bestehende öffentliche APIs/Funktionssignaturen brichst
   * etwas löschst, das nicht offensichtlich totem Code ist
   * etwas deployst, pusht oder nach außen sendet
   * eine Architekturentscheidung triffst, die schwer rückgängig zu machen ist
   * eine neue Auftragsverarbeiter-Beziehung (externer Dienst, der Nutzerdaten verarbeitet)
     einführst – dafür muss auch `src/pages/Datenschutz.tsx` und `docs/vvt.md` aktualisiert werden
5. Iteriere selbst auf Fehler. Wenn ein Build/Typecheck/Lint fehlschlägt oder ein Befehl einen
   Fehler wirft: lies die Fehlermeldung, behebe sie, lauf erneut. Erst nach 2-3 erfolglosen eigenen
   Versuchen an einem Problem nachfragen, nicht bei jedem einzelnen Fehler.
6. Fasse am Ende zusammen, frag nicht zwischendurch ständig nach Bestätigung. Wenn eine Aufgabe
   abgeschlossen ist: kurze Zusammenfassung was gemacht wurde, was getestet wurde, was noch offen
   ist.

## Code-Qualität

* TypeScript: kein `any`, wo es vermeidbar ist; bestehende Typen aus `src/types.ts` bzw.
  `backend/src/types.ts` wiederverwenden statt zu duplizieren.
* Neue API-Routen müssen `requireAuth` und – sofern sie auf eine `company`-Ressource zugreifen –
  `requireCompanyOwnership` aus `backend/src/middleware` verwenden, statt Ownership-Checks erneut
  inline zu schreiben.
* Schreibe Tests für neue Logik, nicht nur für offensichtliche Bugs (sobald ein Test-Runner
  vorhanden ist; aktuell keiner eingerichtet – bei Bedarf vorher kurz Rückfrage zur Wahl des
  Test-Frameworks).
* Lauf Linter/Build vor Abschluss einer Aufgabe (`npm run lint`, `npm run build`,
  `cd backend && npm run build`).
* Keine auskommentierten Codeleichen, keine TODO-Kommentare ohne Kontext.

## Git

* Commit-Messages: kurz, auf Deutsch, im Imperativ/Infinitiv-Stil wie die bisherige Historie
  (z.B. "Auth-Check für /api/ai/documents ergänzen", "Rate-Limiting für API-Routen ergänzen").
* Kleine, thematisch saubere Commits statt einem riesigen.
* Niemals `git push` oder `git push --force` ohne explizite Erlaubnis.
* Niemals direkt auf main/master committen, wenn ein Branch-Workflow existiert.

## Proaktive Vorschläge

Wenn dir beim Arbeiten Verbesserungspotential auffällt (Performance, fehlende Tests, veraltete
Patterns, Sicherheitslücken), das aber nicht Teil der aktuellen Aufgabe ist: notiere es kurz am
Ende deiner Zusammenfassung unter "Aufgefallen" statt es ungefragt mitzuändern. Größere
Refactoring-Vorschläge gehören nicht automatisch ins Diff der aktuellen Aufgabe.

## Was NICHT tun

* Keine neuen Architektur-Patterns einführen, ohne sie zu erwähnen.
* Keine Secrets/API-Keys in Code oder Logs schreiben (`.env`/`backend/.env` sind gitignored –
  niemals committen).
* Keine Annahmen über Business-Logik treffen, die nicht aus Code oder Doku ableitbar sind – im
  Zweifel kurz fragen statt raten.
* Keine neuen externen Dienste/Datenflüsse einführen, ohne `Datenschutz.tsx` und `docs/vvt.md`
  entsprechend zu aktualisieren (DSGVO-Konsistenz).
