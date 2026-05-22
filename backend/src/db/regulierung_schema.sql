-- =============================================================================
--  UNTERNEHMENSREGULIERUNGEN DEUTSCHLAND – Vollständige PostgreSQL-Datenbank
--  Erstellt: Mai 2026 | Quellen: Bundesministerien, IHK, BAFA, BSI, BNetzA,
--  Handwerkskammern, Registergerichte, Landesbehörden, EUR-Lex
-- =============================================================================

DROP SCHEMA IF EXISTS regulierung CASCADE;
CREATE SCHEMA regulierung;
SET search_path TO regulierung, public;

CREATE TABLE kategorie (
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(80) NOT NULL UNIQUE,
    farbe_hex CHAR(7)
);

CREATE TABLE rechtsebene (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE bundesland (
    id      SERIAL PRIMARY KEY,
    kuerzel CHAR(2) NOT NULL UNIQUE,
    name    VARCHAR(60) NOT NULL UNIQUE
);

CREATE TABLE rechtsform (
    id      SERIAL PRIMARY KEY,
    kuerzel VARCHAR(30) NOT NULL UNIQUE,
    name    VARCHAR(80) NOT NULL
);

CREATE TABLE branche (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE behoerde (
    id            SERIAL PRIMARY KEY,
    kuerzel       VARCHAR(30),
    name          VARCHAR(200) NOT NULL,
    url           VARCHAR(300),
    bundesland_id INTEGER REFERENCES bundesland(id)
);

CREATE TABLE regulierung (
    id                           SERIAL PRIMARY KEY,
    name                         VARCHAR(300) NOT NULL,
    kurzname                     VARCHAR(80),
    kategorie_id                 INTEGER NOT NULL REFERENCES kategorie(id),
    rechtsebene_id               INTEGER NOT NULL REFERENCES rechtsebene(id),
    rechtsgrundlage              VARCHAR(400) NOT NULL,
    beschreibung                 TEXT NOT NULL,
    mitarbeiter_min              INTEGER,
    mitarbeiter_max              INTEGER,
    umsatz_min_eur               NUMERIC(18,2),
    umsatz_max_eur               NUMERIC(18,2),
    bilanzsumme_min_eur          NUMERIC(18,2),
    bilanzsumme_max_eur          NUMERIC(18,2),
    gilt_fuer_alle_rechtsformen  BOOLEAN NOT NULL DEFAULT TRUE,
    gilt_fuer_alle_branchen      BOOLEAN NOT NULL DEFAULT TRUE,
    gilt_fuer_alle_bundeslaender BOOLEAN NOT NULL DEFAULT TRUE,
    sanktionen                   TEXT,
    buss_max_eur                 NUMERIC(18,2),
    buss_prozent_umsatz          NUMERIC(5,2),
    aktuell_seit                 VARCHAR(100),
    letzte_aenderung             VARCHAR(100),
    externe_url                  VARCHAR(300),
    aktiv                        BOOLEAN NOT NULL DEFAULT TRUE,
    erstellt_am                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    geaendert_am                 TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE regulierung_rechtsform (
    regulierung_id INTEGER NOT NULL REFERENCES regulierung(id) ON DELETE CASCADE,
    rechtsform_id  INTEGER NOT NULL REFERENCES rechtsform(id),
    PRIMARY KEY (regulierung_id, rechtsform_id)
);

CREATE TABLE regulierung_branche (
    regulierung_id INTEGER NOT NULL REFERENCES regulierung(id) ON DELETE CASCADE,
    branche_id     INTEGER NOT NULL REFERENCES branche(id),
    PRIMARY KEY (regulierung_id, branche_id)
);

CREATE TABLE regulierung_bundesland (
    regulierung_id INTEGER NOT NULL REFERENCES regulierung(id) ON DELETE CASCADE,
    bundesland_id  INTEGER NOT NULL REFERENCES bundesland(id),
    PRIMARY KEY (regulierung_id, bundesland_id)
);

CREATE TABLE pflicht (
    id             SERIAL PRIMARY KEY,
    regulierung_id INTEGER NOT NULL REFERENCES regulierung(id) ON DELETE CASCADE,
    reihenfolge    SMALLINT NOT NULL DEFAULT 0,
    text           TEXT NOT NULL,
    frist          VARCHAR(200),
    turnus         VARCHAR(100)
);

CREATE TABLE tag (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL UNIQUE
);

CREATE TABLE regulierung_tag (
    regulierung_id INTEGER NOT NULL REFERENCES regulierung(id) ON DELETE CASCADE,
    tag_id         INTEGER NOT NULL REFERENCES tag(id),
    PRIMARY KEY (regulierung_id, tag_id)
);

CREATE TABLE regulierung_historie (
    id             SERIAL PRIMARY KEY,
    regulierung_id INTEGER NOT NULL REFERENCES regulierung(id) ON DELETE CASCADE,
    aenderungsdatum DATE NOT NULL,
    beschreibung   TEXT NOT NULL
);

-- STAMMDATEN

INSERT INTO kategorie (name, farbe_hex) VALUES
  ('Arbeitsrecht',                '#e11d48'),
  ('Mitbestimmung',               '#be185d'),
  ('Arbeitsschutz',               '#dc2626'),
  ('Datenschutz',                 '#7c3aed'),
  ('Compliance',                  '#9333ea'),
  ('Steuer / Rechnungswesen',     '#d97706'),
  ('Nachhaltigkeit / ESG',        '#059669'),
  ('Umwelt / Energie',            '#16a34a'),
  ('IT / Cybersicherheit',        '#2563eb'),
  ('Technologie / KI',            '#0891b2'),
  ('Digital / Verbraucherschutz', '#7c2d92'),
  ('Verbraucherschutz',           '#0f766e'),
  ('Branche: Handwerk',           '#b45309'),
  ('Branche: Bau',                '#78350f'),
  ('Branche: Gastronomie',        '#c2410c'),
  ('Branche: Finanzdienstleistung','#1e40af'),
  ('Branche: Gesundheit',         '#065f46'),
  ('Branche: Lebensmittel',       '#713f12');

INSERT INTO rechtsebene (name) VALUES
  ('EU-Recht (unmittelbar geltend)'),
  ('EU-Richtlinie (umgesetzt in DE)'),
  ('Bundesgesetz'),
  ('Bundesgesetz + Tarifvertrag'),
  ('Landesgesetz'),
  ('Kommunale Satzung / Gemeinderecht'),
  ('Technische Norm / Berufsgenossenschaft');

INSERT INTO bundesland (kuerzel, name) VALUES
  ('BW','Baden-Wuerttemberg'),('BY','Bayern'),('BE','Berlin'),
  ('BB','Brandenburg'),('HB','Bremen'),('HH','Hamburg'),
  ('HE','Hessen'),('MV','Mecklenburg-Vorpommern'),('NI','Niedersachsen'),
  ('NW','Nordrhein-Westfalen'),('RP','Rheinland-Pfalz'),('SL','Saarland'),
  ('SN','Sachsen'),('ST','Sachsen-Anhalt'),('SH','Schleswig-Holstein'),
  ('TH','Thueringen');

INSERT INTO rechtsform (kuerzel, name) VALUES
  ('GmbH',            'Gesellschaft mit beschraenkter Haftung'),
  ('AG',              'Aktiengesellschaft'),
  ('SE',              'Societas Europaea'),
  ('KGaA',            'Kommanditgesellschaft auf Aktien'),
  ('eK',              'Eingetragener Kaufmann / Eingetragene Kauffrau'),
  ('OHG',             'Offene Handelsgesellschaft'),
  ('KG',              'Kommanditgesellschaft'),
  ('GmbHCoKG',        'GmbH & Co. KG'),
  ('eG',              'Eingetragene Genossenschaft'),
  ('GbR',             'Gesellschaft buergerlichen Rechts'),
  ('PartG',           'Partnerschaftsgesellschaft'),
  ('Einzelunternehmen','Einzelunternehmen (ohne HR-Eintrag)'),
  ('UG',              'Unternehmergesellschaft (haftungsbeschraenkt)'),
  ('Verein',          'Eingetragener Verein (e.V.)'),
  ('Stiftung',        'Stiftung des privaten Rechts');

INSERT INTO branche (name) VALUES
  ('Alle Branchen'),('Bauhauptgewerbe'),('Ausbauhandwerk'),('Elektrohandwerk'),
  ('Dachdeckerhandwerk'),('Gebaeudereinigung'),('Kfz-Gewerbe'),('Fleischwirtschaft'),
  ('Baeckerei / Konditorei'),('Gastronomie'),('Hotellerie'),('Einzelhandel'),
  ('Grosshandel'),('E-Commerce / Online-Handel'),('Lebensmittelproduktion'),
  ('Chemieindustrie'),('Pharmaindustrie'),('Medizintechnik'),('Maschinenbau'),
  ('Automobilindustrie'),('Logistik / Spedition'),('Finanzdienstleistungen / Banken'),
  ('Versicherungen'),('Immobilienwirtschaft'),('Gesundheitswesen / Kliniken'),
  ('Arztpraxen / Heilberufe'),('Energie / Versorgung'),('Wasserversorgung'),
  ('Abfallwirtschaft'),('IKT / Informationstechnologie'),('Telekommunikation'),
  ('Online-Plattformen / Marktplaetze'),('Land- und Forstwirtschaft'),
  ('Holzverarbeitende Industrie'),('Kunsthandel'),('Kryptounternehmen'),
  ('Ruestungsindustrie'),('Steuerberatung / Wirtschaftspruefung'),('Rechtsberatung'),
  ('Notare'),('Kosmetik / Wellness'),('Spedition / Transport'),('Immobilienmakler');

INSERT INTO behoerde (kuerzel, name, url) VALUES
  ('BMAS',    'Bundesministerium fuer Arbeit und Soziales', 'https://www.bmas.de'),
  ('BMF',     'Bundesministerium der Finanzen', 'https://www.bundesfinanzministerium.de'),
  ('BMWK',    'Bundesministerium fuer Wirtschaft und Klimaschutz', 'https://www.bmwk.de'),
  ('BMJ',     'Bundesministerium der Justiz', 'https://www.bmj.de'),
  ('BMUV',    'Bundesministerium fuer Umwelt und nukleare Sicherheit', 'https://www.bmuv.de'),
  ('BAFA',    'Bundesamt fuer Wirtschaft und Ausfuhrkontrolle', 'https://www.bafa.de'),
  ('BSI',     'Bundesamt fuer Sicherheit in der Informationstechnik', 'https://www.bsi.bund.de'),
  ('BNetzA',  'Bundesnetzagentur', 'https://www.bundesnetzagentur.de'),
  ('BfJ',     'Bundesamt fuer Justiz', 'https://www.bundesjustizamt.de'),
  ('BA',      'Bundesagentur fuer Arbeit', 'https://www.arbeitsagentur.de'),
  ('DEHSt',   'Deutsche Emissionshandelsstelle (Umweltbundesamt)', 'https://www.dehst.de'),
  ('UBA',     'Umweltbundesamt', 'https://www.umweltbundesamt.de'),
  ('FIU',     'Financial Intelligence Unit (Zollkriminalamt)', 'https://www.fiu.bund.de'),
  ('BaFin',   'Bundesanstalt fuer Finanzdienstleistungsaufsicht', 'https://www.bafin.de'),
  ('ZA',      'Zollverwaltung / Finanzkontrolle Schwarzarbeit (FKS)', 'https://www.zoll.de'),
  ('LUCID',   'Stiftung Zentrale Stelle Verpackungsregister', 'https://www.verpackungsregister.org'),
  ('BAnzeiger','Bundesanzeiger / Unternehmensregister', 'https://www.bundesanzeiger.de'),
  ('WPK',     'Wirtschaftsprueferkammer', 'https://www.wpk.de'),
  ('IHK',     'IHK-Organisation (DIHK)', 'https://www.dihk.de'),
  ('HWK',     'Handwerkskammern (ZDH)', 'https://www.zdh.de'),
  ('BGBAU',   'Berufsgenossenschaft der Bauwirtschaft', 'https://www.bgbau.de'),
  ('Gewerbeaufsicht','Gewerbeaufsichtsaemter der Laender', NULL),
  ('Finanzamt','Finanzamt / Finanzverwaltung', 'https://www.elster.de'),
  ('Registergericht','Handels- und Registergerichte', NULL),
  ('Landesdatenschutz','Landesdatenschutzbehoerden (BayLDA, LfDI etc.)', NULL),
  ('Marktaufsicht','Marktaufsichtsbehoerden der Laender', NULL),
  ('Kommunalamt','Kreis-/Stadtverwaltung, Landratsamaeter', NULL);

INSERT INTO regulierung
  (name, kurzname, kategorie_id, rechtsebene_id, rechtsgrundlage,
   beschreibung,
   mitarbeiter_min, mitarbeiter_max,
   umsatz_min_eur, umsatz_max_eur, bilanzsumme_min_eur,
   gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender,
   sanktionen, buss_max_eur, buss_prozent_umsatz,
   aktuell_seit, letzte_aenderung, externe_url)
VALUES
('Kuendigungsschutzgesetz','KSchG',
 (SELECT id FROM kategorie WHERE name='Arbeitsrecht'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§ 23 KSchG',
 'Schutz vor sozial ungerechtfertigten Kuendigungen in Betrieben mit mehr als 10 Beschaeftigten. Arbeitgeber muss personenbedingte, verhaltensbedingte oder betriebsbedingte Gruende nachweisen. Bei Massenentlassung: Anzeigepflicht nach §§ 17-22 KSchG.',
 11, NULL, NULL, NULL, NULL, TRUE, TRUE, TRUE,
 'Unwirksame Kuendigung; Ruecknahme- und Lohnfortzahlungspflicht; ggf. Abfindung (§ 1a KSchG).',
 NULL, NULL, 'dauerhaft', '2003', 'https://www.gesetze-im-internet.de/kschg/'),
('Betriebsrat - Wahlrecht','BetrVG §1',
 (SELECT id FROM kategorie WHERE name='Mitbestimmung'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§ 1 BetrVG',
 'In Betrieben mit mindestens 5 staendigen wahlberechtigten Arbeitnehmern kann ein Betriebsrat gewaehlt werden. Arbeitgeber muss Wahl ermoeglichen, vertrauensvoll zusammenarbeiten und informieren. Wahl alle 4 Jahre.',
 5, NULL, NULL, NULL, NULL, TRUE, TRUE, TRUE,
 'Strafbarkeit bei Behinderung (§ 119 BetrVG): bis 1 Jahr Freiheitsstrafe oder Geldstrafe.',
 NULL, NULL, 'dauerhaft', '2021 (Reform)', 'https://www.gesetze-im-internet.de/betrvg/'),
('Betriebsratsmitglieder - Freistellung','BetrVG §38',
 (SELECT id FROM kategorie WHERE name='Mitbestimmung'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§ 38 Abs. 1 BetrVG',
 'Ab 200 Beschaeftigten sind Betriebsratsmitglieder von der Arbeitsleistung freizustellen. Staffelung: 200-499: 1; 500-899: 2; 900-1499: 3; 1500-1999: 4 Freistellungen usw. Entgelt wird weiter gezahlt.',
 200, NULL, NULL, NULL, NULL, TRUE, TRUE, TRUE,
 'Ordnungswidrigkeit; Klage des Betriebsrats auf Durchsetzung.',
 NULL, NULL, 'dauerhaft', '2021', 'https://www.gesetze-im-internet.de/betrvg/__38.html'),
('Betrieblicher Datenschutzbeauftragter (DSB)','DSB',
 (SELECT id FROM kategorie WHERE name='Datenschutz'),
 (SELECT id FROM rechtsebene WHERE name='EU-Richtlinie (umgesetzt in DE)'),
 '§ 38 BDSG i.V.m. Art. 37-39 DSGVO',
 'Unternehmen mit mehr als 20 Personen, die staendig mit automatisierter Verarbeitung personenbezogener Daten beschaeftigt sind, muessen einen DSB bestellen. Unabhaengig davon gilt die Pflicht bei bestimmten Hochrisikooperationen.',
 20, NULL, NULL, NULL, NULL, TRUE, TRUE, TRUE,
 'Bussgeld bis 10 Mio. EUR oder 2 % des weltweiten Jahresumsatzes.',
 10000000.00, 2.00, 'Mai 2018 (DSGVO)', '2018', 'https://www.gesetze-im-internet.de/bdsg_2018/__38.html'),
('Schwerbehindertenquote (5 %)','SGB IX Schwerb.',
 (SELECT id FROM kategorie WHERE name='Arbeitsrecht'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§§ 154, 160 SGB IX',
 'Arbeitgeber mit jahresdurchschnittlich mindestens 20 Arbeitsplaetzen muessen 5 % der Plaetze mit schwerbehinderten Menschen besetzen. Ausgleichsabgabe 140-720 EUR/Monat/Platz. Jahresmeldung bis 31. Maerz.',
 20, NULL, NULL, NULL, NULL, TRUE, TRUE, TRUE,
 'Ausgleichsabgabe 140-720 EUR/Monat/unbesetztem Pflichtplatz.',
 NULL, NULL, 'dauerhaft', '2024', 'https://www.gesetze-im-internet.de/sgb_9_2018/'),
('Sicherheitsbeauftragter (§ 22 SGB VII)','SiB SGB VII',
 (SELECT id FROM kategorie WHERE name='Arbeitsschutz'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§ 22 SGB VII',
 'Arbeitgeber mit mehr als 20 Arbeitnehmern muessen Sicherheitsbeauftragte bestellen. Anzahl und Qualifikation richten sich nach Art und Groesse des Betriebs gemaess Unfallverhuetungsvorschriften.',
 21, NULL, NULL, NULL, NULL, TRUE, TRUE, TRUE,
 'Erhoehtes Haftungsrisiko bei Arbeitsunfaellen; Bussgeld durch Berufsgenossenschaft moeglich.',
 NULL, NULL, 'dauerhaft', 'dauerhaft', 'https://www.gesetze-im-internet.de/sgb_7/'),
('Familienpflegezeit (FPfZG)','FPfZG',
 (SELECT id FROM kategorie WHERE name='Arbeitsrecht'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§ 2 FPfZG',
 'Beschaeftigte bei Arbeitgebern mit mehr als 25 Arbeitnehmern koennen ihre Arbeitszeit fuer bis zu 24 Monate reduzieren (mind. 15 h/Woche) zur Pflege naher Angehoerige. Rueckkehrrecht gesetzlich gesichert.',
 26, NULL, NULL, NULL, NULL, TRUE, TRUE, TRUE,
 'Schadensersatz bei rechtswidriger Ablehnung; Benachteiligungsverbot.',
 NULL, NULL, 'dauerhaft', '2015', 'https://www.gesetze-im-internet.de/fpfzg/'),
('Entgelttransparenzgesetz','EntgTranspG',
 (SELECT id FROM kategorie WHERE name='Arbeitsrecht'),
 (SELECT id FROM rechtsebene WHERE name='EU-Richtlinie (umgesetzt in DE)'),
 '§§ 10 ff. EntgTranspG; EU-RL 2023/970 (ab Juni 2026)',
 'Beschaeftigte koennen Auskunft ueber Vergleichsentgelte verlangen. Ab 2026 gilt EU-Lohntransparenzrichtlinie: Schwellenwert sinkt auf 100 MA. Stellenausschreibungen muessen ab 2026 eine Gehaltsrange enthalten.',
 100, NULL, NULL, NULL, NULL, TRUE, TRUE, TRUE,
 'Keine direkten Bussgelder (DE); zivilrechtliche Ansprueche der Beschaeftigten.',
 NULL, NULL, 'Aug. 2017; EU-RL Juni 2026', 'Juni 2026', 'https://www.gesetze-im-internet.de/entgtranspg/'),
('Aufsichtsrat - Drittelbeteiligung (DrittelbG)','DrittelbG',
 (SELECT id FROM kategorie WHERE name='Mitbestimmung'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§ 1 DrittelbG',
 'Kapitalgesellschaften mit 500 bis 2.000 Arbeitnehmern muessen Aufsichtsrat einrichten, in dem ein Drittel der Mitglieder von Arbeitnehmern gewaehlt wird.',
 500, 2000, NULL, NULL, NULL, FALSE, TRUE, TRUE,
 'Gesellschaftsrechtliche Nichtigkeit von Beschluessen bei falsch besetztem Aufsichtsrat.',
 NULL, NULL, 'dauerhaft', '2004', 'https://www.gesetze-im-internet.de/drittelbg/'),
('Aufsichtsrat - Paritaetische Mitbestimmung (MitbestG)','MitbestG',
 (SELECT id FROM kategorie WHERE name='Mitbestimmung'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§ 1 MitbestG',
 'Unternehmen mit mehr als 2.000 Arbeitnehmern muessen paritaetisch besetzten Aufsichtsrat einrichten (50/50). Im Vorstand zwingend ein Arbeitsdirektor.',
 2001, NULL, NULL, NULL, NULL, FALSE, TRUE, TRUE,
 'Gesellschaftsrechtliche Nichtigkeit; strafrechtliche Risiken bei Umgehung.',
 NULL, NULL, 'dauerhaft', '2004', 'https://www.gesetze-im-internet.de/mitbestg/'),
('Hinweisgeberschutzgesetz - Interne Meldestelle','HinSchG',
 (SELECT id FROM kategorie WHERE name='Compliance'),
 (SELECT id FROM rechtsebene WHERE name='EU-Richtlinie (umgesetzt in DE)'),
 '§§ 12-14 HinSchG',
 'Unternehmen mit 50 oder mehr Beschaeftigten muessen interne Meldestellen fuer Whistleblowing einrichten. Eingangsbestaetigung 7 Tage, Rueckmeldung 3 Monate, Vertraulichkeit. Repressalien verboten.',
 50, NULL, NULL, NULL, NULL, TRUE, TRUE, TRUE,
 'Bussgeld bis 20.000 EUR (fehlende Meldestelle); bis 50.000 EUR (Repressalien).',
 50000.00, NULL, 'Juli 2023', 'Juli 2023', 'https://www.gesetze-im-internet.de/hinschg/'),
('Gesetzlicher Mindestlohn (MiLoG)','MiLoG',
 (SELECT id FROM kategorie WHERE name='Arbeitsrecht'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§ 1 MiLoG; Mindestlohnkommissions-Beschluss 2025',
 'Alle Arbeitnehmer haben Anspruch auf gesetzlichen Mindestlohn. Ab 01.01.2026: 13,90 EUR/h. Ausnahmen: Auszubildende, Pflichtpraktika bis 3 Monate, unter 18-Jaehrige ohne Berufsabschluss. Aufzeichnungspflicht bei Minijobbern.',
 1, NULL, NULL, NULL, NULL, TRUE, TRUE, TRUE,
 'Bussgeld bis 500.000 EUR; Ausschluss von oeffentlichen Vergaben.',
 500000.00, NULL, 'Jan. 2015', 'Jan. 2026 (13,90 EUR/h)', 'https://www.gesetze-im-internet.de/milog/'),
('Lieferkettensorgfaltspflichtengesetz','LkSG',
 (SELECT id FROM kategorie WHERE name='Nachhaltigkeit / ESG'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§§ 1 ff. LkSG',
 'Unternehmen mit mindestens 1.000 in Deutschland beschaeftigten Arbeitnehmern muessen menschenrechtliche und umweltbezogene Sorgfaltspflichten in globalen Lieferketten einhalten. Jaehrlicher Bericht an BAFA.',
 1000, NULL, NULL, NULL, NULL, TRUE, TRUE, TRUE,
 'Bussgeld bis 8 Mio. EUR oder 2 % des weltweiten Jahresumsatzes.',
 8000000.00, 2.00, 'Jan. 2023 (ab 3.000 MA); Jan. 2024 (ab 1.000 MA)', 'Okt. 2025 (BAFA-Pruefung ausgesetzt)', 'https://www.gesetze-im-internet.de/lksg/'),
('CSRD - Nachhaltigkeitsberichterstattung','CSRD',
 (SELECT id FROM kategorie WHERE name='Nachhaltigkeit / ESG'),
 (SELECT id FROM rechtsebene WHERE name='EU-Richtlinie (umgesetzt in DE)'),
 'EU-RL 2022/2464 (CSRD); §§ 289b ff. HGB (DE)',
 'Grosse Unternehmen muessen Nachhaltigkeitsbericht nach ESRS erstellen und pruefen lassen. Ab GJ 2025: mind. 2 von 3 Kriterien: > 250 MA, > 50 Mio. EUR Umsatz, > 25 Mio. EUR Bilanzsumme.',
 250, NULL, 50000000.00, NULL, 25000000.00, FALSE, TRUE, TRUE,
 'Ordnungsgeld § 335 HGB min. 2.500 EUR, max. 25.000 EUR.',
 25000.00, NULL, 'Ab GJ 2024 (grosse KapGes.)', 'Dez. 2024 (DE-Umsetzungsgesetz)', 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32022L2464'),
('NIS-2-Richtlinie - Cybersicherheitspflichten','NIS-2',
 (SELECT id FROM kategorie WHERE name='IT / Cybersicherheit'),
 (SELECT id FROM rechtsebene WHERE name='EU-Richtlinie (umgesetzt in DE)'),
 'EU-RL 2022/2555 (NIS-2); NIS2UmsuCG (DE, 2025)',
 'Unternehmen in 18 kritischen Sektoren muessen Cybersicherheitsmassnahmen ergreifen. Wesentliche Einrichtungen: > 250 MA und > 50 Mio. EUR Umsatz. Wichtige Einrichtungen: > 50 MA und > 10 Mio. EUR Umsatz. Vorfallsmeldung: 24h Fruehwarnung, 72h Vollmeldung.',
 50, NULL, 10000000.00, NULL, NULL, TRUE, FALSE, TRUE,
 'Wesentliche Einrichtungen: bis 10 Mio. EUR oder 2 % Jahresumsatz.',
 10000000.00, 2.00, 'Okt. 2024 (EU)', '2025 (DE-Umsetzung)', 'https://www.bsi.bund.de'),
('EU KI-Verordnung (AI Act)','EU AI Act',
 (SELECT id FROM kategorie WHERE name='Technologie / KI'),
 (SELECT id FROM rechtsebene WHERE name='EU-Recht (unmittelbar geltend)'),
 'EU-VO 2024/1689',
 'KI-Systeme werden nach Risikoklassen klassifiziert. Hochrisiko-KI benoetigt Konformitaetsbewertung. Verboten ab Feb. 2025: Social Scoring, manipulative KI, Echtzeit-Biometrie in der Oeffentlichkeit.',
 1, NULL, NULL, NULL, NULL, TRUE, FALSE, TRUE,
 'Verbotene KI: bis 35 Mio. EUR oder 7 % Jahresumsatz; Hochrisiko: bis 15 Mio. EUR oder 3 %.',
 35000000.00, 7.00, 'Aug. 2024 (in Kraft); Feb. 2025 (Verbote)', 'Aug. 2025', 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689'),
('E-Rechnungspflicht (B2B)','E-Rechnung',
 (SELECT id FROM kategorie WHERE name='Steuer / Rechnungswesen'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§ 14 UStG (Wachstumschancengesetz 2024)',
 'Phase 1 (01.01.2025): Empfangspflicht fuer alle Unternehmen. Phase 2 (01.01.2027): Versandpflicht fuer Unternehmen mit Vorjahresumsatz > 800.000 EUR. Phase 3 (01.01.2028): Versandpflicht fuer alle.',
 1, NULL, NULL, NULL, NULL, TRUE, TRUE, TRUE,
 'Steuerrechtliche Nichtabzugsfaehigkeit bei falschem Format; Nachzahlungszinsen.',
 NULL, NULL, '01.01.2025 (Empfang)', '01.01.2028 (vollst. Versand)', 'https://www.bundesfinanzministerium.de'),
('Barrierefreiheitsstaerkungsgesetz (BFSG)','BFSG',
 (SELECT id FROM kategorie WHERE name='Digital / Verbraucherschutz'),
 (SELECT id FROM rechtsebene WHERE name='EU-Richtlinie (umgesetzt in DE)'),
 'BFSG; EU-RL 2019/882 (EAA)',
 'Produkte und Dienstleistungen fuer Verbraucher muessen barrierefrei sein. Ausnahme: Kleinstunternehmen < 10 MA UND < 2 Mio. EUR Umsatz. WCAG 2.1 Level AA als Mindeststandard.',
 10, NULL, 2000000.00, NULL, NULL, TRUE, FALSE, TRUE,
 'Bussgeld bis 100.000 EUR; Marktaufsicht kann Vertriebsverbot anordnen.',
 100000.00, NULL, '28. Juni 2025', '28. Juni 2025', 'https://www.gesetze-im-internet.de/bfsg/'),
('Bilanzierungspflicht - Einzelkaufleute (§ 241a HGB)','HGB §241a',
 (SELECT id FROM kategorie WHERE name='Steuer / Rechnungswesen'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§§ 238, 241a HGB; § 141 AO',
 'Einzelkaufleute sind befreit bei Unterschreitung beider Grenzen: Jahresumsatz <= 800.000 EUR und Jahresueberschuss <= 80.000 EUR. Personenhandelsgesellschaften stets buchfuehrungspflichtig.',
 NULL, NULL, 800001.00, NULL, NULL, FALSE, TRUE, TRUE,
 'Steuerliche Schaetzung (§ 162 AO); Ordnungsgeld § 335 HGB.',
 NULL, NULL, 'dauerhaft; Schwellenwerte erhoeht 2024', 'Jan. 2024', 'https://www.gesetze-im-internet.de/hgb/__241a.html'),
('Jahresabschluss-Offenlegung (§ 325 HGB)','HGB §325',
 (SELECT id FROM kategorie WHERE name='Steuer / Rechnungswesen'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§ 325 HGB',
 'Kapitalgesellschaften muessen Jahresabschluesse beim Bundesanzeiger einreichen. Frist: 12 Monate nach Geschaeftsjahresende. Ordnungsgeldverfahren durch Bundesamt fuer Justiz.',
 NULL, NULL, NULL, NULL, NULL, FALSE, TRUE, TRUE,
 'Ordnungsgeld § 335 HGB: min. 2.500 EUR, max. 25.000 EUR je Verstoss.',
 25000.00, NULL, 'dauerhaft', 'dauerhaft', 'https://www.gesetze-im-internet.de/hgb/__325.html'),
('HGB-Groessenklassen (§ 267 HGB)','HGB §267',
 (SELECT id FROM kategorie WHERE name='Steuer / Rechnungswesen'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§§ 267, 267a HGB',
 'Kapitalgesellschaften werden in 4 Groessenklassen eingeteilt (Schwellenwerte ab GJ 2024). Klein: <= 7,5 Mio. EUR BS / <= 15 Mio. EUR UE / <= 50 MA. Mittel: <= 25 Mio. EUR BS / <= 50 Mio. EUR UE / <= 250 MA.',
 NULL, NULL, NULL, NULL, NULL, FALSE, TRUE, TRUE,
 'Indirekte Pflichten: falsche Einstufung fuehrt zu fehlenden Pflichtbestandteilen des Abschlusses.',
 25000.00, NULL, 'dauerhaft; +25 % Erhoehung 2024', 'Jan. 2024', 'https://www.gesetze-im-internet.de/hgb/__267.html'),
('Jahresabschluss-Pflichtpruefung (§ 316 HGB)','WP-Pflicht §316',
 (SELECT id FROM kategorie WHERE name='Steuer / Rechnungswesen'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§ 316 HGB',
 'Mittelgrosse und grosse Kapitalgesellschaften muessen Jahresabschluss durch Wirtschaftspruefer pruefen lassen. Kapitalmarktorientierte Unternehmen stets als grosse Gesellschaften behandelt.',
 51, NULL, 15000001.00, NULL, NULL, FALSE, TRUE, TRUE,
 'Ohne Bestaedigungsvermerk kein gueltiger Jahresabschluss.',
 NULL, NULL, 'dauerhaft', 'dauerhaft', 'https://www.gesetze-im-internet.de/hgb/__316.html'),
('Ertragsteuer-Informationsbericht (§ 342b HGB)','CbCR-Offenlegung',
 (SELECT id FROM kategorie WHERE name='Steuer / Rechnungswesen'),
 (SELECT id FROM rechtsebene WHERE name='EU-Richtlinie (umgesetzt in DE)'),
 '§§ 342b-342k HGB; EU-RL 2021/2101',
 'Grosse Unternehmen mit Umsatzerloesen > 750 Mio. EUR in zwei aufeinanderfolgenden GJ muessen jaehrlich Ertragsteuer-Informationsbericht veroeffentlichen (Public CbCR).',
 NULL, NULL, 750000000.00, NULL, NULL, FALSE, TRUE, TRUE,
 'Ordnungsgeld nach § 335 HGB.',
 25000.00, NULL, 'Ab GJ 2025', 'Jan. 2025', 'https://www.gesetze-im-internet.de/hgb/__342b.html'),
('CO2-Bepreisung - EU-Emissionshandel und BEHG','EU-ETS / BEHG',
 (SELECT id FROM kategorie WHERE name='Umwelt / Energie'),
 (SELECT id FROM rechtsebene WHERE name='EU-Recht (unmittelbar geltend)'),
 'EU-RL 2003/87/EG (ETS); TEHG (DE); BEHG',
 'Betreiber von Anlagen in Energie, Industrie, Luftfahrt und Schifffahrt muessen CO2-Zertifikate abgeben. Nationales BEHG: CO2-Preis 55 EUR/t (2025) fuer Gebaeude, Waerme und Verkehr.',
 NULL, NULL, NULL, NULL, NULL, TRUE, FALSE, TRUE,
 'Strafzahlung 100 EUR/t nicht abgegebener CO2-Zertifikate.',
 NULL, NULL, 'EU-ETS: 2005; BEHG: 2021', '2024 (ETS-Reform Schifffahrt)', 'https://www.dehst.de'),
('Energieaudit - EDL-G (alle 4 Jahre)','Energieaudit EDL-G',
 (SELECT id FROM kategorie WHERE name='Umwelt / Energie'),
 (SELECT id FROM rechtsebene WHERE name='EU-Richtlinie (umgesetzt in DE)'),
 '§ 8 EDL-G; EU-RL 2012/27/EU (EED)',
 'Nicht-KMU (mehr als 250 MA ODER mehr als 50 Mio. EUR Umsatz) muessen alle vier Jahre Energieaudit nach DIN EN 16247 durchfuehren. Alternativ: ISO 50001 oder EMAS.',
 251, NULL, 50000000.00, NULL, 43000000.00, TRUE, TRUE, TRUE,
 'Bussgeld bis 50.000 EUR bei fehlendem Audit.',
 50000.00, NULL, '2015', 'EDL-G-Novelle 2019', 'https://www.bafa.de'),
('Smart-Meter-Pflicht (MsbG)','Smart Meter MsbG',
 (SELECT id FROM kategorie WHERE name='Umwelt / Energie'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§§ 29-32 MsbG',
 'Letztverbraucher mit Jahresstromverbrauch 6.000-100.000 kWh sowie Betreiber von EEG-/KWK-Anlagen ab 7 kW muessen Smart Meter einbauen lassen (Duldungspflicht).',
 NULL, NULL, NULL, NULL, NULL, TRUE, TRUE, TRUE,
 'Duldungspflicht; zivilrechtliche Folgen bei Verweigerung.',
 NULL, NULL, '2025 (Rollout-Verpflichtung)', '2025', 'https://www.bundesnetzagentur.de'),
('Verpackungsgesetz - LUCID-Registrierungspflicht','VerpackG',
 (SELECT id FROM kategorie WHERE name='Umwelt / Energie'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 'VerpackG; §§ 9, 15-17 VerpackG',
 'Hersteller von Verpackungen muessen sich im LUCID-Register registrieren und Verpackungen bei einem dualen System lizenzieren. Vollstaendigkeitserklaerung bis 15. Mai des Folgejahres.',
 1, NULL, NULL, NULL, NULL, TRUE, FALSE, TRUE,
 'Bussgeld bis 200.000 EUR bei fehlender Registrierung.',
 200000.00, NULL, '2019', '2022 (Novelle)', 'https://www.verpackungsregister.org'),
('Entwaldungsfreie Lieferkette (EUDR)','EUDR',
 (SELECT id FROM kategorie WHERE name='Umwelt / Energie'),
 (SELECT id FROM rechtsebene WHERE name='EU-Recht (unmittelbar geltend)'),
 'EU-VO 2023/1115 (EUDR)',
 'Unternehmen die Rinder, Kakao, Kaffee, Palmoel, Soja, Holz oder Kautschuk in die EU bringen muessen Entwaldungsfreiheit nachweisen. Georeferenzierte Herkunftsflaechen erforderlich.',
 NULL, NULL, NULL, NULL, NULL, TRUE, FALSE, TRUE,
 'Bussgeld bis 4 % des EU-Jahresumsatzes; Einziehung der Waren.',
 NULL, 4.00, 'Grosse/mittlere: 30.12.2026; Kleine: 30.06.2027', 'Dez. 2025 (Fristverlängerung)', 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32023R1115'),
('Meisterpflicht im zugelassenen Handwerk (HwO)','HwO Meisterpflicht',
 (SELECT id FROM kategorie WHERE name='Branche: Handwerk'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§§ 1, 7, 8 HwO; Anlage A HwO',
 'In 41 zulassungspflichtigen Handwerken der Anlage A darf ein Betrieb nur gefuehrt werden wenn Inhaber oder Betriebsleiter die Meisterpruefung abgelegt hat.',
 1, NULL, NULL, NULL, NULL, TRUE, FALSE, TRUE,
 'Betriebsuntersagung durch Handwerkskammer; Bussgeld bis 10.000 EUR.',
 10000.00, NULL, 'dauerhaft; Reform 2020', '2020', 'https://www.gesetze-im-internet.de/hwo/'),
('Elektronische Kassensysteme - TSE-Pflicht und Meldepflicht','TSE-Pflicht',
 (SELECT id FROM kategorie WHERE name='Steuer / Rechnungswesen'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§ 146a AO; KassenSichV',
 'Alle Unternehmen mit elektronischen Kassensystemen muessen diese mit zertifizierter TSE ausstatten und bis 31.07.2025 beim Finanzamt melden. Belegausgabepflicht. Aufbewahrungspflicht: 10 Jahre.',
 1, NULL, NULL, NULL, NULL, TRUE, FALSE, TRUE,
 'Hinzuschaetzung Steuer; Ordnungsgeld; Steuerstrafrecht bei Manipulationen.',
 NULL, NULL, '2020 (TSE-Pflicht); 2025 (Meldepflicht)', '2025', 'https://www.bundesfinanzministerium.de'),
('Gastronomie - Ermaessigter Umsatzsteuersatz 7 % auf Speisen','Gastro-MwSt 7%',
 (SELECT id FROM kategorie WHERE name='Branche: Gastronomie'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§ 12 Abs. 2 Nr. 1 UStG; Steuerenderungsgesetz 2025',
 'Seit 01.01.2026 gilt dauerhaft 7 % auf Restaurant- und Verpflegungsdienstleistungen (Speisen). Getraenke bleiben beim Regelsteuersatz 19 %.',
 1, NULL, NULL, NULL, NULL, TRUE, FALSE, TRUE,
 'Steuerliche Nachzahlung bei falscher Besteuerung.',
 NULL, NULL, '01.01.2026 (dauerhaft)', 'Jan. 2026', 'https://www.bundesfinanzministerium.de'),
('Branchenmindestloehne (AEntG)','Branchenmindestlohn',
 (SELECT id FROM kategorie WHERE name='Branche: Bau'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz + Tarifvertrag'),
 '§§ 3-8 AEntG; branchenspezifische Mindestlohn-TV',
 'Branchenspezifische Mindestloehne gelten verbindlich fuer alle in Deutschland taetigen Arbeitgeber. Bau: ab April 2025 angepasst; Elektrohandwerk: 14,41 EUR/h; Dachdeckerhandwerk: 14,96-16,60 EUR/h; Gebaeudereiniger: 15-18,40 EUR/h.',
 1, NULL, NULL, NULL, NULL, TRUE, FALSE, TRUE,
 'Bussgeld bis 500.000 EUR; Ausschluss oeffentliche Vergaben; Generalunternehmerhaftung.',
 500000.00, NULL, 'Anpassungen 2025/2026', 'Jan. 2026', 'https://www.gesetze-im-internet.de/aentg/'),
('Schwarzarbeitsbekaempfung - Schriftformpflicht Arbeitsvertrag','SchwarzArbG §2a',
 (SELECT id FROM kategorie WHERE name='Branche: Bau'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§ 2a SchwarzArbG; § 2 NachwG',
 'In Hochrisikobranchen (Bau, Gaststaettengewerbe, Gebaeudereinigung, Spedition, Fleischwirtschaft) muessen wesentliche Arbeitsbedingungen schriftlich festgehalten werden. Arbeitszeitaufzeichnung taeglich.',
 1, NULL, NULL, NULL, NULL, TRUE, FALSE, TRUE,
 'Bussgeld bis 500.000 EUR bei Schwarzarbeit; fehlende Arbeitszeitaufzeichnung bis 15.000 EUR.',
 500000.00, NULL, 'dauerhaft', '2025 (BEG IV)', 'https://www.gesetze-im-internet.de/schwarzarbg/'),
('Gefahrstoffverordnung - Asbest-Drei-Zonen-Modell','GefStoffV Asbest',
 (SELECT id FROM kategorie WHERE name='Arbeitsschutz'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 'GefStoffV; TRGS 519; TRGS 910',
 'Ueberarbeitetes Drei-Zonen-Modell fuer Asbestarbeiten (2025): Rote Zone (> 100.000 Fasern/m3), Gelbe Zone (10.000-100.000), Gruene Zone (< 10.000). Sachkundenachweis und Behoerdenanzeige bleiben erforderlich.',
 1, NULL, NULL, NULL, NULL, TRUE, FALSE, TRUE,
 'Bussgeld bis 25.000 EUR; Betriebsunterbrechung durch Gewerbeaufsicht.',
 25000.00, NULL, '2025 (ueberarbeitet)', '2025', 'https://www.gesetze-im-internet.de/gefstoffv/'),
('Digitaler Arbeitsvertrag (Buerokratieentlastungsgesetz IV)','BEG IV NachwG',
 (SELECT id FROM kategorie WHERE name='Arbeitsrecht'),
 (SELECT id FROM rechtsebene WHERE name='Bundesgesetz'),
 '§ 2 NachwG (neu); BEG IV 2025',
 'Seit 2025 koennen Arbeitsvertraege vollstaendig in Textform abgeschlossen werden. Nachweis wesentlicher Arbeitsbedingungen innerhalb 7 Tagen. Ausnahme: § 2a SchwarzArbG-Branchen muessen Schriftform wahren.',
 1, NULL, NULL, NULL, NULL, TRUE, TRUE, TRUE,
 'Bussgeld bis 2.000 EUR bei fehlendem schriftlichem Nachweis.',
 2000.00, NULL, '2025', '2025', 'https://www.gesetze-im-internet.de/nachweisgesetz/'),
('EU Digital Services Act (DSA)','DSA',
 (SELECT id FROM kategorie WHERE name='Digital / Verbraucherschutz'),
 (SELECT id FROM rechtsebene WHERE name='EU-Recht (unmittelbar geltend)'),
 'EU-VO 2022/2065 (DSA)',
 'DSA regelt Pflichten fuer Vermittlungsdienste. Alle: klares Impressum, Meldestelle fuer illegale Inhalte. Marktplaetze: Haendleridentitaeten pruefen. Sehr grosse Plattformen (> 45 Mio. EU-Nutzer): Risikoanalyse, Algorithmus-Transparenz.',
 1, NULL, NULL, NULL, NULL, TRUE, FALSE, TRUE,
 'Sehr grosse Plattformen bis 10 % weltweiter Jahresumsatz; sonstige Dienste bis 6 %.',
 NULL, 10.00, 'Feb. 2024 (fuer alle)', 'Feb. 2024', 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32022R2065'),
('DSGVO - Datenschutz-Grundverordnung','DSGVO',
 (SELECT id FROM kategorie WHERE name='Datenschutz'),
 (SELECT id FROM rechtsebene WHERE name='EU-Recht (unmittelbar geltend)'),
 'EU-VO 2016/679 (DSGVO); BDSG',
 'Die DSGVO gilt fuer alle Verantwortlichen die personenbezogene Daten verarbeiten. Kernpflichten: Rechtmaessige Grundlage, Datenschutzerklaerung, Verzeichnis der Verarbeitungstaetigkeiten, Datenpannenmeldung binnen 72h, Betroffenenrechte.',
 1, NULL, NULL, NULL, NULL, TRUE, TRUE, TRUE,
 'Schwere Verstoesse: bis 20 Mio. EUR oder 4 % weltweiter Jahresumsatz.',
 20000000.00, 4.00, 'Mai 2018', 'laufend (EuGH-Rechtsprechung)', 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32016R0679'),
('Geldwaeschegesetz - Sorgfaltspflichten und Verdachtsmeldung','GwG',
 (SELECT id FROM kategorie WHERE name='Compliance'),
 (SELECT id FROM rechtsebene WHERE name='EU-Richtlinie (umgesetzt in DE)'),
 '§§ 1-58 GwG; EU-AMLD IV-VI',
 'Verpflichtete (Kreditinstitute, Finanzdienstleister, Rechtsanwaelte, Steuerberater, Notare, Immobilienmakler, Gueterhaendler ab 10.000 EUR Barzahlung, Kryptounternehmen) muessen Risikoanalyse, KYC, Verdachtsmeldung an FIU und 5-jaehrige Aufzeichnung sicherstellen.',
 1, NULL, NULL, NULL, NULL, TRUE, FALSE, TRUE,
 'Bussgeld bis 5 Mio. EUR oder 10 % des Jahresumsatzes; Zulassungsentzug.',
 5000000.00, 10.00, 'dauerhaft; laufend novelliert', '2024 (GwG-Novelle)', 'https://www.gesetze-im-internet.de/gwg_2017/'),
('Produktsicherheitsgesetz / EU-Produktsicherheitsverordnung (GPSR)','ProdSG / GPSR',
 (SELECT id FROM kategorie WHERE name='Verbraucherschutz'),
 (SELECT id FROM rechtsebene WHERE name='EU-Recht (unmittelbar geltend)'),
 'EU-VO 2023/988 (GPSR); ProdSG',
 'Hersteller, Importeure und Haendler muessen sicherstellen dass ihre Produkte sicher sind. CE-Kennzeichnung, technische Unterlagen, Rueckverfolgbarkeit. Online-Marktplaetze muessen Sicherheitsnachweise einfordern.',
 1, NULL, NULL, NULL, NULL, TRUE, FALSE, TRUE,
 'Bussgeld bis 100.000 EUR; Rueckruf auf Kosten des Herstellers.',
 100000.00, NULL, 'Dez. 2024 (GPSR)', 'Dez. 2024', 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32023R0988'),
('Gaststaettenrecht - Erlaubnispflicht und Betriebsvorschriften','Gaststaettenrecht Laender',
 (SELECT id FROM kategorie WHERE name='Branche: Gastronomie'),
 (SELECT id FROM rechtsebene WHERE name='Landesgesetz'),
 'BayGastG; GaststaettenG Laender; GewO §§ 14 ff.; LMHV',
 'Der Betrieb einer Gaststaette erfordert in den meisten Bundeslaendern eine behoerdliche Erlaubnis. Voraussetzungen: persoenliche Zuverlaessigkeit, Sachkundenachweis, HACCP-Konzept, Nichtraucherschutz, Jugendschutz.',
 1, NULL, NULL, NULL, NULL, TRUE, FALSE, FALSE,
 'Betriebsuntersagung; Bussgeld bis 5.000 EUR; Widerruf der Erlaubnis.',
 5000.00, NULL, 'Laenderspezifisch', 'laenderspezifisch', NULL);

-- Rechtsform-Verknuepfungen
INSERT INTO regulierung_rechtsform (regulierung_id, rechtsform_id)
SELECT r.id, rf.id FROM regulierung r, rechtsform rf
WHERE r.kurzname = 'DrittelbG' AND rf.kuerzel IN ('AG','GmbH','KGaA','eG','SE');

INSERT INTO regulierung_rechtsform (regulierung_id, rechtsform_id)
SELECT r.id, rf.id FROM regulierung r, rechtsform rf
WHERE r.kurzname = 'MitbestG' AND rf.kuerzel IN ('AG','GmbH','KGaA','eG','SE','OHG','KG','GmbHCoKG');

INSERT INTO regulierung_rechtsform (regulierung_id, rechtsform_id)
SELECT r.id, rf.id FROM regulierung r, rechtsform rf
WHERE r.kurzname = 'CSRD' AND rf.kuerzel IN ('AG','GmbH','SE','KGaA','GmbHCoKG');

INSERT INTO regulierung_rechtsform (regulierung_id, rechtsform_id)
SELECT r.id, rf.id FROM regulierung r, rechtsform rf
WHERE r.kurzname = 'HGB §325' AND rf.kuerzel IN ('AG','GmbH','SE','KGaA','GmbHCoKG','UG');

INSERT INTO regulierung_rechtsform (regulierung_id, rechtsform_id)
SELECT r.id, rf.id FROM regulierung r, rechtsform rf
WHERE r.kurzname = 'HGB §267' AND rf.kuerzel IN ('AG','GmbH','SE','KGaA','GmbHCoKG','UG');

INSERT INTO regulierung_rechtsform (regulierung_id, rechtsform_id)
SELECT r.id, rf.id FROM regulierung r, rechtsform rf
WHERE r.kurzname = 'WP-Pflicht §316' AND rf.kuerzel IN ('AG','GmbH','SE','KGaA','GmbHCoKG');

INSERT INTO regulierung_rechtsform (regulierung_id, rechtsform_id)
SELECT r.id, rf.id FROM regulierung r, rechtsform rf
WHERE r.kurzname = 'CbCR-Offenlegung' AND rf.kuerzel IN ('AG','GmbH','SE','KGaA','GmbHCoKG');

INSERT INTO regulierung_rechtsform (regulierung_id, rechtsform_id)
SELECT r.id, rf.id FROM regulierung r, rechtsform rf
WHERE r.kurzname = 'HGB §241a' AND rf.kuerzel IN ('eK','OHG','KG','GmbHCoKG');

-- Branchen-Verknuepfungen
INSERT INTO regulierung_branche (regulierung_id, branche_id)
SELECT r.id, b.id FROM regulierung r, branche b
WHERE r.kurzname = 'NIS-2' AND b.name IN (
  'Energie / Versorgung','Gesundheitswesen / Kliniken','Wasserversorgung','Abfallwirtschaft',
  'Finanzdienstleistungen / Banken','Versicherungen','IKT / Informationstechnologie',
  'Telekommunikation','Logistik / Spedition','Chemieindustrie','Lebensmittelproduktion',
  'Ruestungsindustrie','Online-Plattformen / Marktplaetze');

INSERT INTO regulierung_branche (regulierung_id, branche_id)
SELECT r.id, b.id FROM regulierung r, branche b
WHERE r.kurzname = 'EU AI Act' AND b.name IN (
  'Finanzdienstleistungen / Banken','Gesundheitswesen / Kliniken',
  'IKT / Informationstechnologie','Online-Plattformen / Marktplaetze',
  'Automobilindustrie','Versicherungen','Pharmaindustrie');

INSERT INTO regulierung_branche (regulierung_id, branche_id)
SELECT r.id, b.id FROM regulierung r, branche b
WHERE r.kurzname = 'BFSG' AND b.name IN (
  'E-Commerce / Online-Handel','Finanzdienstleistungen / Banken',
  'Telekommunikation','Online-Plattformen / Marktplaetze','IKT / Informationstechnologie');

INSERT INTO regulierung_branche (regulierung_id, branche_id)
SELECT r.id, b.id FROM regulierung r, branche b
WHERE r.kurzname = 'DSA' AND b.name IN (
  'E-Commerce / Online-Handel','Online-Plattformen / Marktplaetze',
  'IKT / Informationstechnologie','Telekommunikation');

INSERT INTO regulierung_branche (regulierung_id, branche_id)
SELECT r.id, b.id FROM regulierung r, branche b
WHERE r.kurzname = 'GwG' AND b.name IN (
  'Finanzdienstleistungen / Banken','Versicherungen','Immobilienwirtschaft','Immobilienmakler',
  'Steuerberatung / Wirtschaftspruefung','Rechtsberatung','Notare','Kunsthandel','Kryptounternehmen');

INSERT INTO regulierung_branche (regulierung_id, branche_id)
SELECT r.id, b.id FROM regulierung r, branche b
WHERE r.kurzname = 'Gastro-MwSt 7%' AND b.name IN ('Gastronomie','Hotellerie','Baeckerei / Konditorei');

INSERT INTO regulierung_branche (regulierung_id, branche_id)
SELECT r.id, b.id FROM regulierung r, branche b
WHERE r.kurzname = 'TSE-Pflicht' AND b.name IN (
  'Gastronomie','Einzelhandel','Baeckerei / Konditorei','Hotellerie','Kosmetik / Wellness');

INSERT INTO regulierung_branche (regulierung_id, branche_id)
SELECT r.id, b.id FROM regulierung r, branche b
WHERE r.kurzname = 'Branchenmindestlohn' AND b.name IN (
  'Bauhauptgewerbe','Ausbauhandwerk','Elektrohandwerk','Dachdeckerhandwerk',
  'Gebaeudereinigung','Fleischwirtschaft');

INSERT INTO regulierung_branche (regulierung_id, branche_id)
SELECT r.id, b.id FROM regulierung r, branche b
WHERE r.kurzname = 'SchwarzArbG §2a' AND b.name IN (
  'Bauhauptgewerbe','Gastronomie','Gebaeudereinigung','Logistik / Spedition','Fleischwirtschaft');

INSERT INTO regulierung_branche (regulierung_id, branche_id)
SELECT r.id, b.id FROM regulierung r, branche b
WHERE r.kurzname = 'HwO Meisterpflicht' AND b.name IN (
  'Bauhauptgewerbe','Ausbauhandwerk','Elektrohandwerk','Dachdeckerhandwerk',
  'Kfz-Gewerbe','Baeckerei / Konditorei');

INSERT INTO regulierung_branche (regulierung_id, branche_id)
SELECT r.id, b.id FROM regulierung r, branche b
WHERE r.kurzname = 'GefStoffV Asbest' AND b.name IN ('Bauhauptgewerbe','Ausbauhandwerk','Gebaeudereinigung');

INSERT INTO regulierung_branche (regulierung_id, branche_id)
SELECT r.id, b.id FROM regulierung r, branche b
WHERE r.kurzname = 'EU-ETS / BEHG' AND b.name IN (
  'Energie / Versorgung','Chemieindustrie','Maschinenbau','Automobilindustrie','Lebensmittelproduktion');

INSERT INTO regulierung_branche (regulierung_id, branche_id)
SELECT r.id, b.id FROM regulierung r, branche b
WHERE r.kurzname = 'VerpackG' AND b.name IN (
  'Einzelhandel','Grosshandel','E-Commerce / Online-Handel','Gastronomie',
  'Lebensmittelproduktion','Baeckerei / Konditorei');

INSERT INTO regulierung_branche (regulierung_id, branche_id)
SELECT r.id, b.id FROM regulierung r, branche b
WHERE r.kurzname = 'EUDR' AND b.name IN (
  'Land- und Forstwirtschaft','Holzverarbeitende Industrie','Lebensmittelproduktion',
  'Baeckerei / Konditorei','Automobilindustrie');

INSERT INTO regulierung_branche (regulierung_id, branche_id)
SELECT r.id, b.id FROM regulierung r, branche b
WHERE r.kurzname = 'Gaststaettenrecht Laender' AND b.name IN ('Gastronomie','Hotellerie');

INSERT INTO regulierung_branche (regulierung_id, branche_id)
SELECT r.id, b.id FROM regulierung r, branche b
WHERE r.kurzname = 'ProdSG / GPSR' AND b.name IN (
  'Einzelhandel','Grosshandel','E-Commerce / Online-Handel',
  'Maschinenbau','Automobilindustrie','Medizintechnik','Pharmaindustrie');

INSERT INTO regulierung_branche (regulierung_id, branche_id)
SELECT r.id, b.id FROM regulierung r, branche b
WHERE r.kurzname = 'Energieaudit EDL-G' AND b.name IN (
  'Energie / Versorgung','Chemieindustrie','Maschinenbau','Automobilindustrie','Lebensmittelproduktion');

ANALYZE;
