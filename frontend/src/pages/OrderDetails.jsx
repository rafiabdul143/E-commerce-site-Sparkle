import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const mockOrderDetails = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "PayPal",
      shippingMethod: "Standard",
      shippingAddress: { City: "Warangal", Country: "India" },
      orderItems: [
        {
          productId: "1",
          name: "Jacket",
          price: 120,
          quantity: 1,
          image: "https://picsum.photos/536/354?random=455"
        },
        {
          productId: "2",
          name: "Jacket",
          price: 120,
          quantity: 1,
          image: "https://picsum.photos/536/354?random=45"
        },
        {
          productId: "3",
          name: "Jacket",
          price: 120,
          quantity: 1,
          image: "https://picsum.photos/536/354?random=55"
        }
      ]
    };
    setOrderDetails(mockOrderDetails);
  }, [id]);

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
      <h2 className='text-3xl font-bold text-gray-800 mb-6 border-b pb-2'>Order Details</h2>

      {!orderDetails ? (
        <p className="text-gray-500">No Order details found</p>
      ) : (
        <div className='bg-white rounded-lg shadow-md p-6 border'>

          {/* Order Info */}
          <div className='flex flex-col sm:flex-row justify-between mb-6'>
            <div>
              <h3 className='text-xl font-semibold text-gray-700'>Order ID: #{orderDetails._id}</h3>
              <p className='text-sm text-gray-500'>
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0 space-y-2'>
              <span className={`${orderDetails.isPaid ? "bg-green-100 text-green-700" : "bg-red-200 text-red-700"} px-3 py-1 rounded-full text-sm font-medium`}>
                {orderDetails.isPaid ? "Payment Approved" : "Payment Pending"}
              </span>
              <span className={`${orderDetails.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"} px-3 py-1 rounded-full text-sm font-medium`}>
                {orderDetails.isDelivered ? "Delivered" : "Not Yet Delivered"}
              </span>
            </div>
          </div>

          {/* Payment & Shipping Info */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
            <div>
              <h4 className='text-lg font-semibold text-gray-800 mb-2'>Payment Info</h4>
              <p className='text-sm text-gray-600'>Method: {orderDetails.paymentMethod}</p>
              <p className='text-sm text-gray-600'>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
            </div>
            <div>
              <h4 className='text-lg font-semibold text-gray-800 mb-2'>Shipping Info</h4>
              <p className='text-sm text-gray-600'>Method: {orderDetails.shippingMethod}</p>
              <p className='text-sm text-gray-600'>
                Address: {orderDetails.shippingAddress.City}, {orderDetails.shippingAddress.Country}
              </p>
            </div>
          </div>

          {/* Product List */}
          <div className='mb-6'>
            <h4 className='text-lg font-semibold mb-4 text-gray-800'>Products</h4>

            {/* Table for larger screens */}
            <div className="hidden sm:block overflow-x-auto">
              <table className='min-w-full border text-sm text-left text-gray-700'>
                <thead className='bg-gray-100'>
                  <tr>
                    <th className='py-2 px-4'>Product</th>
                    <th className='py-2 px-4'>Unit Price</th>
                    <th className='py-2 px-4'>Quantity</th>
                    <th className='py-2 px-4'>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.orderItems.map(item => (
                    <tr key={item.productId} className='border-b'>
                      <td className='py-2 px-4 flex items-center gap-3'>
                        <img src={item.image} alt={item.name} className='w-12 h-12 object-cover rounded' />
                        <Link to={`/product/${item.productId}`} className="text-blue-600 hover:underline font-medium">
                          {item.name}
                        </Link>
                      </td>
                      <td className='py-2 px-4'>₹{item.price}</td>
                      <td className='py-2 px-4'>{item.quantity}</td>
                      <td className='py-2 px-4'>₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Stacked layout for mobile */}
            <div className="space-y-4 sm:hidden">
              {orderDetails.orderItems.map(item => (
                <div key={item.productId} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center gap-4 mb-2">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <Link to={`/product/${item.productId}`} className="text-blue-600 hover:underline font-medium">
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p>Unit Price: ₹{item.price}</p>
                    <p>Total: ₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-4">
            <Link to="/my-orders" className="text-blue-600 hover:underline text-sm font-medium">
              ← Back to My Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
