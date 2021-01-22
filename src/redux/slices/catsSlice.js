import { createSlice } from "@reduxjs/toolkit";

export const cats = createSlice({
  name: "cats",
  initialState: {
    isLoading: false,
    redirect: false,
    error: undefined,
    images: [],
    favourites: [],
    votes: [],
    pagination_count: 0,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = undefined;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.redirect = false;
      state.isLoading = false;
    },
    setImages: (state, action) => {
      state.images = action.payload.data;
      state.pagination_count = action.payload.pagination_count;
      state.redirect = false;
      state.isLoading = false;
    },
    setFavourites: (state, action) => {
      state.favourites = action.payload;
      state.redirect = false;
      state.isLoading = false;
    },
    setVotes: (state, action) => {
      state.votes = action.payload;
      state.redirect = false;
      state.isLoading = false;
    },
    setRedirect: (state) => {
      state.redirect = true;
      state.isLoading = false;
    },
  },
});

export const {
  setLoading,
  setError,
  setImages,
  setFavourites,
  setVotes,
  setRedirect,
} = cats.actions;

const reducerName = "catsReducer";

export const selectImages = (state) => state[reducerName].images;
export const selectLoading = (state) => state[reducerName].isLoading;
export const selectError = (state) => state[reducerName].error;
export const selectRedirect = (state) => state[reducerName].redirect;
export const selectPaginationCount = (state) =>
  state[reducerName].pagination_count;

export const selectFavouriteById = (state, imageId) =>
  state[reducerName].favourites.find(
    (favourite) => favourite.image_id === imageId
  );

export const selectVotesUpById = (state, imageId) =>
  state.catsReducer.votes.filter(
    (vote) => vote.image_id === imageId && vote.value === 1
  ).length;
export const selectVotesDownById = (state, imageId) =>
  state.catsReducer.votes.filter(
    (vote) => vote.image_id === imageId && vote.value === 0
  ).length;

export default cats.reducer;
