import '../styles/Payment.css';
import { useState } from 'react';
import MastercardLogo from '../images/logomastercard.png';
import BizumLogo from '../images/logobizum.png';
import PaypalLogo from '../images/logopaypal.png';
import { CampoTexto } from './CampoTexto.jsx';

function PaymentPage() {

    const [selectedMethod, setSelectedMethod] = useState(null);
    
     const renderForm = () => {
    if (selectedMethod === 'mastercard') {
      return (
        <div className="payment-form">
          <div className="payment-form-grid">
            <div className="payment-field">
              <CampoTexto nombre="Nombre" placeholder="Introduce tu nombre" obligatorio="si" />
            </div>

            <div className="payment-field">
              <CampoTexto nombre="Dirección" placeholder="Introduce una dirección" obligatorio="si" />
            </div>

            <div className="payment-field">
              <CampoTexto nombre="Primer Apellido" placeholder="Introduce primer apellido" obligatorio="si" />
            </div>

            <div className="payment-field">
              <CampoTexto nombre="País" placeholder="Introduce país de origen" obligatorio="si" />
            </div>

            <div className="payment-field">
              <CampoTexto nombre="Segundo Apellido" placeholder="Introduce segundo apellido" obligatorio="no" />
            </div>

            <div className="payment-field">
              <CampoTexto nombre="Localidad" placeholder="Introduce la localidad" obligatorio="si" />
            </div>

            <div className="payment-field full-width">
              <CampoTexto
                nombre="Número de tarjeta"
                placeholder="nº de tarjeta"
                obligatorio="si"
              />
            </div>

            <div className="payment-field">
              <CampoTexto
                nombre="Fecha de caducidad"
                placeholder="MM/AA"
                obligatorio="si"
              />
            </div>

            <div className="payment-field">
              <CampoTexto
                nombre="CVV"
                placeholder=""
                obligatorio="si"
                type="password"
              />
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
              placeholder="holamundo@mail.com"
              obligatorio="si"
              type="email"
            />
          </div>

          <div className="payment-field">
            <CampoTexto
              nombre="Contraseña"
              placeholder=""
              obligatorio="si"
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
      </div>
    </div>
  );
}

export default PaymentPage;
