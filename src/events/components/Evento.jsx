

import '../styles/Evento.css'
import mapIcon from '/map-icon.svg'
import calendarIcon from '/calendar-icon.svg'
import { ClarkeButton, IS_CONFIRM, IS_MOREINFO, IS_RETURN } from '/src/generic/components/Button.jsx';
function Evento({title, location, date, imageUrl, buy_tickets_click_effect, more_info_click_effect}){

    return (
        <>
            <div className='event-div'>
                <div className='event-div-img-wrap'>
                    <img className='event-div-img' src={imageUrl}></img>
                </div>
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
                        <ClarkeButton text={"Comprar Tickets"} type={IS_CONFIRM} size={"5cqw"} click_effect={buy_tickets_click_effect}></ClarkeButton>
                        <ClarkeButton text={"Leer más"} type={IS_RETURN} size={"5cqw"} click_effect={more_info_click_effect}></ClarkeButton>
                    </div>
                </div>
            </div>
        </>

    );

}

export default Evento;