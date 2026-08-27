import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { LUXURY_SHOES } from '../../data/products';
import { formatINR } from '../../lib/utils';
import { ShoeProduct } from '../../types/footwear';

interface HeroSliderProps {
  onSelectProduct: (product: ShoeProduct) => void;
  onNavigateShop: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onSelectProduct, onNavigateShop }) => {
  const heroItems = LUXURY_SHOES.slice(0, 3);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroItems.length]);

  const activeItem = heroItems[currentIndex];

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between px-4 md:px-12 overflow-hidden bg-[#F5F5F0]">
      {/* Background Decorative Large Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-display font-extrabold text-black/[0.03] select-none pointer-events-none whitespace-nowrap">
        HAUTE FOOTWEAR
      </div>

      {/* Main Hero Slider Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Column: Text & Product Meta */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4D00]/10 text-[#FF4D00] text-xs font-bold uppercase tracking-widest rounded-full border border-[#FF4D00]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{activeItem.heroTag || 'PARIS HAUTE DROP'}</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#0A0A0A] leading-[1.05] tracking-tight">
            {activeItem.name}
          </h1>

          <p className="text-base text-[#666666] max-w-md font-normal leading-relaxed">
            {activeItem.description}
          </p>

          <div className="flex items-baseline gap-4 pt-2">
            <span className="font-display font-bold text-3xl text-[#0A0A0A] tabular-price">
              {formatINR(activeItem.price)}
            </span>
            {activeItem.originalPrice && (
              <span className="text-lg text-[#666666] line-through tabular-price">
                {formatINR(activeItem.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => onSelectProduct(activeItem)}
              className="px-8 py-4 bg-[#FF4D00] text-white font-semibold text-sm tracking-wide rounded-md hover:bg-[#E04400] transition-all hover:shadow-lg flex items-center gap-3 group"
            >
              <span>QUICK DISCOVER</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onNavigateShop}
              className="px-8 py-4 bg-white text-[#0A0A0A] border border-[#D4D4D4] font-semibold text-sm tracking-wide rounded-md hover:border-[#0A0A0A] transition-all"
            >
              EXPLORE CATALOG
            </button>
          </div>
        </div>

        {/* Right Column: Hero Showcase Image & Slider Card */}
        <div className="lg:col-span-7 relative flex justify-center items-center">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl bg-white group border border-black/5">
            <img
              src={activeItem.images[0]}
              alt={activeItem.name}
              className="w-full h-full object-cover object-center transition-all duration-1000 transform group-hover:scale-105"
            />

            {/* Floating Tag */}
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg text-xs font-bold text-[#0A0A0A] tracking-wider uppercase">
              {activeItem.department} • {activeItem.gender}
            </div>

            {/* Slide Navigation Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full">
              <div className="text-xs font-mono tracking-widest">
                0{currentIndex + 1} / 0{heroItems.length}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentIndex((prev) => (prev === 0 ? heroItems.length - 1 : prev - 1))}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-1.5 px-2">
                  {heroItems.map((_, idx) => (
                    <span
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 rounded-full cursor-pointer transition-all ${
                        idx === currentIndex ? 'w-6 bg-[#FF4D00]' : 'w-1.5 bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % heroItems.length)}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
