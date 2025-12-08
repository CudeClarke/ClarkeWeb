import json from "../../assets/test2.json"
import json2 from "../../assets/test.json"

function fetchEvents(){
    return json.map((e)=>{
        return {
            evid: e.idEvento,
            name : e.evento.nombre,
            location: e.evento.ubicacion,
            date: e.evento.date,
            img: e.evento.url,
            tag_list: e.evento.tags,
            objective_recaudation: e.evento.objetivoRecaudacion,
            actual_recaudation: e.evento.recaudacion,
            description: e.evento.descripcion
        }
    })
}

function fetchFromLocal(){
    return json2.events;
}

export {fetchEvents, fetchFromLocal};