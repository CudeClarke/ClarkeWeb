import { useState } from "react";
import { Entrada } from "./Entrada";
import '../styles/TicketPage.css';
import entradas from '../assets/test.json';
import { ClarkeButton } from "../../generic/components/Button";
import descargar from "../assets/descargar.png"
function TicketPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevEntry = () => {
    setCurrentIndex((prev) => (prev === 0 ? entradas.length - 1 : prev - 1));
  };

  const nextEntry = () => {
    setCurrentIndex((prev) => (prev === entradas.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="Body">
      <div className="texto">
        <h1>¡Entrada(s) comprada(s) con exito!</h1>
      </div>
      <div className="boton">
        <ClarkeButton type={0} text={"Descargar aquí!!"}></ClarkeButton>
        <img src={descargar} alt="" />
      </div>
      <div className="carousel">
        <button className="arrow left" onClick={prevEntry}>{"<"}</button>
        <Entrada
          key={entradas[currentIndex].idEntrada}
          nombreEvento={entradas[currentIndex].nombreEvento}
          imagen={entradas[currentIndex].imagen}
          propietarioNombre={entradas[currentIndex].propietarioNombre}
          propietarioApellidos={entradas[currentIndex].propietarioApellidos}
          qr={entradas[currentIndex].qr}
          extraInfo={entradas[currentIndex].extraInfo}
          idEntrada={entradas[currentIndex].idEntrada}
        />
        <button className="arrow right" onClick={nextEntry}>{">"}</button>
      </div>

      <div className="boton2">
        <ClarkeButton type={2} text={"Seguir viendo eventos"}></ClarkeButton>
      </div>
    </div>
  );
}

export { TicketPage };
