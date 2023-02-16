import React from "react";
import { useEffect } from "react";
import { Comment } from "./Comment";

import { useContext } from "react";
import { UserContext } from "../../userContext";

import { useState } from "react";
import { CommentAdd } from "./CommentAdd";
import { CommentsContext } from "./commentsContext";
// Fem servir un context únicament dins de tots els components de Reviews

export const CommentsList = ({ id, comments_count }) => {
  //let {setAdd, setRefresca, reviewsCount, setReviewsCount } = useContext(ReviewsContext)
  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);

  let [error, setError] = useState("");
  const [refresca, setRefresca] = useState(false);
  const [add, setAdd] = useState(true);
  const [commentsCount, setCommentsCount] = useState(comments_count);

  const [reviews, setReviews] = useState([]);

  // review ={v} setAdd={setAdd } setRefresca={ setRefresca}

  const listComments = async () => {
    const headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
      method: "GET",
    };

    let data = await fetch(
      "https://backend.insjoaquimmir.cat/api/posts/" + id + "/comments",
      headers
    );
    let resposta = await data.json();
    console.log(resposta);

    if (resposta.success == true) { console.log(resposta.data); setReviews(resposta.data);}
    else {
      setError(resposta.message);
    }

    resposta.data.map((v) => {
      if (v.user.email === usuari) {
        setAdd(false);
        console.log("Te review");
      }
    });
  };

  useEffect(() => {
    listComments();
    setRefresca(false);
  }, [refresca]);

  return (
    <CommentsContext.Provider
      value={{ setAdd, setRefresca, commentsCount, setCommentsCount }}
    >
      {add ? <CommentAdd id={id} /> : <></>}
      <div class="flex mx-auto items-center justify-center  mt-6 mx-8 mb-4 max-w-lg">
        {commentsCount == 0 ? (
          <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200">
            No hi ha reviews
          </div>
        ) : (
          <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-blue-50 px-4 ring-2 ring-blue-200">
            Hi ha {commentsCount} {commentsCount > 1 ? " ressenyes" : " ressenya"}{" "}
          </div>
        )}
      </div>

      {error ? (
        <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">
          {error}
        </div>
      ) : (
        <></>
      )}

      {reviews.map((v) => {
        return <Comment key={v.id} comment={v} />;
      })}
    </CommentsContext.Provider>
  );
};
