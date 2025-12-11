import '../styles/PopUp.css'
import { Accessibility_button, IS_OFF, IS_ON } from '../../ticket_buy/components/Accessibility_button';

const IS_CONTINUE_PU = 0, IS_ACCESSIBILITY = 1, IS_LOADING = 2, IS_ACCESSIBILITY_OFF = 3;

function PopUp({children, type}){
    if(type == 0){
        return <div className="cover">
            <div className='pop-up'>
                {children}
            </div>
        </div>
    }else if(type == 1){
         return <div className="cover">
            <div className='pop-up-access'>
                {children}
            </div>
            <polygon className="polygon-square">
                <Accessibility_button type={IS_OFF}></Accessibility_button>
            </polygon>
        </div>
    }else if(type == 2){
        return <div className="cover">
            <h1 style={{color:'white'}}>
                Cargando ...
            </h1>
        </div>
    }else if(type == 3){
        return <div className="cover">
            <div className='pop-up-access'>
                {children}
            </div>
            <polygon className="polygon-square">
                <Accessibility_button type={IS_ON}></Accessibility_button>
            </polygon>
        </div>
    }
    return null;
    
}

export {PopUp, IS_CONTINUE_PU, IS_ACCESSIBILITY, IS_LOADING, IS_ACCESSIBILITY_OFF };