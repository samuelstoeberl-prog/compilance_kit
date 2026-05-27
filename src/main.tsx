import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { deDE } from '@clerk/localizations'
import { ProfilProvider } from './context/ProfilContext'
import './index.css'
import App from './App.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY.includes('DEIN_KEY')) {
  throw new Error(
    '⚠️  VITE_CLERK_PUBLISHABLE_KEY fehlt in .env\n' +
    'Erstelle einen Key auf https://clerk.com und trage ihn in .env ein.'
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      localization={deDE}
      afterSignOutUrl="/login"
    >
      <BrowserRouter>
        <ProfilProvider>
          <App />
        </ProfilProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
