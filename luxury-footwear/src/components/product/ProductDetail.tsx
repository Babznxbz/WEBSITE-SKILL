import React, { useState } from 'react';
import { ShoppingBag, ArrowLeft, ShieldCheck, Truck, RefreshCw, Check } from 'lucide-react';
import { ShoeProduct } from '../../types/footwear';
import { formatINR } from '../../lib/utils';
import { LUXURY_SHOES } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';

interface ProductDetailProps {
  product: ShoeProduct;
  onBack: () => void;
  onAddToCart: (product: ShoeProduct, color: string, size: number) => void;
  onQuickView: (product: ShoeProduct) => void;
  onSelectProduct: (product: ShoeProduct) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onBack,
  onAddToCart,
  onQuickView,
  onSelectProduct,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[2] || product.sizes[0]);
  const [added, setAdded] = useState(false);

  const related = LUXURY_SHOES.filter(
    (p) => p.department === product.department && p.id !== product.id
  ).slice(0, 4);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pt-28 pb-24 px-4 md:px-12 max-w-7xl mx-auto space-y-16">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#666666] hover:text-[#FF4D00] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO CATALOG</span>
      </button>

      {/* Main 2-Column Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 overflow-x-auto">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-20 aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  idx === activeImageIndex ? 'border-[#FF4D00] scale-105' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Large Image */}
          <div className="flex-1 aspect-[4/3] md:aspect-[4/5] rounded-2xl overflow-hidden bg-[#F5F5F0] border border-black/5 shadow-lg">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
        </div>

        {/* Right Column: Product Information & Purchase Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#FF4D00] uppercase tracking-widest">
              {product.department} • {product.gender}
            </span>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-[#0A0A0A] mt-1">
              {product.name}
            </h1>
            <p className="text-sm text-[#666666] mt-1">{product.subtitle}</p>
          </div>

          <div className="flex items-baseline gap-4 py-2 border-y border-black/10">
            <span className="font-display font-extrabold text-3xl text-[#0A0A0A] tabular-price">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-base text-[#666666] line-through tabular-price">
                {formatINR(product.originalPrice)}
              </span>
            )}
            <span className="text-xs bg-[#FF4D00]/10 text-[#FF4D00] font-bold px-2 py-0.5 rounded">
              INCL. ALL DUTIES & TAXES
            </span>
          </div>

          <p className="text-sm text-[#666666] leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
              Select Color: <span className="text-[#FF4D00]">{selectedColor}</span>
            </label>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === c.name ? 'border-[#FF4D00] scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
              Select UK/IND Size: <span className="text-[#FF4D00]">UK {selectedSize}</span>
            </label>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-2.5 text-xs font-bold rounded transition-all ${
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

          {/* Add to Bag Action */}
          <div className="pt-4 space-y-3">
            <button
              onClick={handleAdd}
              className="w-full py-4 bg-[#FF4D00] text-white font-bold text-sm tracking-wider uppercase rounded-md hover:bg-[#E04400] transition-all flex items-center justify-center gap-2 shadow-xl"
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

            {/* Value Props */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-black/10 text-center text-xs text-[#666666]">
              <div className="space-y-1">
                <Truck className="w-4 h-4 text-[#FF4D00] mx-auto" />
                <span>Pan-India Transit</span>
              </div>
              <div className="space-y-1">
                <ShieldCheck className="w-4 h-4 text-[#FF4D00] mx-auto" />
                <span>Guaranteed Authentic</span>
              </div>
              <div className="space-y-1">
                <RefreshCw className="w-4 h-4 text-[#FF4D00] mx-auto" />
                <span>Complimentary Fit Exchange</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Footwear Section */}
      {related.length > 0 && (
        <div className="pt-16 border-t border-black/10 space-y-8">
          <h3 className="font-display font-extrabold text-2xl text-[#0A0A0A] text-left">
            You May Also Covet
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={onQuickView}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
