import { CampoTexto } from "../../generic/components/CampoTexto"
import { ClarkeButton, IS_CONFIRM } from "../../generic/components/Button"
import '../styles/UserDataAccessiblePopUpContent.css'

function UserDataAccessiblePopUpContent({title, placeholder, value, handleChangeField, handleContinue}){
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
    </div>
}

export default UserDataAccessiblePopUpContent;