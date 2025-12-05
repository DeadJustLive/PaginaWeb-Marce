import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Users, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { Button } from '../components/ui/Button';
import { ProductGallery } from '../components/products/ProductGallery';
import { RelatedProducts } from '../components/products/RelatedProducts';

export const ProductDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const product = products.find(p => p.id === id);

    // Scroll to top when product changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h2>
                <Button onClick={() => navigate('/')} variant="outline">
                    Volver al inicio
                </Button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product);
    };

    // Ensure we have an array of images (fallback to single image if array is missing)
    const galleryImages = product.images && product.images.length > 0
        ? product.images
        : [product.image];

    return (
        <main className="min-h-screen pt-24 pb-12 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Breadcrumb / Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-[var(--color-brand-primary)] transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    <span>Volver al catálogo</span>
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-16">
                    {/* Left Column: Gallery */}
                    <div className="md:sticky md:top-24 h-fit">
                        <ProductGallery
                            images={galleryImages}
                            productName={product.name}
                        />
                    </div>

                    {/* Right Column: Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div>
                            <span className="text-[var(--color-brand-primary)] font-bold uppercase tracking-wider text-sm">
                                {product.category}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-brand-text)] mt-2 mb-4 leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-2xl md:text-3xl font-bold text-[var(--color-brand-primary)]">
                                ${product.price.toLocaleString('es-CL')}
                            </p>
                        </div>

                        <div className="prose text-gray-600">
                            <p className="text-lg leading-relaxed">{product.description}</p>
                        </div>

                        {/* Extra Details: Portions & Ingredients */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {product.portions && (
                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-2 text-[var(--color-brand-secondary)]">
                                        <Users size={20} />
                                        <h3 className="font-bold">Porciones</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">{product.portions}</p>
                                </div>
                            )}

                            {product.ingredients && (
                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-2 text-orange-500">
                                        <AlertCircle size={20} />
                                        <h3 className="font-bold">Ingredientes</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">{product.ingredients}</p>
                                </div>
                            )}
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            <Button
                                size="lg"
                                className="w-full md:w-auto text-lg px-12"
                                leftIcon={<ShoppingCart size={24} />}
                                onClick={handleAddToCart}
                            >
                                Agregar al Carrito
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Related Products */}
                <RelatedProducts currentProduct={product} allProducts={products} />
            </div>
        </main>
    );
};
