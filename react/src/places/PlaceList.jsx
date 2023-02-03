import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const PlaceList = ({ place }) => {
    let { authToken, setAuthToken } = useContext(UserContext);
    let {usuari, setUsuari} = useContext(UserContext);
    let navigate = useNavigate();
    return (
        <>
            <td>{place.name}</td>
            <td>{place.description}</td>
            <td>{place.latitude}</td>
            <td>{place.longitude}</td>
            <td>{place.visibility.name}</td>
            <td>{place.author.name}</td>
            <td>❤️{place.favorites_count}</td>
            <td><button onClick={(e) => {navigate("/places/"+place.id)}}>👁️</button>
                {usuari == place.author.email ?
                    <>
                        <button>📝</button> <button>🗑️</button>
                    </>
                    : <></>}    
                    </td>
        </>
    )
}

export default PlaceList
