import React from "react";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const isAuthenticated = localStorage.getItem("user") !== null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default RequireAuth;
