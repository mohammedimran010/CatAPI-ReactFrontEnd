import { configureStore } from "@reduxjs/toolkit";
import catsReducer from "./slices/catsSlice";

export default configureStore({
  reducer: {
    catsReducer,
  },
});
