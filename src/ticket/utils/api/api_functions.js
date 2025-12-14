import entradas_json from '../../assets/test.json';

async function getTicketsFromIds(list_ids){
    if(import.meta.env.VITE_IS_API_LOCAL == "si"){
        return entradas_json;
    }else{
        const URL = import.meta.env.VITE_API_URL ?? "localhost";
        const PORT = import.meta.env.VITE_API_PORT ?? "8080";

        const response = await fetch(`http://${URL}:${PORT}/getTicketsInfo`, {
            method: "POST",
            body: JSON.stringify(list_ids)
            
        });

        const result = await response.json();
        let status = true;
        let response_json = result;
        if(Object.keys(result).some(e=>e=="Status")){
            status=false;
        }else{
            response_json = response_json.map((t)=>{
                return {
                    idEntrada: t.idTicket,
                    nombreEvento: t.nombreEvento,
                    imagen: `http://${URL}:${PORT}/${t.url}`,
                    propietarioNombre: t.dniAsistente,
                    qr: "https://design.penpot.app/assets/by-file-media-id/fffce8d7-4b40-8153-8007-21382e94ae9a",
                    extraInfo: t.nombreEntrada,
                    patros: t.patrocinadores.map(patrocinador=>{return {name: patrocinador.nombre, logo:`http://${URL}:${PORT}/${patrocinador.logo}`}})
                }
            })
        }

        return response_json;

    }
}

export {getTicketsFromIds}
