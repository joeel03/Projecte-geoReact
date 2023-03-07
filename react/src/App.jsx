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

import Place from './places/Place';
import PlaceCreate from './places/PlaceCreate';
import PlaceEdit from './places/PlaceEdit';

import PlacesList from './places/PlacesList';
import PlaceList from './places/PlaceList';

import PlacesGrid from './places/PlacesGrid';
import PlaceGrid from './places/PlaceGrid';


import Post from './posts/Post';
import PostCreate from './posts/PostCreate';
import PostEdit from './posts/PostEdit';

import PostsList from './posts/PostsList';
import PostList from './posts/PostList';

import PostsGrid from './posts/PostsGrid';
import Todos  from './todos/Todos'
import PlacesMarks from './places/PlacesMarks'
import PlaceMarks from './places/PlaceMarks'

function App() {
  let [authToken, setAuthToken] = useState("");
  let [usuari, setUsuari] = useState("");
  let [refresh,setRefresh] = useState(false);
  let[reviewCreada,setReviewCreada]=useState(false)
  let [reviews, setReviews] = useState([]);

  return (
    <>
      <UserContext.Provider value={{ refresh,setRefresh,usuari, setUsuari,authToken, setAuthToken,reviewCreada,setReviewCreada ,reviews, setReviews}}  >
        {authToken ?
          <>
            <Header />
            <Routes>

              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<About />} />
              <Route path="/about" element={<About />} />

              <Route path="/places/:id" element={ <Place/> } /> 
              <Route path="/places/add" element={ <PlaceCreate/> } /> 
              <Route path="/places/edit/:id" element={ <PlaceEdit/> } /> 
              <Route path="/places/grid" element={ <PlacesGrid/> } /> 
              <Route path="/places/list" element={ <PlacesList usuari={usuari}/> } /> 
              <Route path="/places/marks" element={<PlacesMarks  />} />

              <Route path="/posts/:id" element={ <Post/> } /> 
              <Route path="/posts/add" element={ <PostCreate/> } />
              <Route path="/posts/edit/:id" element={ <PostEdit/> } /> 
              <Route path="/posts/grid" element={ <PostsGrid/> } />  
              <Route path="/posts/list" element={ <PostsList usuari={usuari}/> } /> 

              <Route path="/todos" element={<Todos  />} />

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
