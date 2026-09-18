import './App.css'
import './responsive.css'

import { ContenedorWeb } from './components/contenedorWeb'
import { CardHome } from './components/cardDev'
import { Footer } from './components/footer'
import { Header } from './components/header'
import CustomCursor from './components/customCursor'


function App() {

  return (
    <>
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
