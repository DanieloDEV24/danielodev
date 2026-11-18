import { Home } from './components/home'
import { Proyectos } from './components/proyectos'
import { Header } from './components/header'
import { SobreMi } from './components/sobreMi'
import { Herramientas } from './components/herramientas'
import { Contacto } from './components/contacto'
import { Footer } from './components/footer'
import Error404 from './components/errorPage'
import './App.css'
import './responsive.css'

/**
 * Rutas reales del sitio.
 * Es una sola página con anclas, así que la única ruta válida es la raíz.
 * El hash (#proyectos, #contacto) no cuenta: pathname solo mira lo anterior al #.
 */
const RUTAS_VALIDAS = ['/']

function App() {

  // Si la ruta no existe, se muestra la página de error en lugar de la web
  if (!RUTAS_VALIDAS.includes(window.location.pathname)) {
    return <Error404/>
  }

  return (
    <>
      <Header/>
      <main>
        <Home/>
        <SobreMi/>
        <Proyectos/>
        <Herramientas/>
        <Contacto/>
        <Footer/>
      </main>
    </>
    
  )
}

export default App