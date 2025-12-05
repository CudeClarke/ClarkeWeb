
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
    const {response, status} = getTicketsFromRequest(requestJson) 

    return {response, status};
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

export {getTicketsFromEvent, generateRequestForTickets, getTicketsFromRequest}