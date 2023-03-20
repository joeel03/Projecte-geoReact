import React from "react";
import { useEffect } from "react";
import { Comment } from "./Comment";

import { useContext } from "react";
import { UserContext } from "../../userContext";

import { useState } from "react";
import { CommentAdd } from "./CommentAdd";
import { CommentsContext } from "./commentsContext";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../slices/posts/comments/thunks";
import { setCommentsCount } from "../../slices/posts/comments/commentSlice";

export const CommentsList = ({ id, comments_count }) => {

  let { usuari, email, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const dispatch = useDispatch();
  const { comments = [], page = 0, isLoading = true, add = true, error = "", commentsCount = 0 } = 
      useSelector((state) => state.comments);
  
  useEffect(() => {

    dispatch(setCommentsCount(comments_count))

    dispatch(getComments(0, id, authToken, email));

  }, []);

  // // const listComments = async () => {
  // //   const headers = {
  // //     headers: {
  // //       Accept: "application/json",
  // //       "Content-Type": "application/json",
  // //       Authorization: "Bearer " + authToken,
  // //     },
  // //     method: "GET",
  // //   };

  // //   let data = await fetch(
  // //     "https://backend.insjoaquimmir.cat/api/posts/" + id + "/comments",
  // //     headers
  // //   );
  // //   let resposta = await data.json();
  // //   console.log(resposta);

  // //   if (resposta.success == true) { console.log(resposta.data); setReviews(resposta.data); }
  // //   else {
  // //     setError(resposta.message);
  // //   }

  // //   resposta.data.map((v) => {
  // //     if (v.user.email === usuari) {
  // //       setAdd(false);
  // //       console.log("Te review");
  // //     }
  // //   });
  // // };

  // useEffect(() => {
  //   listComments();
  //   setRefresca(false);
  // }, [refresca]);

  return (
    <>
      {add ? <CommentAdd id={id} /> : <></>}
      <div class="flex mx-auto items-center justify-center  mt-6 mb-4 max-w-lg">
        {commentsCount == 0 ? (
          <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200">
            No hi ha comentaris
          </div>
        ) : (
          <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-blue-50 px-4 ring-2 ring-blue-200">
            Hi ha {commentsCount} {commentsCount > 1 ? " comentaris" : " comentari"}{" "}
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

      {comments.map((v) => {
        return <Comment key={v.id} comment={v} id = {id} />;
      })}

</>
  );
};
