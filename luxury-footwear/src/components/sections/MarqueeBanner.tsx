import React from 'react';

export const MarqueeBanner: React.FC = () => {
  const marqueeItems = [
    'PARIS HAUTE FOOTWEAR',
    '•',
    'EXPRESS INDIA DELIVERY',
    '•',
    '100% HAND-CRAFTED ITALIAN LEATHER',
    '•',
    'CUSTOM ARTISANAL SOLES',
    '•',
    'VÉLOCE ATELIER 2026',
    '•',
  ];

  return (
    <div className="bg-[#FF4D00] text-white py-4 overflow-hidden select-none" data-section-color="#FF4D00" data-section-text="#FFFFFF">
      <div className="flex whitespace-nowrap animate-marquee gap-8 text-sm md:text-base font-display font-extrabold tracking-widest uppercase">
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
          <span key={idx} className="flex items-center gap-6">
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
