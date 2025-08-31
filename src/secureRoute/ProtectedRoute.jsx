import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.roleType)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children; // ✅ must return children
}
