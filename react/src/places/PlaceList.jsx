import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PlaceList = ({ place }) => {
    let { authToken, setAuthToken } = useContext(UserContext);
    
    return (
        <>
            <td>{place.name}</td>
            <td>{place.description}</td>
            <td>{place.latitude}</td>
            <td>{place.longitude}</td>
            <td>{place.visibility.name}</td>
            <td>{place.author.name}</td>
            <td>{place.favorites_count}</td>
        </>
    )
}

export default PlaceList
