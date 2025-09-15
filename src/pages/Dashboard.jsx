import React, { useState } from "react";
import SalesChart from "../pages/report/SalesChart";  // Import the SalesChart component

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 overflow-auto relative">
      {/* Decorative background circles */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>

      {/* Header */}
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 flex items-center gap-3 z-10 relative">
        🍽️ Restro 9 to 9 Admin Dashboard
      </h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 z-10 relative">
        <DashboardCard title="Total Revenue" value="₹92,800" color="green" />
        <DashboardCard title="Today's Orders" value="312" color="blue" />
        <DashboardCard title="Dishes Available" value="56" color="orange" />
        <DashboardCard title="Customers Served" value="980" color="purple" />
      </div>

      {/* Today's Orders Summary */}
      <section className="z-10 relative">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">Today’s Orders</h3>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transform transition hover:scale-105"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-800">Ramesh Kumar</h4>
                <span className="text-sm text-gray-500">Aug 31, 2025 1:15 PM</span>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                Order ID: <span className="font-mono">restro09abc...</span>
              </p>

              <p className="text-sm mb-3">
                Payment Method: <span className="font-medium">UPI</span>
              </p>

              <div className="mb-3">
                <h5 className="text-sm font-semibold mb-1">Dishes:</h5>
                <ul className="list-disc list-inside max-h-24 overflow-auto text-sm text-gray-700">
                  <li>Paneer Butter Masala - 1 × ₹220</li>
                  <li>Butter Naan - 4 × ₹40</li>
                  <li>Masala Chaach - 2 × ₹30</li>
                </ul>
              </div>

              <p className="font-bold text-lg mb-2 text-gray-900">Total: ₹440.00</p>

              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                Paid / Preparing
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Sales Chart Section (imported) */}
      <section className="z-10 relative mb-12">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">Sales Trends</h3>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transform transition hover:scale-105">
          <SalesChart />
        </div>
      </section>
    </div>
  );
}

const DashboardCard = ({ title, value, color }) => {
  const colorMap = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
  };

  const circleColorMap = {
    green: "bg-green-100",
    blue: "bg-blue-100",
    orange: "bg-orange-100",
    purple: "bg-purple-100",
  };

  return (
    <div className="relative bg-white rounded-2xl p-6 shadow-lg overflow-hidden transform transition hover:scale-105">
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 ${circleColorMap[color]} rounded-full mix-blend-multiply filter blur-2xl`}></div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className={`text-3xl font-bold mt-4 ${colorMap[color]}`}>{value}</p>
    </div>
  );
};
