import React from "react";
import useAuth from "../../hooks/useRole/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <h3>Loading</h3>;
  }

  if (!user) {
    return (
      <Navigate
        state={{ from: location }}
        replace
        to={"/auth/login"}></Navigate>
    );
  }

  return children;
};

export default PrivateRoute;
