import { motion } from "motion/react";
import { IconoEmail } from "./icons/iconoEmail";
import { IconoGithub } from "./icons/iconoGithub";
import { IconoInstagram } from "./icons/iconoInstagram";
import { IconoLinkedin } from "./icons/iconoLinkedin";
import type { JSX } from "react";
import { CardContacto } from "./cardContacto";
// El bundler (Vite) resuelve el PDF a una URL final con hash para poder descargarlo
import cvPdf from '../assets/docs/CV-Daniel-Ruiz-Soto.pdf';

/**
 * fadeUp
 * Animación de entrada reutilizable: el elemento aparece desde abajo con fade
 * cuando entra en pantalla. Se esparce con {...fadeUp} en cualquier motion.*
 *
 * - initial:   estado de partida (transparente y 30px más abajo)
 * - whileInView: estado final al entrar en el viewport
 * - viewport:  once -> solo se anima la primera vez; amount -> se dispara al ver el 30%
 * - transition: 0.6s con curva cubic-bezier suave ("as const" fija el tipo como tupla)
 */
const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

/**
 * modosContacto
 * Datos de los canales de contacto. Al ser un array, añadir o quitar un canal
 * no requiere tocar el JSX.
 *
 * @property plataforma Nombre del canal (se muestra en la card)
 * @property usuario    Texto visible: email, handle o URL abreviada
 * @property icono      Componente de icono ya instanciado
 * @property color      Color de acento de la card
 * @property enlace     URL real (mailto: para el email, https:// para el resto)
 */
export const modosContacto: { plataforma: string; usuario: string; icono: JSX.Element, color: string, enlace: string }[] = [
    {
        plataforma: "Email",
        usuario: "danielruizdeveloper@gmail.com",
        icono: <IconoEmail />,
        color: '#c63400',
        enlace: 'mailto:danielruizdeveloper@gmail.com'
    },
    {
        plataforma: "GitHub",
        usuario: "github.com/DanieloDEV24",
        icono: <IconoGithub />,
        color: '#31D492',
        enlace: 'https://github.com/DanieloDEV24'
    },
    {
        plataforma: "LinkedIn",
        usuario: "linkedin.com/in/daniel-ruiz-soto-831885315/",
        icono: <IconoLinkedin />,
        color: '#32cccc',
        enlace: 'https://www.linkedin.com/in/daniel-ruiz-soto-831885315/'
    },
    {
        plataforma: "Instagram",
        usuario: "@danielo.dev24",
        icono: <IconoInstagram />,
        color: '#8E51FF',
        enlace: 'https://www.instagram.com/danielo.dev24/?hl=es'
    },
];

/**
 * Contacto
 * Sección de contacto del portfolio: título, texto de invitación, botón para
 * descargar el CV y una lista de cards con los canales de contacto.
 * Todos los elementos entran con la animación fadeUp en cascada (cada uno con
 * un delay algo mayor que el anterior).
 * Es un componente presentacional: no tiene estado ni recibe props.
 *
 * @returns Un <section id="contacto"> (ancla usada por la navegación)
 */
export const Contacto = () => {
    return (
        // Contenedor de la sección. El id sirve de ancla para el menú (#contacto)
        <section id="contacto">

            {/* Título en dos líneas con estilos distintos. Reutiliza las clases del título de proyectos */}
            <motion.h2 className="contenedor-titulo" {...fadeUp}>
                <span className='titulo-proyectos-mis'>¿QUIERES QUE</span>
                <span className='titulo-proyectos-proyectos'>HABLEMOS?</span>
            </motion.h2>

            {/* Texto introductorio. Se sobrescribe transition para añadir un delay (0.08s)
                y que los elementos entren en cascada */}
            <motion.p
                className="texto-contacto"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.08 }}
            >
                ¿Tienes un proyecto en mente o buscas a alguien para tu equipo? Escríbeme por email o pásate por mis redes, respondo rápido. Si prefieres verlo todo junto, aquí tienes mi CV.
            </motion.p>

            {/* Botón de descarga del CV. El atributo download fuerza la descarga
                con ese nombre de archivo en lugar de abrir el PDF en el navegador */}
            <motion.a
                className="btn-cv"
                href={cvPdf}
                download="CV-Daniel-Ruiz-Soto.pdf"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.16 }}
            >
                Descargar CV

                {/* Icono de descarga (Tabler Icons) en SVG inline.
                    stroke="currentColor" hace que herede el color del texto del botón */}
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" /> {/* fondo invisible (estándar Tabler) */}
                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /> {/* bandeja inferior */}
                    <path d="M7 11l5 5l5 -5" />  {/* punta de la flecha */}
                    <path d="M12 4l0 12" />      {/* cuerpo de la flecha */}
                </svg>
            </motion.a>

            {/* Lista de cards de contacto, generada a partir del array modosContacto */}
            <ul className="contenedor-contacto">
                {modosContacto.map(function (modo, index) {
                    return (
                        <motion.li
                            key={index}
                            {...fadeUp}
                            // Delay escalonado: arranca tras el botón del CV (0.24s)
                            // y suma 0.08s por cada card
                            transition={{ ...fadeUp.transition, delay: 0.24 + index * 0.08 }}
                        >
                            {/* Toda la card es un enlace que se abre en pestaña nueva */}
                            <a href={modo.enlace} target="_blank">
                                <CardContacto
                                    icono={modo.icono}
                                    plataforma={modo.plataforma}
                                    usuario={modo.usuario}
                                    color={modo.color}
                                />
                            </a>
                        </motion.li>
                    )
                })}
            </ul>
        </section>
    )
}