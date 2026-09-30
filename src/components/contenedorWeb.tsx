import { Home } from "./home"
import { Proyectos } from "./proyectos"
import { Herramientas } from "./herramientas"
import { Contacto } from "./contacto"

/**
 * ContenedorWeb
 * Contenedor principal de la web. Monta en una sola página, y en orden de
 * arriba abajo, todas las secciones del portfolio: home, proyectos,
 * herramientas y contacto.
 * Es un componente de composición: no tiene estado ni recibe props, solo
 * decide qué secciones se pintan y en qué orden.
 *
 * @returns Un <div id="contenedor-web"> con todas las secciones
 */
export const ContenedorWeb = () => {
    return (
        // Envoltorio de toda la página. El id permite darle estilos globales de layout desde CSS
        <div id="contenedor-web">

            {/* Presentación / portada */}
            <Home/>

            {/* Listado de proyectos (cards con enlaces a GitHub y a la web) */}
            <Proyectos/>

            {/* Tecnologías y herramientas que uso */}
            <Herramientas/>

            {/* Cierre: CV y canales de contacto (ancla #contacto) */}
            <Contacto />
        </div>
    )
}