import React, { useEffect } from 'react'
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const PlaceEdit = () => {
  let navigate = useNavigate();
  let [formulari, setFormulari] = useState({});
  let { authToken, setAuthToken } = useContext(UserContext);
  let [error, setError] = useState("");
  const { id } = useParams();
  let [loading, setLoading] = useState(true);
  let [place, setPlace] = useState([])

  
  const getPlace = async () => {
    try {
      console.log(id)
      const data = await fetch(("https://backend.insjoaquimmir.cat/api/places/" + id), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken,
        },
        method: "GET",
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        console.log(resposta);
        setLoading(false);
        setPlace(resposta.data);
        setFormulari({name:resposta.data.name,
          description:resposta.data.description,
          upload:"",
          latitude:resposta.data.latitude,
          longitude:resposta.data.longitude,
          visibility:resposta.data.visibility.id})
      }
      else {
        setError(resposta.message);
      }
    } catch (err) {
      console.log(err.message);
      alert("Catchch");
    };

  }
  useEffect(() => {
    getPlace();
  }, []);
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
  let { name, description, upload, latitude, longitude, visibility=1 } = formulari;
  const formData = new FormData;
  formData.append("name", name);
  formData.append("description", description);
  formData.append("upload", upload);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("visibility", visibility);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(("https://backend.insjoaquimmir.cat/api/places/"+id), {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        },
        method: "POST",
        body: formData
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        console.log("place actualizado")
        navigate("/places/"+resposta.data.id)
      }
      else {
        console.log(resposta.message)
        setError(resposta.message);
      }
    } catch {
      console.log("Error");
      alert("Catchch");
    };
  }
  

  return (
    <>
    {loading ?
      "cargando..."
      :
    <div>
      <div className="card ">
        <div className="card-header ">

          <h1 className="text-center h2 fw-bold">Crear sitio</h1>

        </div >
        <form method="post" className="separar" enctype="multipart/form-data">
          <div className="form-group">
            <label for="name">Name</label>
            <input type="text" value={formulari.name} onChange={handleChange} name="name" className="form-control" />
          </div>
          <div className="form-group">
            <label for="description">Description</label>
            <textarea name="description" value={formulari.description} onChange={handleChange} className="form-control"></textarea>
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
  
              <select name="visibility"  value={formulari.visibility} onChange={handleChange} className="form-control"  >
                <option value="1" selected>public</option>
                <option value="2">contacts</option>
                <option value="3">private</option>
              </select>
            
          </div>
          <button className="btn btn-primary" onClick={(e) => {
            handleUpdate(e);
          }}>Update</button>
        
          {error? (<div>{error}</div>):(<></>) }        </form>
      </div>
    </div>
 }
  </>
  )
}

export default PlaceEdit
