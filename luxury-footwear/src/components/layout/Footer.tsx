import React from 'react';
import { Globe, Share2, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (hash: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer
      className="bg-[#0A0A0A] text-white pt-20 pb-12 px-4 md:px-12 border-t border-white/10"
      data-section-color="#0A0A0A"
      data-section-text="#FFFFFF"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-display font-extrabold text-2xl tracking-tighter text-white">
              VÉLOCE<span className="text-[#FF4D00]">.</span>
            </span>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              French Haute Footwear designed in Florence and curated for discerning collectors across India and globally.
            </p>
            <div className="flex gap-3 text-white/60 pt-2">
              <a href="#social" className="p-2 bg-white/5 rounded-full hover:text-[#FF4D00] hover:bg-white/10 transition-all" aria-label="Global Atelier">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#share" className="p-2 bg-white/5 rounded-full hover:text-[#FF4D00] hover:bg-white/10 transition-all" aria-label="Share Collection">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Col 1: Shop */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-[#FF4D00]">
              DEPARTMENTS
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><button onClick={() => onNavigate('#shop')} className="hover:text-white transition-colors">Sneakers & Runners</button></li>
              <li><button onClick={() => onNavigate('#shop')} className="hover:text-white transition-colors">Haute Loafers</button></li>
              <li><button onClick={() => onNavigate('#shop')} className="hover:text-white transition-colors">Chelsea Boots</button></li>
              <li><button onClick={() => onNavigate('#shop')} className="hover:text-white transition-colors">High-Tops</button></li>
              <li><button onClick={() => onNavigate('#shop')} className="hover:text-white transition-colors">Resort Slides</button></li>
            </ul>
          </div>

          {/* Nav Col 2: Atelier */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-[#FF4D00]">
              ATELIER & CRAFT
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><button onClick={() => onNavigate('#about')} className="hover:text-white transition-colors">Our Florence Craftsmanship</button></li>
              <li><button onClick={() => onNavigate('#journal')} className="hover:text-white transition-colors">Style & Care Journal</button></li>
              <li><button onClick={() => onNavigate('#about')} className="hover:text-white transition-colors">Bespoke Fitting Service</button></li>
              <li><button onClick={() => onNavigate('#about')} className="hover:text-white transition-colors">Press & Lookbook</button></li>
            </ul>
          </div>

          {/* Nav Col 3: Assistance */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-[#FF4D00]">
              INDIA CONCIERGE
            </h4>
            <p className="text-xs text-white/60">
              Direct Assistance: <span className="text-white font-medium">+91 (022) 4900-VÉLOCE</span>
            </p>
            <p className="text-xs text-white/60">
              Email: <span className="text-white font-medium">concierge@veloce-atelier.com</span>
            </p>
            <div className="flex items-center gap-2 text-xs text-white/40 pt-2">
              <ShieldCheck className="w-4 h-4 text-[#FF4D00]" />
              <span>Insured Transit across Mumbai, Delhi, BLR & Pan-India</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-white/40 gap-4">
          <p>© 2026 VÉLOCE ATELIER INC. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 font-mono text-[11px]">
            <span>PRIVACY POLICY</span>
            <span>TERMS OF SERVICE</span>
            <span>SHIPPING & RETURNS</span>
            <span>INR (₹) PRICING</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
