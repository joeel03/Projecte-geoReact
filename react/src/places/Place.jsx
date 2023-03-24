import React from 'react'
import { UserContext } from "../userContext";
import { useState, useEffect,useContext } from 'react';
import { useParams,useNavigate,useLocation } from 'react-router-dom';
import ReviewList from './reviews/ReviewList';
// import PlaceMarks from './PlaceMarks';
// import { placeMarkReducer } from './placeMarkReducer';
// import { useReducer } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { addMark } from '../slices/placeMarkSlice.';
import { setError } from './reviews/slices/reviewSlice';
import { ismarked } from '../slices/placeMarkSlice.';
import { getPlace,delPlace,comprovarFavorite,eliminarFavorite,darFavorite } from '../slices/places/thunks';
// const initialState = [];

const Place = () => {
  let { authToken, setAuthToken, refresh, setRefresh,usuari, setUsuari } = useContext(UserContext);
  // let [error, setError] = useState("");
  const { id } = useParams();
  // let [loading, setLoading] = useState(true);
  // let [place, setPlace] = useState([])
  let navigate = useNavigate();
  let [favorite, setFavorite] = useState(null);
  const { isSaving = true, error ,isLoading,place } = useSelector((state) => state.places);

  //  const init = () => {
  //    return JSON.parse(localStorage.getItem("marks")) || []
  //  }
  //  const [marks, dispatchMark] = useReducer(placeMarkReducer, initialState, init);

  const { marks, isMarked } = useSelector(state => state.marks)
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('marks', JSON.stringify(marks))
  }, [marks])
  console.log("marks: "+marks)

  const { pathname } = useLocation()

  // const comprovarFavorite = async () => {

  //   try {
  //     console.log("Id place:"+id)
  //     const data = await fetch(("https://backend.insjoaquimmir.cat/api/places/" + id + "/favorites"), {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         'Authorization': 'Bearer ' + authToken,
  //       },
  //       method: "POST",
  //     });
  //     const resposta = await data.json();
  //     if (resposta.success === true) {
  //       console.log("Resposta:" +resposta)
  //       eliminarFavorite();

  //     }
  //     else {
  //       setFavorite(false)
  //       console.log("Resposta:" +resposta)
  //       setError(resposta.message);
  //     }
  //   } catch (err) {
  //     console.log("Err message"+err.message);
  //     alert("Catchch");
  //   };
  // // }
  // const darFavorite = async (e) => {
  //   try {
  //     console.log(id)
  //     const data = await fetch(("https://backend.insjoaquimmir.cat/api/places/" + id + "/favorites"), {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         'Authorization': 'Bearer ' + authToken,
  //       },
  //       method: "POST",
  //     });
  //     const resposta = await data.json();
  //     if (resposta.success === true) {
  //       console.log(resposta)
  //       console.log("favorite añadido")
  //       setFavorite(false)

  //     }
  //     else {
  //       console.log(resposta.message)
  //       setError(resposta.message);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //     alert("Catchch");
  //   };
  // //}
  // const eliminarFavorite = async () => {
  //   try {
  //     console.log(id)
  //     const data = await fetch(("https://backend.insjoaquimmir.cat/api/places/" + id + "/favorites"), {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         'Authorization': 'Bearer ' + authToken,
  //       },
  //       method: "DELETE",
  //     });
  //     const resposta = await data.json();
  //     if (resposta.success === true) {
  //       console.log(resposta)
  //       setFavorite(true)
  //       console.log("favorite eliminado")
  //     }
  //     else {
  //       console.log(resposta.message)
  //       setError(resposta.message);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //     alert("Catchch");
  //   };
  // }
  // const getPlace = async () => {
  //   try {
  //     console.log(id)
  //     const data = await fetch(("https://backend.insjoaquimmir.cat/api/places/" + id), {
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
  //       setPlace(resposta.data)
  //     }
  //     else {
  //       console.log(resposta)
  //       setError(resposta.message);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //     alert("Catchch");
  //   };

  // }
  useEffect(() => {
    // getPlace();
    dispatch(getPlace(authToken,id))
    dispatch(comprovarFavorite(authToken,id));
    dispatch(ismarked(id))
  }, [marks]);

  // const addMark = () => {


  const data = {
    "id": place.id,
    "name": place.name,
    "description": place.description,
    "ruta": pathname

  }
  // const action = {
  //   type: "Save Mark",
  //   payload: data
  // }

  //   dispatchMark(action);


  // }


  // const deletePlace = async (id) => {
  //   try {
  //     const data = await fetch(("https://backend.insjoaquimmir.cat/api/places/" + id), {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Authorization': 'Bearer ' + authToken
  //       },
  //       method: "DELETE",
  //     });
  //     const resposta = await data.json();
  //     if (resposta.success === true) {
  //       console.log("place eliminado")
  //       navigate("/places/list")
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
  
  
  return (

    <>
      {isLoading ?
        "cargando..."
        :
        <>
          <div class="card">
            <div class="card-header">
              <img class="img-fluid" src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} title="Image preview" width="300px" />
              <table class="table">
                <tbody>
                  <tr>
                    <td>ID</td>
                    <td>{place.id}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{place.name}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>{place.description}</td>
                  </tr>
                  <tr>
                    <td>Lat</td>
                    <td>{place.latitude}</td>
                  </tr>
                  <tr>
                    <td>Lng</td>
                    <td>{place.longitude}</td>
                  </tr>
                  <tr>
                    <td>Author</td>
                    <td>{place.author.name}</td>
                  </tr>

                </tbody>
              </table>
              {usuari == place.author.email ?
                <>
                  <button onClick={(e) => { navigate("/places/edit/" + place.id) }}>📝</button>
                  <button onClick={(e) => { dispatch(delPlace(authToken,navigate,place.id)) }}>🗑️</button>
                </>
                : <></>}{isMarked ?
                  <button>DESAT</button>
                  :
                  <button onClick={() => {
                    dispatch(addMark(data))
                  }}>DESA</button>
              }

              {favorite ?
              
                <button onClick={(e) => { e.preventDefault,dispatch(darFavorite(authToken,id)) }}>⭐</button>
                :
                <>
                {console.log(id)}
                <button onClick={(e) => { e.preventDefault,dispatch(eliminarFavorite(authToken,id)) }}>⭐❌</button>
                
                </>

              }
            </div>

          </div>
          <ReviewList id={place.id}/>
        </>

      }
    </>
  )


}

export default Place
