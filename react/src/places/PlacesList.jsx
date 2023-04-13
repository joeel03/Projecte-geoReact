import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useFetcher, useParams } from 'react-router-dom';
import PlaceList from './PlaceList'
// import { useFetch } from '../hooks/useFetch';
import { useSelector,useDispatch } from 'react-redux';
import { getPlaces } from '../slices/places/thunks';
import Paginate from './Paginate';
const PlacesList = () => {
  const dispatch = useDispatch();
  const { isSaving = true, isLoading,places, favorite } = useSelector((state) => state.places);

    let { authToken, setAuthToken,usuari, setUsuari } = useContext(UserContext);
    // let [error, setError] = useState("");
    // let [places, setPlaces] = useState([]);
    // const [ refresh, setRefresh ] = useState(false)
    const { id } = useParams();
    useEffect(() => {
      dispatch(getPlaces(authToken))
    }, []);
    console.log(places)
    // const { data, error,reRender, loading, setUrl } = useFetch("https://backend.insjoaquimmir.cat/api/places", {
    //   headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       'Authorization': 'Bearer ' + authToken,
    //   },
    //   method: "GET",
    // });
      //setPlaces(data);
    // console.log(data)

    // const deletePlace = async (id) => {
    //     try {
    //       const data = await fetch(("https://backend.insjoaquimmir.cat/api/places/"+id), {
    //         headers: {
    //           'Accept': 'application/json',
    //           'Authorization': 'Bearer ' + authToken
    //         },
    //         method: "DELETE",
    //       });
    //       const resposta = await data.json();
    //       if (resposta.success === true) {
    //         console.log("place eliminado")
    //         reRender();
    //       }
    //       else {
    //         console.log(resposta.message)
    //         setError(resposta.message);
    //       }
    //     } catch(err) {
    //       console.log(err.message);
    //       alert("Catchch");
    //     };
    //   }
    
    return (
        <div>
            <h1>Places List</h1>
            <table>
                <tr>
                    <th>name</th>
                    <th>description</th>
                    <th>latitude</th>
                    <th>longitude</th>
                    <th>visibility</th>
                    <th>author</th>
                    <th>favorits</th>

                </tr>
                {isLoading?
                "cargando..": 
                (places).map((place) => (
                  <tr key={place.id}> 
                  {usuari==place.author.email||place.visibility.name=='public'?
                      //<PlaceList place={place} deletePlace={deletePlace}/>
                      <PlaceList place={place}/>
                      :<></>}
                  </tr>
          ))}
                
            </table>

        </div>
    
    )
}

export default PlacesList
