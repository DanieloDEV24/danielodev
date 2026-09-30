import { motion } from 'motion/react'
import turismo from '../assets/img/turismo.png';
import reservalo from '../assets/img/reservalo.jpeg';
import rotMoncayo from '../assets/img/rotulos-moncayo.png';
import myno from '../assets/img/myno-solutions.png'

import { CardProyecto } from "../components/cardProyecto"

/**
 * fadeUp
 * Configuración de animación reutilizable (motion): el elemento aparece
 * desplazándose 30px hacia arriba mientras pasa de transparente a opaco.
 * Se reparte con spread ({...fadeUp}) sobre cualquier componente motion.
 *
 * @property initial     Estado inicial: invisible y 30px más abajo
 * @property whileInView Estado final, que se activa al entrar en pantalla
 * @property viewport    once: solo anima la primera vez; amount: se dispara cuando el 30% es visible
 * @property transition  Duración de 0.6 s con una curva de easing suave (el "as const" fija la tupla)
 */
const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

/**
 * projects
 * Datos de los proyectos que se muestran en la sección.
 * Cada objeto se convierte en una tarjeta (CardProyecto).
 *
 * @property img         Imagen o icono del proyecto (importada arriba)
 * @property altImg      Texto alternativo de la imagen, para accesibilidad
 * @property title       Nombre del proyecto
 * @property description Resumen breve de qué hace el proyecto
 * @property estado      true si el proyecto está publicado online, false si aún no lo está
 * @property srcGitHub   Enlace al repositorio de GitHub
 * @property srcWeb      Enlace a la web en producción (vacío si aún no está publicada)
 */
const projects = [
    {
        img: reservalo, 
        altImg: "icono de la web de reservas Reservalo",
        title: "Reservalo", 
        description: "Reserva pistas deportivas, espacios municipales y actividades como excursiones en pocos clics. Disponibilidad en tiempo real y gestión de reservas, todo desde un solo lugar.", 
        estado: false, 
        srcGitHub: "https://github.com/DanieloDEV24/reservalo2.0", 
        srcWeb: ""
    }, 

    {
        img: turismo, 
        altImg: "icono de turismo de Fuente de Piedra",
        title: "Fuente de Piedra Turismo", 
        description: "Descubre qué ver, qué hacer y dónde alojarte en Fuente de Piedra. Rutas, patrimonio y gastronomía, toda la información turística del municipio en un solo lugar.", 
        estado: true, 
        srcGitHub: "https://github.com/DanieloDEV24/fuentedepiedraturismo", 
        srcWeb: "https://fuentedepiedraturismo.com/"
    }, 

    {
        img: rotMoncayo,
        altImg: "icono de la empresa Rótulos Moncayo", 
        title: "Rotulos Moncayo", 
        description: "Web corporativa para una empresa de rótulos y serigrafiados: catálogo de servicios, galería de trabajos realizados y formulario de contacto, con un diseño que refleja su identidad de marca..", 
        estado: true, 
        srcGitHub: "https://github.com/inidev-code/01-rotulosmoncayo", 
        srcWeb: "https://rotulosmoncayo.es/"
    }, 

    {
        img: myno, 
        altImg: "icono de la empresa Myno Studio", 
        title: "Myno Solutions", 
        description: "Web corporativa para mi empresa de desarrollo web y marketing digital: presentación de servicios, portfolio de proyectos y formulario de contacto, con un diseño propio pensado para transmitir profesionalidad y cercanía.", 
        estado: false, 
        srcGitHub: "https://github.com/DanieloDEV24/maynosolutions", 
        srcWeb: ""
    }
]

/**
 * Proyectos
 * Sección "Mis proyectos" del portfolio. Muestra un título, una descripción
 * y una lista de tarjetas generadas a partir del array `projects`.
 * Todos los bloques aparecen con la animación fadeUp al hacer scroll;
 * los retrasos (delay) escalonados crean un efecto de entrada en cascada.
 *
 * @returns Un <section id="proyectos"> con el título, el texto introductorio y la lista de proyectos
 */
export const Proyectos = () => {
    return (
        // El id permite enlazar a la sección desde el menú de navegación (#proyectos)
        <section id="proyectos">

                {/* Título en dos partes para poder darle estilos distintos a cada palabra */}
                <motion.h2 className="contenedor-titulo" {...fadeUp}>
                        <span className='titulo-proyectos-mis'>MIS</span>
                        <span className='titulo-proyectos-proyectos'>PROYECTOS.</span>
                </motion.h2>

                {/* Texto introductorio. Copia fadeUp pero sobrescribe transition
                    para añadirle un pequeño retraso (0.08 s) respecto al título */}
                <motion.p
                    className='description'
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.08 }}
                >
                    Algunos de los proyectos en los que he estado trabajando últimamente. Desde aplicaciones web funcionales hasta soluciones digitales pensadas para necesidades reales.
                </motion.p>

                {/* Lista de proyectos: un <li> animado por cada elemento de `projects` */}
                <ul className="proyectos">
                    {
                        projects.map(function(p, index){
                            // key={index} es válido aquí: la lista es estática y nunca se reordena.
                            // El delay crece con el índice (0.16 s + 0.1 s por tarjeta): aparecen una tras otra
                            return <motion.li
                                    key={index}
                                    {...fadeUp}
                                    transition={{ ...fadeUp.transition, delay: 0.16 + index * 0.1 }}
                                >
                                    {/* Tarjeta del proyecto: recibe los datos del objeto actual.
                                        Los nombres de las props están en español (titulo, descripcion),
                                        distintos de las claves del array (title, description) */}
                                    <CardProyecto 
                                        img={p.img}
                                        altImg={p.altImg}
                                        titulo={p.title}
                                        descripcion={p.description}
                                        estado={p.estado}
                                        srcGitHub={p.srcGitHub}
                                        srcWeb={p.srcWeb}
                                    />
                                </motion.li>
                        })
                    }
                </ul>
        </section>
    )
}