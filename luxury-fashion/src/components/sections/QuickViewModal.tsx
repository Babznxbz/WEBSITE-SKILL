import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/fashion';
import { Button } from '@/components/ui/button';
import { X, Check, Shield, Truck, RotateCcw, ArrowLeft, ShoppingBag } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-white border-2 border-cream-300 rounded-sm overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2 text-espresso-950"
        >
          {/* Close & Back Button Bar */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 text-espresso-600 hover:text-espresso-950 bg-white/90 hover:bg-cream-100 rounded-full shadow-md transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Left: Product Image */}
          <div className="relative h-80 md:h-full bg-cream-100 flex items-center justify-center overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-espresso-950 text-white text-[10px] font-mono uppercase font-bold px-3 py-1 shadow-md">
                {product.gender} • {product.subCategory}
              </span>
            </div>
          </div>

          {/* Right: Info & Controls */}
          <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
            <div>
              {/* Back to Boutique navigation */}
              <button
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#E11D48] hover:text-[#BE123C] mb-4 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Catalogue</span>
              </button>

              <span className="font-mono text-[10px] uppercase tracking-widest text-espresso-600 block">
                {product.origin}
              </span>
              
              <h3 className="font-serif text-2xl sm:text-3xl text-espresso-950 mt-1 mb-2 font-bold">
                {product.name}
              </h3>

              {/* Price in INR */}
              <div className="font-mono text-2xl font-bold text-espresso-950 mb-4">
                ₹{product.priceINR.toLocaleString('en-IN')}
              </div>

              <p className="text-xs text-espresso-700 font-light leading-relaxed mb-6">
                {product.tagline}
              </p>

              {/* Color Selector */}
              <div className="mb-6">
                <div className="font-mono text-xs text-espresso-900 uppercase tracking-wider mb-2 flex justify-between">
                  <span>Selected Shade:</span>
                  <span className="text-[#E11D48] font-bold">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`px-3 py-1.5 border rounded-none text-xs flex items-center gap-2 transition-all cursor-pointer ${
                        selectedColor === color.name
                          ? 'border-[#E11D48] bg-rose-50 text-[#E11D48] font-bold ring-1 ring-[#E11D48]'
                          : 'border-cream-300 text-espresso-700 hover:border-espresso-900 bg-white'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: color.hex }} />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="font-mono text-xs text-espresso-900 uppercase tracking-wider mb-2">
                  Select Size (India Standard):
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-1.5 border text-xs font-mono font-bold transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'border-[#E11D48] bg-[#E11D48] text-white'
                          : 'border-cream-300 text-espresso-700 hover:border-espresso-900 bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric Specs */}
              <div className="p-4 bg-cream-50 border border-cream-200 rounded-sm space-y-2 mb-6">
                <div className="text-xs font-medium text-espresso-950">
                  <span className="text-[#E11D48] font-mono font-bold">Fabric Composition: </span>
                  {product.fabric}
                </div>
                <ul className="text-[11px] text-espresso-700 space-y-1 list-disc pl-4">
                  {product.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions with Pure Pink button */}
            <div className="space-y-3 pt-4 border-t border-cream-200">
              <Button
                variant="pink"
                size="lg"
                onClick={handleAdd}
                className="w-full tracking-[0.2em] py-4 text-xs font-bold gap-2"
              >
                {isAdded ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-white" />
                    Added to Shopping Bag
                  </span>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • ₹{product.priceINR.toLocaleString('en-IN')}</span>
                  </>
                )}
              </Button>

              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-espresso-600 text-center pt-2">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#E11D48]" />
                  <span>Free India Express</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-[#E11D48]" />
                  <span>14-Day Returns</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-[#E11D48]" />
                  <span>100% Authentic</span>
                </div>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
