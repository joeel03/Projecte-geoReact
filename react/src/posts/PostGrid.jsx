import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const PostGrid = ({post}) => {
  let { authToken, setAuthToken } = useContext(UserContext);
  return (
    <>
    <div className="element">
      <div className="imagen">
        <img src={"https://backend.insjoaquimmir.cat/storage/" + post.file.filepath} width="200px" height="400px" alt="{post.name}"></img>
        </div>
      
      <div className="texto">
        <div className="titulo">{post.name}</div>
        <div className="description">{post.description}</div>
        <div className="likes">{post.favorites_count}</div>
        <div className="veureeditaresborrar"></div>
      </div>
    </div>
    </>
    
  )
}

export default PostGrid
