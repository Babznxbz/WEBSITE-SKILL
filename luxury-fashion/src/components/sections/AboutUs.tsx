import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Feather, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 bg-cream-100 border-t border-cream-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          
          {/* Left Narrative */}
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-espresso-400" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-espresso-800 font-semibold">
                OUR HERITAGE & MISSION
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-espresso-950 uppercase tracking-tight mb-6">
              Maison Écru & <span className="font-editorial gradient-espresso-text lowercase">the art of</span> Permanence
            </h2>

            <p className="text-espresso-700 text-sm leading-relaxed mb-6">
              Founded as an independent couture house, Maison Écru bridges classic European tailoring with global artistic sensibilities. We create investment garments sculpted from single-origin noble fibers, designed to be passed down through generations.
            </p>

            <p className="text-espresso-700 text-sm leading-relaxed mb-8">
              Every creation is born in our Paris atelier and crafted across certified master workshops in Florence, Como, and Biella. For our patrons across India, we offer white-glove bespoke fitting salons in New Delhi and Mumbai, delivering tailored luxury to your doorstep.
            </p>

            {/* 4 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-cream-300">
              <div className="flex gap-3 items-start bg-white p-4 rounded-sm border border-cream-200 shadow-sm">
                <Scissors className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-espresso-950 font-semibold mb-1">Couture Precision</h4>
                  <p className="text-xs text-espresso-600">Pattern cut individually by premier d’atelier.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start bg-white p-4 rounded-sm border border-cream-200 shadow-sm">
                <Feather className="w-5 h-5 text-sage-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-espresso-950 font-semibold mb-1">Noble Fibers Only</h4>
                  <p className="text-xs text-espresso-600">Certified 100% Mongolian Cashmere & Como Silk.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start bg-white p-4 rounded-sm border border-cream-200 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-espresso-950 font-semibold mb-1">Lifetime Care</h4>
                  <p className="text-xs text-espresso-600">Annual garment preservation and steaming service.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start bg-white p-4 rounded-sm border border-cream-200 shadow-sm">
                <HeartHandshake className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-espresso-950 font-semibold mb-1">Ethical Provenance</h4>
                  <p className="text-xs text-espresso-600">Direct cruelty-free nomadic herder partnerships.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Layered Media Collage */}
          <div className="relative h-[480px] sm:h-[540px]">
            <div className="absolute top-0 right-0 w-[82%] h-[80%] rounded-sm overflow-hidden border border-cream-300 shadow-xl bg-cream-200">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop"
                alt="Artisan tailoring in atelier"
                className="w-full h-full object-cover filter brightness-95"
                loading="lazy"
              />
            </div>

            <div className="absolute bottom-0 left-0 w-[55%] h-[55%] rounded-sm overflow-hidden border border-cream-300 shadow-xl bg-white">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop"
                alt="Cashmere fabric inspection"
                className="w-full h-full object-cover filter brightness-95"
                loading="lazy"
              />
            </div>

            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 bg-white border border-espresso-900 px-6 py-4 shadow-xl text-center">
              <div className="font-serif text-3xl text-espresso-950 font-bold">1924</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-espresso-700 mt-0.5">
                Century of Savoir-Faire
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
