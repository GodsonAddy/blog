import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const registerURL = "http://localhost:5000/api/auth/users/register";
const loginURL = "http://localhost:5000/api/auth/users/login";
const googleURL = "http://localhost:5000/api/auth/users/googlelogin";
const forgotpasswordURL = "http://localhost:5000/api/auth/users/forgotpassword";
const getUserURL = "http://localhost:5000/api/auth/users/credential";

export const GetUser = createAsyncThunk(
  "auth/getuser",

  async (arg, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      console.log("token", auth.jwtToken);

      const config = {
        headers: {
          Authorization: `${auth.jwtToken}`,
        },
      };
      const { data } = await axios.get(getUserURL, config);
      console.log("data", data);
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

const forgotpassword = async (userData) => {
  const res = await axios.post(forgotpasswordURL, userData);

  if (res.data) {
    localStorage.setItem("token", JSON.stringify(res.data));
  }

  return res.data;
};

const verifyresetpassword = async (params) => {
  const { id, token } = params;
  const res = await axios.get(
    `http://localhost:5000/api/auth/users/reset-password?id=${id}&token=${token}`
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
  const URL = `http://localhost:5000/api/auth/users/reset-password?id=${id}&token=${token}`;
  const res = await axios.post(URL, { password });
  console.log("data", res.data);
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
      const { data } = await axios.post(registerURL, user, config);
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
      const { data } = await axios.post(loginURL, user, config);

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
      const { data } = await axios.post(googleURL, user, config);

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
