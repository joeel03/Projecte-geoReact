import { postisSaving, postisLoading, setPost, setpostCrear, setError, } from "./postSlice";

export const addPost = (authToken, formData, navigate) => {

    return async (dispatch, getState) => {
        dispatch(postisSaving(true))

        const headers = {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST",
            body: formData
        };

        const url = "https://backend.insjoaquimmir.cat/api/posts"

        const data = await fetch(url, headers);

        const resposta = await data.json();

        if (resposta.success == true) {
            console.log("post creado: " + resposta.data)
            dispatch(postisSaving(false))

            // dispatch(setPlaces(resposta.data));
            navigate("/posts/" + resposta.data.id)

        }

        else {
            console.log(resposta)
            dispatch(setError(resposta.message));
        }
    };
};

export const getPost = (authToken, id) => {

    return async (dispatch, getState) => {

        dispatch(postisLoading(true));

        const headers = {
            headers: {
                Accept: "application/json",

                "Content-Type": "application/json",

                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };

        const url = "https://backend.insjoaquimmir.cat/api/posts/" + id

        const data = await fetch(url, headers);
        const resposta = await data.json();

        if (resposta.success == true) {
            dispatch(postisLoading(false));
            dispatch(setPost(resposta.data));
        }
        else {
            dispatch(setError(resposta.message));
        }

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
            dispatch(setpostCrear(true));
            // usuari no l'indiquem i per defecta estarà a ""
            dispatch(getPost(0, post.id, authToken))
            const state = getState();
        }


    };
};
