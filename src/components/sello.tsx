import { motion, type Variants } from "motion/react"
import flechaOscura from "../assets/images/flecha-oscura.png"

/**
 * Texto que rodea el sello. Se repite para cubrir toda la circunferencia
 * y termina con un separador para que el final enlace con el principio.
 */
const TEXTO = "DISPONIBLE PARA PROYECTOS • FULL STACK DEV • "

/**
 * RETRASO_SELLO
 * Segundos de espera antes de que entre el sello.
 * Va justo después de los iconos y antes del cartel (1.3s).
 */
const RETRASO_SELLO = 1.45

/**
 * entradaSello
 * Variante del círculo: aparece escalando y girando media vuelta con efecto muelle.
 * Se queda en reposo a 0deg, que es donde lo deja tu CSS.
 */
const entradaSello: Variants = {
    oculto: { opacity: 0, scale: 0.4, rotate: -90 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { delay: RETRASO_SELLO, type: "spring", stiffness: 180, damping: 15 },
    },
}

/**
 * entradaFlecha
 * Variante de la flecha central: entra desde la izquierda con fundido,
 * un instante después de que el círculo haya aparecido.
 */
const entradaFlecha: Variants = {
    oculto: { opacity: 0, x: -24 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { delay: RETRASO_SELLO + 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
}

/**
 * Sello circular: anillo de texto (SVG) alrededor de una flecha (PNG).
 * Es decorativo, por eso el SVG y la imagen van sin texto alternativo.
 * Hereda el MotionConfig del Home, así que respeta "reducir movimiento".
 */
export const Sello = () => {
    return (
        <motion.div className="circulo-flecha" variants={entradaSello} initial="oculto" animate="visible">
            {/* Anillo de texto: ocupa todo el círculo, por detrás de la flecha */}
            <svg className="sello-texto" viewBox="0 0 200 200" aria-hidden="true">
                <defs>
                    <path
                        id="guia-texto"
                        // Circunferencia invisible (radio 76) que guía el texto; empieza a la izquierda
                        d="M 24,100 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0"
                    />
                </defs>

                {/* Texto pegado a la guía; textLength (≈ 2π·76) lo reparte justo por toda la vuelta */}
                <text>
                    <textPath href="#guia-texto" textLength="470" lengthAdjust="spacing">
                        {TEXTO}
                    </textPath>
                </text>
            </svg>

            {/* Flecha central (tu PNG): hereda las variantes del círculo y usa las suyas */}
            <motion.img src={flechaOscura} alt="" variants={entradaFlecha} />
        </motion.div>
    )
}