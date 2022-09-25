import { createSlice } from "@reduxjs/toolkit";
import { GetAllNews } from "../actions/newsAction";

const initialState = {
  currentPage: "",
  numberOfPages: "",
  loader: false,
  newsSuccess: false,
  newsError: false,
  newsMessage: "",
  newsContents: [],
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    resetNews: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllNews.pending, (state) => {
        state.loader = true;
      })
      .addCase(GetAllNews.fulfilled, (state, action) => {
        state.loader = false;
        state.newsSuccess = true;
        state.newsContents = action.payload.news;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
      })
      .addCase(GetAllNews.rejected, (state, action) => {
        state.loader = false;
        state.newsError = true;
        state.newsMessage = action.payload;
      });
  },
});

export const { resetNews } = newsSlice.actions;
export default newsSlice.reducer;
