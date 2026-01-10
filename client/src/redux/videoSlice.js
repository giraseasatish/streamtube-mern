import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Useful for incrementing view count or updating likes on the video object directly
    like: (state, action) => {
        const userId = action.payload;
        if(!state.currentVideo.likes.includes(userId)){
            state.currentVideo.likes.push(userId);
            state.currentVideo.dislikes.splice(
                state.currentVideo.dislikes.findIndex(
                    (id) => id === userId
                ), 1
            );
        }
    },
    dislike: (state, action) => {
        const userId = action.payload;
        if(!state.currentVideo.dislikes.includes(userId)){
            state.currentVideo.dislikes.push(userId);
            state.currentVideo.likes.splice(
                state.currentVideo.likes.findIndex(
                    (id) => id === userId
                ), 1
            );
        }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } = videoSlice.actions;

export default videoSlice.reducer;