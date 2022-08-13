import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function RequireAuth() {
  const { jwtToken, authUserInfo } = useSelector((state) => state.auth);

  const location = useLocation();

  const userAuth = () => {
    if (jwtToken) {
      return true;
    } else {
      return false;
    }
  };

  const authe = userAuth();

  return authe ? (
    authUserInfo && <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default RequireAuth;
