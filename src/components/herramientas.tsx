import html from '../assets/img/html5.png';

import css from '../assets/img/css.svg';

import javascript from '../assets/img/javascript.png';

import typescript from '../assets/img/typescript.png';

import jquery from '../assets/img/jquery.webp';

import bootstrap from '../assets/img/bootstrap.webp';

import php from '../assets/img/php.png';

import codeigniter from '../assets/img/codeigniter.png';

import mysql from '../assets/img/mysql.png';

import git from '../assets/img/git.jpg';

import github from '../assets/img/github.jpg';

import vscode from '../assets/img/vscode.jpg';

import { motion } from 'motion/react';

import { CardHerramienta } from './cardHerramienta'

import { useState } from 'react';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

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

export const Herramientas = () => { 

    const [seleccion, setSeleccion] = useState('todos') 

    return (
        <section id="herramientas">
            <motion.h2 className="contenedor-titulo" {...fadeUp}>
                <span className='titulo-proyectos-mis'>HERRAMIENTAS</span>
                <span className='titulo-proyectos-proyectos'>QUE USO.</span>
            </motion.h2>

            <motion.p
                className="texto-herramientas"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.08 }}
            >
                Estas son las tecnologías con las que trabajo día a día. Las elijo según lo que pide cada proyecto
            </motion.p>

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
            <ul className="contenedor-herramientas">
                {
                        herramientas.map(function(herramienta, index){
                            if(seleccion === 'todos') {
                                return <motion.li
                                        key={index}
                                        {...fadeUp}
                                        transition={{ ...fadeUp.transition, delay: 0.2 + index * 0.05 }}
                                    >
                                        <CardHerramienta img={herramienta.icono} nombre={herramienta.nombre} categoria={herramienta.categoria} />
                                    </motion.li>
                            }
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