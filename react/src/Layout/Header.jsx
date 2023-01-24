import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';

const Header = () => {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [error, setError] = useState("");
  let [username, setUsername]=useState("");
  let [ roles, setRoles] = useState([]);

  useEffect(() => {
  fetch("https://backend.insjoaquimmir.cat/api/user", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer '  + authToken, 
      },
      method: "GET",
    })
    .then((data) => data.json())
    .then((resposta) => {
      console.log(resposta);
      if (resposta.success === true) {
        setUsername(resposta.user.name);
        setRoles(resposta.roles);
       }
       else
      {
        setError(resposta.message);
      }
    })
    .catch((data) => {
      console.log(data);
      alert("Catchch");
    });
  },[]);
  const sendLogout = (e) => {
    e.preventDefault();


    fetch("https://backend.insjoaquimmir.cat/api/logout", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer '  + authToken, 
      },
      method: "POST",
      body: JSON.stringify({ })
    })
      .then((data) => data.json())
      .then((resposta) => {
        console.log(resposta);
        if (resposta.success === true) {
          setAuthToken("");
         }else
        {
          setError(resposta.message);
          console.log(resposta)
        }
      })
      .catch((data) => {
        console.log(data);
        alert("Catchch");
      });
      // alert("He enviat les Dades:  " + email + "/" + password);

    };
  return (
    <div>
      Hello estoy loggeado.
      Token: <strong>{authToken}</strong>
      <div>
        <Link to="/places">places </Link>
        <Link to="/posts">posts </Link>
        <Link to="/about">About </Link>
      </div>
      <button className="btn btn-primary btn-block mb-4" onClick={(e) => {
              sendLogout(e);}}>
                {username} - { roles.map (  (v)=> ( <span key={v}> {v} </span>  ) ) }- Logout</button>
    </div>

  )
}

export default Header
