import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export const FloatingCartButton: React.FC = () => {
    const { setIsCartOpen, cartCount } = useCart();

    return (
        <AnimatePresence>
            {cartCount > 0 && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCartOpen(true)}
                    className="fixed bottom-6 right-6 z-40 bg-[var(--color-brand-primary)] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                >
                    <ShoppingBag size={24} />
                    <span className="absolute -top-2 -right-2 bg-[var(--color-brand-secondary)] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                        {cartCount}
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};
