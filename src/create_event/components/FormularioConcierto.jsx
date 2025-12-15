import React, { useState } from 'react';
// Asegúrate de que la ruta a CampoTexto es correcta según tu estructura
import { CampoTexto } from "../../generic/components/CampoTexto";
import '../styles/Formulario.css';
import CampoAdjunto from "../../generic/components/CampoAdjunto"; 
import { IS_ERROR } from "../../generic/components/Alert"; // Importamos la constante de error

function FormularioConcierto({ onFormSubmit, triggerAlert, initialData }) {
    // --- ESTADOS ---

    // 1. Datos principales del evento
    const [mainData, setMainData] = useState(initialData ? {
            nombre: initialData.nombre,
            ubicacion: initialData.ubicacion,
            objetivoRecaudacion: initialData.objetivoRecaudacion,
            descripcion: initialData.descripcion,
            date: initialData.date,
            url: initialData.url,
            artista: initialData.artista,
            tags: initialData.tags,
        } : {
        nombre: "",
        ubicacion: "",
        objetivoRecaudacion: "",
        descripcion: "",
        date: "",
        url: "",
        artista: "",
        tags: '',
    });

    // 2. Lista de tipos de entradas (empezamos con una por defecto)
    const [tickets, setTickets] = useState([
        { id: Date.now(), nombre: '', subAforo: '', precio: '', descripcion: "" }
    ]);

    // --- HANDLERS ---

    // Maneja cambios en los campos principales
    const handleMainDataChange = (e, field) => {
        setMainData({ ...mainData, [field]: e.target.value });
    };

    // Maneja cambios en los campos de las entradas dinámicas
    const handleTicketChange = (e, id, field) => {
        const newTickets = tickets.map(ticket => {
            if (ticket.id === id) {
                return { ...ticket, [field]: e.target.value };
            }
            return ticket;
        });
        setTickets(newTickets);
    };

    // Añade un nuevo bloque de entradas
    const addTicketType = () => {
        setTickets([...tickets, { id: Date.now(), nombre: '', subAforo: '', precio: '', descripcion: '' }]);
    };

    const removeTicketType = () => {
        // Validación: Mínimo 1 entrada
        if (tickets.length <= 1) {
            triggerAlert(IS_ERROR, "Debe haber mínimo un tipo de entrada");
            return;
        }

        // Borramos la última entrada del array
        // (Creamos una copia y quitamos el último elemento)
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

    // Función para determinar si el campo es válido (tiene contenido)
    const isFieldValid = (field) => {
        const value = mainData[field];
        return !!value && typeof value === 'string' && value.trim().length > 0;
    };

    // Función para determinar si un campo específico dentro de UN TICKET es válido
    const isTicketFieldValid = (ticket, field) => {
        const value = ticket[field]; // Obtenemos el valor del campo dentro del objeto ticket
        return !!value && typeof value === 'string' && value.trim().length > 0;
    };

    // --- RENDER ---
    return (
        <div className="form-concierto-container">
            
            {/* SECCIÓN 1: Datos Principales (Grid 2 columnas) */}
            <div className="form-grid">
                <div className={isFieldValid('nombre') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                    <CampoTexto
                        nombre="NOMBRE" placeholder="Nombre del concierto" obligatorio="si"
                        value={mainData.nombre} hasValue={!!mainData.nombre}
                        handleChange={(e) => handleMainDataChange(e, 'nombre')}
                    />
                </div>

                <div className={isFieldValid('date') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                    <CampoTexto
                        nombre="FECHA" placeholder="aaaa-mm-dd" obligatorio="si"
                        value={mainData.date} hasValue={!!mainData.date}
                        handleChange={(e) => handleMainDataChange(e, 'date')}
                    />
                </div>

                <div className={isFieldValid('ubicacion') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                    <CampoTexto
                        nombre="LOCALIZACION" placeholder="Dirección" obligatorio="si"
                        value={mainData.ubicacion} hasValue={!!mainData.ubicacion}
                        handleChange={(e) => handleMainDataChange(e, 'ubicacion')}
                    />
                </div>

                <div className={isFieldValid('objetivoRecaudacion') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                    <CampoTexto
                        nombre="OBJ. RECAUDACION (€)" placeholder="1000" obligatorio="si"
                        value={mainData.objetivoRecaudacion} hasValue={!!mainData.objetivoRecaudacion}
                        handleChange={(e) => handleMainDataChange(e, 'objetivoRecaudacion')}
                    />
                </div>

                <div className={isFieldValid('artista') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                    <CampoTexto
                        nombre="ARTISTA/S" placeholder="Nombre del artista o grupo" obligatorio="si"
                        value={mainData.artista} hasValue={!!mainData.artista}
                        handleChange={(e) => handleMainDataChange(e, 'artista')}
                    />
                </div>

                <div className={isFieldValid('tags') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                    <CampoTexto
                        nombre="TAGS" placeholder="tag1 tag2 tag3" obligatorio="si"
                        value={mainData.tags} hasValue={!!mainData.tags}
                        handleChange={(e) => handleMainDataChange(e, 'tags')}
                    />
                </div>

                <div className="div-descripcion">
                        <div className="div-campo">
                            <label htmlFor="descripcion">DESCRIPCIÓN*</label><br />
                            <textarea
                                id="descripcion"
                                placeholder="Descripción del evento"
                                value={mainData.descripcion}
                                onChange={(e) => handleMainDataChange(e, 'descripcion')}
                            />
                    </div>
                </div>
                <CampoAdjunto
                    nombre="IMAGEN" 
                    placeholder="Subir archivo adjunto" 
                    obligatorio="no"
                    value={mainData.url} 
                    handleChange={(e) => {handleMainDataChange(e, 'url')}}
                    style={{resize:'none'}}
                />
            </div>


            {/* SECCIÓN 2: Entradas Dinámicas */}
            <div className="tickets-section">
                {tickets.map((ticket, index) => (
                    <div key={ticket.id} className="ticket-block">
                        <h4 className="ticket-section-title">Tipo de entrada {index + 1}</h4>
                        <div className="form-grid">
                            <div className={isTicketFieldValid(ticket, 'nombre') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                                <CampoTexto
                                    nombre="NOMBRE" placeholder="Ej: Entrada General" obligatorio="si"
                                    value={ticket.nombre} hasValue={!!ticket.nombre}
                                    handleChange={(e) => handleTicketChange(e, ticket.id, 'nombre')}
                                />
                            </div>
                            <div className={isTicketFieldValid(ticket, 'subAforo') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                                <CampoTexto
                                    nombre="CANTIDAD" placeholder="Ej: 300" obligatorio="si"
                                    value={ticket.subAforo} hasValue={!!ticket.subAforo}
                                    handleChange={(e) => handleTicketChange(e, ticket.id, 'subAforo')}
                                />
                            </div>
                            <div className={isTicketFieldValid(ticket, 'precio') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                                <CampoTexto
                                    nombre="PRECIO" placeholder="Ej: 20€" obligatorio="si"
                                    value={ticket.precio} hasValue={!!ticket.precio}
                                    handleChange={(e) => handleTicketChange(e, ticket.id, 'precio')}
                                />
                            </div>

                            <div className={isTicketFieldValid(ticket, 'descripcion') ? 'validation-wrapper is-valid' : 'validation-wrapper'}>                   
                                <CampoTexto
                                    nombre="DESCRIPCIÓN" placeholder="Entrada básica con acceso a sala" obligatorio="si"
                                    value={ticket.descripcion} hasValue={!!ticket.descripcion}
                                    handleChange={(e) => handleTicketChange(e, ticket.id, 'descripcion')}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* SECCIÓN 3: BOTONES DE ACCIÓN (MODIFICADA) */}
            <div className="form-actions">
                
                {/* Agrupamos los botones de gestión de entradas a la izquierda */}
                <div className="buttons-left-group">
                    <button className="add-ticket-button" onClick={addTicketType}>
                        <span className="plus-icon">+</span> Añadir entrada
                    </button>

                    {/* NUEVO BOTÓN DE BORRAR */}
                    <button className="delete-ticket-button" onClick={removeTicketType}>
                        <span className="plus-icon">-</span> Borrar entrada
                    </button>
                </div>

                <button className="confirm-button" onClick={handleSubmit}>
                    CONFIRMAR DATOS
                </button>
            </div>

        </div>
    );
}

export default FormularioConcierto;