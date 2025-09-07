import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/auth/Signin";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./secureRoute/ProtectedRoute";
import HomePage from "./pages/HomePage";
import AddFoodForm from "./pages/menu/AddFood";
import AdminFood from "./pages/menu/AdminFood";
import CategoryList from "./pages/category/CatgoryList";
import AddCategoryForm from "./pages/category/AddCategoryForm";
import EditCategory from "./pages/category/EditCategory";
import ViewCategory from "./pages/category/ViewCatgory";

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
        path:"addFood",
        element: <AddFoodForm/>
      },
      {
          path:"adminFood",
          element: < AdminFood />
      },
      {
        path: "home",
        element: <HomePage/>
      },
      {
        path: "categories",
        element : <CategoryList />
      },
      {
        path : "addCategory",
        element : <AddCategoryForm />
      },
      {
        path : "editCategory/:categoryId",
        element : <EditCategory />
      },
      {
        path : "viewCategory/:categoryId",
        element : <ViewCategory />
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
