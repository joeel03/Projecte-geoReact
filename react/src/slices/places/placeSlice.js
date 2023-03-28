import { createSlice } from "@reduxjs/toolkit";
const initialState = {

    formulari:[],

    isSaving: false,

    error: "",
    
    isLoading:false,

    places:[],

    place:{ 
        name: "",
        description: "",
        file: { filepath: "" },
        author: { name: "" },
        latitude: 0,
        longitude: 0,
        visibility:0,
    },
    
    favorite:true,

    page: 1,

    pages: [], 
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
        setPlaces: (state,action) => {

            state.places = action.payload

        },
        setFavorite: (state, action) => {

            state.favorite = action.payload

        },

        setPage: (state,action) => {
        
            state.page = action.payload
        
        },
        setPages: (state,action) => {

            state.pages = action.payload
            
        }

    }

});

export const { setisSaving, setisLoading, setPlace, setError, setFavorite,setPlaces,setPages } = placeSlice.actions;

export default placeSlice.reducer
