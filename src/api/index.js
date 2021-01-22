import axios from "axios";
import {
  setLoading,
  setError,
  setImages,
  setFavourites,
  setVotes,
  setRedirect,
} from "../redux/slices/catsSlice";

const IMAGES_ENDPOINT = process.env.REACT_APP_CAT_APP_IMAGES_ENDPOINT;
const UPLOAD_ENDPOINT = process.env.REACT_APP_CAT_APP_UPLOAD_ENDPOINT;
const FAVOURITES_ENDPOINT = process.env.REACT_APP_CAT_APP_FAVOURITES_ENDPOINT;
const VOTES_ENDPOINT = process.env.REACT_APP_CAT_APP_VOTES_ENDPOINT;

const config = {
  headers: {
    "x-api-key": process.env.REACT_APP_CAT_APP_KEY,
  },
};

export const getImages = (page, limit, orderBy) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.get(
      `${IMAGES_ENDPOINT}?page=${page}&limit=${limit}&order=${orderBy}`,
      config
    );
    const pagination_count = await response.headers["pagination-count"];
    const data = {
      data: await response.data,
      pagination_count,
    };
    dispatch(setImages(data));
    dispatch(getFavourites());
    dispatch(getVotes());
  } catch (err) {
    dispatch(setError(err.response.data.message));
  }
};

const getFavourites = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.get(FAVOURITES_ENDPOINT, config);
    dispatch(setFavourites(await response.data));
  } catch (err) {
    dispatch(setError(err.response.data.message));
  }
};

const getVotes = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.get(VOTES_ENDPOINT, config);
    dispatch(setVotes(await response.data));
  } catch (err) {
    dispatch(setError(err.response.data.message));
  }
};

export const saveFavourite = (selectedImage) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    await axios.post(FAVOURITES_ENDPOINT, { image_id: selectedImage }, config);
    dispatch(getFavourites());
  } catch (err) {
    dispatch(setError(err.response.data.message));
  }
};

export const deleteFavourite = (selectedImage) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    await axios.delete(`${FAVOURITES_ENDPOINT}/${selectedImage}`, config);
    dispatch(getFavourites());
  } catch (err) {
    dispatch(setError(err.response.data.message));
  }
};

export const toggleVote = (selectedImage, value) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    await axios.post(
      VOTES_ENDPOINT,
      { image_id: selectedImage, value },
      config
    );
    dispatch(getVotes());
  } catch (err) {
    dispatch(setError(err.response.data.message));
  }
};

export const uploadImage = (selectedImage) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const formData = new FormData();
    formData.append("file", selectedImage);
    config.headers["content-type"] = "multipart/form-data";
    await axios.post(UPLOAD_ENDPOINT, formData, config);
    dispatch(setRedirect(true));
  } catch (err) {
    dispatch(setError(err.response.data.message));
  }
};
