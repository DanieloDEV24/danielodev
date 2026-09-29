import { useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { motion } from 'motion/react'
import avatar from '../assets/img/avatar.png'

// Configuración del efecto de inclinación 3D
const MAX_TILT = 12 // grados máximos de inclinación en cada eje
const SCALE = 1.02  // ligero zoom al hacer hover

/**
 * CardHome
 * Tarjeta de presentación personal (avatar, nombre, lema y redes sociales).
 * Combina dos efectos:
 *  1. Animación de entrada con `motion`: aparece desde arriba con rebote (spring).
 *  2. Efecto "tilt" 3D: la tarjeta se inclina siguiendo el cursor del ratón
 *     y vuelve a su posición al salir.
 * Además incluye varios SVG decorativos (flechas/trazos naranjas dibujados a mano)
 * posicionados de forma absoluta alrededor de la tarjeta.
 */
export const CardHome = () => {
    // Referencia al div que se inclina, necesaria para medir su tamaño y posición
    const containerRef = useRef<HTMLDivElement>(null)

    // Estilo dinámico (transform) que se recalcula con cada movimiento del ratón
    const [tiltStyle, setTiltStyle] = useState<CSSProperties>({})

    /**
     * Se ejecuta cada vez que el ratón se mueve sobre la tarjeta.
     * Calcula dónde está el cursor respecto al centro y lo traduce a rotación.
     */
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const container = containerRef.current
        if (!container) return // seguridad: si aún no está montado, no hace nada

        // Posición y tamaño de la tarjeta en pantalla
        const rect = container.getBoundingClientRect()

        // Posición del cursor DENTRO de la tarjeta (en píxeles)
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // Se normaliza a un rango de -0.5 a 0.5 (0 = centro de la tarjeta)
        const percentX = x / rect.width - 0.5
        const percentY = y / rect.height - 0.5

        // Rotación en X (arriba/abajo): se invierte el signo para que la tarjeta
        // "mire" hacia el cursor. Rotación en Y (izquierda/derecha): directa.
        const rotateX = (-percentY * MAX_TILT).toFixed(2)
        const rotateY = (percentX * MAX_TILT).toFixed(2)

        // Aplica perspectiva + rotaciones + zoom
        setTiltStyle({
            transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${SCALE}, ${SCALE}, ${SCALE})`,
        })
    }

    /** Al salir el ratón, la tarjeta vuelve a su posición neutra (sin rotación ni zoom) */
    const handleMouseLeave = () => {
        setTiltStyle({
            transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        })
    }

    return (
        // <motion.aside> = <aside> con capacidades de animación.
        // Gestiona SOLO la animación de entrada.
        <motion.aside
            className='contenedor-card contenedor-card-dev'
            initial={{ opacity: 0, y: -60 }} // estado inicial: invisible y 60px más arriba
            animate={{ opacity: 1, y: 0 }}   // estado final: visible y en su sitio
            transition={{
                // Desplazamiento vertical con efecto muelle (rebote)
                y: {
                    type: 'spring',
                    stiffness: 400, // rigidez: más alto = más rápido/brusco
                    damping: 12,    // amortiguación: más bajo = más rebote
                    mass: 1.3,      // masa: más alto = más "pesado"
                },
                // La opacidad se anima de forma lineal y rápida
                opacity: {
                    duration: 0.25,
                    ease: 'easeOut',
                },
            }}
        >

            {/* Al tener el aside con sticky no puedo meterle otro position.
                Por eso el efecto tilt se aplica en este div interior y no en el aside. */}
            <div
                className="contenedor-card-dev"
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    ...tiltStyle,                              // transform dinámico del tilt
                    transition: 'transform 0.15s ease-out',    // suaviza el movimiento
                    transformStyle: 'preserve-3d',             // permite profundidad 3D en los hijos
                    willChange: 'transform',                   // optimización: avisa al navegador
                }}
            >

                {/* ===== SVG DECORATIVOS =====
                    Trazos naranjas (#FF5400) posicionados de forma absoluta.
                    Todos con aria-hidden (salvo icono5-8, ver observaciones)
                    y pointerEvents: 'none' para no bloquear el ratón. */}

                {/* icono1: flecha curva pequeña, arriba a la izquierda */}
                <svg width="41" height="31" viewBox="0 0 41 31" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '70px',
                        left: '2.9%',
                        transform: 'translateX(-50%)', // centra el SVG respecto a su "left"
                        zIndex: 2,                     // por encima del contenido de la tarjeta
                        pointerEvents: 'none'          // ignora clics/hover
                    }}
                    className='icono1'
                >
                    <path d="M39.4679 2.37858C..." fill="#FF5400" />
                </svg>

                {/* icono2: línea curva discontinua, arriba a la derecha */}
                <svg width="249" height="40" viewBox="0 0 249 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '0px',
                        left: '78%',
                        transform: 'translateX(-50%)',
                        zIndex: 2,
                        pointerEvents: 'none'
                    }}
                    className='icono2'
                >
                    {/* strokeDasharray="12 6" -> trazo de 12px y hueco de 6px (línea punteada) */}
                    <path d="M1.25032 18.2189C..." stroke="#FF5400" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="12 6" />
                </svg>

                {/* icono3: trazo discontinuo, abajo a la derecha */}
                <svg width="113" height="58" viewBox="0 0 113 58" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '91%',
                        left: '83%',
                        transform: 'translateX(-50%)',
                        zIndex: 2,
                        pointerEvents: 'none'
                    }}
                    className='icono3'
                >
                    <path d="M107.25 1.25C..." stroke="#FF5400" strokeWidth="2.5" strokeLinecap="square" strokeDasharray="12 6" />
                </svg>

                {/* icono4: flecha ondulada, abajo a la izquierda */}
                <svg width="74" height="28" viewBox="0 0 74 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '85%',
                        left: '8%',
                        transform: 'translateX(-50%)',
                        zIndex: 2,
                        pointerEvents: 'none'
                    }}
                    className='icono4'
                >
                    <path d="M73.5646 22.1759C..." fill="#FF5400" />
                </svg>

                {/* icono5 a icono8: trazos discontinuos grandes.
                    No tienen top/left aquí: su posición concreta se define en el CSS
                    (mediante sus clases), probablemente con media queries. */}
                <svg width="274" height="175" viewBox="0 0 274 175" fill="none" xmlns="http://www.w3.org/2000/svg" className='icono5'
                    style={{ position: 'absolute', zIndex: 2 }}>
                    <path d="M261.823 1.25C..." stroke="#FF5400" strokeWidth="2.5" strokeLinecap="square" strokeDasharray="12 6" />
                </svg>

                <svg width="62" height="57" viewBox="0 0 62 57" fill="none" xmlns="http://www.w3.org/2000/svg" className='icono6'
                    style={{ position: 'absolute', zIndex: 2 }}>
                    <path d="M60.264 55.0948C..." stroke="#FF5400" strokeWidth="2.5" strokeLinecap="square" strokeDasharray="5 5" />
                </svg>

                <svg width="83" height="22" viewBox="0 0 83 22" fill="none" xmlns="http://www.w3.org/2000/svg" className='icono7'
                    style={{ position: 'absolute', zIndex: 2 }}>
                    <path d="M81.027 7.52696C..." stroke="#FF5400" strokeWidth="2.5" strokeLinecap="square" strokeDasharray="5 5" />
                </svg>

                <svg width="290" height="117" viewBox="0 0 290 117" fill="none" xmlns="http://www.w3.org/2000/svg" className='icono8'
                    style={{ position: 'absolute', zIndex: 2 }}>
                    <path d="M288.438 9.08849C..." stroke="#FF5400" strokeWidth="2.5" strokeLinecap="square" strokeDasharray="5 5" />
                </svg>

                {/* Icono de llama (fuego) en blanco, posicionado desde el CSS mediante #icon-fire */}
                <div id="icon-fire">
                    <svg width="24px" strokeWidth="1.5" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" color="#fff">
                        {/* Llama interior */}
                        <path d="M8 18C8 20.4148..." stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        {/* Contorno exterior de la llama */}
                        <path d="M12 21C17.0495 21..." stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </div>

                {/* ===== TARJETA PRINCIPAL ===== */}
                <article id="card-dev">

                    {/* Zona superior: imagen del avatar */}
                    <div className="card-fondo-avatar">
                        <img src={avatar} alt="avatar divertido de Daniel, estilo Apple" />
                    </div>

                    {/* Zona inferior: nombre, lema y redes sociales */}
                    <div className="info-card-dev">
                        <h2 className="titulo-nombre">Daniel Ruiz.</h2>

                        <p className="mensaje">
                            Código limpio, proyectos reales, resultados medibles.
                        </p>

                        {/* Lista de enlaces a redes sociales / contacto */}
                        <ul className="redes-sociales">

                            {/* LinkedIn: se abre en pestaña nueva.
                                rel="noopener noreferrer" evita que la página abierta
                                acceda a window.opener (seguridad y privacidad) */}
                            <li key={'linkedin-tarjeta-dev'}>
                                <a href="https://www.linkedin.com/in/daniel-ruiz-soto-831885315/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Perfil de LinkedIn">
                                    <svg width="28px" height="28px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 8V16C21 18.7614..." stroke="#ff5400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> {/* marco redondeado */}
                                        <path d="M7 17V13.5V10" stroke="#ff5400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />         {/* letra "i" (palo) */}
                                        <path d="M11 17V13.75M11..." stroke="#ff5400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />     {/* letra "n" */}
                                        <path d="M7 7.01L7.01 6.99889" stroke="#ff5400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />   {/* punto de la "i" */}
                                    </svg>
                                </a>
                            </li>

                            {/* GitHub */}
                            <li key={'github-tarjeta-dev'}>
                                <a href="https://github.com/DanieloDEV24"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Perfil de GitHub">
                                    <svg width="28px" height="28px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 22.0268V19.1568..." stroke="#ff5400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> {/* silueta del gato */}
                                        <path d="M9 20.0267C6 20.9999..." stroke="#ff5400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> {/* cola */}
                                    </svg>
                                </a>
                            </li>

                            {/* Instagram */}
                            <li key={'instagram-tarjeta-dev'}>
                                <a href="https://www.instagram.com/danielo.dev24/?hl=es"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Perfil de Instagram">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />       {/* fondo invisible (estándar Tabler) */}
                                        <path d="M4 8a4 4 0 0 1 4 -4h8..." />                     {/* marco de la cámara */}
                                        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />           {/* lente */}
                                        <path d="M16.5 7.5v.01" />                                {/* punto del flash */}
                                    </svg>
                                </a>
                            </li>

                            {/* Email: usa mailto:, así que no necesita target="_blank" */}
                            <li key={'email-tarjeta-dev'}>
                                <a href="mailto:danielruizdeveloper@gmail.com"
                                    aria-label="Enviar correo electrónico">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mail">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M3 7a2 2 0 0 1 2 -2h14..." /> {/* sobre */}
                                        <path d="M3 7l9 6l9 -6" />             {/* solapa del sobre */}
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>

                </article>
            </div>
        </motion.aside>
    )
}