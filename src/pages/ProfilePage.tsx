import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, MapPin, Package, LogOut, Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

    if (!user) {
        navigate('/');
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8 pt-28 max-w-4xl">
            <h1 className="text-3xl font-bold text-[var(--color-brand-text)] mb-8">Mi Cuenta</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="md:col-span-1 space-y-2">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'profile'
                            ? 'bg-[var(--color-brand-primary)] text-white shadow-lg'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <User size={20} />
                        <span className="font-medium">Perfil</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders'
                            ? 'bg-[var(--color-brand-primary)] text-white shadow-lg'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Package size={20} />
                        <span className="font-medium">Mis Pedidos</span>
                    </button>
                    <button
                        onClick={() => {
                            logout();
                            navigate('/');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Cerrar Sesión</span>
                    </button>
                </div>

                {/* Content */}
                <div className="md:col-span-3">
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            {/* Personal Info */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-[var(--color-brand-text)] mb-6 flex items-center gap-2">
                                    <User className="text-[var(--color-brand-secondary)]" />
                                    Información Personal
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm text-gray-500 block mb-1">Nombre Completo</label>
                                        <p className="font-medium text-gray-800 text-lg">{user.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500 block mb-1">Email</label>
                                        <p className="font-medium text-gray-800 text-lg">{user.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500 block mb-1">Teléfono</label>
                                        <p className="font-medium text-gray-800 text-lg">{user.phone || 'No registrado'}</p>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <Button variant="outline" className="text-sm">
                                        Editar Información
                                    </Button>
                                </div>
                            </div>

                            {/* Addresses */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-[var(--color-brand-text)] flex items-center gap-2">
                                        <MapPin className="text-[var(--color-brand-secondary)]" />
                                        Mis Direcciones
                                    </h2>
                                    <button className="text-[var(--color-brand-primary)] hover:bg-red-50 p-2 rounded-full transition-colors">
                                        <Plus size={20} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {user.addresses?.map((addr) => (
                                        <div key={addr.id} className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors flex items-center justify-between group">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-gray-800">{addr.title}</span>
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{addr.commune}</span>
                                                </div>
                                                <p className="text-gray-600 text-sm mt-1">{addr.address}</p>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-gray-400 hover:text-[var(--color-brand-primary)] hover:bg-red-50 rounded-lg transition-colors">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {(!user.addresses || user.addresses.length === 0) && (
                                        <div className="text-center py-8 text-gray-400">
                                            <MapPin size={48} className="mx-auto mb-3 opacity-20" />
                                            <p>No tienes direcciones guardadas</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-[var(--color-brand-text)] mb-6 flex items-center gap-2">
                                <Package className="text-[var(--color-brand-secondary)]" />
                                Historial de Pedidos
                            </h2>

                            {/* Mock Orders */}
                            <div className="space-y-4">
                                <div className="border border-gray-100 rounded-xl p-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="font-bold text-gray-800 block">Pedido #12345</span>
                                            <span className="text-sm text-gray-500">04 Dic 2024</span>
                                        </div>
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                            Entregado
                                        </span>
                                    </div>
                                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0"></div>
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0"></div>
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0"></div>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                        <span className="font-bold text-[var(--color-brand-text)]">$45.990</span>
                                        <Button variant="outline" className="text-sm py-2">Ver Detalles</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
