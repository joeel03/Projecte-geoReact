import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Place = () => {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [error, setError] = useState("");
  const { id } = useParams();
  let [loading, setLoading] = useState(true);
  let [place, setPlace] = useState([])
  let {usuari, setUsuari} = useContext(UserContext);
  let navigate = useNavigate();
  const { state } = useLocation();
  const getPlace = async () => {
    try {
      console.log(id)
      const data = await fetch(("https://backend.insjoaquimmir.cat/api/places/" + id), {
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
        setLoading(false);
        setPlace(resposta.data)

      }
      else {
        console.log(resposta)
        setError(resposta.message);
      }
    } catch (err) {
      console.log(err.message);
      alert("Catchch");
    };

  }
  useEffect(() => {
    getPlace();
  }, []);


  return (

    <>
      {loading ?
        "cargando..."
        :
        <>
          <div class="card">
            <div class="card-header">
              <img class="img-fluid" src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath}  title="Image preview" width="300px" />
              <table class="table">
                <tbody>
                  <tr>
                    <td>ID</td>
                    <td>{place.id}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{place.name}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>{place.description}</td>
                  </tr>
                  <tr>
                    <td>Lat</td>
                    <td>{place.latitude}</td>
                  </tr>
                  <tr>
                    <td>Lng</td>
                    <td>{place.longitude}</td>
                  </tr>
                  <tr>
                    <td>Author</td>
                    <td>{place.author.name}</td>
                  </tr>

                </tbody>
              </table>
                {usuari == place.author.email ?
                    <>
                        <button onClick={(e) => {navigate("/places/edit/"+place.id)}}>📝</button> 
                        <button onClick={(e) => {state.deletePlace(place.id)}}>🗑️</button>
                    </>
                    : <></>}    
            </div>

          </div>
        </>

      }
    </>
  )


}

export default Place
