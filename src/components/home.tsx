import { CardHome } from "./cardDev"

export const Home = () => {
    return(
        <div id="home" style={{ position: 'relative' }}>

            <div id="contenedor-home">
                <div className="contenedor-titulo">
                    <h1 className='titulo-home-dev'>DESARROLLADOR</h1>
                    <h1 className='titulo-home-full'>FULL STACK</h1>
                </div>

                <p className="texto-home">
                    Soy Daniel, desarrollador Full Stack. Me gusta construir cosas que funcionen y que la gente use de verdad. Aprendo rápido, me adapto a lo que el proyecto necesita y siempre busco mejorar.
                </p>

                <div className="contenedor-contadores-home">
                    <div>
                        <h1>+3</h1>
                        <p>proyectos Reales</p>
                    </div>

                    <div>
                        <h1>+8</h1>
                        <p>herramientas</p>  
                    </div>

                    <div>
                        <h1>+1</h1>
                        <p>año de experiencia</p>
                    </div>
                </div>
            </div>

        </div>
    )
}