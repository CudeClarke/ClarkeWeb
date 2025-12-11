

import "../styles/Content_popUp.css"
import { CampoTexto } from "./CampoTexto";
import { ClarkeButton, IS_POPUP, IS_GRAY } from "./Button";

const IS_CONTINUE = 0, IS_HELP = 1, IS_COLLABORATE = 2;


function Content_popUp({type}){
    if (type == 0){
        return (
            <div className="div-content">
                <text className="text-data"  style={{ textDecorationLine: 'underline' }}>
                    Rellenar datos automáticamente
                </text>
                <div className="seccion-Uno">
                    <div className="div-ctxt-dni">
                        <CampoTexto className="ctxt-dni" nombre={"DNI"} placeholder={"12345678Z"} obligatorio={"SI"}></CampoTexto>
                        <p className="p-inferior">Consiento el tratamiento de los datos entregados por la ley XXXX <span style={{ color: 'red' }}>*</span></p>
                    </div>
                    <ClarkeButton className="cb-buscar" text={"Buscar"} type={IS_POPUP} size={"2wh"}></ClarkeButton>
                </div>
                <hr className="hr-separador"></hr>
                <text className="text-data"  style={{ textDecorationLine: 'underline' }}>
                    Continuar y rellenar datos manualmente
                </text>
                <div className="div-buttonCont">
                    <ClarkeButton className="cb-continuar" text={"Continuar sin buscar mis datos"} type={IS_POPUP} size={"2vh"}>
                    </ClarkeButton>
                </div>
            </div> 
        )
    }else if (type == 1){
        return (
            <div className="div-content-access">
                <text className="text-data-access"  style={{ textDecorationLine: 'underline' }}>
                    ¿Necesita ayuda comprando su entrada?
                </text>
                <text className="text-reduced">
                    Pulse el botón de la esquina inferior izquierda
                </text>
                <div className="div-buttonCont">
                    <ClarkeButton className="cb-continuar" text={"No necesito ayuda, gracias"} type={IS_POPUP} size={"2vh"}>
                    </ClarkeButton>
                </div>
            </div> 
        )
    }else if(type == 2){
        return (
            <div className="div-content-collaborate">
                <text className="text-data-access"  style={{ textDecorationLine: 'underline' }}>
                    ¿Quieres colaborar con Cudeca?
                </text>
                <div className="div-body-collaborate">
                    <div className="div-body">
                        <div className="div-txtUp">
                            <div className="div-collaborate">
                                <CampoTexto className="ctxt-collaborate" nombre={<strong style={{fontSize: '12px'}}>COLABORAR CON CUDECA</strong>} placeholder={"10€"} obligatorio={"SI"}></CampoTexto>
                            </div>
                            <div className="div-button-collaborate">
                                <div className="div-cb-donar">
                                    <ClarkeButton className="cb-donar" text={"REALIZAR DONACIÓN"} type={IS_POPUP} size={"2wh"}></ClarkeButton>
                                </div>
                                <div className="div-cb-denegar">
                                    <ClarkeButton className="cb-denegar" text={"No, Gracias"} type={IS_GRAY} size={"2wh"}></ClarkeButton>
                                </div>
                            </div>
                        </div>
                        <p className="p-txtDown">
                            Al realizar una donación los fondos serán enviados íntegramente a la fundación Cudeca y serán utilizados para mejorar los servicios prestados a nuestros mayores. Esta donación es opcional. Se generará un certificado de donación que se entregará en caso de desearse.<span style={{color:'red'}}>*</span>
                        </p>
                    </div>
                    <div className="div-img">
                        <img className="img-flor2" src='data:image/png;base64,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'></img>
                    </div>                   
                </div>
            </div> 
        )
    }
}

export { Content_popUp, IS_CONTINUE, IS_HELP, IS_COLLABORATE };