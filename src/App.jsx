import './App.css'

import { ContenedorWeb } from './components/contenedorWeb'
import { CardHome } from './components/cardDev'
import { Proyectos } from './components/proyectos'


function App() {

  return (
    <div id="web">
      <CardHome/>
      <ContenedorWeb/>
    </div>
  )
}

export default App
