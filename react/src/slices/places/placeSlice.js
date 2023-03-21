import { createSlice } from "@reduxjs/toolkit";
const initialState = {

    formulari:[],

    isSaving: true,

    error: "",


}
export const placeSlice = createSlice({

    name: "place",

    initialState,

    reducers: {

        startLoadingReviews: (state) => {

            //console.log("ABA")

            // state.isLoading = true;
            state.isSaving = true;

        },

        setFormulari: (state, action) => {

            state.formulari = action.payload

            // state.isLoading = false
        },

        setreviewCreada: (state, action) => {

            state.reviewCreada = action.payload

        },

        setError: (state, action) => {

            state.error = action.payload

        },

        // setFormulari: (state,action) => {

        // state.formulari = action.payload

        // },
        setReviewsCount: (state, action) => {

            state.reviewsCount = action.payload

        }

    }

});

export const { setreviewCreada, startLoadingReviews, setReviews, setAdd, setError, setReviewsCount } = placeSlice.actions;

export default placeSlice.reducer
