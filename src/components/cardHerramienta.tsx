/**
 * CardHerramienta
 * Tarjeta que muestra una herramienta o tecnología (por ejemplo React, Git, Figma):
 * su logo, su nombre y la categoría a la que pertenece (Frontend, Diseño, etc.).
 * Es un componente puramente presentacional: no tiene estado ni lógica,
 * solo pinta los datos que recibe por props.
 *
 * @param img       Ruta o URL del logo de la herramienta
 * @param nombre    Nombre de la herramienta (ej. "React")
 * @param categoria Categoría o tipo de herramienta (ej. "Librería frontend")
 * @returns         Un <article> con la información de la herramienta
 */
export const CardHerramienta = ({
    img,
    nombre,
    categoria,
}: {
    img: string
    nombre: string
    categoria: string
}) => {
    return (
        // Contenedor de la tarjeta. <article> es adecuado porque cada
        // herramienta es un bloque de contenido independiente.
        <article className="card-herramienta">

            {/* Zona del logo */}
            <div className="contenedor-img">
                {/* alt="" indica que la imagen es decorativa: los lectores de pantalla
                    la ignoran. Es correcto aquí porque el nombre ya aparece en texto. */}
                <img src={img} alt="" />
            </div>

            {/* Zona de texto: nombre y categoría */}
            <div className="contenedor-texto">
                <h3 className="nombre-herramienta">{nombre}</h3>
                <p className="categoria-herramienta">{categoria}</p>
            </div>
        </article>
    )
}