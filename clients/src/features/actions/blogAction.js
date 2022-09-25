import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

//Blog section
// Get all blogs

export const getAllBlogs = createAsyncThunk(
  "blog/getallpost",
  async (page, thunkAPI) => {
    try {
      const res = await axios.get(`/api/auth/blog?page=${page}`);

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
// Get at least 3 blogs

export const GetAtLeast3Blogs = createAsyncThunk(
  "blog/getatleast3post",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/auth/blog/limit/3");
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

// Get at least 3 blogs

export const GetAtLeast6Blogs = createAsyncThunk(
  "blog/getatleast6post",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/auth/blog/limit/6");
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

// Get blog by category

export const getBlogByCategory = createAsyncThunk(
  "blog/getpostbycategory",
  async (params, thunkAPI) => {
    let category = params.category;
    let page = params.page;

    try {
      const res = await axios.get(`/api/auth/blog/${category}?page=${page}`);

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

// Get a single blog

export const getASingleBlog = createAsyncThunk(
  "blog/getasinglepost",
  async (params, thunkAPI) => {
    let category = params.category;
    let id = params.id;
    let slug = params.slug;

    try {
      const res = await axios.get(`/api/auth/blog/${category}/${id}/${slug}`);

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

// Create user blog
const create = async (blogData, jwtToken) => {
  const config = {
    headers: {
      Authorization: `${jwtToken}`,
    },
  };

  const res = await axios.post("/api/auth/blog/myposts", blogData, config);

  return res.data;
};

export const createBlog = createAsyncThunk(
  "blog/post",
  async (blogData, thunkAPI) => {
    try {
      const jwtToken = thunkAPI.getState().auth.jwtToken;

      return await create(blogData, jwtToken);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const getBlogs = async (jwtToken) => {
  const config = {
    headers: {
      Authorization: `${jwtToken}`,
    },
  };

  const res = await axios.get("/api/auth/blog/myposts", config);

  return res.data;
};

export const getMyBlogs = createAsyncThunk(
  "blog/getmypost",
  async (_, thunkAPI) => {
    try {
      const jwtToken = thunkAPI.getState().auth.jwtToken;
      //console.log("jwt", jwtToken);
      return await getBlogs(jwtToken);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user's blog post
const updateBlog = async (update, jwtToken) => {
  let id = update.id;
  let content = update.content;
  const config = {
    headers: {
      Authorization: `${jwtToken}`,
    },
  };

  const res = await axios.put(`/api/auth/blog/update/${id}`, content, config);

  return res.data;
};

export const updateMyBlog = createAsyncThunk(
  "blog/updatepost",
  async (update, thunkAPI) => {
    try {
      const jwtToken = thunkAPI.getState().auth.jwtToken;
      return await updateBlog(update, jwtToken);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Favorite user's blog post
const favoriteBlog = async (id, jwtToken) => {
  const config = {
    headers: {
      Authorization: `${jwtToken}`,
    },
  };

  const res = await axios.patch(`/api/auth/blog/favorites/${id}`, config);

  return res.data;
};

export const favoriteMyBlog = createAsyncThunk(
  "blog/favoritepost",
  async (id, thunkAPI) => {
    try {
      const jwtToken = thunkAPI.getState().auth.jwtToken;
      return await favoriteBlog(id, jwtToken);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user's blog post
const deleteBlog = async (id, jwtToken) => {
  const config = {
    headers: {
      Authorization: `${jwtToken}`,
    },
  };

  const res = await axios.delete(`/api/auth/blog/delete/${id}`, config);

  return res.data;
};

export const deleteMyBlog = createAsyncThunk(
  "blog/deletepost",
  async (id, thunkAPI) => {
    try {
      const jwtToken = thunkAPI.getState().auth.jwtToken;
      return await deleteBlog(id, jwtToken);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Comment section
// Comment user's blog post
const commentBlog = async (comment, jwtToken) => {
  let id = comment.id;
  let content = comment.content;
  const config = {
    headers: {
      Authorization: `${jwtToken}`,
    },
  };

  const res = await axios.post(`/api/auth/blog/comment/${id}`, content, config);

  return res.data;
};

export const commentMyBlog = createAsyncThunk(
  "blog/commentpost",
  async (comment, thunkAPI) => {
    try {
      const jwtToken = thunkAPI.getState().auth.jwtToken;
      return await commentBlog(comment, jwtToken);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get blog post comments

export const getAllComments = createAsyncThunk(
  "blog/getcommentpost",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/api/auth/blog/comment/${id}`);
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

// Update user's comment
const updateComment = async (update, jwtToken) => {
  let id = update.id;
  let content = update.content;
  const config = {
    headers: {
      Authorization: `${jwtToken}`,
    },
  };

  const res = await axios.put(
    `/api/auth/blog/comment/update/${id}`,
    content,
    config
  );

  return res.data;
};

export const updateMyComment = createAsyncThunk(
  "blog/updatecomment",
  async (update, thunkAPI) => {
    try {
      const jwtToken = thunkAPI.getState().auth.jwtToken;
      return await updateComment(update, jwtToken);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Favorite user's comment
const favoriteComment = async (id, jwtToken) => {
  const config = {
    headers: {
      Authorization: `${jwtToken}`,
    },
  };

  const res = await axios.put(`/api/auth/blog/comment/favorites/${id}`, config);

  return res.data;
};

export const favoriteMyComment = createAsyncThunk(
  "blog/favoritecomment",
  async (id, thunkAPI) => {
    try {
      const jwtToken = thunkAPI.getState().auth.jwtToken;
      return await favoriteComment(id, jwtToken);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user's comment
const deleteComment = async (id, jwtToken) => {
  const config = {
    headers: {
      Authorization: `${jwtToken}`,
    },
  };

  const res = await axios.delete(`/api/auth/blog/comment/delete/${id}`, config);

  return res.data;
};

export const deleteMyComment = createAsyncThunk(
  "blog/deletecomment",
  async (id, thunkAPI) => {
    try {
      const jwtToken = thunkAPI.getState().auth.jwtToken;
      return await deleteComment(id, jwtToken);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
