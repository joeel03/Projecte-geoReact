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
    setPosts: (state, action) => {
      state.post = action.payload
    },
    setpostCrear: (state, action) => {
      state.postCrear = action.payload
    },
    setpostError: (state, action) => {

      state.error = action.payload
    }
  }
});

export const { postisSaving,postisLoading, setPosts, setpostCrear, setpostError } = postSlice.actions;
export default postSlice.reducer