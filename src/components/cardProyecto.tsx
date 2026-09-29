/**
 * CardProyecto
 * Tarjeta que presenta un proyecto del portfolio: imagen de portada, título,
 * badge de estado (en desarrollo / finalizado), descripción y enlaces al
 * repositorio de GitHub y a la web desplegada.
 * Es un componente presentacional: no tiene estado, solo pinta sus props.
 *
 * @param img         Ruta o URL de la imagen de portada
 * @param altImg      Texto alternativo de la imagen (accesibilidad)
 * @param titulo      Título del proyecto
 * @param descripcion Breve descripción del proyecto
 * @param estado      true = finalizado, false = en desarrollo
 * @param srcGitHub   URL del repositorio en GitHub
 * @param srcWeb      URL de la versión desplegada del proyecto
 * @returns           Un <article> con la información del proyecto
 */
export const CardProyecto = ({
    img,
    altImg,
    titulo,
    descripcion,
    estado,
    srcGitHub,
    srcWeb,
}: {
    img: string
    altImg: string
    titulo: string
    descripcion: string
    estado: boolean
    srcGitHub: string
    srcWeb: string
}) => {
    return (
        // Contenedor de la tarjeta. Cada proyecto es un bloque autónomo.
        <article className="card-proyecto">

            {/* Imagen de portada. El alt llega por props porque aquí sí es contenido informativo */}
            <img src={img} alt={altImg} />

            {/* Contenedor del contenido textual y los enlaces */}
            <div className="contenedor-card-proyecto">

                {/* Cabecera: título + badge de estado */}
                <div className="title-develop">
                    <h3 className="title-proyecto">{titulo}.</h3>

                    {/* Badge de estado. La clase cambia según `estado`:
                        !estado (false) -> "desarrollo", estado (true) -> "finalizado".
                        El CSS usa esa clase para colorear el badge. */}
                    <small className={`estado-proyecto ${!estado ? 'desarrollo' : 'finalizado'}`}>
                        {/* Icono/indicador (por ejemplo un punto de color) que se dibuja desde CSS */}
                        <span className="icono"></span>

                        {/* Texto del badge + icono de código "</>" */}
                        <span className="texto">
                            En desarrollo
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-code">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" /> {/* fondo invisible (estándar Tabler) */}
                                <path d="M7 8l-4 4l4 4" />   {/* corchete izquierdo "<" */}
                                <path d="M17 8l4 4l-4 4" />  {/* corchete derecho ">" */}
                                <path d="M14 4l-4 16" />     {/* barra "/" */}
                            </svg>
                        </span>
                    </small>
                </div>

                {/* Descripción del proyecto */}
                <p className="descripcion-proyecto">{descripcion}</p>

                {/* Enlaces externos: se abren en pestaña nueva.
                    rel="noopener noreferrer" evita que la página abierta acceda a window.opener */}
                <ul className="links">
                    {/* Enlace al repositorio (icono de GitHub) */}
                    <li>
                        <a href={srcGitHub} target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M9 19c-4.3 1.4 ..." /> {/* silueta del logo de GitHub */}
                            </svg>
                        </a>
                    </li>

                    {/* Enlace a la web desplegada (icono de enlace/cadena) */}
                    <li>
                        <a href={srcWeb} target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-link">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M9 15l6 -6" />  {/* eslabón central */}
                                <path d="M11 6l.463 -.536..." /> {/* eslabón superior */}
                                <path d="M13 18l-.397 .534..." /> {/* eslabón inferior */}
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </article>
    )
}