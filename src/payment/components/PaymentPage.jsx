import '../styles/Payment.css';
import { useState } from 'react';
import MastercardLogo from '../assets/logomastercard.png';
import BizumLogo from '../assets/logobizum.png';
import PaypalLogo from '../assets/logopaypal.png';
import VerifiedVisaLogo from '../assets/verifiedvisa.jpg';
import { CampoTexto } from '/src/generic/components/CampoTexto.jsx';
function PaymentPage() {

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

const masterValid =
  masterData.nombre &&
  masterData.direccion &&
  masterData.apellido1 &&
  masterData.pais &&
  masterData.localidad &&
  masterData.numeroTarjeta &&
  masterData.fecha &&
  masterData.cvv;

const bizumValid = bizumData.telefono.length >= 5;

const paypalValid =
  paypalData.email.includes("@") &&
  paypalData.password.length >= 1;

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
             onChange={(v) => setMasterData({ ...masterData, nombre: v })}
          />
        </div>

        <div className="payment-field">
          <CampoTexto
            nombre="Dirección"
            placeholder="Introduce una dirección"
            obligatorio="si"
             onChange={(v) => setMasterData({ ...masterData, direccion: v })}
          />
        </div>

      
        <div className="payment-field">
          <CampoTexto
            nombre="Primer Apellido"
            placeholder="Introduce primer apellido"
            obligatorio="si"
            onChange={(v) => setMasterData({ ...masterData, apellido1: v })}
          />
        </div>

        <div className="payment-field">
          <CampoTexto
            nombre="País"
            placeholder="Introduce país de origen"
            obligatorio="si"
            onChange={(v) => setMasterData({ ...masterData, pais: v })}
          />
        </div>

        
        <div className="payment-field">
          <CampoTexto
            nombre="Segundo Apellido"
            placeholder="Introduce segundo apellido"
            obligatorio="no"
             onChange={(v) => setMasterData({ ...masterData, apellido2: v })}
          />
        </div>

        <div className="payment-field">
          <CampoTexto
            nombre="Localidad"
            placeholder="Introduce la localidad"
            obligatorio="si"
             onChange={(v) => setMasterData({ ...masterData, localidad: v })}
          />
        </div>

        
        <div className="payment-field">
          <CampoTexto
            nombre="Número de tarjeta"
            placeholder="nº de tarjeta"
            obligatorio="si"
            onChange={(v) => setMasterData({ ...masterData, numeroTarjeta: v })}
          />
        </div>

      
        <div className="payment-field"></div>

        
        <div className="payment-field">
          <div className="payment-card-mini-row">
            <CampoTexto
              nombre="Fecha de caducidad"
              placeholder="MM/AA"
              obligatorio="si"
              onChange={(v) => setMasterData({ ...masterData, fecha: v })}
            />
            <CampoTexto
              nombre="CVV"
              obligatorio="si"
               onChange={(v) => setMasterData({ ...masterData, cvv: v })}
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
        <div className="payment-form payment-form-single">
          <div className="payment-field">
            <CampoTexto
              nombre="Teléfono asociado a Bizum"
              placeholder="123 456 789"
              obligatorio="si"
              onChange={(v) => setBizumData({ ...bizumData, telefono: v })}
              type="tel"
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
              nombre="Email"
              placeholder="email@mail.com"
              onChange={(v) => setPaypalData({ ...paypalData, email: v })}
              obligatorio="si"
              type="email"
            />
          </div>

          <div className="payment-field">
            <CampoTexto
              nombre="Contraseña"
              placeholder=""
              obligatorio="si"
              onChange={(v) => setPaypalData({ ...paypalData, password: v })}
              type="password"
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
              onClick={() => setSelectedMethod("mastercard")}
            >
              <img className="payment-logo" src={MastercardLogo} alt="Mastercard" />
            </div>

            <div
              className={
                "payment-method-card " +
                (selectedMethod === "bizum" ? "selected" : "")
              }
              onClick={() => setSelectedMethod("bizum")}
            >
              <img className="payment-logo" src={BizumLogo} alt="Bizum" />
            </div>

            <div
              className={
                "payment-method-card " +
                (selectedMethod === "paypal" ? "selected" : "")
              }
              onClick={() => setSelectedMethod("paypal")}
            >
              <img className="payment-logo" src={PaypalLogo} alt="PayPal" />
            </div>
          </div>

          {renderForm()}
        </div>

        {/* BOTÓN Confirmar pago*/}
        <div className="payment-button-wrapper">
          <button className={
    "payment-confirm-button " +
    (selectedMethod === "mastercard" && masterValid
      ? "enabled"
      : selectedMethod === "bizum" && bizumValid
      ? "enabled"
      : selectedMethod === "paypal" && paypalValid
      ? "enabled"
      : "disabled")
  }
>
            Confirmar pago
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default PaymentPage;

