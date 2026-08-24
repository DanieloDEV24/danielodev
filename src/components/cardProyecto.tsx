export const CardProyecto = ({img, altImg, titulo, descripcion, estado, srcGitHub, srcWeb}: {img: string, altImg: string, titulo: string, descripcion: string, estado: boolean, srcGitHub: string, srcWeb: string}) => {
    return (
        <div className="card-proyecto">
             <img src={img} alt={altImg} className="icono-proyecto" />
             <div className="contenedor-texto-card">
                <h2>{titulo}</h2>
                <p>{descripcion}</p>
                <div className="enlaces-proyecto">
                    <a href="">
                        <svg width="28px" height="28px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 22.0268V19.1568C16.0375 18.68 15.9731 18.2006 15.811 17.7506C15.6489 17.3006 15.3929 16.8902 15.06 16.5468C18.2 16.1968 21.5 15.0068 21.5 9.54679C21.4997 8.15062 20.9627 6.80799 20 5.79679C20.4558 4.5753 20.4236 3.22514 19.91 2.02679C19.91 2.02679 18.73 1.67679 16 3.50679C13.708 2.88561 11.292 2.88561 8.99999 3.50679C6.26999 1.67679 5.08999 2.02679 5.08999 2.02679C4.57636 3.22514 4.54413 4.5753 4.99999 5.79679C4.03011 6.81549 3.49251 8.17026 3.49999 9.57679C3.49999 14.9968 6.79998 16.1868 9.93998 16.5768C9.61098 16.9168 9.35725 17.3222 9.19529 17.7667C9.03334 18.2112 8.96679 18.6849 8.99999 19.1568V22.0268" stroke="#ff5400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 20.0267C6 20.9999 3.5 20.0267 2 17.0267" stroke="#ff5400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                    <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="currentColor" fill="none" stroke="#141B34" stroke-width="1.5" stroke-linecap="round">
    <path d="M10 13.229C10.1416 13.4609 10.3097 13.6804 10.5042 13.8828C11.7117 15.1395 13.5522 15.336 14.9576 14.4722C15.218 14.3121 15.4634 14.1157 15.6872 13.8828L18.9266 10.5114C20.3578 9.02184 20.3578 6.60676 18.9266 5.11718C17.4953 3.6276 15.1748 3.62761 13.7435 5.11718L13.03 5.85978" />
    <path d="M10.9703 18.14L10.2565 18.8828C8.82526 20.3724 6.50471 20.3724 5.07345 18.8828C3.64218 17.3932 3.64218 14.9782 5.07345 13.4886L8.31287 10.1172C9.74413 8.62761 12.0647 8.6276 13.4959 10.1172C13.6904 10.3195 13.8584 10.539 14 10.7708" />
</svg>
                    </a>
                </div>
             </div>

        </div>
    )
}