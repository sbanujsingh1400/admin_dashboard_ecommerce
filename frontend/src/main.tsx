import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/tailwind.css'
import './styles/App.scss'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store} >
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
