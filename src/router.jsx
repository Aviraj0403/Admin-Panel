import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./secureRoute/ProtectedRoute";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/signin" replace />, // redirect base
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout /> {/* 👈 Layout wraps all children */}
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard", // ⛔ DO NOT use /admin/dashboard here
        element: <Dashboard />,
      },
      {
        path: "home",
        element: <HomePage/>
      }
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <p>404 Not Found</p>,
  },
]);

export default router;
