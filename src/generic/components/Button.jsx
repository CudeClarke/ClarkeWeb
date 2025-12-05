
import '../styles/Button.css'

const IS_CONFIRM = 0, IS_MOREINFO = 1, IS_RETURN = 2, IS_HEADER = 3;

function ClarkeButton({text, type, size, click_effect = ()=>{}}){

    const map_class_type = ["confirm-button", "more-info-button", "return-button", "header-button"]

    const classnames = "button " + map_class_type[type];    
        
    return <button style={{ fontSize: size}} className={classnames} onClick={()=>{click_effect()}}>{text}</button>

}

export { ClarkeButton, IS_CONFIRM, IS_MOREINFO, IS_RETURN, IS_HEADER };
