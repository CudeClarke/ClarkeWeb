import { Entrada } from "./Entrada";
import '../styles/TicketPage.css';
import entradas from '../assets/test.json';
import { ClarkeButton } from "../../generic/components/Button";
import descargar from '../assets/descargar.png'
function TicketPage(){
  return <div className="Body">
      <div className="texto">
        <h1>{"¡Entrada(s) comprada(s) con exito!"}</h1>
        
      </div>
      <div className="boton">
        <ClarkeButton type={0} text={"Descargar aquí!!"}></ClarkeButton>
        <img src={descargar} alt="" />
      </div>
      <div className="listaEntradas">
        
        {entradas.map((entrada) => (
          <Entrada
            key={entrada.idEntrada}
            nombreEvento={entrada.nombreEvento}
            imagen={entrada.imagen}
            propietarioNombre={entrada.propietarioNombre}
            propietarioApellidos={entrada.propietarioApellidos}
            qr={entrada.qr}
            extraInfo={entrada.extraInfo}
            idEntrada={entrada.idEntrada}
          />
        ))}
      </div>
      <div className="boton2">
        <ClarkeButton type={2} text={"Seguir viendo eventos"}></ClarkeButton>
      </div>
    </div>

}

export {TicketPage};