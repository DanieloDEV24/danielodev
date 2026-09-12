import './App.css'

import { ContenedorWeb } from './components/contenedorWeb'
import { CardHome } from './components/cardDev'
import { Footer } from './components/footer'
import { Header } from './components/header'


function App() {

  return (
    <>
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
