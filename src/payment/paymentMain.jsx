import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import CudeWrap from '../generic/components/CudeWrap.jsx'
import PaymentPage from './components/PaymentPage.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CudeWrap>
      <PaymentPage></PaymentPage>
    </CudeWrap>
  </StrictMode>
)
