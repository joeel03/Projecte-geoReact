import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  isLoading: false,
  addPost: true,
  error: "",
}

 export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoadingPosts: (state) => {
      state.isLoading = true;
    },
    setPosts: (state, action ) => {

      state.posts= action.payload
      state.isLoading=false
     
      },
      setaddPost: (state,action) => 
      {
        state.addPost = action.payload
      },
      setError: (state,action) => {

        state.error = action.payload
      }
  }
});

export const { startLoadingPosts,setPosts,addPost,setError} = postSlice.actions;
export default postSlice.reducer