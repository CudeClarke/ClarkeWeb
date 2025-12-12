import { useEffect } from 'react';
import '../styles/PopUp.css'
import { createPortal } from 'react-dom';

function PopUp({children}){
    const removeScroll = (e)=>{e.preventDefault()};
    useEffect(()=>{
        document.body.style.overflow = "hidden";
        return ()=>document.body.style.overflow="";
    }, [])

    return createPortal(<div className="cover">
        <div className='pop-up'>
            {children}
        </div>
    </div>,
    document.body)
}

export {PopUp};