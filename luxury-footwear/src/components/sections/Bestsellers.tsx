import React from 'react';
import { LUXURY_SHOES } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';
import { ShoeProduct } from '../../types/footwear';

interface BestsellersProps {
  onQuickView: (product: ShoeProduct) => void;
  onSelectProduct: (product: ShoeProduct) => void;
}

export const Bestsellers: React.FC<BestsellersProps> = ({ onQuickView, onSelectProduct }) => {
  const bestsellers = LUXURY_SHOES.filter((p) => p.isBestseller);

  return (
    <section
      className="py-24 px-4 md:px-12 transition-colors duration-700"
      data-section-color="#F0EDE8"
      data-section-text="#0A0A0A"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-[#FF4D00] uppercase tracking-widest">
            MOST COVETED FOOTWEAR
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-[#0A0A0A]">
            Bestsellers & Runway Icons
          </h2>
          <p className="text-sm text-[#666666]">
            The most sought-after silhouettes worn by tastemakers across Paris, London, and Mumbai.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestsellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
