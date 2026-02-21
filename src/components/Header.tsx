import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Phone, User } from 'lucide-react';
import { useCartStore } from '../store/cart';

export function Header() {
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 px-4 text-sm hidden sm:flex justify-between items-center">
        <p>Delivery Available within 100 KM – Vadodara</p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Phone size={14} /> +91-9876543210</span>
          <Link to="/seller-dashboard" className="hover:underline">Seller Panel</Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary flex-shrink-0">
          MyShop <span className="text-secondary">MyHome</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl relative">
          <input
            type="text"
            placeholder="Search for mobile chargers, cables..."
            className="w-full border-2 border-gray-200 rounded-full py-2 px-4 pr-12 focus:outline-none focus:border-primary"
          />
          <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-secondary text-white p-1.5 rounded-full hover:bg-orange-600 transition">
            <Search size={20} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative text-gray-700 hover:text-primary transition">
            <ShoppingCart size={28} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="text-gray-700 hover:text-primary transition hidden sm:block">
            <User size={28} />
          </button>
          <button className="md:hidden text-gray-700">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Search (Visible only on mobile) */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-lg py-2 px-4 pr-10"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
    </header>
  );
}
