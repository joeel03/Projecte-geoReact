import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../userContext';
import ReviewAdd from './ReviewAdd'
import Review from './Review'
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from "./slices/thunks";


const ReviewList = ({ id, reviews_count }) => {
  // let { authToken, setAuthToken, usuari, setUsuari,reviews, setReviews,refresh,setRefresh,reviewCreada,setReviewCreada } = useContext(UserContext);
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  // const { id } = useParams();
  // let [error, setError] = useState("");
  // let [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // const { reviews = [], page = 0, isLoading = true, add = true, error = "", reviewsCount = 0 } =

  const { reviews = [], page = 0, isLoading = true, reviewCreada=false , error = "" } =
    useSelector((state) => state.reviews);
  useEffect(() => {
    // dispatch(setReviewsCount(reviews_count))
    dispatch(getReviews(0, id, authToken, usuari));
  }, []);


  // const getReviews = async () => {
  //   try {
  //     console.log(id)
  //     const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id + "/reviews", {
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
  //       setReviews(resposta.data);
  //       console.log(resposta.data)
  //       console.log(usuari)

  //       resposta.data.map((review) => {
  //         review.user.email == usuari ?
  //         setReviewCreada(true)
  //         :
  //         setReviewCreada(false)
  //       })
  //       setLoading(false)


  //     }
  //     else setError(resposta.message);
  //   } catch (err) {
  //     console.log(err.message);
  //     alert("Catchch");
  //   };
  // }
  // useEffect(() => {
  //   getReviews();
  // }, [refresh]);

  return (
    <>
      {reviewCreada ?
        <></> :
        <ReviewAdd />}

      <div>{reviews.length > 0 ?
        <div class="card">Hay {reviews.length} review</div>
        : <div class="card">No hay reviwes</div>
      }

        {reviews.map((review) => (
          <div class="card" key={review.id}>
            {console.log(id)}
            <Review review={review} id={id} />
          </div>
        ))}
      </div>
    </>
  )
}

export default ReviewList
