import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap'
import Login from './auth/Login'
import Register from './auth/Register'
import './auth/variables.css'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  let [estat, setCanvi] = useState(true);

  return (
    <div className='App'>
      <button onClick={() => setCanvi(!estat)}>YEHA</button>
      {estat ? <Login/> : <Register/>}
    </div>
  )
}

export default App
