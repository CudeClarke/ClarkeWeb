import React, { useState } from 'react';
import '../styles/SelectButton.css';

const EVENT_TYPES = ["Carrera", "Rifa", "Concierto", "Otro"];

function SelectButton({ handleConfirm }) {
    const [selected, setSelected] = useState(null);

    // Función inteligente para marcar o desmarcar
    const handleOptionClick = (type) => {
        if (selected === type) {
            setSelected(null); // Si ya estaba marcado, lo quitamos
        } else {
            setSelected(type); // Si era otro (o ninguno), lo marcamos
        }
    };

    return (
        <div className="select-event-type-container">
            <h3 className="select-event-title">Selecciona el tipo de evento</h3>

            <div className="event-options-list">
                {EVENT_TYPES.map((type) => (
                    <label 
                        key={type} 
                        className={`event-option-label ${selected === type ? 'selected' : ''}`}
                        // Usamos onClick en el label completo para mejor experiencia de usuario
                        onClick={(e) => {
                            e.preventDefault(); // Evita doble clic nativo del input
                            handleOptionClick(type);
                        }}
                    >
                        <input
                            type="radio"
                            name="eventType"
                            value={type}
                            checked={selected === type}
                            readOnly // Lo controlamos nosotros manualmente arriba
                            className="event-option-input"
                        />
                        <span className="custom-radio-button"></span>
                        <span className="option-text">{type}</span>
                    </label>
                ))}
            </div>

            <div className="button-container">
                <button 
                    className="confirm-button" 
                    onClick={() => handleConfirm(selected)}
                    disabled={!selected} // Se deshabilita si selected es null
                >
                    CONFIRMAR
                </button>
            </div>
        </div>
    );
}

export default SelectButton;