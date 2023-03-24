import { setreviewCreada, startLoadingReviews, setError } from "./placeSlice"
export const addPlace = (formData   , authToken) => {
    
    return async (dispatch, getState) => {

        // dispatch(startLoadingReviews());
        const headers = {

            headers: {

                Accept: "application/json",

                Authorization: "Bearer " + authToken,

            },

            method: "POST",
            body: formData  


        };

        const url = "https://backend.insjoaquimmir.cat/api/places"

        const data = await fetch(url, headers);

        const resposta = await data.json();

        if (resposta.success == true) {
            console.log("place creado: " + resposta.data)
        
            // dispatch(setPlaces(resposta.data));
             navigate("/places/"+resposta.data.id)

        }

        else {
            console.log(resposta)
            dispatch(setError(resposta.message));

        }
    };

}
export const delPlace = (review, authToken) => {

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

            // const state = getState()

            // dispatch(setReviewsCount(state.reviewsCount - 1));

        }

    };

};

export const addReview = (authToken,formData,id) => {

    return async (dispatch, getState) => {

        const data = await fetch(

            "https://backend.insjoaquimmir.cat/api/places/" +

            id +

            "/reviews" ,

            {

                headers: {

                    Accept: "application/json",

                    Authorization: "Bearer " + authToken,

                },

                method: "POST",
                body:formData

            }

        );

        const resposta = await data.json();
            console.log(resposta)
        if (resposta.success == true) {

            console.log("OK");

            dispatch(setreviewCreada(true));

            // usuari no l'indiquem i per defecta estarà a ""

            dispatch(getReviews(0, id, authToken))

            // const state = getState()

            // dispatch(setReviewsCount(state.reviewsCount - 1));

        
    }else{
            dispatch(setError(resposta.message))
        }

    };
};