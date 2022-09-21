import { createSlice } from "@reduxjs/toolkit";
import {
  commentMyBlog,
  createBlog,
  deleteMyBlog,
  favoriteMyBlog,
  getAllBlogs,
  getASingleBlog,
  GetAtLeast3Blogs,
  GetAtLeast6Blogs,
  getBlogByCategory,
  getMyBlogs,
  ReadNews,
  updateMyBlog,
} from "../actions/blogAction";
import { format } from "date-fns";

const initialState = {
  loader: false,
  blogSuccess: false,
  blogError: false,
  blogMessage: "",
  blogContents: [],
  favorites: [],
  allBlogs: [],
  aSingleBlog: [],
  blogCategory: [],
  createdAt: "",
  numberOfPages: "",
  currentPage: "",
  deleteBlog: [],
  getnews: [],
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    resetBlog: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.loader = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loader = false;
        state.blogSuccess = true;
        state.blogContents.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loader = false;
        state.blogError = true;
        state.blogMessage = action.payload;
      })
      .addCase(getMyBlogs.pending, (state) => {
        state.loader = true;
      })
      .addCase(getMyBlogs.fulfilled, (state, action) => {
        state.blogContents = action.payload;
        state.loader = false;
        state.blogSuccess = true;
      })
      .addCase(getMyBlogs.rejected, (state, action) => {
        state.loader = false;
        state.blogError = true;
        state.blogMessage = action.payload;
      })
      .addCase(deleteMyBlog.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteMyBlog.fulfilled, (state, action) => {
        state.loader = false;
        state.blogSuccess = true;
        state.blogContents = state.blogContents.filter(
          (userblog) => userblog._id !== action.payload.id
        );
      })
      .addCase(deleteMyBlog.rejected, (state, action) => {
        state.blogError = true;
        state.blogMessage = action.payload;
        state.loader = false;
      })
      .addCase(getAllBlogs.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.blogCategory = action.payload.allpost;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
        state.loader = false;
        state.blogSuccess = true;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loader = false;
        state.blogError = true;
        state.blogMessage = action.payload;
      })
      .addCase(getASingleBlog.pending, (state) => {
        state.loader = true;
      })
      .addCase(getASingleBlog.fulfilled, (state, action) => {
        state.aSingleBlog = action.payload;
        state.loader = false;
        state.blogSuccess = true;
        state.createdAt = format(
          new Date(action.payload.createdAt),
          "dd-MMM-yyyy"
        );
      })
      .addCase(getASingleBlog.rejected, (state, action) => {
        state.loader = false;
        state.blogError = true;
        state.blogMessage = action.payload;
      })
      .addCase(getBlogByCategory.pending, (state) => {
        state.loader = true;
      })
      .addCase(getBlogByCategory.fulfilled, (state, action) => {
        state.blogCategory = action.payload.allpost;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
        state.loader = false;
        state.blogSuccess = true;
      })
      .addCase(getBlogByCategory.rejected, (state, action) => {
        state.loader = false;
        state.blogError = true;
        state.blogMessage = action.payload;
      })
      .addCase(GetAtLeast3Blogs.pending, (state) => {
        state.loader = true;
      })
      .addCase(GetAtLeast3Blogs.fulfilled, (state, action) => {
        state.allBlogs = action.payload;
        state.loader = false;
        state.blogSuccess = true;
      })
      .addCase(GetAtLeast3Blogs.rejected, (state, action) => {
        state.loader = false;
        state.blogError = true;
        state.blogMessage = action.payload;
      })
      .addCase(GetAtLeast6Blogs.pending, (state) => {
        state.loader = true;
      })
      .addCase(GetAtLeast6Blogs.fulfilled, (state, action) => {
        state.allBlogs = action.payload;
        state.loader = false;
        state.blogSuccess = true;
      })
      .addCase(GetAtLeast6Blogs.rejected, (state, action) => {
        state.loader = false;
        state.blogError = true;
        state.blogMessage = action.payload;
      })
      .addCase(favoriteMyBlog.pending, (state) => {
        state.loader = true;
      })
      .addCase(favoriteMyBlog.fulfilled, (state, action) => {
        state.loader = false;
        state.blogSuccess = true;
        state.favorites.map((like) =>
          like._id === action.payload._id ? action.payload : like
        );
      })
      .addCase(favoriteMyBlog.rejected, (state, action) => {
        state.blogError = true;
        state.loader = false;
        state.blogMessage = action.payload;
      })
      .addCase(updateMyBlog.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateMyBlog.fulfilled, (state, action) => {
        state.allBlogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        );
        state.loader = false;
        state.blogSuccess = true;
      })
      .addCase(commentMyBlog.pending, (state, action) => {
        state.loader = false;
        state.blogError = true;
        state.blogMessage = action.payload;
      })
      .addCase(commentMyBlog.fulfilled, (state, action) => {
        // state.aSingleBlog.map((blogs) => {
        //   if (blogs._id === action.payload._id) {
        //     return action.payload;
        //   }
        //   return blogs;
        // });
        state.aSingleBlog.comments.push(action.payload);
        state.loader = false;
        state.blogSuccess = true;
      })
      .addCase(commentMyBlog.rejected, (state, action) => {
        state.blogMessage = action.payload;
        state.loader = false;
        state.blogError = true;
      })
      .addCase(ReadNews.pending, (state) => {
        state.loader = true;
      })
      .addCase(ReadNews.fulfilled, (state, action) => {
        state.getnews = action.payload.allnews.articles;
        // state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
        console.log("total", state.numberOfPages);
        state.loader = false;
        state.blogSuccess = true;
      })
      .addCase(ReadNews.rejected, (state, action) => {
        state.loader = false;
        state.blogError = true;
        state.blogMessage = action.payload;
      });
  },
});

export const { resetBlog } = blogSlice.actions;
export default blogSlice.reducer;
