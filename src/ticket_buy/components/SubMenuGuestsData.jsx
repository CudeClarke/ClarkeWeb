import { useState } from 'react';
import { ClarkeButton, IS_CONFIRM, IS_RETURN } from '../../generic/components/Button';
import '../styles/SubMenuGuestData.css'
import GuestForm from './GuestForm';

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

function SubMenuGuestData({selected_tickets, buyer_info, handleConfirm, handleReturn}){

    const [data, setData] = useState(selected_tickets.map((_)=>{return {name: "", surname: "", email: "", dni: "", consent: true}}))

    return <div className='sub-menu-guest-data-wrap'>

        <ClarkeButton 
            text={"COPIAR DATOS DEL COMPRADOR"} 
            type={IS_CONFIRM} 
            size={"1.5em"} 
            click_effect={()=>{
                const newData = Array(selected_tickets.length).fill(buyer_info);
                setData(newData)
            }}
        ></ClarkeButton>

        {   
            generateGuestForms(selected_tickets, data, setData)
        }

         <div className='sub-menu-guest-data-buttons'>
            <ClarkeButton text={"Volver"} type={IS_RETURN} size={"1em"} click_effect={()=>handleReturn()}></ClarkeButton>
            <ClarkeButton 
                text={"Finalizar"} 
                type={IS_CONFIRM} 
                size={"1em"} 
                click_effect={()=>handleConfirm(data)} //this function is for testing. TODO checking fields and sending them to server
            ></ClarkeButton>
         </div>
    </div>
}

export default SubMenuGuestData;