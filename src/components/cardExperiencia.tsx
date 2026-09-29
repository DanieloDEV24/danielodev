/**
 * CardExperiencia
 * Tarjeta que muestra una experiencia laboral: el puesto desempeñado,
 * la empresa y una breve descripción de las tareas o logros.
 * Es un componente puramente presentacional: no tiene estado ni lógica,
 * solo pinta los datos que recibe por props.
 *
 * @param puesto      Nombre del puesto (ej. "Desarrollador Frontend")
 * @param empresa     Nombre de la empresa (ej. "Acme S.L.")
 * @param descripcion Texto descriptivo de las responsabilidades o logros
 * @returns           Un <article> con la información de la experiencia
 */
export const CardExperiencia = ({
    puesto,
    empresa,
    descripcion,
}: {
    puesto: string
    empresa: string
    descripcion: string
}) => {
    return (
        // Contenedor de la tarjeta. <article> es adecuado porque cada
        // experiencia es un bloque de contenido independiente.
        <article className="card-experiencia">

            {/* Título de la tarjeta: el puesto de trabajo */}
            <h4 className="puesto-trabajo">{puesto}</h4>

            {/* Nombre de la empresa, en texto secundario/pequeño */}
            <small className="empresa">{empresa}</small>

            {/* Descripción de las funciones o logros del puesto */}
            <p className="descripcion-puesto">{descripcion}</p>
        </article>
    )
}