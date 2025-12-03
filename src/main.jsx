import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Cabecera from './components/Cabecera.jsx'
import Section_image from './components/Section_image.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cabecera></Cabecera>
    <Section_image nombre={"Hola"} ubicacion={"ETSI"} fecha={"7Nov"} url_first={""} url_back={""}></Section_image>
  </StrictMode>
)
