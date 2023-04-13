import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formulari: [],

  page:1,
  pages:[],

  isSaving: false,
  isLoading: false,

  error: "",

  posts:[],

  post: {
    body: "",
    file: { filepath: "" },
    author: { name: "" },
    latitude: 0,
    longitude: 0,
    visibility: 0,
  },
  postCrear: true,
}

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postisSaving: (state, action) => {
      state.isSaving = action.payload;
    },
    postisLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload
    },
    setPosts: (state, action) => {
      state.posts = action.payload
    },
    setpostCrear: (state, action) => {
      state.postCrear = action.payload
    },
    setError: (state, action) => {

      state.error = action.payload
    },
    setPage: (state,action) => {
      state.page = action.payload
  
    },
    setPages: (state,action) => {
      state.pages = action.payload  
    }
  }
});

export const { postisSaving,postisLoading, setPost,setPosts, setpostCrear, setError, setPage, setPages } = postSlice.actions;
export default postSlice.reducer