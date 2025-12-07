import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import Cabecera from '../generic/components/Cabecera.jsx'
import TicketBuyApp from './components/TicketBuyApp.jsx'
import Footer from '../generic/components/Footer.jsx'
import Section_image from './components/Section_image.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cabecera></Cabecera>
    <div style={{
        backgroundImage: "url('https://design.penpot.app/assets/by-file-media-id/8fd8c29f-33f9-8038-8007-2123360d1547')", 
        width: "80%", 
        margin: "auto",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        boxShadow: "0px 2px 2px 2px grey"
    }}>

    
      <div style={
        {
          display: 'flex',
          alignItems: "center",
          backdropFilter: "blur(8px)"
        }
        }>
        <TicketBuyApp></TicketBuyApp>
        <Section_image nombre={"Evento ejemplo"} ubicacion={"Torremolinos"} fecha={"5 de Diciembre"} imageUrl={"https://design.penpot.app/assets/by-file-media-id/8fd8c29f-33f9-8038-8007-2123360d1547"}></Section_image>
      </div>
    </div>
    <Footer></Footer>
  </StrictMode>
)