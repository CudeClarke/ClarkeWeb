import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import TicketBuyApp from './components/TicketBuyApp.jsx'
import CudeWrap from '../generic/components/CudeWrap.jsx'

const url = new URL(window.location.href);

const event_id = url.searchParams.get("eventId");


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CudeWrap>
      <TicketBuyApp event_id={event_id}></TicketBuyApp>
    </CudeWrap>
  </StrictMode>
)