/**
 * ButtonMenu
 * Botón de menú tipo "hamburguesa". Al pulsarlo alterna el estado del menú
 * (abierto/cerrado) llamando a la función que recibe por props.
 * Las dos <span> se estilizan con CSS para dibujar las líneas del icono
 * y animarlas hasta formar una "X" cuando el botón está activo.
 *
 * @param vari Estado actual del menú: true = abierto, false = cerrado
 * @param fun  Función que actualiza ese estado (normalmente el setter de un useState)
 * @returns    Un <button> con las líneas del icono de menú
 */
export const ButtonMenu = ({
    vari,
    fun,
}: {
    vari: boolean
    fun: (activo: boolean) => void
}) => {

    return (
        <button
            // Al hacer clic invierte el valor actual: si estaba abierto lo cierra y viceversa
            onClick={() => fun(!vari)}
            // Añade la clase "active" solo cuando el menú está abierto,
            // para que el CSS pueda animar el icono (por ejemplo, hamburguesa -> X)
            className={`menu-btn ${vari ? 'active' : ''}`}
            id="menuBtn"
            // Texto para lectores de pantalla, ya que el botón no tiene texto visible
            aria-label="Abrir menú"
        >
            {/* Líneas del icono: se dibujan y animan desde el CSS */}
            <span></span>
            <span></span>
        </button>
    )
}