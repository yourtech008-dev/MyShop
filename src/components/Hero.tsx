import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-orange-100 text-secondary px-4 py-1 rounded-full text-sm font-semibold mb-4">
              🔥 Fast Delivery in 100KM Area
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight mb-6">
              Smart Living <br />
              <span className="text-secondary">Starts Here</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-lg">
              Get the best mobile accessories and home essentials delivered to your doorstep. Premium quality, unbeatable prices.
            </p>
            <button className="bg-secondary hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition shadow-lg shadow-orange-200">
              Shop Now <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
        
        <div className="md:w-1/2 mt-10 md:mt-0 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10"
          >
            <img 
              src="https://picsum.photos/seed/hero/800/600" 
              alt="Hero Product" 
              className="rounded-3xl shadow-2xl"
            />
          </motion.div>
          {/* Decorative blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100 rounded-full blur-3xl -z-0 opacity-50"></div>
        </div>
      </div>
    </div>
  );
}
