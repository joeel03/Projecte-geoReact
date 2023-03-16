import { setreviewCreada, startLoadingReviews, setReviews, setError } from "./reviewSlice"
export const getReviews = (page = 0, id, authToken, usuari = "") => {

    return async (dispatch, getState) => {

        dispatch(startLoadingReviews());

        const headers = {

            headers: {

                Accept: "application/json",

                "Content-Type": "application/json",

                Authorization: "Bearer " + authToken,

            },

            method: "GET",

        };

        const url = "https://backend.insjoaquimmir.cat/api/places/" + id + "/reviews"

        const data = await fetch(url, headers);

        const resposta = await data.json();

        if (resposta.success == true) {

            dispatch(setReviews(resposta.data));

        }

        else {

            dispatch(setError(resposta.message));

        }

        resposta.data.map((v) => {

            if (v.user.email === usuari) {

                dispatch(setreviewCreada(true));

                console.log("Te review");

            }

        });

    };

}
export const delReview = (review, authToken) => {

    return async (dispatch, getState) => {

        const data = await fetch(

            "https://backend.insjoaquimmir.cat/api/places/" +

            review.place.id +

            "/reviews/" +

            review.id,

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

        if (resposta.success == true) {

            console.log("OK");

            dispatch(setreviewCreada(false));

            // usuari no l'indiquem i per defecta estarà a ""

            dispatch(getReviews(0, review.place.id, authToken))

            const state = getState()

            dispatch(setReviewsCount(state.reviewsCount - 1));

        }

    };

};