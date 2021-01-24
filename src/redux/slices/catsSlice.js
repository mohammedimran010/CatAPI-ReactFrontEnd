import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isLoading: false,
  redirect: false,
  error: undefined,
  images: [],
  favourites: [],
  votes: [],
  pagination_count: 0,
};

export const cats = createSlice({
  name: "cats",
  initialState,
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
    setRedirect: (state, action) => {
      state.redirect = action.payload;
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

export default cats.reducer;

export const selectImages = (state) => state.cats.images;
export const selectLoading = (state) => state.cats.isLoading;
export const selectError = (state) => state.cats.error;
export const selectRedirect = (state) => state.cats.redirect;
export const selectPaginationCount = (state) => state.cats.pagination_count;

export const selectFavouriteById = (state, imageId) =>
  state.cats.favourites.find((favourite) => favourite.image_id === imageId);

export const selectVotesUpById = (state, imageId) =>
  state.cats.votes.filter(
    (vote) => vote.image_id === imageId && vote.value === 1
  ).length;
export const selectVotesDownById = (state, imageId) =>
  state.cats.votes.filter(
    (vote) => vote.image_id === imageId && vote.value === 0
  ).length;
