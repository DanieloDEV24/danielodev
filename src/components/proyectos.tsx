import turismo from '../assets/img/turismo.png';
import reservalo from '../assets/img/reservalo.jpeg';
import rotMoncayo from '../assets/img/rotulos-moncayo.png';
import myno from '../assets/img/myno-solutions.png'

import { CardProyecto } from "../components/cardProyecto"

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

export const Proyectos = () => {
    return (
        <section id="proyectos">
                <h2 className="contenedor-titulo">
                        <span className='titulo-proyectos-mis'>MIS</span>
                        <span className='titulo-proyectos-proyectos'>PROYECTOS.</span>
                </h2>

                <p className='description'>Algunos de los proyectos en los que he estado trabajando últimamente. Desde aplicaciones web funcionales hasta soluciones digitales pensadas para necesidades reales.</p>

                <ul className="proyectos">
                    {
                        projects.map(function(p, index){
                            return <li key={index}>
                                    <CardProyecto 
                                        img={p.img}
                                        altImg={p.altImg}
                                        titulo={p.title}
                                        descripcion={p.description}
                                        estado={p.estado}
                                        srcGitHub={p.srcGitHub}
                                        srcWeb={p.srcWeb}
                                    />
                                </li>
                        })
                    }
                </ul>
        </section>
    )
}  