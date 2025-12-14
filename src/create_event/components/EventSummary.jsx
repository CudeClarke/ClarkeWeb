import '../styles/EventSummary.css';

function EventSummary({ eventData, onFinalSubmit, onBack }) {
    const { type, details } = eventData;

    // Aseguramos que hay datos para mostrar
    if (!details) return null;

    // --- LÓGICA DE UNIFICACIÓN DE DATOS ---
    // Los formularios envían 'entradas', pero por si acaso miramos 'tickets'
    const listaEntradas = details.entradas || details.tickets || [];

    // --- LÓGICA ESPECÍFICA: CALCULAR AFORO ---
    let aforoTotal = 0;
    
    // Sumamos la cantidad de todas las entradas si existen
    if (listaEntradas.length > 0) {
        aforoTotal = listaEntradas.reduce((sum, ticket) => {
            // El formulario usa 'subAforo', pero soportamos 'cantidad' por compatibilidad
            const cantidad = ticket.subAforo || ticket.cantidad;
            return sum + (parseInt(cantidad, 10) || 0);
        }, 0);
    }

    return (
        <div className="event-summary-container">
            <h3 className="summary-title">Resumen del evento</h3>
            
            <table className="summary-table">
                <tbody>
                    {/* --- CAMPOS COMUNES --- */}
                    <tr>
                        <td className="summary-label-cell">Tipo:</td>
                        <td className="summary-value-cell">{type}</td>
                    </tr>
                    <tr>
                        <td className="summary-label-cell">Nombre:</td>
                        <td className="summary-value-cell">{details.nombre}</td>
                    </tr>
                    <tr>
                        <td className="summary-label-cell">Fecha:</td>
                        {/* CORREGIDO: Usamos details.date */}
                        <td className="summary-value-cell">{details.date || details.fecha}</td>
                    </tr>
                    <tr>
                        <td className="summary-label-cell">Localización:</td>
                        {/* CORREGIDO: Usamos details.ubicacion */}
                        <td className="summary-value-cell">{details.ubicacion || details.localizacion}</td>
                    </tr>
                    <tr>
                        <td className="summary-label-cell">Tags:</td>
                        <td className="summary-value-cell">{details.tags}</td>
                    </tr>

                    {/* --- CAMPOS ESPECÍFICOS SEGÚN TIPO --- */}

                    {/* CONCIERTO */}
                    {type === 'Concierto' && (
                        <>
                            <tr>
                                <td className="summary-label-cell">Artista/s:</td>
                                <td className="summary-value-cell">{details.artista}</td>
                            </tr>
                            <tr>
                                <td className="summary-label-cell">Aforo Total:</td>
                                <td className="summary-value-cell">{aforoTotal}</td>
                            </tr>
                            {/* Opcional: Mostrar desglose de entradas si quieres */}
                        </>
                    )}

                    {/* RIFA */}
                    {type === 'Rifa' && (
                        <>
                            <tr>
                                <td className="summary-label-cell">Premios:</td>
                                <td className="summary-value-cell long-text-value">{details.premios}</td>
                            </tr>
                            <tr>
                                <td className="summary-label-cell">Papeletas Totales:</td>
                                {/* En rifa el aforo es el número total de papeletas */}
                                <td className="summary-value-cell">{aforoTotal}</td> 
                            </tr>
                        </>
                    )}

                    {/* CARRERA */}
                    {type === 'Carrera' && (
                        <>
                            <tr>
                                <td className="summary-label-cell">Recorrido:</td>
                                <td className="summary-value-cell">{details.recorrido}</td>
                            </tr>
                            <tr>
                                <td className="summary-label-cell">Dorsales Totales:</td>
                                {/* En carrera el aforo son los dorsales totales */}
                                <td className="summary-value-cell">{aforoTotal}</td>
                            </tr>
                        </>
                    )}

                    {/* OTRO / TODOS: Descripción */}
                    <tr>
                        <td className="summary-label-cell" style={{verticalAlign: 'top'}}>Descripción:</td>
                        <td className="summary-value-cell long-text-value">{details.descripcion}</td>
                    </tr>

                </tbody>
            </table>

            {/* TABLA DE PRECIOS/ENTRADAS (Para verificar los tipos creados) */}
            {listaEntradas.length > 0 && (
                <div style={{marginBottom: '20px'}}>
                    <h4 style={{fontSize: '1rem', marginBottom: '10px', color: '#555'}}>Desglose de Entradas/Dorsales:</h4>
                    <table className="summary-table" style={{fontSize: '0.9rem'}}>
                        <thead>
                            <tr style={{backgroundColor: '#f0f0f0'}}>
                                <th style={{padding: '8px', textAlign: 'left'}}>Nombre</th>
                                <th style={{padding: '8px', textAlign: 'left'}}>Cantidad</th>
                                <th style={{padding: '8px', textAlign: 'left'}}>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaEntradas.map((t, i) => (
                                <tr key={i}>
                                    <td style={{padding: '8px', borderBottom: '1px solid #eee'}}>{t.nombre}</td>
                                    <td style={{padding: '8px', borderBottom: '1px solid #eee'}}>{t.subAforo || t.cantidad}</td>
                                    <td style={{padding: '8px', borderBottom: '1px solid #eee'}}>{t.precio}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Botones de Acción */}
            <div className="summary-actions">
                <button className="back-button" onClick={onBack}>
                    Atras
                </button>
                <button className="confirm-create-button" onClick={onFinalSubmit}>
                    CONFIRMAR
                </button>
            </div>

        </div>
    );
}

export default EventSummary;