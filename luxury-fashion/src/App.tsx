import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { ShopByCategory } from '@/components/sections/ShopByCategory';
import { FeaturedArrivals } from '@/components/sections/FeaturedArrivals';
import { SavoirFaireSection } from '@/components/sections/SavoirFaireSection';
import { ShopSection } from '@/components/sections/ShopSection';
import { FashionJournal } from '@/components/sections/FashionJournal';
import { AboutUs } from '@/components/sections/AboutUs';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { QuickViewModal } from '@/components/sections/QuickViewModal';
import { Product, CartItem, Gender, SubCategory, PageTab } from '@/types/fashion';

export const App: React.FC = () => {
  // Read initial hash from URL or default to 'home'
  const getPageFromHash = (): PageTab => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'shop') return 'shop';
    if (hash === 'collections') return 'collections';
    if (hash === 'journal' || hash === 'blog') return 'journal';
    if (hash === 'about') return 'about';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageTab>(getPageFromHash);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState<Gender>('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>('All');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync with Browser History (Back / Forward button support)
  useEffect(() => {
    const handleHashOrPopState = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
      // Close open modals when navigating via browser back/forward
      setQuickViewProduct(null);
      setIsCartOpen(false);
    };

    window.addEventListener('popstate', handleHashOrPopState);
    window.addEventListener('hashchange', handleHashOrPopState);

    // Handle Esc key to close any modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuickViewProduct(null);
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleHashOrPopState);
      window.removeEventListener('hashchange', handleHashOrPopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Navigate Page with history push
  const handleNavigatePage = (page: PageTab) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQuickViewProduct(null);
    setIsCartOpen(false);
  };

  const handleSelectCategory = (gender: Gender, subCategory: SubCategory) => {
    setSelectedGender(gender);
    setSelectedSubCategory(subCategory);
    setCurrentPage('shop');
    window.location.hash = '#shop';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Operations
  const handleAddToCart = (product: Product, color: string, size: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            product,
            selectedColor: color,
            selectedSize: size,
            quantity: 1,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-cream-100 text-espresso-950 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={handleSelectCategory}
      />

      <main className="flex-1">
        
        {/* ======================================================== */}
        {/* PAGE 1: HOME                                            */}
        {/* ======================================================== */}
        {currentPage === 'home' && (
          <>
            {/* 1. Hero: Resized portrait frame + pure pink buttons */}
            <HeroSection
              onShopMen={() => handleSelectCategory('Men', 'All')}
              onShopWomen={() => handleSelectCategory('Women', 'All')}
            />

            {/* 2. Shop by Department: 4 curated department cards */}
            <ShopByCategory onSelectCategory={handleSelectCategory} />

            {/* 3. Featured New Arrivals: 4 curated bestseller runway pieces */}
            <FeaturedArrivals
              onQuickView={(p) => setQuickViewProduct(p)}
              onAddToCart={handleAddToCart}
              onViewAll={() => handleNavigatePage('shop')}
            />

            {/* 4. Atelier Savoir-Faire: Editorial Craftsmanship Story */}
            <SavoirFaireSection
              onExploreHeritage={() => handleNavigatePage('about')}
            />

            {/* 5. Fashion Journal & Runway Stories */}
            <FashionJournal />

            {/* 6. About Us Heritage Preview */}
            <AboutUs />
          </>
        )}

        {/* ======================================================== */}
        {/* PAGE 2: SHOP (Dedicated Store Hub)                       */}
        {/* ======================================================== */}
        {currentPage === 'shop' && (
          <div className="pt-20">
            <ShopSection
              initialGender={selectedGender}
              initialSubCategory={selectedSubCategory}
              onBackToHome={() => handleNavigatePage('home')}
              onQuickView={(p) => setQuickViewProduct(p)}
              onAddToCart={handleAddToCart}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* PAGE 3: COLLECTIONS (Lookbooks & Sets)                   */}
        {/* ======================================================== */}
        {currentPage === 'collections' && (
          <div className="pt-20">
            <ShopByCategory onSelectCategory={handleSelectCategory} />
            <FeaturedArrivals
              onQuickView={(p) => setQuickViewProduct(p)}
              onAddToCart={handleAddToCart}
              onViewAll={() => handleNavigatePage('shop')}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* PAGE 4: BLOG & JOURNAL                                   */}
        {/* ======================================================== */}
        {currentPage === 'journal' && (
          <div className="pt-20">
            <FashionJournal />
          </div>
        )}

        {/* ======================================================== */}
        {/* PAGE 5: ABOUT US                                         */}
        {/* ======================================================== */}
        {currentPage === 'about' && (
          <div className="pt-20">
            <AboutUs />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Quick View Garment Inspection Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
};

export default App;
