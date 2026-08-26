import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORY_COLLECTIONS } from '@/data/products';
import { Gender, SubCategory } from '@/types/fashion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ShopByCategoryProps {
  onSelectCategory: (gender: Gender, subCategory: SubCategory) => void;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="py-24 px-6 bg-cream-50 border-t border-cream-200 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2.5">
              <span className="w-6 h-[1px] bg-rose-400" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-rose-900 font-semibold">
                CURATED DEPARTMENTS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-espresso-950 uppercase tracking-tight">
              Curated <span className="font-editorial gradient-rose-text lowercase">collections</span>
            </h2>
          </div>
          <p className="text-espresso-700 text-xs sm:text-sm font-light max-w-sm">
            Hand-curated departments featuring men's sartorial tailoring, women's evening gowns, cashmere coats, and artisan leathercraft.
          </p>
        </div>

        {/* 4-Card Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORY_COLLECTIONS.map((col, idx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => onSelectCategory(col.gender, col.subCategory)}
              className="group relative h-[440px] rounded-sm overflow-hidden border border-cream-300/80 cursor-pointer bg-white shadow-md hover:shadow-2xl hover:border-espresso-900 transition-all duration-500 flex flex-col justify-end p-6"
            >
              {/* Background Image */}
              <img
                src={col.image}
                alt={col.name}
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.02] group-hover:scale-105 group-hover:brightness-[0.65] transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Content Overlay */}
              <div className="relative z-10 text-white">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white bg-black/60 border border-white/20 px-2.5 py-1 rounded-none inline-block mb-2.5 backdrop-blur-sm">
                  {col.count}
                </span>

                <h3 className="font-serif text-2xl text-white group-hover:text-cream-200 transition-colors mb-2">
                  {col.name}
                </h3>

                <p className="text-xs text-white/80 font-light line-clamp-2 mb-4 leading-relaxed">
                  {col.description}
                </p>

                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-200 group-hover:text-white transition-colors">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
