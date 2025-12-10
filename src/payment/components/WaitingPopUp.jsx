import {PopUp} from '../../generic/components/PopUp.jsx'
import '../styles/WaitingPopUp.css'

function WaitingPopUp(){
    return <PopUp>
        <div>
            <div className="waiting-pop-up-container">
                <div className="waiting-pop-up-card"></div>
                <h1>Estamos procesando su pago…</h1>
            </div>
        </div>
    </PopUp>
}

export default WaitingPopUp;