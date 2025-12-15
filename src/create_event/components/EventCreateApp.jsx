import React, { useState } from 'react';
import TicketBuyDeploy from '../../ticket_buy/components/TicketBuyDeploy.jsx';
import SelectButton from './SelectButton.jsx';
import '../styles/EventCreateApp.css';
import FormularioConcierto from './FormularioConcierto.jsx';
import FormularioRifa from './FormularioRifa.jsx';
import FormularioCarrera from './FormularioCarrera.jsx';
import FormularioOtro from './FormularioOtro.jsx';
import { Alert, IS_OK, IS_ERROR } from '../../generic/components/Alert.jsx';
import EventSummary from './EventSummary.jsx';
import { uploadEvent } from '../utils/api/api_functions.js';
import imagen_concierto from '../assets/imagen-concierto.png'
import imagen_rifa from '../assets/imagen-rifa.png'
import imagen_carrera from '../assets/imagen-carrera.png'
import imagen_generico from '/girasol.png'
// --- CONFIGURACIÓN DE IMÁGENES ---
const EVENT_IMAGES = {
    default: imagen_generico,
    Carrera: imagen_carrera,
    Rifa: imagen_rifa,
    Concierto: imagen_concierto,
    Otro: imagen_generico
};

function EventCreateApp() {
    const [isActive, setActive] = useState(0);
    const [eventData, setEventData] = useState({
        type: null,
        details: null
    });

    const [alertInfo, setAlert] = useState({ status: null, msg: "" });

    const showAlert = (status, msg) => {
        setAlert({ status, msg });
        setTimeout(() => {
            setAlert({ status: null, msg: "" });
        }, 4000);
    };

    const currentSideImage = eventData.type && EVENT_IMAGES[eventData.type]
        ? EVENT_IMAGES[eventData.type]
        : EVENT_IMAGES.default;

    const handleFormSuccess = (formData) => {
        setEventData({ ...eventData, details: formData });
        setActive(2);
        showAlert(IS_OK, "Datos del evento guardados correctamente");
    };

    const handleBack = () => {
        setActive(0);
        setEventData({ type: null, details: null });
        showAlert(IS_OK, "Volviendo al inicio.");
    };

    const handleBackToForm = () => {
        setActive(1);
    };

    const handleFinalSubmit = async () => {
        try {
            const fullEventData = { ...eventData.details, type: eventData.type };
            const status = await uploadEvent(fullEventData);

            if (!status) {
                showAlert(IS_ERROR, "Error al crear el evento. Inténtelo más tarde.");
            } else {
                showAlert(IS_OK, "¡Evento creado con éxito!");
                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);
            }
        } catch (error) {
            console.error(error);
            showAlert(IS_ERROR, "Error de conexión.");
        }
    };

    return (
        <div className="three-column-layout">

            <div className="left-column"></div>

            <div className="center-column">

                {/* PASO 0 */}
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
                                showAlert(IS_OK, "Tipo seleccionado: " + selectedType);
                            }}
                        />
                    </TicketBuyDeploy>
                </div>


                {/* PASO 1: DATOS */}
                <div className={`deploy-wrapper ${isActive === 1 ? 'expanded' : ''}`}>
                    <TicketBuyDeploy
                        name="Datos Evento"
                        isSelected={isActive === 1}
                        handleHeaderClick={() => {
                            if (eventData.type !== null && isActive !== 1) setActive(1);
                        }}
                    >
                        <div style={{ padding: "20px" }}>
                            {/* AQUÍ ES DONDE AÑADIMOS initialData={eventData.details} */}
                            
                            {eventData.type === "Concierto" && (
                                <FormularioConcierto 
                                    onFormSubmit={handleFormSuccess} 
                                    triggerAlert={showAlert}
                                    initialData={eventData.details} 
                                />
                            )}
                            {eventData.type === "Carrera" && (
                                <FormularioCarrera 
                                    onFormSubmit={handleFormSuccess} 
                                    triggerAlert={showAlert} 
                                    onBackClick={handleBack}
                                    initialData={eventData.details}
                                />
                            )}
                            {eventData.type === "Rifa" && (
                                <FormularioRifa 
                                    onFormSubmit={handleFormSuccess} 
                                    triggerAlert={showAlert} 
                                    onBackClick={handleBack} 
                                    initialData={eventData.details}
                                />
                            )}
                            {eventData.type === "Otro" && (
                                <FormularioOtro 
                                    onFormSubmit={handleFormSuccess} 
                                    triggerAlert={showAlert} 
                                    initialData={eventData.details}
                                />
                            )}
                        </div>
                    </TicketBuyDeploy>
                </div>


                {/* PASO 2: VERIFICAR */}
                <div className={`deploy-wrapper ${isActive === 2 ? 'expanded' : ''}`}>
                    <TicketBuyDeploy
                        name="Verificar Evento"
                        isSelected={isActive === 2}
                        handleHeaderClick={() => {
                            if (eventData.type && eventData.details && isActive !== 2) setActive(2);
                        }}
                    >
                        <div className="event-app-event-resume">
                            <EventSummary 
                                eventData={eventData} 
                                onFinalSubmit={handleFinalSubmit}
                                onBack={handleBackToForm}
                            />
                        </div>
                    </TicketBuyDeploy>
                </div>

            </div>

            <div className="right-column">
                <div className="flower-container">
                    <img src={currentSideImage} alt="Decoración lateral" className="flower-img" />
                </div>
            </div>

            {alertInfo.status !== null && (
                <Alert type={alertInfo.status} msg={alertInfo.msg} />
            )}

        </div>
    );
}

export default EventCreateApp;