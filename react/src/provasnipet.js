import { createSlice } from '@reduxjs/toolkit'

export const templateSlice = createSlice({
 name: 'template',
 initialState: { 
 value: 0, 
 }, 
 reducers: {
 increment: (state) => {
 state.value += 1
},
 },
})

// Action creators are generated for each case reducer function
export const { increment } = templateSlice.actions

export const templateReducer = templateSlice.reducer