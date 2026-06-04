export const kaufvertragTemplate = `KAUFVERTRAG (B2B)
(bewegliche Sachen / Waren / Inventar / Fahrzeuge)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VERKÄUFER

{{UNTERNEHMENSNAME}} ({{RECHTSFORM}})
{{STRASSE}}, {{PLZ_ORT}}
E-Mail: {{EMAIL}}
Telefon: {{TELEFON}}
– nachfolgend „Verkäufer" –

und

KÄUFER

Name / Unternehmen: ________________________________
Rechtsform:         ________________________________
Anschrift:          ________________________________
                    ________________________________
E-Mail:             ________________________________
Telefon:            ________________________________
USt-IdNr.:          ________________________________
– nachfolgend „Käufer" –

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

§ 1  KAUFGEGENSTAND

1.1  Bezeichnung des Kaufgegenstands:
     ________________________________________________
     ________________________________________________

1.2  Menge / Stückzahl: ____________________________

1.3  Zustand:
     [ ] Neu (unbenutzt, Originalverpackung)
     [ ] Neuwertig (kaum gebraucht)
     [ ] Gebraucht (Zustandsbeschreibung: ___________)
     [ ] Werkswahl / B-Ware (Beschreibung: _________)

1.4  Identifikation (falls zutreffend):
     Seriennummer: __________________________________
     Fahrzeug-Ident.-Nr. (FIN): ____________________
     Baujahr: ______________________________________
     Kilometerstand: _______________________________

1.5  Vorhandenes Zubehör und mitverkaufte Gegenstände:
     ________________________________________________
     ________________________________________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

§ 2  KAUFPREIS UND ZAHLUNG

2.1  Kaufpreis (netto): EUR ________________________
     Umsatzsteuer (______ %): EUR __________________
     Kaufpreis gesamt (brutto): EUR ________________

2.2  Zahlungsbedingungen:
     [ ] Sofort bei Übergabe (Zug-um-Zug)
     [ ] Vorauszahlung bis: ______________________
     [ ] Teilzahlung:
         Anzahlung (______ %): EUR ______________
         Restzahlung bei Übergabe: EUR __________
     [ ] Zahlungsziel ______ Tage nach Rechnung
     [ ] Ratenzahlung:
         ______ Raten à EUR ______ / Monat

2.3  Zahlungsweise:
     [ ] Überweisung IBAN: _______________________
     [ ] Barzahlung (Quittung wird ausgestellt)
     [ ] Sonstiges: ____________________________

2.4  Eigentumsvorbehalt (§ 449 BGB):
     Der Kaufgegenstand bleibt bis zur vollständigen
     Bezahlung Eigentum des Verkäufers.
     [ ] Erweiterter Eigentumsvorbehalt (B2B)
     [ ] Kein Eigentumsvorbehalt vereinbart

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

§ 3  ÜBERGABE UND GEFAHRÜBERGANG

3.1  Übergabezeitpunkt:
     [ ] Bei Vertragsunterzeichnung ({{DATUM}})
     [ ] Am: ________________________________
     [ ] Innerhalb von ______ Werktagen ab Vertragsschluss

3.2  Übergabeort:
     [ ] Sitz des Verkäufers ({{STRASSE}}, {{PLZ_ORT}})
     [ ] Sitz des Käufers: ______________________
     [ ] Sonstiger Ort: ________________________

3.3  Transport:
     [ ] Abholung durch Käufer (auf eigene Kosten/Gefahr)
     [ ] Lieferung durch Verkäufer (Kosten: _________)
     [ ] Spedition (Kosten trägt: Käufer / Verkäufer)

3.4  Gefahrübergang (§ 446 BGB):
     Mit Übergabe des Kaufgegenstands geht die Gefahr
     des zufälligen Untergangs und der zufälligen
     Verschlechterung auf den Käufer über.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

§ 4  SACHMÄNGELHAFTUNG (§§ 434 ff. BGB)

4.1  Zwischen Unternehmern (B2B) gilt:
     [ ] Gesetzliche Gewährleistung: 2 Jahre (§ 438)
     [ ] Verkürzt auf: ______ Monate (min. 1 Jahr)
         (nur bei gebrauchten Sachen und B2B zulässig)
     [ ] Ausschluss der Gewährleistung für:
         Gebrauchsspuren und bekannte Mängel

4.2  Rügepflicht (§ 377 HGB – bei beiderseitigem
     Handelsgeschäft):
     Der Käufer hat den Kaufgegenstand unverzüglich
     nach Erhalt zu untersuchen. Offene Mängel
     sind sofort, versteckte Mängel innerhalb von
     ______ Werktagen nach Entdeckung zu rügen.

4.3  Rechte des Käufers bei Mängeln:
     Nacherfüllung → Minderung oder Rücktritt
     → Schadensersatz (bei Verschulden)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

§ 5  BESCHAFFENHEITSVEREINBARUNG

5.1  Vereinbarte Beschaffenheitsmerkmale:
     ________________________________________________
     ________________________________________________

5.2  Vorhandene Zulassungen / Prüfzeichen:
     [ ] CE-Kennzeichnung
     [ ] TÜV-Abnahme (Datum: _______________________)
     [ ] GS-Zeichen
     [ ] Sonstiges: ________________________________

5.3  Mitgelieferte Unterlagen:
     [ ] Bedienungsanleitung (Sprache: ______________)
     [ ] Konformitätserklärung
     [ ] Fahrzeugbrief / Zulassungsbescheinigung I+II
     [ ] Prüfberichte / Wartungshefte
     [ ] Garantieurkunden Dritter: ________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

§ 6  HERSTELLERGARANTIE (FREIWILLIG)

[ ] Keine gesonderte Herstellergarantie vereinbart
[ ] Verkäufer gewährt zusätzliche Garantie:
    Dauer: ______ Monate
    Umfang: [ ] Vollgarantie [ ] Teilgarantie
    Abwicklung: [ ] beim Verkäufer [ ] beim Hersteller

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

§ 7  HAFTUNGSBESCHRÄNKUNG

Für mittelbare Schäden und entgangenen Gewinn
haftet der Verkäufer nur bei Vorsatz und grober
Fahrlässigkeit. Die Haftung für Körper- und
Gesundheitsschäden sowie nach ProdHaftG bleibt
unberührt.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

§ 8  SCHLUSSBESTIMMUNGEN

Gerichtsstand: Sitz von {{UNTERNEHMENSNAME}}
Anwendbares Recht: Deutsches Recht
Schriftformgebot für Vertragsänderungen
Salvatorische Klausel

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

UNTERSCHRIFTEN / BESTÄTIGUNG

Ort, Datum: ________________, den {{DATUM}}

Verkäufer                         Käufer

________________________________  ________________________________
{{UNTERNEHMENSNAME}}              ________________________________
({{RECHTSFORM}})                  (Unternehmen / Name)

________________________________  ________________________________
Name, Funktion                    Name, Funktion

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Erstellt für: {{UNTERNEHMENSNAME}} | Stand: {{DATUM}}
Rechtsgrundlagen: BGB §§ 433–453 (Kaufvertrag),
§§ 434–442 (Sachmangel), § 449 (Eigentumsvorbehalt),
HGB § 377 (Rügepflicht), ProdHaftG, UStG`
