import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/FirebaseAuthContext";

const PrivateRoutes = ({ children }) => {
  const user = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(user);


  useEffect(() => {


    return () => {
      setCurrentUser({ ...currentUser, user });
    }
  }, [currentUser, user])


  let location = useLocation();
  console.log("RouteProtection::user online status ->", user);
  if (!user.online) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;



};

export default PrivateRoutes;
