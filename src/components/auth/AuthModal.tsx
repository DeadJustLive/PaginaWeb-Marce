import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const { login, requestPasswordReset } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isForgotPassword) {
                await requestPasswordReset(formData.email);
                onClose();
                navigate('/reset-password', { state: { email: formData.email } });
            } else {
                await login(formData.email, formData.password);
                onClose();
            }
        } catch (error) {
            console.error('Auth error:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-[var(--color-brand-primary)] p-6 text-white text-center relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-2xl font-bold mb-2">
                            {isForgotPassword ? 'Recuperar Contraseña' : '¡Hola de nuevo!'}
                        </h2>
                        <p className="text-white/80">
                            {isForgotPassword
                                ? 'Ingresa tu email para recibir un código'
                                : 'Ingresa a tu cuenta para continuar'}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email</label>
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

                            {!isForgotPassword && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Contraseña</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none transition-all"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <Button className="w-full py-4 text-lg shadow-lg mt-6">
                                {isForgotPassword ? 'Enviar Código' : 'Iniciar Sesión'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center space-y-4">
                            {!isForgotPassword ? (
                                <>
                                    <button className="text-[var(--color-brand-primary)] hover:underline text-sm font-medium" onClick={() => setIsForgotPassword(true)}>
                                        ¿Olvidaste tu contraseña?
                                    </button>

                                    <div className="pt-4 border-t border-gray-100">
                                        <p className="text-gray-600 text-sm mb-2">
                                            ¿No tienes cuenta?
                                        </p>
                                        <button
                                            onClick={() => {
                                                onClose();
                                                navigate('/register');
                                            }}
                                            className="text-[var(--color-brand-primary)] font-bold hover:underline flex items-center justify-center gap-1 mx-auto"
                                        >
                                            Crear Cuenta <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsForgotPassword(false)}
                                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                                >
                                    Volver al inicio de sesión
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
