import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const PostGrid = ({ post, deletePost }) => {
  let { authToken, setAuthToken } = useContext(UserContext);
  let { usuari, setUsuari } = useContext(UserContext);
  let navigate = useNavigate();

  return (
    <>
      <div className="element">
        <div className="imagen">
          <img src={"https://backend.insjoaquimmir.cat/storage/" + post.file.filepath} width="400Ipx" height="400px" alt="{post.name}"></img>
        </div>

        <div className="texto">
          <div className="Cos de text">{post.body}</div>
          <div className="description">{post.description}</div>
          <div className="likes">{post.likes}</div>
          <div className="veureeditaresborrar"><button onClick={(e) => { navigate("/posts/" + post.id) }}>veure</button>
            {usuari == post.author.email ?
              <>
                <button onClick={(e) => { navigate("/posts/edit/" + post.id) }}>editar</button>
                <button onClick={(e) => { deletePost(post.id) }} >Borrar</button>
              </>
              : <></>}
          </div>
        </div>
      </div>
    </>

  )
}

export default PostGrid
