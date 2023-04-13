import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../userContext';
import { useNavigate } from 'react-router';
import { setFilter } from '../slices/places/placeSlice';
// import { useParams } from 'react-router-dom';

// const PlaceGrid = ({ place, deletePlace }) => {

const PlaceGrid = ({ place }) => {
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  //REVISAAAAAAAAAAAR let navigate = useNavigate();
  const dispatch= useDispatch();
 
  return (
    <>
      <div className="element">
        <div className="imagen">
          <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} width="200px" height="400px" alt="{place.name}"></img>
        </div>

        <div className="texto">
          <div className="titulo">{place.name}</div>
          <div className="description">{place.description}</div>

          <div className="likes">❤️{place.favorites_count}</div>
          <div className="veureeditaresborrar"><button onClick={(e) => { navigate("/places/" + place.id) }}>veure</button>
            {usuari == place.author.email ?
              <>
                <button onClick={(e) => { navigate("/places/edit/" + place.id) }}>Editar</button> <button onClick={(e) => {
                  dispatch(delPlace(place.id))
                }}>Esborrar</button>
              </>
              : <></>}
          </div>
          <div className="author">Author: {place.author.name}

            <button onClick={(e) => {dispatch(setFilter({author:place.author.id,description:""}))}}>filtrar por auhtor</button>
          </div>
        </div>
      </div>
    </>




  )
}

export default PlaceGrid
