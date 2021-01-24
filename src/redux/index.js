import { configureStore } from "@reduxjs/toolkit";
import cats from "./slices/catsSlice";

export default configureStore({
  reducer: {
    cats,
  },
});
