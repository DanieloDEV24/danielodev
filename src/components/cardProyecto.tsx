export const CardProyecto = ({img, altImg, titulo, descripcion, estado, srcGitHub, srcWeb}: {img: string, altImg: string, titulo: string, descripcion: string, estado: boolean, srcGitHub: string, srcWeb: string}) => {
    return (
        <article className="card-proyecto">
            <img src={img} alt={altImg} />
            <div className="title-develop">
                <h3 className="title-proyecto">{titulo}.</h3>
                <small className={`estado-proyecto ${!estado ? 'desarrollo' : 'finalizado'}`}>
                    <span className="icono"></span>
                    <span className="texto">En desarrollo <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-code">
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M7 8l-4 4l4 4" />
	<path d="M17 8l4 4l-4 4" />
	<path d="M14 4l-4 16" />
</svg></span>
                </small>
            </div>
            <p className="descripcion-proyecto">{descripcion}</p>
            <ul className="links">
                <li><a href={srcGitHub} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg></a></li>
                <li><a href={srcWeb} target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-link"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 15l6 -6" /><path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" /><path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" /></svg></a></li>
            </ul>
        </article>
    )
}