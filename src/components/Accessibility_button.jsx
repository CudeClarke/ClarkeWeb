


import "../styles/Accessibility_button.css"
import Access_on from "../images/Access_on.png"
import Access_off from "../images/Access_off.jpg"
const IS_ON = 0, IS_OFF = 1;


function Accessibility_button({type}){
    return type === IS_ON ? (
        <img className="on-access" src={Access_on} alt="Accesibilidad Activada" />
    ) : (
        <img className="off-access" src={Access_off} alt="Accesibilidad Desactivada" />
    );
}

export { Accessibility_button, IS_ON, IS_OFF };