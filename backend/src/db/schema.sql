-- ComplianceKit – PostgreSQL Schema
-- Ausführen mit: psql $DATABASE_URL -f schema.sql

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Unternehmen ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS companies (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(255) NOT NULL,
  rechtsform    VARCHAR(100) NOT NULL,
  branche       VARCHAR(100) NOT NULL,
  mitarbeiter   VARCHAR(20)  NOT NULL,  -- '0' | '1–9' | '10–49' | '50–249' | '250+'
  bundesland    VARCHAR(100) NOT NULL,
  umsatz        VARCHAR(50)  NOT NULL,
  gruendungsjahr VARCHAR(20) NOT NULL,
  foerderzweck  TEXT[]       NOT NULL DEFAULT '{}',
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── Regulatorik-Status pro Unternehmen ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS regulation_status (
  company_id      UUID         NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  regulation_id   VARCHAR(100) NOT NULL,
  status          VARCHAR(20)  NOT NULL DEFAULT 'offen'
                  CHECK (status IN ('offen', 'erledigt', 'nicht_relevant')),
  updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  PRIMARY KEY (company_id, regulation_id)
);

-- ── Förderprogramme (gecrawlte Daten) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fundings (
  id                    VARCHAR(200) PRIMARY KEY,
  title                 VARCHAR(500) NOT NULL,
  beschreibung          TEXT,
  typ                   VARCHAR(50)  NOT NULL CHECK (typ IN ('Zuschuss','Kredit','Steuervorteil','Bürgschaft','Beteiligung','Beratungszuschuss')),
  quelle                VARCHAR(50)  NOT NULL CHECK (quelle IN ('EU','Bund','Bundesland','Gemeinde')),
  foerderer             VARCHAR(200),
  max_betrag            BIGINT,
  zins                  VARCHAR(100),
  antrag_url            TEXT         NOT NULL,
  bearbeitungszeit_min  INT,
  bearbeitungszeit_max  INT,
  ausschlusskriterien   TEXT[],
  benoetigte_dokumente  JSONB,
  gilt_fuer             JSONB        NOT NULL,
  relevanz_boost        JSONB,
  scraped_at            TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── Regulierungen (gecrawlte Daten) ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS regulations (
  id                    VARCHAR(200) PRIMARY KEY,
  title                 VARCHAR(500) NOT NULL,
  category              VARCHAR(100) NOT NULL,
  beschreibung          TEXT,
  rechtsgrundlage       VARCHAR(200),
  quelle_url            TEXT,
  gilt_fuer             JSONB        NOT NULL,
  hat_dokument_generator BOOLEAN     NOT NULL DEFAULT FALSE,
  dokument_typ          VARCHAR(100),
  scraped_at            TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── Gespeicherte Matching-Ergebnisse (Cache) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS match_cache (
  company_id    UUID         NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  type          VARCHAR(20)  NOT NULL CHECK (type IN ('funding', 'regulation')),
  item_id       VARCHAR(200) NOT NULL,
  score         INT          NOT NULL DEFAULT 0,
  computed_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  PRIMARY KEY (company_id, type, item_id)
);

-- ── Indexes ───────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_regulation_status_company ON regulation_status(company_id);
CREATE INDEX IF NOT EXISTS idx_fundings_typ ON fundings(typ);
CREATE INDEX IF NOT EXISTS idx_fundings_quelle ON fundings(quelle);
CREATE INDEX IF NOT EXISTS idx_fundings_max_betrag ON fundings(max_betrag DESC);
CREATE INDEX IF NOT EXISTS idx_match_cache_company ON match_cache(company_id, type);

-- ── Auto-Update updated_at ────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER companies_updated_at
  BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER fundings_updated_at
  BEFORE UPDATE ON fundings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER regulations_updated_at
  BEFORE UPDATE ON regulations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
