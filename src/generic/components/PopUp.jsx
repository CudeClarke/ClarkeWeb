import '../styles/PopUp.css'
import { createPortal } from 'react-dom';

function PopUp({children}){
    return createPortal(<div className="cover">
        <div className='pop-up'>
            {children}
        </div>
    </div>,
    document.body)
}

export {PopUp};