


async function uploadEvent(data){

    data.tags = data.tags.split(" ").filter(e=>e);

    delete data.type;

    if(data.premios){
        data.premios = data.premios.split(" ").filter(e=>e);
    }

    if(!data.url){
        data.url = "default.png";
    }

    data.entradas = data.entradas.map(entrada=>{
        return {
            nombre: entrada.nombre,
            descripcion: entrada.descripcion,
            subAforo: entrada.subAforo,
            precio: entrada.precio
        }
    })

    if(import.meta.env.VITE_IS_API_LOCAL == "si"){
        return true;
    }

    const URL = import.meta.env.VITE_API_URL ?? "localhost";
    const PORT = import.meta.env.VITE_API_PORT ?? "8080";

    const response = await fetch(`http://${URL}:${PORT}/nuevoEvento`, {
        method: "POST",
        body: JSON.stringify(data)
        
    });

    const result = await response.json();

    return result.Status === "OK";
}

export {uploadEvent};