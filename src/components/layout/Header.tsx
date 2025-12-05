import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-[var(--color-brand-primary)] rounded-full text-white">
                        <ShoppingBag size={24} />
                    </div>
                    <span className="text-xl font-bold text-[var(--color-brand-secondary)]">
                        Dulces Marce
                    </span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#inicio" className="text-[var(--color-brand-text)] hover:text-[var(--color-brand-primary)] font-medium transition-colors">Inicio</a>
                    <a href="#productos" className="text-[var(--color-brand-text)] hover:text-[var(--color-brand-primary)] font-medium transition-colors">Productos</a>
                    <a href="#contacto" className="text-[var(--color-brand-text)] hover:text-[var(--color-brand-primary)] font-medium transition-colors">Contacto</a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-[var(--color-brand-text)]"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100"
                    >
                        <div className="flex flex-col p-4 gap-4">
                            <a href="#inicio" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-[var(--color-brand-text)]">Inicio</a>
                            <a href="#productos" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-[var(--color-brand-text)]">Productos</a>
                            <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-[var(--color-brand-text)]">Contacto</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
