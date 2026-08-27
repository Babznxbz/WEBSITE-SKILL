import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface PinnedPromoProps {
  onNavigateShop: () => void;
}

export const PinnedPromo: React.FC<PinnedPromoProps> = ({ onNavigateShop }) => {
  return (
    <section
      className="relative py-32 px-4 md:px-12 bg-[#1A1A1A] text-white overflow-hidden"
      data-section-color="#1A1A1A"
      data-section-text="#FFFFFF"
    >
      {/* Background Graphic Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF4D00_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Image with Overlay Tag */}
        <div className="lg:col-span-6 relative">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80"
              alt="Haute Leathercraft"
              className="promo-parallax-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-6 -right-4 md:right-6 bg-[#FF4D00] text-white p-6 rounded-2xl shadow-xl max-w-xs space-y-1">
            <span className="text-xs font-mono tracking-widest uppercase">HERITAGE ATELIER</span>
            <p className="font-display font-extrabold text-lg">FLORENCE × MUMBAI</p>
            <p className="text-xs text-white/80">Each pair requires 180 individual hand operations.</p>
          </div>
        </div>

        {/* Right Column: Copy & Value Props */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <span className="text-xs font-mono font-bold text-[#FF4D00] uppercase tracking-widest">
            ENGINEERED ELEGANCE
          </span>

          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white leading-tight">
            Crafted Without Compromise. Shipped Across India.
          </h2>

          <p className="text-sm md:text-base text-white/70 font-normal leading-relaxed">
            VÉLOCE shoes blend old-world Italian leather tanning with proprietary shock-absorption heel shanks. Delivered directly to your doorstep in Mumbai, Delhi, Bengaluru, and pan-India with express insured transit.
          </p>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
            <div className="space-y-2">
              <Truck className="w-6 h-6 text-[#FF4D00]" />
              <h4 className="font-display font-bold text-sm">Express Transit</h4>
              <p className="text-xs text-white/60">2-4 days insured delivery across India</p>
            </div>

            <div className="space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#FF4D00]" />
              <h4 className="font-display font-bold text-sm">Authenticity</h4>
              <p className="text-xs text-white/60">Numbered certificate of authenticity</p>
            </div>

            <div className="space-y-2">
              <RefreshCw className="w-6 h-6 text-[#FF4D00]" />
              <h4 className="font-display font-bold text-sm">Bespoke Fit</h4>
              <p className="text-xs text-white/60">Complimentary size exchange</p>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={onNavigateShop}
              className="px-8 py-4 bg-[#FF4D00] text-white font-semibold text-sm tracking-wide rounded-md hover:bg-[#E04400] transition-all flex items-center gap-3 group"
            >
              <span>EXPLORE ALL SHOES</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
