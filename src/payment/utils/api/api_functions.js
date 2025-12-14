async function cancelTransaction(transactionId){

    if(import.meta.env.VITE_IS_API_LOCAL === "si"){
        console.log("Cancelled transaction "+transactionId);
        return;
    }else{
        const URL = import.meta.env.VITE_API_URL ?? "localhost";
        const PORT = import.meta.env.VITE_API_PORT ?? "8080";

        const response = await fetch(`http://${URL}:${PORT}/comprar/cancelar/${transactionId}`);

        const result = await response.json();

        return result.Status === "OK";

    }

}

async function sendData(data, transactionId){
  
    if(import.meta.env.VITE_IS_API_LOCAL == "si"){
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({status: true, ids: [1, 2, 3, 4]});
          }, 5000);
        });
    }else{
        const URL = import.meta.env.VITE_API_URL ?? "localhost";
        const PORT = import.meta.env.VITE_API_PORT ?? "8080";

        const response = await fetch(`http://${URL}:${PORT}/comprar/confirmar/${transactionId}`, {
            method: "POST",
            body: JSON.stringify(data)
            
        });

        const result = await response.json();
        let status = true;
        if(Object.keys(result).some((k)=>k=="Status")){
            status = false;
        }

        return {status: status, ids: result};

    }

    
}



export {cancelTransaction, sendData}