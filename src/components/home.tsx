import { ArrowIcon } from "./icons/arrowIcon"
import iconoDev from "../assets/images/icono-dev.png"
import flechaCurva from "../assets/images/flecha-curva.png"
import iconoHastag from "../assets/images/icono-hashtag.png"
import flecha from "../assets/images/flecha.png"

import { Sello } from "./sello"

export const Home = () => {
    return (
        <section className="home" id="home">
            <h1>WEBS QUE <span>SE NOTAN.</span></h1>
            <p>Soy Daniel Ruiz, desarrollador <strong>Full Stack</strong> y <strong>docente.</strong> Me gusta convertir ideas en aplicaciones web robustas, bien diseñadas y fáciles de mantener.</p>
            <footer className="buttons-home">
                <a href="/" className="primary-link">Ver proyectos <ArrowIcon/> </a>
                <a href="/" className="secondary-link">Hablemos</a>
            </footer>

            <img src={iconoDev} alt="" id="icono-dev" />
            <img src={flechaCurva} alt="" id="icono-flecha" />
            <img src={iconoHastag} alt="" id="icono-hastag" />
            <img src={flecha} alt="" id="flecha" />

            <Sello/>

            <div className="cartel-dev-docente">
                <p>DEV + DOCENTE</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-asterisk"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12l8 -4.5" /><path d="M12 12v9" /><path d="M12 12l-8 -4.5" /><path d="M12 12l8 4.5" /><path d="M12 3v9" /><path d="M12 12l-8 4.5" /></svg>
            </div>

        </section>
    )
}