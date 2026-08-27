import React, { useState } from 'react';
import { LUXURY_SHOES } from '../../data/products';
import { ProductCard } from './ProductCard';
import { ShoeProduct, Department, Gender } from '../../types/footwear';

interface ShopCatalogProps {
  onQuickView: (product: ShoeProduct) => void;
  onSelectProduct: (product: ShoeProduct) => void;
  initialDept?: string;
}

export const ShopCatalog: React.FC<ShopCatalogProps> = ({
  onQuickView,
  onSelectProduct,
  initialDept = 'All',
}) => {
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [selectedDept, setSelectedDept] = useState<string>(initialDept);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  const departments: (Department | 'All')[] = ['All', 'Sneakers', 'Loafers', 'Boots', 'High-Tops', 'Slides'];
  const genders: (Gender | 'All')[] = ['All', 'Men', 'Women', 'Unisex'];

  // Filter Logic
  let filtered = LUXURY_SHOES.filter((p) => {
    const matchGender = selectedGender === 'All' || p.gender === selectedGender || p.gender === 'Unisex';
    const matchDept = selectedDept === 'All' || p.department === selectedDept;
    return matchGender && matchDept;
  });

  // Sort Logic
  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="pt-28 pb-24 px-4 md:px-12 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-left border-b border-black/10 pb-6 space-y-2">
        <span className="text-xs font-mono font-bold text-[#FF4D00] uppercase tracking-widest">
          VÉLOCE ATELIER CATALOG
        </span>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[#0A0A0A]">
          Explore All Footwear Models ({filtered.length})
        </h1>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-black/5">
        {/* Gender Filter Tabs */}
        <div className="flex gap-2">
          {genders.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGender(g)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedGender === g
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-[#F5F5F0] text-[#0A0A0A] hover:bg-[#D4D4D4]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Department Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDept(d)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                selectedDept === d
                  ? 'bg-[#FF4D00] text-white font-bold'
                  : 'bg-[#F5F5F0] text-[#666666] hover:text-[#0A0A0A]'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#666666]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            aria-label="Sort Footwear Catalog"
            className="text-xs font-bold bg-[#F5F5F0] border border-black/10 rounded px-3 py-2 text-[#0A0A0A] focus:outline-none"
          >
            <option value="featured">Featured Drops</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center text-[#666666] font-display font-bold">
            No footwear models found matching your selected filters.
          </div>
        ) : (
          filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onSelectProduct={onSelectProduct}
            />
          ))
        )}
      </div>
    </div>
  );
};
