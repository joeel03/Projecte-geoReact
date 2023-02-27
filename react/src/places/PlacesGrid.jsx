import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlaceGrid from './PlaceGrid'
import { useFetch } from '../hooks/useFetch';

const PlacesGrid = () => {
    let { authToken, setAuthToken } = useContext(UserContext);
    let [places, setPlaces] = useState([]);
    let {usuari, setUsuari} = useContext(UserContext);
    const [ refresh, setRefresh ] = useState(false)

    const { data, error, reRender,loading, setUrl } = useFetch("https://backend.insjoaquimmir.cat/api/places", {
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken,
      },
      method: "GET",
  });

    const deletePlace = async (id) => {
        try {
          const data = await fetch(("https://backend.insjoaquimmir.cat/api/places/"+id), {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + authToken
            },
            method: "DELETE",
          });
          const resposta = await data.json();
          if (resposta.success === true) {
            console.log("place eliminado")
            reRender();
          }
          else {
            console.log(resposta.message)
            setError(resposta.message);
          }
        } catch(err) {
          console.log(err.message);
          alert("Catchch");
        };
      }
    return (
        <div>
            <h1>Places Grid</h1>
            {loading?
                "cargando..": 
                (data.data).map((place) => (
                  <tr key={place.id}> 
                  {usuari==place.author.email||place.visibility.name=='public'?

                      <PlaceGrid place={place} deletePlace={deletePlace}/>
                      :<></>}
                  </tr>
          ))}
        </div>
    )
}

export default PlacesGrid
