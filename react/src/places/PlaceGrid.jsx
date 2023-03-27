import React,{ useContext } from 'react'
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getPlace } from '../slices/places/thunks';

// import { useParams } from 'react-router-dom';

// const PlaceGrid = ({ place, deletePlace }) => {

const PlaceGrid = () => {
  let { authToken, setAuthToken,usuari, setUsuari } = useContext(UserContext);
  const { isSaving = true ,isLoading,place,favorite } = useSelector((state) => state.places);
  let navigate = useNavigate();
 const dispatch=useDispatch();

  useEffect(() => {
    dispatch(getPlace(authToken,place.id))
  }, []);
  console.log(place)

  return (
    <>
    {isLoading?
    <>
     <div className="element">
        <div className="imagen">
          <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} width="200px" height="400px" alt="{place.name}"></img>
        </div>

        <div className="texto">
          <div className="titulo">{place.name}</div>
          <div className="description">{place.description}</div>
          <div className="likes">❤️{place.favorites_count}</div>
          <div className="veureeditaresborrar"><button onClick={(e) => { navigate("/places/" + place.id) }}>veure</button>
            {usuari == place.author.email ?
              <>
                <button onClick={(e) => { navigate("/places/edit/" + place.id) }}>editar</button> <button onClick={(e) => {
                  dispatch(delPlace(place.id))
                }} >esborrar</button>
              </>
              : <></>}
          </div>
        </div>
      </div>
    </>
    :<>
    <p>Cargando porfavor espere</p>
    </>}
     
    </>

  )
}

export default PlaceGrid
