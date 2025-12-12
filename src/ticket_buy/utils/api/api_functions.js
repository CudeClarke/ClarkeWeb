import events from '../../../events/assets/test2.json'

async function getEventFromId(evid){
    
    let event;

    if(!import.meta.env.VITE_IS_API_LOCAL){
        event = events.filter((e)=> (e.idEvento == evid)).at(0)
    }else{
        const URL = import.meta.env.VITE_API_URL ?? "localhost";
        const PORT = import.meta.env.VITE_API_PORT ?? "8080";
        const response = await fetch(`http://${URL}:${PORT}/eventos/${evid}`);
        event = await response.json();
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


async function getTicketsFromEvent(evid){

    const tickets = [
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

    if(!import.meta.env.VITE_IS_API_LOCAL){
        return tickets;
    }else{
        const URL = import.meta.env.VITE_API_URL ?? "localhost";
        const PORT = import.meta.env.VITE_API_PORT ?? "8080";

        const response = await fetch(`http://${URL}:${PORT}/eventos/${evid}/entradas`);
        let api_tickets = await response.json();

        api_tickets = api_tickets.map((ticket)=>{
            return {
                evid: ticket.idEvento,
                id: ticket.entrada.id,
                name: ticket.entrada.nombre,
                descrip: ticket.entrada.descripcion,
                price: ticket.entrada.precio
            }
        })

        return api_tickets;
    }

}

async function generateRequestForTickets(selectedTickets, tickets){

    //creamos el json para la query ( todo muy provisional )
    const requestJson = tickets.map((tckt, index)=>{
        if(selectedTickets[index]>0) return {amount: selectedTickets[index], idEntrada: tckt.id, idEvento: tckt.evid, name: tckt.name}
        else return null;
    }).filter(n=>n)

    //llamamos a la api
    const {status, ..._} = await checkTickets(requestJson);

    let response = [];

    for(let i = 0; i<requestJson.length; i++){
        for(let j = 0; j<requestJson[i].amount; j++){
            let req = requestJson[i];
            response.push({name: req.name, evid: req.idEvento, id: req.idEntrada})
        }
    }

    return {response, status};
}

async function checkTickets(list_of_requested_tickets){
    //en fin tu sabes, aqui el backend hará lo suyo

    if(!import.meta.env.VITE_IS_API_LOCAL){
        return { response: "ok", status: 200 }
    }else{
        const URL = import.meta.env.VITE_API_URL ?? "localhost";
        const PORT = import.meta.env.VITE_API_PORT ?? "8080";

        const response = await fetch(`http://${URL}:${PORT}/comprar/check`, {
            method: "POST",
            body: JSON.stringify(list_of_requested_tickets)
            
        });

        const result = await response.json();

        return { response: result.Status == "OK" ? "ok" : "error", status: result.Status == "OK" ? 200 : 400};

    }

    
}

async function uploadTicketsInfo(tickets, buyer, guests){
    //en fin tu sabes, aqui el backend hará lo suyo

    if(!import.meta.env.VITE_IS_API_LOCAL){
        return { status: 200, transactionId: Math.trunc(Math.random()*100) }
    }else{
        const URL = import.meta.env.VITE_API_URL ?? "localhost";
        const PORT = import.meta.env.VITE_API_PORT ?? "8080";

        const response = await fetch(`http://${URL}:${PORT}/comprar/start`, {
            method: "POST",
            body: JSON.stringify({
                comprador: {
                    nombre: buyer.name,
                    apellidos: buyer.surname,
                    email: buyer.email,
                    dni: buyer.dni,
                    spam: buyer.spam,
                    direccion: buyer.address,
                    tlf: buyer.tlf
                },
                lista_entradas: tickets.map((ticket, index)=>{
                    return {
                        idEvento: ticket.evid,
                        idEntrada: ticket.id,
                        dni: guests[index].dni,
                    }
                })
            })
        });

        const result = await response.json();

        return {status: result.Status == "OK" ? 200: 400, transactionId: result.Message}
    }
}   

async function cancelTransaction(transactionId){
    if(transactionId !== null && !import.meta.env.VITE_IS_API_LOCAL){
        const URL = import.meta.env.VITE_API_URL ?? "localhost";
        const PORT = import.meta.env.VITE_API_PORT ?? "8080";

        const response = await fetch(`http://${URL}:${PORT}/comprar/cancelar/${transactionId}`);

        return;
    }
}


async function fetchUserFromServer(dni){
    if(!import.meta.env.VITE_IS_API_LOCAL){
        return new Promise((resolve) => {
            setTimeout(() => {
            resolve({name: "Abel", surname: "Fernandez Palomo", email:"micorreo@gmail.com", dni:dni, tlf: "", address: "", postal_code: "", consent: false, spam: false, partner: false});
            }, 5000);
        })
    }else{
        const URL = import.meta.env.VITE_API_URL ?? "localhost";
        const PORT = import.meta.env.VITE_API_PORT ?? "8080";

        const response = await fetch(`http://${URL}:${PORT}/usuario/${dni}`);

        const result = await response.json();

        if(result.hasOwnProperty("Status")){
            return null;
        }else{
            return {
                name: result.nombre,
                surname: result.apellidos,
                email: result.email,
                dni: result.dni,
                spam: result.spam,
                address: result.direccion,
                tlf: result.tlf,
                postal_code: "",
                consent: false,
                partner: false
            }
        }

    }
}

export {fetchUserFromServer, getTicketsFromEvent, generateRequestForTickets, cancelTransaction, uploadTicketsInfo, getEventFromId}