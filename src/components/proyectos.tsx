import turismo from '../assets/img/turismo.png';
import reservalo from '../assets/img/reservalo.png';
import rotMoncayo from '../assets/img/rotulos-moncayo.png';
import myno from '../assets/img/myno-solutions.png'

import { CardProyecto } from "../components/cardProyecto"

const projects = [
    {
        img: reservalo, 
        altImg: "icono de la web de reservas Reservalo",
        title: "Reservalo", 
        description: "Web de reservas de las instalaciones municipales", 
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
        <div id="proyectos">
           <div id="contenedor-proyectos">
                <div className="contenedor-titulo">
                        <h1 className='titulo-proyectos-mis'>MIS</h1>
                        <h1 className='titulo-proyectos-proyectos'>PROYECTOS</h1>
                </div>

                <div className="contenedor-proyectos">
                    {projects.map(function(p) {
                        return <CardProyecto img={p.img} altImg={p.altImg} titulo={p.title} descripcion={p.description} estado={p.estado} srcGitHub={p.srcGitHub} srcWeb={p.srcWeb}/>
                    })}
                </div>
           </div>
        </div>
    )
}  