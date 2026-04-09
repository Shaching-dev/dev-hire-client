import React from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import { Navigate, useLocation } from "react-router";
import FirebaseLoading from "../../utils/FirebaseLoading/FirebaseLoading";

const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useAuth();
  const location = useLocation();

  // console.log("in the private route ", location);

  if (authLoading) {
    return <FirebaseLoading />;
  }

  if (!user) {
    return (
      <Navigate
        state={{ from: location.pathname }}
        replace
        to={"/auth/login"}></Navigate>
    );
  }

  return children;
};

export default PrivateRoute;
