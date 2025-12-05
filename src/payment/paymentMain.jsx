import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import Cabecera from '../generic/components/Cabecera.jsx'
import PaymentPage from './components/PaymentPage.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cabecera></Cabecera>
    <PaymentPage></PaymentPage>
  </StrictMode>
)
