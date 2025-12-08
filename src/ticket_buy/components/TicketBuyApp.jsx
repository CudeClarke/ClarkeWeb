import TicketBuyDeploy from './TicketBuyDeploy.jsx'
import SubMenuUserData from './SubMenuUserData.jsx'
import SubMenuTicketSelect from './SubMenuTicketSelect.jsx'
import SubMenuGuestData from './SubMenuGuestsData.jsx'
import { useState } from 'react'
import { getTicketsFromEvent, generateRequestForTickets } from '../utils/api/api_functions.js'
import { isValidUser } from '../utils/fieldValidation/field_validation_functions.js'
import Section_image from './Section_image.jsx'
import { Alert, IS_ERROR, IS_OK } from '../../generic/components/Alert.jsx'



function clarkeAlert(setAlert, content){
  setAlert(content);
  setTimeout(()=>{
    setAlert({status: null, msg: ""});
  }, 4000)
}

function TicketBuyApp(){

    //llamada a la api para pillar los tipos de ticket de nuestro evento
    const tickets = getTicketsFromEvent(0);

    const [isActive, setActive] = useState(0); // #0 para el Seleccionar tipo de entrada, #1 para Datos Comprador y #2 para Datos Asistentes

    const [receivedTickets, setReceivedTickets] = useState(null)

    const [buyerInfo, setBuyerInfo] = useState(null);

    const [alertInfo, setAlert] = useState({status: null, msg: ""});

    return (
    <>


      <div style={{
        backgroundImage: "url('https://design.penpot.app/assets/by-file-media-id/8fd8c29f-33f9-8038-8007-2123360d1547')", 
        width: "80%", 
        margin: "auto",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        boxShadow: "0px 2px 2px 2px grey"
      }}>

    
        <div style={
          {
            display: 'flex',
            alignItems: "center",
            backdropFilter: "blur(8px)"
          }
          }>

          <div style={{width: "80%", maxHeight: "85vh", overflowY: "scroll"}}>


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
                      clarkeAlert(setAlert,{status: IS_ERROR, msg: "Las entradas seleccionadas ya no están disponibles"});
                      return;

                    }

                    //si seguimos aqui es q nos han dado nuestras entradas con sus id, las guardamos en un estado 
                    setReceivedTickets(response);

                    //y ya podemos pasar a la siguiente parte, nos cerramos y abrimos la siguiente pestaña
                    setActive(1);

                    clarkeAlert(setAlert,{status: IS_OK, msg: "Entradas seleccionadas correctamente"});
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

                    const {status, msg} = isValidUser(data);

                    //chequeamos validez de los datos insertados
                    if(status != 200){
                      //panico, notificamos al usuario
                      clarkeAlert(setAlert,{status: IS_ERROR, msg: msg});
                      return;
                    }

                    //si llegamos hasta aquí todo bien, podemos seguir
                    setBuyerInfo(data);

                    //pasamos a la última parte
                    setActive(2);

                    clarkeAlert(setAlert,{status: IS_OK, msg: "Datos insertados correctamente"});


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
                      if(data.every( u => isValidUser(u).status == 200)){ //es decir, si todos los usuarios son validos
                        //ya se mandará el mensaje final a la api

                        window.location.replace("/payment/");

                      }else{
                        clarkeAlert(setAlert,{status: IS_ERROR, msg: "Ha ocurrido un error procesando los datos de los asistentes, por favor revise los datos insertados."});
                      }
                    }}
                  ></SubMenuGuestData> //renderiza
                  : //si no
                  <></> //esto no se va a poder abrir
                }

            </TicketBuyDeploy>

          </div>
          
          <Section_image nombre={"Evento ejemplo"} ubicacion={"Torremolinos"} fecha={"5 de Diciembre"} imageUrl={"https://design.penpot.app/assets/by-file-media-id/8fd8c29f-33f9-8038-8007-2123360d1547"}></Section_image>
        
        </div>

    </div>
      
    {
      alertInfo.status != null ?
        <Alert type={alertInfo.status} msg={alertInfo.msg}></Alert>
      :
        <></>
    }
    </>
    )
}

export default TicketBuyApp;