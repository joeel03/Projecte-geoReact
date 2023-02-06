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
    }, []);

    return (
        <div>
            <h1>Places Grid</h1>
            {places.map((place) => (
                <div key={place.id}> {<PlaceGrid place={place} />} </div>
            ))}
        </div>
    )
}

export default PlacesGrid
