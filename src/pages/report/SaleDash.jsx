import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
} from "recharts";

// Sample sales data for testing
const salesDataMonthly = [
  { month: "January", sales: 5000 },
  { month: "February", sales: 4500 },
  { month: "March", sales: 5500 },
  { month: "April", sales: 4000 },
  { month: "May", sales: 6000 },
  { month: "June", sales: 7000 },
  { month: "July", sales: 6500 },
  { month: "August", sales: 7200 },
  { month: "September", sales: 6800 },
  { month: "October", sales: 5900 },
  { month: "November", sales: 7500 },
  { month: "December", sales: 8000 },
];

const salesDataWeekly = [
  { week: "Week 1", sales: 1200 },
  { week: "Week 2", sales: 1400 },
  { week: "Week 3", sales: 1300 },
  { week: "Week 4", sales: 1500 },
];

const itemSalesData = [
  { item: "Pizza", sales: 5000 },
  { item: "Pasta", sales: 3000 },
  { item: "Burger", sales: 2000 },
  { item: "Salad", sales: 1000 },
  { item: "Soda", sales: 1500 },
];

const SalesReport = () => {
  const [view, setView] = useState("monthly"); // Default view is monthly

  const renderChart = () => {
    switch (view) {
      case "weekly":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={salesDataWeekly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#00d084">
                {salesDataWeekly.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#00d084" : "#ffd700"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      case "monthly":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={salesDataMonthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3490dc" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "itemized":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={itemSalesData}
                dataKey="sales"
                nameKey="item"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Restaurant Sales Report
      </h1>

      <div className="text-center mb-6">
        <button
          onClick={() => setView("monthly")}
          className={`${
            view === "monthly"
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-indigo-500/50 text-white"
              : "bg-gray-200 text-gray-700"
          } px-6 py-3 m-2 rounded-lg transform transition-all hover:scale-105 hover:shadow-xl focus:outline-none`}
        >
          Monthly View
        </button>
        <button
          onClick={() => setView("weekly")}
          className={`${
            view === "weekly"
              ? "bg-gradient-to-r from-green-400 to-teal-500 shadow-lg shadow-teal-500/50 text-white"
              : "bg-gray-200 text-gray-700"
          } px-6 py-3 m-2 rounded-lg transform transition-all hover:scale-105 hover:shadow-xl focus:outline-none`}
        >
          Weekly View
        </button>
        <button
          onClick={() => setView("itemized")}
          className={`${
            view === "itemized"
              ? "bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg shadow-orange-500/50 text-white"
              : "bg-gray-200 text-gray-700"
          } px-6 py-3 m-2 rounded-lg transform transition-all hover:scale-105 hover:shadow-xl focus:outline-none`}
        >
          Itemized Sales
        </button>
      </div>

      {renderChart()}

      <div className="mt-8 text-center">
        <h3 className="text-2xl font-semibold text-gray-700">Insights</h3>
        <p className="text-gray-600 mt-2">
          Explore your restaurant's sales data across different time periods or by the individual items sold.
        </p>
      </div>
    </div>
  );
};

export default SalesReport;
