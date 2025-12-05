import React from 'react';
import { Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8 pt-28 max-w-4xl min-h-[60vh]">
            <h1 className="text-3xl font-bold text-[var(--color-brand-text)] mb-8 text-center">Nuestra Historia</h1>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                    <Heart size={40} fill="currentColor" />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">Bienvenidos a Dulces Marce</h2>

                <div className="space-y-4 text-gray-600 leading-relaxed max-w-2xl mx-auto">
                    <p>
                        Somos un emprendimiento familiar nacido del amor por los dulces y las ganas de compartir momentos especiales.
                        Lo que comenzó como un pequeño proyecto en casa, hoy se ha convertido en una tienda que lleva alegría a hogares de todo Chile.
                    </p>
                    <p>
                        Nuestra misión es simple: ofrecerte la mejor selección de dulces, chocolates y snacks, siempre con un servicio cercano y personalizado.
                        Nos preocupamos de cada detalle, desde la selección de productos hasta el empaquetado, para que recibir tu pedido sea toda una experiencia.
                    </p>
                    <p>
                        ¡Gracias por ser parte de nuestra familia y preferirnos!
                    </p>
                </div>
            </div>
        </div>
    );
};
