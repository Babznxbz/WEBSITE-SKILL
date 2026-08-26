import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/fashion';
import { LUXURY_PRODUCTS } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Plus, Check, SlidersHorizontal } from 'lucide-react';

interface CollectionGridProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({
  activeCategory,
  onCategoryChange,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedColors, setSelectedColors] = useState<{ [productId: string]: string }>({});
  const [addedItemFeedback, setAddedItemFeedback] = useState<string | null>(null);

  const categories = ['All', 'Couture', 'Ready-To-Wear', 'Leather Goods', 'Footwear'];

  const filteredProducts = activeCategory === 'All'
    ? LUXURY_PRODUCTS
    : LUXURY_PRODUCTS.filter(p => p.category === activeCategory);

  const handleColorSelect = (productId: string, colorName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColors(prev => ({ ...prev, [productId]: colorName }));
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const activeColor = selectedColors[product.id] || product.colors[0].name;
    const defaultSize = product.sizes[0];
    onAddToCart(product, activeColor, defaultSize);

    setAddedItemFeedback(product.id);
    setTimeout(() => setAddedItemFeedback(null), 1800);
  };

  return (
    <section id="shop" className="py-24 px-6 bg-cashmere-950 border-t border-cashmere-300/10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Shopify-Style Filter Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-cashmere-300" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-cashmere-300">
                THE ONLINE BOUTIQUE
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground uppercase tracking-tight">
              Curated <span className="font-editorial cashmere-gradient-text lowercase">fashion</span> Pieces
            </h2>
          </div>

          {/* Shopify-Style Category Navigation Tabs */}
          <div className="flex items-center flex-wrap gap-1.5 p-1 bg-cashmere-900 border border-cashmere-300/20 rounded-sm">
            <span className="text-[11px] font-mono text-muted-foreground uppercase px-2 flex items-center gap-1 hidden sm:flex">
              <SlidersHorizontal className="w-3 h-3 text-cashmere-300" />
              Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-3.5 py-1.5 text-xs font-sans uppercase tracking-[0.14em] transition-all rounded-none ${
                  activeCategory === cat
                    ? 'bg-cashmere-300 text-cashmere-950 font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-cashmere-800/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => {
              const activeColor = selectedColors[product.id] || product.colors[0].name;

              return (
                <motion.article
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="group relative bg-cashmere-900/60 border border-cashmere-300/15 rounded-sm overflow-hidden flex flex-col hover:border-cashmere-300/50 hover:shadow-2xl hover:shadow-black/80 transition-all duration-500"
                >
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    {product.isNew && (
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-cashmere-950 bg-cashmere-300 px-2 py-0.5 shadow-md">
                        NEW ARRIVAL
                      </span>
                    )}
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground px-2 py-0.5 bg-black/60 border border-white/10 backdrop-blur-md">
                      {product.category}
                    </span>
                  </div>

                  {/* Image Container with Hover Action */}
                  <div
                    onClick={() => onQuickView(product)}
                    className="relative w-full h-[400px] bg-cashmere-950 overflow-hidden cursor-pointer flex items-center justify-center"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-cashmere-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5 justify-between">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickView(product);
                        }}
                        className="bg-cashmere-950/90 backdrop-blur-md text-[10px] tracking-widest gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-cashmere-300" />
                        <span>Quick View</span>
                      </Button>

                      <Button
                        size="sm"
                        variant={addedItemFeedback === product.id ? "default" : "cashmere"}
                        onClick={(e) => handleAddToCart(product, e)}
                        className="text-[10px] tracking-widest gap-1.5"
                      >
                        {addedItemFeedback === product.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add To Bag</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-5 flex flex-col flex-1">
                    
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h3
                        onClick={() => onQuickView(product)}
                        className="font-serif text-lg sm:text-xl text-foreground group-hover:text-cashmere-200 transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      {/* Price in INR */}
                      <div className="font-mono text-base font-bold text-cashmere-200 shrink-0">
                        ₹{product.priceINR.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground font-light mb-4 line-clamp-2">
                      {product.tagline}
                    </p>

                    {/* Color Swatches */}
                    <div className="mt-auto pt-3 border-t border-cashmere-300/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {product.colors.map((color) => (
                          <button
                            key={color.name}
                            title={color.name}
                            onClick={(e) => handleColorSelect(product.id, color.name, e)}
                            className={`w-4 h-4 rounded-full border transition-transform ${
                              activeColor === color.name
                                ? 'scale-125 border-cashmere-300 ring-2 ring-cashmere-300/40'
                                : 'border-white/30 hover:scale-110'
                            }`}
                            style={{ backgroundColor: color.hex }}
                          />
                        ))}
                      </div>

                      <span className="font-mono text-[10px] text-cashmere-300/90 tracking-wide">
                        {activeColor}
                      </span>
                    </div>

                  </div>

                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
