import React, { useState } from 'react';
import { CampoTexto } from "../../generic/components/CampoTexto";
import '../styles/Formulario.css';
import CampoAdjunto from "../../generic/components/CampoAdjunto"; 
import { IS_ERROR } from "../../generic/components/Alert";

function FormularioRifa({ onFormSubmit, triggerAlert, initialData }) {
    
    // --- ESTADO 1: DATOS PRINCIPALES ---
    const [mainData, setMainData] = useState(initialData ? {
        nombre: initialData.nombre,
        date: initialData.date,
        ubicacion: initialData.ubicacion,
        objetivoRecaudacion: initialData.objetivoRecaudacion,
        premios: initialData.premios, // <--- NUEVO CAMPO
        descripcion: initialData.descripcion,
        url: initialData.url,
        tags: initialData.tags,
    } : {
        nombre: "",
        date: "",
        ubicacion: "",
        objetivoRecaudacion: "",
        premios: "", // <--- Inicializamos
        descripcion: "",
        url: "",
        tags: "",
    });

    // --- ESTADO 2: LISTA DE PAPELETAS/ENTRADAS (Recuperado) ---
    const [tickets, setTickets] = useState(
        (initialData && initialData.entradas) 
        ? initialData.entradas 
        : [{ id: Date.now(), nombre: '', subAforo: '', precio: '', descripcion: "" }]
    );

    // --- HANDLERS ---
    const handleMainDataChange = (e, field) => {
        setMainData({ ...mainData, [field]: e.target.value });
    };

    // Handler para los cambios en las papeletas
    const handleTicketChange = (e, id, field) => {
        const newTickets = tickets.map(ticket => {
            if (ticket.id === id) {
                return { ...ticket, [field]: e.target.value };
            }
            return ticket;
        });
        setTickets(newTickets);
    };

    // Añadir tipo de papeleta
    const addTicketType = () => {
        setTickets([...tickets, { id: Date.now(), nombre: '', subAforo: '', precio: '', descripcion: '' }]);
    };

    // Borrar tipo de papeleta
    const removeTicketType = () => {
        if (tickets.length <= 1) {
            triggerAlert(IS_ERROR, "Debe haber mínimo un tipo de papeleta/entrada");
            return;
        }
        const newTickets = [...tickets];
        newTickets.pop();
        setTickets(newTickets);
    };

    // --- VALIDACIÓN Y ENVÍO ---
    const validateEmptyFields = () => {
            for (const key in mainData) {
                if (key !== "url" && key !== "tags" && !mainData[key].trim()) return false;
            }
            if (tickets.length === 0) return false;
            for (const ticket of tickets) {
                if (!ticket.nombre.trim() || !ticket.subAforo.trim() || !ticket.precio.trim() || !ticket.descripcion.trim()) {
                    return false;
                }
            }
            return true;
        };
    
        const validateFormats = () => {
        // 1. Fecha
        const dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
        if (!dateRegex.test(mainData.date)) {
            triggerAlert(IS_ERROR, "El formato de la fecha debe ser aaaa-mm-dd");
            return false;
        }

        // 2. Números (Enteros o decimales)
        const numRegex = /^[0-9]+(\.[0-9]+)?$/;

        if (!numRegex.test(mainData.objetivoRecaudacion)) {
            triggerAlert(IS_ERROR, "El Objetivo de Recaudación debe ser un número válido");
            return false;
        }
        if (mainData.premios.split(' ').some(p=>!numRegex.test(p))) {
                triggerAlert(IS_ERROR, "Los premios deben ser una lista de números");
                return false;
            }

        for (const ticket of tickets) {
            if (!numRegex.test(ticket.subAforo)) {
                triggerAlert(IS_ERROR, "La Cantidad de entradas debe ser un número");
                return false;
            }
            if (!numRegex.test(ticket.precio)) {
                triggerAlert(IS_ERROR, "El Precio de las entradas debe ser un número");
                return false;
            }
        }

        return true;
    };
    
        const handleSubmit = () => {
            if (!validateEmptyFields()) {
                triggerAlert(IS_ERROR, "Por favor, rellena todos los campos obligatorios (*)");
                return;
            }
    
            if (!validateFormats()) {
                return; // La alerta ya salta dentro de la función
            }
            onFormSubmit({ ...mainData, entradas: tickets });
        };

    // Helpers visuales
    const isFieldValid = (field) => {
        const value = mainData[field];
        return !!value && typeof value === 'string' && value.trim().length > 0;
    };
    
    const isTicketFieldValid = (ticket, field) => {
        const value = ticket[field];
        return !!value && typeof value === 'string' && value.trim().length > 0;
    };

    // --- RENDER ---
    return (
        <div className="form-concierto-container">

            {/* SECCIÓN 1: DATOS PRINCIPALES */}
            <div className="form-grid">
                <div className={isFieldValid('nombre') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                    <CampoTexto nombre="NOMBRE" placeholder="Nombre de la Rifa" obligatorio="si" value={mainData.nombre} hasValue={!!mainData.nombre} handleChange={(e) => handleMainDataChange(e, 'nombre')} />
                </div>
                <div className={isFieldValid('date') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                    <CampoTexto nombre="FECHA SORTEO" placeholder="aaaa-mm-dd" obligatorio="si" value={mainData.date} hasValue={!!mainData.date} handleChange={(e) => handleMainDataChange(e, 'date')} />
                </div>

                <div className={isFieldValid('ubicacion') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                    <CampoTexto nombre="LOCALIZACION" placeholder="Lugar del sorteo" obligatorio="si" value={mainData.ubicacion} hasValue={!!mainData.ubicacion} handleChange={(e) => handleMainDataChange(e, 'ubicacion')} />
                </div>
                <div className={isFieldValid('objetivoRecaudacion') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                    <CampoTexto nombre="OBJ. RECAUDACION (€)" placeholder="Ingresos previstos" obligatorio="si" value={mainData.objetivoRecaudacion} hasValue={!!mainData.objetivoRecaudacion} handleChange={(e) => handleMainDataChange(e, 'objetivoRecaudacion')} />
                </div>

                {/* FILA: TAGS (Izq) e IMAGEN (Der) */}
                <div className={isFieldValid('tags') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                    <CampoTexto
                        nombre="TAGS" placeholder="tag1 tag2 tag3" obligatorio="si"
                        value={mainData.tags} hasValue={!!mainData.tags}
                        handleChange={(e) => handleMainDataChange(e, 'tags')}
                    />
                </div>
                
                <CampoAdjunto
                    nombre="IMAGEN" 
                    placeholder="Subir archivo adjunto" 
                    obligatorio="no"
                    value={mainData.url} 
                    handleChange={(e) => handleMainDataChange(e, 'url')}
                />

                {/* DESCRIPCIÓN */}
                <div className="div-descripcion" style={{ marginTop: '0px', gridColumn: 'span 1' }}>
                     <div className="div-campo">
                        <label htmlFor="descripcion">DESCRIPCIÓN*</label><br />
                        <textarea
                            id="descripcion"
                            placeholder="Descripción de la rifa..."
                            value={mainData.descripcion}
                            onChange={(e) => handleMainDataChange(e, 'descripcion')}
                            style={{resize:'none'}}
                        />
                    </div>
                </div>

                <div className={isFieldValid('premios') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                    <CampoTexto nombre="Premios" placeholder="1 2 3 4..." obligatorio="si" value={mainData.premios} hasValue={!!mainData.premios} handleChange={(e) => handleMainDataChange(e, 'premios')} />
                </div>

            </div>

            {/* SECCIÓN 2: TIPOS DE PAPELETA (Dinámico) */}
            <div className="tickets-section">
                {tickets.map((ticket, index) => (
                    <div key={ticket.id} className="ticket-block">
                        <h4 className="ticket-section-title">Tipo de Papeleta {index + 1}</h4>
                        <div className="form-grid">
                            <div className={isTicketFieldValid(ticket, 'nombre') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                                <CampoTexto
                                    nombre="NOMBRE" placeholder="Ej: Papeleta Individual" obligatorio="si"
                                    value={ticket.nombre} hasValue={!!ticket.nombre}
                                    handleChange={(e) => handleTicketChange(e, ticket.id, 'nombre')}
                                />
                            </div>
                            <div className={isTicketFieldValid(ticket, 'subAforo') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                                <CampoTexto
                                    nombre="CANTIDAD" placeholder="Ej: 1000" obligatorio="si"
                                    value={ticket.subAforo} hasValue={!!ticket.subAforo}
                                    handleChange={(e) => handleTicketChange(e, ticket.id, 'subAforo')}
                                />
                            </div>
                            <div className={isTicketFieldValid(ticket, 'precio') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                                <CampoTexto
                                    nombre="PRECIO" placeholder="Ej: 2€" obligatorio="si"
                                    value={ticket.precio} hasValue={!!ticket.precio}
                                    handleChange={(e) => handleTicketChange(e, ticket.id, 'precio')}
                                />
                            </div>
                            <div className={isTicketFieldValid(ticket, 'descripcion') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                                <CampoTexto
                                    nombre="DESCRIPCIÓN" placeholder="Detalles..." obligatorio="si"
                                    value={ticket.descripcion} hasValue={!!ticket.descripcion}
                                    handleChange={(e) => handleTicketChange(e, ticket.id, 'descripcion')}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* SECCIÓN 3: BOTONES DE ACCIÓN */}
            <div className="form-actions">
                <div className="buttons-left-group">
                    <button className="add-ticket-button" onClick={addTicketType}>
                        <span className="plus-icon">+</span> Añadir tipo
                    </button>
                    <button className="delete-ticket-button" onClick={removeTicketType}>
                        <span className="plus-icon">-</span> Borrar tipo
                    </button>
                </div>
                <button className="confirm-button" onClick={handleSubmit}>
                    CONFIRMAR DATOS
                </button>
            </div>
        </div>
    );
}

export default FormularioRifa;