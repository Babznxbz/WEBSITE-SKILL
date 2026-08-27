import React from 'react';
import { CATEGORIES_DATA } from '../../data/products';
import { ArrowRight } from 'lucide-react';

interface CategoryGridProps {
  onSelectDepartment: (dept: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectDepartment }) => {
  return (
    <section
      className="py-24 px-4 md:px-12 transition-colors duration-700"
      data-section-color="#EAEAE5"
      data-section-text="#0A0A0A"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-black/10 pb-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#FF4D00] uppercase tracking-widest">
              COLLECTION CATEGORIES
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-[#0A0A0A] mt-1">
              Shop by Department
            </h2>
          </div>
          <p className="text-sm text-[#666666] max-w-sm">
            Hand-crafted Italian calfskin & high-performance rubber soles, categorized for bespoke everyday elegance.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectDepartment(cat.department)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-white"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300" />

              {/* Card Content */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#FF4D00]">
                  {cat.count}
                </span>
                <h3 className="font-display font-bold text-2xl group-hover:text-[#FF4D00] transition-colors">
                  {cat.name}
                </h3>
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white/80 group-hover:text-white pt-2">
                  <span>DISCOVER MODELS</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
