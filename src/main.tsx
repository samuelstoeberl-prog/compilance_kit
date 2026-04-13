import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ProfilProvider } from './context/ProfilContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ProfilProvider>
        <App />
      </ProfilProvider>
    </BrowserRouter>
  </StrictMode>,
)
