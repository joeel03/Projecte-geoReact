import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../userContext";
import PlaceGrid from './PlaceGrid'
import { useFetch } from '../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';

const PlacesGrid = () => {
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  // let [places, setPlaces] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const dispatch = useDispatch();
  const { isSaving = true, isLoading, place, favorite } = useSelector((state) => state.places);


  const { data, error, reRender, loading, setUrl } = useFetch("https://backend.insjoaquimmir.cat/api/places", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + authToken,
    },
    method: "GET",
  });

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
      <h1>Places Grid</h1>
      {loading ?
        "cargando.." :
        (data.data).map((place) => (
          <tr key={place.id}>
            {usuari == place.author.email || place.visibility.name == 'public' ?
            //<PlaceGrid place={place} deletePlace={deletePlace}/>

              <PlaceGrid />
              : <></>}
          </tr>
        ))}
    </div>
  )
}

export default PlacesGrid
