import { postisSaving, postisLoading, setPost, setFilter, setPosts, setpostCrear, setError, setPage, setPages } from "./postSlice";

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
            console.log(resposta.data)
        }
        else {
            dispatch(setError(resposta.message));
        }
    };
}

export const getPosts = (authToken, page = 0) => {

    return async (dispatch, getState) => {
        dispatch(postisLoading(true));
        let url = "";
        const filter = getState().posts.filter;

        if (filter.description == "" && filter.author == "") {
            url =
                page > 0

                    ? "https://backend.insjoaquimmir.cat/api/posts?paginate=1&page=" + page

                    : "https://backend.insjoaquimmir.cat/api/posts";
            console.log("DASDASDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");

        } else if (!filter.author == "" && !filter.description == "") {
            url =

                page > 0

                    ? "https://backend.insjoaquimmir.cat/api/posts?paginate=1&page=" + page + "&description=" + filter.description + "&author=" + filter.author

                    : "https://backend.insjoaquimmir.cat/api/posts?description=" + filter.description + "&author=" + filter.author;;
        } else if (filter.author == "" && !filter.description == "") {
            url =

                page > 0

                    ? "https://backend.insjoaquimmir.cat/api/posts?paginate=1&page=" + page + "&description=" + filter.description

                    : "https://backend.insjoaquimmir.cat/api/posts?description=" + filter.description;
        } else if (!filter.author == "" && filter.description == "") {
            url =

                page > 0

                    ? "https://backend.insjoaquimmir.cat/api/posts?paginate=1&page=" + page + "&author=" + filter.author

                    : "https://backend.insjoaquimmir.cat/api/posts?description=" + filter.author;
        }

        const headers = {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        console.log(url);
        const data = await fetch(url, headers);
        const resposta = await data.json();
        if (resposta.success == true) {
            console.log(resposta.data);
            if (page > 0) {
                dispatch(postisLoading(false));
                dispatch(setPosts(resposta.data.collection));
                dispatch(setPages(resposta.data.links));
            } else {
                dispatch(setPosts(resposta.data));
                dispatch(postisLoading(false));
            }
        } else {
            dispatch(setError(resposta.message));
        }
    };
}



export const delPost = (authToken, navigate, id) => {
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
            navigate("/posts/list")
            console.log("post eliminado");
        } else {
            dispatch(setError(resposta.message));
        }
    };
};

export const editPost = (authToken, id, formulari, navigate) => {
    return async (dispatch, getState) => {
        let { body, upload, latitude, longitude, visibility = 1 } = formulari;
        const formData = new FormData();
        formData.append("body", body);
        if (upload != undefined) formData.append("upload", upload);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("visibility", visibility);
        console.log(formData)
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
        if (resposta.success == true) {
            console.log("post editado")
            navigate("/posts/" + resposta.data.id)
        } else {
            console.log(resposta.message)
            dispatch(setError(resposta.message));
        }
    };
};