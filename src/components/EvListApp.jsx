
import test from '../assets/test.json'
import { EventoList } from './EventoList.jsx'
import Evento from './Evento.jsx'
import { ExpandedEvent } from './ExpandedEvent.jsx'
import { useState } from 'react';
import {PopUp} from './PopUp.jsx'

function EvListApp(){
    const eventList = test.events;

    const [selected, setSelected] = useState(null)

    return (
        <>

            <EventoList>

                {

                    eventList.map((evento)=>{
                        return <Evento 
                                    title={evento.name} 
                                    location={evento.location} 
                                    date={evento.date} 
                                    imageUrl={evento.img} 
                                    more_info_click_effect={
                                        () => {
                                            setSelected(evento)
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
                            name={selected.name} 
                            location={selected.location} 
                            date={selected.date}
                            imageUrl={selected.img}
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