import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // --- Authentication Actions ---
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    
    // --- User Interaction Actions ---
    
    // Toggle Subscription: Adds/Removes channelId from subscribedUsers array
    subscription: (state, action) => {
      const channelId = action.payload;
      if (state.currentUser.subscribedUsers.includes(channelId)) {
        // Unsubscribe
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex(
            (channel) => channel === channelId
          ),
          1
        );
      } else {
        // Subscribe
        state.currentUser.subscribedUsers.push(channelId);
      }
    },

    // Handle Like: Adds videoId to likedVideos, removes from dislikedVideos
    like: (state, action) => {
        const videoId = action.payload;
        // If not already liked
        if (!state.currentUser.likedVideos.includes(videoId)) {
            state.currentUser.likedVideos.push(videoId);
            // Remove from dislikes if present
            state.currentUser.dislikedVideos.splice(
                state.currentUser.dislikedVideos.findIndex(
                    (vId) => vId === videoId
                ), 1
            );
        } else {
            // Toggle off like
            state.currentUser.likedVideos.splice(
                state.currentUser.likedVideos.findIndex(
                    (vId) => vId === videoId
                ), 1
            );
        }
    },

    // Handle Dislike: Adds videoId to dislikedVideos, removes from likedVideos
    dislike: (state, action) => {
        const videoId = action.payload;
        // If not already disliked
        if (!state.currentUser.dislikedVideos.includes(videoId)) {
            state.currentUser.dislikedVideos.push(videoId);
            // Remove from likes if present
            state.currentUser.likedVideos.splice(
                state.currentUser.likedVideos.findIndex(
                    (vId) => vId === videoId
                ), 1
            );
        } else {
            // Toggle off dislike
            state.currentUser.dislikedVideos.splice(
                state.currentUser.dislikedVideos.findIndex(
                    (vId) => vId === videoId
                ), 1
            );
        }
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription, like, dislike } = userSlice.actions;

export default userSlice.reducer;