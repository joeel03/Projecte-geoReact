import React, { useEffect,useState,useContext } from 'react'
import { UserContext } from "../userContext";
import { addPlace } from '../slices/places/thunks';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; 

const PlaceCreate = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  //let [formulari, setFormulari] = useState({});
  // let [error, setError] = useState("");

  const { isSaving = true, error = "" } = useSelector((state) => state.places);
  let { authToken, setAuthToken } = useContext(UserContext);
  const { register, handleSubmit , formState: { errors },setValue} = useForm();

  const afegir = (data) => {
    const data2 = { ...data, upload: data.upload[0]}
    dispatch(addPlace(data2, authToken,navigate));
    } 
  // let { name, description, upload, latitude, longitude, visibility = 1 } = formulari;
  // const formData = new FormData;
  // formData.append("name", name);
  // formData.append("description", description);
  // formData.append("upload", upload);
  // formData.append("latitude", latitude);
  // formData.append("longitude", longitude);
  // formData.append("visibility", visibility);

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   if (e.target.type && e.target.type === "file") {
  //     setFormulari({
  //       ...formulari,
  //       [e.target.name]: e.target.files[0]
  //     })
  //   } else {
  //     setFormulari({
  //       ...formulari,
  //       [e.target.name]: e.target.value
  //     })
  //   }
  // };
  // const handleReset = (e) => {
  //   e.preventDefault()
  //   setFormulari({
  //     ...formulari,
  //     name: "",
  //     description: "",
  //     upload: ""
  //   })
  // };
  // const handleCreate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Authorization': 'Bearer ' + authToken
  //       },
  //       method: "POST",
  //       body: formData
  //     });
  //     const resposta = await data.json();
  //     if (resposta.success === true) {
  //       console.log("place creado")
  //       navigate("/places/"+resposta.data.id)
  //     }
  //     else {
  //       console.log(resposta.message)
  //       setError(resposta.message);
  //     }
  //   } catch {
  //     console.log("Error");
  //     alert("Catchch");
  //   };
  // }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
    setValue('latitude', pos.coords.latitude)
    setValue('longitude', pos.coords.longitude)
    });
  }, []); 

  return (
    <div>
      <div className="card ">
        <div className="card-header ">

          <h1 className="text-center h2 fw-bold">Crear sitio</h1>

        </div >
        <form method="post" className="separar" enctype="multipart/form-data">
          <div className="form-group">
            <label for="name">Name</label>
            <input {...register("name", {
            required: "Aquest camp és obligatori",
            maxLength: {
              value: 255,
              message: "El nom pot contenir un maxim de 255 caràcters"
            },
           
          })} type="text"
            // value={formulari.name} onChange={handleChange} name="name"
              className="form-control" />
          </div>
          {errors.name && <p>{errors.name.message}</p>}

          <div className="form-group">
            <label for="description">Description</label>
            <textarea {...register("description", {
            required: "Aquest camp és obligatori",
            maxLength: {
              value: 255,
              message: "La descripció pot contenir un maxim de 255 caràcters"
            },
           
          })} 
             //name="description" value={formulari.description} onChange={handleChange}
              className="form-control"></textarea>
          </div>
          {errors.description && <p>{errors.description.message}</p>}

          <div className="form-group">
            <label for="upload">File</label>
            <input type="file" accept=".gif,.jpg,.jpeg,.png,.mp4" {...register("upload", {
            required: "Aquest camp és obligatori",
            maxLength: {
              value: 2048,
              message: "El nom de la imatge pot contenir un maxim de 2048 caràcters"
            },
            // ESTA EXPRESION REGULAR ESTA COMENTADA PORQUE NO HACE FALTA,
            // YA QUE HE PUESTO UN ACCEPT EN EL INPUT Y EL NAVEGADOR SOLO DEJA SELECCIONAR LOS TIPOS QUE PONE
            //pattern: {

            //   value: /\.(gif|jpe?g|png|mp4)$/,
  
            //   message:
  
            //     "El tipus ha de ser un del seguents gif, jpeg, jpg, png, mp4."
  
            // }
           
          })} 
            //value={formulari.file} onChange={handleChange} name="upload" 
            className="form-control" />
          </div>
          {errors.upload && <p>{errors.upload.message}</p>}

          <div className="form-group">
            <label for="latitude">Latitude</label>
            <input {...register("latitude", {
            required: "Aquest camp és obligatori",         
          })}
            //value={formulari.latitude} onChange={handleChange} name="latitude" 
            className="form-control" />
          </div>
          {errors.latitude && <p>{errors.latitude.message}</p>}

          <div className="form-group">
            <label for="longitude">Longitude</label>
            <input  {...register("longitude", {
            required: "Aquest camp és obligatori",
          })}
            //value={formulari.longitude} onChange={handleChange} name="longitude" 
            className="form-control" />
          </div>
          {errors.longitude && <p>{errors.longitude.message}</p>}

          <div className="form-group">
            <label for="visibility">Visibility</label>

            <select {...register("visibility", {
            required: "Aquest camp és obligatori",        
          })} 
            //name="visibility" value={formulari.visibility} onChange={handleChange} 
            className="form-control"  >
              <option value="1" selected>public</option>
              <option value="2">contacts</option>
              <option value="3">private</option>
            </select>

          </div>
          {errors.visibility && <p>{errors.visibility.message}</p>}

          {isSaving?
            <>
             
            </>:
            <>
             <button className="btn btn-primary" 
             //</>onClick={(e) => {e.preventDefault(); dispatch(addPlace(formData, authToken, navigate,dispatch));}}
              onClick={handleSubmit(afegir)}
             >Create</button>
            </>
          }


          <button className="btn btn-secondary"
           onClick={() => { reset }}
           //onClick={(e) => { handleReset(e)  }}
           >Reset</button>
          {error ? (<div>{error}</div>) : (<></>)}        </form>
      </div>
    </div>
  )
}

export default PlaceCreate