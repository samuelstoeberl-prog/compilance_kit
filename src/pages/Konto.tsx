import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useClerk } from '@clerk/clerk-react'
import Seo from '../components/Seo'
import { exportMyData, deleteMyAccount } from '../api/client'

export default function Konto() {
  const navigate = useNavigate()
  const { signOut } = useClerk()
  const [exporting, setExporting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleExport = async () => {
    setError(null)
    setExporting(true)
    try {
      const data = await exportMyData()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'compliancekit-export.json'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export fehlgeschlagen')
    } finally {
      setExporting(false)
    }
  }

  const handleDelete = async () => {
    setError(null)
    setDeleting(true)
    try {
      await deleteMyAccount()
      await signOut()
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Löschung fehlgeschlagen')
      setDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-sand-light">
      <Seo title="Konto-Einstellungen – ComplianceKit" description="Exportieren oder löschen Sie Ihre bei ComplianceKit gespeicherten Daten." noindex />
      <header className="border-b border-sand-border bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-ink rounded flex items-center justify-center">
            <span className="text-sand-light text-xs font-mono font-bold">CK</span>
          </div>
          <span className="font-serif text-ink text-lg">ComplianceKit</span>
        </div>
        <Link to="/dashboard" className="text-sm font-mono text-muted hover:text-ink transition-colors">
          ← Dashboard
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="font-serif text-3xl text-ink mb-2">Konto-Einstellungen</h1>
        <p className="text-sm text-muted-dark font-sans mb-10">
          Verwalten Sie Ihre gespeicherten Daten gemäß Art. 17 und 20 DSGVO.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm font-sans text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <section className="bg-white border border-sand-border rounded-xl p-6">
            <h2 className="font-sans font-semibold text-ink text-sm mb-2">Daten exportieren</h2>
            <p className="text-sm font-sans text-muted-dark leading-relaxed mb-4">
              Laden Sie eine Kopie aller bei uns gespeicherten Daten (Unternehmensprofil,
              Compliance-Status, Konto-Informationen) als JSON-Datei herunter.
            </p>
            <button
              onClick={handleExport}
              disabled={exporting}
              className="bg-sand-mid border border-sand-border text-ink py-2.5 px-4 rounded-lg text-sm font-sans font-medium hover:bg-sand transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exporting ? 'Wird erstellt…' : 'Daten als JSON herunterladen'}
            </button>
          </section>

          <section className="bg-white border border-red-200 rounded-xl p-6">
            <h2 className="font-sans font-semibold text-ink text-sm mb-2">Konto löschen</h2>
            <p className="text-sm font-sans text-muted-dark leading-relaxed mb-4">
              Löscht Ihr Konto sowie alle gespeicherten Daten (Unternehmensprofil, Compliance-Status
              und Ihre Anmeldedaten) unwiderruflich. Diese Aktion kann nicht rückgängig gemacht werden.
            </p>

            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="bg-white border border-red-300 text-red-700 py-2.5 px-4 rounded-lg text-sm font-sans font-medium hover:bg-red-50 transition-colors"
              >
                Konto löschen
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-sm font-sans font-medium text-red-700">
                  Sind Sie sicher? Alle Daten werden unwiderruflich gelöscht.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="bg-white border border-sand-border text-ink py-2.5 px-4 rounded-lg text-sm font-sans hover:border-ink transition-colors"
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="bg-red-600 text-white py-2.5 px-4 rounded-lg text-sm font-sans font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleting ? 'Wird gelöscht…' : 'Endgültig löschen'}
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
