import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    marks: JSON.parse(localStorage.getItem("marks")) || [],
    isMarked: false

}

export const placeMarkSlice = createSlice({

    name: 'marks',

    initialState,

    reducers: {

        addMark: (state, action) => {
            state.marks.push(action.payload) // aqui podem fer push
        },

        delMark: (state, action) => {

            state.marks = state.marks.filter(mark => mark.id !== action.payload)

        },
        ismarked: (state, action) => {
            state.isMarked = false
            state.marks.map((mark) => {
                if (mark.id == action.payload.id)
                    state.isMarked = true
            }
            )


        }

    }

});

export const { addMark, delMark, isMarked } = placeMarkSlice.actions;

export const placeMarkReducer = placeMarkSlice.reducer 