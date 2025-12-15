

import "../styles/Content_popUp.css"
import { CampoTexto } from "../../generic/components/CampoTexto";
import { ClarkeButton, IS_POPUP } from "../../generic/components/Button";
import { useState } from "react";
import {fetchUserFromServer} from "../utils/api/api_functions";
import '../styles/Content_popUp.css'

function Content_popUp({handleContinue, handleCancel}){
        const [dni, setDni] = useState('');

        const [isWaiting, setWaiting] = useState(0);
        return (
            <div className="div-content">

                <h1 className="text-data"  style={{ textDecorationLine: 'underline' }}>
                    Rellenar datos automáticamente
                </h1>
                <div className="seccion-Uno">
                    <div className="div-ctxt-dni">
                        <CampoTexto className="ctxt-dni" nombre={"DNI"} placeholder={"12345678Z"} obligatorio={"SI"} value={dni} hasValue handleChange={(e)=>{setDni(e.target.value)}}></CampoTexto>
                        <p className="p-inferior">Consiento el tratamiento de los datos entregados por la ley XXXX <span style={{ color: 'red' }}>*</span></p>
                    </div>
                    <ClarkeButton className="cb-buscar" text={"Buscar"} type={IS_POPUP} size={"1em"} 
                        click_effect={async ()=>{

                            setWaiting(1)

                            let data = await fetchUserFromServer(dni);

                            handleContinue(data);

                        }}
                    ></ClarkeButton>
                </div>
                <hr className="hr-separador"></hr>
                <h1 className="text-data"  style={{ textDecorationLine: 'underline' }}>
                    Continuar y rellenar datos manualmente
                </h1>
                <div className="div-buttonCont">
                    <ClarkeButton className="cb-continuar" text={"Continuar sin buscar mis datos"} type={IS_POPUP} size={"1em"} click_effect={handleCancel}>
                    </ClarkeButton>
                </div>

                {
                    isWaiting ? (
                        <div style={{position: "absolute", width: "100%", height: "100%", top: "0", left: "0", display: "flex", alignItems:"center", justifyContent: "center", backgroundColor: "white", borderRadius: ".5em", gap: ".4em"}}>
                            <h1>Estamos buscando tu usuario</h1>
                            <div className="dot-wrap">
                                <div className="dot dot1"></div>
                                <div className="dot dot2"></div>
                                <div className="dot dot3"></div>
                            </div>
                        </div>
                    )
                    : <></>
                }
                
            </div> 
        )
    
}

export { Content_popUp };