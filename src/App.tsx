import { Header } from './components/layout/Header';
import { Hero } from './components/layout/Hero';
import { ProductGrid } from './components/products/ProductGrid';

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-brand-background)]">
      <Header />
      <main>
        <Hero />
        <ProductGrid />
      </main>

      <footer className="bg-[var(--color-brand-text)] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="opacity-80">© 2024 Dulces Marce. Hecho con amor.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
