

import Contador from "./ContadorEntradas";
import '../styles/TicketSelectionRow.css'

function TicketSelectionRow({name, descrip, price, currentAmount, setAmount = (n)=>{}}){

    return (<div className="ticket-selection-row-container">
        <div className="ticket-selection-row-info">
            <h2>{name.toUpperCase()}</h2>
            <p>{descrip}</p>
        </div>
        <div className="ticket-selection-row-prices">
            <div className="ticket-selection-price">
                <p>{price}€</p>
            </div>
            <Contador value={currentAmount} modCallBack={setAmount}></Contador>
        </div>
    </div>)
}

export default TicketSelectionRow;