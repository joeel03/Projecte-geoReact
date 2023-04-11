import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useFetcher, useParams } from 'react-router-dom';
import PostList from './PostList'
import { useFetch } from '../hooks/useFetch';

const PostsList = () => {
    let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
    //let [error, setError] = useState("");
    let [posts, setPosts] = useState([]);
    const { id } = useParams();
    const [refresh, setRefresh] = useState(false);

    const { data, reRender, /*error,*/ loading, seUrl } = useFetch("https://backend.insjoaquimmir.cat/api/posts/", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + authToken,
        },
        method: "GET",
    });
    console.log(data)

    const deletePost = async (id) => {
        try {
          const data = await fetch(("https://backend.insjoaquimmir.cat/api/posts/"+id), {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + authToken
            },
            method: "DELETE",
          });
          const resposta = await data.json();
          if (resposta.success === true) {
            console.log("post eliminado")
            reRender();
          }
          else {
            console.log(resposta.message)
            setError(resposta.message);
          }
        } catch(err) {
          console.log(err.message);
          alert("Catch");
        };
      }    

    return (
        <div>
            <h1>Posts List</h1>
            <table>
                <tr>
                    <th>body</th>
                    <th>latitude</th>
                    <th>longitude</th>
                    <th>visibility</th>
                    <th>author</th>
                    <th>likes</th>
                </tr>z
                {loading?
                "Cargando...":
                (data.data).map((post) => (
                    <tr key={post.id}>
                        {usuari == post.author.email || post.visibility.name == 'public'?

                            <PostList post={post} deletePost={deletePost} />
                            : <></>}
                    </tr>
                ))}

            </table>
        </div>
    )
}

export default PostsList
