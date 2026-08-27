import React from 'react';
import { Eye, ArrowUpRight } from 'lucide-react';
import { ShoeProduct } from '../../types/footwear';
import { formatINR } from '../../lib/utils';

interface ProductCardProps {
  product: ShoeProduct;
  onQuickView: (product: ShoeProduct) => void;
  onSelectProduct: (product: ShoeProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onSelectProduct,
}) => {
  return (
    <div className="product-card group flex flex-col justify-between bg-white rounded-xl p-4 border border-black/5 hover:shadow-xl transition-all duration-500">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#F5F5F0] mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-card-img w-full h-full object-cover object-center"
        />

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-[#FF4D00] text-white text-[10px] font-bold px-2.5 py-1 rounded tracking-wider uppercase">
              NEW DROP
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#1A1A1A] text-white text-[10px] font-bold px-2.5 py-1 rounded tracking-wider uppercase">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="px-4 py-2.5 bg-white text-[#0A0A0A] text-xs font-bold rounded-full shadow-lg hover:bg-[#FF4D00] hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>QUICK VIEW</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-2 text-left">
        <div className="flex justify-between items-start">
          <span className="text-xs text-[#666666] uppercase font-mono tracking-wider">
            {product.department} • {product.gender}
          </span>
          <button
            onClick={() => onSelectProduct(product)}
            className="text-[#666666] hover:text-[#FF4D00] transition-colors p-1"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <h3
          onClick={() => onSelectProduct(product)}
          className="font-display font-bold text-lg text-[#0A0A0A] group-hover:text-[#FF4D00] transition-colors cursor-pointer line-clamp-1"
        >
          {product.name}
        </h3>

        <p className="text-xs text-[#666666] line-clamp-1">
          {product.subtitle}
        </p>

        {/* Color Dots */}
        <div className="flex items-center gap-1.5 pt-1">
          {product.colors.map((color, i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full border border-black/20"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-black/5 flex items-baseline justify-between">
          <span className="font-display font-extrabold text-lg text-[#0A0A0A] tabular-price">
            {formatINR(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#666666] line-through tabular-price">
              {formatINR(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
