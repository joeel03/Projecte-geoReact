import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './auth/Login'
import Register from './auth/Register'


function App() {

  return (
   <div>
     <Login/>
     <Register/>
   </div>
  )
}

export default App
