import { Children } from 'react';
import '../styles/PopUp.css'

function PopUp({children}){
    return <div className="cover">
        <div className='pop-up'>
            {children}
        </div>
    </div>
}

export {PopUp};