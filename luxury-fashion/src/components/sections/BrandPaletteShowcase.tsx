import React from 'react';
import { motion } from 'framer-motion';
import { BrandingCard } from '@/components/ui/color-palette';
import { Layers, Sparkles, Check } from 'lucide-react';

export const BrandPaletteShowcase: React.FC = () => {
  return (
    <section id="palette" className="py-24 px-6 bg-rose-50/70 border-t border-rose-200/80 relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-rose-200/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-300 bg-white/90 shadow-sm mb-3.5">
            <Layers className="w-3.5 h-3.5 text-rose-500" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-rose-900 font-semibold">
              ATELIER CHROMATIC THESIS
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-espresso-950 uppercase tracking-tight mb-3.5">
            The Signature <span className="font-editorial gradient-rose-text lowercase">cashmere</span> Palette
          </h2>
          <p className="text-espresso-700 text-xs sm:text-sm font-light leading-relaxed">
            Inspired by raw Mongolian fiber, roasted espresso beans, and timeless Tuscan nappa leather.
          </p>
        </div>

        {/* 4-Card BrandingCard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          
          {/* Card 1: The Highlighted 3rd Theme Palette (Cashmere & Warm Weave) */}
          <div className="relative w-full max-w-sm">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-espresso-900 text-white text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-0.5 rounded-full flex items-center gap-1 shadow-md">
              <Check className="w-3 h-3 text-rose-300" />
              <span>Active Maison Theme</span>
            </div>
            <BrandingCard
              category="Textiles & Weave"
              title="Mongolian Cashmere"
              subtitle="480g Double-Face"
              displayElement={<span className="font-mono text-3xl text-espresso-950 font-bold">480g</span>}
              colors={["#D6C6B6", "#8C7D70", "#3D3530", "#1A1615"]}
              className="border-espresso-900/40 bg-white shadow-xl shadow-rose-900/10 ring-2 ring-espresso-900/20"
            />
          </div>

          {/* Card 2: Seasonal Neutral Hues */}
          <BrandingCard
            category="Seasonal Capsule"
            title="Spring Neutral Tone"
            subtitle="Oatmeal, Mink & Rose"
            displayElement={<span className="font-serif text-4xl text-rose-900">S/S</span>}
            colors={["#FAF6F0", "#E4D6C7", "#ECC2CB", "#3D3530"]}
            className="border-rose-200 bg-white hover:border-rose-400 shadow-md"
          />

          {/* Card 3: Typography System */}
          <BrandingCard
            category="Haute Typography"
            title="Editorial Serifs"
            subtitle="Italiana & Playfair"
            displayElement={
              <span className="font-serif text-4xl text-espresso-950">
                Aa<span className="text-rose-400">Gg</span>
              </span>
            }
            colors={["#140E0C", "#382D28", "#EBE0D2", "#FAF6F0"]}
            className="border-rose-200 bg-white hover:border-rose-400 shadow-md"
          />

          {/* Card 4: Atelier Hardware Metallurgy */}
          <BrandingCard
            category="Atelier Metallurgy"
            title="Hardware & Clasps"
            subtitle="Champagne Brass"
            displayElement={<span className="font-serif text-3xl text-amber-700">24K</span>}
            colors={["#E5C983", "#B8934C", "#6E4C1E", "#1A1615"]}
            className="border-rose-200 bg-white hover:border-rose-400 shadow-md"
          />

        </div>

        <div className="mt-10 text-center">
          <p className="font-mono text-[11px] text-espresso-700 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-rose-500" />
            <span>Organic, plant-based non-toxic dyeing certified by GOTS in Biella, Italy</span>
          </p>
        </div>

      </div>
    </section>
  );
};
