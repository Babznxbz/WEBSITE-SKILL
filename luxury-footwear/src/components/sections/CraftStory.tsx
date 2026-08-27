import React from 'react';

export const CraftStory: React.FC = () => {
  return (
    <section
      className="py-28 px-4 md:px-12 transition-colors duration-700"
      data-section-color="#F5F5F0"
      data-section-text="#0A0A0A"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Story Text */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <span className="text-xs font-mono font-bold text-[#FF4D00] uppercase tracking-widest">
            THE SAVOIR-FAIRE OF VÉLOCE
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-[#0A0A0A] leading-tight">
            Artisanal Leather Heritage Meets Contemporary Energy
          </h2>
          <p className="text-base text-[#666666] leading-relaxed">
            Every VÉLOCE silhouette begins in our Florence design workshop, where master cobblers hand-select full-grain Tuscan hides. From lasting to sole hand-stitching, our process takes 72 hours per shoe.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-black/10">
            <div>
              <span className="font-display font-extrabold text-3xl text-[#FF4D00]">180+</span>
              <p className="text-xs text-[#666666] uppercase tracking-wider mt-1">HAND OPERATIONS PER SHOE</p>
            </div>
            <div>
              <span className="font-display font-extrabold text-3xl text-[#0A0A0A]">100%</span>
              <p className="text-xs text-[#666666] uppercase tracking-wider mt-1">ETHICALLY SOURCED HIDES</p>
            </div>
          </div>
        </div>

        {/* Story Image Grid */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=600&q=80"
            alt="Leather craft"
            className="rounded-xl aspect-[3/4] object-cover shadow-lg hover:scale-102 transition-transform"
          />
          <img
            src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80"
            alt="Hand stitching"
            className="rounded-xl aspect-[3/4] object-cover shadow-lg mt-8 hover:scale-102 transition-transform"
          />
        </div>
      </div>
    </section>
  );
};
