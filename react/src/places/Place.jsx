import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Places = () => {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [error, setError] = useState("");
  let [username, setUsername]=useState("");
  let [ roles, setRoles] = useState([]);
  let [name,setName]=useState("");
  const { id } = useParams();

  const getPlace = async ()=> {
      try {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/{id}", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer '  + authToken, 
          },
          method: "GET",
        });
        const resposta = await data.json();
        if (resposta.success === true) {
          console.log(resposta)
          setUsername(resposta.user.name);
          setRoles(resposta.roles);
         // setName(resposta.)
        }        
        else setError(resposta.message);
      } catch{
        console.log("Error");
        alert("Catchch");
      }; 
         
  }
  useEffect(() => {
    getPlace();
  },[]);


  return(
    
    <div>
    {id}
  </div>
  )
  
  
}

export default Places
