import React, { useEffect } from 'react'
import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

// USANDO POSTSLICE
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { addPost } from '../slices/posts/thunks';

const PostCreate = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let [formulari, setFormulari] = useState({});
  //  let [error, setError] = useState("");

  const { id } = useParams();

  const { isSaving = true, error = "" } = useSelector((state) => state.posts);

  let { authToken, setAuthToken } = useContext(UserContext);

  let { body, upload, latitude, longitude, visibility = 1 } = formulari;
  const formData = new FormData;
  formData.append("body", body);
  formData.append("upload", upload);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("visibility", visibility);


  const handleChange = (e) => {
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

  const handleReset = (e) => {
    e.preventDefault()
    setFormulari({
      ...formulari,
      body: "",
      upload: ""
    })
  };
  //  const handleCreate = async (e) => {
  //    e.preventDefault();
  //    let { body, upload, latitude, longitude, visibility = 1 } = formulari;
  //    const formData = new FormData();
  //    formData.append("body", body);
  //    formData.append("upload", upload);
  //    formData.append("latitude", latitude);
  //    formData.append("longitude", longitude);
  //    formData.append("visibility", visibility);
  //    try {
  //      const data = await fetch("https:backend.insjoaquimmir.cat/api/posts", {
  //        headers: {
  //          'Accept': 'application/json',
  //          'Authorization': 'Bearer ' + authToken
  //        },
  //        method: "POST",
  //        body: formData
  //      });
  //      const resposta = await data.json();
  //      if (resposta.success === true) {
  //        console.log("post creado")
  //        navigate("/posts/" + resposta.data.id)
  //      } else {
  //        console.log(resposta.message)
  //        setError(resposta.message);
  //      }
  //    } catch {
  //      console.log("Error");
  //      alert("catch");
  //    };
  //  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setFormulari({
        ...formulari,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude

      })
      console.log("Latitude is :", pos.coords.latitude);
      console.log("Longitude is :", pos.coords.longitude);
    });
  }, []);

  return (
    <div>
      <div className="card ">
        <div className="card-header ">

          <h1 className="text-center h2 fw-bold">Crear Post</h1>

        </div >
        <form method="post" className="separar " action="{{ route('posts.store') }}" enctype="multipart/form-data">
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
          {isSaving ?
            <>

            </> :
            <>
              <button className="btn btn-primary" onClick={(e) => {
                e.preventDefault(),
                  dispatch(addPost(authToken, formData, navigate, dispatch));
              }}>Afegir Publicació</button>
            </>
          }
          <button className="btn btn-secondary" onClick={() => {
            handleReset(e);
          }}>Reset</button>
          {error ? (<div>{error}</div>) : (<></>)}        </form>
      </div>
    </div>
  )
}

export default PostCreate
