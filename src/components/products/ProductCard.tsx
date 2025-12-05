import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '../../data/products';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden group"
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {product.isNew && (
                    <span className="absolute top-4 left-4 bg-[var(--color-brand-primary)] text-white text-xs font-bold px-3 py-1 rounded-full">
                        NUEVO
                    </span>
                )}
                <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-500 transition-colors">
                    <Heart size={20} />
                </button>
            </div>

            <div className="p-6">
                <div className="mb-4">
                    <span className="text-xs font-medium text-[var(--color-brand-secondary)] uppercase tracking-wider">
                        {product.category}
                    </span>
                    <h3 className="text-xl font-bold text-[var(--color-brand-text)] mt-1 mb-2">
                        {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                        {product.description}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-[var(--color-brand-primary)]">
                        ${product.price.toLocaleString('es-CL')}
                    </span>
                    <Button
                        size="sm"
                        leftIcon={<ShoppingCart size={18} />}
                        onClick={() => addToCart(product)}
                    >
                        Agregar
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};
