import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Truck, CreditCard, User, MapPin, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

type DeliveryMethod = 'pickup' | 'starken-branch' | 'starken-home';

export const CheckoutPage: React.FC = () => {
    const { items, cartTotal, checkoutData, setCheckoutData, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();

    // Skip step 1 if logged in and not guest
    const [step, setStep] = useState<1 | 2 | 3>(isAuthenticated && !user?.isGuest ? 2 : 1);
    const [isSuccess, setIsSuccess] = useState(false);

    // Pre-fill data when user logs in
    React.useEffect(() => {
        if (user && !user.isGuest) {
            setCheckoutData(prev => ({
                ...prev,
                name: user.name || prev.name,
                email: user.email || prev.email,
                phone: user.phone || prev.phone,
            }));
        }
    }, [user, setCheckoutData]);

    // Redirect if cart is empty and not success
    if (items.length === 0 && !isSuccess) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Tu carrito está vacío</h2>
                <p className="text-gray-500">Agrega algunos dulces deliciosos para continuar.</p>
                <Link to="/">
                    <Button>Volver al Catálogo</Button>
                </Link>
            </div>
        );
    }

    // Use checkoutData from context
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

    const finalTotal = cartTotal + shippingCost;

    const handleSubmit = () => {
        // In the future, this will send data to the backend/app
        console.log('Order Data:', {
            items,
            subtotal: cartTotal,
            shippingCost,
            total: finalTotal,
            deliveryMethod,
            customer: formData,
            user: user // Attach user info if logged in
        });

        setIsSuccess(true);
        clearCart();
    };

    if (isSuccess) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center space-y-6 max-w-lg mx-auto">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 shadow-lg">
                    <CheckCircle size={48} />
                </div>
                <h2 className="text-3xl font-bold text-[var(--color-brand-text)]">¡Pedido Recibido!</h2>
                <p className="text-gray-600 text-lg">
                    Hemos registrado tu pedido exitosamente.
                    <br />
                    Pronto recibirás un correo con la confirmación y los detalles.
                </p>
                <div className="bg-yellow-50 p-6 rounded-2xl text-yellow-800 border border-yellow-100 w-full">
                    <p className="font-bold mb-2 text-lg">Siguiente Paso: Transferencia</p>
                    <p>Usa los datos bancarios mostrados anteriormente para completar tu compra. Envía el comprobante a nuestro WhatsApp.</p>
                </div>
                <Link to="/" className="w-full">
                    <Button className="w-full py-4 text-lg">
                        Volver al Inicio
                    </Button>
                </Link>
            </div>
        );
    }

    const nextStep = () => setStep(s => s + 1 as any);
    const prevStep = () => setStep(s => s - 1 as any);

    return (
        <div className="container mx-auto px-4 py-8 pt-28 max-w-6xl">
            <h1 className="text-3xl font-bold text-[var(--color-brand-text)] mb-8 text-center md:text-left">Finalizar Compra</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Steps */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-8 px-4">
                        <div className={`flex flex-col items-center ${step >= 1 ? 'text-[var(--color-brand-primary)]' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${step >= 1 ? 'bg-[var(--color-brand-primary)] text-white' : 'bg-gray-200'}`}>1</div>
                            <span className="text-sm font-medium">Tus Datos</span>
                        </div>
                        <div className={`flex-1 h-1 mx-4 rounded-full transition-colors ${step >= 2 ? 'bg-[var(--color-brand-primary)]' : 'bg-gray-200'}`} />
                        <div className={`flex flex-col items-center ${step >= 2 ? 'text-[var(--color-brand-primary)]' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${step >= 2 ? 'bg-[var(--color-brand-primary)] text-white' : 'bg-gray-200'}`}>2</div>
                            <span className="text-sm font-medium">Entrega</span>
                        </div>
                        <div className={`flex-1 h-1 mx-4 rounded-full transition-colors ${step >= 3 ? 'bg-[var(--color-brand-primary)]' : 'bg-gray-200'}`} />
                        <div className={`flex flex-col items-center ${step >= 3 ? 'text-[var(--color-brand-primary)]' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${step >= 3 ? 'bg-[var(--color-brand-primary)] text-white' : 'bg-gray-200'}`}>3</div>
                            <span className="text-sm font-medium">Pago</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <AnimatePresence mode='wait'>
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center gap-3 text-[var(--color-brand-secondary)] mb-4">
                                        <User size={24} />
                                        <h2 className="text-xl font-bold">Información Personal</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Nombre Completo</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                                value={formData.name}
                                                onChange={e => setCheckoutData(prev => ({ ...prev, name: e.target.value }))}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">RUT</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="12.345.678-9"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                                value={formData.rut}
                                                onChange={e => setCheckoutData(prev => ({ ...prev, rut: e.target.value }))}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Email</label>
                                            <input
                                                required
                                                type="email"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                                value={formData.email}
                                                onChange={e => setCheckoutData(prev => ({ ...prev, email: e.target.value }))}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Teléfono</label>
                                            <input
                                                required
                                                type="tel"
                                                placeholder="+56 9..."
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                                value={formData.phone}
                                                onChange={e => setCheckoutData(prev => ({ ...prev, phone: e.target.value }))}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button
                                            className="px-8 py-3 text-lg"
                                            onClick={nextStep}
                                            disabled={!formData.name || !formData.rut || !formData.email || !formData.phone}
                                        >
                                            Continuar
                                        </Button>
                                    </div>
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
                                    <div className="flex items-center gap-3 text-[var(--color-brand-secondary)] mb-4">
                                        <Truck size={24} />
                                        <h2 className="text-xl font-bold">Opciones de Entrega</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryMethod === 'pickup' ? 'border-[var(--color-brand-primary)] bg-red-50' : 'border-gray-100 hover:border-gray-200'}`}>
                                            <div className="flex items-center gap-4">
                                                <input type="radio" name="delivery" checked={deliveryMethod === 'pickup'} onChange={() => setDeliveryMethod('pickup')} className="accent-[var(--color-brand-primary)] w-5 h-5" />
                                                <div>
                                                    <span className="font-bold block text-gray-800 text-lg">Retiro en Domicilio</span>
                                                    <span className="text-gray-500">Gratis - Previa coordinación</span>
                                                </div>
                                            </div>
                                            <span className="font-bold text-[var(--color-brand-primary)] text-lg">$0</span>
                                        </label>

                                        <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryMethod === 'starken-branch' ? 'border-[var(--color-brand-primary)] bg-red-50' : 'border-gray-100 hover:border-gray-200'}`}>
                                            <div className="flex items-center gap-4">
                                                <input type="radio" name="delivery" checked={deliveryMethod === 'starken-branch'} onChange={() => setDeliveryMethod('starken-branch')} className="accent-[var(--color-brand-primary)] w-5 h-5" />
                                                <div>
                                                    <span className="font-bold block text-gray-800 text-lg">Starken - Sucursal</span>
                                                    <span className="text-gray-500">Por pagar en destino</span>
                                                </div>
                                            </div>
                                            <span className="font-bold text-[var(--color-brand-primary)] text-lg">~$3.500</span>
                                        </label>

                                        <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryMethod === 'starken-home' ? 'border-[var(--color-brand-primary)] bg-red-50' : 'border-gray-100 hover:border-gray-200'}`}>
                                            <div className="flex items-center gap-4">
                                                <input type="radio" name="delivery" checked={deliveryMethod === 'starken-home'} onChange={() => setDeliveryMethod('starken-home')} className="accent-[var(--color-brand-primary)] w-5 h-5" />
                                                <div>
                                                    <span className="font-bold block text-gray-800 text-lg">Starken - Domicilio</span>
                                                    <span className="text-gray-500">Por pagar en destino</span>
                                                </div>
                                            </div>
                                            <span className="font-bold text-[var(--color-brand-primary)] text-lg">~$5.000</span>
                                        </label>
                                    </div>

                                    {deliveryMethod !== 'pickup' && (
                                        <div className="mt-8 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">

                                            {/* Saved Addresses Selector */}
                                            {isAuthenticated && user?.addresses && user.addresses.length > 0 && (
                                                <div className="mb-8">
                                                    <div className="flex items-center gap-3 text-[var(--color-brand-secondary)] mb-4">
                                                        <MapPin size={24} />
                                                        <h3 className="text-lg font-bold">Mis Direcciones</h3>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-3">
                                                        {user.addresses.map((addr) => (
                                                            <div
                                                                key={addr.id}
                                                                onClick={() => {
                                                                    setCheckoutData(prev => ({
                                                                        ...prev,
                                                                        region: addr.region,
                                                                        commune: addr.commune,
                                                                        address: addr.address
                                                                    }));
                                                                }}
                                                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between group ${formData.address === addr.address
                                                                    ? 'border-[var(--color-brand-primary)] bg-red-50'
                                                                    : 'border-gray-100 hover:border-gray-200'
                                                                    }`}
                                                            >
                                                                <div>
                                                                    <div className="font-bold text-gray-800">{addr.title}</div>
                                                                    <div className="text-sm text-gray-600">{addr.address}, {addr.commune}</div>
                                                                </div>
                                                                {formData.address === addr.address && (
                                                                    <CheckCircle className="text-[var(--color-brand-primary)]" size={20} />
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="relative flex py-5 items-center">
                                                        <div className="flex-grow border-t border-gray-200"></div>
                                                        <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">O ingresa una nueva</span>
                                                        <div className="flex-grow border-t border-gray-200"></div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-3 text-[var(--color-brand-secondary)] mb-4">
                                                <MapPin size={24} />
                                                <h3 className="text-lg font-bold">Dirección de Envío</h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-700">Región</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                                        value={formData.region}
                                                        onChange={e => setCheckoutData(prev => ({ ...prev, region: e.target.value }))}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-700">Comuna</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                                        value={formData.commune}
                                                        onChange={e => setCheckoutData(prev => ({ ...prev, commune: e.target.value }))}
                                                    />
                                                </div>
                                                <div className="md:col-span-2 space-y-2">
                                                    <label className="text-sm font-medium text-gray-700">Calle y Número</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                                        value={formData.address}
                                                        onChange={e => setCheckoutData(prev => ({ ...prev, address: e.target.value }))}
                                                    />
                                                </div>

                                                {/* Missing Phone Input */}
                                                {!formData.phone && (
                                                    <div className="md:col-span-2 space-y-2 animate-in fade-in slide-in-from-top-2">
                                                        <label className="text-sm font-medium text-gray-700">Teléfono de Contacto</label>
                                                        <input
                                                            required
                                                            type="tel"
                                                            placeholder="+56 9..."
                                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                                            value={formData.phone}
                                                            onChange={e => setCheckoutData(prev => ({ ...prev, phone: e.target.value }))}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-between pt-4">
                                        <button onClick={prevStep} className="px-6 py-3 text-gray-500 hover:text-gray-700 font-medium flex items-center gap-2">
                                            <ArrowLeft size={20} /> Volver
                                        </button>
                                        <Button className="px-8 py-3 text-lg" onClick={nextStep}>
                                            Continuar
                                        </Button>
                                    </div>
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
                                    <div className="flex items-center gap-3 text-[var(--color-brand-secondary)] mb-4">
                                        <CreditCard size={24} />
                                        <h2 className="text-xl font-bold">Datos de Transferencia</h2>
                                    </div>

                                    <div className="bg-gray-50 p-6 rounded-2xl space-y-3 text-gray-700 border border-gray-100">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Banco</p>
                                                <p className="font-bold text-lg">Banco Estado</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Tipo de Cuenta</p>
                                                <p className="font-bold text-lg">Cuenta RUT</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Número</p>
                                                <p className="font-bold text-lg">12.345.678</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">RUT</p>
                                                <p className="font-bold text-lg">12.345.678-9</p>
                                            </div>
                                            <div className="md:col-span-2">
                                                <p className="text-sm text-gray-500">Nombre</p>
                                                <p className="font-bold text-lg">Marcela Dulces</p>
                                            </div>
                                            <div className="md:col-span-2">
                                                <p className="text-sm text-gray-500">Email</p>
                                                <p className="font-bold text-lg">pagos@dulcesmarce.cl</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <button onClick={prevStep} className="px-6 py-3 text-gray-500 hover:text-gray-700 font-medium flex items-center gap-2">
                                            <ArrowLeft size={20} /> Volver
                                        </button>
                                        <Button
                                            className="px-8 py-3 text-lg bg-green-600 hover:bg-green-700 focus:ring-green-600 shadow-xl"
                                            onClick={handleSubmit}
                                        >
                                            Confirmar Pedido
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Column: Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sticky top-24">
                        <h3 className="text-xl font-bold text-[var(--color-brand-text)] mb-6 pb-4 border-b border-gray-100">
                            Resumen del Pedido
                        </h3>

                        <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-3 items-center">
                                    <div className="relative">
                                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                                        <span className="absolute -top-2 -right-2 bg-gray-100 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                                        <p className="text-xs text-gray-500">${item.price.toLocaleString('es-CL')}</p>
                                    </div>
                                    <p className="font-bold text-sm">${(item.price * item.quantity).toLocaleString('es-CL')}</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-4 border-t border-gray-100">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${cartTotal.toLocaleString('es-CL')}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Envío</span>
                                <span>${shippingCost.toLocaleString('es-CL')}</span>
                            </div>
                            <div className="flex justify-between text-2xl font-bold text-[var(--color-brand-text)] pt-4 border-t border-gray-100">
                                <span>Total</span>
                                <span>${finalTotal.toLocaleString('es-CL')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
