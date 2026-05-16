# Pre-Mortem Analysis: ComplianceKit

**Datum:** 2026-05-16  
**Analyst:** Claude Code (Sonett 4.6) — unabhängige Einschätzung  
**Methode:** Gary Klein Premortem — "14 Tage nach dem Launch ist das Produkt gescheitert. Warum?"  
**Codebase-Stand:** Commit `99e4754` → `e3e75e7` (main branch, 14 Commits)

---

> **Vorab-Hinweis:** Diese Analyse ist absichtlich schonungslos. Das Ziel ist nicht, das Projekt schlecht zu reden, sondern Risiken sichtbar zu machen, bevor sie teuer werden. Jede Kritik hier ist besser als eine Kritik von einem echten Nutzer.

---

## Zusammenfassung

| Kategorie | Anzahl |
|---|---|
| **Tigers gesamt** | 8 |
| — Launch-Blocking | 4 |
| — Fast-Follow | 3 |
| — Track | 1 |
| **Paper Tigers** | 4 |
| **Elephants** | 3 |
| **Risiken gesamt** | 15 |

---

## Risk Registry

| # | Risiko | Kategorie | Dringlichkeit | Evidenz | Mitigation | Owner | Deadline |
|---|---|---|---|---|---|---|---|
| 1 | Produkt gibt rechtlich relevante Compliance-Beratung ohne Haftungsausschluss | Tiger | Launch-Blocking | `regulations.json` enthält konkrete Rechtspflichten (DSGVO, ArbZG) ohne Disclaimer | Rechtlichen Haftungsausschluss + "Kein Ersatz für Rechtsberatung"-Banner hinzufügen | — | vor Launch |
| 2 | Die KI-Kernfunktion existiert nicht — DocumentGenerator ist eine statische Textvorlage | Tiger | Launch-Blocking | Commit `1ad4aef`: "replace AI document generation with static templates"; `@anthropic-ai/sdk` installiert aber nie aufgerufen | Entweder: (a) echte KI-Integration umsetzen, oder (b) Marketing entfernen das KI impliziert | — | vor Launch |
| 3 | 17 Regulations + 11 Fundings sind zu wenig für Glaubwürdigkeit | Tiger | Launch-Blocking | `regulations.json` (17 Einträge), `fundings.json` (11 Einträge) — reale Compliance-Landschaft: 100+ relevante Pflichten | Datenbasis auf min. 40 Regulations + 25 Fundings ausbauen, oder Scope explizit als Beta markieren | — | vor Launch |
| 4 | Keine Error Boundary — ein defekter JSON-Wert crasht die gesamte App | Tiger | Launch-Blocking | `src/App.tsx` hat keine `<ErrorBoundary>`; `ProfilContext.tsx` liest localStorage ohne try/catch | React ErrorBoundary + try/catch um localStorage-Zugriffe; Fallback-UI bei Fehler | — | vor Launch |
| 5 | Null Test-Coverage — Scoring-Bugs in filterRegulations() bleiben unentdeckt | Tiger | Fast-Follow | `find src -name '*.test.*'` → leer; filterRegulations() und scoreFunding() komplex und ungetestet | Min. 10 Unit-Tests für Filter-/Scoring-Logik (Vitest + React Testing Library) | — | Woche 1 post-launch |
| 6 | Keine DSGVO-konforme Datenspeicherung — Firmendaten landen ungeschützt in localStorage | Tiger | Fast-Follow | `ProfilContext.tsx`: `localStorage.setItem('profil', JSON.stringify(profil))` — Name, Rechtsform, Umsatz, Bundesland ohne Einwilligung gespeichert | Privacy Policy schreiben; Cookie/Storage-Consent-Banner; Datenlösch-Option einbauen | — | Woche 1 post-launch |
| 7 | Kein Deployment-Plan — niemand weiß wie das Ding in Produktion kommt | Tiger | Fast-Follow | Kein CI/CD, kein Dockerfile, kein Vercel/Netlify-Config; `package.json` hat nur `dev/build/preview` | Deployment-Entscheidung treffen (Vercel empfohlen), CI/CD-Pipeline aufsetzen | — | vor Launch |
| 8 | Kein Fehler-Monitoring — Bugs in Prod sind unsichtbar | Tiger | Track | Kein Sentry, kein LogRocket, kein analytics; errors verschwinden in der Browser-Konsole des Users | Sentry Free Tier oder ähnliches einbinden; mind. window.onerror loggen | — | Woche 2 post-launch |
| 9 | Performance-Probleme auf älteren Geräten (Paper Tiger) | Paper Tiger | — | React 19 + Vite-Bundle; Lighthouse-Score nicht gemessen; aber App ist klein | Lighthouse-Audit durchführen — vermutlich kein echtes Problem | — | — |
| 10 | Internationalisierung fehlt (Paper Tiger) | Paper Tiger | — | App ist explizit Deutsch für deutsche KMU — kein i18n nötig für MVP | Kein Handlungsbedarf für MVP | — | — |
| 11 | TypeScript `any`-Cast in DocumentGenerator (Paper Tiger) | Paper Tiger | — | Eine `as any`-Cast für text_delta — kein Laufzeitrisiko | Kann ignoriert werden solange Anthropic SDK nicht aktiv genutzt wird | — | — |
| 12 | IE11/Edge-Kompatibilität (Paper Tiger) | Paper Tiger | — | ES2023-Target; aber deutsche KMU-Zielgruppe nutzt 2026 kaum IE11 | Kein Handlungsbedarf | — | — |
| 13 | **ELEPHANT: Der Produktname ist ein Tippfehler** | Elephant | TBD | Repository heißt `compilance_kit` statt `compliance_kit`. Dieses "i" ist entweder bewusstes Branding oder ein Fehler der seit Commit 1 nie korrigiert wurde. Bei einer ersten Google-Suche oder bei der Weitergabe der URL fällt das sofort auf. | Entscheidung treffen: bewusstes Branding (dann dokumentieren) oder korrigieren | — | vor erstem öffentlichen Link |
| 14 | **ELEPHANT: Der KI-Feature-Rückzug wurde nie explizit entschieden** | Elephant | TBD | Commit `1ad4aef` "replace AI document generation with static templates (no API key required)" ist technisch sauber — aber die *strategische* Entscheidung fehlt: Ist das temporär? Ist das die neue Richtung? Der SDK (`@anthropic-ai/sdk`) ist weiterhin installiert und signalisiert "KI kommt bald" — aber niemand hat sich committed. Das ist technische Schuld die sich über Monate unsichtbar aufbaut. | Explizite Team-Entscheidung dokumentieren: Roadmap-Item "KI reaktivieren" oder "SDK entfernen" | — | vor Roadmap-Planung |
| 15 | **ELEPHANT: Scope ist nicht MVP** | Elephant | TBD | "Compliance-Management für alle deutschen KMU in allen Branchen und Bundesländern" ist kein MVP, das ist ein Forschungsprojekt. Die Filterlogik (`filterRegulations`) versucht bereits Branche + Rechtsform + Bundesland + Mitarbeiterzahl zu kombinieren — mit 17 Datensätzen. Ein Nutzer aus der Lebensmittelindustrie in Bayern sieht womöglich 3 Regulations und denkt, das Produkt ist kaputt. | Scope explizit einschränken: z.B. "Berlin, IT/Tech, 1-50 Mitarbeiter" als Launch-Fokus; oder Daten massiv ausbauen | — | vor Launch |

---

## Phase 5: Mitigation-Pläne für Launch-Blocking Tigers

### Tiger #1 — Rechtlicher Haftungsausschluss

**Risiko:** ComplianceKit gibt konkrete rechtliche Hinweise (DSGVO-Pflichten, ArbZG-Fristen, Bußgelder) ohne jeglichen Disclaimer. Bei falscher oder veralteter Information haftet der Betreiber möglicherweise.

**Evidenz:** `regulations.json` enthält "Bußgelder bis 4 % des weltweiten Jahresumsatzes" und konkrete Fristen. Kein einziger Text in der App sagt "kein Ersatz für Rechtsberatung".

**Mitigation:**
1. Footer-Disclaimer auf jeder Seite: "ComplianceKit ersetzt keine individuelle Rechtsberatung. Alle Angaben ohne Gewähr."
2. Impressum-Seite erstellen (selbst für eine Beta-App mit deutschen Nutzern gesetzlich Pflicht)
3. Versionierung der Rechtsgrundlagen in `regulations.json` (Datum der letzten Prüfung)

**Owner:** —  
**Decision Date:** vor erstem öffentlichen Link

---

### Tiger #2 — KI-Feature existiert nicht

**Risiko:** Die App bewirbt (implizit durch den installierten `@anthropic-ai/sdk` und den Komponentennamen "DocumentGenerator") KI-Dokumentengenerierung. Tatsächlich ist es ein string-template mit Platzhaltern wie `[STRASSE UND HAUSNUMMER]`. Das ist kein Bug — das ist eine Lücke zwischen Erwartung und Realität.

**Evidenz:**  
- `@anthropic-ai/sdk` in `package.json` — zahlt sich aus in Bundlegröße (+500KB), Sicherheitsfläche, und falschen Nutzererwartungen  
- `DocumentGenerator.tsx` Zeile 1: `import { useState } from 'react'` — kein Anthropic-Import; kein API-Call  
- Commit-Nachricht: "no API key required" als *Feature* beschrieben

**Mitigation (Option A — ehrlicher Weg):**
1. `@anthropic-ai/sdk` aus `package.json` entfernen
2. UI-Labels von "KI-generiert" → "Vorlage" umbenennen
3. Nutzer klar kommunizieren: "Wir generieren Vorlagen, keine individualisierten Dokumente"

**Mitigation (Option B — ambitious Weg):**
1. Echten Claude-API-Aufruf in `DocumentGenerator.tsx` implementieren
2. VITE_ANTHROPIC_API_KEY sicher deployen (niemals im Client-Bundle — das wäre ein kritisches Security-Problem)
3. Backend-Proxy für API-Calls bauen (direkter Browser→Anthropic-Call würde den API Key leaken)

> **Achtung Option B:** Ein direkter `VITE_` Anthropic API Key wäre im Browser-Bundle sichtbar und damit öffentlich. Das darf nicht passieren.

**Owner:** —  
**Decision Date:** vor Launch

---

### Tiger #3 — Datenbasis zu dünn

**Risiko:** 17 Regulations und 11 Förderungen klingen nach viel, sind es aber nicht. Ein Nutzer der die App ernsthaft nutzt und dann bei seinem Steuerberater nachfragt "Stimmt das so?" wird innerhalb von 5 Minuten 3 fehlende Pflichten finden. Das zerstört das Vertrauen sofort und dauerhaft.

**Evidenz:**
- Allein im Bereich Arbeitsrecht gibt es 15+ relevante Pflichten für KMU (ArbZG, ArbSchG, MiLoG, BUrlG, AGG, EFZG, MuSchG, BetrVG, SGB IV, ...)
- `regulations.json` hat 17 Einträge total
- `fundings.json` hat 11 Einträge — KfW allein hat 20+ Programme für KMU

**Mitigation:**
1. **Kurzfristig:** Beta-Label überall; "Wir erweitern laufend — melde fehlende Pflichten" CTA
2. **Mittelfristig:** 1 Mensch verbringt 2 Tage mit Recherche und füllt Daten auf min. 40+30 auf
3. **Strukturell:** Quellen und Datum in jede `regulation` eintragen; Verfallsdatum wenn Gesetze sich ändern

**Owner:** —  
**Decision Date:** vor Launch (Scope-Entscheidung) / Woche 2 (Datenbasis)

---

### Tiger #4 — Keine Error Boundary

**Risiko:** Ein korrupter localStorage-Eintrag (z.B. manuell editiert, oder nach einem Breaking Change im Schema) crasht die App mit einem weißen Bildschirm. Kein Nutzer weiß was zu tun ist.

**Evidenz:**  
`ProfilContext.tsx`: `JSON.parse(localStorage.getItem('profil') ?? '{}')` — wenn localStorage `'{invalid json'` enthält, wirft JSON.parse einen SyntaxError der unkontrolliert hochblubbert.

**Mitigation:**
```tsx
// In ProfilContext.tsx — try/catch um localStorage-Zugriffe
const loadedProfil = (() => {
  try {
    return JSON.parse(localStorage.getItem('profil') ?? 'null') ?? undefined
  } catch {
    return undefined
  }
})()
```
Plus React ErrorBoundary in `App.tsx` mit "Etwas ist schiefgelaufen — Daten zurücksetzen"-Button.

**Owner:** —  
**Decision Date:** vor Launch

---

## Phase 6: Elephants adressieren

### Elephant #13 — Der Tippfehler im Produktnamen

**"compilance" statt "compliance"**

Das ist kein Paper Tiger. Das ist der Name des Repositories, vermutlich der zukünftigen Domain, und taucht in URLs auf. Mögliche Szenarien:

**Szenario A — Es ist ein Fehler:**  
Dann ist jetzt der richtige Zeitpunkt zu korrigieren, bevor der erste externe Link gesetzt wird. Repo umbenennen kostet 10 Minuten.

**Szenario B — Es ist bewusstes Branding:**  
Dann muss das irgendwo dokumentiert sein. "Compilance" als Wortspiel (compile + compliance) könnte funktionieren — aber nur wenn es konsequent und bewusst eingesetzt wird, nicht zufällig.

**Entscheidung notwendig bis:** vor dem ersten öffentlichen Link zur App.

---

### Elephant #14 — Die KI-Entscheidung die nie getroffen wurde

Der Commit `1ad4aef` ist technisch sauber, aber strategisch ein stilles Bekenntnis: "Wir machen das ohne KI." Nur hat das niemand laut gesagt.

Konsequenz: Der SDK ist noch drin (Bundlegröße, Sicherheitsfläche, verwirrende Codebase). Irgendwann kommt ein neues Teammitglied und fragt "Warum ist das installiert?" Oder jemand baut einen Feature-Branch der den SDK nutzt — aber mit dem Key im VITE_-Namespace, was ein Security-Disaster wäre.

**Die Frage die explicit beantwortet werden muss:**  
*Ist KI-Integration in ComplianceKit eine Roadmap-Priorität, oder ist die statische Template-Lösung die dauerhafte Entscheidung?*

Wenn Ja: Roadmap-Item anlegen, Backend-Proxy planen, Key-Management entscheiden.  
Wenn Nein: SDK entfernen, Commit, fertig.

---

### Elephant #15 — Der Scope frisst das Produkt

"Compliance für alle deutschen KMU" ist kein MVP. Das ist eine Vision.

Die Filterlogik ist bereits so gebaut als würde die App 500 Regulations haben. Mit 17 ist das Overkill und schafft eine irreführende Benutzererwartung: Der Nutzer gibt 7 Felder ein (Rechtsform, Branche, Bundesland, Mitarbeiterzahl, Umsatz, Name, Gründungsjahr) und bekommt 3-5 Ergebnisse. Das fühlt sich nicht personalisiert an — das fühlt sich leer an.

**Drei mögliche Wege:**

| Weg | Was | Wann |
|---|---|---|
| **Narrow Deep** | Scope auf z.B. "IT-Startups in Berlin, 1-10 MA" einschränken; dafür 100% Coverage dieser Zielgruppe | Launch in 4 Wochen möglich |
| **Broad Shallow mit Beta-Label** | Aktuellen Scope beibehalten, aber überall "Beta — Daten werden laufend ergänzt" kommunizieren | Launch in 1 Woche möglich |
| **Broad Deep** | Datenbasis auf 100+ Regulations aufbauen | 3+ Monate Arbeit |

Ohne diese Entscheidung wird das Produkt nicht fokussiert genug sein, um Vertrauen aufzubauen.

---

## Gesamtbewertung

```
Launch-Readiness: 55/100

Stärken:
  ✅ Saubere Architektur (Context API, TypeScript strict, Vite)
  ✅ Gute UX-Idee: Profil-basierte Filterung ist clever
  ✅ Responsive, modernes UI
  ✅ Funktioniert als Demo/Prototype

Kritische Lücken:
  ❌ Keine Tests (0 Dateien)
  ❌ KI-Feature nicht implementiert
  ❌ Rechtlicher Haftungsausschluss fehlt
  ❌ Datenbasis zu dünn für echte Nutzung
  ❌ Kein Deployment-Plan
  ❌ DSGVO-Compliance der App selbst unklar
  ❌ 3 Elephants unentschieden
```

**Empfehlung:** Nicht launchen bevor die 4 Launch-Blocking Tigers mitigiert sind. Die gute Nachricht: Tiger #4 (Error Boundary) ist ein 2-Stunden-Fix. Tiger #1 (Disclaimer) ist ein 1-Stunden-Fix. Tiger #2 und #3 erfordern eine strategische Entscheidung, keine Programmierarbeit.

Das Produkt ist **gut genug für eine geschlossene Beta mit 10-20 Testnutzern** — aber noch nicht für einen öffentlichen Launch.

---

*Generiert mit der Premortem-Methode nach Gary Klein (HBR 2007). Alle Einschätzungen basieren auf Code-Analyse zum Stand 2026-05-16.*
