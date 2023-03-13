import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children, isLoggedIn }) => {
  let location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
