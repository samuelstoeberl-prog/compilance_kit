import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { deDE } from '@clerk/localizations'
import { HelmetProvider } from 'react-helmet-async'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/600.css'
import '@fontsource/dm-serif-display/400.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import { ProfilProvider } from './context/ProfilContext'
import './index.css'
import App from './App.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY.includes('DEIN_KEY')) {
  document.getElementById('root')!.innerHTML =
    '<div style="font-family:sans-serif;padding:2rem;color:#dc2626">' +
    '<h2>Konfigurationsfehler</h2>' +
    '<p>VITE_CLERK_PUBLISHABLE_KEY fehlt in den Environment Variables.</p>' +
    '</div>'
  throw new Error('VITE_CLERK_PUBLISHABLE_KEY not configured')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        localization={deDE}
        afterSignInUrl="/"
        afterSignOutUrl="/login"
      >
        <BrowserRouter>
          <ProfilProvider>
            <App />
          </ProfilProvider>
        </BrowserRouter>
      </ClerkProvider>
    </HelmetProvider>
  </StrictMode>,
)
