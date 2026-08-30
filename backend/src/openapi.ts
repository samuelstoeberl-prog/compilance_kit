// OpenAPI 3.0-Spezifikation der Backend-API. Hand-gepflegt (kein
// Auto-Generator), muss bei Routenänderungen manuell nachgezogen werden —
// siehe backend/src/routes/*.ts für den tatsächlichen Code.

export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'ComplianceKit API',
    version: '1.0.0',
    description:
      'Backend-API für ComplianceKit. Liefert Regulierungen/Förderungen ' +
      'passend zum Unternehmensprofil und verwaltet Nutzerkonten. ' +
      'Alle Endpunkte außer /api/health erfordern einen gültigen Clerk-' +
      'Session-Token als Bearer-Token.',
  },
  servers: [{ url: '/api', description: 'Relativ zum Deployment-Origin' }],
  components: {
    securitySchemes: {
      clerkAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Clerk-Session-Token, vom Frontend via getToken() geholt.',
      },
    },
    schemas: {
      Error: {
        type: 'object',
        properties: { error: { type: 'string' } },
        required: ['error'],
      },
      Company: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          clerk_user_id: { type: 'string', nullable: true },
          name: { type: 'string' },
          rechtsform: { type: 'string' },
          branche: { type: 'string' },
          mitarbeiter: { type: 'string', enum: ['0', '1–9', '10–49', '50–249', '250+'] },
          bundesland: { type: 'string' },
          umsatz: { type: 'string' },
          gruendungsjahr: { type: 'string' },
          foerderzweck: { type: 'array', items: { type: 'string' } },
          email: { type: 'string', nullable: true },
          telefon: { type: 'string', nullable: true },
          strasse: { type: 'string', nullable: true },
          plz_ort: { type: 'string', nullable: true },
          website: { type: 'string', nullable: true },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' },
        },
      },
      CompanyInput: {
        type: 'object',
        required: ['name', 'rechtsform', 'branche', 'mitarbeiter', 'bundesland', 'umsatz', 'gruendungsjahr'],
        properties: {
          name: { type: 'string', maxLength: 255 },
          rechtsform: {
            type: 'string',
            enum: [
              'Einzelunternehmen', 'e.K. (eingetragener Kaufmann)', 'GbR', 'OHG', 'KG',
              'GmbH & Co. KG', 'GmbH', 'UG (haftungsbeschränkt)', 'AG',
              'gGmbH (gemeinnützig)', 'e.V. (Verein)', 'eG (Genossenschaft)',
            ],
          },
          branche: { type: 'string', maxLength: 100 },
          mitarbeiter: { type: 'string', enum: ['0', '1–9', '10–49', '50–249', '250+'] },
          bundesland: { type: 'string', maxLength: 100 },
          umsatz: { type: 'string', maxLength: 50 },
          gruendungsjahr: { type: 'string', maxLength: 20 },
          foerderzweck: { type: 'array', items: { type: 'string' }, default: [] },
          email: { type: 'string', format: 'email' },
          telefon: { type: 'string', maxLength: 50 },
          strasse: { type: 'string', maxLength: 255 },
          plz_ort: { type: 'string', maxLength: 100 },
          website: { type: 'string', maxLength: 255 },
        },
      },
      Funding: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          beschreibung: { type: 'string' },
          typ: { type: 'string', enum: ['Zuschuss', 'Kredit', 'Steuervorteil', 'Bürgschaft', 'Beteiligung', 'Beratungszuschuss'] },
          quelle: { type: 'string', enum: ['EU', 'Bund', 'Bundesland', 'Gemeinde'] },
          foerderer: { type: 'string' },
          max_betrag: { type: 'number', nullable: true },
          zins: { type: 'string', nullable: true },
          antrag_url: { type: 'string', format: 'uri' },
          bearbeitungszeit_min: { type: 'integer' },
          bearbeitungszeit_max: { type: 'integer' },
          ausschlusskriterien: { type: 'array', items: { type: 'string' } },
          score: { type: 'integer', minimum: 0, maximum: 100, description: 'Relevanz-Score für das angefragte Unternehmen' },
        },
      },
      Regulation: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          category: { type: 'string' },
          beschreibung: { type: 'string' },
          rechtsgrundlage: { type: 'string' },
          quelle_url: { type: 'string', format: 'uri' },
          hat_dokument_generator: { type: 'boolean' },
          dokument_typ: { type: 'string', nullable: true },
          status: { type: 'string', enum: ['offen', 'erledigt', 'nicht_relevant'] },
        },
      },
    },
  },
  security: [{ clerkAuth: [] }],
  paths: {
    '/health': {
      get: {
        summary: 'Health-Check',
        security: [],
        responses: {
          200: {
            description: 'API läuft',
            content: { 'application/json': { schema: { type: 'object', properties: { status: { type: 'string' }, ts: { type: 'string' } } } } },
          },
        },
      },
    },
    '/companies/me': {
      get: {
        summary: 'Unternehmen des eingeloggten Nutzers',
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Company' } } } },
          401: { description: 'Nicht authentifiziert', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'Noch kein Unternehmen angelegt', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
    '/companies': {
      post: {
        summary: 'Unternehmen anlegen oder aktualisieren (Upsert per Clerk-Nutzer)',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CompanyInput' } } } },
        responses: {
          201: { description: 'Angelegt/aktualisiert', content: { 'application/json': { schema: { $ref: '#/components/schemas/Company' } } } },
          400: { description: 'Validierungsfehler', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Nicht authentifiziert' },
        },
      },
    },
    '/companies/{id}': {
      get: {
        summary: 'Unternehmen abrufen (nur eigenes)',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Company' } } } },
          400: { description: 'Ungültige ID' },
          401: { description: 'Nicht authentifiziert' },
          404: { description: 'Nicht gefunden oder kein Zugriff' },
        },
      },
      put: {
        summary: 'Unternehmen aktualisieren (nur eigenes, Ownership-geprüft)',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CompanyInput' } } } },
        responses: {
          200: { description: 'Aktualisiert', content: { 'application/json': { schema: { $ref: '#/components/schemas/Company' } } } },
          400: { description: 'Ungültige ID oder Validierungsfehler' },
          401: { description: 'Nicht authentifiziert' },
          403: { description: 'Gehört einem anderen Nutzer' },
          404: { description: 'Nicht gefunden' },
        },
      },
    },
    '/match/{companyId}/fundings': {
      get: {
        summary: 'Passende Förderprogramme, nach Relevanz-Score sortiert',
        parameters: [
          { name: 'companyId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 50, maximum: 100 } },
          { name: 'minScore', in: 'query', schema: { type: 'integer', default: 1, maximum: 100 } },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { total: { type: 'integer' }, items: { type: 'array', items: { $ref: '#/components/schemas/Funding' } } } },
              },
            },
          },
          401: { description: 'Nicht authentifiziert' },
          403: { description: 'Gehört einem anderen Nutzer' },
          404: { description: 'Unternehmen nicht gefunden' },
        },
      },
    },
    '/match/{companyId}/regulations': {
      get: {
        summary: 'Anwendbare Regulierungen mit Status',
        parameters: [{ name: 'companyId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    total_relevant: { type: 'integer' },
                    erledigt: { type: 'integer' },
                    offen: { type: 'integer' },
                    items: { type: 'array', items: { $ref: '#/components/schemas/Regulation' } },
                    nicht_relevant_ids: { type: 'array', items: { type: 'string' } },
                  },
                },
              },
            },
          },
          401: { description: 'Nicht authentifiziert' },
          403: { description: 'Gehört einem anderen Nutzer' },
        },
      },
    },
    '/match/{companyId}/regulations/{regulationId}': {
      patch: {
        summary: 'Status einer Regulierung setzen (offen/erledigt/nicht_relevant)',
        parameters: [
          { name: 'companyId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
          { name: 'regulationId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', required: ['status'], properties: { status: { type: 'string', enum: ['offen', 'erledigt', 'nicht_relevant'] } } } } },
        },
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { type: 'object', properties: { ok: { type: 'boolean' } } } } } },
          400: { description: 'Ungültiger Status' },
          401: { description: 'Nicht authentifiziert' },
          403: { description: 'Gehört einem anderen Nutzer' },
        },
      },
    },
    '/match/{companyId}/summary': {
      get: {
        summary: 'Dashboard-Zusammenfassung (Zähler für Regulierungen/Förderungen)',
        parameters: [{ name: 'companyId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: {
          200: { description: 'OK' },
          401: { description: 'Nicht authentifiziert' },
          403: { description: 'Gehört einem anderen Nutzer' },
        },
      },
    },
    '/ai/documents': {
      post: {
        summary: 'KI-gestützte Dokumentgenerierung (Datenschutzerklärung, Impressum, ...)',
        description:
          'Ruft die Anthropic-API serverseitig auf, der API-Key verlässt nie ' +
          'das Backend. Streng rate-limitiert (10 Anfragen/Stunde/IP), da ' +
          'jeder Aufruf Kosten verursacht.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['typ', 'profil'],
                properties: {
                  typ: { type: 'string', enum: ['datenschutzerklaerung', 'impressum', 'arbeitszeitnachweis', 'arbeitsschutz-unterweisung'] },
                  profil: { $ref: '#/components/schemas/CompanyInput' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Generiertes Dokument', content: { 'application/json': { schema: { type: 'object', properties: { content: { type: 'string' }, typ: { type: 'string' }, generated_at: { type: 'string', format: 'date-time' } } } } } },
          400: { description: 'Validierungsfehler' },
          401: { description: 'Nicht authentifiziert' },
          429: { description: 'Rate-Limit erreicht (10/Stunde)' },
          503: { description: 'ANTHROPIC_API_KEY nicht konfiguriert' },
        },
      },
    },
    '/user/export': {
      get: {
        summary: 'Alle gespeicherten Daten als JSON exportieren (Art. 20 DSGVO)',
        responses: {
          200: { description: 'Export-Datei', content: { 'application/json': { schema: { type: 'object' } } } },
          401: { description: 'Nicht authentifiziert' },
        },
      },
    },
    '/user/account': {
      delete: {
        summary: 'Konto und alle zugehörigen Daten unwiderruflich löschen (Art. 17 DSGVO)',
        responses: {
          200: { description: 'Gelöscht', content: { 'application/json': { schema: { type: 'object', properties: { ok: { type: 'boolean' } } } } } },
          401: { description: 'Nicht authentifiziert' },
        },
      },
    },
  },
} as const
