import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { CommentsList } from './comments/CommentsList';

//  REACT-REDUCER
import { postMarkReducer } from './postMarkReducer';
import PostMarks from './PostMarks';
import { useReducer } from 'react';

//  SLICE POSTMARKSLICE
import { postMarkSlice } from '../slices/posts/postMarkSlice';
import { ismarked } from '../slices/posts/postMarkSlice';

import { useLocation } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

// POSTSLICE

import { delPost, getPost } from '../slices/posts/thunks';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

//const initialState = [];

const Posts = () => {
  const { id } = useParams();
  // let [post, setPost] = useState([])

  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  let navigate = useNavigate();
  const { isSaving = true, error = "",post, isLoading } = useSelector((state) => state.posts);
  /*
    const init = () => {
      return JSON.parse(localStorage.getItem("marks2")) || []
    }
  
    const [marks2, dispatchMark] = useReducer(postMarkReducer, initialState, init);
  */
  const { marks2, isMarked } = useSelector(state => state.marks2)
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('marks2', JSON.stringify(marks2))
  }, [marks2])

  const { pathname } = useLocation()


  // const getPost = async () => {
  //   try {
  //     const data = await fetch(("https://backend.insjoaquimmir.cat/api/posts/" + id), {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         'Authorization': 'Bearer ' + authToken,
  //       },
  //       method: "GET",
  //     });
  //     const resposta = await data.json();
  //     if (resposta.success === true) {
  //       console.log(resposta)
  //       setLoading(false);
  //       setPost(resposta.data)
  //     }
  //     else {
  //       console.log(resposta)
  //       setError(resposta.message);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //     alert("Catch");
  //   };
  // }

  useEffect(() => {
    // getPost();
    dispatch(getPost(authToken, id))
    dispatch(ismarked(id))
  }, [marks2]);

  //const addMark = () => {


  const data = {
    "id": post.id,
    "body": post.body,
    "ruta": pathname
  }
  /*
  const action = {
    type: "Save Mark",
    payload: data
  }

  dispatchMark(action);

}
*/


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
  //       navigate("/posts/list")
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
    <>
      {isLoading ?
      "cargando"
        :
        <>
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
              {usuari == post.author.name ?
                <>
                  <button onClick={(e) => { navigate("/posts/edit/" + post.id) }}>📝</button>
                  <button onClick={(e) => { dispatch(delPost(authToken, navigate, post.id)) }}>🗑️</button>
                </>
                : <></>}{isMarked ?
                  <button>MARK DESAT</button>
                  :
                  <button onClick={() => {
                    dispatch(addMark(data))
                  }}>DESA MARK</button>
              }
                {usuari == post.author.email ?
                    <>
                        <button onClick={(e) => {navigate("/posts/edit/"+post.id)}}>📝</button> 
                        <button onClick={(e) => {dispatch(delPost(authToken, navigate, post.id))}}>🗑️</button>
                    </>
                    : <></>
                }

            </div>
            <CommentsList
              id={post.id} comments_count={post.comments_count} />
          </div>
        </>
      }
    </>
  )


}

export default Posts
