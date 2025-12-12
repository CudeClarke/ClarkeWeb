import React, { useState } from 'react';
// Asegúrate de que la ruta a CampoTexto es correcta según tu estructura
import { CampoTexto } from "../../generic/components/CampoTexto";
import '../styles/FormularioCarrera.css';
import CampoAdjunto from "../../generic/components/CampoAdjunto"; 
import { IS_ERROR } from "../../generic/components/Alert"; // Importamos la constante de error

function FormularioCarrera({ onFormSubmit, triggerAlert, onBackClick }) {
    // --- ESTADOS ---

    // 1. Datos principales del evento
    const [mainData, setMainData] = useState({
        nombre: '',
        fecha: '',
        localizacion: '',
        hora: '',
        recaudacion: '',
        dorsales: '',
        descripcion: '',
        imagen: ''
    });

    // --- HANDLERS ---

    // Maneja cambios en los campos principales
    const handleMainDataChange = (e, field) => {
        setMainData({ ...mainData, [field]: e.target.value });
    };

    // --- VALIDACIÓN Y ENVÍO ---

    const validateForm = () => {
        // Campos obligatorios: nombre, fecha, localizacion, dorsales, recaudacion, precio
        // Opcionales: descripcion, imagen
        const mandatoryFields = ['nombre', 'fecha', 'localizacion', 'hora', 'recaudacion', 'dorsales'];

        for (const field of mandatoryFields) {
            if (!mainData[field] || !mainData[field].trim()) {
                return false;
            }
        }
        return true;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            // Si todo está OK, enviamos los datos al padre
            onFormSubmit({ ...mainData });
        } else {
            // AQUÍ IRÁ TU COMPONENTE DE ALERTA GENÉRICO.
            triggerAlert(IS_ERROR, "Por favor, rellena todos los campos obligatorios (*)");
        }
    };

    
    const handleBack = () => {
        onBackClick({ ...mainData });
    }; 

    // Función para determinar si el campo es válido (tiene contenido)
    const isFieldValid = (field) => {
        const value = mainData[field];
        return !!value && typeof value === 'string' && value.trim().length > 0;
    };

    // --- RENDER ---
    return (
        <div className="form-rifa-container">

            {/* SECCIÓN 1: Datos Principales (Grid 2 columnas) */}
            <div className="form-grid">
                <div className={isFieldValid('nombre') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                    <CampoTexto className="ctxt"
                        nombre="NOMBRE" placeholder="Nombre" obligatorio="si"
                        value={mainData.nombre} hasValue={!!mainData.nombre}
                        handleChange={(e) => handleMainDataChange(e, 'nombre')}
                    />
                </div>
                <div className={isFieldValid('fecha') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                    <CampoTexto className="ctxt"
                        nombre="FECHA" placeholder="dd/mm/aaaa" obligatorio="si"
                        value={mainData.fecha} hasValue={!!mainData.fecha}
                        handleChange={(e) => handleMainDataChange(e, 'fecha')}
                    />
                </div>

                <div className={isFieldValid('localizacion') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                    <CampoTexto className="ctxt"
                        nombre="LOCALIZACION" placeholder="Dirección" obligatorio="si"
                        value={mainData.localizacion} hasValue={!!mainData.localizacion}
                        handleChange={(e) => handleMainDataChange(e, 'localizacion')}
                    />
                </div>
                <div className={isFieldValid('hora') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                    <CampoTexto className="ctxt"
                        nombre="HORA" placeholder="Hora del evento" obligatorio="si"
                        value={mainData.hora} hasValue={!!mainData.hora}
                        handleChange={(e) => handleMainDataChange(e, 'hora')}
                    />
                </div>
                <div className={isFieldValid('recaudacion') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                    <CampoTexto className="ctxt"
                        nombre="RECAUDACION" placeholder="Ingresos para recaudar" obligatorio="si"
                        value={mainData.recaudacion} hasValue={!!mainData.recaudacion}
                        handleChange={(e) => handleMainDataChange(e, 'recaudacion')}
                    />
                </div>
                <div className={isFieldValid('dorsales') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                    <CampoTexto className="ctxt"
                        nombre="NUMERO DE DORSALES" placeholder="Número de dorsales" obligatorio="si"
                        value={mainData.dorsales} hasValue={!!mainData.dorsales}
                        handleChange={(e) => handleMainDataChange(e, 'dorsales')}
                    />
                </div>
            </div>


            {/* SECCIÓN 2: Entradas Dinámicas */}
            <div className="additional-section">
                <h4 className="additional-section-title">Datos Adicionales</h4>
                <div className="form-grid">
                    <div className="div-descripcion">
                        <div className="div-campo">
                            <label htmlFor="descripcion">DESCRIPCIÓN</label><br />
                            <textarea
                                id="descripcion"
                                placeholder="Esto es una descripción"
                                value={mainData.descripcion}
                                onChange={(e) => handleMainDataChange(e, 'descripcion')}
                            />
                        </div>
                    </div>
                    <CampoAdjunto
                        nombre="IMAGEN" 
                        placeholder="Subir archivo adjunto" 
                        obligatorio="no"
                        value={mainData.imagen} 
                        handleChange={(e) => handleMainDataChange(e, 'imagen')}
                    />
                </div>
            </div>

            {/* SECCIÓN 3: BOTONES DE ACCIÓN (MODIFICADA) */}
            <div className="form-actions">
                <button className="back-button" onClick={handleBack}>
                    <strong><span style={{ color: 'green' }}>ATRAS</span></strong>
                </button>
                <button className="confirm-button" onClick={handleSubmit}>
                    CONFIRMAR DATOS
                </button>
            </div>
        </div>
    );
}

export default FormularioCarrera;