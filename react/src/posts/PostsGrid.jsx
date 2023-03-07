import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostGrid from './PostGrid';
import { useNavigate } from "react-router-dom";
import { useFetch } from '../hooks/useFetch';

const PostsGrid = () => {
  let { authToken, setAuthToken } = useContext(UserContext);
  //let [error, setError] = useState("");
  let [posts, setPosts] = useState([]);
  let { usuari, setUsuari } = useContext(UserContext);
  let navigate = useNavigate();
  const [refresh, setRefresh] = useState(false)

  const { data, /*error, */reRender, loading, setUrl } = useFetch("https://backend.insjoaquimmir.cat/api/posts/", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + authToken,
    },
    method: "GET",
  });

  const deletePost = async (id) => {
    try {
      const data = await fetch(("https://backend.insjoaquimmir.cat/api/posts/" + id), {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        },
        method: "DELETE",
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        console.log("post eliminado")
        setRefresh(!refresh)
      }
      else {
        console.log(resposta.message)
        setError(resposta.message);
      }
    } catch (err) {
      console.log(err.message);
      alert("Catch");
    };
  }
  return (
    <div>
      <h1>Posts Grid</h1>
      {loading?
        "Cargando posts...":
        (data.data).map((post) => (
          <div key={post.id}> {usuari == post.author.email || post.visibility.name == 'public' ?
            <PostGrid post={post} deletePost={deletePost} />
            : <></>}
          </div>
        ))}
    </div>
  )
}

export default PostsGrid
