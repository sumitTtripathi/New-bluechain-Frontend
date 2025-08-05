import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkIfLogin } from "../Common/Common";
import { ROUTES } from "../Constants/Routes";

function PrivateRoute() {
  return checkIfLogin() ? (
    <Outlet />
  ) : (
    <>
      <Navigate to={ROUTES.LOGIN} />
    </>
  );
}

export default PrivateRoute;
