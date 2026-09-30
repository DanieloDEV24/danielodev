// Iconos de cada tecnología. El bundler (Vite) resuelve cada import a una URL final
import html from '../assets/img/html5.png';

import css from '../assets/img/css.svg';

import javascript from '../assets/img/javascript.png';

import typescript from '../assets/img/typescript.png';

import jquery from '../assets/img/jquery.webp';

import bootstrap from '../assets/img/bootstrap.webp';

import php from '../assets/img/php.png';

import codeigniter from '../assets/img/codeigniter.png';

import mysql from '../assets/img/mysql.png';

import git from '../assets/img/git.png';

import github from '../assets/img/github.png';

import vscode from '../assets/img/vscode.png';

import { motion } from 'motion/react';

import { CardHerramienta } from './cardHerramienta'

import { useState } from 'react';

/**
 * fadeUp
 * Animación de entrada reutilizable: el elemento aparece desde abajo con fade
 * cuando entra en pantalla. Se esparce con {...fadeUp} en cualquier motion.*
 *
 * - initial:     estado de partida (transparente y 30px más abajo)
 * - whileInView: estado final al entrar en el viewport
 * - viewport:    once -> solo se anima la primera vez; amount -> se dispara al ver el 30%
 * - transition:  0.6s con curva cubic-bezier suave ("as const" fija el tipo como tupla)
 */
const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

/**
 * herramientas
 * Listado de tecnologías que se muestran en la sección. Al ser un array,
 * añadir o quitar una no requiere tocar el JSX.
 *
 * @property nombre    Nombre visible de la tecnología
 * @property categoria Grupo para el filtro: 'Frontend' | 'Backend' | 'Otros'
 *                     (debe coincidir exactamente, con mayúscula inicial, con el valor de `seleccion`)
 * @property icono     URL del icono importado arriba
 */
const herramientas = [
    // FRONTEND
    {
        nombre: 'HTML5',
        categoria: 'Frontend',
        icono: html
    },
    {
        nombre: 'CSS3',
        categoria: 'Frontend',
        icono: css
    },
    {
        nombre: 'JavaScript',
        categoria: 'Frontend',
        icono: javascript
    },
    {
        nombre: 'TypeScript',
        categoria: 'Frontend',
        icono: typescript
    },
    {
        nombre: 'jQuery',
        categoria: 'Frontend',
        icono: jquery
    },
    {
        nombre: 'Bootstrap',
        categoria: 'Frontend',
        icono: bootstrap
    },

    // BACKEND
    {
        nombre: 'PHP',
        categoria: 'Backend',
        icono: php
    },
    {
        nombre: 'CodeIgniter 4',
        categoria: 'Backend',
        icono: codeigniter
    },

    // OTROS
    {
        nombre: 'MySQL',
        categoria: 'Backend',
        icono: mysql
    },
    {
        nombre: 'Git',
        categoria: 'Otros',
        icono: git
    },
    {
        nombre: 'GitHub',
        categoria: 'Otros',
        icono: github
    },
    {
        nombre: 'Visual Studio Code',
        categoria: 'Otros',
        icono: vscode
    }
];

/**
 * Herramientas
 * Sección del portfolio con las tecnologías que uso. Incluye título, texto
 * introductorio, botones para filtrar por categoría y una lista de cards.
 * Todos los elementos entran con la animación fadeUp en cascada.
 * Guarda en el estado la categoría seleccionada ('todos' por defecto).
 * No recibe props.
 *
 * @returns Un <section id="herramientas"> (ancla usada por el menú)
 */
export const Herramientas = () => { 

    // Categoría activa del filtro: 'todos' | 'Backend' | 'Frontend' | 'Otros'
    const [seleccion, setSeleccion] = useState('todos') 

    return (
        // Contenedor de la sección. El id sirve de ancla para el menú (#herramientas)
        <section id="herramientas">

            {/* Título en dos líneas con estilos distintos. Reutiliza las clases del título de proyectos */}
            <motion.h2 className="contenedor-titulo" {...fadeUp}>
                <span className='titulo-proyectos-mis'>HERRAMIENTAS</span>
                <span className='titulo-proyectos-proyectos'>QUE USO.</span>
            </motion.h2>

            {/* Texto introductorio. Se sobrescribe transition para añadir un delay (0.08s)
                y que los elementos entren en cascada */}
            <motion.p
                className="texto-herramientas"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.08 }}
            >
                Estas son las tecnologías con las que trabajo día a día. Las elijo según lo que pide cada proyecto
            </motion.p>

            {/* Botones del filtro. Cada uno guarda su categoría en `seleccion`
                y la clase "selected" marca visualmente el botón activo */}
            <motion.aside
                className="navegacion"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.16 }}
            >
                <button onClick={() => setSeleccion('todos')} className={seleccion === 'todos' ? 'selected' : ''}>Todos</button>
                <button onClick={() => setSeleccion('Backend')} className={seleccion === 'backend' ? 'selected' : ''}>BackEnd</button>
                <button onClick={() => setSeleccion('Frontend')} className={seleccion === 'frontend' ? 'selected' : ''}>FrontEnd</button>
                <button onClick={() => setSeleccion('Otros')} className={seleccion === 'otros' ? 'selected' : ''}>Otros</button>
            </motion.aside>

            {/* Lista de cards, generada a partir del array `herramientas` */}
            <ul className="contenedor-herramientas">
                {
                        herramientas.map(function(herramienta, index){

                            // Filtro "todos": se pintan todas las herramientas
                            if(seleccion === 'todos') {
                                return <motion.li
                                        key={index}
                                        {...fadeUp}
                                        // Delay escalonado: arranca en 0.2s y suma 0.05s por card
                                        transition={{ ...fadeUp.transition, delay: 0.2 + index * 0.05 }}
                                    >
                                        <CardHerramienta img={herramienta.icono} nombre={herramienta.nombre} categoria={herramienta.categoria} />
                                    </motion.li>
                            }

                            // Filtro por categoría: solo se pintan las que coinciden.
                            // Las demás devuelven undefined, así que React no renderiza nada para ellas
                            else if(seleccion === herramienta.categoria){
                                return <motion.li
                                        key={index}
                                        {...fadeUp}
                                        transition={{ ...fadeUp.transition, delay: 0.2 + index * 0.05 }}
                                    >
                                        <CardHerramienta img={herramienta.icono} nombre={herramienta.nombre} categoria={herramienta.categoria} />
                                    </motion.li>
                            } 
                        })
                }
            </ul>
        </section>
    )
}