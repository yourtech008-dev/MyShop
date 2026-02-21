import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { Features } from '../components/Features';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-primary text-white py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-900/50"></div>
            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                >
                    Visit or Contact MyShop MyHome
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-blue-100"
                >
                    Fast Delivery within 100 KM from Vadodara
                </motion.p>
            </div>
        </section>

        <div className="container mx-auto px-4 py-12 -mt-10 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Info Cards */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 lg:col-span-1"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Store Details</h2>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-orange-100 p-3 rounded-full text-secondary">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Address</h3>
                                <p className="text-gray-600">MyShop MyHome<br/>Near Vadodara, Gujarat, India</p>
                                <p className="text-sm text-secondary mt-1 font-medium">Delivery Radius: 100 KM</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Phone</h3>
                                <p className="text-gray-600">+91-9876543210</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Email</h3>
                                <p className="text-gray-600">support@myshopmyhome.in</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-green-100 p-3 rounded-full text-green-600">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Working Hours</h3>
                                <p className="text-gray-600">Mon-Sat: 9:00 AM - 8:00 PM</p>
                                <p className="text-red-500 font-medium">Sunday: Closed</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 lg:col-span-2"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" placeholder="+91 98765 43210" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Message</label>
                            <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" placeholder="How can we help you?"></textarea>
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" className="bg-secondary hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition shadow-lg shadow-orange-200">
                                <Send size={20} /> Send Message
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>

            {/* Map Section */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 bg-white p-4 rounded-2xl shadow-lg border border-gray-100"
            >
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118106.70010221666!2d73.10304614656647!3d22.322102631627934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a3ddab%3A0xac39d3bfe1473fb8!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1708500000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="400" 
                    style={{ border: 0, borderRadius: '1rem' }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </motion.div>
        </div>

        <Features />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
