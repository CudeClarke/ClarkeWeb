

import '../styles/Evento.css'
import mapIcon from '/map-icon.svg'
import calendarIcon from '/calendar-icon.svg'

function Evento({title, location, date, imageUrl}){

    return (
        <>
            <div className='event-div'>
                <img className='event-div-img' src={imageUrl}></img>
                <div className='event-div-content'>
                    <h1 className='event-div-content-title'>{title.toUpperCase()}</h1>
                    <div className='event-div-content-info-div'>
                        <img src={mapIcon} className='event-div-icon'></img>
                        <p>{location}</p>
                    </div>
                    <div className='event-div-content-info-div'>
                        <img src={calendarIcon} className='event-div-icon'></img>
                        <p>{date}</p>
                    </div>

                    <div className='event-div-content-buttons-area'>
                        <button className='button confirm-button'>Comprar Tickets</button>
                        <button className='button more-info-button'>Leer más</button>
                    </div>
                </div>
            </div>
        </>

    );

}

export default Evento;