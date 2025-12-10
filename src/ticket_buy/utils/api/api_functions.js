import events from '../../../events/assets/test2.json'

function getEventFromId(evid){

    let event = events.filter((e)=> e.idEvento == evid);

    if(event.length > 0){
        event = event.at(0);
    }else{
        return null;
    }

    return {
            evid: event.idEvento,
            name : event.evento.nombre,
            location: event.evento.ubicacion,
            date: event.evento.date,
            img: event.evento.url,
            tag_list: event.evento.tags,
            objective_recaudation: event.evento.objetivoRecaudacion,
            actual_recaudation: event.evento.recaudacion,
            description: event.evento.descripcion
        }

}


function getTicketsFromEvent(evid){
    return [
        {   
            evid: 0,
            id: 1,
            name: "Menú Básico",
            descrip: "Menú general",
            price: 19.99
        },
        {
            evid: 0,
            id: 2,
            name: "Menú Vegetariano",
            descrip: "Menú adaptado para personas vegetarianas",
            price: 22.99
        },
        {
            evid: 0,
            id: 3,
            name: "Menú Celíaco",
            descrip: "Menú adaptado para personas celíacas",
            price: 24.99
        }
    ];
}

function generateRequestForTickets(selectedTickets, tickets){

    //creamos el json para la query ( todo muy provisional )
    const requestJson = tickets.map((tckt, index)=>{
        if(selectedTickets[index]>0) return {amount: selectedTickets[index], id: tckt.id, evid: tckt.evid, name: tckt.name}
        else return null;
    }).filter(n=>n)

    //aqui se hará un trabajo interesante de llamadas a la api
    //habrá que pedir una confirmación de que esas entradas estén disponibles y tal 
    //emulamos una posible respuesta
    const {response, status} = getTicketsFromRequest(requestJson);


    //nos devuelven tambien un transaction id que usaremos para recordar al servidor las entradas que nos han sido prestadas o para cancelarlas
    const transaction_id = Math.trunc(Math.random()*100);

    return {response, transaction_id, status};
}

function getTicketsFromRequest(list_of_requested_tickets){
    //en fin tu sabes, aqui el backend hará lo suyo

    const response = []

    for(let i = 0; i<list_of_requested_tickets.length; i++){
        for(let j = 0; j<list_of_requested_tickets[i].amount; j++){
            let req = list_of_requested_tickets[i];
            response.push({name: req.name, evid: req.evid, id: req.id+req.evid+Math.trunc((Math.random()*10))})
        }
    }

    return { response: response,
        status: 200
    }
}

function uploadTicketsInfo(tickets, buyer, guests, transactionId){
    //aqui haré mi llamada a la api
    return true; 
}   

function cancelTransaction(transactionId){
    if(transactionId !== null){
        //llamada a la api para cancelar la transaccion
        console.log("El usuario ha cancelado la transaccion");
    }
}

export {getTicketsFromEvent, generateRequestForTickets, getTicketsFromRequest, cancelTransaction, uploadTicketsInfo, getEventFromId}