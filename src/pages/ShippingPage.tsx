import React from 'react';
import { Truck, MapPin, Clock } from 'lucide-react';

export const ShippingPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8 pt-28 max-w-4xl min-h-[60vh]">
            <h1 className="text-3xl font-bold text-[var(--color-brand-text)] mb-8 text-center">Envíos y Entregas</h1>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-4 text-[var(--color-brand-primary)]">
                        <Truck size={28} />
                        <h2 className="text-xl font-bold text-gray-800">Métodos de Envío</h2>
                    </div>
                    <ul className="space-y-3 text-gray-600">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            Starken (Domicilio y Sucursal)
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            Chilexpress (Solo Sucursal)
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            Retiro en Tienda (Providencia)
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-4 text-[var(--color-brand-primary)]">
                        <Clock size={28} />
                        <h2 className="text-xl font-bold text-gray-800">Plazos de Entrega</h2>
                    </div>
                    <ul className="space-y-3 text-gray-600">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            Región Metropolitana: 1 a 3 días hábiles
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            Otras Regiones: 2 a 5 días hábiles
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            Zonas Extremas: Hasta 10 días hábiles
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-purple-50 p-8 rounded-2xl border border-purple-100 text-center">
                <MapPin size={48} className="mx-auto text-[var(--color-brand-primary)] mb-4" />
                <h2 className="text-xl font-bold text-gray-800 mb-2">Retiro en Tienda</h2>
                <p className="text-gray-600 mb-4">Puedes retirar tu pedido sin costo en nuestra tienda ubicada en:</p>
                <p className="font-medium text-lg text-[var(--color-brand-text)]">Padre Mariano Nº 356, Providencia, Santiago</p>
                <p className="text-sm text-gray-500 mt-2">Horario: Lunes a Viernes 09:00 - 19:00 hrs</p>
            </div>
        </div>
    );
};
