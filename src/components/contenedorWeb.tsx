import { Home } from "./home"
import { Proyectos } from "./proyectos"

export const ContenedorWeb = () => {
    return (
        <div id="contenedor-web">
            <Home/>
            <Proyectos/>
        </div>
    )
}