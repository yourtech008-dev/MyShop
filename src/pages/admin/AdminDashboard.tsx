import React, { useEffect, useState } from 'react';
import { formatPrice } from '../../lib/utils';
import { ShoppingBag, DollarSign, Package, AlertTriangle, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalOrders: number;
  totalSales: number;
  totalProducts: number;
  lowStock: number;
  recentOrders: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(setStats);
  }, []);

  if (!stats) return <div className="p-8 text-center">Loading dashboard...</div>;

  const cards = [
    { label: 'Total Sales', value: formatPrice(stats.totalSales), icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
    { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-purple-100 text-purple-600' },
    { label: 'Low Stock Alerts', value: stats.lowStock, icon: AlertTriangle, color: 'bg-red-100 text-red-600' },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${card.color}`}>
              <card.icon size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" /> Recent Orders
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
              <tr>
                <th className="p-4 font-semibold">Order ID</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-mono text-sm text-gray-600">#{order.id}</td>
                  <td className="p-4 font-medium text-gray-900">{order.customer_name}</td>
                  <td className="p-4 font-bold text-gray-900">{formatPrice(order.total_amount)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
