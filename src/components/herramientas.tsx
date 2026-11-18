import { motion, MotionConfig, type Variants } from "motion/react"

/**
 * subida
 * Variante de entrada desde abajo con fundido (título y bloques).
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

/**
 * Herramientas
 * Sección de herramientas. Al hacer scroll hasta ella, el título y cada
 * bloque (frontend → backend → otras) entran de forma escalonada y se quedan quietos.
 * MotionConfig respeta la preferencia "reducir movimiento" del sistema.
 */
export const Herramientas = () => {
    return (
        <MotionConfig reducedMotion="user">
            <section className="herramientas" id="herramientas">
                {/* Título: entra desde abajo con fundido */}
                <motion.h2 variants={subida} custom={0.1} initial="oculto" whileInView="visible" viewport={viewport}>
                    HERRAMIEN<span>TAS.</span>
                </motion.h2>

                <ul className="contenedor-herramientas">
                    {/* Frontend */}
                    <motion.li variants={subida} custom={0.3} initial="oculto" whileInView="visible" viewport={viewport}>
                        <small>FRONTEND.</small>
                        <div className="stacks-herramientas">
                            <span>JQuery</span>
                            <span>JavaScript</span>
                            <span>TypeScript</span>
                            <span>React</span>
                            <span>Bootstrap</span>
                            <span>Tailwind</span>
                            <span>HTML5</span>
                            <span>CSS3</span>
                        </div>
                    </motion.li>

                    {/* Backend */}
                    <motion.li variants={subida} custom={0.45} initial="oculto" whileInView="visible" viewport={viewport}>
                        <small>BACKEND.</small>
                        <div className="stacks-herramientas">
                            <span>Php</span>
                            <span>CodeIgniter4</span>
                            <span>MySQL</span>
                            <span>Java</span>
                        </div>
                    </motion.li>

                    {/* Otras herramientas */}
                    <motion.li variants={subida} custom={0.6} initial="oculto" whileInView="visible" viewport={viewport}>
                        <small>OTRAS HERRAMIENTAS.</small>
                        <div className="stacks-herramientas">
                            <span>Git</span>
                            <span>GitHub</span>
                            <span>VS Code</span>
                            <span>Linux</span>
                            <span>Claude</span>
                            <span>Vite</span>
                        </div>
                    </motion.li>
                </ul>
            </section>
        </MotionConfig>
    )
}