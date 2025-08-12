import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  DollarSign
} from 'lucide-react';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const orders = [
    {
      id: '#12345',
      customer: 'John Doe',
      email: 'john@example.com',
      items: 3,
      total: '$299.99',
      status: 'Delivered',
      date: '2024-01-15',
      shippingAddress: '123 Main St, New York, NY 10001',
      paymentMethod: 'Credit Card'
    },
    {
      id: '#12346',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      items: 1,
      total: '$89.50',
      status: 'Processing',
      date: '2024-01-16',
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
      paymentMethod: 'PayPal'
    },
    {
      id: '#12347',
      customer: 'Bob Johnson',
      email: 'bob@example.com',
      items: 2,
      total: '$159.99',
      status: 'Shipped',
      date: '2024-01-17',
      shippingAddress: '789 Pine Rd, Chicago, IL 60601',
      paymentMethod: 'Credit Card'
    },
    {
      id: '#12348',
      customer: 'Alice Brown',
      email: 'alice@example.com',
      items: 4,
      total: '$449.99',
      status: 'Pending',
      date: '2024-01-18',
      shippingAddress: '321 Elm St, Miami, FL 33101',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: '#12349',
      customer: 'Charlie Wilson',
      email: 'charlie@example.com',
      items: 1,
      total: '$79.99',
      status: 'Cancelled',
      date: '2024-01-19',
      shippingAddress: '654 Maple Dr, Seattle, WA 98101',
      paymentMethod: 'Credit Card'
    }
  ];

  const statuses = ['all', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      case 'Shipped': return <Truck className="w-4 h-4" />;
      case 'Processing': return <Package className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">Track and manage customer orders</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">Last 30 days</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+15%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">1,234</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm text-yellow-600 font-medium">+8%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-600">Pending</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-blue-600 font-medium">+12%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-600">Shipped</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">89</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-green-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+20%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-600">Revenue</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">$45,231</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status}
                </option>
              ))}
            </select>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.items} items</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.total}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.paymentMethod}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;