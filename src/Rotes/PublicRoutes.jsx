import { Navigate, Outlet } from "react-router-dom";
import { checkIfLogin } from "../Common/Common";
import { ROUTES } from "../Constants/Routes";

const PublicRoute = () => {
  if (!checkIfLogin()) {
    return <Outlet />;
  } else {
    return <Navigate to={ROUTES.HOME} replace />;
  }
};

export default PublicRoute;
