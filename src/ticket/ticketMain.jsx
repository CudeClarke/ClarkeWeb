import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import CudeWrap from '../generic/components/CudeWrap.jsx'
import { TicketPage } from './components/TicketPage.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CudeWrap>
      <TicketPage>
      </TicketPage>
    </CudeWrap>
  </StrictMode>
)