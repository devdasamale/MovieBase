import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
let store = configureStore({
  reducer: {
    movieInfo: movieReducer,
  },
});

export default store;
