import { Routes, Route, Navigate } from 'react-router-dom'
import { useProfil } from './context/ProfilContext'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'

export default function App() {
  const { profil } = useProfil()

  return (
    <Routes>
      <Route path="/" element={profil ? <Navigate to="/dashboard" replace /> : <Onboarding />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}
