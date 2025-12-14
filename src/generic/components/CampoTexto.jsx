import "../styles/CampoTexto.css"

function CampoTexto({nombre, placeholder, obligatorio, value, hasValue = false, handleChange = ()=>{}}){
  var text = ''
  if (obligatorio === 'si'){
    text = '*'
  }


  return <div className="div-campo">
    <label htmlFor="campo">{nombre}</label><p>{text}</p><br/>
    <input id="campo" type="text" style={{width: "20%",height: "25px"}}  placeholder = {placeholder} value={hasValue ? value : undefined} onChange={handleChange}></input>
    </div>

}

export {CampoTexto};
