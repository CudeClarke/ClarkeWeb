import React, { useState } from 'react';
// Asegúrate de que la ruta a CampoTexto es correcta según tu estructura
import { CampoTexto } from "../../generic/components/CampoTexto";
import '../styles/FormularioConcierto.css';
import { IS_ERROR } from "../../generic/components/Alert"; // Importamos la constante de error

function FormularioConcierto({ onFormSubmit, triggerAlert }) {
    // --- ESTADOS ---

    // 1. Datos principales del evento
    const [mainData, setMainData] = useState({
        nombre: '',
        fecha: '',
        localizacion: '',
        artista: ''
    });

    // 2. Lista de tipos de entradas (empezamos con una por defecto)
    const [tickets, setTickets] = useState([
        { id: Date.now(), nombre: '', cantidad: '', precio: '' }
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
        setTickets([...tickets, { id: Date.now(), nombre: '', cantidad: '', precio: '' }]);
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

    const validateForm = () => {
        // 1. Validar datos principales
        for (const key in mainData) {
            if (!mainData[key].trim()) return false;
        }

        // 2. Validar datos de entradas
        if (tickets.length === 0) return false; // Debe haber al menos una entrada
        for (const ticket of tickets) {
            if (!ticket.nombre.trim() || !ticket.cantidad.trim() || !ticket.precio.trim()) {
                return false;
            }
        }
        return true;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            // Si todo está OK, enviamos los datos al padre
            onFormSubmit({ ...mainData, tickets: tickets });
        } else {
            // AQUÍ IRÁ TU COMPONENTE DE ALERTA GENÉRICO.
            triggerAlert(IS_ERROR, "Por favor, rellena todos los campos obligatorios (*)");
        }
    };


    // --- RENDER ---
    return (
        <div className="form-concierto-container">
            
            {/* SECCIÓN 1: Datos Principales (Grid 2 columnas) */}
            <div className="form-grid">
                <CampoTexto
                    nombre="NOMBRE" placeholder="Nombre del concierto" obligatorio="si"
                    value={mainData.nombre} hasValue={!!mainData.nombre}
                    handleChange={(e) => handleMainDataChange(e, 'nombre')}
                />
                <CampoTexto
                    nombre="FECHA" placeholder="dd/mm/aaaa" obligatorio="si"
                    value={mainData.fecha} hasValue={!!mainData.fecha}
                    handleChange={(e) => handleMainDataChange(e, 'fecha')}
                />
                <CampoTexto
                    nombre="LOCALIZACION" placeholder="Dirección" obligatorio="si"
                    value={mainData.localizacion} hasValue={!!mainData.localizacion}
                    handleChange={(e) => handleMainDataChange(e, 'localizacion')}
                />
                <CampoTexto
                    nombre="ARTISTA/S" placeholder="Nombre del artista o grupo" obligatorio="si"
                    value={mainData.artista} hasValue={!!mainData.artista}
                    handleChange={(e) => handleMainDataChange(e, 'artista')}
                />
            </div>


            {/* SECCIÓN 2: Entradas Dinámicas */}
            <div className="tickets-section">
                {tickets.map((ticket, index) => (
                    <div key={ticket.id} className="ticket-block">
                        <h4 className="ticket-section-title">Tipo de entrada {index + 1}</h4>
                        <div className="form-grid">
                            <CampoTexto
                                nombre="NOMBRE" placeholder="Ej: Entrada General" obligatorio="si"
                                value={ticket.nombre} hasValue={!!ticket.nombre}
                                handleChange={(e) => handleTicketChange(e, ticket.id, 'nombre')}
                            />
                            <CampoTexto
                                nombre="CANTIDAD" placeholder="Ej: 300" obligatorio="si"
                                value={ticket.cantidad} hasValue={!!ticket.cantidad}
                                handleChange={(e) => handleTicketChange(e, ticket.id, 'cantidad')}
                            />
                            <CampoTexto
                                nombre="PRECIO" placeholder="Ej: 20€" obligatorio="si"
                                value={ticket.precio} hasValue={!!ticket.precio}
                                handleChange={(e) => handleTicketChange(e, ticket.id, 'precio')}
                            />
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