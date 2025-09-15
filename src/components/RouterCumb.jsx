import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

// Optional: Friendly label map
const labelMap = {
  admin: "Admin",
  "product-details": "Product Details",
  "edit-product": "Edit Product",
  "adminProducts": "All Products",
  "order-manager": "Orders",
  dashboard: "Dashboard",
  reviews: "Reviews",
  create: "Create",
  new: "New",
};

// Detect if a segment is a dynamic ID (Mongo ID or long hash)
const isDynamicSegment = (str) =>
  str.length > 15 || /^[0-9a-f]{20,}$/i.test(str);

const RouterCumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paths = location.pathname.split("/").filter((path) => path);

  useEffect(() => {
    // Check if the route exists (this could be based on your routing structure)
    const isValidRoute = checkRouteValidity(location.pathname);
    
    // If the route is invalid, redirect to /admin/dashboard
    if (!isValidRoute) {
      const lastValidPath = sessionStorage.getItem("lastValidPath") || "/admin/dashboard"; // Default to /admin/dashboard if no valid path exists
      navigate(lastValidPath, { replace: true });
    } else {
      // Store the current path as the last valid path
      sessionStorage.setItem("lastValidPath", location.pathname);
    }
  }, [location.pathname, navigate]);

  // A helper function to check if the route exists
  const checkRouteValidity = (path) => {
    // You could implement a more sophisticated check here based on your routes.
    // For now, it simply returns true if the path matches any segment in labelMap.
    return Object.keys(labelMap).some((key) => path.includes(key));
  };

  // If the route is invalid and we need to redirect
  const isValidRoute = checkRouteValidity(location.pathname);
  if (!isValidRoute) {
    return <Navigate to="/admin/dashboard" replace />;  // Redirect to /admin/dashboard if route is invalid
  }

  if (paths.length === 0) return null;

  return (
    <div className="bg-white p-4 pb-2 flex flex-wrap items-center gap-2 shadow-md rounded-md border border-gray-200">
      <Link
        to="/"
        className="hover:underline duration-300 hover:text-blue-600 text-xl font-semibold text-gray-700"
      >
        Home
      </Link>

      {paths.map((segment, index) => {
        const fullPath = `/${paths.slice(0, index + 1).join("/")}`;
        const isLast = index === paths.length - 1;

        // Determine label: if dynamic → "View", else from labelMap or capitalized
        const label = isDynamicSegment(segment)
          ? "View"
          : labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <div className="flex items-center gap-2 text-xl font-semibold" key={index}>
            <FaChevronRight className="text-gray-400" />
            <Link
              to={fullPath}
              className={`transition-colors duration-300 ${
                isLast
                  ? "text-[#BD3B4A] font-bold"
                  : "text-gray-700 hover:text-blue-600 hover:underline"
              }`}
            >
              {label}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default RouterCumb;
