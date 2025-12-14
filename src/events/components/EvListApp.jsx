
import { EventoList } from './EventoList.jsx'
import Evento from './Evento.jsx'
import { ExpandedEvent } from './ExpandedEvent.jsx'
import { useEffect, useState } from 'react';
import {PopUp} from '/src/generic/components/PopUp.jsx'
import { fetchEvents } from '../utils/api/api_functions.js';
import '../styles/EvListApp.css'
function EvListApp(){

    const [eventList, setEventList] = useState([]);

    const [searchValue, setSearchValue] = useState('');

    useEffect(()=>{
        const fn = async ()=>{
            setEventList(await fetchEvents());
        }
        fn();
    }, []);

    const [selected, setSelected] = useState(null)

    const images_url = (import.meta.env.VITE_IS_API_LOCAL == "no" ? `http://${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/` : "/")

    return (
        <>
            <div className='event-list-filter-section'>
                <h1>PRÓXIMOS EVENTOS</h1>
                <div className='event-list-search-box'>
                    <svg viewBox='0 0 512 512'>
                        <path fill="#0fab13" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                    </svg>
                    <input type="text" placeholder="Búsqueda" onChange={(e)=>{
                        setSearchValue(e.target.value.toLocaleLowerCase());
                    }}/>
                </div> 
            </div>
            

            <EventoList>

                {

                    eventList.filter(evento=>{
                        return(    
                            evento.name.toLocaleLowerCase().includes(searchValue) || 
                            evento.location.toLocaleLowerCase().includes(searchValue) ||
                            (evento.tag_list.length != 0 && evento.tag_list.some((tag)=>tag.toLocaleLowerCase().includes(searchValue)))
                        )
                    }).map((evento)=>{
                        return <Evento 
                                    key={evento.evid+evento.entid+evento.name}
                                    title={evento.name} 
                                    location={evento.location} 
                                    date={evento.date} 
                                    imageUrl={images_url+evento.img} 
                                    more_info_click_effect={
                                        () => {
                                            setSelected(evento)
                                        }
                                    }
                                    buy_tickets_click_effect={
                                        ()=>{
                                            window.location.href = ("/ticket_buy/?eventId="+evento.evid)
                                        }
                                    }
                                    ></Evento>
                    })

                }
                
            </EventoList>
            
            {
                selected != null ?
                    <PopUp>
                        <ExpandedEvent 
                            id = {selected.evid}
                            name={selected.name} 
                            location={selected.location} 
                            date={selected.date}
                            imageUrl={images_url+selected.img}
                            descrip={selected.description}
                            tag_list={selected.tag_list}
                            objective_recaudation={selected.objective_recaudation}
                            actual_recaudation={selected.actual_recaudation}
                            close_action={()=>setSelected(null)}
                        ></ExpandedEvent>
                    </PopUp>
                    :
                    <></>
            }
  
        </>
      
    )
}

export default EvListApp;