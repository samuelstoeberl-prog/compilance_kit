export const sozialversicherungAnmeldungTemplate = `MELDEBOGEN – SOZIALVERSICHERUNGSANMELDUNG
Checkliste und Mustervordruck

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARBEITGEBERDATEN

Unternehmen:      {{UNTERNEHMENSNAME}} ({{RECHTSFORM}})
Anschrift:        {{STRASSE}}, {{PLZ_ORT}}
Betriebsnummer:   ________________________________
(zu beantragen bei: Bundesagentur für Arbeit, bundesagentur.de)
Krankenkasse:     ________________________________
Steuer-Nr.:       ________________________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARBEITNEHMERDATEN

Name, Vorname:          ________________________________
Geburtsname:            ________________________________
Geburtsdatum:           ________________________________
Geburtsort:             ________________________________
Staatsangehörigkeit:    ________________________________
Rentenversicherungs-Nr: ________________________________
Steuer-ID:              ________________________________
Anschrift:              ________________________________
                        ________________________________
Krankenkasse (gewählt): ________________________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BESCHÄFTIGUNGSDATEN

Beschäftigungsbeginn:   ________________
Art der Beschäftigung:
[ ] Vollzeit                 [ ] Teilzeit (_____ Std./Woche)
[ ] Minijob (≤ 538 €/Monat) [ ] Midi-Job (538–2.000 €/Mon.)
[ ] Kurzfristige Beschäftigung (max. 3 Monate / 70 Tage/Jahr)
[ ] Auszubildende/r           [ ] Praktikum (Pflicht/freiwillig)
[ ] Werkstudent/in            [ ] Rentner/in
[ ] GmbH-Geschäftsführer/in   [ ] Gesellschafter-Geschäftsf.

Tätigkeitsschlüssel (5-stellig): ________________
(Schlüsselverzeichnis unter destatis.de / Bundesagentur)

Monatliches Bruttoentgelt: EUR ________________
Einmalzahlungen geplant: [ ] Ja  [ ] Nein

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BEITRAGSGRUPPEN (auszufüllen für DEÜV-Meldung)

Krankenversicherung (KV):
[ ] 1 – Versicherungspflicht allgemein (ArbN + ArbG je ca. 7,3%)
[ ] 3 – privat versichert / befreit
[ ] 9 – geringfügig beschäftigt

Rentenversicherung (RV):
[ ] 1 – Versicherungspflicht (je ca. 9,3%)
[ ] 5 – Befreiung auf Antrag (Minijob)
[ ] 6 – rentenversicherungsfrei

Arbeitslosenversicherung (AV):
[ ] 1 – Versicherungspflicht (je 1,3%)
[ ] 0 – versicherungsfrei

Pflegeversicherung (PV):
[ ] 1 – Versicherungspflicht (ArbN ca. 1,7% / ArbG ca. 1,7%)
[ ] 0 – versicherungsfrei

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FRISTEN UND MELDEPFLICHTEN

┌─────────────────────────────────────────────────┐
│  PFLICHT          FRIST            EMPFÄNGER     │
├─────────────────────────────────────────────────┤
│  Anmeldung        binnen 6 Wochen  Krankenkasse  │
│  Jahresmeldung    bis 15.02.       Krankenkasse  │
│  Abmeldung        binnen 6 Wochen  Krankenkasse  │
│  UV-Jahresmeldung bis 16.02.       Unfallkasse   │
│  Lohnsteuer       10. d. Folgemont. Finanzamt    │
│  SV-Beiträge      Fälligkeit lt. §  23 SGB IV   │
└─────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ERFORDERLICHE UNTERLAGEN BEI EINSTELLUNG

[ ] Personalausweis / Reisepass (Kopie)
[ ] Sozialversicherungsausweis (Rentenversicherungskarte)
[ ] Steueridentifikationsnummer
[ ] Mitgliedsbescheinigung der Krankenkasse
[ ] Schwerbehindertenausweis (falls vorhanden)
[ ] Aufenthalts-/Arbeitserlaubnis (bei Nicht-EU-Bürgern)
[ ] Letzter Lohnsteuerabzug / Steuerkarte (bei Wechsel)
[ ] Nachweis bAV / VWL (falls zutreffend)
[ ] Ausbildungsvertrag (bei Azubis)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

UNFALLVERSICHERUNG (BG-MELDUNG)

Berufsgenossenschaft: ________________________________
Mitgliedsnummer:      ________________________________
Gefahrtarifstelle:    ________________________________

Anmeldung neuer Arbeitnehmer bei BG spätestens mit erster
Lohnabrechnung. UV-Beitrag wird jährlich nacherhoben.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MINIJOB-BESONDERHEITEN (falls zutreffend)

Minijob-Zentrale (Deutsche Rentenversicherung Knappschaft-Bahn-
See) ist zuständige Einzugsstelle:
Pauschalbeiträge ArbG:
- KV: 13 %
- RV: 15 %
- Lohnsteuer pauschal: 2 %
- Unfallversicherung: BG-Beitrag (branchenabhängig)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BEARBEITUNG / UNTERSCHRIFT

Bearbeitet von:  ________________________________
Datum:           {{DATUM}}
Unterschrift:    ________________________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Erstellt für: {{UNTERNEHMENSNAME}} | Stand: {{DATUM}}
Rechtsgrundlagen: SGB IV § 28a (DEÜV), EStG § 38, BVerfGE,
Unfallversicherung SGB VII`
