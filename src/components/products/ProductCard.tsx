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
            className="bg-white rounded-2xl shadow-lg overflow-hidden group flex flex-col h-full"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {product.isNew && (
                    <span className="absolute top-2 left-2 md:top-4 md:left-4 bg-[var(--color-brand-primary)] text-white text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full">
                        NUEVO
                    </span>
                )}
                <button className="absolute top-2 right-2 md:top-4 md:right-4 p-1.5 md:p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-500 transition-colors">
                    <Heart size={16} className="md:w-5 md:h-5" />
                </button>
            </div>

            <div className="p-3 md:p-6 flex flex-col flex-grow">
                <div className="mb-3 md:mb-4">
                    <span className="text-[10px] md:text-xs font-medium text-[var(--color-brand-secondary)] uppercase tracking-wider block mb-1">
                        {product.category}
                    </span>
                    <h3 className="text-sm md:text-xl font-bold text-[var(--color-brand-text)] mb-1 md:mb-2 line-clamp-2 leading-tight">
                        {product.name}
                    </h3>
                    <p className="text-gray-600 text-[10px] md:text-sm line-clamp-2 hidden sm:block">
                        {product.description}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto gap-2 sm:gap-0">
                    <span className="text-lg md:text-2xl font-bold text-[var(--color-brand-primary)]">
                        ${product.price.toLocaleString('es-CL')}
                    </span>
                    <Button
                        size="sm"
                        leftIcon={<ShoppingCart size={14} className="md:w-[18px] md:h-[18px]" />}
                        onClick={() => addToCart(product)}
                        className="text-[10px] md:text-sm px-2.5 py-1.5 md:px-4 w-full sm:w-auto justify-center"
                    >
                        Agregar
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};
