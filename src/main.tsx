import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from './appcontext';
import { HelmetProvider } from "react-helmet-async";
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <HelmetProvider>
         <App />
      </HelmetProvider>
    </AppProvider>

  </StrictMode>,
)
