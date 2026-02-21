import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-orange-50 opacity-50"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-32 flex flex-col md:flex-row items-center relative z-10">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-600">Trusted by 10k+ Customers</span>
              <div className="flex text-yellow-400">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6">
              Upgrade Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-400">Digital Life</span>
            </h1>
            
            <p className="text-slate-600 text-lg mb-8 max-w-lg leading-relaxed">
              Premium mobile accessories and smart home essentials delivered in minutes. Experience the future of shopping in Vadodara.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow-xl shadow-slate-200">
                Start Shopping <ArrowRight size={20} />
              </button>
              <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition">
                View Categories
              </button>
            </div>
          </motion.div>
        </div>
        
        <div className="md:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://picsum.photos/seed/tech/800/800" 
                alt="Hero Product" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 text-white">
                <p className="font-bold text-xl">Premium Collection</p>
                <p className="text-white/80">New Arrivals 2026</p>
              </div>
            </div>
          </motion.div>
          
          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-24 h-24 bg-orange-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse delay-700"></div>
        </div>
      </div>
    </div>
  );
}
