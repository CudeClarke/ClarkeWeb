import { CampoTexto } from "../../generic/components/CampoTexto"
import '../styles/GuestForm.css'

function GuestForm({data, setData}){
    return (<div className="guest-form-wrap">
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
            </div>)
}

export default GuestForm;