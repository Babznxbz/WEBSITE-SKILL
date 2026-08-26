import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Truck } from 'lucide-react';

interface HeroSectionProps {
  onShopMen: () => void;
  onShopWomen: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopMen, onShopWomen }) => {
  return (
    <section id="hero" className="relative min-h-[88vh] flex items-center pt-28 pb-16 px-6 sm:px-12 bg-cream-100 border-b border-cream-200 overflow-hidden">
      
      {/* Subtle Ambient Pastel Glows in Background */}
      <div className="absolute -top-24 left-10 w-96 h-96 bg-rose-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-10 right-1/4 w-96 h-96 bg-sage-200/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Column: Editorial Headline & Actions (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col text-left justify-center">
          
          {/* Header Line */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-10 h-[1.5px] bg-[#E11D48]" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#E11D48] font-bold">
              HAUTE COUTURE • PARIS & NEW DELHI
            </span>
          </motion.div>

          {/* Majestic Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-tight text-espresso-950 uppercase leading-[1.05] mb-6 font-medium"
          >
            Sculpted in <br />
            <span className="font-editorial text-[#E11D48] lowercase font-normal italic">cashmere</span> & Silk
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-espresso-700 text-sm sm:text-base font-light leading-relaxed max-w-xl mb-8"
          >
            Architectural silhouettes handcrafted in 480g Mongolian double-face fleece, Italian linen overshirts, pleated wool trousers, and fluid Como silk evening gowns.
          </motion.p>

          {/* Pure Pink Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-10"
          >
            <Button
              variant="pink"
              size="lg"
              onClick={onShopMen}
              className="w-full sm:w-auto tracking-[0.18em] px-8 py-3.5 text-xs font-bold uppercase shadow-xl flex items-center justify-center gap-2"
            >
              <span>Explore Men's Wear</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              variant="pink-outline"
              size="lg"
              onClick={onShopWomen}
              className="w-full sm:w-auto tracking-[0.18em] px-8 py-3.5 text-xs font-bold uppercase shadow-md flex items-center justify-center gap-2"
            >
              <span>Explore Women's Wear</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Trust Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-cream-300 font-mono text-[11px] text-espresso-700"
          >
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#E11D48] shrink-0" />
              <span>Complimentary Insured Express Delivery Across India</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#E11D48] shrink-0" />
              <span>100% Certified Noble Fibres & Lifetime Care Guarantee</span>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Perfectly Resized & Framed Hero Image (5 Columns) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[460px] h-[480px] sm:h-[560px] lg:h-[580px] rounded-sm overflow-hidden shadow-2xl border-4 border-white bg-cream-200">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop"
              alt="Maison Écru Haute Couture Editorial"
              className="w-full h-full object-cover object-[center_top] filter contrast-[1.04] brightness-[0.98]"
            />
            {/* Subtle luxury corner shine */}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
