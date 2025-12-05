import { useState } from 'react';
import '../styles/TicketBuyDeploy.css'


function TicketBuyDeploy({name, children}){

    const [isSelected, setSelected] = useState(true);

    const deploy_content_classname = "ticket-buy-deploy-content " + (isSelected ? "ticket-buy-deploy-content-active" : "ticket-buy-deploy-content-unactive")

    const deploy_header_classname = "ticket-buy-deploy-header " + (isSelected ? "ticket-buy-deploy-header-active" : "ticket-buy-deploy-header-unactive")

    return <div className="ticket-buy-deploy-container">
        <div className={deploy_header_classname}  onClick={()=>{setSelected(!isSelected); console.log('click')}}> <p>{isSelected ? "v" : ">"}</p>{name}</div>
        
        <div className={deploy_content_classname}>
            {children}
        </div>
        
    </div>;
}

export default TicketBuyDeploy;