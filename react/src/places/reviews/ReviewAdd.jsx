import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../userContext';
import { useNavigate } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import { addReview } from './slices/thunks';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
const ReviewAdd = () => {
  // let { authToken, setAuthToken,usuari, setUsuari ,reviews, setReviews,refresh,setRefresh} = useContext(UserContext);
  const dispatch = useDispatch();
  let { authToken, setAuthToken,usuari, setUsuari} = useContext(UserContext);
  const { reviews = [], page = 0, isLoading = true, reviewCreada = false, error = "", reviewsCount = 0 } = useSelector((state) => state.reviews);

  //  let [formulari, setFormulari] = useState({});
   const { id } = useParams();
  // let navigate = useNavigate();
  // let [error, setError] = useState("");

  const { formState, onInputChange,OnResetForm} = useForm({

    review: "",
    
    });
  const {review} = formState 
  const formData = new FormData;
  formData.append("review", review);
  
// const createReview = async (e) => {
//   e.preventDefault();
//   try {
//     console.log("Id del place en review add:" + id)
//     const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id + "/reviews", {
//       headers: {
//         'Accept': 'application/json',
//         'Authorization': 'Bearer ' + authToken
//       },
//       method: "POST",
//       body: formData
//     });
//     const resposta = await data.json();
//     if (resposta.success === true) {
//       console.log("reseña añadida")
//       OnResetForm()
//       setError("")
//       setRefresh(!refresh)  
//   }
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
  <div>
    <label for="review">Review</label>
    <textarea name="review" value={review} onChange={onInputChange} className="form-control"></textarea>
    
    <button className="btn btn-primary" onClick={(e) => {
      dispatch(addReview(authToken,formData,id));
    }}>Add Review</button>
    <button className="btn btn-primary" onClick={OnResetForm}>Reset</button>
   
     {error? (<div>{error}</div>):(<></>) }        

    
  </div>
)
}

export default ReviewAdd
