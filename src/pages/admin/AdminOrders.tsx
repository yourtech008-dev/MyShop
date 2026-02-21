import React, { useEffect, useState } from 'react';
import { Order } from '../../types';
import { formatPrice } from '../../lib/utils';
import { ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = () => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setFilteredOrders(data);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let result = orders;

    if (statusFilter !== 'all') {
      result = result.filter(o => o.status === statusFilter);
    }

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(o => 
        o.customer_name.toLowerCase().includes(lowerTerm) || 
        o.id.toString().includes(lowerTerm)
      );
    }

    setFilteredOrders(result);
  }, [statusFilter, searchTerm, orders]);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Orders</h2>
        <p className="text-gray-500">Manage customer orders and status</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or order ID..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {['all', 'pending', 'shipped', 'delivered', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition ${
                statusFilter === status 
                  ? 'bg-primary text-white shadow-md shadow-blue-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">Order ID</th>
                <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">Customer</th>
                <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">Total</th>
                <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">Status</th>
                <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">Date</th>
                <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr 
                    className={`hover:bg-gray-50 cursor-pointer transition ${expandedOrder === order.id ? 'bg-blue-50/50' : ''}`} 
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <td className="p-4 font-mono text-sm text-gray-600">#{order.id}</td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{order.customer_name}</div>
                      <div className="text-xs text-gray-500">{order.customer_phone}</div>
                    </td>
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
                    <td className="p-4">
                      {expandedOrder === order.id ? <ChevronUp size={20} className="text-primary" /> : <ChevronDown size={20} className="text-gray-400" />}
                    </td>
                  </tr>
                  {expandedOrder === order.id && (
                    <tr className="bg-gray-50/50">
                      <td colSpan={6} className="p-0">
                        <div className="p-6 border-t border-gray-100 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Order Items</h4>
                              <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex justify-between p-3 text-sm">
                                    <div className="flex items-center gap-3">
                                      <span className="bg-gray-100 text-gray-600 w-6 h-6 flex items-center justify-center rounded text-xs font-bold">{item.quantity}x</span>
                                      <span className="text-gray-700">{item.name}</span>
                                    </div>
                                    <span className="font-medium text-gray-900">{formatPrice(item.price)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Delivery Details</h4>
                              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                                <p className="text-sm text-gray-600 leading-relaxed">{order.address}</p>
                              </div>
                              
                              <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Update Status</h4>
                              <div className="flex flex-wrap gap-2">
                                {['pending', 'shipped', 'delivered', 'cancelled'].map((status) => (
                                  <button
                                    key={status}
                                    onClick={(e) => { e.stopPropagation(); updateStatus(order.id, status); }}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition border ${
                                      order.status === status 
                                        ? 'bg-slate-800 text-white border-slate-800 shadow-lg' 
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                    }`}
                                  >
                                    {status}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No orders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
