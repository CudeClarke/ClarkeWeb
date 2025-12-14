import { useState } from "react";
import '../styles/SubMenuTicketSelect.css'
import TicketSelectionRow from "./TicketSelectionRow";
import SubTotalPrice from "./SubTotalPrice";
import CollaborationQuery from "./CollaborationQuery";
import { ClarkeButton, IS_CONFIRM, IS_RETURN } from "../../generic/components/Button.jsx";
import {PopUp} from "../../generic/components/PopUp.jsx"

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

function SubMenuTicketSelect({ticket_types, handleConfirm, isAccessible}){

    const [selectedTickets, setSelectedTickets] = useState(Array(ticket_types.length).fill(0))

    const [accesibleStep, setAccessibleStep] = useState(0);

    return (<div className={"sub-menu-ticket-select-container " + (isAccessible ? "sub-menu-ticket-select-accesible" : "")}>
        <div className="sub-menu-ticket-select-tickets">
            {
                ticket_types.map( (ticket, index) => {
                    return (<TicketSelectionRow 
                        key={ticket.name+ticket.descrip}
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
        {
            !isAccessible && (
                <>
                    <div className="sub-menu-ticket-select-collaborate">
                        <CollaborationQuery></CollaborationQuery>
                    </div>

                    <hr/>
                </>
            )
        }
        

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
                        return <SubTotalPrice key={name+Math.round(price*100)/100} name={name} total={Math.round(price*100)/100}></SubTotalPrice>

                    })}

                        <hr/>
                        <SubTotalPrice name={"Total"} total={computeTotal(selectedTickets, ticket_types)}></SubTotalPrice>


                    </>
            }
        </div>

        <div title={selectedTicketsEmpty(selectedTickets)? "Selecciona entradas para continuar": "" } className={"sub-menu-ticket-select-button-area" +  (selectedTicketsEmpty(selectedTickets) ? " sub-menu-ticket-select-button-area-unactive" : "")}>
            <ClarkeButton 
                text={"Continuar"} 
                type={IS_CONFIRM} size={"1em"} 
                click_effect={
                    selectedTicketsEmpty(selectedTickets) ? //no hay nada seleccionado?
                    ()=>{} //no hagas nada
                    : //de lo contrario
                    isAccessible? //es accesible?
                    ()=>setAccessibleStep(1) //pasar al siguiente paso
                    : // finalmente
                    ()=>handleConfirm(selectedTickets) //haz lo tuyo
                }
                ></ClarkeButton> 
        </div>

        {/*PARTE ACCESIBLE*/}

        {
            isAccessible && accesibleStep === 1 && (
                <PopUp>
                    <div style={{width:"70vw", padding: "1em", display: "flex", alignItems: "center", flexDirection: "column", gap: "1em"}}>
                        <h1 style={{textDecoration: "underline"}}>¿Quieres colaborar con Cudeca?</h1>
                        <div style={{width: "90%"}}>
                            <CollaborationQuery></CollaborationQuery>
                        </div>
                        <ClarkeButton text={"No, gracias"} type={IS_RETURN} size={"1.1em"} click_effect={()=>setAccessibleStep(2)}></ClarkeButton>
                    </div>
                </PopUp>
            )
        }

        {
            isAccessible && accesibleStep === 2 && (
                <PopUp>
                    <div style={{width:"55vw", padding: "1em", display: "flex", alignItems: "center", flexDirection: "column", gap: "2em"}}>
                        <h1 style={{textDecoration:"underline"}}>AVISO: entradas seleccionadas</h1>
                        <div style={{display:"flex", width: "90%", justifyContent: "space-between", alignItems: "center"}}>
                            <div style={{width: "50%", display:"flex", flexDirection:"column", gap:".5em"}}>

                                {
                                selectedTickets.map((value, index)=>{

                                    if(value === 0) return;

                                    const name = ticket_types[index].name + " x " + value;
                                    const price = ticket_types[index].price*value;
                                    return <SubTotalPrice key={name+Math.round(price*100)/100} name={name} total={Math.round(price*100)/100}></SubTotalPrice>

                                })}

                                <hr/>
                                <SubTotalPrice name={"Total"} total={computeTotal(selectedTickets, ticket_types)}></SubTotalPrice>

                                
                            </div>

                            <div style={{width: "40%", display: "flex", flexDirection: "column", gap: ".5em"}}>
                                <ClarkeButton text={"Continuar"} type={IS_CONFIRM} size={"1.1em"}
                                    click_effect={()=>{
                                        setAccessibleStep(0);
                                        handleConfirm(selectedTickets)
                                    }}    
                                ></ClarkeButton>
                                <ClarkeButton text={"Cancelar"} type={IS_RETURN} size={"1em"}
                                    click_effect={()=>setAccessibleStep(0)}
                                ></ClarkeButton>
                            </div>
                        </div>
                    </div>
                </PopUp>
            )
        }
        
        
    </div>)
}

export default SubMenuTicketSelect;