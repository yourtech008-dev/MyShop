import React, { useState } from 'react';
import { useCartStore } from '../store/cart';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { formatPrice } from '../lib/utils';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const checkoutSchema = z.object({
  customer_name: z.string().min(2, 'Name is required'),
  customer_phone: z.string().min(10, 'Valid phone number is required'),
  address: z.string().min(10, 'Full address is required'),
  payment_method: z.enum(['cod', 'razorpay']),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      payment_method: 'cod',
    },
  });

  const paymentMethod = watch('payment_method');

  const onSubmit = async (data: CheckoutForm) => {
    try {
      const orderData = {
        ...data,
        total_amount: total(),
        items: items,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        setOrderSuccess(true);
        clearCart();
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error('Order failed', error);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">Thank you for shopping with MyShop MyHome. We will contact you shortly.</p>
            <Link to="/" className="text-primary hover:underline">Return to Home</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link to="/" className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-800">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-gray-100" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-primary font-bold">{formatPrice(item.price * (1 - item.discount / 100))}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 p-2 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout Form */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(total())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-gray-900 pt-2">
                    <span>Total</span>
                    <span>{formatPrice(total())}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      {...register('customer_name')}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="John Doe"
                    />
                    {errors.customer_name && <p className="text-red-500 text-xs mt-1">{errors.customer_name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      {...register('customer_phone')}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                    {errors.customer_phone && <p className="text-red-500 text-xs mt-1">{errors.customer_phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                    <textarea 
                      {...register('address')}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Street, Area, City, Pincode"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`border rounded-lg p-3 cursor-pointer flex items-center justify-center gap-2 ${paymentMethod === 'cod' ? 'border-primary bg-blue-50 text-primary' : 'border-gray-200'}`}>
                        <input type="radio" value="cod" {...register('payment_method')} className="hidden" />
                        <span>Cash on Delivery</span>
                      </label>
                      <label className={`border rounded-lg p-3 cursor-pointer flex items-center justify-center gap-2 ${paymentMethod === 'razorpay' ? 'border-primary bg-blue-50 text-primary' : 'border-gray-200'}`}>
                        <input type="radio" value="razorpay" {...register('payment_method')} className="hidden" />
                        <span>Online (Razorpay)</span>
                      </label>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-secondary hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition mt-4 shadow-lg shadow-orange-200"
                  >
                    Place Order
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
