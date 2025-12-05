import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

export const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { resetPassword } = useAuth();
    const email = (location.state as any)?.email;

    const [step, setStep] = useState<1 | 2>(1);
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    if (!email) {
        navigate('/');
        return null;
    }

    const handleVerifyCode = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app we might verify code here, but for this mock we'll verify at the end
        if (code.length < 4) {
            setError('El código debe tener 4 caracteres');
            return;
        }
        setError(null);
        setStep(2);
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            setIsLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            setIsLoading(false);
            return;
        }

        try {
            await resetPassword(email, code, newPassword);
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Error al restablecer la contraseña');
            if (err.message === 'Código incorrecto' || err.message === 'El código ha expirado') {
                setStep(1);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-12 px-4 bg-gray-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden p-8">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[var(--color-brand-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--color-brand-primary)]">
                        <KeyRound size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--color-brand-text)]">Recuperar Contraseña</h1>
                    <p className="text-gray-600 text-sm mt-2">
                        {step === 1 ? `Ingresa el código enviado a ${email}` : 'Crea tu nueva contraseña'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 flex items-center gap-2 text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <AnimatePresence mode='wait'>
                    {step === 1 ? (
                        <motion.form
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleVerifyCode}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Código de Verificación</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={4}
                                    placeholder="Ej: ABC1"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none text-center text-2xl tracking-widest uppercase"
                                    value={code}
                                    onChange={e => setCode(e.target.value.toUpperCase())}
                                />
                                <p className="text-xs text-center text-gray-400">El código expira en 30 minutos</p>
                            </div>

                            <Button className="w-full py-3">
                                Verificar Código <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleReset}
                            className="space-y-6"
                        >
                            <div className="space-y-4">
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="password"
                                        required
                                        placeholder="Nueva Contraseña"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="password"
                                        required
                                        placeholder="Confirmar Contraseña"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <Button className="w-full py-3" disabled={isLoading}>
                                {isLoading ? 'Actualizando...' : 'Cambiar Contraseña'}
                            </Button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
