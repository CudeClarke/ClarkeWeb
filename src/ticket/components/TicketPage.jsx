import { useEffect, useState } from "react";
import { Entrada } from "./Entrada";
import '../styles/TicketPage.css';
import { ClarkeButton } from "../../generic/components/Button";
import descargar from "../assets/descargar.png"
import { getTicketsFromIds } from "../utils/api/api_functions";

function TicketPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [entradas, setEntradas] = useState(null);

  useEffect(()=>{
    const fn = async()=>{
      const url = new URL(window.location.href);
      const idlist = url.searchParams.get("id").split(",");
      setEntradas(await getTicketsFromIds(idlist));
    }
    fn();
  }, [])

  const prevEntry = () => {
    setCurrentIndex(((currentIndex-1+entradas.length)%entradas.length));
  };

  const nextEntry = () => {
    setCurrentIndex(((currentIndex+1)%entradas.length));
  };
  if(entradas){
      return (
        <div className="Body">
          <div className="texto">
            <h1>¡Entrada(s) comprada(s) con exito!</h1>
          </div>
          <div className="boton">
            <p>{"Descargar aquí"}</p>
            <div className="boton-img-wrap">
              <img src={descargar} alt="descargar" />
            </div>
          </div>
          <div className="carousel">
            <div className="arrow left" onClick={prevEntry}><p>{"<"}</p></div>
            <Entrada
              key={entradas[currentIndex].idEntrada}
              nombreEvento={entradas[currentIndex].nombreEvento}
              imagen={entradas[currentIndex].imagen}
              propietarioNombre={entradas[currentIndex].propietarioNombre}
              extraInfo={entradas[currentIndex].extraInfo}
              idEntrada={entradas[currentIndex].idEntrada}
              patros={entradas[currentIndex].patros}
            />
            <div className="arrow right" onClick={nextEntry}><p>{">"}</p></div>
          </div>

          <div className="boton2">
            <a href="/">
              <ClarkeButton type={2} text={"Seguir viendo eventos"} size={"1em"}></ClarkeButton>
            </a>
          </div>
        </div>
      );
    }else{
      return <></>
    }
}

export { TicketPage };
