import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headset } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Within 100km radius of Vadodara',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    desc: '100% secure payment gateway',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    desc: 'Hassle-free return policy',
  },
  {
    icon: Headset,
    title: '24/7 Support',
    desc: 'Dedicated customer support',
  },
];

export function Features() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-4 p-6 rounded-xl hover:bg-gray-50 transition">
              <div className="text-secondary">
                <feature.icon size={32} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
