import logo from '../assets/images/logo-oscuro.png'
import { useScrollSpy } from '../hooks/useScrollSpy'

const sections = ["home", "proyectos", "herramientas", "contacto"];

export const Header = () => {
    const active = useScrollSpy(sections);

    return (
        <header className="header-principal">
            <a href="#home" className="logo"><img src={logo} alt="danielo24.dev" /></a>
            <nav>
                <a href="#home" className={active === "home" ? "active" : ""}>Home</a>
                <a href="#proyectos" className={active === "proyectos" ? "active" : ""}>Proyectos</a>
                <a href="#herramientas" className={active === "herramientas" ? "active" : ""}>Herramientas</a>
                <a href="#contacto" className={active === "contacto" ? "active" : ""}>Contacto</a>
            </nav>
        </header>
    )
}