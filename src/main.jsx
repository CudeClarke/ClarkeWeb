import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CudeWrap from './generic/components/CudeWrap'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CudeWrap></CudeWrap>
  </StrictMode>
)
