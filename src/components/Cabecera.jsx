


import "../styles/Cabecera.css"
import Flor from "../images/Flor.png"
import Logo from "../images/Logo.png"
import { ClarkeButton, IS_HEADER} from './Button.jsx';

function Cabecera(){

    return (
        <div className="div-cabecera">
            <img className="img-logo" src={Logo}></img>
            <img className="img-flor" src={Flor}></img>
            <div className="div-button">
                <a href="/">
                    <ClarkeButton text={"Inicio"} type={IS_HEADER} size={"1em"}></ClarkeButton>
                </a>
                <a href="/events/">
                    <ClarkeButton text={"Eventos"} type={IS_HEADER} size={"1em"}></ClarkeButton>
                </a>
            </div>
        </div>
        
    )
}

export default Cabecera;