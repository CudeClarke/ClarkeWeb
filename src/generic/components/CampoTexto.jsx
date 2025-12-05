import "../styles/CampoTexto.css"

function CampoTexto({nombre, placeholder, obligatorio}){
  var text = ''
  if (obligatorio === 'si'){
    text = '*'
  }


  return <div className="div-campo">
    <label for="campo">{nombre}</label><p>{text}</p><br/>
    <input id="campo" type="text" style={{width: "20%",height: "25px"}}  placeholder = {placeholder}></input>
    </div>

}

export {CampoTexto};
