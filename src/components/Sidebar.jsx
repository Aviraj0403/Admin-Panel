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
import { X } from "lucide-react";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <aside
      className={`h-full w-64 bg-white shadow-lg z-40 transition-transform duration-300
        fixed lg:static top-0 left-0
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* Header */}
      <div className="p-4 text-2xl font-bold text-orange-600 border-b flex justify-between items-center">
        🍊 Admin Panel
        {/* Show close button only on mobile */}
        <button onClick={toggleSidebar} className="lg:hidden">
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
        <NavSection title="Main">
          <NavItem to="/admin/dashboard" label="Dashboard" icon={<MdDashboard size={20} />} onClick={toggleSidebar} />
        </NavSection>

        <NavSection title="Products">
          <NavItem to="/adminProducts" label="All Products" icon={<FaBoxOpen size={20} />} onClick={toggleSidebar} />
          <NavItem to="/addProduct" label="Add Product" icon={<FaPlusSquare size={20} />} onClick={toggleSidebar} />
          <NavItem to="/categories" label="Categories" icon={<MdCategory size={20} />} onClick={toggleSidebar} />
        </NavSection>

        <NavSection title="Orders">
          <NavItem to="/orders" label="All Orders" icon={<FaClipboardList size={20} />} onClick={toggleSidebar} />
        </NavSection>

        <NavSection title="Customers">
          <NavItem to="/users" label="User List" icon={<FaUsers size={20} />} onClick={toggleSidebar} />
        </NavSection>

        <NavSection title="Promotions">
          <NavItem to="/offers" label="Offers & Deals" icon={<FaTags size={20} />} onClick={toggleSidebar} />
        </NavSection>

        <NavSection title="Reports">
          <NavItem to="/sales-report" label="Sales Report" icon={<FaChartBar size={20} />} onClick={toggleSidebar} />
          <NavItem to="/inventory-report" label="Inventory Report" icon={<FaChartBar size={20} />} onClick={toggleSidebar} />
        </NavSection>
      </div>

      {/* Footer */}
      <div className="p-4 border-t text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Orange Admin
      </div>
    </aside>
  );
}

const NavSection = ({ title, children }) => (
  <div className="mb-4">
    <h2 className="uppercase text-sm text-gray-400 px-2 mb-2">{title}</h2>
    <div className="flex flex-col">{children}</div>
  </div>
);

const NavItem = ({ to, label, icon, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `mb-1 px-4 py-2 rounded-md flex items-center gap-2 font-medium ${
        isActive
          ? "bg-orange-500 text-white shadow"
          : "text-gray-700 hover:bg-orange-100 hover:text-orange-500"
      }`
    }
  >
    {icon}
    {label}
  </NavLink>
);
