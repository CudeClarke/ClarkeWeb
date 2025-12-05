import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Cabecera from './generic/components/Cabecera.jsx'
import TicketBuyDeploy from './ticket_buy/components/TicketBuyDeploy.jsx'
import SubMenuTicketSelect from './ticket_buy/components/SubMenuTicketSelect.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cabecera></Cabecera>
    <TicketBuyDeploy name={"Seleccionar entrada"}>
      <SubMenuTicketSelect></SubMenuTicketSelect>
    </TicketBuyDeploy>
  </StrictMode>
)
