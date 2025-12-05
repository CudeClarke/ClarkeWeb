import { useState } from 'react';
import { ClarkeButton, IS_CONFIRM, IS_RETURN } from '../../generic/components/Button';
import '../styles/SubMenuGuestData.css'
import GuestForm from './GuestForm';

const selected_tickets_prueba = [
    {
        name: "Menú Vegano",
        id: 1234
    },
    {
        name: "Menú Vegano",
        id: 2345
    },
    {
        name: "Menú Normal",
        id: 5678
    }
]

function generateGuestForms(selected_tickets, data, setData){

    return (selected_tickets.map((ticket, ind)=>{
        return(<div key={ticket.id + ind} className='sub-menu-guest-data-ticket'>
            <h1>{"Datos asistente "+(ind+1)+" ("+ticket.name+")"}</h1>
            <GuestForm 
                data={data[ind]} 
                setData={(d)=>{
                    const newData = [...data];
                    newData[ind] = d
                    setData(newData)
                }}
            ></GuestForm>
        </div>)
    }))
}

const buyer_info_prueba = {
    name: "Abel", surname: "Fernández Palomo", email: "fernandezpalomoabel@uma.es", dni: "77684813J"
}

function SubMenuGuestData({selected_tickets, buyer_info}){

    const [data, setData] = useState(selected_tickets_prueba.map((_)=>{return {name: "", surname: "", email: "", dni: ""}}))

    return <div className='sub-menu-guest-data-wrap'>

        <ClarkeButton 
            text={"COPIAR DATOS DEL COMPRADOR"} 
            type={IS_CONFIRM} 
            size={"1.5em"} 
            click_effect={()=>{
                const newData = Array(selected_tickets_prueba.length).fill(buyer_info_prueba);
                setData(newData)
            }}
        ></ClarkeButton>

        {   
            generateGuestForms(selected_tickets_prueba, data, setData)
        }

         <div className='sub-menu-guest-data-buttons'>
            <ClarkeButton text={"Volver"} type={IS_RETURN} size={"1em"}></ClarkeButton>
            <ClarkeButton 
                text={"Continuar"} 
                type={IS_CONFIRM} 
                size={"1em"} 
                click_effect={()=>{console.log(data)}} //this function is for testing. TODO checking fields and sending them to server
            ></ClarkeButton>
         </div>
    </div>
}

export default SubMenuGuestData;