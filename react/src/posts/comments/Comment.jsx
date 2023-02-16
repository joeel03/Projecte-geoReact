import React from "react";
import { useContext } from "react";
import { UserContext } from "../../userContext";
import { CommentsContext } from "./commentsContext";

import TimeAgo from "react-timeago";
import catStrings from "react-timeago/lib/language-strings/ca";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

export const Comment = ({ comment }) => {
  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  let { setAdd, setRefresca, commentsCount, setCommentsCount } =
    useContext(CommentsContext);
  const formatter = buildFormatter(catStrings);

  console.log(comment)

  const deleteComment = async (id, e) => {
    const headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
      method: "DELETE",
    };

    e.preventDefault();

    let confirma = confirm("Estas  segur?");

    if (confirma) {
      const data = await fetch(
        "https://backend.insjoaquimmir.cat/api/comments/" +
          comment.comment.id +
          "/comments/" +
          comment.id,
        headers
      );
      const resposta = await data.json();

      console.log(resposta);
      if (resposta.success == true) {
        console.log("OK");
        // provoca el refrescat del component i la reexecució de useEffect
        setRefresca(true);
        setAdd(true);
        setCommentsCount(commentsCount - 1);
      }
    }
  };

  return (
    <div class="px-10">
      <div class="bg-white max-w-xl rounded-2xl px-10 py-8  hover:shadow-2xl transition duration-500">
        <div class="mt-4">
          <h1 class="text-lg text-gray-700 font-semibold hover:underline cursor-pointer">
            Comentari de {comment.user.name}
          </h1>
          {/* <div class="flex mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div> */}
          <p class="mt-4 text-md text-gray-600">{comment.comment}</p>
          <div class="flex justify-between items-center">
            <div class="mt-4 flex items-center space-x-4 py-6">
              <div class="text-sm font-semibold">
                <span class="font-normal">
                  <TimeAgo
                    date={comment.created_at}
                    formatter={formatter}
                  ></TimeAgo>{" "}
                </span>
              </div>
            </div>
            {comment.user.email === usuari ? (
              <>
                <button
                  onClick={(e) => deleteComment(comment.id, e)}
                  type="button"
                  class="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                >
                  Esborrar
                </button>

                {/* <a href="#" className=" w-max text-cyan-600" onClick={ (e)=> deletePlace(review.id,e) }> Esborrar</a> */}
              </>
            ) : (
              <></>
            )}
            {/* <div class="p-6 bg-yellow-400 rounded-full h-4 w-4 flex items-center justify-center text-2xl text-white mt-4 shadow-lg cursor-pointer">+</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
