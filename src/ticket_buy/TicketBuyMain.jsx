import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import Cabecera from '../generic/components/Cabecera.jsx'
import TicketBuyApp from './components/TicketBuyApp.jsx'
import Footer from '../generic/components/Footer.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cabecera></Cabecera>
    <TicketBuyApp></TicketBuyApp>
    <Footer></Footer>
  </StrictMode>
)