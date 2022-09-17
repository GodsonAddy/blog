import React, { useEffect } from "react";
import "./App.css";
// Use HashRouter when you deploy to Heroku/Netlify
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import LogIn from "./pages/Auth/Login";
import SignUp from "./pages/Auth/Signup";
import { CssBaseline } from "@mui/material";
import ReadFullBlog from "./pages/DynamicRoute/ReadFullBlog";
import PageNotFound from "./pages/Auth/pageNotFound";
import Dashboard from "./components/UserDashboard/Dashboard";
import Posted from "./components/UserDashboard/Post";
import Settings from "./components/UserDashboard/UserSettings";
import { DrawerContextProvider } from "./context/drawer.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPasswordChange from "./pages/Auth/ForgotPassword";
import ResetPasswordChange from "./pages/Auth/ResetPassword";
import Lists from "./components/UserDashboard/Lists";
import Trends from "./components/UserDashboard/Trends";
import Profile from "./components/UserDashboard/Profile";
import { useSelector, useDispatch } from "react-redux";
import Notifications from "./components/UserDashboard/Notifications";
import { GetUser, logout } from "../src/features/actions/userAction";
import RequireAuth from "./AuthRoute/RequireAuth";
import PublicRoute from "./AuthRoute/PublicRoute";
import { reset } from "./features/reducer/userReducer";
import BlogCategory from "./pages/DynamicRoute/BlogCategory";
import MainPage from "./components/LandingPage/MainPage";
import UserProfile from "./pages/ViewUserProfile";
import About from "./pages/About";
import News from "./pages/News";
import AllBlogs from "./pages/Blogs";
import ShowMoreUsers from "./pages/ShowMoreUsers";

function App() {
  const { jwtToken, authError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const verify = async () => {
      if (jwtToken) {
        await dispatch(GetUser());
      } else if (authError === true) {
        dispatch(logout());
        dispatch(reset());
        <Navigate to="/login" replace />;
      }
    };
    verify();
  }, [jwtToken, dispatch, authError]);
  return (
    <>
      <Router>
        <CssBaseline />
        <DrawerContextProvider>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route exact path="/user" element={<ShowMoreUsers />} />
            <Route exact path="/blog" element={<AllBlogs />} />
            <Route exact path="/news" element={<News />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/user/:id/:moniker" element={<UserProfile />} />

            <Route element={<PublicRoute />}>
              <Route exact path="/login" element={<LogIn />} />
              <Route exact path="/signup" element={<SignUp />} />
            </Route>

            <Route
              exact
              path="/forgotpassword"
              element={<ForgotPasswordChange />}
            />
            <Route
              exact
              path="/reset-password"
              element={<ResetPasswordChange />}
            />
            <Route exact path="/blog/:category" element={<BlogCategory />} />
            <Route
              exact
              path="/blog/:category/:id/:slug"
              element={<ReadFullBlog />}
            />

            <Route element={<RequireAuth />}>
              <Route
                exact
                path="/myaccount/dashboard"
                element={<Dashboard />}
              />
              <Route path="/myaccount/posts" element={<Posted />} />

              <Route exact path="/myaccount/settings" element={<Settings />} />
              <Route exact path="/myaccount/profile" element={<Profile />} />
              <Route exact path="/myaccount/trends" element={<Trends />} />
              <Route exact path="/myaccount/lists" element={<Lists />} />
              <Route
                exact
                path="/myaccount/notifications"
                element={<Notifications />}
              />
            </Route>

            <Route exact path="*" element={<PageNotFound />} />
          </Routes>
        </DrawerContextProvider>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
