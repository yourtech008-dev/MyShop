import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { useCartStore } from '../store/cart';
import { ShoppingCart, Heart } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { motion } from 'motion/react';

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden group"
    >
      <div className="relative aspect-square bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </span>
        )}
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100">
          <Heart size={18} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">{product.name}</h3>
        
        <div className="flex items-end gap-2 mb-4">
          <span className="text-xl font-bold text-primary">{formatPrice(discountedPrice)}</span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.price)}</span>
          )}
        </div>
        
        <button 
          onClick={() => addItem(product)}
          className="w-full bg-primary hover:bg-blue-800 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition"
        >
          <ShoppingCart size={18} /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
