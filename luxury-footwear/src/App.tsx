import React, { useState, useEffect } from 'react';
import { useLenis, scrollToTop } from './hooks/useLenis';
import { useGsapTriggers } from './hooks/useGsapTriggers';
import { useCart } from './hooks/useCart';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetail } from './components/product/ProductDetail';
import { CollectionsPage } from './pages/CollectionsPage';
import { JournalPage } from './pages/JournalPage';
import { AboutPage } from './pages/AboutPage';
import { QuickViewModal } from './components/shop/QuickViewModal';
import { CartDrawer } from './components/cart/CartDrawer';
import type { ShoeProduct } from './types/footwear';
import { LUXURY_SHOES } from './data/products';

export function App() {
  useLenis(); // Lenis smooth scroll engine
  
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');
  const [selectedProduct, setSelectedProduct] = useState<ShoeProduct | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<ShoeProduct | null>(null);
  const [filterDept, setFilterDept] = useState<string>('All');

  // GSAP ScrollTrigger active across sections (background morphing & card staggers)
  useGsapTriggers(currentHash);

  const {
    items: cartItems,
    isOpen: isCartOpen,
    setIsOpen: setCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalCount,
  } = useCart();

  // Handle Hash Change & Browser Navigation (Back / Forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      setCurrentHash(hash);

      if (hash.startsWith('#product/')) {
        const slug = hash.replace('#product/', '');
        const found = LUXURY_SHOES.find((p) => p.slug === slug || p.id === slug);
        if (found) {
          setSelectedProduct(found);
        }
      } else {
        setSelectedProduct(null);
      }

      // Reset scroll position to top on page/hash change
      scrollToTop(true);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Sync initial state

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (hash: string) => {
    scrollToTop(true);
    window.location.hash = hash;
  };

  const handleSelectProduct = (product: ShoeProduct) => {
    scrollToTop(true);
    setSelectedProduct(product);
    window.location.hash = `#product/${product.slug}`;
  };

  const handleNavigateShop = (dept = 'All') => {
    scrollToTop(true);
    setFilterDept(dept);
    if (window.location.hash === '#shop') {
      scrollToTop(true);
    } else {
      navigateTo('#shop');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#FF4D00] selection:text-white">
      {/* Sticky Transform Navbar */}
      <Navbar
        cartCount={totalCount}
        onOpenCart={() => setCartOpen(true)}
        currentHash={currentHash}
        onNavigate={navigateTo}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={() => navigateTo('#shop')}
            onAddToCart={addToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={handleSelectProduct}
          />
        ) : currentHash === '#shop' ? (
          <ShopPage
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={handleSelectProduct}
            initialDept={filterDept}
          />
        ) : currentHash === '#collections' ? (
          <CollectionsPage onNavigateShop={handleNavigateShop} />
        ) : currentHash === '#journal' ? (
          <JournalPage />
        ) : currentHash === '#about' ? (
          <AboutPage />
        ) : (
          <HomePage
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            onNavigateShop={handleNavigateShop}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Modals & Drawers */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
        onSelectProduct={handleSelectProduct}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
        subtotal={subtotal}
      />
    </div>
  );
}

export default App;
