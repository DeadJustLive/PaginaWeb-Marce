import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Package, User, MapPin, LogOut, Lock, Plus, Eye, ArrowLeft, FileText, Truck, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';

type Tab = 'orders' | 'profile' | 'addresses' | 'password';

// Mock Data Enhanced
const MOCK_ORDERS = [
    {
        id: 1355335,
        date: '4 de febrero de 2025',
        total: 47866,
        status: 'Entregado',
        color: 'text-green-600',
        dot: 'bg-green-500',
        estimatedDelivery: 'Entre el 6 y 7 de febrero',
        shippingAddress: {
            street: 'Francisco Bilbao #1533',
            commune: 'PEÑAFLOR',
            region: 'METROPOLITANA',
            recipient: 'Matias Retamal',
            phone: '+56985955546'
        },
        paymentMethod: 'Mercado Pago',
        trackingNumber: '712864116915',
        timeline: [
            { title: 'Orden pagada', completed: true, icon: FileText },
            { title: 'Preparando tu orden', completed: true, icon: Box },
            { title: 'Entregada a Chilexpress', completed: true, icon: Truck, link: 'https://www.chilexpress.cl/ver-estado-envio?nro_ot=712864116915' }
        ],
        products: [
            { name: 'Pack Dulces Surtidos', specs: '2 Unidades', image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&q=80&w=200' }
        ]
    },
    {
        id: 1355336,
        date: '5 de febrero de 2025',
        total: 12500,
        status: 'En preparación',
        color: 'text-blue-600',
        dot: 'bg-blue-500',
        estimatedDelivery: 'Entre el 8 y 9 de febrero',
        shippingAddress: {
            street: 'Av. Providencia 1234',
            commune: 'PROVIDENCIA',
            region: 'METROPOLITANA',
            recipient: 'Matias Retamal',
            phone: '+56985955546'
        },
        paymentMethod: 'Transferencia',
        trackingNumber: 'PENDIENTE',
        timeline: [
            { title: 'Orden pagada', completed: true, icon: FileText },
            { title: 'Preparando tu orden', completed: true, icon: Box },
            { title: 'Entregada a Starken', completed: false, icon: Truck, link: 'https://www.starken.cl/seguimiento' }
        ],
        products: [
            { name: 'Caja de Chocolates', specs: '1 Unidad', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=200' }
        ]
    }
];

export const ProfilePage: React.FC = () => {
    const { user, logout, addAddress, updateAddress, deleteAddress, updateProfile, changePassword } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('orders');
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

    // Address Form State
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
    const [addressForm, setAddressForm] = useState({
        title: '',
        region: '',
        commune: '',
        address: ''
    });

    // Profile Form State
    const [profileForm, setProfileForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || ''
    });

    // Password Form State
    const [passwordForm, setPasswordForm] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    if (!user) {
        navigate('/');
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Address Handlers
    const handleAddressSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingAddressId) {
            await updateAddress(editingAddressId, addressForm);
        } else {
            await addAddress(addressForm);
        }
        setIsAddressModalOpen(false);
        setEditingAddressId(null);
        setAddressForm({ title: '', region: '', commune: '', address: '' });
    };

    const openEditAddress = (addr: any) => {
        setAddressForm({
            title: addr.title,
            region: addr.region,
            commune: addr.commune,
            address: addr.address
        });
        setEditingAddressId(addr.id);
        setIsAddressModalOpen(true);
    };

    const openNewAddress = () => {
        setAddressForm({ title: '', region: '', commune: '', address: '' });
        setEditingAddressId(null);
        setIsAddressModalOpen(true);
    };

    // Profile Handler
    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateProfile(profileForm);
        alert('Datos actualizados correctamente');
    };

    // Password Handler
    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordForm.new !== passwordForm.confirm) {
            alert('Las contraseñas nuevas no coinciden');
            return;
        }
        await changePassword(passwordForm.current, passwordForm.new);
        setPasswordForm({ current: '', new: '', confirm: '' });
    };

    const SidebarItem = ({ id, icon: Icon, label }: { id: Tab; icon: any; label: string }) => (
        <button
            onClick={() => {
                setActiveTab(id);
                setSelectedOrder(null);
            }}
            className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all font-medium text-left ${activeTab === id
                    ? 'bg-[var(--color-brand-primary)] text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
        >
            <Icon size={20} />
            {label}
        </button>
    );

    return (
        <div className="container mx-auto px-4 py-8 pt-28 max-w-6xl min-h-[80vh]">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-2">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 text-center">
                        <div className="w-20 h-20 bg-[var(--color-brand-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--color-brand-primary)]">
                            <User size={32} />
                        </div>
                        <h2 className="font-bold text-lg text-gray-800">{user.name}</h2>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    <nav className="space-y-2">
                        <SidebarItem id="orders" icon={Package} label="Compras" />
                        <SidebarItem id="profile" icon={User} label="Datos personales" />
                        <SidebarItem id="addresses" icon={MapPin} label="Direcciones" />
                        <SidebarItem id="password" icon={Lock} label="Contraseña" />

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all font-medium text-left text-red-500 bg-white hover:bg-red-50 mt-8"
                        >
                            <LogOut size={20} />
                            Cerrar Sesión
                        </button>
                    </nav>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeTab + (selectedOrder ? '-detail' : '')}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* ORDERS TAB */}
                            {activeTab === 'orders' && !selectedOrder && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-[var(--color-brand-text)] mb-6">Mis Compras</h2>
                                    {MOCK_ORDERS.map((order) => (
                                        <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                            <div className="flex flex-wrap justify-between items-start gap-4 mb-4 border-b border-gray-50 pb-4">
                                                <div>
                                                    <p className="text-sm text-gray-500">Fecha de compra</p>
                                                    <p className="font-medium">{order.date}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Total</p>
                                                    <p className="font-medium">${order.total.toLocaleString('es-CL')}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Número de orden</p>
                                                    <p className="font-medium">#{order.id}</p>
                                                </div>
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="text-[var(--color-brand-primary)] text-sm font-medium hover:underline flex items-center gap-1"
                                                >
                                                    <Eye size={16} />
                                                    Ver detalles
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 overflow-hidden">
                                                    <img src={order.products[0].image} alt={order.products[0].name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800">{order.products[0].name}</h3>
                                                    <p className="text-sm text-gray-600">{order.products[0].specs}</p>
                                                </div>
                                            </div>
                                            <div className={`mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 ${order.color} text-sm font-medium`}>
                                                <div className={`w-2 h-2 rounded-full ${order.dot}`} />
                                                {order.status}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* ORDER DETAIL VIEW */}
                            {activeTab === 'orders' && selectedOrder && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        <button
                                            onClick={() => setSelectedOrder(null)}
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <ArrowLeft size={24} className="text-gray-600" />
                                        </button>
                                        <h2 className="text-2xl font-bold text-[var(--color-brand-text)]">
                                            Compra Nº #{selectedOrder.id}
                                        </h2>
                                    </div>

                                    {/* Summary Card */}
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6 pb-6 border-b border-gray-50">
                                            <div>
                                                <p className="text-sm text-gray-500">Fecha de compra</p>
                                                <p className="font-medium">{selectedOrder.date}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">Número de orden</p>
                                                <p className="font-medium">#{selectedOrder.id}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Total</p>
                                                <p className="font-medium text-lg">${selectedOrder.total.toLocaleString('es-CL')}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">Fecha estimada de entrega</p>
                                                <p className="font-medium text-[var(--color-brand-primary)]">{selectedOrder.estimatedDelivery}</p>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div>
                                                <h3 className="font-bold text-gray-800 mb-2">Dirección de despacho</h3>
                                                <div className="text-gray-600 text-sm space-y-1">
                                                    <p>{selectedOrder.shippingAddress.street}</p>
                                                    <p>{selectedOrder.shippingAddress.commune}, {selectedOrder.shippingAddress.region}</p>
                                                    <p>{selectedOrder.shippingAddress.recipient} | {selectedOrder.shippingAddress.phone}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800 mb-2">Método de pago</h3>
                                                <p className="text-gray-600 text-sm">{selectedOrder.paymentMethod}</p>
                                            </div>
                                        </div>

                                        {/* Timeline */}
                                        <div>
                                            <h3 className="font-bold text-gray-800 mb-6">Estado de la orden</h3>
                                            <div className="flex justify-between relative">
                                                {/* Progress Bar Background */}
                                                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0" />

                                                {selectedOrder.timeline.map((step: any, index: number) => {
                                                    const Icon = step.icon;
                                                    return (
                                                        <div key={index} className="relative z-10 flex flex-col items-center text-center bg-white px-4">
                                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${step.completed
                                                                    ? 'bg-[var(--color-brand-primary)] text-white'
                                                                    : 'bg-gray-100 text-gray-400'
                                                                }`}>
                                                                <Icon size={20} />
                                                            </div>
                                                            {step.link ? (
                                                                <a
                                                                    href={step.link}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className={`text-sm font-medium hover:underline ${step.completed ? 'text-[var(--color-brand-primary)]' : 'text-gray-400'
                                                                        }`}
                                                                >
                                                                    {step.title}
                                                                </a>
                                                            ) : (
                                                                <p className={`text-sm font-medium ${step.completed ? 'text-[var(--color-brand-primary)]' : 'text-gray-400'
                                                                    }`}>
                                                                    {step.title}
                                                                </p>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Package Details */}
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-50">
                                            <h3 className="font-bold text-[var(--color-brand-primary)] border-l-4 border-[var(--color-brand-primary)] pl-3">
                                                Paquete Nº1
                                            </h3>
                                            <p className="text-sm font-medium text-gray-600">
                                                Nº de seguimiento: <span className="text-gray-900">{selectedOrder.trackingNumber}</span>
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            {selectedOrder.products.map((product: any, idx: number) => (
                                                <div key={idx} className="flex items-center gap-4">
                                                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-800">{product.name}</h4>
                                                        <p className="text-sm text-gray-600">{product.specs}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* PROFILE TAB */}
                            {activeTab === 'profile' && (
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-bold text-[var(--color-brand-text)] mb-6">Datos Personales</h2>
                                    <form onSubmit={handleProfileUpdate} className="space-y-6 max-w-xl">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Nombre Completo</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                                value={profileForm.name}
                                                onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                disabled
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                                value={profileForm.email}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Teléfono</label>
                                            <input
                                                type="tel"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                                value={profileForm.phone}
                                                onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                                                placeholder="+56 9..."
                                            />
                                        </div>
                                        <Button className="w-full md:w-auto px-8">Guardar Cambios</Button>
                                    </form>
                                </div>
                            )}

                            {/* ADDRESSES TAB */}
                            {activeTab === 'addresses' && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold text-[var(--color-brand-text)]">Mis Direcciones</h2>
                                        <button
                                            onClick={openNewAddress}
                                            className="flex items-center gap-2 text-[var(--color-brand-primary)] font-bold hover:underline"
                                        >
                                            <Plus size={20} /> Añadir dirección
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {user.addresses?.map((addr) => (
                                            <div key={addr.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-start">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="font-bold text-gray-800">{addr.title}</span>
                                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{addr.region}</span>
                                                    </div>
                                                    <p className="text-gray-600">{addr.address}</p>
                                                    <p className="text-gray-500 text-sm">{addr.commune}</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => openEditAddress(addr)}
                                                        className="text-[var(--color-brand-primary)] font-medium hover:underline text-sm"
                                                    >
                                                        Modificar
                                                    </button>
                                                    <button
                                                        onClick={() => deleteAddress(addr.id)}
                                                        className="text-red-500 font-medium hover:underline text-sm"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {(!user.addresses || user.addresses.length === 0) && (
                                            <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                                <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
                                                <p className="text-gray-500">No tienes direcciones guardadas</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* PASSWORD TAB */}
                            {activeTab === 'password' && (
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-bold text-[var(--color-brand-text)] mb-6">Cambiar Contraseña</h2>
                                    <form onSubmit={handlePasswordChange} className="space-y-6 max-w-xl">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Contraseña actual</label>
                                            <input
                                                type="password"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                                value={passwordForm.current}
                                                onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Contraseña nueva</label>
                                            <input
                                                type="password"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                                value={passwordForm.new}
                                                onChange={e => setPasswordForm({ ...passwordForm, new: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Confirmar contraseña nueva</label>
                                            <input
                                                type="password"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                                value={passwordForm.confirm}
                                                onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                                            />
                                        </div>
                                        <Button className="w-full md:w-auto px-8">Actualizar Contraseña</Button>
                                    </form>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Address Modal */}
            <AnimatePresence>
                {isAddressModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddressModalOpen(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
                        >
                            <h3 className="text-xl font-bold mb-6">{editingAddressId ? 'Modificar Dirección' : 'Nueva Dirección'}</h3>
                            <form onSubmit={handleAddressSubmit} className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Nombre (ej: Casa, Oficina)</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                        value={addressForm.title}
                                        onChange={e => setAddressForm({ ...addressForm, title: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 block mb-1">Región</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                            value={addressForm.region}
                                            onChange={e => setAddressForm({ ...addressForm, region: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 block mb-1">Comuna</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                            value={addressForm.commune}
                                            onChange={e => setAddressForm({ ...addressForm, commune: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Dirección</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                        value={addressForm.address}
                                        onChange={e => setAddressForm({ ...addressForm, address: e.target.value })}
                                    />
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddressModalOpen(false)}
                                        className="flex-1 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <Button className="flex-1 py-3">Guardar</Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
