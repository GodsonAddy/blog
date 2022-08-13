import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute() {
  const { jwtToken, authUserInfo } = useSelector((state) => state.auth);

  const location = useLocation();

  const userAuth = () => {
    if (jwtToken && authUserInfo) {
      return true;
    } else {
      return false;
    }
  };

  const authe = userAuth();

  return authe ? (
    <Navigate to="/" replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
}

export default PublicRoute;
