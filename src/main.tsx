import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app/App'
import '@/styles/index.css'
import 'lenis/dist/lenis.css'
import { loadDeferredAnalytics } from '@/lib/analytics'

loadDeferredAnalytics(import.meta.env.VITE_ANALYTICS_SCRIPT_URL)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
