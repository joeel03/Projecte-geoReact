import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  isLoading: false,
  add: true,
  error: "",
  commentsCount : 0
}

 export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoadingComments: (state) => {
      state.isLoading = true;
    },
    setComments: (state, action ) => {

      state.comments= action.payload
      state.isLoading=false
     
      },
      setAdd: (state,action) => 
      {
        state.add = action.payload
      },
      setError: (state,action) => {

        state.error = action.payload
      },
      setCommentsCount: (state,action) => {
        state.commentsCount = action.payload
      }
  }
});

export const { startLoadingComments,setComments,setAdd,setError,setCommentsCount } = commentSlice.actions;
export default commentSlice.reducer