import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { Gender, SubCategory, PageTab } from '@/types/fashion';

interface NavbarProps {
  cartCount: number;
  currentPage: PageTab;
  onNavigatePage: (page: PageTab) => void;
  onOpenCart: () => void;
  onSelectCategory: (gender: Gender, subCategory: SubCategory) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  currentPage,
  onNavigatePage,
  onOpenCart,
  onSelectCategory,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menCategories: { name: string; sub: SubCategory }[] = [
    { name: "Men's All Styles", sub: 'All' },
    { name: "Men's Luxury Shirts", sub: 'Shirts' },
    { name: "Men's Pima & Cashmere Tees", sub: 'T-Shirts' },
    { name: "Men's Wool & Linen Trousers", sub: 'Trousers' },
    { name: "Men's Cashmere Coats & Blazers", sub: 'Outerwear' },
  ];

  const womenCategories: { name: string; sub: SubCategory }[] = [
    { name: "Women's All Styles", sub: 'All' },
    { name: "Women's Silk Evening Gowns", sub: 'Dresses' },
    { name: "Women's Draped Silk Blouses", sub: 'Shirts' },
    { name: "Women's High-Rise Trousers", sub: 'Trousers' },
    { name: "Women's Leather Bags & Footwear", sub: 'Bags' },
  ];

  const handleDropdownSelect = (gender: Gender, sub: SubCategory) => {
    onSelectCategory(gender, sub);
    setShopDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-cream-300 py-3 shadow-md'
          : 'bg-white/90 backdrop-blur-sm border-b border-cream-200 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => onNavigatePage('home')}
          className="flex flex-col text-left group cursor-pointer"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-[0.24em] text-espresso-950 group-hover:text-rose-600 transition-colors uppercase font-medium">
            MAISON ÉCRU
          </span>
          <span className="font-mono text-[8px] tracking-[0.35em] text-espresso-700 uppercase">
            PARIS • NEW DELHI
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.18em]">
          
          <button
            onClick={() => onNavigatePage('home')}
            className={`py-1.5 transition-colors font-semibold relative ${
              currentPage === 'home'
                ? 'text-espresso-950 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-espresso-900'
                : 'text-espresso-700 hover:text-espresso-950'
            }`}
          >
            Home
          </button>

          {/* Shop with Shopify-Style Fashion Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
          >
            <button
              onClick={() => onNavigatePage('shop')}
              className={`flex items-center gap-1 py-1.5 transition-colors font-semibold relative ${
                currentPage === 'shop'
                  ? 'text-espresso-950 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-espresso-900'
                  : 'text-espresso-700 hover:text-espresso-950'
              }`}
            >
              <span>Shop</span>
              <ChevronDown className="w-3 h-3 text-espresso-700 transition-transform duration-200 group-hover:rotate-180" />
            </button>

            {/* Shopify-Style Multi-Column Mega Dropdown */}
            {shopDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] bg-white border border-cream-300 shadow-2xl p-6 mt-1 rounded-sm grid grid-cols-2 gap-6 z-50 animate-fade-in text-left">
                
                {/* Men's Column */}
                <div>
                  <div className="text-[11px] font-mono text-espresso-900 font-bold uppercase tracking-widest pb-2 border-b border-sage-200 mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sage-400" />
                    <span>Men's Collection</span>
                  </div>
                  <div className="space-y-1">
                    {menCategories.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleDropdownSelect('Men', item.sub)}
                        className="w-full text-left py-1.5 px-2 text-[11px] text-espresso-700 hover:text-espresso-950 hover:bg-sage-50 rounded-none transition-colors flex items-center justify-between"
                      >
                        <span>{item.name}</span>
                        <span className="text-[9px] text-sage-600 font-mono">→</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Women's Column */}
                <div>
                  <div className="text-[11px] font-mono text-espresso-900 font-bold uppercase tracking-widest pb-2 border-b border-rose-200 mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span>Women's Collection</span>
                  </div>
                  <div className="space-y-1">
                    {womenCategories.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleDropdownSelect('Women', item.sub)}
                        className="w-full text-left py-1.5 px-2 text-[11px] text-espresso-700 hover:text-espresso-950 hover:bg-rose-50 rounded-none transition-colors flex items-center justify-between"
                      >
                        <span>{item.name}</span>
                        <span className="text-[9px] text-rose-600 font-mono">→</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

          <button
            onClick={() => onNavigatePage('collections')}
            className={`py-1.5 transition-colors font-semibold relative ${
              currentPage === 'collections'
                ? 'text-espresso-950 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-espresso-900'
                : 'text-espresso-700 hover:text-espresso-950'
            }`}
          >
            Collections
          </button>

          <button
            onClick={() => onNavigatePage('journal')}
            className={`py-1.5 transition-colors font-semibold relative ${
              currentPage === 'journal'
                ? 'text-espresso-950 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-espresso-900'
                : 'text-espresso-700 hover:text-espresso-950'
            }`}
          >
            Blog
          </button>

          <button
            onClick={() => onNavigatePage('about')}
            className={`py-1.5 transition-colors font-semibold relative ${
              currentPage === 'about'
                ? 'text-espresso-950 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-espresso-900'
                : 'text-espresso-700 hover:text-espresso-950'
            }`}
          >
            About Us
          </button>

        </nav>

        {/* Right Actions: Currency (INR ₹) & Shopping Bag */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full border border-cream-300 bg-cream-100 font-mono text-[11px] text-espresso-900 font-bold shadow-sm">
            <span>₹ INR (India)</span>
          </div>

          <button
            onClick={onOpenCart}
            aria-label="Open Shopping Bag"
            className="relative p-2.5 rounded-full border border-cream-300 bg-white hover:bg-cream-100 text-espresso-950 transition-all shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-espresso-950 text-white font-mono text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-espresso-950 hover:text-rose-600"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-cream-300 px-6 py-5 flex flex-col gap-3 animate-fade-in text-xs uppercase tracking-widest shadow-xl">
          <button
            onClick={() => { onNavigatePage('home'); setMobileMenuOpen(false); }}
            className="py-2.5 text-left border-b border-cream-100 text-espresso-950 font-semibold"
          >
            Home
          </button>
          <button
            onClick={() => { onNavigatePage('shop'); setMobileMenuOpen(false); }}
            className="py-2.5 text-left border-b border-cream-100 text-espresso-950 font-semibold"
          >
            Shop All Garments
          </button>
          <button
            onClick={() => { handleDropdownSelect('Men', 'All'); }}
            className="py-1.5 pl-3 text-left text-sage-800 text-[11px]"
          >
            → Men's Shirts, Tees & Pants
          </button>
          <button
            onClick={() => { handleDropdownSelect('Women', 'All'); }}
            className="py-1.5 pl-3 text-left text-rose-800 text-[11px] border-b border-cream-100 pb-2.5"
          >
            → Women's Gowns, Blouses & Bags
          </button>
          <button
            onClick={() => { onNavigatePage('collections'); setMobileMenuOpen(false); }}
            className="py-2.5 text-left border-b border-cream-100 text-espresso-950 font-semibold"
          >
            Collections & Categories
          </button>
          <button
            onClick={() => { onNavigatePage('journal'); setMobileMenuOpen(false); }}
            className="py-2.5 text-left border-b border-cream-100 text-espresso-950 font-semibold"
          >
            Maison Blog & Stories
          </button>
          <button
            onClick={() => { onNavigatePage('about'); setMobileMenuOpen(false); }}
            className="py-2.5 text-left text-espresso-950 font-semibold"
          >
            About Us & Savoir-Faire
          </button>
        </div>
      )}
    </header>
  );
};
