import { Home } from "./home"
import { Proyectos } from "./proyectos"
import { Herramientas } from "./herramientas"

export const ContenedorWeb = () => {
    return (
        <div id="contenedor-web">
            <Home/>
            <Proyectos/>
            <Herramientas/>
        </div>
    )
}