import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducer/userReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
    }),
});
