import React, { useState } from 'react';

const FeedbackForm = ({ drawerOpen, toggleDrawer }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your feedback!');
    setForm({ name: '', email: '', message: '' });
    toggleDrawer(); // Close modal
  };

  return (
    <>
      {/* Backdrop with blur */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={toggleDrawer}
        ></div>
      )}

      {/* Centered Form Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transform transition-opacity duration-300 ease-in-out ${
          drawerOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
<div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl mx-4 p-6 rounded-lg shadow-2xl relative max-h-[90vh] overflow-auto">

          {/* Close Button */}
          <button
            onClick={toggleDrawer}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 font-bold text-xl"
            aria-label="Close"
          >
            &times;
          </button>

          <h2 className="text-2xl font-semibold mb-4 text-center">
            Feedback Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <textarea
              name="message"
              placeholder="Your message..."
              value={form.message}
              onChange={handleChange}
              className="w-full border p-2 rounded h-32"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 border-2 rounded w-full hover:border-matte-black"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
