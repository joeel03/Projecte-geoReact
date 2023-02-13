import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const PostList = ({ post }) => {
    let { authToken, setAuthToken } = useContext(UserContext);
    let { usuari, setUsuari } = useContext(UserContext);
    let navigate = useNavigate();
    return (
        <>
            <td>{post.body}</td>
            <td>{post.latitude}</td>
            <td>{post.longitude}</td>
            <td>{post.visibility.name}</td>
            <td>{post.author.name}</td>
            <td>❤️{post.likes_count}</td>
            <td><button onClick={(e) => { navigate("/posts/" + post.id) }}>👁️</button>
                {usuari == post.author.email ?
                    <>
                        <button>📝</button> <button>🗑️</button>
                    </>
                    : <></>
                }
            </td>
        </>
    )
}

export default PostList
