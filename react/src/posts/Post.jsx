import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {CommentsList} from './comments/CommentsList';

const Posts = () => {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [post, setPost] = useState([])
  let [error, setError] = useState("");
  const { id } = useParams();
  let [loading, setLoading] = useState(true);
  let { usuari, setUsuari } = useContext(UserContext);
  let navigate = useNavigate();

  const getPost = async () => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
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
        setPost(resposta.data)
      }
      else {
        console.log(resposta)
        setError(resposta.message);
      }
    } catch (err) {
      console.log(err.message);
      alert("Catch");
    };

  }
  useEffect(() => {
    getPost();
  }, []);

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
        navigate("/posts/list")
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
    <>
      {loading ?
        "cargando..."
        :
        <div class="card">
          <div class="card-header">
            <img class="img-fluid" src={"https://backend.insjoaquimmir.cat/storage/" + post.file.filepath} title="Image preview" width="300px" />
            <table class="table">
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>{post.id}</td>
                </tr>
                <tr>
                  <td>Body</td>
                  <td>{post.body}</td>
                </tr>
                <tr>
                  <td>Lat</td>
                  <td>{post.latitude}</td>
                </tr>
                <tr>
                  <td>Lng</td>
                  <td>{post.longitude}</td>
                </tr>
                <tr>
                  <td>Author</td>
                  <td>{post.author.name}</td>
                </tr>

              </tbody>
            </table>
            {usuari == post.author.email ?
              <>
                <button onClick={(e) => { navigate("/posts/edit/" + post.id) }}>📝</button>
                <button onClick={(e) => { deletePost(post.id) }}>🗑️</button>
              </>
              : <></>}
          </div>
          <CommentsList />
        </div>

      }
    </>
  )


}

export default Posts
