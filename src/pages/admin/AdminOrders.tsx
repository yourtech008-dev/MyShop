import React, { useEffect, useState } from 'react';
import { Order } from '../../types';
import { formatPrice } from '../../lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const fetchOrders = () => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(setOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Manage Orders</h2>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Order ID</th>
              <th className="p-4 font-semibold text-gray-600">Customer</th>
              <th className="p-4 font-semibold text-gray-600">Total</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600">Date</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                  <td className="p-4 font-mono text-sm">#{order.id}</td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{order.customer_name}</div>
                    <div className="text-sm text-gray-500">{order.customer_phone}</div>
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
                    {expandedOrder === order.id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </td>
                </tr>
                {expandedOrder === order.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="p-6 border-t border-gray-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-bold text-gray-800 mb-3">Order Items</h4>
                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span>{item.quantity}x {item.name}</span>
                                <span className="font-medium">{formatPrice(item.price)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-3">Delivery Details</h4>
                          <p className="text-sm text-gray-600 mb-4">{order.address}</p>
                          
                          <h4 className="font-bold text-gray-800 mb-2">Update Status</h4>
                          <div className="flex gap-2">
                            {['pending', 'shipped', 'delivered', 'cancelled'].map((status) => (
                              <button
                                key={status}
                                onClick={(e) => { e.stopPropagation(); updateStatus(order.id, status); }}
                                className={`px-3 py-1 rounded text-xs border capitalize ${
                                  order.status === status 
                                    ? 'bg-gray-800 text-white border-gray-800' 
                                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                                }`}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
