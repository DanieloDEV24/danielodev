export const CardHerramienta = ({img, nombre, categoria}: {img: string, nombre: string, categoria: string}) => {
    return (
        <article className="card-herramienta">
            <div className="contenedor-img">
                <img src={img} alt="" />
            </div>

            <div className="contenedor-texto">
                <h3 className="nombre-herramienta">{nombre}</h3>
                <p className="categoria-herramienta">{categoria}</p>
            </div>
        </article>
    )
}