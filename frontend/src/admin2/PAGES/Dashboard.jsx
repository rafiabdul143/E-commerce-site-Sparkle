import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  Loader2
} from 'lucide-react';
import { fetchAdminDashboardApi } from '../../services/api';

const Dashboard = () => {
  const [data, setData] = useState({
    stats: {
      totalUsers: 0,
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
    },
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const res = await fetchAdminDashboardApi();
        if (res.success) {
          setData({
            stats: res.stats,
            recentOrders: res.recentOrders || [],
          });
        }
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${data.stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Users',
      value: data.stats.totalUsers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Products in Catalog',
      value: data.stats.totalProducts,
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Total Orders',
      value: data.stats.totalOrders,
      icon: ShoppingCart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 gap-2">
        <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
        Loading Admin Dashboard Metrics...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Live store overview connected to PostgreSQL Database.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.title}</p>
                <p className="text-2xl font-extrabold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
        <h3 className="font-semibold text-gray-900 text-base mb-4">Recent Store Orders</h3>
        {data.recentOrders.length === 0 ? (
          <p className="text-sm text-gray-500 py-4">No recent orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-500 uppercase font-semibold">
                <tr>
                  <th className="p-3">Order Number</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50/50">
                    <td className="p-3 font-semibold text-indigo-600">{ord.orderNumber}</td>
                    <td className="p-3">{ord.user?.name || ord.shippingFirstName || 'Customer'}</td>
                    <td className="p-3 font-semibold text-gray-900">${ord.totalPrice.toFixed(2)}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-3">{new Date(ord.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;