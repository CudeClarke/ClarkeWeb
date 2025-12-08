import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import TicketBuyApp from './components/TicketBuyApp.jsx'
import CudeWrap from '../generic/components/CudeWrap.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <CudeWrap>
      <TicketBuyApp></TicketBuyApp>
    </CudeWrap>
  </StrictMode>
)