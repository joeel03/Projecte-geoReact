import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formulari: [],

  isSaving: false,

  error: "",

  isLoading: false,

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
    setpostCrear: (state, action) => {
      state.postCrear = action.payload
    },
    setError: (state, action) => {

      state.error = action.payload
    }
  }
});

export const { postisSaving,postisLoading, setPost, setpostCrear, setError } = postSlice.actions;
export default postSlice.reducer