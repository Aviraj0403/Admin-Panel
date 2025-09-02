import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBoxOpen,
  FaPlusSquare,
  FaClipboardList,
  FaUsers,
  FaTags,
  FaChartBar,
} from "react-icons/fa";
import { MdDashboard, MdCategory } from "react-icons/md";

function Sidebar({ className, toggleSidebar }) {
  return (
    <aside
      className={`${className} backdrop-blur-md text-gray-800 p-4 h-[89vh] mt-[10vh] overflow-y-scroll`}
    >
      {/* Close on mobile */}
      <div className="relative lg:hidden">
        <button
          onClick={toggleSidebar}
          className="text-red-500 hover:bg-red-500 hover:text-white rounded-md p-1"
        >
          ✕
        </button>
      </div>

      {/* Navigation */}
      <div className="px-2">
        <NavSection title="Main">
          <NavItem to="/admin/dashboard" label="Dashboard" icon={<MdDashboard size={20} />} onClick={toggleSidebar} />
        </NavSection>

        <NavSection title="Foods Management">
          <NavItem to="/admin/adminFood" label="All Foods" icon={<FaBoxOpen size={20} />} onClick={toggleSidebar} />
          <NavItem to="/admin/addFood" label="Add Food" icon={<FaPlusSquare size={20} />} onClick={toggleSidebar} />
          <NavItem to="categories" label="Categories" icon={<MdCategory size={20} />} onClick={toggleSidebar} />
        </NavSection>

        <NavSection title="Orders">
          <NavItem to="orders" label="All Orders" icon={<FaClipboardList size={20} />} onClick={toggleSidebar} />
        </NavSection>

        <NavSection title="Customers">
          <NavItem to="users" label="User List" icon={<FaUsers size={20} />} onClick={toggleSidebar} />
        </NavSection>

        <NavSection title="Promotions">
          <NavItem to="offers" label="Offers & Deals" icon={<FaTags size={20} />} onClick={toggleSidebar} />
        </NavSection>

        <NavSection title="Reports">
          <NavItem to="sales-report" label="Sales Report" icon={<FaChartBar size={20} />} onClick={toggleSidebar} />
          <NavItem to="inventory-report" label="Inventory Report" icon={<FaChartBar size={20} />} onClick={toggleSidebar} />
        </NavSection>
      </div>
    </aside>
  );
}

// Helper Components
const NavSection = ({ title, children }) => (
  <div className="mb-2">
    <h2 className="uppercase text-sm text-gray-400 px-2 mb-1">{title}</h2>
    <div className="flex flex-col">{children}</div>
  </div>
);

const NavItem = ({ to, label, icon, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `mb-1 px-4 py-2 rounded-md flex items-center gap-2 ${
        isActive
          ? "bg-gray-200 text-orange-400"
          : "hover:bg-gray-200 text-gray-700"
      }`
    }
  >
    {icon} {label}
  </NavLink>
);

export default Sidebar;
