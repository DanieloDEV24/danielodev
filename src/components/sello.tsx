import flechaOscura from "../assets/images/flecha-oscura.png"

/**
 * Texto que rodea el sello. Se repite para cubrir toda la circunferencia
 * y termina con un separador para que el final enlace con el principio.
 */
const TEXTO = "DISPONIBLE PARA PROYECTOS • FULL STACK DEV • "

/**
 * Sello circular: anillo de texto (SVG) alrededor de una flecha (PNG).
 * Es decorativo, por eso el SVG y la imagen van sin texto alternativo.
 */
export const Sello = () => {
    return (
        <div className="circulo-flecha">
            {/* Anillo de texto: ocupa todo el círculo, por detrás de la flecha */}
            <svg className="sello-texto" viewBox="0 0 200 200" aria-hidden="true">
                <defs>
                    <path
                        id="guia-texto"
                        // Circunferencia invisible (radio 76) que guía el texto; empieza a la izquierda
                        d="M 24,100 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0"
                    />
                </defs>

                {/* Texto pegado a la guía; textLength (≈ 2π·76) lo reparte justo por toda la vuelta */}
                <text>
                    <textPath href="#guia-texto" textLength="470" lengthAdjust="spacing">
                        {TEXTO}
                    </textPath>
                </text>
            </svg>

            {/* Flecha central (tu PNG) */}
            <img src={flechaOscura} alt="" />
        </div>
    )
}