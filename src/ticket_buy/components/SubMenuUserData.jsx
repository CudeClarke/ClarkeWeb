import { useState } from 'react';
import {CampoTexto} from '../../generic/components/CampoTexto'
import { ClarkeButton, IS_CONFIRM, IS_RETURN } from '../../generic/components/Button';
import '../styles/SubMenuUserData.css'
import {PopUp} from '../../generic/components/PopUp'
import UserDataAccessiblePopUpContent from './UserDataAccessiblePopUpContent';

function SubMenuUserData({handleConfirm, handleReturn, isAccessible}){

    const [data, setData] = useState({name: "", surname: "", email: "", dni: "", tlf: "", address: "", postal_code: "", spam: false, consent: false, partner: false})

    const [accessibleStep, setAccessibleStep] = useState(0);

    const fieldsForPopUp = [
        {
            title: "Introduzca su nombre", 
            placeholder: "Nombre", 
            handleChangeField: (e)=>setData({...data, name: e.target.value}),
            handleContinue: ()=>{setAccessibleStep(1);setData({...data, consent: true});}
        },
        {
            title: "Introduzca sus apellidos", 
            placeholder: "Apellidos", 
            handleChangeField: (e)=>setData({...data, surname: e.target.value}),
            handleContinue: ()=>setAccessibleStep(2)
        },
        {
            title: "Introduzca su correo electrónico", 
            placeholder: "correo@ejemplo.com", 
            handleChangeField: (e)=>setData({...data, email: e.target.value}),
            handleContinue: ()=>setAccessibleStep(3)
        },
        {
            title: "Introduzca su dni", 
            placeholder: "12345678A", 
            handleChangeField: (e)=>setData({...data, dni: e.target.value}),
            handleContinue: ()=>{
                handleConfirm(data)
                setAccessibleStep(0);
            }
        }]

    return (
    <>
        <div className='sub-menu-user-data-wrap'>
            <div className='sub-menu-user-data-half'>
                <h1>Datos Básicos</h1>
                <div className="sub-menu-user-data-grid">
                    <CampoTexto 
                        nombre="NOMBRE" 
                        placeholder="Nombre" 
                        obligatorio="si" 
                        handleChange={
                            (e) => 
                            {
                                const newData = {...data}
                                newData.name = e.target.value
                                setData(newData)
                            }
                        }
                        value={data.name}
                        hasValue
                    />
                    <CampoTexto 
                        nombre="APELLIDOS" 
                        placeholder="Apellidos" 
                        obligatorio="si"
                        handleChange={
                            (e) => 
                            {
                                const newData = {...data}
                                newData.surname = e.target.value
                                setData(newData)
                            }
                        }
                        value={data.surname}
                        hasValue
                    />
                    <CampoTexto 
                        nombre="EMAIL" 
                        placeholder="correo@ejemplo.es" 
                        obligatorio="si"
                        handleChange={
                            (e) => 
                            {
                                const newData = {...data}
                                newData.email = e.target.value
                                setData(newData)
                            }
                        }
                        value={data.email}
                        hasValue
                    />
                    <CampoTexto 
                        nombre="DNI" 
                        placeholder="12345678A" 
                        obligatorio="si" 
                        handleChange={
                            (e) => 
                            {
                                const newData = {...data}
                                newData.dni = e.target.value
                                setData(newData)
                            }
                        }
                        value={data.dni}
                        hasValue
                    />
                </div>
                <div className='sub-menu-user-data-checkbox-wrap'>
                    <input 
                        onChange={()=>{
                            const newData = {...data};
                            newData.spam = !newData.spam;
                            setData(newData)
                        }} 
                        type='checkbox' 
                        id='spam' 
                        className='sub-menu-user-data-checkbox'
                        /> 
                    <label className='sub-menu-user-data-checkbox-label' htmlFor="spam">Quiero recibir más información sobre cudeca</label>
                </div>
            </div>
            

            <div className='sub-menu-user-data-half'>
                <h1>Datos Adicionales</h1>
                <div className="sub-menu-user-data-grid sub-menu-user-data-extra-data">
                    <CampoTexto 
                        nombre="TELÉFONO" 
                        placeholder="000-00-00-00" 
                        obligatorio="no" 
                        handleChange={
                            (e) => 
                            {
                                const newData = {...data}
                                newData.tlf = e.target.value
                                setData(newData)
                            }
                        }
                        value={data.tlf}
                        hasValue
                    />
                    <CampoTexto 
                        nombre="DIRECCIÓN" 
                        placeholder="Dirección Completa" 
                        obligatorio="no" 
                        handleChange={
                            (e) => 
                            {
                                const newData = {...data}
                                newData.address = e.target.value
                                setData(newData)
                            }
                        }
                        value={data.address}
                        hasValue
                    />
                    <CampoTexto 
                        nombre="CÓDIGO POSTAl" 
                        placeholder="Código Postal" 
                        obligatorio="no" 
                        handleChange={
                            (e) => 
                            {
                                const newData = {...data}
                                newData.postal_code = e.target.value
                                setData(newData)
                            }
                        }
                        value={data.postal_code}
                        hasValue
                    />
                    <div className='sub-menu-user-data-extra-checkbox'>
                        <div className='sub-menu-user-data-checkbox-wrap'>
                            <input 
                                onChange={()=>{
                                    const newData = {...data};
                                    newData.consent = !newData.consent;
                                    setData(newData)
                                }} 
                                type='checkbox' 
                                id='spam' 
                                className='sub-menu-user-data-checkbox'
                                /> 
                            <label className='sub-menu-user-data-checkbox-label' htmlFor="spam">Consiento el tratamiento de mis datos por Cudeca</label>
                            <p>*</p>
                        </div>

                        <div className='sub-menu-user-data-checkbox-wrap'>
                            <input 
                                onChange={()=>{
                                    const newData = {...data};
                                    newData.partner = !newData.partner;
                                    setData(newData)
                                }} 
                                type='checkbox' 
                                id='spam' 
                                className='sub-menu-user-data-checkbox'
                                /> 
                            <label className='sub-menu-user-data-checkbox-label' htmlFor="spam">Quiero ser socio de Cudeca</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='sub-menu-user-data-buttons'>
                <ClarkeButton text={"Volver"} type={IS_RETURN} size={"1em"} click_effect={()=>handleReturn()}></ClarkeButton>
                <ClarkeButton 
                    text={"Continuar"} 
                    type={IS_CONFIRM} 
                    size={"1em"} 
                    click_effect={()=>{handleConfirm(data)}} //this function is for testing yet. TODO checking fields and sending them to server
                ></ClarkeButton>
            </div>
        </div>

        {
            isAccessible && (

                <PopUp>
                    <UserDataAccessiblePopUpContent
                        title={fieldsForPopUp[accessibleStep].title}
                        placeholder={fieldsForPopUp[accessibleStep].placeholder}
                        value={accessibleStep == 0 ? data.name : accessibleStep == 1 ? data.surname : accessibleStep == 2 ? data.email : data.dni}
                        handleChangeField={fieldsForPopUp[accessibleStep].handleChangeField}
                        handleContinue={fieldsForPopUp[accessibleStep].handleContinue}
                    >

                    </UserDataAccessiblePopUpContent>
                </PopUp>

            )
        }
    </>)
}

export default SubMenuUserData;