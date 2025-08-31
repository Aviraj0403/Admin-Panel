import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
