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

import { CardHerramienta } from './cardHerramienta'

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
        categoria: 'Otros',
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
    return (
        <section id="herramientas">
            <h2 className="contenedor-titulo">
                <span className='titulo-proyectos-mis'>HERRAMIENTAS</span>
                <span className='titulo-proyectos-proyectos'>QUE USO.</span>
            </h2>

            <ul className="contenedor-herramientas">
                {
                    herramientas.map(function(herramienta){
                        return <li><CardHerramienta img={herramienta.icono} nombre={herramienta.nombre} categoria={herramienta.categoria} /></li>
                    })
                }
            </ul>
        </section>
    )
}