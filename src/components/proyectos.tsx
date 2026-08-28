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
        description: "Web de Turismo de Fuente de Piedra", 
        estado: true, 
        srcGitHub: "https://github.com/DanieloDEV24/fuentedepiedraturismo", 
        srcWeb: "https://fuentedepiedraturismo.com/"
    }, 

    {
        img: rotMoncayo,
        altImg: "icono de la empresa Rótulos Moncayo", 
        title: "Rotulos Moncayo", 
        description: "Web de una empresa de rótulos y serigrafiados", 
        estado: true, 
        srcGitHub: "https://github.com/inidev-code/01-rotulosmoncayo", 
        srcWeb: "https://rotulosmoncayo.es/"
    }, 

    {
        img: myno, 
        altImg: "icono de la empresa Myno Studio", 
        title: "Myno Studio", 
        description: "Web empresa de desarrollo web y marketing digital", 
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
                        projects.map(function(p){
                            return <li>
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