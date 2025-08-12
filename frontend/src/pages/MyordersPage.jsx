import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const MyordersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "1",
          createdAt: new Date(),
          shippingAddress: { city: 'Warangal', country: 'India' },
          orderItems: [
            {
              name: 'Product 1',
              image: 'https://picsum.photos/536/354?random=6',
            }
          ],
          totalPrice: 100,
          isPaid: true,
        },
        {
          _id: "2",
          createdAt: new Date(),
          shippingAddress: { city: 'Warangal', country: 'India' },
          orderItems: [
            {
              name: 'Product 2',
              image: 'https://picsum.photos/536/354?random=7',
            }
          ],
          totalPrice: 120,
          isPaid: false,
        },
      ];
      setOrders(mockOrders);
    }, 1000);
  }, []);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        My Orders
      </h2>

      <div className="relative overflow-x-auto rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">Image</th>
              <th className="px-6 py-4 text-left">Order ID</th>
              <th className="px-6 py-4 text-left">Created</th>
              <th className="px-6 py-4 text-left">Shipping Address</th>
              <th className="px-6 py-4 text-left">Items</th>
              <th className="px-6 py-4 text-left">Total Price</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className={`cursor-pointer transition ${
                    order.isPaid
                      ? 'hover:bg-emerald-50'
                      : 'hover:bg-red-50'
                  } ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="px-6 py-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-14 h-14 object-cover rounded-lg border"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    #{order._id}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                    <div className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">{order.orderItems.length}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    ₹{order.totalPrice}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        order.isPaid
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {order.isPaid ? (
                        <>
                          <FaCheckCircle className="text-green-600" />
                          Paid
                        </>
                      ) : (
                        <>
                          <FaTimesCircle className="text-red-600" />
                          Pending
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-500">
                  You have no orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyordersPage;
