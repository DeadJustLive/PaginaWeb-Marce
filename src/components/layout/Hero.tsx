import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
    return (
        <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-brand-primary)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-brand-accent)]/20 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm mb-6">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium text-[var(--color-brand-secondary)]">
                                Dulces caseros hechos con amor
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-[var(--color-brand-text)]">
                            Momentos <br />
                            <span className="text-[var(--color-brand-primary)]">Dulces</span> para <br />
                            Compartir
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                            Descubre nuestra selección artesanal de alfajores, chocolates y packs temáticos.
                            El regalo perfecto para sorprender a quien más quieres.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" rightIcon={<ArrowRight size={20} />}>
                                Ver Catálogo
                            </Button>
                            <Button size="lg" variant="outline">
                                Contactar
                            </Button>
                        </div>
                    </motion.div>

                    {/* Image/Visual Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative z-10 bg-white p-4 rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Caja de dulces y alfajores"
                                className="w-full h-[400px] object-cover rounded-2xl"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <Star className="w-6 h-6 text-green-600 fill-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Calidad Premium</p>
                                    <p className="font-bold text-[var(--color-brand-text)]">100% Artesanal</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
