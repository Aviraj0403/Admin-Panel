import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { Printer } from 'lucide-react';
import SalesChart from '../pages/report/SalesChart';
import axios from '../utils/Axios';
import useNotification from '../hooks/useNotification';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const ordersRef = useRef();

  const { notification, notify, clearNotification } = useNotification();

  const socketURL =
    import.meta.env.VITE_NODE_ENV === 'development'
      ? 'http://localhost:5005'
      : 'wss://restro-back-jgry.onrender.com';

  useEffect(() => {
    const socket = io(socketURL, { withCredentials: true });
    setSocket(socket);

    fetchOrders();

    socket.on('newOrder', (order) => {
      console.log('📦 New order received: ', order);
      setOrders((prevOrders) => [order, ...prevOrders]);
      notify(`New order received from ${order?.user?.name || 'Customer'}`);
    });

    socket.on('connect', () => {
      console.log('📡 Reconnected to the WebSocket server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/orders/reports/today');
      if (response.status === 200) {
        setOrders(response.data.orders || []);
      } else {
        console.error('Failed to fetch orders:', response.data.message);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrintOrders = () => {
    const printContent = ordersRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="font-size: 24px; margin-bottom: 20px;">Today's Orders</h2>
        ${printContent}
      </div>
    `;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 overflow-hidden relative">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
          {notification}
          <button onClick={clearNotification} className="ml-3 text-sm underline">
            x
          </button>
        </div>
      )}

      {/* Background Circles */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-40 sm:w-60 h-40 sm:h-60 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-40 sm:w-60 h-40 sm:h-60 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>

      {/* Header */}
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-gray-800 flex items-center gap-3 z-10 relative">
        🍽️ Restro 9 to 9 Admin Dashboard
      </h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 z-10 relative">
        <DashboardCard title="Total Revenue" value="₹92,800" color="orange" />
        <DashboardCard title="Today's Orders" value={orders.length} color="blue" />
        <DashboardCard title="Dishes Available" value="56" color="green" />
        <DashboardCard title="Customers Served" value="980" color="purple" />
      </div>

      {/* Today’s Orders */}
      <section className="z-10 relative">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Today’s Orders</h3>
          {orders.length > 0 && (
            <button
              onClick={handlePrintOrders}
              className="flex items-center px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              <Printer size={18} className="mr-2" />
              Print Orders
            </button>
          )}
        </div>
        {loading ? (
          <div className="text-center text-gray-500 py-10 sm:py-20">Loading orders...</div>
        ) : (
          <div ref={ordersRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="space-y-3">
                    {/* Customer & Time */}
                    <div className="flex justify-between items-start">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                        {order?.shippingAddress?.name || 'N/A'}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${
                          order.orderStatus === 'Delivered'
                            ? 'bg-green-100 text-green-600 border border-green-200'
                            : order.orderStatus === 'Cancelled'
                            ? 'bg-red-100 text-red-600 border border-red-200'
                            : 'bg-orange-100 text-orange-600 border border-orange-200'
                        }`}
                      >
                        {order.orderStatus || 'Pending'}
                      </span>
                    </div>

                    {/* Order ID & Time */}
                    <div className="text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Order ID:</span>{' '}
                        {order?._id ? order._id.slice(0, 10) + '...' : 'N/A'}
                      </p>
                      <p>
                        <span className="font-medium">Time:</span>{' '}
                        {order?.placedAt ? new Date(order.placedAt).toLocaleString() : 'N/A'}
                      </p>
                    </div>

                    {/* Payment Method & Status */}
                    <div className="text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Payment Method:</span> {order?.paymentMethod || 'N/A'}
                      </p>
                      <p>
                        <span className="font-medium">Payment Status:</span>{' '}
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${
                            order.paymentStatus === 'Paid'
                              ? 'bg-green-100 text-green-600 border border-green-200'
                              : 'bg-red-100 text-red-600 border border-red-200'
                          }`}
                        >
                          {order.paymentStatus || 'N/A'}
                        </span>
                      </p>
                    </div>

                    {/* Items */}
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 mb-1">Dishes:</h5>
                      <ul className="list-disc list-inside max-h-20 sm:max-h-24 overflow-auto text-xs sm:text-sm text-gray-600">
                        {order?.items?.length > 0 ? (
                          order.items.map((item, i) => (
                            <li key={i}>
                              {item?.selectedVariant?.name || item?.food?.name || 'Unknown'} - {item?.quantity || 0} × ₹
                              {item?.selectedVariant?.price || item?.food?.price || 0}
                            </li>
                          ))
                        ) : (
                          <li>N/A</li>
                        )}
                      </ul>
                    </div>

                    {/* Total */}
                    <p className="text-base sm:text-lg font-bold text-gray-900">
                      Total: ₹{order?.totalAmount?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-600">
                <p className="text-sm sm:text-base font-medium">No orders yet.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Sales Chart */}
      <section className="z-10 relative mt-8 sm:mt-12">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-800">Sales Trends</h3>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <SalesChart />
        </div>
      </section>
    </div>
  );
}

const DashboardCard = ({ title, value, color }) => {
  const colorMap = {
    green: 'bg-green-100 text-green-600 border-green-200',
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    orange: 'bg-orange-100 text-orange-600 border-orange-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200',
  };

  const circleColorMap = {
    green: 'bg-green-100',
    blue: 'bg-blue-100',
    orange: 'bg-orange-100',
    purple: 'bg-purple-100',
  };

  return (
    <div className="relative bg-white rounded-lg p-4 sm:p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div
        className={`absolute -top-8 -right-8 w-20 sm:w-24 h-20 sm:h-24 ${circleColorMap[color]} rounded-full mix-blend-multiply filter blur-2xl opacity-30`}
      ></div>
      <h3 className="text-sm sm:text-lg font-semibold text-gray-700">{title}</h3>
      <p className={`text-2xl sm:text-3xl font-bold mt-3 sm:mt-4 ${colorMap[color]}`}>{value}</p>
    </div>
  );
};