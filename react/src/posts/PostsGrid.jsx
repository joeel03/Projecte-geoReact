import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostGrid from './PostGrid';
import { useNavigate } from "react-router-dom";
import { useFetch } from '../hooks/useFetch';

// POSTS SLICES
import { getPost } from '../slices/posts/thunks';
import Paginate from './Paginate';
import { useSelector, useDispatch } from 'react-redux';

const PostsGrid = () => {
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  //let [error, setError] = useState("");
  // let [posts, setPosts] = useState([]);
  let dispatch = useDispatch();
  // const [refresh, setRefresh] = useState(false)
  const { posts = [], isLoading, page } = useSelector((state) => state.posts)

  // const { data, /*error, */reRender, loading, setUrl } = useFetch("https://backend.insjoaquimmir.cat/api/posts/", {
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     'Authorization': 'Bearer ' + authToken,
  //   },
  //   method: "GET",
  // });

  useEffect(() => {
    dispatch(getPost(authToken, page))
  }, [page]);

  // const deletePost = async (id) => {
  //   try {
  //     const data = await fetch(("https://backend.insjoaquimmir.cat/api/posts/" + id), {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Authorization': 'Bearer ' + authToken
  //       },
  //       method: "DELETE",
  //     });
  //     const resposta = await data.json();
  //     if (resposta.success === true) {
  //       console.log("post eliminado")
  //       setRefresh(!refresh)
  //     }
  //     else {
  //       console.log(resposta.message)
  //       setError(resposta.message);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //     alert("Catch");
  //   };
  // }
  return (
    <div>
      <h1>Posts Grid</h1>
      <button onClick={(e) => { dispatch(delPost(authToken, navigate, post.id)) }}>🗑️</button>

      {isLoading ?
        "Cargando posts..." :
        (data.data).map((post) => (
          <div key={post.id}> {usuari == post.author.email || post.visibility.name == 'public' ?
            <PostGrid post={post} deletePost={deletePost} />

            : <></>}
          </div>
        ))}
      <Paginate />
    </div>
  )
}

export default PostsGrid
