import './App.css'
import './responsive.css'

import { ContenedorWeb } from './components/contenedorWeb'
import { CardHome } from './components/cardDev'
import { Footer } from './components/footer'
import { Header } from './components/header'
import CustomCursor from './components/customCursor'
import NotFound from './pages/NotFound'

import { useState } from 'react';
import Preloader from './components/Preloader';


function App() {

  const [loading, setLoading] = useState(true);

  // Ignora la barra final y el index.html
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const isHome = path === '/' || path === '/index.html';

  // Ruta desconocida: 404 sin preloader, pero con cursor y header
  // (así el botón de tema y el menú siguen funcionando)
  if (!isHome) {
    return (
      <>
        <CustomCursor/>
        <Header/>
        <NotFound/>
      </>
    )
  }

  return (
    <>
    {loading && <Preloader onFinish={() => setLoading(false)} />}
    <CustomCursor/>
      <Header/>
      <div id="web">
        <CardHome/>
        <ContenedorWeb/>
      </div>
      <Footer/>
    </>
  )
}

export default App