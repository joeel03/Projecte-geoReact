import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    marks2: JSON.parse(localStorage.getItem("marks2")) || [],
    isMarked: false

}

export const postMarkSlice = createSlice({

    name: 'marks2',

    initialState,

    reducers: {

        addMark: (state, action) => {
            state.marks2.push(action.payload)
        },

        delMark: (state, action) => {

            state.marks2 = state.marks2.filter(mark => mark.id !== action.payload)

        },
        ismarked: (state, action) => {
            state.isMarked = false
            state.marks2.map((mark) => {
                if (mark.id == action.payload)
                    state.isMarked = true
                }
            )
        }
    }
});

export const { addMark, delMark, ismarked } = postMarkSlice.actions;

export const postMarkReducer = postMarkSlice.reducer 