import React from 'react';
import { LUXURY_SHOES } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';
import { ShoeProduct } from '../../types/footwear';
import { ArrowRight } from 'lucide-react';

interface NewArrivalsProps {
  onQuickView: (product: ShoeProduct) => void;
  onSelectProduct: (product: ShoeProduct) => void;
  onNavigateShop: () => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  onQuickView,
  onSelectProduct,
  onNavigateShop,
}) => {
  const newItems = LUXURY_SHOES.filter((p) => p.isNew).slice(0, 4);

  return (
    <section
      className="py-24 px-4 md:px-12 transition-colors duration-700"
      data-section-color="#F5F5F0"
      data-section-text="#0A0A0A"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-black/10 pb-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#FF4D00] uppercase tracking-widest">
              AUTUMN / WINTER 2026
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-[#0A0A0A] mt-1">
              New Footwear Drops
            </h2>
          </div>

          <button
            onClick={onNavigateShop}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0A0A0A] hover:text-[#FF4D00] transition-colors"
          >
            <span>VIEW ALL 16 MODELS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newItems.map((product) => (
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
