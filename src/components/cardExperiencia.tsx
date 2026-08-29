export const CardExperiencia = ({puesto, empresa, descripcion} : {puesto: string, empresa: string, descripcion: string}) => {
    return (
        <article className="card-experiencia">
            <h4 className="puesto-trabajo">{puesto}</h4>
            <small className="empresa">{empresa}</small>
            <p className="descripcion-puesto">{descripcion}</p>
        </article>
    )
} 