import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Get all users
export const GetAllUsers = createAsyncThunk(
  "auth/getallusers",

  async (page, thunkAPI) => {
    try {
      const res = await axios.get(`/api/auth/users?page=${page}`);

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

// Get at least 3 users
export const GetAtLeastThreeUsers = createAsyncThunk(
  "auth/getatleastthreeusers",

  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/auth/users/limit/3");

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

export const GetUser = createAsyncThunk(
  "auth/getuser",

  async (arg, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();

      const config = {
        headers: {
          Authorization: `${auth.jwtToken}`,
        },
      };
      const { data } = await axios.get("/api/auth/users/credential", config);

      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);

// Get all users
export const SearchAllUsers = createAsyncThunk(
  "auth/searchallusers",

  async (query, thunkAPI) => {
    try {
      const res = await axios.get(`/api/auth/users/search?q=${query}`);

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

const forgotpassword = async (userData) => {
  const res = await axios.post("/api/auth/users/forgotpassword", userData);

  if (res.data) {
    localStorage.setItem("token", JSON.stringify(res.data));
  }

  return res.data;
};

const verifyresetpassword = async (params) => {
  const { id, token } = params;
  const res = await axios.get(
    `/api/auth/users/reset-password?id=${id}&token=${token}`
  );

  if (res.data) {
    localStorage.setItem("token", JSON.stringify(res.data));
  }

  return res.data;
};

const resetpassword = async (userData) => {
  let id = userData.id;
  let token = userData.token;
  let password = userData.password;
  const URL = `/api/auth/users/reset-password?id=${id}&token=${token}`;
  const res = await axios.post(URL, { password });
  //console.log("data", res.data);
  if (res.data) {
    localStorage.setItem("token", JSON.stringify(res.data));
  }

  return res.data;
};

export const authRegister = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/auth/users/register",
        user,
        config
      );
      localStorage.setItem("token", data.jwtToken);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authLogin = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/auth/users/login", user, config);

      localStorage.setItem("token", data.jwtToken);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authGooglelogin = createAsyncThunk(
  "auth/googlelogin",
  async (user, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/auth/users/googlelogin",
        user,
        config
      );

      localStorage.setItem("token", data.jwtToken);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ForgotPassword = createAsyncThunk(
  "auth/forgotpassword",
  async (user, thunkAPI) => {
    try {
      return await forgotpassword(user);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ResetPassword = createAsyncThunk(
  "auth/resetpassword",
  async (user, thunkAPI) => {
    try {
      return await resetpassword(user);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const VerifyPassword = createAsyncThunk(
  "auth/verifypassword",
  async (user, thunkAPI) => {
    try {
      return await verifyresetpassword(user);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await localStorage.removeItem("token");
});

// View user's profile

export const GetAUserProfile = createAsyncThunk(
  "auth/getauserprofile",
  async (params, thunkAPI) => {
    let id = params.id;
    let moniker = params.moniker;
    let page = params.page;

    try {
      const res = await axios.get(
        `/api/auth/users/${id}/${moniker}?page=${page}`
      );
      //console.log("data", res.data);
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

// Follow User
const followUser = async (id, jwtToken) => {
  const config = {
    headers: {
      Authorization: `${jwtToken}`,
    },
  };

  const res = await axios.patch(`/api/auth/users/followuser/${id}`, config);

  return res.data;
};

export const FollowUserProfile = createAsyncThunk(
  "auth/followuser",
  async (id, thunkAPI) => {
    try {
      const jwtToken = thunkAPI.getState().auth.jwtToken;
      return await followUser(id, jwtToken);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
