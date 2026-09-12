import { IconoEmail } from "./icons/iconoEmail";
import { IconoGithub } from "./icons/iconoGithub";
import { IconoInstagram } from "./icons/iconoInstagram";
import { IconoLinkedin } from "./icons/iconoLinkedin";
import type { JSX } from "react";
import { CardContacto } from "./cardContacto";

export const modosContacto: { plataforma: string; usuario: string; icono: JSX.Element, color: string, enlace: string }[] = [
    {
        plataforma: "Email",
        usuario: "danielruizdeveloper.com",
        icono: <IconoEmail />,
        color: '#c63400', 
        enlace: 'mailto:danielruizdeveloper@gmail.com'
    },
    {
        plataforma: "GitHub",
        usuario: "github.com/DanieloDEV24",
        icono: <IconoGithub />,
        color: '#31D492', 
        enlace: 'https://github.com/DanieloDEV24'
    },
    {
        plataforma: "LinkedIn",
        usuario: "linkedin.com/in/daniel-ruiz-soto-831885315/",
        icono: <IconoLinkedin />,
        color: '#32cccc', 
        enlace: 'https://www.linkedin.com/in/daniel-ruiz-soto-831885315/'
    },
    {
        plataforma: "Instagram",
        usuario: "@danielo.dev24",
        icono: <IconoInstagram />,
        color: '#8E51FF', 
        enlace: 'https://www.instagram.com/danielo.dev24/?hl=es'
    },
];

export const Contacto = () => {
    return (
        <section id="contacto">
            <h2 className="contenedor-titulo">
                <span className='titulo-proyectos-mis'>¿QUIERES QUE</span>
                <span className='titulo-proyectos-proyectos'>HABLEMOS?</span>
            </h2>
            <p className="texto-contacto">¿Tienes un proyecto en mente o buscas a alguien para tu equipo? Escríbeme por email o pásate por mis redes, respondo rápido. Si prefieres verlo todo junto, aquí tienes mi CV.</p>
            <button className="btn-cv">
                Descargar CV <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download">
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
	<path d="M7 11l5 5l5 -5" />
	<path d="M12 4l0 12" />
</svg>
            </button>

            <ul className="contenedor-contacto">
                {modosContacto.map(function(modo){
                    return <li><a href={modo.enlace}><CardContacto icono={modo.icono} plataforma={modo.plataforma} usuario={modo.usuario} color={modo.color}/></a></li>
                })}
            </ul>
        </section>
    )
}