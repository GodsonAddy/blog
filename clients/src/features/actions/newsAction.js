import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetAllNews = createAsyncThunk(
  "news/getallnews",
  async (page, thunkAPI) => {
    try {
      const res = await axios.get(`/api/auth/news?page=${page}`);

      return res.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
