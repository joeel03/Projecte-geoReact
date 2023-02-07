import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const PlaceGrid = ({place}) => {
  let { authToken, setAuthToken } = useContext(UserContext);
  let {usuari, setUsuari} = useContext(UserContext);
  let navigate = useNavigate();

  return (
    <>
    <div className="element">
      <div className="imagen">
        <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} width="200px" height="400px" alt="{place.name}"></img>
        </div>
      
      <div className="texto">
        <div className="titulo">{place.name}</div>
        <div className="description">{place.description}</div>
        <div className="likes">❤️{place.favorites_count}</div>
        <div className="veureeditaresborrar"><button onClick={(e) => {navigate("/places/"+place.id)}}>veure</button>
        {usuari==place.author.email?
          <>
          <button onClick={(e) => {navigate("/places/edit/"+place.id)}}>editar</button> <button onClick={(e) => {
            deletePlace(place.id)}} >esborrar</button>
          </>
          :<></>}
          </div>
      </div>
    </div>
    </>
    
  )
}

export default PlaceGrid
