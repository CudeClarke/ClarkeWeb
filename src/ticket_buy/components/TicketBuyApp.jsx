import TicketBuyDeploy from './TicketBuyDeploy.jsx'
import SubMenuUserData from './SubMenuUserData.jsx'
import SubMenuTicketSelect from './SubMenuTicketSelect.jsx'
import SubMenuGuestData from './SubMenuGuestsData.jsx'
import { useState } from 'react'
import { getTicketsFromEvent, generateRequestForTickets } from '../utils/api/api_functions.js'
import { isValidUser } from '../utils/fieldValidation/field_validation_functions.js'



function TicketBuyApp(){

    //llamada a la api para pillar los tipos de ticket de nuestro evento
    const tickets = getTicketsFromEvent(0);

    const [isActive, setActive] = useState(0); // #0 para el Seleccionar tipo de entrada, #1 para Datos Comprador y #2 para Datos Asistentes

    const [receivedTickets, setReceivedTickets] = useState(null)

    const [buyerInfo, setBuyerInfo] = useState(null);

    return (
    
    <div style={{width: "80%"}}>



      {/*PRIMERA PARTE, SELCCIONAR ENTRADAS*/}

      <TicketBuyDeploy 

        name={"Seleccionar tipo de entrada"} 

        isSelected={isActive===0} 

        handleHeaderClick={()=>{if(isActive != 0) {setActive(0); setReceivedTickets(null);}}} //siempre se puede volver al primero, pero implica anular los tickets pedidos
        >

        <SubMenuTicketSelect 

          ticket_types={tickets}

          handleConfirm={
            (selectedTickets)=>{

              const {response, status} = generateRequestForTickets(selectedTickets, tickets)

              if(status != 200){
                //aqui panick total, no nos han dado lo que queriamos
                alert("illo no hay las entradas que has pedido lo siento")
                return;

              }

              //si seguimos aqui es q nos han dado nuestras entradas con sus id, las guardamos en un estado 
              setReceivedTickets(response);

              //y ya podemos pasar a la siguiente parte, nos cerramos y abrimos la siguiente pestaña
              setActive(1);
            }
          }

        ></SubMenuTicketSelect>

      </TicketBuyDeploy>



      {/*SEGUNDA PARTE, RELLENAR DATOS DEL COMPRADOR */}

      <TicketBuyDeploy 

        name={"Datos Comprador"} 

        isSelected={isActive===1}

        handleHeaderClick={()=>{
          if(isActive>1 || buyerInfo != null){ //va a depender de que estemos en el siguiente paso o 
            setActive(1)
          }
        }}
      >

        <SubMenuUserData

          handleReturn={()=>{setActive(0); setReceivedTickets(null)}} //volver hacia atras, se borran los tickets pedidos, si vuelve los tendra que volver a pedir

          handleConfirm={
            (data)=>{

              //chequeamos validez de los datos insertados
              if(!isValidUser(data)){
                //panico, notificamos al usuario
                alert("Algo anda mal, ya te diré el qué")
                return;
              }

              //si llegamos hasta aquí todo bien, podemos seguir
              setBuyerInfo(data);

              //pasamos a la última parte
              setActive(2);

            }
          }

          ></SubMenuUserData>

      </TicketBuyDeploy>


      {/*ULTIMA PARTE, DATOS DE LOS ASISTENTES*/}
      <TicketBuyDeploy 

        name={"Datos Asistentes"} 

        isSelected={isActive===2}

        handleHeaderClick={()=>{
          if(receivedTickets != null && buyerInfo != null && isActive != 2){
            setActive(2);
          }
        }}

      >

          { (receivedTickets != null && buyerInfo!=null ) ?  //si están los datos
            <SubMenuGuestData 
              selected_tickets={receivedTickets} 
              buyer_info={buyerInfo} 
              handleReturn={()=>isActive(2)}
              handleConfirm={(data)=>{
                if(data.every( u => isValidUser(u))){ //es decir, si todos los usuarios son validos
                  //ya se mandará el mensaje final a la api

                  window.location.replace("/payment/");

                }else{
                  alert("Algunos usuarios no han dado de si");
                }
              }}
            ></SubMenuGuestData> //renderiza
            : //si no
            <></> //esto no se va a poder abrir
          }

      </TicketBuyDeploy>

    </div>)
}

export default TicketBuyApp;