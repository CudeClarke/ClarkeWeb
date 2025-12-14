import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Cabecera from './components/Cabecera.jsx'
import { Entrada } from './components/Entrada.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cabecera></Cabecera>
  </StrictMode>
)
