import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { ArrowLeft, Send, Truck, CreditCard, User, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CheckoutFormProps {
    onBack: () => void;
    total: number;
}

type DeliveryMethod = 'pickup' | 'starken-branch' | 'starken-home';

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onBack, total: subtotal }) => {
    const { items, clearCart, checkoutData, setCheckoutData } = useCart();
    const [isSuccess, setIsSuccess] = useState(false);
    const [step, setStep] = useState<1 | 2 | 3>(1);

    // Use checkoutData from context instead of local state
    const formData = checkoutData;

    const deliveryMethod = checkoutData.deliveryMethod;
    const setDeliveryMethod = (method: DeliveryMethod) => {
        setCheckoutData(prev => ({ ...prev, deliveryMethod: method }));
    };

    // Shipping Costs (Mock)
    const shippingCost = {
        'pickup': 0,
        'starken-branch': 3500,
        'starken-home': 5000
    }[deliveryMethod];

    const finalTotal = subtotal + shippingCost;

    const handleSubmit = () => {
        // In the future, this will send data to the backend/app
        console.log('Order Data:', {
            items,
            subtotal,
            shippingCost,
            total: finalTotal,
            deliveryMethod,
            customer: formData
        });

        setIsSuccess(true);
        clearCart();
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col h-full items-center justify-center p-8 text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                    <Send size={40} />
                </div>
                <h2 className="text-2xl font-bold text-[var(--color-brand-text)]">¡Pedido Recibido!</h2>
                <p className="text-gray-600">
                    Hemos registrado tu pedido exitosamente.
                    <br />
                    Pronto recibirás un correo con la confirmación y los detalles.
                </p>
                <div className="bg-yellow-50 p-4 rounded-xl text-sm text-yellow-800 border border-yellow-100 max-w-sm mx-auto">
                    <p className="font-bold mb-1">Recuerda realizar la transferencia</p>
                    <p>Usa los datos bancarios mostrados anteriormente para completar tu compra.</p>
                </div>
                <Button onClick={onBack} className="w-full py-3">
                    Volver al Inicio
                </Button>
            </div>
        );
    }

    const nextStep = () => setStep(s => s + 1 as any);
    const prevStep = () => setStep(s => s - 1 as any);

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header */}
            <div className="p-6 bg-white border-b border-gray-100 flex items-center gap-4 sticky top-0 z-10">
                <button onClick={step === 1 ? onBack : prevStep} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-xl font-bold text-[var(--color-brand-text)]">
                        {step === 1 ? 'Datos de Contacto' : step === 2 ? 'Método de Envío' : 'Pago y Confirmación'}
                    </h2>
                    <div className="flex gap-2 mt-1">
                        <div className={`h-1 w-8 rounded-full transition-colors ${step >= 1 ? 'bg-[var(--color-brand-primary)]' : 'bg-gray-200'}`} />
                        <div className={`h-1 w-8 rounded-full transition-colors ${step >= 2 ? 'bg-[var(--color-brand-primary)]' : 'bg-gray-200'}`} />
                        <div className={`h-1 w-8 rounded-full transition-colors ${step >= 3 ? 'bg-[var(--color-brand-primary)]' : 'bg-gray-200'}`} />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode='wait'>
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
                                <div className="flex items-center gap-2 text-[var(--color-brand-secondary)] mb-2">
                                    <User size={20} />
                                    <h3 className="font-bold">Información Personal</h3>
                                </div>

                                <input
                                    required
                                    type="text"
                                    placeholder="Nombre Completo"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                    value={formData.name}
                                    onChange={e => setCheckoutData(prev => ({ ...prev, name: e.target.value }))}
                                />
                                <input
                                    required
                                    type="text"
                                    placeholder="RUT (Ej: 12.345.678-9)"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                    value={formData.rut}
                                    onChange={e => setCheckoutData(prev => ({ ...prev, rut: e.target.value }))}
                                />
                                <input
                                    required
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                    value={formData.email}
                                    onChange={e => setCheckoutData(prev => ({ ...prev, email: e.target.value }))}
                                />
                                <input
                                    required
                                    type="tel"
                                    placeholder="Teléfono (+56 9...)"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                    value={formData.phone}
                                    onChange={e => setCheckoutData(prev => ({ ...prev, phone: e.target.value }))}
                                />
                            </div>
                            <Button className="w-full py-4 text-lg" onClick={nextStep} disabled={!formData.name || !formData.rut || !formData.email || !formData.phone}>
                                Continuar a Envío
                            </Button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
                                <div className="flex items-center gap-2 text-[var(--color-brand-secondary)] mb-2">
                                    <Truck size={20} />
                                    <h3 className="font-bold">Opciones de Entrega</h3>
                                </div>

                                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryMethod === 'pickup' ? 'border-[var(--color-brand-primary)] bg-red-50' : 'border-gray-100 hover:border-gray-200'}`}>
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="delivery" checked={deliveryMethod === 'pickup'} onChange={() => setDeliveryMethod('pickup')} className="accent-[var(--color-brand-primary)] w-5 h-5" />
                                        <div>
                                            <span className="font-bold block text-gray-800">Retiro en Domicilio</span>
                                            <span className="text-sm text-gray-500">Gratis - Previa coordinación</span>
                                        </div>
                                    </div>
                                    <span className="font-bold text-[var(--color-brand-primary)]">$0</span>
                                </label>

                                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryMethod === 'starken-branch' ? 'border-[var(--color-brand-primary)] bg-red-50' : 'border-gray-100 hover:border-gray-200'}`}>
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="delivery" checked={deliveryMethod === 'starken-branch'} onChange={() => setDeliveryMethod('starken-branch')} className="accent-[var(--color-brand-primary)] w-5 h-5" />
                                        <div>
                                            <span className="font-bold block text-gray-800">Starken - Sucursal</span>
                                            <span className="text-sm text-gray-500">Por pagar en destino</span>
                                        </div>
                                    </div>
                                    <span className="font-bold text-[var(--color-brand-primary)]">~$3.500</span>
                                </label>

                                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryMethod === 'starken-home' ? 'border-[var(--color-brand-primary)] bg-red-50' : 'border-gray-100 hover:border-gray-200'}`}>
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="delivery" checked={deliveryMethod === 'starken-home'} onChange={() => setDeliveryMethod('starken-home')} className="accent-[var(--color-brand-primary)] w-5 h-5" />
                                        <div>
                                            <span className="font-bold block text-gray-800">Starken - Domicilio</span>
                                            <span className="text-sm text-gray-500">Por pagar en destino</span>
                                        </div>
                                    </div>
                                    <span className="font-bold text-[var(--color-brand-primary)]">~$5.000</span>
                                </label>
                            </div>

                            {deliveryMethod !== 'pickup' && (
                                <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
                                    <div className="flex items-center gap-2 text-[var(--color-brand-secondary)] mb-2">
                                        <MapPin size={20} />
                                        <h3 className="font-bold">Dirección de Envío</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Región"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                            value={formData.region}
                                            onChange={e => setCheckoutData(prev => ({ ...prev, region: e.target.value }))}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Comuna"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                            value={formData.commune}
                                            onChange={e => setCheckoutData(prev => ({ ...prev, commune: e.target.value }))}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Calle y Número"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                        value={formData.address}
                                        onChange={e => setCheckoutData(prev => ({ ...prev, address: e.target.value }))}
                                    />
                                </div>
                            )}

                            <Button className="w-full py-4 text-lg" onClick={nextStep}>
                                Ir al Pago
                            </Button>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
                                <div className="flex items-center gap-2 text-[var(--color-brand-secondary)] mb-2">
                                    <CreditCard size={20} />
                                    <h3 className="font-bold">Datos de Transferencia</h3>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm text-gray-700 border border-gray-100">
                                    <p><span className="font-bold">Banco:</span> Banco Estado</p>
                                    <p><span className="font-bold">Tipo de Cuenta:</span> Cuenta RUT</p>
                                    <p><span className="font-bold">Número:</span> 12.345.678</p>
                                    <p><span className="font-bold">Nombre:</span> Marcela Dulces</p>
                                    <p><span className="font-bold">RUT:</span> 12.345.678-9</p>
                                    <p><span className="font-bold">Email:</span> pagos@dulcesmarce.cl</p>
                                </div>

                                <p className="text-xs text-gray-500 text-center">
                                    *Guarda el comprobante de transferencia.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal Productos</span>
                                    <span>${subtotal.toLocaleString('es-CL')}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Envío Estimado</span>
                                    <span>${shippingCost.toLocaleString('es-CL')}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-[var(--color-brand-text)] pt-3 border-t border-gray-100">
                                    <span>Total Final</span>
                                    <span>${finalTotal.toLocaleString('es-CL')}</span>
                                </div>
                            </div>

                            <Button
                                className="w-full py-4 text-lg shadow-xl bg-green-600 hover:bg-green-700 focus:ring-green-600"
                                onClick={handleSubmit}
                            >
                                Confirmar Pedido
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div >
    );
};
