import React from 'react';
import { Lock } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8 pt-28 max-w-4xl min-h-[60vh]">
            <h1 className="text-3xl font-bold text-[var(--color-brand-text)] mb-8 text-center">Políticas de Privacidad</h1>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <Lock className="text-[var(--color-brand-primary)]" size={24} />
                    <p className="text-sm text-gray-500">Tu privacidad es importante para nosotros</p>
                </div>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">1. Uso de Datos</h2>
                    <p className="text-gray-600">La información que recolectamos (nombre, dirección, email) se utiliza exclusivamente para procesar tus pedidos y mejorar tu experiencia de compra.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">2. Protección de Información</h2>
                    <p className="text-gray-600">Tus datos están protegidos y no serán compartidos con terceros, salvo las empresas de transporte para realizar la entrega.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">3. Cookies</h2>
                    <p className="text-gray-600">Utilizamos cookies para recordar tus preferencias y mantener tu sesión activa.</p>
                </section>
            </div>
        </div>
    );
};
