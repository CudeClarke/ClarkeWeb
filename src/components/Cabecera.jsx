


import "../styles/Cabecera.css"
import Flor from "../images/Flor.png"
import Logo from "../images/Logo.png"
import { ClarkeButton, IS_HEADER} from './Button';

function Cabecera(){

    return (
        <div className="div-cabecera">
            <img className="img-logo" src={Logo}></img>
            <img className="img-flor" src={Flor}></img>
            <div className="div-button">
                <ClarkeButton text={"Inicio"} style={IS_HEADER} size={".8em"}></ClarkeButton>
                <ClarkeButton text={"Evento"} style={IS_HEADER} size={".8em"}></ClarkeButton>
            </div>
        </div>
        
    )
}

export default Cabecera;