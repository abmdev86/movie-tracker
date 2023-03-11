import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/FirebaseAuthContext";

const PrivateRoutes = ({ children }) => {
  const user = useContext(UserContext);
  let location = useLocation();
  if (!user.online) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children;
};

export default PrivateRoutes;
