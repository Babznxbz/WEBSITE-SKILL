import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  currentHash: string;
  onNavigate: (hash: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  currentHash,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', hash: '#home' },
    { label: 'Shop Catalog', hash: '#shop' },
    { label: 'Collections', hash: '#collections' },
    { label: 'Craft Journal', hash: '#journal' },
    { label: 'Atelier', hash: '#about' },
  ];

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-[#1A1A1A] text-white text-xs py-2 px-4 text-center font-medium tracking-wider flex justify-center items-center gap-2">
        <span>EXPRESS COMPLIMENTARY SHIPPING ACROSS INDIA & OVERSEAS</span>
        <span className="opacity-40">|</span>
        <span className="text-[#FF4D00] font-semibold flex items-center gap-1 cursor-pointer" onClick={() => onNavigate('#shop')}>
          EXPLORE HAUTE DROP 01 <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Sticky Transform Navbar Container */}
      <header
        className={cn(
          'fixed left-0 right-0 z-40 transition-all duration-500 flex justify-center px-4 md:px-8',
          isScrolled ? 'top-4' : 'top-10'
        )}
      >
        <div
          className={cn(
            'w-full max-w-7xl transition-all duration-500 flex items-center justify-between px-6 py-4',
            isScrolled
              ? 'bg-[#1A1A1A]/90 backdrop-blur-md text-white rounded-full shadow-2xl border border-white/10 py-3'
              : 'bg-transparent text-[#0A0A0A]'
          )}
        >
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('#home')}
            className="text-left font-display font-extrabold text-xl md:text-2xl tracking-tighter flex items-center gap-2 group"
          >
            <span className="bg-[#FF4D00] text-white text-xs px-2 py-0.5 rounded font-mono font-bold">
              FR×IN
            </span>
            <span>VÉLOCE<span className="text-[#FF4D00]">.</span></span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <button
                key={link.hash}
                onClick={() => onNavigate(link.hash)}
                className={cn(
                  'relative py-1 transition-colors hover:text-[#FF4D00]',
                  currentHash === link.hash ? 'text-[#FF4D00] font-semibold' : ''
                )}
              >
                {link.label}
                {currentHash === link.hash && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4D00] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('#shop')}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-[#FF4D00] text-white rounded-full hover:bg-[#E04400] transition-all hover:scale-105 shadow-lg flex items-center justify-center"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-[#1A1A1A] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FF4D00]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A] text-white flex flex-col justify-between p-8 animate-in fade-in duration-300">
          <div className="flex justify-between items-center">
            <span className="font-display font-bold text-2xl">VÉLOCE ATELIER</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full bg-white/10">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-6 text-2xl font-display font-semibold">
            {navLinks.map((link) => (
              <button
                key={link.hash}
                onClick={() => {
                  onNavigate(link.hash);
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:text-[#FF4D00] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 flex justify-between text-xs text-white/60">
            <span>PARIS × MUMBAI</span>
            <span>₹ INR PRICING</span>
          </div>
        </div>
      )}
    </>
  );
};
