import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../userContext';
import ReactTimeAgo from 'react-time-ago'
import { useDispatch } from 'react-redux';
import { delReview } from './slices/thunks';

const Review = ({ review }) => {
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  const { reviews = [], page = 0, isLoading = true, reviewCreada = false, error = "", reviewsCount = 0 } =

    useSelector((state) => state.reviews);

  const dispatch = useDispatch();
  // let { authToken, setAuthToken,usuari, setUsuari ,reviewCreada,setReviewCreada,reviews, setReviews} = useContext(UserContext);
  // let [error, setError] = useState("");

  // const deleteReview = async (idreview) => {
  //   try {
  //     const data = await fetch(("https://backend.insjoaquimmir.cat/api/places/"+id+"/reviews/"+idreview), {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Authorization': 'Bearer ' + authToken
  //       },
  //       method: "DELETE",
  //     });
  //     const resposta = await data.json();
  //     if (resposta.success === true) {
  //       console.log("review eliminado")
  //       setReviewCreada(false)
  //       let filtered = reviews.filter( e =>  {
  //         return e.id !== review.id
  //       });
  //       console.log(filtered)
  //       setReviews(filtered)
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
      <table class="table">
        <tbody>
          <tr>
            <td class="bold">Review de {review.user.name}</td>
          </tr>
          <tr>
            <td>{review.review}</td>
          </tr>
          <tr>
            <td><ReactTimeAgo date={review.created_at} locale="es" /></td>
            {usuari == review.user.email ?
              <button onClick={(e) => { delReview(review,authToken) }}>🗑️</button>
              : <></>}
          </tr>
        </tbody>
      </table>


    </>
  )
}

export default Review
