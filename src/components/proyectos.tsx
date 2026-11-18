import { motion, MotionConfig, type Variants } from "motion/react"
import { ESTADOS_PROYECTOS } from "../Enums/enums"
import mockup1 from "../assets/images/mockup-reservalo.png"
import mockup2 from "../assets/images/mockup-rotulos.jpeg"
import mockup3 from "../assets/images/mockup-turismo.jpeg"
import mockup4 from "../assets/images/mockup-danielsur.jpeg"
import mockup5 from "../assets/images/mockup-j10.jpeg"
import mockup6 from "../assets/images/mockup-myno.jpeg"

/**
 * subida
 * Variante de entrada desde abajo con fundido (título y cards).
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

// Se dispara cuando el 20% del elemento es visible, solo una vez
const viewport = { once: true, amount: 0.2 }

const projects = [
    {
        titulo: 'Reservalo.',
        descripcion: 'Plataforma de reservas y gestión de instalaciones municipales.',
        estado: ESTADOS_PROYECTOS.Pruebas,
        src: mockup1,
        class: 'proyecto1',
        stacks: ['CodeIgniter4', 'JQuery', 'Bootstrap', 'MySQL', 'Resend'],
        links: { github: 'https://github.com/DanieloDEV24/reservalo2.0' }
    },

    {
        titulo: 'Rótulos Moncayo.',
        descripcion: 'Web corporativa clara con llamadas a la acción visibles.',
        estado: ESTADOS_PROYECTOS.Terminado,
        src: mockup2,
        class: 'proyecto2',
        stacks: ['React', 'TypeScript', 'Vite'],
        links: { github: 'https://github.com/inidev-code/01-rotulosmoncayo', web: 'https://rotulosmoncayo.es/' }
    },

    {
        titulo: 'Fuente de Piedra Turismo.',
        descripcion: 'Mejora de la web del Ayuntamiento de Fuente de Piedra.',
        estado: ESTADOS_PROYECTOS.Terminado,
        src: mockup3,
        class: 'proyecto3',
        stacks: ['HTML', 'CSS', 'Bootstrap', 'Php'],
        links: { github: 'https://github.com/DanieloDEV24/fuentedepiedraturismo', web: 'https://fuentedepiedraturismo.com/' }
    },

    {
        titulo: 'Distribuciones DanielSur.',
        descripcion: 'Web corporativa, distribuidor oficial de bebidas.',
        estado: ESTADOS_PROYECTOS.Desarrollo,
        src: mockup4,
        class: 'proyecto4',
        stacks: ['React', 'TypeScript', 'Vite'],
        links: { github: '', web: '' }
    },

    {
        titulo: 'Joaquín Gonzalez 10.',
        descripcion: 'Web de un piloto de motocross: resultados, moto, galería y patrocinio.',
        estado: ESTADOS_PROYECTOS.Terminado,
        src: mockup5,
        class: 'proyecto5',
        stacks: ['React', 'TypeScript', 'Vite'],
        links: { github: 'https://github.com/DanieloDEV24/joaquingonzalez10', web: 'https://joaquingonzalez10.netlify.app/' }
    },

    {
        titulo: 'Myno Studio.',
        descripcion: 'Algo se está construyendo en Myno Solutions. Vuelve pronto.',
        estado: ESTADOS_PROYECTOS.Desarrollo,
        src: mockup6,
        class: 'proyecto6',
        stacks: ['React', 'TypeScript', 'Vite'],
        links: { github: '', web: '' }
    },
]

/**
 * Proyectos
 * Sección de proyectos. Al hacer scroll hasta ella, el título y cada card
 * entran desde abajo con fundido y se quedan quietos. Cada card se anima
 * cuando llega a pantalla (las de la segunda fila, al bajar).
 * MotionConfig respeta la preferencia "reducir movimiento" del sistema.
 */
export const Proyectos = () => {
    return (
        <MotionConfig reducedMotion="user">
            <section className="proyectos" id="proyectos">
                {/* Título: entra desde abajo con fundido */}
                <motion.h2 variants={subida} custom={0.1} initial="oculto" whileInView="visible" viewport={viewport}>
                    PROYEC<span>TOS.</span>
                </motion.h2>

                <ul className="grid-proyectos">
                    {
                        projects.map((elemento, index) => (
                            // El retraso escalona las cards de una misma fila (3 columnas)
                            <motion.li
                                key={index}
                                className={elemento.class}
                                variants={subida}
                                custom={0.1 + (index % 3) * 0.15}
                                initial="oculto"
                                whileInView="visible"
                                viewport={viewport}
                            >
                                <img src={elemento.src} alt="" />
                                <h3>{elemento.titulo}</h3>
                                {elemento.estado !== ESTADOS_PROYECTOS.Terminado && (
                                    <span className="estado"> <div className="circle"></div> {elemento.estado}</span>
                                )}
                                <div>
                                    <p>{elemento.descripcion}</p>
                                    <div className="stacks">
                                        {
                                            elemento.stacks.map(stack => (
                                                <span key={stack}>{stack}</span>
                                            ))
                                        }
                                    </div>
                                </div>

                                <footer className="footer-card">
                                    {(() => {
                                        // Proyecto terminado: enlace a Github y a la web
                                        if (elemento.estado === ESTADOS_PROYECTOS.Terminado) {
                                            return (
                                                <>
                                                    <a href={elemento.links.github} className="btn-github" target="_blank" rel="noreferrer" aria-label={`Ir al repositorio de ${elemento.titulo}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
                                                        Github
                                                    </a>
                                                    <a href={elemento.links.web} className="btn-web" target="_blank" rel="noreferrer" aria-label={`Ir a la web de ${elemento.titulo}`}> Ir a la web <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg></a>
                                                </>
                                            );
                                        }
                                        // Fase de pruebas: solo Github
                                        else if (elemento.estado === ESTADOS_PROYECTOS.Pruebas) {
                                            return (
                                                <a href={elemento.links.github} className="btn-github" target="_blank" rel="noreferrer" aria-label={`Ir al repositorio de ${elemento.titulo}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
                                                    Github
                                                </a>
                                            );
                                        }
                                        // Cualquier otro estado (en desarrollo)
                                        else {
                                            return <span>Disponible pronto</span>;
                                        }
                                    })()}
                                </footer>
                            </motion.li>
                        ))
                    }
                </ul>
            </section>
        </MotionConfig>
    )
}