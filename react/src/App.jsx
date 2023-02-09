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
import Place from './places/Place'
import Posts from './posts/Posts'
import PlaceCreate from './places/PlaceCreate'
import PlaceEdit from './places/PlaceEdit'

import PlaceList from './places/PlaceList'
import PlaceGrid from './places/PlaceGrid'
import PlacesGrid from './places/PlacesGrid'
import PlacesList from './places/PlacesList'

function App() {
  let [authToken, setAuthToken] = useState("");
  let [usuari, setUsuari] = useState("");
  let [refresh,setRefresh] = useState(false);
  let[reviewCreada,setReviewCreada]=useState(false)
  let [reviews, setReviews] = useState([]);

  return (
    <>
      <UserContext.Provider value={{ refresh,setRefresh,usuari, setUsuari,authToken, setAuthToken,reviewCreada,setReviewCreada ,reviews, setReviews,refresh,setRefresh}}  >
        {authToken ?
          <>
            <Header />
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<About />} />
              <Route path="/about" element={<About />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/places/:id" element={ <Place/> } /> 
              <Route path="/places/add" element={ <PlaceCreate/> } /> 
              <Route path="/places/edit/:id" element={ <PlaceEdit/> } /> 
              <Route path="/places/grid" element={ <PlacesGrid/> } /> 
              <Route path="/places/list" element={ <PlacesList usuari={usuari}/> } /> 

            </Routes>
            <Footer />
          </>
          :
          <LoginRegister />
        }
      </UserContext.Provider>
    </>

  )
}

export default App
