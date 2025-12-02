import "../styles/Section_image.css"
import Flor from "../images/Flor.png"
import Logo from "../images/Logo.png"
import mapIcon from '/map-icon.svg'
import calendarIcon from '/calendar-icon.svg'
import { ClarkeButton, IS_HEADER} from './Button.jsx';

function Section_image({nombre, ubicacion, fecha, url_first, url_back}){

    return (
        <div className="div-section">
            <div className="div-section_image">
                <img className="img-first" src={url_first}></img>
                <img className="img-back" src={url_back}></img>
            </div>   
            <div className="div-info">
                <text className="text-nombre"><strong>{nombre}</strong></text>
                <div className="div-ubic">
                    <img className="img-map" src={mapIcon}></img>
                    <text className="text-ubic"><strong>{ubicacion}</strong></text>
                </div>
                <div className="div-fecha">
                    <img className="img-calendar" src={calendarIcon}></img>
                    <text className="text-fecha"><strong>{fecha}</strong></text>
                </div>
            </div>  
        </div>  
    )
}

export default Section_image;