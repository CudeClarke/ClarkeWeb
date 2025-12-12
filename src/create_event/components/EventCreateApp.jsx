import React, { useState } from 'react';
import TicketBuyDeploy from '../../ticket_buy/components/TicketBuyDeploy.jsx';
import SelectButton from './SelectButton.jsx';
import '../styles/EventCreateApp.css';
import FormularioConcierto from './FormularioConcierto.jsx';
import FormularioRifa from './FormularioRifa.jsx';
import { Alert, IS_OK, IS_ERROR } from '../../generic/components/Alert.jsx';

// --- CONFIGURACIÓN DE IMÁGENES ---
// Aquí debes poner las rutas reales a tus imágenes importadas o URLs.
const EVENT_IMAGES = {
    // Imagen por defecto (Girasol) cuando no hay nada seleccionado
    default: "https://design.penpot.app/assets/by-file-media-id/fffce8d7-4b40-8153-8007-1ee51353b673",

    // Las claves deben coincidir EXACTAMENTE con los 'value' de tus botones en SelectButton
    Carrera: "https://design.penpot.app/assets/by-file-media-id/fffce8d7-4b40-8153-8007-1ee49eb83d37",   // Foto de los corredores
    Rifa: "https://design.penpot.app/assets/by-file-media-id/fffce8d7-4b40-8153-8007-1ee4d13de7bd",         // Foto del bingo/rifa
    Concierto: "https://design.penpot.app/assets/by-file-media-id/fffce8d7-4b40-8153-8007-1ee4f4261631", // Foto del concierto
    Otro: "https://design.penpot.app/assets/by-file-media-id/fffce8d7-4b40-8153-8007-1ee51353b673" // Girasol u otra
};

function EventCreateApp() {
    // ESTADO
    const [isActive, setActive] = useState(0);
    const [eventData, setEventData] = useState({
        type: null,
        details: null
    });

    // --- ESTADO PARA LA ALERTA ---
    const [alertInfo, setAlert] = useState({ status: null, msg: "" });

    const showAlert = (status, msg) => {
        setAlert({ status, msg });
        // Limpiamos la alerta un poco después de que termine su animación interna (3000ms)
        setTimeout(() => {
            setAlert({ status: null, msg: "" });
        }, 4000);
    };

    // LÓGICA PARA ELEGIR LA IMAGEN ACTUAL
    // Si hay un tipo seleccionado, usa su imagen. Si no, usa la default.
    const currentSideImage = eventData.type && EVENT_IMAGES[eventData.type]
        ? EVENT_IMAGES[eventData.type]
        : EVENT_IMAGES.default;

    const handleFormSuccess = (formData) => {
        // Guardamos los datos recibidos del formulario
        setEventData({ ...eventData, details: formData });
        // Avanzamos al siguiente paso
        setActive(2);
        // ALERTA DE ÉXITO AL CONFIRMAR DATOS
        showAlert(IS_OK, "Datos del evento guardados correctamente");
    };

    const handleBack = () => {
        // 1. Volver al primer paso
        setActive(0);
        // 2. Opcional: Limpiar los datos del evento para que el usuario pueda empezar de cero
        setEventData({ type: null, details: null });
        // 3. Mostrar un mensaje de confirmación
        showAlert("Volviendo al paso de selección de tipo de evento.");
    };

    return (
        <div className="three-column-layout">

            <div className="left-column"></div>

            <div className="center-column">

                {/* --- PASO 0: WRAPPER --- */}
                {/* Si isActive es 0, este bloque crece y empuja a los de abajo al fondo */}
                <div className={`deploy-wrapper ${isActive === 0 ? 'expanded' : ''}`}>
                    <TicketBuyDeploy
                        name="Seleccionar tipo de evento"
                        isSelected={isActive === 0}
                        handleHeaderClick={() => {
                            if (isActive !== 0) {
                                setActive(0);
                                setEventData({ type: null, details: null });
                            }
                        }}
                    >
                        <SelectButton
                            handleConfirm={(selectedType) => {
                                setEventData({ ...eventData, type: selectedType });
                                setActive(1);
                                // ALERTA DE ÉXITO AL SELECCIONAR TIPO
                                showAlert(IS_OK, "Tipo de evento seleccionado: " + selectedType);
                            }}
                        />
                    </TicketBuyDeploy>
                </div>


                {/* --- PASO 1: WRAPPER --- */}
                {/* Si isActive es 1, este bloque crece. Empuja al Paso 2 al fondo */}
                <div className={`deploy-wrapper ${isActive === 1 ? 'expanded' : ''}`}>
                    <TicketBuyDeploy
                        name="Datos Evento"
                        isSelected={isActive === 1}
                        handleHeaderClick={() => {
                            if (eventData.type !== null && isActive !== 1) setActive(1);
                        }}
                    >
                        <div style={{ padding: "20px" }}>

                            {/* RENDERIZADO CONDICIONAL: SI ES CONCIERTO, MOSTRAMOS SU FORMULARIO */}
                            {eventData.type === "Concierto" && (
                                <FormularioConcierto onFormSubmit={handleFormSuccess} triggerAlert={showAlert} />
                            )}

                            {/* Resto de tipos (placeholders por ahora) */}
                            {eventData.type === "Carrera" && <p>Formulario Carrera en construcción...</p>}
                            {eventData.type === "Rifa" && (
                                <FormularioRifa onFormSubmit={handleFormSuccess} triggerAlert={showAlert} onBackClick={handleBack}/>
                            )}
                            {eventData.type === "Otro" && <p>Formulario Otro en construcción...</p>}

                            {/* NOTA: Hemos quitado el botón "CONFIRMAR DATOS" genérico de aquí,
                                porque ahora cada formulario tiene el suyo propio dentro. */}
                        </div>
                    </TicketBuyDeploy>
                </div>


                {/* --- PASO 2: WRAPPER --- */}
                {/* Si isActive es 2, este crece (aunque ya no hay nada debajo) */}
                <div className={`deploy-wrapper ${isActive === 2 ? 'expanded' : ''}`}>
                    <TicketBuyDeploy
                        name="Verificar Evento"
                        isSelected={isActive === 2}
                        handleHeaderClick={() => {
                            if (eventData.type && eventData.details && isActive !== 2) setActive(2);
                        }}
                    >
                        <div style={{ padding: "20px" }}>
                            <h3>Resumen: {eventData.type}</h3>
                            <button className="confirm-button">CREAR EVENTO</button>
                        </div>
                    </TicketBuyDeploy>
                </div>

            </div>

            <div className="right-column">
                <div className="flower-container">
                    <img src={currentSideImage} alt="Decoración lateral" className="flower-img" />
                </div>
            </div>

            {/* --- RENDERIZADO DE LA ALERTA --- */}
            {alertInfo.status !== null && (
                <Alert type={alertInfo.status} msg={alertInfo.msg} />
            )}

        </div>
    );
}

export default EventCreateApp;