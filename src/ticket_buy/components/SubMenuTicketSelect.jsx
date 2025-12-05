import { useState } from "react";
import '../styles/SubMenuTicketSelect.css'
import TicketSelectionRow from "./TicketSelectionRow";
import SubTotalPrice from "./SubTotalPrice";
import CollaborationQuery from "./CollaborationQuery";
import { ClarkeButton, IS_CONFIRM } from "../../generic/components/Button.jsx";

const ticket_types = [
    {
        name: "Menú Básico",
        descrip: "Menú general",
        price: 19.99
    },
    {
        name: "Menú Vegetariano",
        descrip: "Menú adaptado para personas vegetarianas",
        price: 22.99
    },
    {
        name: "Menú Celíaco",
        descrip: "Menú adaptado para personas celíacas",
        price: 24.99
    }
]


function selectedTicketsEmpty(list){
    return list.reduce((a,b)=> a+b) == 0;
}

function computeTotal(listSelected, ticket_list){
    let total = 0;
    for(let i = 0; i<listSelected.length; i++){
        total = total + listSelected[i]*ticket_list[i].price
    }
    return Math.round(total*100) / 100;
}

function SubMenuTicketSelect(){

    const [selectedTickets, setSelectedTickets] = useState(Array(ticket_types.length).fill(0))


    return (<div className="sub-menu-ticket-select-container">
        <div className="sub-menu-ticket-select-tickets">
            {
                ticket_types.map( (ticket, index) => {
                    return (<TicketSelectionRow 
                        name={ticket.name} 
                        descrip={ticket.descrip} 
                        price={ticket.price} 
                        currentAmount={selectedTickets[index]}
                        setAmount={ 
                            (n) => {

                                let newSelectedTickets = [...selectedTickets]
                                newSelectedTickets[index] = n
                                setSelectedTickets(newSelectedTickets)

                            }
                        }
                        ></TicketSelectionRow>)
                } )
            }
        </div>

        <hr/>

        <div className="sub-menu-ticket-select-collaborate">
            <CollaborationQuery></CollaborationQuery>
        </div>

        <hr/>

        <div className="sub-menu-ticket-select-subtotals">

            {
                selectedTicketsEmpty(selectedTickets) ? 
                    <></>
                :
                    <>
                    {selectedTickets.map((value, index)=>{

                        if(value === 0) return;

                        const name = ticket_types[index].name + " x " + value;
                        const price = ticket_types[index].price*value;
                        return <SubTotalPrice name={name} total={Math.round(price*100)/100}></SubTotalPrice>

                    })}

                        <hr/>
                        <SubTotalPrice name={"Total"} total={computeTotal(selectedTickets, ticket_types)}></SubTotalPrice>


                    </>
            }
        </div>

        <div title={selectedTicketsEmpty(selectedTickets)? "Selecciona entradas para continuar": "" } className={"sub-menu-ticket-select-button-area" +  (selectedTicketsEmpty(selectedTickets) ? " sub-menu-ticket-select-button-area-unactive" : "")}>
            <ClarkeButton text={"Continuar"} type={IS_CONFIRM} size={"1em"}></ClarkeButton>
        </div>
        
    </div>)
}

export default SubMenuTicketSelect;