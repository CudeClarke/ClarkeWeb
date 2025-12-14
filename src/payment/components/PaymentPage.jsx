import '../styles/Payment.css';
import { useState } from 'react';
import MastercardLogo from '../assets/logomastercard.png';
import BizumLogo from '../assets/logobizum.png';
import PaypalLogo from '../assets/logopaypal.png';
import VerifiedVisaLogo from '../assets/verifiedvisa.jpg';
import Bizumphone from '../assets/bizumsecure.png';
import Paypalphone from '../assets/segurepaypal.png';
import { CampoTexto } from '/src/generic/components/CampoTexto.jsx';
import {ClarkeButton, IS_CONFIRM, IS_RETURN} from '../../generic/components/Button.jsx'
import { isValidData } from '../utils/fieldValidation/validation_functions.js';
import { sendData, cancelTransaction } from '../utils/api/api_functions.js';
import {Alert, IS_ERROR, IS_OK} from '../../generic/components/Alert.jsx'
import WaitingPopUp from './WaitingPopUp.jsx';


function isDataCorrect(selectedMethod, masterData, bizumData, paypalData){

  if(selectedMethod === "mastercard"){
    let {apellido2, ...data_check} = masterData
    return Object.values(data_check).every((e)=>(e));
  }else if(selectedMethod === "bizum"){
    return Object.values(bizumData).every((e)=>(e));
  }else if(selectedMethod === "paypal"){
    return Object.values(paypalData).every((e)=>(e));
  }

}

function clarkeAlert(setAlert, content){
  setAlert(content);
  setTimeout(()=>{
    setAlert({status: null, msg: ""});
  }, 4000)
}


function PaymentPage() {

    const [alertInfo, setAlert] = useState({status: null, msg: ""});
    const [isWaiting, setWaiting] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null);
  // === ESTADOS DEL FORMULARIO ===

// Mastercard
const [masterData, setMasterData] = useState({
  nombre: "",
  direccion: "",
  apellido1: "",
  pais: "",
  apellido2: "",
  localidad: "",
  numeroTarjeta: "",
  fecha: "",
  cvv: ""
});

// Bizum
const [bizumData, setBizumData] = useState({
  telefono: ""
});

// PayPal
const [paypalData, setPaypalData] = useState({
  email: "",
  password: ""
});

  const renderForm = () => {
if (selectedMethod === 'mastercard') {
  return (
    <div className="payment-form">
      <div className="payment-form-grid">
      
        <div className="payment-field">
          <CampoTexto
            nombre="Nombre"
            placeholder="Introduce tu nombre"
            obligatorio="si"
             handleChange={(v) => setMasterData({ ...masterData, nombre: v.target.value })}
          />
        </div>

        <div className="payment-field">
          <CampoTexto
            nombre="Dirección"
            placeholder="Introduce una dirección"
            obligatorio="si"
             handleChange={(v) => setMasterData({ ...masterData, direccion: v.target.value })}
          />
        </div>

      
        <div className="payment-field">
          <CampoTexto
            nombre="Primer Apellido"
            placeholder="Introduce primer apellido"
            obligatorio="si"
            handleChange={(v) => setMasterData({ ...masterData, apellido1: v.target.value })}
          />
        </div>

        <div className="payment-field">
          <CampoTexto
            nombre="País"
            placeholder="Introduce país de origen"
            obligatorio="si"
            handleChange={(v) => setMasterData({ ...masterData, pais: v.target.value })}
          />
        </div>

        
        <div className="payment-field">
          <CampoTexto
            nombre="Segundo Apellido"
            placeholder="Introduce segundo apellido"
            obligatorio="no"
             handleChange={(v) => setMasterData({ ...masterData, apellido2: v.target.value })}
          />
        </div>

        <div className="payment-field">
          <CampoTexto
            nombre="Localidad"
            placeholder="Introduce la localidad"
            obligatorio="si"
             handleChange={(v) => setMasterData({ ...masterData, localidad: v.target.value })}
          />
        </div>

        
        <div className="payment-field">
          <CampoTexto
            nombre="Número de tarjeta"
            placeholder="nº de tarjeta"
            obligatorio="si"
            handleChange={(v) => setMasterData({ ...masterData, numeroTarjeta: v.target.value })}
          />
        </div>

      
        <div className="payment-field"></div>

        
        <div className="payment-field">
          <div className="payment-card-mini-row">
            <CampoTexto
              nombre="Fecha de caducidad"
              placeholder="MM/AA"
              obligatorio="si"
              handleChange={(v) => setMasterData({ ...masterData, fecha: v.target.value })}
            />
            <CampoTexto
              nombre="CVV"
              obligatorio="si"
               handleChange={(v) => setMasterData({ ...masterData, cvv: v.target.value })}
            />
          </div>
        </div>

      
        <div className="payment-field"></div>
      </div>

      
      <div className="payment-visa-wrapper">
        <div className="payment-card-logo">
          <img src={VerifiedVisaLogo} alt="Verified by Visa" />
        </div>
      </div>
    </div>
  );
}

    if (selectedMethod === 'bizum') {
      return (
       <div className="payment-form payment-form-bizum">
      <div className="payment-bizum-left">
        <div className="payment-field">
          <CampoTexto
             id="telefonoBizum"
            nombre="Teléfono asociado a bizum"
            placeholder="123 456 789"
            obligatorio="si"
            type="tel"
            handleChange={(v) => setBizumData({ ...bizumData, telefono: v.target.value })}
          />
        </div>
      </div>

      <div className="payment-bizum-right">
        <img
          src={Bizumphone}
          alt="Pago con Bizum"
          className="payment-bizum-image"
        />
      </div>
    </div>
      );
    }

    if (selectedMethod === 'paypal') {
      return (
       <div className="payment-form payment-form-single">
          <div className="payment-field">
            <CampoTexto
              id="emailPaypal"
              nombre="Email"
              placeholder="email@mail.com"
              obligatorio="si"
              type="email"
              handleChange={(v) => setPaypalData({ ...paypalData, email: v.target.value })}              
            />
          </div>

          <div className="payment-field">
            <CampoTexto
              id="passPaypal"
              nombre="Contraseña"
              placeholder=""
              obligatorio="si"
              type="password"
              handleChange={(v) => setPaypalData({ ...paypalData, password: v.target.value })} 
            />
          </div>

          {/* Columna derecha: imagen */}
      <div className="payment-paypal-right">
        <img
          src={Paypalphone}
          alt="Pago con Paypal"
          className="payment-paypal-image"
        />
      </div>
        </div>
      );

    }

    return null;
  };

  return (
  <div className="payment-wrapper">
    <div className="payment-box">
      <div className="payment-inner">
        
       
        <div className="payment-content">
          <div className="payment-methods-row">
            <div
              className={
                "payment-method-card " +
                (selectedMethod === "mastercard" ? "selected" : "")
              }
              onClick={
                () => {
                  if( !selectedMethod || selectedMethod != "mastercard"){
                    setSelectedMethod("mastercard"); 
                    setMasterData({nombre: "",direccion: "",apellido1: "",pais: "",apellido2: "",localidad: "",numeroTarjeta: "",fecha: "",cvv: ""})
                  }
                }
              }
            >
              <img className="payment-logo" src={MastercardLogo} alt="Mastercard" />
            </div>

            <div
              className={
                "payment-method-card " +
                (selectedMethod === "bizum" ? "selected" : "")
              }
              onClick={
                () => {
                  if( !selectedMethod || selectedMethod!="bizum"){
                    setSelectedMethod("bizum"); 
                    setBizumData({telefono: ""})
                  }
                }
              }
            >
              <img className="payment-logo" src={BizumLogo} alt="Bizum" />
            </div>

            <div
              className={
                "payment-method-card " +
                (selectedMethod === "paypal" ? "selected" : "")
              }
              onClick={
                () => {
                  if(!selectedMethod || selectedMethod != "paypal") {
                    setSelectedMethod("paypal"); 
                    setPaypalData({email:"", password: ""})
                  }
                }
              }
            >
              <img className="payment-logo" src={PaypalLogo} alt="PayPal" />
            </div>
          </div>

          {renderForm()}
        </div>

        {/* BOTÓN Confirmar pago*/}
        <div className={"payment-button-wrapper"}>
          <div 
            className={(isDataCorrect(selectedMethod, masterData, bizumData, paypalData) ? "payment-button-continue-active": "payment-button-continue-unactive")}
            title={
            selectedMethod === null ? "Seleccione un método de pago":
            (isDataCorrect(selectedMethod, masterData, bizumData, paypalData) ? "" : "Algunos campos obligatorios están incompletos.")}
          
          >
            <ClarkeButton 
              text={"Confirmar pago"} 
              type={IS_CONFIRM} 
              size={"1em"} 
              click_effect={
                async ()=>{
                const selectedData = selectedMethod == "mastercard" ? {...masterData} : (selectedMethod == "bizum" ? {...bizumData} : {...paypalData});
                if (!isDataCorrect(selectedMethod, masterData, bizumData, paypalData)){
                  return;
                }

                
                //primero hacemos una prevalidación de los campos
                const {status, msg} = isValidData(selectedData, selectedMethod);
                
                //aqui habria que enviar alertas y tal
                if(status != 200){
                  clarkeAlert(setAlert, {status: IS_ERROR, msg:msg});
                  return;
                }

                const url = new URL(window.location.href);

                const transactionId = url.searchParams.get("transactionId");
                let success;

                setWaiting(true);

                try{
                  //enviar al servidor
                  success = await sendData({method: selectedMethod, ...selectedData}, transactionId);

                }catch(e){

                }
                
                setWaiting(false);
                
                if(success){

                  window.location.href = "/"
                  
                }else{

                  clarkeAlert(setAlert, {status: IS_ERROR, msg: "Ha ocurrido un error procesando el pago con su banco, por favor inténtelo de nuevo más tarde"})

                }

              }}
              >
            </ClarkeButton>
          </div>
          <div className='payment-cancel-button'>
              <ClarkeButton text={"Cancelar"} type={IS_RETURN} size={"1em"} click_effect={async ()=>{
                const url = new URL(window.location.href);

                const transactionId = url.searchParams.get("transactionId");

                await cancelTransaction(transactionId);

                window.location.href = "/"
                
              }}
            ></ClarkeButton>
          </div>
        </div>
      </div>
    {
      alertInfo.status != null ?
        <Alert type={alertInfo.status} msg={alertInfo.msg}></Alert>
      :
        <></>
    }

    {
      isWaiting ? 
      <WaitingPopUp></WaitingPopUp>
      :
      <></>
    }
    </div>
  </div>
);
}

export default PaymentPage;

