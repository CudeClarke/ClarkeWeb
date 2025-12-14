


import "../styles/Cabecera.css"
import Flor from "../assets/Flor.png"
import Logo from "../assets/Logo.png"
import { ClarkeButton, IS_HEADER } from './Button.jsx';

function Cabecera(){

    return (
        <div className="div-cabecera">
            <img className="img-logo" src={Logo} alt="logo cudeca"></img>
            <img className="img-flor" src={Flor} alt="logo flor cudeca"></img>
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