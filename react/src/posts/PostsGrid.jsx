import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostGrid from './PostGrid';

const PostsGrid = () => {
    let { authToken, setAuthToken } = useContext(UserContext);
    let [error, setError] = useState("");
    let [Posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            const data = await fetch("https://backend.insjoaquimmir.cat/api/Posts/", {
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

    return (
        <div>
            <h1>Posts Grid</h1>
            {Posts.map((post) => (
                <div key={post.id}> {<PostGrid post={post} />} </div>
            ))}
        </div>
    )
}

export default PostsGrid
