import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import { CommentsList } from './comments/CommentsList';
import { useFetch } from '../hooks/useFetch';
import { useLocation } from 'react-router-dom';

// POSTSLICE

import { delPost, getPost, editPost } from '../slices/posts/thunks';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const PostEdit = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let [formulari, setFormulari] = useState({});
  // let [error, setError] = useState("");
  const { id } = useParams();

  const { isSaving = true, error = "", post, isLoading, setError } = useSelector((state) => state.posts);

  let { authToken, setAuthToken } = useContext(UserContext);

  let { body, upload, latitude, longitude, visibility = 1 } = formulari;
  const formData = new FormData;
  formData.append("body", body);
  formData.append("upload", upload);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("visibility", visibility);

  useEffect(() => {
    dispatch(getPost(authToken, id))
  }, [])
  useEffect(() => {

    setFormulari({

      body: post.body,

      longitude: post.longitude,

      latitude: post.latitude,

      visibility: post.visibility.id

    })

  }, [post])


  // const getPost = async () => {
  //   try {
  //     console.log(id)
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
  //       console.log(resposta);
  //       setLoading(false);
  //       setPlace(resposta.data);
  //       setFormulari({
  //         body: resposta.data.body,
  //         upload: "",
  //         latitude: resposta.data.latitude,
  //         longitude: resposta.data.longitude,
  //         visibility: resposta.data.visibility.id
  //       })
  //     }
  //     else {
  //       setError(resposta.message);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //     alert("Catch");
  //   };
  // }


  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.type && e.target.type === "file") {
      setFormulari({
        ...formulari,
        [e.target.name]: e.target.files[0]
      })
    } else {
      setFormulari({
        ...formulari,
        [e.target.name]: e.target.value
      })
    }
  };


  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const data = await fetch(("https://backend.insjoaquimmir.cat/api/posts/" + id), {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Authorization': 'Bearer ' + authToken
  //       },
  //       method: "POST",
  //       body: formData
  //     });
  //     const resposta = await data.json();
  //     if (resposta.success === true) {
  //       console.log("post actualizado")
  //       navigate("/posts/" + resposta.data.id)
  //     }
  //     else {
  //       console.log(resposta.message)
  //       setError(resposta.message);
  //     }
  //   } catch {
  //     console.log("Error");
  //     alert("Catch");
  //   };
  // }

  return (
    <>
      {isLoading ?
        "cargando..."
        :
        <div>
          <div className="card ">
            <div className="card-header ">

              <h1 className="text-center h2 fw-bold">Crear publicació</h1>

            </div >
            <form method="post" className="separar" enctype="multipart/form-data">
              <div className="form-group">
                <label for="body">Body</label>
                <input type="text" value={formulari.body} onChange={handleChange} name="body" className="form-control" />
              </div>
              <div className="form-group">
                <label for="upload">File</label>
                <input type="file" value={formulari.file} onChange={handleChange} name="upload" className="form-control" />
              </div>
              <div className="form-group">
                <label for="latitude">Latitude</label>
                <input value={formulari.latitude} onChange={handleChange} name="latitude" className="form-control" />
              </div>
              <div className="form-group">
                <label for="longitude">Longitude</label>
                <input value={formulari.longitude} onChange={handleChange} name="longitude" className="form-control" />
              </div>
              <div className="form-group">
                <label for="visibility">Visibility</label>

                <select name="visibility" value={formulari.visibility} onChange={handleChange} className="form-control"  >
                  <option value="1" selected>public</option>
                  <option value="2">contacts</option>
                  <option value="3">private</option>
                </select>

              </div>
              <br></br>
              <button className="btn btn-primary" onClick={(e) => {
                e.preventDefault(),
                  dispatch(editPost(authToken, id, formulari, dispatch, navigate));
              }}>Update</button>

              {error ? (<div>{error}</div>) : (<></>)}        </form>
          </div>
        </div>
      }
    </>
  )

}

export default PostEdit
