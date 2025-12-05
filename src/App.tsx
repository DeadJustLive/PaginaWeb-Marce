import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Hero } from './components/layout/Hero';
import { ProductGrid } from './components/products/ProductGrid';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { CartModal } from './components/cart/CartModal';
import { FloatingCartButton } from './components/cart/FloatingCartButton';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProfilePage } from './pages/ProfilePage';
import { RegisterPage } from './pages/RegisterPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { HowToBuyPage } from './pages/HowToBuyPage';
import { ShippingPage } from './pages/ShippingPage';
import { FAQPage } from './pages/FAQPage';
import { AboutPage } from './pages/AboutPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { Footer } from './components/layout/Footer';
import { AuthModal } from './components/auth/AuthModal'; // Assuming path for AuthModal

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={
                  <>
                    <main>
                      <Hero />
                      <div className="container mx-auto px-4 py-8">
                        <ProductGrid />
                      </div>
                    </main>
                    <FloatingCartButton />
                  </>
                } />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/profile" element={<ProfilePage />} />

                {/* Informational Pages */}
                <Route path="/como-comprar" element={<HowToBuyPage />} />
                <Route path="/envios" element={<ShippingPage />} />
                <Route path="/preguntas-frecuentes" element={<FAQPage />} />
                <Route path="/nosotros" element={<AboutPage />} />
                <Route path="/terminos" element={<TermsPage />} />
                <Route path="/privacidad" element={<PrivacyPage />} />
              </Routes>
            </div>
            <Footer />
            <CartModal />
            <AuthModal />
          </div>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
