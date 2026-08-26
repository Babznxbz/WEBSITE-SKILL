import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Scissors, Feather, ShieldCheck } from 'lucide-react';

export const LookbookEditorial: React.FC = () => {
  return (
    <section id="editorial" className="py-28 px-6 bg-noir-900 border-t border-gold-400/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Layered Photography Collage */}
          <div className="relative h-[560px] sm:h-[640px]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 left-0 w-[78%] h-[82%] rounded-sm overflow-hidden border border-gold-400/20 shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop"
                alt="Master couturier hand-draping silk georgette on mannequin"
                className="w-full h-full object-cover filter brightness-90"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="absolute bottom-0 right-0 w-[55%] h-[55%] rounded-sm overflow-hidden border border-gold-400/40 shadow-2xl shadow-black"
            >
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop"
                alt="Detailed pick-stitch tailored trousers close up"
                className="w-full h-full object-cover filter brightness-95"
                loading="lazy"
              />
            </motion.div>

            {/* Experience Pill Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-noir-900/95 border border-gold-400 px-6 py-4 rounded-none backdrop-blur-xl shadow-2xl text-center">
              <div className="font-serif text-3xl text-gold-300 font-bold">1924</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
                Century of Savoir-Faire
              </div>
            </div>
          </div>

          {/* Right: Narrative Editorial */}
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-gold-400" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold-400">
                HAUTE COUTURE PHILOSOPHY
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-foreground uppercase leading-[1.15] mb-6">
              The Art of <br />
              <span className="font-editorial gold-shimmer-text lowercase">invisible</span> Pick-Stitching
            </h2>

            <blockquote className="border-l-2 border-gold-400 pl-6 my-4 font-serif text-lg sm:text-xl text-foreground/90 italic leading-relaxed">
              “True luxury never screams. It reveals itself in the quiet weight of pure Mongolian cashmere and the effortless drape of hand-rolled silk.”
            </blockquote>

            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              At Maison Écru & Noir, every silhouette is cut individually by a premier d’atelier. We reject industrial mass production in favor of numbered micro-batches, ensuring that each garment is imbued with enduring permanence.
            </p>

            {/* Savoir-Faire Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div className="flex flex-col gap-2">
                <Scissors className="w-5 h-5 text-gold-400" />
                <h4 className="font-serif text-base text-foreground">Bespoke Fit</h4>
                <p className="text-xs text-muted-foreground">Tailored to exact patron proportions upon request.</p>
              </div>

              <div className="flex flex-col gap-2">
                <Feather className="w-5 h-5 text-gold-400" />
                <h4 className="font-serif text-base text-foreground">Noble Fibres</h4>
                <p className="text-xs text-muted-foreground">Certified cruelty-free cashmere and Como silk.</p>
              </div>

              <div className="flex flex-col gap-2">
                <ShieldCheck className="w-5 h-5 text-gold-400" />
                <h4 className="font-serif text-base text-foreground">Provenance</h4>
                <p className="text-xs text-muted-foreground">Individually numbered certificate with every piece.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
