import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlaceGrid from './PlaceGrid'

const PlacesGrid = () => {
    let { authToken, setAuthToken } = useContext(UserContext);
    let [error, setError] = useState("");
    let [places, setPlaces] = useState([]);
    let {usuari, setUsuari} = useContext(UserContext);
    const [ refresh, setRefresh ] = useState(false)

    const getPlaces = async () => {
        try {
            const data = await fetch("https://backend.insjoaquimmir.cat/api/places/", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken,
                },
                method: "GET",
            });
            const resposta = await data.json();
            if (resposta.success === true) {
                console.log(resposta)
                setPlaces(resposta.data);
            }
            else setError(resposta.message);
        } catch {
            console.log("Error");
            alert("Catchch");
        };

    }
    useEffect(() => {
        getPlaces();
    }, [refresh]);

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
            setRefresh(!refresh)
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
            {places.map((place) => (
                <div key={place.id}> {usuari==place.author.email||place.visibility.name=='public'?

                <PlaceGrid place={place} deletePlace={deletePlace}/>
                :<></>} 
                </div>
            ))}
        </div>
    )
}

export default PlacesGrid
