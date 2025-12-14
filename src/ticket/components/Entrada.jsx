import "../styles/Entrada.css"
import logoCudeca from '../assets/Logo.png'
/*
  -nombreEvento: nombre del evento
  -imagen: imagen de fondo de la entrada
  -propietarioNombre: nombre de la persona a la que esta destinada la entrada
  -propietarioApellidos: apellidos de la persona
  -qr: qr de la entrada
  -extraInfo: informacion extra del evento(como el asiento)
  -idEntrada: codigo alfanumerico identificador de la entrada
*/

function Entrada({nombreEvento,imagen,propietarioNombre,propietarioApellidos,qr,extraInfo,idEntrada}){


  return <div className="div-entrada" style={{ backgroundImage: `url(${imagen})` }}>
      <div className="Contenido">
        <div className="primeraFila">
          <div className="texto">
            <div className="nombreEvento">
              <p>{nombreEvento}</p>
            </div>
            <div className="filaDatos">  
              <div className="nombrePersona">
                <p>{propietarioApellidos},</p><p>{propietarioNombre}</p>
              </div>
              <div className="extraDatos">
                <p>{extraInfo}</p>
              </div>
            </div>
          </div>
          <div className="qr">
            <img src={qr} alt="QR"/>
          </div>
        </div>
        
        <div className="patrocinadores">
          <img src={logoCudeca} alt="patro1" />
          <img src="https://design.penpot.app/assets/by-file-media-id/fffce8d7-4b40-8153-8007-213fdf8b6d92" alt="patro2" />
          <img src="https://design.penpot.app/assets/by-file-media-id/fffce8d7-4b40-8153-8007-214195f73e12" alt="patro3" />
        </div>
        <div className="idEntrada">
          <p>{idEntrada}</p>
        </div>
      </div>
    </div>

}

export {Entrada};
