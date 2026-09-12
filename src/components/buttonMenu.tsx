export const ButtonMenu = ({vari, fun}: {vari: boolean; fun: (activo: boolean) => void;}) => {

    return (
        <button onClick={() => fun(!vari)} className={`menu-btn ${vari ? 'active' : ''}`} id="menuBtn" aria-label="Abrir menú">
            <span></span>
            <span></span>
        </button>
    )
}