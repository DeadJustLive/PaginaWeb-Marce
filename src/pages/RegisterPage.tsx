import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, MapPin, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

export const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        region: '',
        commune: '',
        address: ''
    });

    const [showAddress, setShowAddress] = useState(false);

    const validateInput = (text: string) => {
        // Basic sanitization: allow letters, numbers, spaces, and common punctuation
        return text.replace(/[^a-zA-Z0-9\s@.,_-]/g, '');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: validateInput(value)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            setIsLoading(false);
            return;
        }

        try {
            const addressData = showAddress && formData.address ? {
                title: 'Casa',
                region: formData.region,
                commune: formData.commune,
                address: formData.address
            } : undefined;

            await register(formData.email, formData.password, formData.name, addressData);
            navigate('/');
        } catch (err) {
            setError('Ocurrió un error al registrarse. Inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-12 px-4 bg-gray-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                {/* Form Section */}
                <div className="flex-1 p-8 md:p-12">
                    <div className="mb-8">
                        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-[var(--color-brand-primary)] mb-6 transition-colors">
                            <ArrowLeft size={20} className="mr-2" />
                            Volver al inicio
                        </Link>
                        <h1 className="text-3xl font-bold text-[var(--color-brand-text)] mb-2">Crear Cuenta</h1>
                        <p className="text-gray-600">Únete a Dulces Marce y gestiona tus pedidos fácilmente.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 flex items-center gap-2 text-sm">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Info */}
                        <div className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Nombre Completo"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none transition-all"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Correo Electrónico"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none transition-all"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Contraseña"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none transition-all"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    placeholder="Confirmar Contraseña"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none transition-all"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Optional Address Toggle */}
                        <div className="pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => setShowAddress(!showAddress)}
                                className="flex items-center gap-2 text-[var(--color-brand-secondary)] font-medium hover:text-[var(--color-brand-primary)] transition-colors"
                            >
                                {showAddress ? <CheckCircle size={20} className="text-green-500" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-300" />}
                                Agregar dirección de envío (Opcional)
                            </button>
                        </div>

                        {/* Address Fields */}
                        <motion.div
                            initial={false}
                            animate={{ height: showAddress ? 'auto' : 0, opacity: showAddress ? 1 : 0 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-4 pt-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        name="region"
                                        type="text"
                                        placeholder="Región"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                        value={formData.region}
                                        onChange={handleChange}
                                    />
                                    <input
                                        name="commune"
                                        type="text"
                                        placeholder="Comuna"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                        value={formData.commune}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        name="address"
                                        type="text"
                                        placeholder="Calle y Número"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <Button className="w-full py-4 text-lg shadow-lg" disabled={isLoading}>
                            {isLoading ? 'Creando cuenta...' : 'Registrarme'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};
