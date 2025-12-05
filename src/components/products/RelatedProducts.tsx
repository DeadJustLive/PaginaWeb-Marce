import React from 'react';
import type { Product } from '../../data/products';
import { ProductCard } from './ProductCard';

interface RelatedProductsProps {
    currentProduct: Product;
    allProducts: Product[];
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProduct, allProducts }) => {
    // Filter products: same category, different ID
    const related = allProducts
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4); // Limit to 4 related products

    if (related.length === 0) return null;

    return (
        <div className="mt-16 md:mt-24">
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-brand-secondary)] mb-8">
                Quizás te pueda gustar
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {related.map(product => (
                    <div key={product.id} className="h-full">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};
