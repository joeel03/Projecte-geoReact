import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './auth/Login'
import Register from './auth/Register'
import LoginRegister from './auth/LoginRegister'
import { UserContext } from "./userContext";


function App() {
  let [authToken, setAuthToken] = useState("");

  return(
    <UserContext.Provider value={{ authToken, setAuthToken }}  >
          <LoginRegister />
    </UserContext.Provider>
  )
}

export default App
