import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  MoreHorizontal
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Users',
      value: '2,345',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Products Sold',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Orders',
      value: '891',
      change: '-2.4%',
      trend: 'down',
      icon: ShoppingCart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentOrders = [
    { id: '#12345', customer: 'John Doe', amount: '$129.99', status: 'Completed', date: '2 hours ago' },
    { id: '#12346', customer: 'Jane Smith', amount: '$89.50', status: 'Processing', date: '4 hours ago' },
    { id: '#12347', customer: 'Bob Johnson', amount: '$299.99', status: 'Shipped', date: '6 hours ago' },
    { id: '#12348', customer: 'Alice Brown', amount: '$159.99', status: 'Pending', date: '8 hours ago' },
    { id: '#12349', customer: 'Charlie Wilson', amount: '$79.99', status: 'Completed', date: '1 day ago' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">Last 30 days</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="flex items-center space-x-1">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Placeholder */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Chart visualization would go here</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900">{order.id}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{order.amount}</p>
                  <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;