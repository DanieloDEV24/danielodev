import { Home } from "./home"
import { Proyectos } from "./proyectos"
import { Herramientas } from "./herramientas"
import { Contacto } from "./contacto"

export const ContenedorWeb = () => {
    return (
        <div id="contenedor-web">
            <Home/>
            <Proyectos/>
            <Herramientas/>
            <Contacto />
        </div>
    )
}