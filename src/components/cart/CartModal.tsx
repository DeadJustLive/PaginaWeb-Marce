import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const CartModal: React.FC = () => {
    const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    const handleClose = () => {
        setIsCartOpen(false);
    };

    const handleCheckout = () => {
        handleClose();
        navigate('/checkout');
    };

    const total = cartTotal;

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl pointer-events-auto flex flex-col max-h-[85vh] h-full md:h-auto"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-[var(--color-brand-text)] flex items-center gap-2">
                                    <ShoppingBag className="text-[var(--color-brand-primary)]" />
                                    Tu Pedido
                                </h2>
                                <button
                                    onClick={handleClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Items */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {items.length === 0 ? (
                                    <div className="py-12 flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-full">
                                            <ShoppingBag size={48} className="text-gray-300" />
                                        </div>
                                        <p className="text-lg font-medium">Tu carrito está vacío</p>
                                        <Button variant="outline" onClick={handleClose}>
                                            Volver al catálogo
                                        </Button>
                                    </div>
                                ) : (
                                    items.map((item) => (
                                        <div key={item.id} className="flex gap-3 items-center bg-gray-50 p-2 rounded-xl">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-12 h-12 object-cover rounded-lg"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-[var(--color-brand-text)] text-sm truncate">{item.name}</h3>
                                                <p className="text-[var(--color-brand-primary)] font-bold text-xs">
                                                    ${item.price.toLocaleString('es-CL')}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow-sm border border-gray-100">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:text-[var(--color-brand-primary)] transition-colors"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:text-[var(--color-brand-primary)] transition-colors"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Footer */}
                            {items.length > 0 && (
                                <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span>${cartTotal.toLocaleString('es-CL')}</span>
                                        </div>
                                        <div className="flex justify-between text-xl font-bold text-[var(--color-brand-text)] pt-3 border-t border-gray-200">
                                            <span>Total Estimado</span>
                                            <span>${total.toLocaleString('es-CL')}</span>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full py-3.5 text-lg shadow-lg"
                                        onClick={handleCheckout}
                                    >
                                        Ir a Pagar
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
