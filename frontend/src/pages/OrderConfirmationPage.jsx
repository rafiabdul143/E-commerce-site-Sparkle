import React from 'react';

const checkout = {
  _id: "12",
  createdAt: new Date(),
  checkoutItems: [
    {
      productId: "1",
      name: "Jacket",
      color: "Black",
      size: "M",
      price: 1500,
      quantity: 1,
      image: "https://picsum.photos/536/354?random=7"
    },
    {
      productId: "2",
      name: "Jacket",
      color: "Black",
      size: "M",
      price: 1500,
      quantity: 1,
      image: "https://picsum.photos/536/354?random=8"
    },
    {
      productId: "3",
      name: "Jacket",
      color: "Black",
      size: "M",
      price: 1500,
      quantity: 1,
      image: "https://picsum.photos/536/354?random=9"
    }
  ],
  shippingAddress: {
    fullName: "M.A Rafi",
    phone: "+91 99590 88937",
    address: "123 Fashion Street",
    city: "Warangal",
    country: "India",
  }
};

// Delivery Estimate Function
const getDeliveryEstimate = (orderDate, daysToAdd = 6) => {
  const estimatedDate = new Date(orderDate);
  estimatedDate.setDate(estimatedDate.getDate() + daysToAdd);
  return estimatedDate.toLocaleDateString();
};

const OrderConfirmationPage = () => {
  const deliveryDate = getDeliveryEstimate(checkout.createdAt);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You for Your Order!
      </h1>

      {checkout && (
        <div className="p-6 rounded-xl border border-gray-300 shadow-sm bg-gray-50">
          {/* Order Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Order ID: <span className="text-gray-700">{checkout._id}</span>
              </h2>
              <p className="text-sm text-gray-500">
                Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
              <p className="text-md text-red-700 font-medium mt-1">
                Estimated Delivery: <span className="text-black">{deliveryDate}</span>
              </p>
            </div>

            <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-md text-sm font-medium border border-emerald-200">
              Payment Received ✅
            </div>
          </div>

          <p className="text-gray-700 text-base leading-relaxed mb-6">
            A confirmation email has been sent to your registered email address.
            If you have any questions, please contact our support team.
          </p>

          {/* Delivery Details */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Delivery Details</h3>
            <div className="text-gray-700 space-y-1 text-sm leading-relaxed">
              <p><span className="font-medium">Name:</span> {checkout.shippingAddress.fullName}</p>
              <p><span className="font-medium">Phone:</span> {checkout.shippingAddress.phone}</p>
              <p>
                <span className="font-medium">Address:</span> {checkout.shippingAddress.address}, {checkout.shippingAddress.city}, {checkout.shippingAddress.country}
              </p>
            </div>
          </div>

          {/* Ordered Products */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Items Ordered</h3>
            <ul className="divide-y divide-gray-200">
              {checkout.checkoutItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center py-4">
                  {/* Left: Image + Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded border"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">{item.name}</span>
                      <span className="text-sm text-gray-500">
                        Size: {item.size} | Color: {item.color}
                      </span>
                      <span className="text-sm text-gray-500">Quantity: {item.quantity}</span>
                    </div>
                  </div>

                  {/* Right: Price */}
                  <div className="text-right text-gray-800 font-medium min-w-[80px]">
                    ₹{item.price}
                  </div>
                </li>
              ))}
            </ul>

            {/* Total Paid */}
            <div className="mt-6 border-t pt-4">
              <h4 className="text-lg font-semibold text-gray-800 flex justify-between items-center">
                <span className="text-emerald-600">Total Amount Paid</span>
                <span className="text-xl font-bold text-gray-900">
                  ₹{checkout.checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                </span>
              </h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
