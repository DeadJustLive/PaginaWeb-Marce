import React from 'react';
import { FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8 pt-28 max-w-4xl min-h-[60vh]">
            <h1 className="text-3xl font-bold text-[var(--color-brand-text)] mb-8 text-center">Términos y Condiciones</h1>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <FileText className="text-[var(--color-brand-primary)]" size={24} />
                    <p className="text-sm text-gray-500">Última actualización: Diciembre 2024</p>
                </div>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">1. General</h2>
                    <p className="text-gray-600">Al realizar una compra en Dulces Marce, aceptas los siguientes términos y condiciones. Nos reservamos el derecho de modificar estos términos en cualquier momento.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">2. Precios y Stock</h2>
                    <p className="text-gray-600">Todos los precios incluyen IVA. El stock de los productos está sujeto a disponibilidad y puede variar sin previo aviso.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">3. Envíos</h2>
                    <p className="text-gray-600">Los tiempos de envío son estimados y dependen de la empresa de transporte (Starken/Chilexpress). No nos hacemos responsables por retrasos externos.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">4. Cambios y Devoluciones</h2>
                    <p className="text-gray-600">Se aceptan cambios solo por fallas de fábrica o errores en el pedido, dentro de los 10 días siguientes a la recepción.</p>
                </section>
            </div>
        </div>
    );
};
