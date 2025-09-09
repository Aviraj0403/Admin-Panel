import React, { useEffect, useState } from "react";
import {
  getAllCustomers,
  getAllAdmins,
  getAllDeliveryBoys,
  getAllUsers,
  getUserDetails,
} from "../../services/authApi";
import { FaUserCircle, FaGoogle } from "react-icons/fa";

const TotalUserOnWeb = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("customer");

  // Fetch users by role
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        let data;
        if (role === "customer") {
          data = await getAllCustomers(1, 12);
        } else if (role === "admin") {
          data = await getAllAdmins(1, 12);
        } else if (role === "deliveryBoy") {
          data = await getAllDeliveryBoys(1, 12);
        } else if (role === "regular") {
          data = await getAllUsers(1, 12);
        }
        setUsers(data.data || []);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [role]);

  const handleUserClick = async (userId) => {
    setLoading(true);
    try {
      const data = await getUserDetails(userId);
      setSelectedUser(data.data);
    } catch (err) {
      setError("Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-2xl border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center drop-shadow-md">
        👥 Users Management
      </h2>

      {/* Role Filter */}
      <div className="mb-8 flex justify-center">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border px-5 py-3 rounded-xl text-lg font-medium shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-400"
        >
          <option value="customer">Customers</option>
          <option value="admin">Admins</option>
          <option value="deliveryBoy">Delivery Boys</option>
          <option value="regular">Regular Users</option>
        </select>
      </div>

      {/* Errors */}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {users.map((user) => (
          <div
            key={user._id}
            className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-105 cursor-pointer border border-gray-100"
            onClick={() => handleUserClick(user._id)}
          >
            <div className="flex items-center space-x-4">
              <FaUserCircle className="text-gray-500 text-6xl drop-shadow-sm" />
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800 flex items-center">
                  {user.userName}
                  {user.firebaseUid && (
                    <FaGoogle
                      className="ml-2 text-blue-500"
                      title="Google Account"
                    />
                  )}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <span
                  className={`mt-2 inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    user.isVerified
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {user.isVerified ? "Verified ✅" : "Not Verified ❌"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Details Panel */}
      {selectedUser && (
        <div className="mt-12 p-8 bg-white border-2 border-gray-200 rounded-2xl shadow-xl max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            👤 User Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <p className="font-semibold">Full Name:</p>
              <p>{selectedUser.userName}</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>{selectedUser.email}</p>
            </div>
            <div>
              <p className="font-semibold">Phone:</p>
              <p>{selectedUser.phoneNumber || "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold">Role:</p>
              <p>{selectedUser.roleType}</p>
            </div>
            <div>
              <p className="font-semibold">Verified:</p>
              <p>{selectedUser.isVerified ? "Yes ✅" : "No ❌"}</p>
            </div>
            {selectedUser.firebaseId && (
              <div>
                <p className="font-semibold">Login Type:</p>
                <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                  <FaGoogle className="mr-2" /> Google Account
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalUserOnWeb;
