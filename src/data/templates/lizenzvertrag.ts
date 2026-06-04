export const lizenzvertragTemplate = `LIZENZVERTRAG
(Software / IP / Marke / Patent)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LIZENZGEBER

{{UNTERNEHMENSNAME}} ({{RECHTSFORM}})
{{STRASSE}}, {{PLZ_ORT}}
E-Mail: {{EMAIL}}
Telefon: {{TELEFON}}
– nachfolgend „Lizenzgeber" –

und

LIZENZNEHMER

Name / Unternehmen: ________________________________
Anschrift:           ________________________________
                     ________________________________
E-Mail:              ________________________________
– nachfolgend „Lizenznehmer" –

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

§ 1  LIZENZGEGENSTAND

1.1  Art des Schutzrechts / Lizenzgegenstands:
     [ ] Software / Quellcode / SaaS
     [ ] Patent (Nr.: ________________________________)
     [ ] Gebrauchsmuster (Nr.: ______________________)
     [ ] Marke (Nr.: __________________________________)
     [ ] Urheberrecht / Werk
     [ ] Technisches Know-how / Trade Secret
     [ ] Sonstiges: ________________________________

1.2  Bezeichnung:
     ________________________________
     ________________________________

1.3  Schutzrechtsinhaber:
     [ ] {{UNTERNEHMENSNAME}} (Inhaber)
     [ ] Dritter (Name: __________________________)
        Sublizenzrecht liegt vor.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

§ 2  LIZENZGEWÄHRUNG

2.1  Lizenztyp:
     [ ] Einfache (nicht-ausschließliche) Lizenz
         (Lizenzgeber darf weitere Lizenzen vergeben)
     [ ] Ausschließliche Lizenz
         (Lizenzgeber darf keine weiteren vergeben)
     [ ] Co-Exklusivlizenz für folgende Parteien:
         ________________________________

2.2  Umfang der Lizenz:
     [ ] Nutzung für eigene Zwecke des Lizenznehmers
     [ ] Vertrieb an Endkunden
     [ ] Weiterentwicklung erlaubt
     [ ] Einbettung in eigene Produkte erlaubt
     [ ] Sublizenzierung erlaubt (an: ________________)
     [ ] OEM-Nutzung erlaubt

2.3  Geografischer Geltungsbereich:
     [ ] Deutschland [ ] EU [ ] Europa [ ] Weltweit
     [ ] Folgende Länder: ________________________________

2.4  Zeitliche Begrenzung:
     [ ] Zeitlich unbegrenzt
     [ ] Befristet bis: ________________________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

§ 3  LIZENZGEBÜHREN (ROYALTIES)

3.1  Vergütungsmodell:
     [ ] Einmallizenz (Pauschal):
         EUR ______________________ (netto)
     [ ] Laufende Lizenzgebühr:
         ______ % auf den Nettoumsatz des Lizenznehmers
         mit dem Lizenzgegenstand
     [ ] Stückgebühr: EUR ______ / genutzter Einheit
     [ ] Abonnementsgebühr: EUR ______ / Monat / Jahr
     [ ] Kombiniert: Einmalzahlung EUR ______ +
         laufend ______ %

3.2  Mindestlizenzgebühr:
     EUR ______ / Jahr
     (bei Unterschreitung automatisch fällig)

3.3  Abrechnung und Zahlung:
     Abrechnung: [ ] Monatlich [ ] Vierteljährlich
     [ ] Jährlich
     Zahlung: ______ Tage nach Abrechnungsdatum

3.4  Buchprüfungsrecht:
     Der Lizenzgeber hat das Recht, die Bücher des
     Lizenznehmers durch eine anerkannte Wirtschafts-
     prüfungsgesellschaft zu prüfen (max. 1 × jährlich).
     Kosten trägt: [ ] Lizenzgeber [ ] Lizenznehmer
     (bei Abweichung >5%: Lizenznehmer)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

§ 4  VERBESSERUNGEN UND WEITERENTWICKLUNGEN

[ ] Verbesserungen des Lizenznehmers gehören ihm
    (Grant-back-Klausel: Lizenznehmer erteilt Lizenz-
    geber kostenlose Rücklizenz)
[ ] Verbesserungen fallen an den Lizenzgeber
[ ] Verbesserungen gehören dem Lizenznehmer,
    keine Rücklizenzpflicht

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

§ 5  GEWÄHRLEISTUNG UND HAFTUNG DES LIZENZGEBERS

5.1  Der Lizenzgeber garantiert, dass er berechtigt ist,
     die Lizenz zu erteilen, und dass der Lizenz-
     gegenstand keine bekannten Rechte Dritter verletzt.

5.2  Der Lizenzgeber haftet für die Mangelfreiheit des
     Lizenzgegenstands nur im Rahmen der gesetzlichen
     Bestimmungen. Bei Software: Fehler können nicht
     vollständig ausgeschlossen werden.

5.3  Die Haftung des Lizenzgebers ist auf den
     Jahresbetrag der Lizenzgebühren begrenzt, sofern
     keine grobe Fahrlässigkeit oder Vorsatz vorliegt.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

§ 6  GEHEIMHALTUNG

Beide Parteien halten alle im Rahmen dieses Vertrags
erlangten Informationen vertraulich. Dies gilt ins-
besondere für Quellcode, Algorithmen, Geschäfts-
daten und Know-how. Dauer: Laufzeit + _____ Jahre.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

§ 7  LAUFZEIT UND KÜNDIGUNG

Laufzeit: ab {{DATUM}}
[ ] Unbefristet, kündbar mit ______ Monaten Frist
[ ] Befristet bis: ________________

Außerordentliche Kündigung aus wichtigem Grund
(insbesondere: wesentlicher Vertragsbruch, Insolvenz,
Verletzung des Schutzrechts durch Lizenznehmer).

Nach Beendigung: sofortige Einstellung der Nutzung,
Vernichtung/Rückgabe des Lizenzgegenstands.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

§ 8  SONSTIGE BESTIMMUNGEN

Rechtsstreitigkeiten aus diesem Vertrag:
[ ] Ordentliche Gerichte, Gerichtsstand:
    Sitz von {{UNTERNEHMENSNAME}}
[ ] Schiedsverfahren nach DIS-Regeln, Hamburg

Anwendbares Recht: Deutsches Recht

Mündliche Nebenabreden bestehen nicht. Änderungen
bedürfen der Schriftform. Salvatorische Klausel gilt.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

UNTERSCHRIFTEN

Ort, Datum: ________________, den {{DATUM}}

Lizenzgeber                       Lizenznehmer

________________________________  ________________________________
{{UNTERNEHMENSNAME}}              ________________________________
({{RECHTSFORM}})                  (Name / Unternehmen)

________________________________  ________________________________
Name, Funktion                    Name, Funktion

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Erstellt für: {{UNTERNEHMENSNAME}} | Stand: {{DATUM}}
Rechtsgrundlagen: UrhG §§ 31–44, § 69a ff. (Software),
PatG § 15 (Patent-Lizenz), MarkenG § 30 (Markenlizenz),
GeschGehG (Know-how), BGB §§ 241, 311, DSGVO Art. 28`
