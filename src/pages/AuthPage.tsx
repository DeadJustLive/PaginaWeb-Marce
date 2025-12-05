import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

export const AuthPage: React.FC = () => {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const { login, register, loginAsGuest } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect to where they came from or home
    const from = (location.state as any)?.from?.pathname || '/';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'login') {
            await login(formData.email, formData.password);
        } else {
            await register(formData.email, formData.password, formData.name);
        }
        navigate(from, { replace: true });
    };

    const handleGuest = () => {
        loginAsGuest();
        navigate(from, { replace: true });
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 pt-28">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden">
                {/* Header Tabs */}
                <div className="flex border-b border-gray-100">
                    <button
                        onClick={() => setMode('login')}
                        className={`flex-1 py-4 text-center font-bold transition-colors ${mode === 'login'
                            ? 'text-[var(--color-brand-primary)] border-b-2 border-[var(--color-brand-primary)]'
                            : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        onClick={() => setMode('register')}
                        className={`flex-1 py-4 text-center font-bold transition-colors ${mode === 'register'
                            ? 'text-[var(--color-brand-primary)] border-b-2 border-[var(--color-brand-primary)]'
                            : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        Registrarse
                    </button>
                </div>

                <div className="p-8">
                    <AnimatePresence mode='wait'>
                        <motion.form
                            key={mode}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            {mode === 'register' && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ml-1">Nombre</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            required
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none transition-all"
                                            placeholder="Tu nombre"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none transition-all"
                                        placeholder="tu@email.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 ml-1">Contraseña</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none transition-all"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <Button className="w-full py-3 mt-4 text-lg shadow-lg">
                                {mode === 'login' ? 'Entrar' : 'Crear Cuenta'}
                            </Button>
                        </motion.form>
                    </AnimatePresence>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="text-center text-gray-500 text-sm mb-4">¿Solo quieres comprar rápido?</p>
                        <button
                            onClick={handleGuest}
                            className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-600 font-bold hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] transition-all flex items-center justify-center gap-2"
                        >
                            Continuar como Invitado
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
