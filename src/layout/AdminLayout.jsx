import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Header, Footer, RouterCumb, ProgressBar, Sidebar } from "../components";
import { useWindowContext } from "../context/windowContext";

const AdminLayout = () => {
  const { divRef, progressWidth } = useWindowContext();

  const [openSidebar, setOpenSidebar] = useState(false);
  const toggleSidebar = () => setOpenSidebar((prev) => !prev);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-50">
      <ToastContainer />

      {/* Overlay */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Layout */}
      <div className="flex h-full">
        {/* Sidebar */}
        <Sidebar isOpen={openSidebar} toggleSidebar={toggleSidebar} />

        {/* Main layout */}
        <div
          className={`flex flex-col flex-1 h-full bg-orange-100/30 transition-all duration-300 ${
            openSidebar ? "ml-64" : "ml-0"
          }`}
        >
          {/* Header */}
          <Header openSidebar={openSidebar} toggleSidebar={toggleSidebar} />

          {/* Breadcrumbs & Progress */}
          <div className="px-4 pt-4 mt-16"> {/* mt-16 to push below fixed header */}
            <ProgressBar progressWidth={progressWidth} />
            <RouterCumb />
          </div>

          {/* Content */}
          <main
            ref={divRef || null}
            className="flex-1 overflow-y-auto p-4"
          >
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
