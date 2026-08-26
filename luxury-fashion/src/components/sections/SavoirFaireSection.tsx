import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Scissors, Sparkles, MapPin, Feather } from 'lucide-react';

interface SavoirFaireSectionProps {
  onExploreHeritage: () => void;
}

export const SavoirFaireSection: React.FC<SavoirFaireSectionProps> = ({ onExploreHeritage }) => {
  return (
    <section className="py-24 px-6 bg-rose-50/70 border-t border-rose-200 relative overflow-hidden">
      
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[400px] bg-rose-200/50 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Split Editorial Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Media Trio Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-64 rounded-sm overflow-hidden border border-rose-200 shadow-md bg-cream-200">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop"
                  alt="Atelier Savoir-Faire"
                  className="w-full h-full object-cover filter brightness-95"
                  loading="lazy"
                />
              </div>
              <div className="p-5 bg-white border border-rose-200 rounded-sm shadow-sm">
                <span className="font-mono text-2xl font-bold text-espresso-950 block">480g</span>
                <span className="font-mono text-[10px] text-espresso-700 uppercase tracking-widest">
                  Pure Mongolian Fleece per Square Metre
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-5 bg-espresso-950 text-white rounded-sm shadow-md">
                <span className="font-mono text-2xl font-bold text-rose-300 block">32 Hours</span>
                <span className="font-mono text-[10px] text-white/80 uppercase tracking-widest">
                  Hand Split-Stitching per Overcoat
                </span>
              </div>
              <div className="h-64 rounded-sm overflow-hidden border border-rose-200 shadow-md bg-cream-200">
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
                  alt="Noble Fabric Inspection"
                  className="w-full h-full object-cover filter brightness-95"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-espresso-900" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-espresso-900 font-bold">
                THE MAISON SAVOIR-FAIRE
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-espresso-950 uppercase tracking-tight mb-6">
              The Architecture of <br />
              <span className="font-editorial gradient-rose-text lowercase">unhurried</span> Craft
            </h2>

            <p className="text-espresso-700 text-sm leading-relaxed mb-6 font-light">
              Unlike fast-paced industrial fashion, Maison Écru operates on the rhythm of true haute couture. Our master artisans in Paris and Florence spend upwards of thirty hours on a single garment — splitting raw cashmere edges by hand and pick-stitching seams inwards for a weightless, reversible drape.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-xs text-espresso-900 font-medium">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Single-origin nomadic Mongolian cashmere certified by GOTS</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-espresso-900 font-medium">
                <span className="w-2 h-2 rounded-full bg-sage-500" />
                <span>22-Momme Como Mulberry Silk fluidly draped in Paris</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-espresso-900 font-medium">
                <span className="w-2 h-2 rounded-full bg-espresso-900" />
                <span>Private white-glove fitting salons in New Delhi & Mumbai</span>
              </div>
            </div>

            <div>
              <Button
                variant="outline"
                onClick={onExploreHeritage}
                className="border-espresso-900 text-espresso-950 hover:bg-espresso-950 hover:text-white transition-all text-xs font-mono uppercase tracking-widest gap-2"
              >
                <span>Read Atelier Story</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
