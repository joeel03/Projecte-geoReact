import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PlaceList = () => {
    let { authToken, setAuthToken } = useContext(UserContext);
    let [error, setError] = useState("");
    let [username, setUsername] = useState("");
    let [roles, setRoles] = useState([]);
    let [place, setPlace] = useState([]);
    const { id } = useParams();

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
                setPlace(resposta.data);

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
           { place.map (  (v)=> { 

          return (<span key={v.id}> {v} </span>)
          
            } )
           }

        </div>
    )


}

export default PlaceList
