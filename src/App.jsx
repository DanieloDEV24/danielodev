import './App.css'
import './responsive.css'

import { ContenedorWeb } from './components/contenedorWeb'
import { CardHome } from './components/cardDev'
import { Footer } from './components/footer'
import { Header } from './components/header'
import CustomCursor from './components/customCursor'
import NotFound from './components/NotFound'
import { useState } from 'react';
import Preloader from './components/Preloader';


/**
 * App
 * Componente raíz del portfolio. Decide qué se muestra según la URL:
 * - Ruta principal ("/" o "/index.html"): la web completa, con el preloader
 *   encima hasta que termine su animación.
 * - Cualquier otra ruta: la página 404, sin preloader.
 * No usa un router: comprueba window.location.pathname directamente.
 *
 * @returns El árbol de componentes que corresponde a la ruta actual
 */
function App() {

  // true mientras el preloader está visible; pasa a false cuando este llama a onFinish
  const [loading, setLoading] = useState(true);

  // Ruta actual normalizada: se quita la barra final y, si queda vacía, se usa "/"
  // Ignora la barra final y el index.html
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  // true si estamos en la página principal ("/" o "/index.html")
  const isHome = path === '/' || path === '/index.html';

  // Ruta desconocida: 404 sin preloader, pero con cursor y header
  // (así el botón de tema y el menú siguen funcionando)
  if (!isHome) {
    return (
      <>
        {/* Cursor personalizado, presente en todas las páginas */}
        <CustomCursor/>
        <Header/>
        <NotFound/>
      </>
    )
  }

  return (
    <>
    {/* Preloader: solo se monta mientras loading es true.
        Al terminar su fundido llama a onFinish y se desmonta */}
    {loading && <Preloader onFinish={() => setLoading(false)} />}
    <CustomCursor/>
      <Header/>

      {/* Contenido principal de la home: tarjeta de presentación y el resto de secciones */}
      <div id="web">
        <CardHome/>
        <ContenedorWeb/>
      </div>
      <Footer/>
    </>
  )
}

export default App