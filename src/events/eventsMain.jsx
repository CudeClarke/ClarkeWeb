import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import CudeWrap from '../generic/components/CudeWrap.jsx'
import EvListApp from './components/EvListApp.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CudeWrap>
      <EvListApp></EvListApp>
    </CudeWrap>
  </StrictMode>
)
