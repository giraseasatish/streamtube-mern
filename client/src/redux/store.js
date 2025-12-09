import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import videoReducer from "./videoSlice"; // 1. Import it

export const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer, // 2. Add it here
  },
});