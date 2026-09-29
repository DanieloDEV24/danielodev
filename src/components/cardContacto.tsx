import type { JSX } from "react"

/**
 * CardContacto
 * Tarjeta que muestra un método de contacto (por ejemplo LinkedIn, GitHub, email).
 * Incluye un icono, el nombre de la plataforma, el usuario/handle y una flecha
 * decorativa que indica que es un enlace externo.
 *
 * @param icono      Elemento JSX con el icono de la plataforma (SVG, componente de icono, etc.)
 * @param plataforma Nombre de la plataforma (ej. "GitHub")
 * @param usuario    Usuario, handle o dirección de contacto (ej. "@miusuario")
 * @param color      Color asociado a la plataforma (actualmente NO se usa, ver notas)
 * @returns          Un <article> con la tarjeta de contacto
 */
export const CardContacto = ({
    icono,
    plataforma,
    usuario,
    color,
}: {
    icono: JSX.Element
    plataforma: string
    usuario: string
    color: string
}) => {
    return (
        // Contenedor principal de la tarjeta. Usar <article> es correcto
        // semánticamente porque es un bloque de contenido autónomo.
        <article className="card-contacto">

            {/* Zona del icono: se pinta el JSX que llega por props */}
            <div className="contenedor-img">
                {icono}
            </div>

            {/* Zona de texto: nombre de la plataforma y usuario */}
            <div className="contenedor-texto">
                <h3 className="nombre-herramienta">{plataforma}</h3>
                <p className="categoria-herramienta">{usuario}</p>
            </div>

            {/* Flecha diagonal (↗) decorativa que sugiere "abrir enlace".
                Es un icono de Tabler Icons incrustado en línea. */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor" // Hereda el color del texto del padre
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up-right"
            >
                {/* Trazado invisible de fondo (estándar de Tabler) */}
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                {/* Línea diagonal de la flecha */}
                <path d="M17 7l-10 10" />
                {/* Punta de la flecha */}
                <path d="M8 7l9 0l0 9" />
            </svg>
        </article>
    )
}