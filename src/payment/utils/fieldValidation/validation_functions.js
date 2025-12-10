import { validateEmail } from "../../../ticket_buy/utils/fieldValidation/field_validation_functions";

function isValidBizum(data){
    data.telefono = data.telefono.split(' ').join(''); // eliminamos espacios en blanco
    if(!/^\d{9}$/.test(data.telefono)){ //es decir si es numérico de tamaño 9
        return {status: 400,  msg: `Formato del teléfono incorrecto: ${data.telefono}`}
    }

    return {status:200, msg:"ok"};
}

function isValidPaypal(data){
    if(!validateEmail(data.email)){
        return {status: 400,  msg: `Formato del email incorrecto: ${data.email}`}
    } 
    return {status:200, msg:"ok"};
}

function isValidMasterCard(data){
    if( !/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/.test(data.numeroTarjeta)){
        return {status: 400, msg: `Formato del número de tarjeta incorrecto: ${data.numeroTarjeta}` };
    } 

    if( !/^[A-Za-zÁ-Úá-ú]+$/.test(data.nombre) ){
        return {status: 400, msg: `Formato del nombre incorrecto: ${data.nombre}` };
    }

    if( !/^[A-Za-zÁ-Úá-ú]+$/.test(data.apellido1) ){
        return {status: 400, msg: `Formato del apellido incorrecto: ${data.apellido1}` };
    }

    if( !/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(data.fecha)){
        return {status: 400, msg: `Formato de la fehca de expiración incorrecto: ${data.fecha}` };
    }

    if( !/^[0-9]{3}$/.test(data.cvv)){
        return {status: 400, msg: `Formato del cvv incorrecto` };
    }

    return {status:200, msg:"ok"};
}

function isValidData(data, selectedMethod){
    if(selectedMethod == "mastercard"){
        return isValidMasterCard(data)
    }else if(selectedMethod=="paypal"){
        return isValidPaypal(data)
    }else if(selectedMethod=="bizum"){
        return isValidBizum(data);
    }
}


export {isValidData};