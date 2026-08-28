
export const Home = () => {
    return(
        <section id="home" aria-labelledby="titulo-home">

            <div id="contenedor-home">
                
                <h1>
                    <span className='titulo-home-dev'>DESARROLLADOR</span>
                    <span className='titulo-home-full'>FULL STACK.</span>
                </h1>

                <p className="texto-home">
                    Soy Daniel, desarrollador Full Stack y docente en desarrollo web. Me gusta construir cosas que funcionen y que la gente use de verdad, y también compartir lo que sé para que otros puedan aprender a hacerlo. Aprendo rápido, me adapto a lo que el proyecto necesita y siempre busco mejorar.
                </p>

                <dl className="contenedor-contadores-home">
                    <div>
                        <dt>+3</dt>
                        <dd>proyectos Reales</dd>
                    </div>

                    <div>
                        <dt>+8</dt>
                        <dd>herramientas</dd>  
                    </div>

                    <div>
                        <dt>+1</dt>
                        <dd>año de experiencia</dd>
                    </div>
                </dl>

                <footer className="experiencia">
                    
                </footer>
            </div>

        </section>
    )
}