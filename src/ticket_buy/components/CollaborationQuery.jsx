import { ClarkeButton, IS_CONFIRM } from "../../generic/components/Button.jsx";
import { CampoTexto } from "../../generic/components/CampoTexto.jsx";
import '../styles/CollaborationQuery.css'
import imagen_girasol from '/girasol.png'
function CollaborationQuery(){
    return <div className="collaboration-query-container">

        <div className="collaboration-query-left">
            <div className="collaboration-query-interactive">
                <CampoTexto nombre={"COLABORAR CON CUDECA"} placeholder={"10€"} obligatorio={0}></CampoTexto>
                <ClarkeButton text={"REALIZAR DONACION"} type={IS_CONFIRM} size={"1em"}></ClarkeButton>
            </div>

            <p>Al realizar una donación los fondos serán enviados íntegramente a la fundación Cudeca y serán utilizados para mejorar los servicios prestados a nuestros mayores. Esta donación es opcional. Se generará un certificado de donación que se entregará en caso de desearse.</p>
        </div>

        <div className="collaboration-query-img-wrap">
            <img className="collaboration-query-img" src={imagen_girasol} alt="girasol cudeca"></img>
        </div>
    </div>
}

export default CollaborationQuery;