import React from 'react';
import { ShoppingCart, CreditCard, Truck, CheckCircle } from 'lucide-react';

export const HowToBuyPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8 pt-28 max-w-4xl min-h-[60vh]">
            <h1 className="text-3xl font-bold text-[var(--color-brand-text)] mb-8 text-center">¿Cómo Comprar?</h1>

            <div className="space-y-8">
                <div className="flex gap-6 items-start bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-[var(--color-brand-primary)] shrink-0">
                        <ShoppingCart size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">1. Elige tus productos</h3>
                        <p className="text-gray-600">Navega por nuestro catálogo y agrega los dulces que más te gusten al carrito de compras.</p>
                    </div>
                </div>

                <div className="flex gap-6 items-start bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-[var(--color-brand-primary)] shrink-0">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">2. Revisa tu pedido</h3>
                        <p className="text-gray-600">Ve al carrito, verifica las cantidades y asegúrate de que todo esté correcto antes de continuar.</p>
                    </div>
                </div>

                <div className="flex gap-6 items-start bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-[var(--color-brand-primary)] shrink-0">
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">3. Ingresa tus datos y paga</h3>
                        <p className="text-gray-600">Completa la información de envío y selecciona tu método de pago preferido (Webpay o Transferencia).</p>
                    </div>
                </div>

                <div className="flex gap-6 items-start bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-[var(--color-brand-primary)] shrink-0">
                        <Truck size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">4. Recibe tu pedido</h3>
                        <p className="text-gray-600">Prepararemos tu orden con mucho cariño y te la enviaremos lo antes posible. ¡Disfruta!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
