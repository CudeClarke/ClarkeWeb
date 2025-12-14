import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CudeWrap from './generic/components/CudeWrap'
import banner from './generic/assets/banner.jpg'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CudeWrap>
      <img src={banner} style={{width: "100vw"}}></img>
    </CudeWrap>
  </StrictMode>
)
