import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAcountContext";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
//Validamos si el usuario esta registrado
  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;