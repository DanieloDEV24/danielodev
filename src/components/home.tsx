import { motion, MotionConfig, type Variants } from "motion/react"
import { ArrowIcon } from "./icons/arrowIcon"
import iconoDev from "../assets/images/icono-dev.png"
import flechaCurva from "../assets/images/flecha-curva.png"
import iconoHastag from "../assets/images/icono-hashtag.png"
import flecha from "../assets/images/flecha.png"

import { Sello } from "./sello"

/**
 * subida
 * Variante de entrada desde abajo con fundido (título, texto y botones).
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

/**
 * pop
 * Variante de entrada con "pop" (escala + giro con efecto muelle).
 * Termina en el ángulo final que antes tenía cada elemento en el CSS,
 * porque Motion escribe el transform en línea y pisaría el del CSS.
 * No hay animación en bucle: tras entrar, el elemento se queda quieto.
 * @param custom.retraso Segundos de espera antes de empezar
 * @param custom.giro Ángulo final en grados (el de reposo)
 */
const pop: Variants = {
    oculto: ({ giro }: { retraso: number; giro: number }) => ({
        opacity: 0,
        scale: 0.5,
        rotate: giro - 12,
    }),
    visible: ({ retraso, giro }: { retraso: number; giro: number }) => ({
        opacity: 1,
        scale: 1,
        rotate: giro,
        transition: { delay: retraso, type: "spring", stiffness: 260, damping: 16 },
    }),
}

/**
 * Home
 * Sección principal de la web. Al cargar, los elementos entran de forma
 * escalonada (título → texto → botones → iconos → cartel) y se quedan quietos.
 * MotionConfig respeta la preferencia "reducir movimiento" del sistema.
 */
export const Home = () => {
    return (
        <MotionConfig reducedMotion="user">
            <section className="home" id="home">
                {/* Título: entra desde abajo con fundido */}
                <motion.h1 variants={subida} custom={0.1} initial="oculto" animate="visible">
                    WEBS QUE <span>SE NOTAN.</span>
                </motion.h1>

                {/* Presentación */}
                <motion.p variants={subida} custom={0.3} initial="oculto" animate="visible">
                    Soy Daniel Ruiz, desarrollador <strong>Full Stack</strong> y <strong>docente.</strong> Me gusta convertir ideas en aplicaciones web robustas, bien diseñadas y fáciles de mantener.
                </motion.p>

                {/* Botones principales */}
                <motion.footer className="buttons-home" variants={subida} custom={0.5} initial="oculto" animate="visible">
                    <a href="/#proyectos" className="primary-link">Ver proyectos <ArrowIcon /> </a>
                    <a href="/#contacto" className="secondary-link">Hablemos</a>
                </motion.footer>

                {/* Iconos decorativos: entran con "pop" y se quedan en su ángulo del CSS */}

                {/* Icono dev: reposa a 12deg */}
                <motion.img src={iconoDev} alt="" id="icono-dev" variants={pop} custom={{ retraso: 0.7, giro: 12 }} initial="oculto" animate="visible" />

                {/* Flecha curva: reposa a -120deg y espejada en horizontal (scaleX -1 estático) */}
                <motion.img src={flechaCurva} alt="" id="icono-flecha" style={{ scaleX: -1 }} variants={pop} custom={{ retraso: 0.85, giro: -120 }} initial="oculto" animate="visible" />

                {/* Hashtag: reposa a 105deg */}
                <motion.img src={iconoHastag} alt="" id="icono-hastag" variants={pop} custom={{ retraso: 1, giro: 105 }} initial="oculto" animate="visible" />

                {/* Flecha: sin giro */}
                <motion.img src={flecha} alt="" id="flecha" variants={pop} custom={{ retraso: 1.15, giro: 0 }} initial="oculto" animate="visible" />

                {/* Sello giratorio */}
                <Sello />

                {/* Cartel DEV + DOCENTE: reposa a -15deg */}
                <motion.div className="cartel-dev-docente" variants={pop} custom={{ retraso: 1.3, giro: -15 }} initial="oculto" animate="visible">
                    <p>DEV + DOCENTE</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-asterisk">
                        {/* Fondo transparente del icono */}
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        {/* Brazo superior derecho */}
                        <path d="M12 12l8 -4.5" />
                        {/* Brazo inferior vertical */}
                        <path d="M12 12v9" />
                        {/* Brazo superior izquierdo */}
                        <path d="M12 12l-8 -4.5" />
                        {/* Brazo inferior derecho */}
                        <path d="M12 12l8 4.5" />
                        {/* Brazo superior vertical */}
                        <path d="M12 3v9" />
                        {/* Brazo inferior izquierdo */}
                        <path d="M12 12l-8 4.5" />
                    </svg>
                </motion.div>
            </section>
        </MotionConfig>
    )
}