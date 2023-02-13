import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostGrid from './PostGrid';
import { useNavigate } from "react-router-dom";

const PostsGrid = () => {
    let { authToken, setAuthToken } = useContext(UserContext);
    let [error, setError] = useState("");
    let [posts, setPosts] = useState([]);
    let {usuari, setUsuari} = useContext(UserContext);
    let navigate = useNavigate();
    
    const getPosts = async () => {
        try {
            const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/", {
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
                setPosts(resposta.data);

            }
            else setError(resposta.message);
        } catch {
            console.log("Error");
            alert("Catchch");
        };

    }
    useEffect(() => {
        getPosts();
    }, []);

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
            navigate("/posts/grid")
          }
          else {
            console.log(resposta.message)
            setError(resposta.message);
          }
        } catch (err){
          console.log(err.message);
          alert("Catch");
        };
      }
    return (
        <div>
            <h1>Posts Grid</h1>
            {posts.map((post) => (
                <div key={post.id}> {usuari==post.author.email||post.visibility.name=='public'?

                <PostGrid post={post} deletePost={deletePost}/>
                :<></>} 
                </div>
            ))}
        </div>
    )
}

export default PostsGrid
