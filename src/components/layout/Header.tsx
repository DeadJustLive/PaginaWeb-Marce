import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, User as UserIcon, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
        navigate('/');
    };

    const scrollToFooter = () => {
        const footer = document.getElementById('footer');
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
                    }`}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    {/* Mobile Menu Button & Logo */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            className="p-1 text-[var(--color-brand-text)]"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <Link to="/" className="flex items-center gap-2">
                            <div className="p-1.5 bg-[var(--color-brand-primary)] rounded-full text-white">
                                <ShoppingBag size={20} />
                            </div>
                            <span className="text-lg font-bold text-[var(--color-brand-secondary)]">
                                Dulces Marce
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Logo */}
                    <Link to="/" className="hidden md:flex items-center gap-2">
                        <div className="p-2 bg-[var(--color-brand-primary)] rounded-full text-white">
                            <ShoppingBag size={24} />
                        </div>
                        <span className="text-xl font-bold text-[var(--color-brand-secondary)]">
                            Dulces Marce
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-[var(--color-brand-text)] hover:text-[var(--color-brand-primary)] font-medium transition-colors">Inicio</Link>
                        <a href="#productos" className="text-[var(--color-brand-text)] hover:text-[var(--color-brand-primary)] font-medium transition-colors">Productos</a>
                        <button
                            onClick={scrollToFooter}
                            className="text-[var(--color-brand-text)] hover:text-[var(--color-brand-primary)] font-medium transition-colors"
                        >
                            Contacto
                        </button>

                        {/* Auth Button / User Menu */}
                        <div className="relative ml-4 border-l pl-8 border-gray-200">
                            {!isAuthenticated ? (
                                <button
                                    onClick={() => setIsAuthModalOpen(true)}
                                    className="flex items-center gap-2 text-[var(--color-brand-primary)] font-bold hover:bg-[var(--color-brand-primary)] hover:text-white px-4 py-2 rounded-full transition-all border border-[var(--color-brand-primary)]"
                                >
                                    <UserIcon size={20} />
                                    <span>Iniciar Sesión</span>
                                </button>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-xl transition-colors"
                                    >
                                        <div className="w-10 h-10 bg-[var(--color-brand-primary)] rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                        <div className="text-left hidden lg:block">
                                            <p className="text-sm font-bold text-gray-800 leading-none">{user?.name?.split(' ')[0]}</p>
                                            <p className="text-xs text-gray-500">Mi Cuenta</p>
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isUserMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2"
                                            >
                                                <div className="px-4 py-3 border-b border-gray-50 mb-2">
                                                    <p className="font-bold text-gray-800">{user?.name}</p>
                                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                                </div>

                                                <Link
                                                    to="/profile"
                                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                >
                                                    <Settings size={18} />
                                                    <span>Mi Perfil</span>
                                                </Link>

                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-colors"
                                                >
                                                    <LogOut size={18} />
                                                    <span>Cerrar Sesión</span>
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Right Icons (User & Cart placeholder if needed) */}
                    <div className="flex items-center gap-3 md:hidden">
                        {!isAuthenticated ? (
                            <button
                                onClick={() => setIsAuthModalOpen(true)}
                                className="p-2 text-[var(--color-brand-text)]"
                            >
                                <UserIcon size={24} />
                            </button>
                        ) : (
                            <Link to="/profile" className="w-8 h-8 bg-[var(--color-brand-primary)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {user?.name?.charAt(0).toUpperCase()}
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                        >
                            <div className="flex flex-col p-4 gap-4">
                                {!isAuthenticated ? (
                                    <button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            setIsAuthModalOpen(true);
                                        }}
                                        className="flex items-center gap-3 p-4 bg-[var(--color-brand-primary)] text-white rounded-xl font-bold justify-center"
                                    >
                                        <UserIcon size={20} />
                                        Iniciar Sesión
                                    </button>
                                ) : (
                                    <div className="bg-gray-50 p-4 rounded-xl mb-2">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-[var(--color-brand-primary)] rounded-full flex items-center justify-center text-white font-bold">
                                                {user?.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">{user?.name}</p>
                                                <p className="text-xs text-gray-500">{user?.email}</p>
                                            </div>
                                        </div>
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 mb-2 text-gray-700"
                                        >
                                            <Settings size={18} />
                                            Mi Perfil
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 p-3 bg-white rounded-lg border border-red-100 text-red-500"
                                        >
                                            <LogOut size={18} />
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                )}

                                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-[var(--color-brand-text)]">Inicio</Link>
                                <a href="#productos" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-[var(--color-brand-text)]">Productos</a>
                                <button onClick={scrollToFooter} className="text-lg font-medium text-[var(--color-brand-text)] text-left">Contacto</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
};
