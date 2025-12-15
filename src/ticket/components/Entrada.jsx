import "../styles/Entrada.css"
import imagen_qr from '../assets/imagen_qr.png'
/*
  -nombreEvento: nombre del evento
  -imagen: imagen de fondo de la entrada
  -propietarioNombre: nombre de la persona a la que esta destinada la entrada
  -propietarioApellidos: apellidos de la persona
  -qr: qr de la entrada
  -extraInfo: informacion extra del evento(como el asiento)
  -idEntrada: codigo alfanumerico identificador de la entrada
*/

function Entrada({nombreEvento,imagen,propietarioNombre,extraInfo,idEntrada, patros}){

  return <div className="div-entrada" style={{ backgroundImage: `url(${imagen})` }}>
      <div className="Contenido">
        <div className="primeraFila">
          <div className="texto">
            <div className="nombreEvento">
              <p>{nombreEvento}</p>
            </div>
            <div className="filaDatos">  
              <div className="nombrePersona">
                <p>{propietarioNombre}</p>
              </div>
              <div className="extraDatos">
                <p>{extraInfo}</p>
              </div>
            </div>
          </div>
          <div className="qr">
            <img src={imagen_qr} alt="QR"/>
          </div>
        </div>
        
        <div className="patrocinadores">
          {
          patros.map(patrocinador=>{
            return <img src={patrocinador.logo} alt={patrocinador.name}></img>
          })}
        </div>
        <div className="idEntrada">
          <p>{idEntrada}</p>
        </div>
      </div>
    </div>

}

export {Entrada};
