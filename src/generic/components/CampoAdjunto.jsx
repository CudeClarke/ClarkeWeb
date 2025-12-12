import React from 'react';
import '../styles/CampoAdjunto.css'; // Asumiendo que crearás un archivo de estilos CampoAdjunto.css

/**
 * Componente de entrada para adjuntar archivos (imágenes).
 * Recibe el archivo seleccionado como un objeto File en el handleChange.
 *
 * @param {string} nombre - La etiqueta que aparece arriba del campo (ej: IMAGEN PRINCIPAL).
 * @param {string} placeholder - El texto que aparece si no hay archivo seleccionado (ej: Subir archivo adjunto).
 * @param {string} obligatorio - "si" o "no" para la indicación visual (aunque el input file no lo muestre igual que un texto).
 * @param {File | null} value - El objeto File seleccionado actualmente.
 * @param {function} handleChange - Función que maneja el cambio (recibe el evento).
 */
function CampoAdjunto({ nombre, placeholder, obligatorio, value, handleChange }) {
    
    // Obtener el nombre del archivo para mostrarlo
    const fileName = value && value.name ? value.name : placeholder;
    const isRequired = obligatorio === 'si';
    
    // Función para manejar el cambio en el input de archivo
    const handleFileChange = (e) => {
        // En un input type="file", los archivos están en e.target.files
        const file = e.target.files[0];
        // Creamos un objeto de evento sintético con el archivo para usarlo en el handler del padre
        const syntheticEvent = {
            target: {
                value: file, // Pasamos el objeto File
                type: 'file',
                files: e.target.files
            }
        };
        handleChange(syntheticEvent);
    };

    return (
        <div className="div-campo campo-adjunto-container">
            <label htmlFor={nombre.toLowerCase()} className="campo-adjunto-label">
                {nombre}
                {isRequired && <span className="obligatorio-star"> *</span>}
            </label>
            <div className="custom-file-input">
                <input
                    type="file"
                    id={nombre.toLowerCase()}
                    name={nombre.toLowerCase()}
                    onChange={handleFileChange}
                    // Limita a archivos de imagen
                    accept="image/*"
                    // Permitir selección de varios archivos si fuera necesario
                    multiple={false} 
                />
                
                {/* Visualización personalizada para imitar CampoTexto */}
                <span className="file-display-text">
                    {fileName}
                </span>

                <span className="file-browse-button">
                    {value ? 'Cambiar' : 'Seleccionar'}
                </span>
            </div>
            
        </div>
    );
}

export default CampoAdjunto;