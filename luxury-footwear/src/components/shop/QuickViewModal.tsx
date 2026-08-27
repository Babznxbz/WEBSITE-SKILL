import React, { useState } from 'react';
import { X, ShoppingBag, Check } from 'lucide-react';
import { ShoeProduct } from '../../types/footwear';
import { formatINR } from '../../lib/utils';

interface QuickViewModalProps {
  product: ShoeProduct | null;
  onClose: () => void;
  onAddToCart: (product: ShoeProduct, color: string, size: number) => void;
  onSelectProduct: (product: ShoeProduct) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[2] || product.sizes[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-[#FF4D00] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="aspect-[4/3] md:aspect-square bg-[#F5F5F0]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Panel */}
        <div className="p-8 flex flex-col justify-between space-y-6 text-left">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-[#FF4D00] uppercase tracking-widest">
              {product.department} • {product.gender}
            </span>

            <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0A0A0A]">
              {product.name}
            </h2>

            <p className="text-xs text-[#666666] leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="font-display font-extrabold text-2xl text-[#0A0A0A] tabular-price">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#666666] line-through tabular-price">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Color Picker */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
                Color: <span className="text-[#FF4D00]">{selectedColor}</span>
              </label>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      selectedColor === c.name ? 'border-[#FF4D00] scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Picker */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
                UK/IND Size: <span className="text-[#FF4D00]">UK {selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`h-9 px-3.5 rounded text-xs font-bold transition-all ${
                      selectedSize === sz
                        ? 'bg-[#1A1A1A] text-white shadow'
                        : 'bg-[#F5F5F0] text-[#0A0A0A] border border-black/10 hover:border-black'
                    }`}
                  >
                    UK {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-black/10">
            <button
              onClick={handleAdd}
              className="w-full py-4 bg-[#FF4D00] text-white font-bold text-sm tracking-wider uppercase rounded-md hover:bg-[#E04400] transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>ADDED TO BAG</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>ADD TO BAG — {formatINR(product.price)}</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                onClose();
                onSelectProduct(product);
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-[#666666] hover:text-[#0A0A0A] underline tracking-wider uppercase"
            >
              VIEW FULL PRODUCT PAGE & DETAILS →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
