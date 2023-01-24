import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './auth/Login'
import Register from './auth/Register'
import LoginRegister from './auth/LoginRegister'
import { UserContext } from "./userContext";
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import { Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import About from "./About";
import Places from './places/Places'
import Posts from './posts/Posts'

function App() {
  let [authToken, setAuthToken] = useState("");

  return (
    <>
      <UserContext.Provider value={{ authToken, setAuthToken }}  >
        {authToken ? 
        <>
        <Header />
        <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<About />} />
              <Route path="/about" element={<About />} />
              <Route path="/places" element={<Places />} />
              <Route path="/posts" element={<Posts />} />
            </Routes>
        <Footer/>
        </>
        :
        <LoginRegister />
        }
      </UserContext.Provider>
    </>

  )
}

export default App
