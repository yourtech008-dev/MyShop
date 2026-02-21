import React from 'react';
import { Product } from '../types';
import { useCartStore } from '../store/cart';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { motion } from 'motion/react';

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl group hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              -{product.discount}%
            </span>
          )}
          {product.stock < 10 && (
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              Low Stock
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition duration-300">
          <button className="bg-white p-2.5 rounded-full shadow-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition">
            <Heart size={18} />
          </button>
        </div>

        {/* Add to Cart Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition duration-300">
          <button 
            onClick={() => addItem(product)}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-slate-800 flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} /> Add to Cart
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="text-xs font-medium text-secondary uppercase tracking-wider">{product.category}</div>
          <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
            <Star size={12} fill="currentColor" /> 4.5
          </div>
        </div>
        
        <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 leading-tight group-hover:text-secondary transition">{product.name}</h3>
        
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-slate-900">{formatPrice(discountedPrice)}</span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-400 line-through decoration-2">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
