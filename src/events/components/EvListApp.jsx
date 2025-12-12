
import { EventoList } from './EventoList.jsx'
import Evento from './Evento.jsx'
import { ExpandedEvent } from './ExpandedEvent.jsx'
import { useEffect, useState } from 'react';
import {PopUp} from '/src/generic/components/PopUp.jsx'
import { fetchEvents } from '../utils/api/api_functions.js';

function EvListApp(){

    const [eventList, setEventList] = useState([]);

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

            <EventoList>

                {

                    eventList.map((evento)=>{
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