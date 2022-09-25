import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../reducer/blogReducer";
import authReducer from "../reducer/userReducer";
import newsReducer from "../reducer/newsReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    news: newsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
    }),
});
