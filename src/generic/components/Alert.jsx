import { useState } from "react";
import "../styles/Alert.css"

const IS_OK = 0, IS_ERROR = 1;

function Alert({type, msg}){
    
    const [className, setClassName] = useState("alert-container")

    setTimeout(()=>{
        setClassName("alert-container alert-unactive")
    }, 3000)

    return (<div className={className}>
        <p>{type == IS_OK ? "✅" : "⛔" }</p>
        <p>{msg}</p>
    </div>);
}

export  {IS_OK, IS_ERROR, Alert};