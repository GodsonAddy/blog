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
  GetAUserProfile,
  GetAtLeastThreeUsers,
  GetAllUsers,
  SearchAllUsers,
  FollowUserProfile,
} from "../actions/userAction";

const jwtToken = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  jwtToken,
  loading: false,
  authSuccess: false,
  authError: false,
  authMessage: "",
  authUserInfo: null,
  atleastthreeusers: [],
  auserprofile: {},
  auserpost: [],
  allusers: [],
  numberOfPages: "",
  currentPage: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.authError = false;
      state.authMessage = "";
      state.authSuccess = false;
      state.atleastthreeusers = [];
      state.auserprofile = {};
      state.auserpost = [];
      state.allusers = [];
      state.numberOfPages = "";
      state.currentPage = "";
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
        state.authSuccess = true;
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
        state.authSuccess = true;
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
        state.authSuccess = true;
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
        state.authSuccess = true;
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
        state.authSuccess = true;
      })
      .addCase(GetUser.rejected, (state, action) => {
        state.authMessage = action.payload;
        state.loading = false;
        state.authError = true;
        state.jwtToken = null;
      })
      .addCase(GetAtLeastThreeUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(GetAtLeastThreeUsers.fulfilled, (state, action) => {
        state.atleastthreeusers = action.payload;
        state.loading = false;
      })
      .addCase(GetAtLeastThreeUsers.rejected, (state, action) => {
        state.authMessage = action.payload;
        state.loading = false;
      })
      .addCase(GetAUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAUserProfile.fulfilled, (state, action) => {
        state.auserpost = action.payload.allusers.blogposts;
        state.auserprofile = action.payload.allusers;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
        state.loading = false;
      })
      .addCase(GetAUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.authError = true;
        state.authMessage = action.payload;
      })
      .addCase(GetAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllUsers.fulfilled, (state, action) => {
        state.allusers = action.payload.allusers;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
        state.loading = false;
      })
      .addCase(GetAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.authError = true;
        state.authMessage = action.payload;
      })
      .addCase(SearchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchAllUsers.fulfilled, (state, action) => {
        // state.search.allnames = action.payload.name;
        // state.search.allmoniker = action.payload.moniker;
        // state.search.blogtitle = action.payload.blogposts.title;
        // state.search.blogcategory = action.payload.blogposts.category;
        state.allusers = action.payload;
        state.loading = false;
      })
      .addCase(SearchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.authError = true;
        state.authMessage = action.payload;
      })
      .addCase(FollowUserProfile.pending, (state) => {
        state.loader = true;
      })
      .addCase(FollowUserProfile.fulfilled, (state, action) => {
        state.allusers.map((like) =>
          like._id === action.payload._id ? action.payload : like
        );
        state.loader = false;
        state.blogSuccess = true;
      })
      .addCase(FollowUserProfile.rejected, (state, action) => {
        state.loader = false;
        state.blogError = true;
        state.blogMessage = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
