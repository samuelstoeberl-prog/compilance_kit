import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { useProfil } from './context/ProfilContext'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'

// ── Ladescreen während Clerk die Session prüft ────────────────────────────────

function AuthLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" />
        <div className="w-40 h-3 bg-slate-200 rounded animate-pulse" />
        <div className="w-24 h-2 bg-slate-100 rounded animate-pulse" />
      </div>
    </div>
  )
}

// ── Geschützte Route – leitet nicht eingeloggte Nutzer zum Login ──────────────

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) return <AuthLoadingSkeleton />
  if (!isSignedIn) return <Navigate to="/login" replace />
  return <>{children}</>
}

// ── App-Router ────────────────────────────────────────────────────────────────

export default function App() {
  const { profil } = useProfil()
  const { isSignedIn, isLoaded } = useAuth()

  return (
    <Routes>
      {/* Login – eingeloggte Nutzer werden sofort weitergeleitet */}
      <Route
        path="/login"
        element={
          !isLoaded
            ? <AuthLoadingSkeleton />
            : isSignedIn
              ? <Navigate to={profil ? '/dashboard' : '/onboarding'} replace />
              : <LoginPage />
        }
      />

      {/* Root – leitet je nach State weiter */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigate to={profil ? '/dashboard' : '/onboarding'} replace />
          </ProtectedRoute>
        }
      />

      {/* Geschützte Seiten */}
      <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
      <Route path="/dashboard"  element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      {/* Öffentliche Seiten */}
      <Route path="/impressum"   element={<Impressum />} />
      <Route path="/datenschutz" element={<Datenschutz />} />
    </Routes>
  )
}
