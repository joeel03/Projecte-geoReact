import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../userContext';
import ReviewAdd from './ReviewAdd'
import Review from './Review'

const ReviewList = () => {
  let { authToken, setAuthToken, usuari, setUsuari,reviews, setReviews,refresh,setRefresh } = useContext(UserContext);
  const { id } = useParams();
  let [error, setError] = useState("");

  const getReviews = async () => {
    try {
      console.log(id)
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id + "/reviews", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken,
        },
        method: "GET",
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        console.log(resposta)
        setReviews(resposta.data);
       

      }
      else setError(resposta.message);
    } catch (err) {
      console.log(err.message);
      alert("Catchch");
    };
  }
  useEffect(() => {
    getReviews();
  }, [refresh]);

  return (
    <>
      <ReviewAdd />
      <div>{reviews.length>0?
       <div class="card">Hay {reviews.length} review</div>
       : <div class="card">No hay reviwes</div>
        }
       
        {reviews.map((review) => (
                <div class="card" key={review.id}>
                  {console.log(id)}
                  <Review review={review} id={id}/>
                </div>
        ))}
      </div>

    </>
  )
}

export default ReviewList
