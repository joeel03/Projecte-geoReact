import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const PlaceGrid = ({place}) => {
  let { authToken, setAuthToken } = useContext(UserContext);
  let {usuari, setUsuari} = useContext(UserContext);

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
        <div className="veureeditaresborrar"><button >veure</button>
        {usuari==place.author.email?
          <>
          <button>editar</button> <button>esborrar</button>
          </>
          :<></>}
          </div>
      </div>
    </div>
    </>
    
  )
}

export default PlaceGrid
