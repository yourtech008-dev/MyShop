import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Search, Package, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function TrackingPage() {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    setLoading(true);
    setError('');
    setOrderStatus(null);

    try {
      const res = await fetch(`/api/orders/${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setOrderStatus(data);
      } else {
        setError('Order not found. Please check your Order ID.');
      }
    } catch (err) {
      setError('Failed to track order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center text-primary mb-8">Track Your Order</h1>
          
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <form onSubmit={handleTrack} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Order ID (e.g., 1)"
                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
              <button 
                type="submit" 
                className="bg-secondary text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? '...' : 'Track'}
              </button>
            </form>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {orderStatus && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-mono font-bold text-lg">#{orderStatus.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{new Date(orderStatus.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex flex-col items-center py-6">
                {orderStatus.status === 'delivered' ? (
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} />
                  </div>
                ) : orderStatus.status === 'cancelled' ? (
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                    <XCircle size={32} />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
                    <Clock size={32} />
                  </div>
                )}
                
                <h3 className="text-xl font-bold capitalize mb-1">{orderStatus.status}</h3>
                <p className="text-gray-500 text-center">
                  {orderStatus.status === 'pending' && 'Your order has been received and is being processed.'}
                  {orderStatus.status === 'shipped' && 'Your order is on the way!'}
                  {orderStatus.status === 'delivered' && 'Your order has been delivered.'}
                  {orderStatus.status === 'cancelled' && 'This order has been cancelled.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
