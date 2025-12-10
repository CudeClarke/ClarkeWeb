import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import EventCreateApp from './components/EventCreateApp.jsx'
import CudeWrap from '../generic/components/CudeWrap.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CudeWrap>
      <EventCreateApp></EventCreateApp>
    </CudeWrap>
  </StrictMode>
)