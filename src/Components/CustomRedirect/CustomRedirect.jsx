import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const CustomRedirect = ({ path, redirectUrl }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (path.includes(location.pathname)) {
      navigate(redirectUrl);
    }
  }, [location, navigate, path, redirectUrl]);
};
export default CustomRedirect;
