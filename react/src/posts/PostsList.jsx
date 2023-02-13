import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostList from './PostList'

const PostsList = () => {
    let { authToken, setAuthToken } = useContext(UserContext);
    let [error, setError] = useState("");
    let [posts, setPosts] = useState([]);
    let {usuari, setUsuari} = useContext(UserContext);

    //const { id } = useParams();

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
            alert("Catch");
        };

    }
    useEffect(() => {
        getPosts();
    }, []);
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
                </tr>
                {posts.map((post) => (
                        <tr key={post.id}> 
                        {usuari==post.author.email||post.visibility.name=='public'?
                            <PostList post={post}/>
                            :<></>}
                        </tr>
                ))}
            </table>




        </div>
    )
}

export default PostsList
