import { createSlice } from "@reduxjs/toolkit";
const initialState = {

    formulari:[],

    isSaving: false,

    error: "",
    
    isLoading:false,
    
    place:{ 
        name: "",
        description: "",
        file: { filepath: "" },
        author: { name: "" },
        latitude: 0,
        longitude: 0,
        visibility:0,
    },
    
    favorite:null,

}
export const placeSlice = createSlice({

    name: "place",

    initialState,

    reducers: {

        setisSaving: (state,action) => {

            //console.log("ABA")
            // state.isLoading = true;
            state.isSaving = action.payload;
        },

        setisLoading: (state, action) => {

            state.isLoading = action.payload;
        },

        setError: (state, action) => {

            state.error = action.payload

        },

        setPlace: (state,action) => {

            state.place = action.payload

        },
        setFavorite: (state, action) => {

            state.favorite = action.payload

        }

    }

});

export const { setisSaving, setisLoading, setPlace, setError, setFavorite } = placeSlice.actions;

export default placeSlice.reducer
