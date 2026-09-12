import { ButtonMenu } from "./buttonMenu"
import { useState } from "react"

export const Header = () => {

    const [activo, setActivo] = useState(false);

    return (
        <header className="top-header">
            <ButtonMenu vari={activo} fun={setActivo} />
            <div className={`contenedor-blur-menu-header ${!activo ? 'd-none' : '' }`}>

            </div>
            <div className={`contenedor-menu-header ${!activo ? 'd-none' : '' }`}>

            </div>
        </header>
    )
}