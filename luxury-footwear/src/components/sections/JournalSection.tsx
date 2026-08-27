import React from 'react';
import { FOOTWEAR_JOURNAL } from '../../data/products';
import { ArrowRight } from 'lucide-react';

export const JournalSection: React.FC = () => {
  return (
    <section
      className="py-24 px-4 md:px-12 transition-colors duration-700"
      data-section-color="#EAEAE5"
      data-section-text="#0A0A0A"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-black/10 pb-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#FF4D00] uppercase tracking-widest">
              THE VÉLOCE GAZETTE
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-[#0A0A0A] mt-1">
              Footwear Journal & Style Notes
            </h2>
          </div>
        </div>

        {/* 2 Journal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FOOTWEAR_JOURNAL.map((article) => (
            <div
              key={article.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-black/5 flex flex-col justify-between"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-6 space-y-3 text-left">
                <div className="flex items-center gap-3 text-xs font-mono text-[#666666]">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span className="text-[#FF4D00] font-bold">{article.readTime}</span>
                </div>

                <h3 className="font-display font-bold text-xl md:text-2xl text-[#0A0A0A] group-hover:text-[#FF4D00] transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-[#666666] line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0A0A0A] group-hover:text-[#FF4D00] uppercase tracking-widest pt-2">
                  <span>READ FULL ESSAY</span>
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
