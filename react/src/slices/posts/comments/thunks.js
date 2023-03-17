import { setAdd, setError, setComments, setCommentsCount, startLoadingComments } from "./commentSlice";

export const getComments = (page = 0, id, authToken, usuari="") => {
    return async (dispatch, getState) => {

        dispatch(startLoadingComments());

        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        const url = "https://backend.insjoaquimmir.cat/api/posts/" + id + "/comments"

        const data = await fetch(url,  headers  );
        const resposta = await data.json();

        if (resposta.success == true) 
        {
            dispatch(setComments(resposta.data));
        }
        else {
            dispatch (setError(resposta.message));
        }

        resposta.data.map((v) => {
            if (v.user.email === usuari) {
                dispatch (setAdd(false));
                console.log("Te comment");
            }
        });
       
};
}

export const delComment = (comment, authToken) => {
    return async (dispatch, getState) => {


        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/posts/" +
              comment.post.id +
              "/comments/" +
              comment.id,
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + authToken,
                },
                method: "DELETE",
              }
          );
          const resposta = await data.json();
    
          console.log(resposta);
          if (resposta.success == true) {
            dispatch (setAdd(true));
            // usuari no l'indiquem i per defecta estarà a ""
            dispatch (getComments(0,comment.post.id,authToken))
            const state = getState()
            dispatch (setCommentsCount(state.setCommentsCount - 1));
          }


    };
};