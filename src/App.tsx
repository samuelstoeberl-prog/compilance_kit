import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { useProfil } from './context/ProfilContext'
import Onboarding from './pages/Onboarding'
import PreviewPage from './pages/PreviewPage'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'

function AuthLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-sand-light flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 bg-ink rounded flex items-center justify-center">
          <span className="text-sand-light text-xs font-mono font-bold">CK</span>
        </div>
        <div className="w-32 h-2 bg-sand-border rounded animate-pulse mt-2" />
      </div>
    </div>
  )
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth()
  if (!isLoaded) return <AuthLoadingSkeleton />
  if (!isSignedIn) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  const { profil, isLoadingProfil } = useProfil()
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded || isLoadingProfil) return <AuthLoadingSkeleton />

  return (
    <Routes>
      {/* Root: eingeloggt → Dashboard, sonst → Onboarding */}
      <Route
        path="/"
        element={
          isSignedIn
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/onboarding" replace />
        }
      />

      {/* Onboarding: öffentlich – kein Login nötig */}
      <Route
        path="/onboarding"
        element={
          isSignedIn && profil
            ? <Navigate to="/dashboard" replace />
            : <Onboarding />
        }
      />

      {/* Preview: öffentlich – zeigt Ergebnisse vor dem Login */}
      <Route
        path="/preview"
        element={
          isSignedIn
            ? <Navigate to="/dashboard" replace />
            : <PreviewPage />
        }
      />

      {/* Login: eingeloggte Nutzer weiterleiten */}
      <Route
        path="/login"
        element={
          isSignedIn
            ? <Navigate to="/dashboard" replace />
            : <LoginPage />
        }
      />

      {/* Dashboard: nur für eingeloggte Nutzer */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      {/* Öffentliche Seiten */}
      <Route path="/impressum"   element={<Impressum />} />
      <Route path="/datenschutz" element={<Datenschutz />} />
    </Routes>
  )
}
