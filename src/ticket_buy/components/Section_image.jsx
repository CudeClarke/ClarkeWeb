import "../styles/Section_image.css"
import mapIcon from '/map-icon.svg'
import calendarIcon from '/calendar-icon.svg'

function Section_image({nombre, ubicacion, fecha, imageUrl}){

    return (
        <div className="div-section">
            <div className="div-section_image">
                <img className="img-first" src={imageUrl} alt={"imagen de "+nombre}></img>
            </div>   
            <div className="div-info">
                <p className="text-nombre"><strong>{nombre.toUpperCase()}</strong></p>
                <div className="div-ubic">
                    <img className="img-map" src={mapIcon} alt="icono mapa"></img>
                    <p className="text-ubic"><strong>{ubicacion}</strong></p>
                </div>
                <div className="div-ubic">
                    <img className="img-calendar" src={calendarIcon} alt="icono calendario"></img>
                    <p className="text-fecha"><strong>{fecha}</strong></p>
                </div>
            </div>  
        </div>  
    )
}

export default Section_image;