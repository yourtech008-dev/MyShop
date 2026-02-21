import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">MyShop <span className="text-secondary">MyHome</span></h3>
          <p className="text-gray-400 mb-4">
            Everything You Need, At Your Doorstep. We provide the best mobile accessories and home essentials with fast delivery in Vadodara.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white"><Facebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Twitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Instagram size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-secondary">Home</Link></li>
            <li><Link to="/" className="hover:text-secondary">Shop</Link></li>
            <li><Link to="/track" className="hover:text-secondary">Track Order</Link></li>
            <li><Link to="/seller-dashboard" className="hover:text-secondary">Seller Panel</Link></li>
            <li><Link to="/contact" className="hover:text-secondary">Contact Us</Link></li>
            <li><a href="#" className="hover:text-secondary">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin className="text-secondary mt-1" size={20} />
              <span>Near Vadodara, Gujarat<br />Delivery Available: 100 KM Radius</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-secondary" size={20} />
              <span>+91-9876543210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-secondary" size={20} />
              <span>support@myshopmyhome.in</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MyShop MyHome. All rights reserved.
      </div>
    </footer>
  );
}
