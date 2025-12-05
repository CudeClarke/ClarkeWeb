import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import Cabecera from '../generic/components/Cabecera.jsx'
import EvListApp from './components/EvListApp.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cabecera></Cabecera>
    <EvListApp></EvListApp>
  </StrictMode>
)
