import React, { useState } from 'react';
import TicketBuyDeploy from '../../ticket_buy/components/TicketBuyDeploy.jsx';
import SelectEventType from './SelectButton.jsx';
import '../styles/EventCreateApp.css';

// URL de ejemplo de la flor. Sustitúyela por tu imagen local o URL correcta.
const SUNFLOWER_IMAGE_URL = "https://design.penpot.app/assets/by-file-media-id/fffce8d7-4b40-8153-8007-1ee51353b673"; 

function EventCreateApp() {
    const [activeStep, setActiveStep] = useState(0); 
    const [eventType, setEventType] = useState(null);

    return (
        <div className="three-column-layout">
            
            {/* 1. COLUMNA IZQUIERDA (Margen Izquierdo) */}
            <div className="layout-column left-column">
                {/* Aquí puedes poner algo en el futuro si quieres, de momento vacío */}
            </div>

            {/* 2. COLUMNA CENTRAL (Contenido) */}
            {/* Esta columna tendrá los bordes verdes a los lados */}
            <div className="layout-column center-column">
                
                <TicketBuyDeploy 
                    name="Seleccionar tipo de evento" 
                    isSelected={activeStep === 0}
                    handleHeaderClick={() => setActiveStep(0)}
                >
                    <SelectEventType 
                        handleConfirm={(selectedType) => {
                            setEventType(selectedType);
                            setActiveStep(1); 
                        }}
                    />
                </TicketBuyDeploy>

                <TicketBuyDeploy 
                    name="Datos Evento" 
                    isSelected={activeStep === 1}
                    handleHeaderClick={() => {
                        if(eventType) setActiveStep(1);
                    }}
                >
                   <div style={{padding: "20px"}}>Contenido de Datos del Evento...</div>
                </TicketBuyDeploy>

                <TicketBuyDeploy 
                    name="Verificar Evento" 
                    isSelected={activeStep === 2}
                    handleHeaderClick={() => {
                        if(eventType && activeStep >= 1) setActiveStep(2);
                    }}
                >
                   <div style={{padding: "20px"}}>Contenido de Verificación...</div>
                </TicketBuyDeploy>

            </div>

            {/* 3. COLUMNA DERECHA (Margen Derecho + Flor) */}
            <div className="layout-column right-column">
                <div className="flower-container">
                    <img src={SUNFLOWER_IMAGE_URL} alt="Girasol" className="flower-img" />
                </div>
            </div>

        </div>
    );
}

export default EventCreateApp;