import "../styles/Footer.css"
import footer from "../../assets/footer.json"
import logoAyuntamiento from "../images/logoTorremolinos.png"

function Footer(){ 

  const datosColumnas = footer.datosColumnas

  return (
    <footer className="footer-container">
      {/* --- PARTE SUPERIOR (Fondo Blanco) --- */}
      <div className="footer-top">
        <div className="footer-columns-wrapper">
          
          {/* Aquí usamos la función .map para recorrer los datos y crear las 4 columnas automáticamente */}
          {datosColumnas.map((columna, index) => (
            <div key={index} className="footer-columna">
              <h4 className="columna-titulo">
               <a href="#seccion">{columna.titulo}</a>
              </h4>
              <ul className="columna-lista">
                {columna.links.map((link, i) => (
                  <li key={i} className="columna-item">
                    <span className="flecha">&gt; </span> 
                    <a href="#link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>
      {/* --- PARTE INFERIOR (Fondo Gris) --- */}
      <div className="footer-bottom">
        <div className="footer-content-wrapper">
          
          {/* Fila superior: Izquierda (Copyright) y Derecha (Dirección) */}
          <div className="footer-bottom-row">
            
            <div className="footer-bottom-left">
              <p>Copyright © 2025 Fundación Cudeca. Todos los derechos reservados. Aviso legal | Política de privacidad | Política de cookies</p>
            </div>

            <div className="footer-bottom-right">
              <p>Avenida del Cosmos, s/n - 29631 - Arroyo de la Miel - Málaga, España</p>
              <p>Telefono: 952 56 49 10</p>
            </div>

          </div>

          {/* Fila inferior: Colaboración y Logo (Centrado) */}
          <div className="footer-collaboration">
            <p>Colabora con el Ayuntamiento de Torremolinos</p>
            
            {/* AQUÍ VA LA IMAGEN DEL LOGO */}
            <div className="logo-placeholder">
               <img 
                 src={logoAyuntamiento}
                 className="logo-img"
               />
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;