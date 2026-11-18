import { motion, MotionConfig, type Variants } from "motion/react"
import cv from '../assets/docs/CV-DanielRuizSoto.pdf'

/**
 * subida
 * Variante de entrada desde abajo con fundido (título y enlaces).
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

// Se dispara cuando el 30% del elemento es visible, solo una vez
const viewport = { once: true, amount: 0.3 }

/**
 * Contacto
 * Sección de contacto. Al hacer scroll hasta ella, el título y cada enlace
 * entran de forma escalonada (título → email → github → linkedin → CV → teléfono)
 * y se quedan quietos.
 * MotionConfig respeta la preferencia "reducir movimiento" del sistema.
 */
export const Contacto = () => {
    return (
        <MotionConfig reducedMotion="user">
            <section className="contacto" id="contacto">
                <div className="desgradado-contacto">
                    <div className="contenedor-contacto">
                    {/* Título: entra desde abajo con fundido */}
                    <motion.h2 variants={subida} custom={0.1} initial="oculto" whileInView="visible" viewport={viewport}>
                        ¿HABLA<span>MOS?</span>
                    </motion.h2>

                    <div className="enlaces-contcato">
                        {/* Email */}
                        <motion.a href="mailto:danielruizdeveloper@gmail.com" variants={subida} custom={0.3} initial="oculto" whileInView="visible" viewport={viewport}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" /><path d="M3 7l9 6l9 -6" /></svg>
                            Email
                        </motion.a>

                        {/* Github */}
                        <motion.a href="https://github.com/DanieloDEV24" target="_blank" rel="noreferrer" variants={subida} custom={0.42} initial="oculto" whileInView="visible" viewport={viewport}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
                            Github
                        </motion.a>

                        {/* LinkedIn */}
                        <motion.a href="https://www.linkedin.com/in/daniel-ruiz-soto" target="_blank" rel="noreferrer" variants={subida} custom={0.54} initial="oculto" whileInView="visible" viewport={viewport}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" /></svg>
                            LinkedIn
                        </motion.a>

                        {/* CV (pendiente de poner el enlace) */}
                        <motion.a href={cv} target="_blank" rel="noreferrer" variants={subida} custom={0.66} initial="oculto" whileInView="visible" viewport={viewport}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-file-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" /><path d="M12 17v-6" /><path d="M9.5 14.5l2.5 2.5l2.5 -2.5" /></svg>
                            CV
                        </motion.a>

                        {/* Teléfono */}
                        <motion.a href="tel:+34681671014" variants={subida} custom={0.78} initial="oculto" whileInView="visible" viewport={viewport}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-phone"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
                            Teléfono
                        </motion.a>
                    </div>
                </div>
                </div>
            </section>
        </MotionConfig>
    )
}