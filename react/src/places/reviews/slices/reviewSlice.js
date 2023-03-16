
import { createSlice } from "@reduxjs/toolkit";
const initialState = {

    reviews: [],

    isLoading: false,

    error: "",

    formulari: [],

    reviewCreada: false,


}
export const reviewSlice = createSlice({

    name: "review",

    initialState,

    reducers: {

        startLoadingReviews: (state) => {

            //console.log("ABA")

            state.isLoading = true;

        },

        setReviews: (state, action) => {

            state.reviews = action.payload

            state.isLoading = false
        },

        setreviewCreada: (state, action) => {

            state.review = action.payload

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

export const { setreviewCreada, startLoadingReviews, setReviews, setAdd, setError, setReviewsCount } = reviewSlice.actions;

export default reviewSlice.reducer
