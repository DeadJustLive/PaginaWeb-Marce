import React from 'react';
import { ShoppingBag, Gift, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
    return (
        <div className="relative bg-[var(--color-brand-background)] pt-32 pb-20 overflow-hidden">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-[var(--color-brand-primary)] text-sm font-bold mb-4">
                            🍬 ¡Dulces momentos para ti!
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-[var(--color-brand-secondary)] mb-6 leading-tight">
                            La mejor selección de <span className="text-[var(--color-brand-primary)]">Dulces y Snacks</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-lg">
                            Encuentra tus chocolates favoritos, gomitas importadas y cajas sorpresa para regalar. ¡Envíos a todo Chile!
                        </p>
                        <div className="flex gap-4 flex-col sm:flex-row">
                            <a
                                href="#productos"
                                className="px-8 py-4 bg-[var(--color-brand-primary)] text-white rounded-full font-bold text-lg hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-200 flex items-center justify-center gap-2"
                            >
                                <ShoppingBag size={20} />
                                Ver Catálogo
                            </a>
                            <button className="px-8 py-4 bg-white text-[var(--color-brand-secondary)] border-2 border-gray-100 rounded-full font-bold text-lg hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] transition-all flex items-center justify-center gap-2">
                                <Gift size={20} />
                                Cajas Sorpresa
                            </button>
                        </div>
                    </motion.div>
                </div>

                <div className="flex-1 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative z-10"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Dulces Marce"
                            className="rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                        />

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
                        >
                            <div className="bg-green-100 p-2 rounded-full text-green-600">
                                <Truck size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Envíos</p>
                                <p className="text-sm font-bold text-gray-800">Todo Chile</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Background Blobs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-purple-200/50 to-pink-200/50 rounded-full blur-3xl -z-10"></div>
                </div>
            </div>
        </div>
    );
};
