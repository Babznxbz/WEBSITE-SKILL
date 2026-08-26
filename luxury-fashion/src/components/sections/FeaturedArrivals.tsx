import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/fashion';
import { LUXURY_PRODUCTS } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Eye, Plus, Check, ArrowRight } from 'lucide-react';

interface FeaturedArrivalsProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
  onViewAll: () => void;
}

export const FeaturedArrivals: React.FC<FeaturedArrivalsProps> = ({
  onQuickView,
  onAddToCart,
  onViewAll,
}) => {
  const [addedItemFeedback, setAddedItemFeedback] = useState<string | null>(null);

  // Top 4 Featured Pieces for Home Landing
  const featured = LUXURY_PRODUCTS.slice(0, 4);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.colors[0].name, product.sizes[0]);
    setAddedItemFeedback(product.id);
    setTimeout(() => setAddedItemFeedback(null), 1800);
  };

  return (
    <section className="py-24 px-6 bg-white border-t border-cream-200 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2.5">
              <span className="w-6 h-[2px] bg-espresso-900" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-espresso-900 font-bold">
                CURATED RUNWAY PIECES
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-espresso-950 uppercase tracking-tight">
              Featured <span className="font-editorial gradient-rose-text lowercase">new arrivals</span>
            </h2>
          </div>

          <Button
            variant="outline"
            onClick={onViewAll}
            className="self-start sm:self-auto border-espresso-900 text-espresso-950 hover:bg-espresso-950 hover:text-white transition-all text-xs font-mono uppercase tracking-widest gap-2"
          >
            <span>View Complete Boutique</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* 4 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, idx) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-cream-50/50 border border-cream-200 rounded-sm overflow-hidden flex flex-col hover:border-espresso-900 hover:shadow-xl transition-all duration-400"
            >
              {/* Badge */}
              <div className="absolute top-3 left-3 z-20 flex gap-1">
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-white bg-espresso-950 px-2 py-0.5 shadow-sm">
                  {product.gender} • {product.subCategory}
                </span>
              </div>

              {/* Image Container */}
              <div
                onClick={() => onQuickView(product)}
                className="relative w-full h-[340px] bg-cream-100 overflow-hidden cursor-pointer flex items-center justify-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center filter group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 justify-between">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                    className="bg-white/95 text-espresso-950 text-[10px] tracking-widest gap-1 shadow-md font-semibold"
                  >
                    <Eye className="w-3.5 h-3.5 text-espresso-900" />
                    <span>Quick View</span>
                  </Button>

                  <Button
                    size="sm"
                    variant={addedItemFeedback === product.id ? "default" : "secondary"}
                    onClick={(e) => handleAddToCart(product, e)}
                    className="bg-white text-espresso-950 text-[10px] tracking-widest gap-1 shadow-md font-semibold"
                  >
                    {addedItemFeedback === product.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-espresso-900" />
                        <span>Add To Bag</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-1 bg-white">
                <span className="font-mono text-[10px] uppercase tracking-widest text-espresso-600 mb-0.5">
                  {product.origin}
                </span>

                <h3
                  onClick={() => onQuickView(product)}
                  className="font-serif text-base text-espresso-950 font-semibold group-hover:text-rose-700 transition-colors cursor-pointer line-clamp-1 mb-1"
                >
                  {product.name}
                </h3>

                <p className="text-[11px] text-espresso-700 font-light mb-3 line-clamp-2 leading-relaxed">
                  {product.tagline}
                </p>

                {/* Price in INR */}
                <div className="mt-auto pt-3 border-t border-cream-200 flex items-center justify-between">
                  <div className="font-mono text-sm font-bold text-espresso-950">
                    ₹{product.priceINR.toLocaleString('en-IN')}
                  </div>

                  <div className="flex items-center gap-1">
                    {product.colors.map((c) => (
                      <span
                        key={c.name}
                        className="w-3 h-3 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};
