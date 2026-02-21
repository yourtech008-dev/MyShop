import React from 'react';
import { Smartphone, Cable, Battery, SprayCan, Home } from 'lucide-react';

const categories = [
  { name: 'Mobile Chargers', icon: Smartphone, color: 'bg-blue-100 text-blue-600' },
  { name: 'USB Cables', icon: Cable, color: 'bg-orange-100 text-orange-600' },
  { name: 'Power Banks', icon: Battery, color: 'bg-green-100 text-green-600' },
  { name: 'Hair Sprays', icon: SprayCan, color: 'bg-purple-100 text-purple-600' },
  { name: 'Home Essentials', icon: Home, color: 'bg-red-100 text-red-600' },
];

export function Categories() {
  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-primary mb-10">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex flex-col items-center gap-4 group cursor-pointer">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${cat.color} group-hover:scale-110 transition duration-300 shadow-sm`}>
              <cat.icon size={32} />
            </div>
            <span className="font-medium text-gray-700 group-hover:text-primary transition">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
