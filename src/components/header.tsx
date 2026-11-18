import { motion, MotionConfig, type Variants } from "motion/react"
import logo from '../assets/images/logo-oscuro.png'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { useEffect, useState, type CSSProperties } from 'react';

/**
 * subida
 * Variante de entrada desde abajo con fundido (logo y enlaces).
 * @param retraso Segundos de espera antes de empezar (se pasa con la prop `custom`)
 */
const subida: Variants = {
    oculto: { opacity: 0, y: 30 },
    visible: (retraso: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: retraso },
    }),
}

const sections = ["home", "sobreMi", "proyectos", "herramientas", "contacto"];

/**
 * enlaces
 * Enlaces del menú (id de la sección + texto visible).
 */
const enlaces = [
    { id: "home", texto: "Home" },
    { id: "sobreMi", texto: "Sobre Mí" },
    { id: "proyectos", texto: "Proyectos" },
    { id: "herramientas", texto: "Herramientas" },
    { id: "contacto", texto: "Contacto" },
]

/**
 * redes
 * Enlaces del pie del menú móvil (sustituye el LinkedIn por tu URL real).
 */
const redes = [
    { id: "github", texto: "GitHub", url: "https://github.com/DanieloDEV24" },
    { id: "linkedin", texto: "LinkedIn", url: "https://www.linkedin.com/in/tu-perfil" },
]

/**
 * Header
 * Cabecera fija. Al cargar la página, el logo y los enlaces del menú entran
 * de forma escalonada (logo → Home → Sobre Mí → ...) y se quedan quietos.
 * Se anima cada hijo y no el <header>, para no pisar el posicionamiento
 * (fixed/sticky) ni su transform en el CSS.
 * MotionConfig respeta la preferencia "reducir movimiento" del sistema.
 * El menú móvil se abre con la clase `open` (el nav siempre está en el DOM
 * para que la transición CSS del círculo se ejecute).
 */
export const Header = () => {
    const active = useScrollSpy(sections);
    const [isScrolled, setScrolled] = useState(false);
    const [actived, setActived] = useState(false);

    // Detecta el scroll del contenedor #root para oscurecer la cabecera
    useEffect(() => {
        const root = document.getElementById("root")!;
        const onScroll = () => setScrolled(root.scrollTop > 20);

        onScroll();
        root.addEventListener("scroll", onScroll, { passive: true });
        return () => root.removeEventListener("scroll", onScroll);
    }, [])

    // Con el menú abierto: bloquea el scroll de #root y permite cerrar con Esc
    useEffect(() => {
        if (!actived) return;

        const root = document.getElementById("root")!;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActived(false);

        root.style.overflow = "hidden"; // evita que la página se mueva detrás del menú
        document.addEventListener("keydown", onKey);

        // Limpieza: devuelve el scroll y quita el listener al cerrar
        return () => {
            root.style.overflow = "";
            document.removeEventListener("keydown", onKey);
        };
    }, [actived])

    return (
        <MotionConfig reducedMotion="user">
            <header className={`header-principal ${isScrolled ? 'header-oscuro' : ''}`}>
                {/* Logo */}
                <motion.a href="#home" className="logo" variants={subida} custom={0.1} initial="oculto" animate="visible">
                    <img src={logo} alt="danielo24.dev" />
                </motion.a>

                {/* Navegación de escritorio */}
                <nav className="nav-principal">
                    {/* Enlaces: entran escalonados */}
                    {enlaces.map((enlace, index) => (
                        <motion.a
                            key={enlace.id}
                            href={`#${enlace.id}`}
                            className={active === enlace.id ? "active" : ""}
                            variants={subida}
                            custom={0.2 + index * 0.1}
                            initial="oculto"
                            animate="visible"
                        >
                            {enlace.texto}
                        </motion.a>
                    ))}
                </nav>

                {/* Botón del menú móvil (4 puntos → X) */}
                <button
                    type="button"
                    className="mb"
                    aria-expanded={actived}
                    aria-controls="menu-movil"
                    aria-label={actived ? "Cerrar menú" : "Abrir menú"}
                    onClick={() => setActived(!actived)}
                >
                    <span className="mb-dot mb-dot--a" />
                    <span className="mb-dot mb-dot--b" />
                    <span className="mb-dot mb-dot--c" />
                    <span className="mb-dot mb-dot--d" />
                </button>

                {/* Navegación móvil: siempre montada, se muestra con la clase `open` */}
                <nav id="menu-movil" className={`nav-movil ${actived ? 'open' : ''}`}>
                    {enlaces.map((enlace, index) => (
                        <a
                            key={enlace.id} // clave única: corrige el aviso de React
                            href={`#${enlace.id}`}
                            style={{ "--i": index } as CSSProperties} // retardo escalonado en el CSS
                            onClick={() => setActived(false)} // cierra el menú al navegar
                        >
                            {enlace.texto}
                        </a>
                    ))}

                    {/* Redes: con enlaces reales (href="" recargaría la página) */}
                    <span style={{ "--i": enlaces.length } as CSSProperties}>
                        {redes.map((red, index) => (
                            <span key={red.id}>
                                {index > 0 && " · "}
                                <a href={red.url} target="_blank" rel="noopener noreferrer">
                                    {red.texto}
                                </a>
                            </span>
                        ))}
                    </span>
                </nav>
            </header>
        </MotionConfig>
    )
}