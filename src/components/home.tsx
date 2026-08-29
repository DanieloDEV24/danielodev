import { CardExperiencia } from "./cardExperiencia";

export const Home = () => {

    const experiencias = [
        {
            puesto: 'Desarrollador de Aplicaciones Web.', 
            empresa: 'Ayuntamiento de Fuente de Piedra.',
            descripcion: 'Desarrollo de aplicaciones web para el consistorio: una plataforma de gestión y reservas de instalaciones y actividades municipales, y la web oficial de turismo del municipio.'
        }, 
        {
            puesto: 'Desarrollador de Aplicaciones Web.', 
            empresa: 'Freelancer.',
            descripcion: 'Diseño y desarrollo de sitios web para empresas, incluyendo Rótulos Moncayo. Actualmente en desarrollo la web de Myno Solutions y una plataforma de reservas para el centro de belleza N23.'
        }, 
        {
            puesto: 'Tutor e-learning.', 
            empresa: 'Grupo Dabo Consulting.',
            descripcion: 'Docencia online en formación de desarrollo web e informática, resolviendo dudas del alumnado, corrigiendo ejercicios y haciendo seguimiento del progreso en los cursos.'
        }
    ];

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
                    {
                        experiencias.map(function(e){
                            return <CardExperiencia puesto={e.puesto} empresa={e.empresa} descripcion={e.descripcion}/>
                        })
                    }
                </footer>
            </div>

        </section>
    )
}