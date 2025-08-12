
import { useNavigate } from 'react-router-dom';
import Paypalbutton from './Paypalbutton';
import React, { useState, useEffect } from 'react';


const cart = {
  products: [
    { _id: "1", name: "Stylish Jacket", price: 1500, image: { url: "https://picsum.photos/536/354?random=1", altText: "Stylish Jacket" } },
    { _id: "2", name: "Elegant Coat", price: 1800, image: { url: "https://picsum.photos/536/354?random=2", altText: "Elegant Coat" } },
  ],
  totalPrice: 4500,
};

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const shippingCharge = 10;


  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: ""
  });

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toLowerCase() === 'save10') {
      setDiscount(cart.totalPrice * 0.1);
      setCouponApplied(true);
    } else {
      setDiscount(0);
      setCouponApplied(false);
      alert('Invalid coupon code');
    }
  };
  useEffect(() => {
  if (submitted) {
    const timer = setTimeout(() => {
      setSubmitted(false);
    }, 5000); // Hide after 5 seconds

    return () => clearTimeout(timer); // Cleanup if unmounted
  }
}, [submitted]);


  const handleCreateCheckout = (e) => {
    e.preventDefault();
    const isValid = Object.values(shippingAddress).every((val) => val.trim() !== '');
    if (!isValid) {
      alert("Please fill in all required fields.");
      return;
    }

    setCheckoutId(143); // Simulate backend ID
    setSubmitted(true);
  };

  const handlePaymentSuccess = () => {
    console.log("Payment Successful");
    navigate("/order-confirmation");
  };




  return (
    <div className="max-w-6xl mx-auto  grid grid-cols-1 lg:grid-cols-2 p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 tracking-tight">
      {/* Left - Shipping Form */}
      <div className="order-1 lg:order-1">
        <div className="bg-white shadow-md rounded-xl p-8 border border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Checkout</h2>
{submitted && (
  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm transition-opacity duration-500 ease-in-out">
    Shipping details submitted successfully!
  </div>
)}


          <form onSubmit={handleCreateCheckout} className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Shipping Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ['First Name', 'firstName'],
                  ['Last Name', 'lastName'],
                  ['Address', 'address', true],
                  ['City', 'city'],
                  ['Postal Code', 'postalCode'],
                  ['Country', 'country'],
                  ['Phone Number', 'phone']
                ].map(([label, field, full]) => (
                  <div key={field} className={full ? 'md:col-span-2' : ''}>
                    <label className="block mb-1 text-gray-600">{label}</label>
                    <input
                      type={field === 'postalCode' || field === 'phone' ? 'tel' : 'text'}
                      value={shippingAddress[field]}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, [field]: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-gray-800 hover:bg-black text-white py-3 rounded font-semibold transition"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right - Order Summary */}
      <div className="order-2 lg:order-2">
        <div className="bg-gray-50 rounded-xl shadow-inner p-8 border border-gray-200 max-h-[600px] overflow-y-auto">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h3>
          <ul className="divide-y divide-gray-300 mb-6">
            {cart.products.map((item) => (
             <ul className="divide-y divide-gray-300 mb-6">
  {cart.products.map((item) => (
    <li key={item._id} className="flex flex-col gap-2 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={item.image.url}
            alt={item.image.altText || item.name}
            className="w-14 h-14 object-cover rounded-md border"
          />
          <div>
            <p className="font-medium text-gray-700">{item.name}</p>
            <p className="text-sm text-gray-500">Size: {item.size}</p>
            <p className="text-sm text-gray-500">Color: {item.color}</p>
          </div>
        </div>
        <span className="text-gray-800 font-semibold">₹{item.price}</span>
      </div>
    </li>
  ))}
</ul>

            ))}
          </ul>

          {/* Coupon */}
          <div className="mb-4">
            <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
              Have a coupon?
            </label>
            <div className="flex items-center gap-2">
              <input
                id="coupon"
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Enter coupon code"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
              >
                Apply
              </button>
            </div>
            {couponApplied && (
              <p className="text-green-600 text-sm mt-1">
                Coupon applied! You saved ${discount.toFixed(2)}
              </p>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 border-t pt-4 text-gray-900 text-sm font-medium">
  <div className="flex justify-between">
    <span>Subtotal</span>
    <span>₹{cart.totalPrice.toFixed(2)}</span>
  </div>
  <div className="flex justify-between text-green-700">
    <span>Discount</span>
    <span>- ₹{discount.toFixed(2)}</span>
  </div>
  <div className="flex justify-between text-blue-700">
    <span>Shipping</span>
    <span>₹{shippingCharge.toFixed(2)}</span>
  </div>
  <div className="flex justify-between text-lg font-semibold border-t pt-2">
    <span>Total</span>
    <span>
      ₹{(cart.totalPrice - discount + shippingCharge).toFixed(2)}
    </span>
  </div>
</div>

        </div>

        <div className="mt-6 text-center text-sm text-gray-600 bg-blue-50 p-4 rounded-md border border-blue-200">
          Please ensure all shipping details are entered accurately to avoid any delays and to ensure a smooth and timely delivery.
        </div>
        <button
  onClick={handlePaymentSuccess}
  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm"
>
  🔧 Dev: Skip Payment & Confirm Order
</button>


        {/* PayPal Button */}
        {checkoutId && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Pay with PayPal</h3>
            <Paypalbutton
              amount={(cart.totalPrice - discount).toFixed(2)}
              onSuccess={handlePaymentSuccess}
              onError={() => alert("Payment Failed, Try Again.")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
