import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  watchList: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addMovies: (state, action) => {
      state.watchList.push(action.payload);
    },
    removeMovie: (state, action) => {
      state.watchList = state.watchList.filter(
        (movie) => movie.id !== action.payload
      );
    },
    clearMovies: (state) => {
      state.watchList = [];
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { addMovies, removeMovie, clearMovies, addUser } =
  movieSlice.actions;
export default movieSlice.reducer;
