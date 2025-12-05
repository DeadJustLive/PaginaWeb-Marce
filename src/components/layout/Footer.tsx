import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, ShieldCheck, CreditCard, Truck, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer id="footer" className="w-full">
            {/* Features Bar */}
            <div className="bg-white py-8 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mb-4 text-[var(--color-brand-primary)] group-hover:scale-110 transition-transform">
                                <Headphones size={32} />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Atención Personalizada</h3>
                            <p className="text-sm text-gray-500">Resolvemos tus dudas al instante</p>
                        </div>
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mb-4 text-[var(--color-brand-primary)] group-hover:scale-110 transition-transform">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Calidad Garantizada</h3>
                            <p className="text-sm text-gray-500">Productos frescos y seleccionados</p>
                        </div>
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mb-4 text-[var(--color-brand-primary)] group-hover:scale-110 transition-transform">
                                <CreditCard size={32} />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Pago Seguro</h3>
                            <p className="text-sm text-gray-500">Transferencia y Webpay</p>
                        </div>
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mb-4 text-[var(--color-brand-primary)] group-hover:scale-110 transition-transform">
                                <Truck size={32} />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Envíos a todo Chile</h3>
                            <p className="text-sm text-gray-500">Starken y Chilexpress</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="bg-[#1a1a2e] text-white pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                        {/* Column 1 */}
                        <div>
                            <h4 className="text-lg font-bold mb-6 border-l-4 border-[var(--color-brand-primary)] pl-3">Ayuda</h4>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li><Link to="/como-comprar" className="hover:text-white transition-colors">Cómo comprar</Link></li>
                                <li><Link to="/envios" className="hover:text-white transition-colors">Envíos y entregas</Link></li>
                                <li><Link to="/preguntas-frecuentes" className="hover:text-white transition-colors">Preguntas frecuentes</Link></li>
                                <li>
                                    <button
                                        onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="hover:text-white transition-colors"
                                    >
                                        Contacto
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div>
                            <h4 className="text-lg font-bold mb-6 border-l-4 border-[var(--color-brand-primary)] pl-3">Nosotros</h4>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li><Link to="/nosotros" className="hover:text-white transition-colors">Nuestra historia</Link></li>
                                <li><Link to="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
                                <li><Link to="/privacidad" className="hover:text-white transition-colors">Políticas de privacidad</Link></li>
                            </ul>
                        </div>

                        {/* Column 3 */}
                        <div>
                            <h4 className="text-lg font-bold mb-6 border-l-4 border-[var(--color-brand-primary)] pl-3">Síguenos</h4>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Instagram size={16} /> Instagram</a></li>
                                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Facebook size={16} /> Facebook</a></li>
                            </ul>
                        </div>

                        {/* Column 4 - Contact Info */}
                        <div>
                            <h4 className="text-lg font-bold mb-6 border-l-4 border-[var(--color-brand-primary)] pl-3">Contacto</h4>
                            <div className="text-gray-400 text-sm space-y-4">
                                <p>Región Metropolitana, Chile</p>
                                <div>
                                    <p className="font-bold text-white mb-1">Horario de Atención:</p>
                                    <p>Lunes a Viernes - 09:00 a 19:00</p>
                                    <p>Sábados - 10:00 a 14:00</p>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-brand-primary)] transition-colors text-white">
                                        <Instagram size={20} />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-brand-primary)] transition-colors text-white">
                                        <Facebook size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods & Copyright */}
                    <div className="border-t border-gray-800 pt-8 mt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-gray-500 text-xs">
                                <h5 className="font-bold text-gray-400 mb-2 uppercase tracking-wider">Medios de pago</h5>
                                <div className="flex flex-wrap gap-4 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                                    <span className="font-bold text-lg text-white">Webpay</span>
                                    <span className="font-bold text-lg text-blue-400">MercadoPago</span>
                                    <span className="font-bold text-lg text-red-500">Santander</span>
                                    <span className="font-bold text-lg text-orange-500">BancoEstado</span>
                                </div>
                            </div>

                            <div className="text-center md:text-right text-gray-600 text-xs">
                                <p>© 2024 Dulces Marce | Todos los derechos reservados</p>
                                <p className="mt-1">Hecho con ❤️ para ti</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
