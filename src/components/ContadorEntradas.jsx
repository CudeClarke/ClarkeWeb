import React, { useState } from 'react';
// Importamos el archivo CSS que crearemos en el siguiente paso
import '../styles/ContadorEntradas.css';

function Contador({value, modCallBack}) {
  // 1. Definimos el estado.
  // 'cuenta' es el número actual.
  // 'setCuenta' es la función que usaremos para cambiar ese número.
  // useState(0) significa que el valor inicial es 0.

  // Función para el botón "+"
  const incrementar = () => {
    modCallBack(value+1)
  };

  // Función para el botón "-"
  const decrementar = () => {
    if (value === 0) return;
    modCallBack(value - 1);
  };

  return (
    // Este es el contenedor principal (el borde verde externo)
    <div className="contador-container">
      
      {/* Aquí mostramos el número */}
      <span className="numero-display">{value}</span>

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