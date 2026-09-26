import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'motion/react'
import { CardExperiencia } from "./cardExperiencia";

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

type CounterProps = {
    to: number
    prefix?: string
    duration?: number
    delay?: number
}

const Counter = ({ to, prefix = '', duration = 1.4, delay = 0 }: CounterProps) => {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.6 })
    const [value, setValue] = useState(0)

    useEffect(() => {
        if (!isInView) return

        const controls = animate(0, to, {
            duration,
            delay,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => setValue(Math.round(latest)),
        })

        return () => controls.stop()
    }, [isInView, to, duration, delay])

    return <span ref={ref}>{prefix}{value}</span>
}

export const Home = () => {

    const experiencias = [
        {
            puesto: 'Desarrollador de Aplicaciones Web.', 
            empresa: 'Ayuntamiento de Fuente de Piedra.',
            descripcion: 'Desarrollo de aplicaciones web para el consistorio: una plataforma de gestión y reservas de instalaciones y actividades municipales, y la web oficial de turismo del municipio.'
        }, 
        {
            puesto: 'Desarrollador de Aplicaciones Web.', 
            empresa: 'Freelancer.',
            descripcion: 'Diseño y desarrollo de sitios web para empresas, incluyendo Rótulos Moncayo. Actualmente en desarrollo la web de Myno Solutions y una plataforma de reservas para el centro de belleza N23.'
        }, 
        {
            puesto: 'Tutor e-learning.', 
            empresa: 'Grupo Dabo Consulting.',
            descripcion: 'Docencia online en formación de desarrollo web e informática, resolviendo dudas del alumnado, corrigiendo ejercicios y haciendo seguimiento del progreso en los cursos.'
        }
    ];

    return(
        <section id="home" aria-labelledby="titulo-home">

            <div id="contenedor-home">
                
                <motion.h1 {...fadeUp}>
                    <span className='titulo-home-dev'>DESARROLLADOR</span>
                    <span className='titulo-home-full'>FULL STACK.</span>
                </motion.h1>

                <motion.p
                    className="texto-home"
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.08 }}
                >
                    Soy Daniel, desarrollador Full Stack y docente en desarrollo web. Me gusta construir cosas que funcionen y que la gente use de verdad, y también compartir lo que sé para que otros puedan aprender a hacerlo. Aprendo rápido, me adapto a lo que el proyecto necesita y siempre busco mejorar.
                </motion.p>

<motion.dl
    className="contenedor-contadores-home"
    {...fadeUp}
    transition={{ ...fadeUp.transition, delay: 0.16 }}
>
    <div>
        <dt><Counter to={3} prefix="+" delay={0.1} /></dt>
        <dd>proyectos Reales</dd>
    </div>

    <div>
        <dt><Counter to={8} prefix="+" delay={0.1} /></dt>
        <dd>herramientas</dd>  
    </div>

    <div>
        <dt><Counter to={1} prefix="+" delay={0.1} /></dt>
        <dd>año de experiencia</dd>
    </div>
</motion.dl>

                <footer className="experiencia">
                    {
                        experiencias.map(function(e, index){
                            return (
                                <motion.div
                                    key={index}
                                    {...fadeUp}
                                    transition={{ ...fadeUp.transition, delay: 0.24 + index * 0.1 }}
                                >
                                    <CardExperiencia puesto={e.puesto} empresa={e.empresa} descripcion={e.descripcion}/>
                                </motion.div>
                            )
                        })
                    }
                </footer>
            </div>

        </section>
    )
}