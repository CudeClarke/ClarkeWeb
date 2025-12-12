import { CampoTexto } from "../../generic/components/CampoTexto"
import { ClarkeButton, IS_CONFIRM } from "../../generic/components/Button"
import '../styles/UserDataAccessiblePopUpContent.css'
import { Accessibility_button, IS_ON } from "./Accessibility_button";

function UserDataAccessiblePopUpContent({title, placeholder, value, handleChangeField, handleContinue, exitAccessible}){
    return <div className="user-data-pop-up">
        <h1 className="user-data-pop-up-title">{title}</h1>
        <CampoTexto 
            nombre={""} 
            placeholder={placeholder}
            obligatorio={"no"}
            value={value}
            hasValue
            handleChange={handleChangeField}
        ></CampoTexto>

        <ClarkeButton text={"Siguiente"} type={IS_CONFIRM} size={"1em"} click_effect={handleContinue}></ClarkeButton>
        <div className="user-data-access-button-wrap" onClick={()=>exitAccessible()}>
            <Accessibility_button type={IS_ON}></Accessibility_button>
        </div>
    </div>
}

export default UserDataAccessiblePopUpContent;