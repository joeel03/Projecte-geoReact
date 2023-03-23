import { addPost, setError, setPosts, startLoadingPosts } from "./postSlice";

export const getPosts = (id, authToken, usuari = "") => {
    return async (dispatch, getState) => {

        dispatch(startLoadingPosts());

        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        const url = "https://backend.insjoaquimmir.cat/api/posts/" + id + "/posts"

        const data = await fetch(url, headers);
        const resposta = await data.json();

        if (resposta.success == true) {
            dispatch(setPosts(resposta.data));
        }
        else {
            dispatch(setError(resposta.message));
        }

        resposta.data.map((v) => {
            if (v.user.email === usuari) {
                dispatch(addPost(false));
                console.log("Te post");
            }
        });

    };
}

export const delPost = (post, authToken) => {
    return async (dispatch, getState) => {


        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/posts/" + id,
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
            dispatch(addPost(true));
            // usuari no l'indiquem i per defecta estarà a ""
            dispatch(getPosts(0, post.id, authToken))
            const state = getState();
        }


    };
};

export const addPost = (authToken, formData, id) => {

    return async (dispatch, getState) => {

        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/posts/" + id,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "POST",
                body: formData
            }
        );

        const resposta = await data.json();
        console.log(resposta)
        if (resposta.success == true) {
            console.log("OK");
            dispatch(addPost(true));  error: "",

            dispatch(getPosts(0, id, authToken))
        } else {
            dispatch(setError(resposta.message))
        }

    };
};