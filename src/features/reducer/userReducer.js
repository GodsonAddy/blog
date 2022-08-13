import { createSlice } from "@reduxjs/toolkit";
import {
  authRegister,
  authLogin,
  logout,
  authGooglelogin,
  ForgotPassword,
  ResetPassword,
  VerifyPassword,
  GetUser,
} from "../actions/userAction";

const jwtToken = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  jwtToken,
  loading: false,
  authSucess: false,
  authError: false,
  authMessage: "",
  authInitials: "",
  authMoniker: "",
  authUserInfo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.authError = false;
      state.authMessage = "";
      state.authSucess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        state.jwtToken = action.payload.jwtToken;
        state.loading = false;
        state.authSucess = true;
        state.authUserInfo = action.payload;
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.loading = false;
        state.authError = true;
        state.authMessage = action.payload;
      })
      .addCase(authLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.authSucess = true;
        state.authUserInfo = action.payload;

        state.jwtToken = action.payload.jwtToken;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.loading = false;

        state.authMessage = action.payload;
        state.authError = true;
        state.jwtToken = null;
      })
      .addCase(authGooglelogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(authGooglelogin.fulfilled, (state, action) => {
        state.jwtToken = action.payload.jwtToken;
        state.authUserInfo = action.payload;
        state.loading = false;
        state.authSucess = true;
      })
      .addCase(authGooglelogin.rejected, (state, action) => {
        state.loading = false;
        state.jwtToken = null;
        state.authError = true;
        state.authMessage = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.jwtToken = null;
        state.loading = false;
        state.authUserInfo = null;
      })
      .addCase(ForgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(ForgotPassword.fulfilled, (state, action) => {
        state.authMessage = action.payload;
        state.loading = false;
      })
      .addCase(ForgotPassword.rejected, (state, action) => {
        state.authMessage = action.payload;
        state.loading = false;
        state.authError = true;
      })
      .addCase(ResetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(ResetPassword.fulfilled, (state, action) => {
        state.authSucess = true;
        state.resetUser = action.payload;
        state.loading = false;
      })
      .addCase(ResetPassword.rejected, (state, action) => {
        state.authError = true;
        state.authMessage = action.payload;
        state.loading = false;
      })
      .addCase(VerifyPassword.fulfilled, (state, action) => {
        state.authMessage = action.payload;
        state.loading = false;
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.authUserInfo = action.payload;
        state.loading = false;
        state.authSucess = true;
      })
      .addCase(GetUser.rejected, (state, action) => {
        state.authMessage = action.payload;
        state.loading = false;
        state.authError = true;
        state.jwtToken = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
