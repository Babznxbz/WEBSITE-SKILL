import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, Gender, SubCategory } from '@/types/fashion';
import { LUXURY_PRODUCTS } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Eye, Plus, Check, Search, SlidersHorizontal, ArrowLeft } from 'lucide-react';

interface ShopSectionProps {
  initialGender?: Gender;
  initialSubCategory?: SubCategory;
  onBackToHome?: () => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  initialGender = 'All',
  initialSubCategory = 'All',
  onBackToHome,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedGender, setSelectedGender] = useState<Gender>(initialGender);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>(initialSubCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColors, setSelectedColors] = useState<{ [productId: string]: string }>({});
  const [addedItemFeedback, setAddedItemFeedback] = useState<string | null>(null);

  // Sub-categories depending on gender
  const availableSubCategories: { label: string; value: SubCategory }[] = useMemo(() => {
    if (selectedGender === 'Men') {
      return [
        { label: 'All Men Styles', value: 'All' },
        { label: 'Shirts', value: 'Shirts' },
        { label: 'T-Shirts', value: 'T-Shirts' },
        { label: 'Trousers & Pants', value: 'Trousers' },
        { label: 'Coats & Blazers', value: 'Outerwear' },
      ];
    }
    if (selectedGender === 'Women') {
      return [
        { label: 'All Women Styles', value: 'All' },
        { label: 'Evening Gowns & Dresses', value: 'Dresses' },
        { label: 'Silk Shirts & Blouses', value: 'Shirts' },
        { label: 'Cashmere Tees', value: 'T-Shirts' },
        { label: 'Wide-Leg Trousers', value: 'Trousers' },
        { label: 'Bar Blazers', value: 'Outerwear' },
        { label: 'Leather Bags', value: 'Bags' },
        { label: 'Heeled Footwear', value: 'Footwear' },
      ];
    }
    return [
      { label: 'All Wares', value: 'All' },
      { label: 'Shirts', value: 'Shirts' },
      { label: 'T-Shirts', value: 'T-Shirts' },
      { label: 'Trousers', value: 'Trousers' },
      { label: 'Dresses', value: 'Dresses' },
      { label: 'Outerwear', value: 'Outerwear' },
      { label: 'Leather Bags', value: 'Bags' },
      { label: 'Footwear', value: 'Footwear' },
    ];
  }, [selectedGender]);

  const filteredProducts = useMemo(() => {
    return LUXURY_PRODUCTS.filter((product) => {
      // Gender Filter
      if (selectedGender !== 'All' && product.gender !== selectedGender && product.gender !== 'Unisex') {
        return false;
      }
      // Sub-category Filter
      if (selectedSubCategory !== 'All' && product.subCategory !== selectedSubCategory) {
        return false;
      }
      // Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.tagline.toLowerCase().includes(query) ||
          product.subCategory.toLowerCase().includes(query) ||
          product.fabric.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedGender, selectedSubCategory, searchQuery]);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const activeColor = selectedColors[product.id] || product.colors[0].name;
    const defaultSize = product.sizes[0];
    onAddToCart(product, activeColor, defaultSize);

    setAddedItemFeedback(product.id);
    setTimeout(() => setAddedItemFeedback(null), 1800);
  };

  return (
    <section id="shop" className="py-12 px-6 bg-sage-50 border-t border-sage-200 relative min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb / Back Button */}
        {onBackToHome && (
          <div className="mb-6">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#E11D48] hover:text-[#BE123C] cursor-pointer bg-white px-4 py-2 rounded-sm border border-sage-200 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[2px] bg-espresso-900" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-espresso-900 font-bold">
              MAISON ÉCRU ONLINE BOUTIQUE
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-espresso-950 uppercase tracking-tight mb-3">
            The Spring / Summer <span className="font-editorial gradient-sage-text lowercase">catalogue</span>
          </h2>
          <p className="text-espresso-700 text-xs sm:text-sm font-light leading-relaxed">
            Filter by gender and department to discover handcrafted wardrobe essentials in noble fibers.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-sage-200 rounded-sm p-4 sm:p-6 mb-10 shadow-sm space-y-4">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Gender Toggle */}
            <div className="flex items-center gap-1 p-1 bg-sage-100/80 rounded-sm border border-sage-200 w-full md:w-auto">
              {(['All', 'Men', 'Women'] as Gender[]).map((gender) => (
                <button
                  key={gender}
                  onClick={() => {
                    setSelectedGender(gender);
                    setSelectedSubCategory('All');
                  }}
                  className={`flex-1 md:flex-initial px-6 py-2 text-xs font-sans uppercase tracking-[0.16em] font-semibold transition-all rounded-none cursor-pointer ${
                    selectedGender === gender
                      ? 'bg-espresso-950 text-white shadow-sm font-bold'
                      : 'text-espresso-700 hover:text-espresso-950 hover:bg-white/50'
                  }`}
                >
                  {gender === 'All' ? 'All Collections' : `${gender}'s Wares`}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-espresso-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search shirts, tees, trousers, gowns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-cream-50 border border-sage-300 pl-10 pr-4 py-2 text-xs text-espresso-950 rounded-sm outline-none focus:border-espresso-900 font-sans"
              />
            </div>

          </div>

          {/* Sub-Category Filter Buttons */}
          <div className="pt-3 border-t border-sage-100 flex items-center flex-wrap gap-2">
            <span className="text-xs font-mono uppercase text-espresso-700 mr-2 flex items-center gap-1.5 hidden sm:flex">
              <SlidersHorizontal className="w-3.5 h-3.5 text-sage-600" />
              Filter Department:
            </span>

            {availableSubCategories.map((item) => (
              <button
                key={item.value + item.label}
                onClick={() => setSelectedSubCategory(item.value)}
                className={`px-3.5 py-1.5 text-xs font-sans uppercase tracking-wider transition-all rounded-sm border cursor-pointer ${
                  selectedSubCategory === item.value
                    ? 'bg-espresso-950 text-white border-espresso-950 font-bold shadow-sm'
                    : 'bg-white text-espresso-800 border-sage-200 hover:border-espresso-900 hover:bg-sage-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white border border-sage-200 rounded-sm">
            <p className="font-serif text-xl text-espresso-950 mb-2 font-bold">No garments match your filters</p>
            <p className="text-xs text-espresso-600 mb-6">Try resetting your gender, department, or search keywords.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedGender('All');
                setSelectedSubCategory('All');
                setSearchQuery('');
              }}
              className="border-espresso-900 text-espresso-950"
            >
              Reset All Filters
            </Button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    transition={{ duration: 0.3 }}
                    className="group relative bg-white border border-sage-200 rounded-sm overflow-hidden flex flex-col hover:border-[#E11D48] hover:shadow-xl transition-all duration-400"
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
                      className="relative w-full h-[320px] bg-cream-100 overflow-hidden cursor-pointer flex items-center justify-center"
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
                          className="bg-white/95 text-espresso-950 hover:text-white text-[10px] tracking-widest gap-1 shadow-md font-bold"
                        >
                          <Eye className="w-3.5 h-3.5 text-espresso-900" />
                          <span>Quick View</span>
                        </Button>

                        <Button
                          size="sm"
                          variant={addedItemFeedback === product.id ? "default" : "pink"}
                          onClick={(e) => handleAddToCart(product, e)}
                          className="text-[10px] tracking-widest gap-1 shadow-md font-bold"
                        >
                          {addedItemFeedback === product.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
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

                    {/* Card Content */}
                    <div className="p-4 flex flex-col flex-1 bg-white">
                      
                      <div className="mb-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-espresso-600 block mb-0.5">
                          {product.fabric}
                        </span>
                        <h3
                          onClick={() => onQuickView(product)}
                          className="font-serif text-base text-espresso-950 font-bold group-hover:text-[#E11D48] transition-colors cursor-pointer line-clamp-1"
                        >
                          {product.name}
                        </h3>
                      </div>

                      <p className="text-[11px] text-espresso-700 font-light mb-3 line-clamp-2 leading-relaxed">
                        {product.tagline}
                      </p>

                      {/* Price in INR & Color Swatches */}
                      <div className="mt-auto pt-3 border-t border-sage-100 flex items-center justify-between">
                        <div className="font-mono text-sm font-bold text-espresso-950">
                          ₹{product.priceINR.toLocaleString('en-IN')}
                        </div>

                        <div className="flex items-center gap-1.5">
                          {product.colors.map((color) => (
                            <button
                              key={color.name}
                              title={color.name}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedColors(prev => ({ ...prev, [product.id]: color.name }));
                              }}
                              className={`w-3.5 h-3.5 rounded-full border transition-transform cursor-pointer ${
                                activeColor === color.name
                                  ? 'scale-125 border-[#E11D48] ring-2 ring-rose-400'
                                  : 'border-black/20 hover:scale-110'
                              }`}
                              style={{ backgroundColor: color.hex }}
                            />
                          ))}
                        </div>
                      </div>

                    </div>

                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
};
