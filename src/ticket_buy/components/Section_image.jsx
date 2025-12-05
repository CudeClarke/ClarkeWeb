import "../styles/Section_image.css"
import mapIcon from '/map-icon.svg'
import calendarIcon from '/calendar-icon.svg'

function Section_image({nombre, ubicacion, fecha, imageUrl}){

    return (
        <div className="div-section">
            <div className="div-section_image">
                <img className="img-first" src={imageUrl}></img>
            </div>   
            <div className="div-info">
                <text className="text-nombre"><strong>{nombre.toUpperCase()}</strong></text>
                <div className="div-ubic">
                    <img className="img-map" src={mapIcon}></img>
                    <text className="text-ubic"><strong>{ubicacion}</strong></text>
                </div>
                <div className="div-ubic">
                    <img className="img-calendar" src={calendarIcon}></img>
                    <text className="text-fecha"><strong>{fecha}</strong></text>
                </div>
            </div>  
        </div>  
    )
}

export default Section_image;