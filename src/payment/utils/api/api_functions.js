function cancelTransaction(transactionId){
    console.log("Cancelled transaction "+transactionId);
    return;

}

async function sendData(data, transactionId){
    
    return new Promise((resolve) => {
    console.log("Sent ",data," to api for transaction "+transactionId);
    setTimeout(() => {
      console.log("Pago realizado");
      resolve(true);
    }, 5000);
  });
}



export {cancelTransaction, sendData}