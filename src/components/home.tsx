import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'motion/react'
import { CardExperiencia } from "./cardExperiencia";

/**
 * fadeUp
 * Animación de entrada reutilizable: el elemento aparece desde abajo con fade
 * cuando entra en pantalla. Se esparce con {...fadeUp} en cualquier motion.*
 *
 * - initial:     estado de partida (transparente y 30px más abajo)
 * - whileInView: estado final al entrar en el viewport
 * - viewport:    once -> solo se anima la primera vez; amount -> se dispara al ver el 30%
 * - transition:  0.6s con curva cubic-bezier suave ("as const" fija el tipo como tupla)
 */
const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

/**
 * CounterProps
 * Props del contador animado.
 *
 * @property to       Número final al que cuenta
 * @property prefix   Texto que se antepone al número (por ejemplo "+")
 * @property duration Duración de la cuenta en segundos (por defecto 1.4)
 * @property delay    Espera antes de empezar a contar, en segundos (por defecto 0)
 */
type CounterProps = {
    to: number
    prefix?: string
    duration?: number
    delay?: number
}

/**
 * Counter
 * Contador que sube de 0 hasta `to` cuando el elemento entra en pantalla.
 * Usa useInView para detectar la visibilidad y animate() de motion para
 * generar los valores intermedios, que se guardan en estado para pintarlos.
 * Solo cuenta una vez (once: true).
 *
 * @param to       Número final
 * @param prefix   Prefijo opcional (por ejemplo "+")
 * @param duration Duración de la animación en segundos
 * @param delay    Retraso antes de empezar, en segundos
 * @returns Un <span> con el prefijo y el valor actual
 */
const Counter = ({ to, prefix = '', duration = 1.4, delay = 0 }: CounterProps) => {
    // Referencia al <span> para que useInView sepa qué elemento vigilar
    const ref = useRef<HTMLSpanElement>(null)

    // true cuando el 60% del elemento es visible; once -> no vuelve a false
    const isInView = useInView(ref, { once: true, amount: 0.6 })

    // Valor que se muestra en este instante (empieza en 0)
    const [value, setValue] = useState(0)

    useEffect(() => {
        // Hasta que no sea visible no arrancamos la cuenta
        if (!isInView) return

        // animate(desde, hasta, opciones): onUpdate recibe el valor en cada frame
        const controls = animate(0, to, {
            duration,
            delay,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => setValue(Math.round(latest)), // redondeamos para no mostrar decimales
        })

        // Limpieza: si el componente se desmonta a mitad de la cuenta, se detiene la animación
        return () => controls.stop()
    }, [isInView, to, duration, delay])

    return <span ref={ref}>{prefix}{value}</span>
}

/**
 * Home
 * Sección de portada del portfolio: título, texto de presentación, tres
 * contadores (proyectos, herramientas y años de experiencia) y una lista de
 * cards con la experiencia profesional.
 * Todos los bloques entran con la animación fadeUp en cascada (cada uno con
 * un delay algo mayor que el anterior).
 * No tiene estado propio ni recibe props.
 *
 * @returns Un <section id="home"> (ancla usada por el menú)
 */
export const Home = () => {

    // Datos de la experiencia profesional. Al ser un array, añadir o quitar
    // una experiencia no requiere tocar el JSX.
    // - puesto:      cargo desempeñado
    // - empresa:     dónde (o "Freelancer")
    // - descripcion: resumen de lo que se hizo
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
        // Contenedor de la sección. El id sirve de ancla para el menú (#home)
        // aria-labelledby enlaza la sección con su título (ver notas al final)
        <section id="home" aria-labelledby="titulo-home">

            <div id="contenedor-home">
                
                {/* Título principal en dos líneas con estilos distintos */}
                <motion.h1 {...fadeUp}>
                    <span className='titulo-home-dev'>DESARROLLADOR</span>
                    <span className='titulo-home-full'>FULL STACK.</span>
                </motion.h1>

                {/* Texto de presentación. Se sobrescribe transition para añadir un delay (0.08s)
                    y que los elementos entren en cascada */}
                <motion.p
                    className="texto-home"
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.08 }}
                >
                    Soy Daniel, desarrollador Full Stack y docente en desarrollo web. Me gusta construir cosas que funcionen y que la gente use de verdad, y también compartir lo que sé para que otros puedan aprender a hacerlo. Aprendo rápido, me adapto a lo que el proyecto necesita y siempre busco mejorar.
                </motion.p>

                {/* Contadores. Se usa una lista de definición (dl): dt = número, dd = etiqueta.
                    Cada pareja va envuelta en un <div>, algo válido en HTML5 para poder estilarla */}
                <motion.dl
                    className="contenedor-contadores-home"
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.16 }}
                >
                    {/* Proyectos reales */}
                    <div>
                        <dt><Counter to={3} prefix="+" delay={0.1} /></dt>
                        <dd>proyectos Reales</dd>
                    </div>

                    {/* Herramientas */}
                    <div>
                        <dt><Counter to={8} prefix="+" delay={0.1} /></dt>
                        <dd>herramientas</dd>  
                    </div>

                    {/* Años de experiencia */}
                    <div>
                        <dt><Counter to={1} prefix="+" delay={0.1} /></dt>
                        <dd>año de experiencia</dd>
                    </div>
                </motion.dl>

                {/* Lista de experiencia, generada a partir del array `experiencias` */}
                <footer className="experiencia">
                    {
                        experiencias.map(function(e, index){
                            return (
                                <motion.div
                                    key={index}
                                    {...fadeUp}
                                    // Delay escalonado: arranca tras los contadores (0.24s)
                                    // y suma 0.1s por cada card
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