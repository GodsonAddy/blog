import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../reducer/blogReducer";
import authReducer from "../reducer/userReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
    }),
});
