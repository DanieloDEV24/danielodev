import { motion, MotionConfig, type Variants } from "motion/react"

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

/**
 * SobreMi
 * Sección "Sobre mí". Al hacer scroll hasta ella, los elementos entran de
 * forma escalonada (título → card dev → card docente) y se quedan quietos.
 * viewport.once evita que se repita la animación al volver a subir.
 * MotionConfig respeta la preferencia "reducir movimiento" del sistema.
 */
export const SobreMi = () => {
    // Se dispara cuando el 30% del elemento es visible, solo una vez
    const viewport = { once: true, amount: 0.3 }

    return (
        <MotionConfig reducedMotion="user">
            <section className="sobreMi" id="sobreMi">
                {/* Título: entra desde abajo con fundido */}
                <motion.h2 variants={subida} custom={0.1} initial="oculto" whileInView="visible" viewport={viewport}>
                    SOBRE <span>MÍ.</span>
                </motion.h2>

                <div className="cards">
                    {/* Card desarrollo */}
                    <motion.div className="card-dev" variants={subida} custom={0.3} initial="oculto" whileInView="visible" viewport={viewport}>
                        <small>Ayuntamiento de Fuente de Piedra | Freelancer. </small>
                        <h3>DESARROLLO WEB DE PRINCIPIO A FIN.</h3>
                        <p>En el Ayuntamiento de Fuente de Piedra desarrollé Reservalo, la plataforma de reservas de instalaciones y actividades municipales, con panel de gestión, control de franjas horarias y solapamientos, y notificaciones por email con PDF adjunto. También mejoré la web de turismo. Hoy trabajo como freelance: diseño webs para los negocios y empresas de la zona.</p>
                    </motion.div>

                    {/* Card docente: entra un poco después */}
                    <motion.div className="card-docente" variants={subida} custom={0.5} initial="oculto" whileInView="visible" viewport={viewport}>
                        <small>Grupo Dabo Consulting. </small>
                        <h3>ENSEÑO A CONSTRUIR LA WEB.</h3>
                        <p>Como tutor e-learning en Grupo Dabo Consulting tutoricé dos cursos online a la vez en Moodle, con seguimiento personalizado del progreso, corrección de ejercicios y soporte técnico a los alumnos. Antes, formé en persona en informática a empleados y usuarios del municipio.</p>
                    </motion.div>
                </div>
            </section>
        </MotionConfig>
    )
}