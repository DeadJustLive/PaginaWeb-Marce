import React from 'react';
import { HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
    const faqs = [
        {
            q: "¿Hacen envíos a todo Chile?",
            a: "Sí, realizamos envíos a todo el país a través de Starken y Chilexpress."
        },
        {
            q: "¿Cuáles son los medios de pago?",
            a: "Aceptamos tarjetas de crédito y débito a través de Webpay, y también transferencias bancarias."
        },
        {
            q: "¿Puedo retirar mi compra en persona?",
            a: "Sí, tenemos opción de retiro gratuito en nuestra tienda en Providencia."
        },
        {
            q: "¿Cuánto demora en llegar mi pedido?",
            a: "Dependiendo de tu ubicación, los envíos tardan entre 1 y 5 días hábiles."
        },
        {
            q: "¿Los productos tienen garantía?",
            a: "Sí, todos nuestros productos cuentan con garantía legal de 6 meses por fallas de fábrica."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8 pt-28 max-w-4xl min-h-[60vh]">
            <h1 className="text-3xl font-bold text-[var(--color-brand-text)] mb-8 text-center">Preguntas Frecuentes</h1>

            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex gap-4">
                            <HelpCircle className="text-[var(--color-brand-primary)] shrink-0" size={24} />
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{faq.q}</h3>
                                <p className="text-gray-600">{faq.a}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
