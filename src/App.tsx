import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Hero } from './components/layout/Hero';
import { ProductGrid } from './components/products/ProductGrid';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { CartModal } from './components/cart/CartModal';
import { FloatingCartButton } from './components/cart/FloatingCartButton';
import { CheckoutPage } from './pages/CheckoutPage';
import { AuthPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import { RegisterPage } from './pages/RegisterPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-[var(--color-brand-background)]">
            <Header />
            <CartModal />
            <FloatingCartButton />

            <div>
              <Routes>
                <Route path="/" element={
                  <main>
                    <Hero />
                    <ProductGrid />
                  </main>
                } />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
              </Routes>
            </div>

            <footer className="bg-[var(--color-brand-text)] text-white py-12">
              <div className="container mx-auto px-4 text-center">
                <p className="opacity-80">© 2024 Dulces Marce. Hecho con amor.</p>
              </div>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
