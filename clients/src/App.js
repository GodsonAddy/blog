import React, { useEffect } from "react";
import "./App.css";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import LogIn from "./pages/Auth/Login";
import SignUp from "./pages/Auth/Signup";
import { CssBaseline } from "@mui/material";
import LandingPage from "./pages/Auth/LandingPage";
import ReadFullBlog from "./pages/DynamicRoute/readblog";
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
            <Route exact path="/" element={<LandingPage />} />

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
            <Route
              exact
              path="/blog/:id/:title"
              render={(props) => <ReadFullBlog {...props} />}
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
