import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../userContext';
import { useNavigate } from "react-router-dom";
//import { useForm } from '../../hooks/useForm';
import { addReview } from './slices/thunks';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";

import { useSelector } from 'react-redux';
const ReviewAdd = () => {
  // let { authToken, setAuthToken,usuari, setUsuari ,reviews, setReviews,refresh,setRefresh} = useContext(UserContext);
  const dispatch = useDispatch();
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  const { reviews = [], page = 0, isLoading = true, reviewCreada = false, error = "", reviewsCount = 0 } = useSelector((state) => state.reviews);

  //  let [formulari, setFormulari] = useState({});
  const { id } = useParams();
  // let navigate = useNavigate();
  // let [error, setError] = useState("");

  // const { formState, onInputChange, OnResetForm } = useForm({

  //   review: "",

  // });
  // const { review } = formState
  // const formData = new FormData;
  // formData.append("review", review);
  const { register, handleSubmit, reset,formState: { errors } } = useForm();

  const onSubmit = dataa => dispatch(addReview(authToken, dataa, id));

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
      <form onSubmit={handleSubmit(onSubmit)}>

        <label for="review">Review</label>
        <textarea {...register("review", {
          required: "Aquest camp és obligatori",
          minLength: {

            value: 20,

            message: "La review ha de tenir al menys 20 caràcters"

          },

          maxLength: {

            value: 200,

            message: "La review pot tenir com a màxim 200 caràcters"

          },

          pattern: {

            value: /^\S+(?:\s+\S+){2,}$/,

            message:

              "Has d'escriure minim tres paraules"

          }
        })}
          // name="review" 
          //</div>value={review} onChange={onInputChange} 
          className="form-control"></textarea>

        {errors.review && <p>{errors.review.message}</p>}
        <input type="submit" className="btn btn-primary" />
        {/* <button className="btn btn-primary"
          onClick={handleSubmit(onSubmit)}
        //onClick={(e) => {dispatch(addReview(authToken, formData, id));}}
        >Add Review</button> */}
        <button className="btn btn-primary" onClick={()=>reset()}>Reset</button>

        {error ? (<div>{error}</div>) : (<></>)}

      </form>
    </div>
  )
}

export default ReviewAdd
