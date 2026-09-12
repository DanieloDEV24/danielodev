import type { JSX } from "react"

export const CardContacto = ({icono, plataforma, usuario, color} : {icono: JSX.Element, plataforma: string, usuario: string, color: string}) => {
    return (
        <article className="card-contacto">
            <div className="contenedor-img">
                {icono}
            </div>

            <div className="contenedor-texto">
                <h3 className="nombre-herramienta">{plataforma}</h3>
                <p className="categoria-herramienta">{usuario}</p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up-right">
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M17 7l-10 10" />
	<path d="M8 7l9 0l0 9" />
</svg>
        </article>
    )
}