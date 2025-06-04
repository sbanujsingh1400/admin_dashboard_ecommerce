import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/tailwind.css'
import './styles/App.scss'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
