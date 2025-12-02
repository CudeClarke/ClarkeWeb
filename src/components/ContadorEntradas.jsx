import React, { useState } from 'react';
// Importamos el archivo CSS que crearemos en el siguiente paso
import '../styles/ContadorEntradas.css';

function Contador() {
  // 1. Definimos el estado.
  // 'cuenta' es el número actual.
  // 'setCuenta' es la función que usaremos para cambiar ese número.
  // useState(0) significa que el valor inicial es 0.
  const [cuenta, setCuenta] = useState(0);

  // Función para el botón "+"
  const incrementar = () => {
    setCuenta(cuenta + 1);
  };

  // Función para el botón "-"
  const decrementar = () => {
    if (cuenta === 0) return;
    setCuenta(cuenta - 1);
  };

  return (
    // Este es el contenedor principal (el borde verde externo)
    <div className="contador-container">
      
      {/* Aquí mostramos el número */}
      <span className="numero-display">{cuenta}</span>

      {/* El botón de restar */}
      <button className="boton boton-menos" onClick={decrementar}>
        −
      </button>

      {/* El botón de sumar */}
      <button className="boton boton-mas" onClick={incrementar}>
        +
      </button>

    </div>
  );
}

export default Contador;