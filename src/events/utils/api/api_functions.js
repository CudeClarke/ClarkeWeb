import json from "../../assets/test2.json"
import json2 from "../../assets/test.json"

async function fetchEvents(){

    if(import.meta.env.VITE_IS_API_LOCAL == "si"){
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
                description: e.evento.descripcion,
                patr_list: e.evento.patrocinadores
            }
        })
    }else{
        const URL = import.meta.env.VITE_API_URL ?? "localhost";
        const PORT = import.meta.env.VITE_API_PORT ?? "8080";

        const response = await fetch(`http://${URL}:${PORT}/eventos`);

        const result = await response.json();
        return result.map(e=>{
            return {
                evid: e.evento.id,
                name : e.evento.nombre,
                location: e.evento.ubicacion,
                date: e.evento.date,
                img: e.evento.url,
                tag_list: e.evento.tags,
                objective_recaudation: e.evento.objetivoRecaudacion,
                actual_recaudation: e.evento.recaudacion,
                description: e.evento.descripcion,
                patr_list: e.evento.patrocinadores
            }
        });

    }
    
}


export {fetchEvents};