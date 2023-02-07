import React, { useEffect } from 'react'
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";

const PostCreate = () => {
  let navigate = useNavigate();
  let [formulari, setFormulari] = useState({});
  let [error, setError] = useState("");
  let { authToken, setAuthToken } = useContext(UserContext);

  let { body, upload, latitude, longitude, visibility } = formulari;
  const formData = new FormData();
  formData.append("body", body);
  formData.append("upload", upload);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("visibility", visibility);

  const handleChange = (e) => {
    if (e.target.type && e.target.type === "file") {
      setFormulari({
        ...formulari,
        [e.target.body]: e.target.files[0]
      })
    } else {
      setFormulari({
        ...formulari,
        [e.target.body]: e.target.value
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
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts", {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        },
        method: "POST",
        body: formData
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        console.log("post creado")
        navigate("/posts/" + resposta.data.id)
      } else {
        console.log(resposta.message)
        setError(resposta.message);
      }
    } catch {
      console.log("Error");
      alert("catch");
    };
  }

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
  },[])
  return (
    <div>
      <div className="card ">
        <div className="card-header ">

          <h1 className="text-center h2 fw-bold">Crear sitio</h1>

        </div >
        <form method="post" className="separar " action="{{ route('posts.store') }}" enctype="multipart/form-data">
          <div className="form-group">
            <label for="body">Body</label>
            <input type="text" value={formulari.body} onChange={handleChange} name="body" className="form-control" />
          </div>
          <div className="form-group">
            <label for="file">File</label>
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
          <button className="btn btn-primary" onClick={(e) => {
            handleCreate(e);
          }}>Create</button>
          <button className="btn btn-secondary" onClick={(e) => {
            handleReset(e)
          }}>Reset</button>
          {error ? (<div>{error}</div>) : (<></>)}        </form>
      </div>
    </div>
  )
}

export default PostCreate
