import '../styles/EventDataResume.css'
function EventDataResume({event_data}){
    return <div className="event-data-resume">       
                <p><strong>Nombre:</strong> {event_data.details.nombre}</p>
                <p><strong>Ubicación:</strong>  {event_data.details.ubicacion}</p>
                <p><strong>Objetivo:</strong>  {event_data.details.objetivoRecaudacion}€</p>
                <p><strong>Descripción:</strong>  {event_data.details.descripcion}</p>
                <p><strong>Fecha:</strong>  {event_data.details.date}</p>
                <p><strong>Tags:</strong>  {event_data.details.tags}</p>
                <p><strong>Entradas:</strong></p>  
                {event_data.details.entradas.map(entrada=>{
                    return (
                        <div key={entrada.id} className="event-data-resume-ticket">
                            <h3>{entrada.nombre}</h3>
                            <p><strong>Cantidad:</strong>  {entrada.subAforo}</p>
                            <p><strong>Precio:</strong>  {entrada.precio}</p>
                            <p><strong>Descripcion:</strong>  {entrada.descripcion}</p>
                        </div>
                    )
                })}                
        
    </div>
}

export default EventDataResume;