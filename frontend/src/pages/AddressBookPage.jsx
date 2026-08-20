import React, { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, CheckCircle } from 'lucide-react';

const AddressBookPage = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      name: 'Home Address',
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Fashion Street, Suite 400',
      city: 'New York',
      postalCode: '10001',
      country: 'United States',
      phone: '+1 (555) 234-5678',
      isDefault: true,
    },
    {
      id: 'addr-2',
      name: 'Office Address',
      firstName: 'John',
      lastName: 'Doe',
      address: '456 Business Plaza, 12th Floor',
      city: 'Los Angeles',
      postalCode: '90012',
      country: 'United States',
      phone: '+1 (555) 987-6543',
      isDefault: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    phone: '',
  });

  const setDefault = (id) => {
    setAddresses(prev =>
      prev.map(addr => ({ ...addr, isDefault: addr.id === id }))
    );
  };

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    const newAddr = {
      id: `addr-${Date.now()}`,
      ...formData,
      isDefault: addresses.length === 0,
    };
    setAddresses(prev => [...prev, newAddr]);
    setShowForm(false);
    setFormData({
      name: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'United States',
      phone: '',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <MapPin className="h-7 w-7 text-indigo-600" />
            Address Book
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage saved shipping addresses for fast 1-click checkout.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-medium text-xs hover:bg-indigo-700 transition shadow-sm"
        >
          <Plus className="h-4 w-4" /> Add New Address
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddAddress} className="mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4 animate-in fade-in duration-300">
          <h3 className="font-bold text-gray-900 text-base">New Address Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Address Label (e.g. Home, Work)"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="p-3 border rounded-xl text-xs"
            />
            <input
              type="text"
              placeholder="First Name"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="p-3 border rounded-xl text-xs"
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="p-3 border rounded-xl text-xs"
            />
            <input
              type="text"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="p-3 border rounded-xl text-xs"
            />
          </div>
          <input
            type="text"
            placeholder="Street Address"
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full p-3 border rounded-xl text-xs"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="p-3 border rounded-xl text-xs"
            />
            <input
              type="text"
              placeholder="Postal Code"
              required
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              className="p-3 border rounded-xl text-xs"
            />
            <input
              type="text"
              placeholder="Country"
              required
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="p-3 border rounded-xl text-xs"
            />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-xs font-semibold hover:bg-indigo-700 transition"
            >
              Save Address
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-6 rounded-2xl border transition relative ${
              addr.isDefault
                ? 'bg-indigo-50/40 border-indigo-200 shadow-sm'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            {addr.isDefault && (
              <span className="absolute top-4 right-4 flex items-center gap-1 text-[11px] font-bold bg-indigo-600 text-white px-3 py-1 rounded-full">
                <CheckCircle className="h-3 w-3" /> Default Shipping
              </span>
            )}
            <h3 className="font-bold text-gray-900 text-base">{addr.name}</h3>
            <p className="text-xs text-gray-600 mt-2 font-medium">
              {addr.firstName} {addr.lastName}
            </p>
            <p className="text-xs text-gray-500 mt-1">{addr.address}</p>
            <p className="text-xs text-gray-500">{addr.city}, {addr.postalCode}, {addr.country}</p>
            <p className="text-xs text-gray-500 mt-1">📞 {addr.phone}</p>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              {!addr.isDefault && (
                <button
                  onClick={() => setDefault(addr.id)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Set as Default
                </button>
              )}
              <div className="flex gap-3 ml-auto">
                <button
                  onClick={() => deleteAddress(addr.id)}
                  className="text-xs text-gray-400 hover:text-rose-600 flex items-center gap-1"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressBookPage;
