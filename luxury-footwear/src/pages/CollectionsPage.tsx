import React from 'react';
import { CATEGORIES_DATA } from '../data/products';
import { ArrowRight } from 'lucide-react';

interface CollectionsPageProps {
  onNavigateShop: (dept: string) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({ onNavigateShop }) => {
  return (
    <div className="pt-28 pb-24 px-4 md:px-12 max-w-7xl mx-auto space-y-12 text-left">
      <div className="border-b border-black/10 pb-6 space-y-2">
        <span className="text-xs font-mono font-bold text-[#FF4D00] uppercase tracking-widest">
          CURATED LOOKBOOKS & DROPS
        </span>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[#0A0A0A]">
          VÉLOCE Collections 2026
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CATEGORIES_DATA.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onNavigateShop(cat.department)}
            className="group relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
              <span className="text-xs font-mono font-bold text-[#FF4D00] uppercase tracking-widest">
                {cat.count}
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl">{cat.name}</h2>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/90 group-hover:text-white pt-2">
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
