import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '@/data/products';
import { BlogPost } from '@/types/fashion';
import { Clock, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FashionJournal: React.FC = () => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 px-6 bg-white border-t border-cream-200 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2.5">
              <span className="w-6 h-[2px] bg-[#E11D48]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E11D48] font-bold">
                THE MAISON JOURNAL & ESSAYS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-espresso-950 uppercase tracking-tight">
              Fashion <span className="font-editorial gradient-rose-text lowercase">journal</span> & Stories
            </h2>
          </div>
          <p className="text-espresso-700 text-xs sm:text-sm font-light max-w-sm">
            Insights on artisanal craftsmanship, quiet luxury philosophy, and sustainable Mongolian cashmere origins.
          </p>
        </div>

        {/* 3-Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onClick={() => setActivePost(post)}
              className="group cursor-pointer bg-cream-50/70 border border-cream-300 rounded-sm overflow-hidden flex flex-col hover:border-[#E11D48] hover:shadow-xl transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative h-60 overflow-hidden bg-cream-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-cream-300 px-2.5 py-0.5 text-[10px] font-mono uppercase text-espresso-950 font-bold shadow-sm">
                  {post.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 font-mono text-[11px] text-espresso-600 mb-2.5">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#E11D48]" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-serif text-xl text-espresso-950 group-hover:text-[#E11D48] transition-colors leading-snug mb-3 font-semibold">
                  {post.title}
                </h3>

                <p className="text-xs text-espresso-700 font-light leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-cream-200 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-espresso-600">
                    {post.author}
                  </span>
                  <span className="text-xs text-[#E11D48] font-mono font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>

      {/* Reading Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          <div
            onClick={() => setActivePost(null)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-2xl bg-white border-2 border-cream-300 rounded-sm p-6 sm:p-8 shadow-2xl z-10 text-espresso-950 overflow-y-auto max-h-[90vh]"
          >
            {/* Top Navigation Bar inside Modal */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-cream-200">
              <button
                onClick={() => setActivePost(null)}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#E11D48] hover:text-[#BE123C] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Stories</span>
              </button>

              <button
                onClick={() => setActivePost(null)}
                className="p-1.5 text-espresso-500 hover:text-espresso-950 bg-cream-100 hover:bg-cream-200 rounded-full transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="font-mono text-xs uppercase text-[#E11D48] font-bold mb-2">
              {activePost.category} • {activePost.readTime}
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-espresso-950 mb-3 font-semibold">
              {activePost.title}
            </h3>

            <div className="flex items-center gap-2 text-xs font-mono text-espresso-600 mb-6 pb-3 border-b border-cream-200">
              <span>By {activePost.author}</span>
              <span>•</span>
              <span>Published on {activePost.date}</span>
            </div>

            <img
              src={activePost.image}
              alt={activePost.title}
              className="w-full h-64 object-cover rounded-sm mb-6 border border-cream-200 shadow-sm"
            />

            <div className="text-sm text-espresso-800 font-light leading-relaxed space-y-4">
              <p className="text-espresso-950 text-base leading-relaxed font-medium">
                {activePost.excerpt}
              </p>
              <p>
                In an era dominated by fleeting digital trends and seasonal obsolescence, Maison Écru re-anchors garment making to its architectural roots. When handling pure 480g/m² Mongolian double-face cashmere, one immediately recognizes the quiet distinction of unhurried artisanship.
              </p>
              <p>
                Each coat requires over thirty-two hours of meticulous hand-assembly. Two layers of pure spun fleece are split along their seams and folded inwards with invisible pick-stitching, rendering every hem perfectly reversible and free from external bulk.
              </p>
              <p>
                For our patrons in India, our climate-adaptive weave provides breathable warmth during mountain retreats and winter salons alike, embodying the pinnacle of wearable luxury.
              </p>
            </div>

            {/* Bottom Button with High Contrast & Clear Back Action */}
            <div className="mt-8 pt-4 border-t border-cream-200 flex justify-between items-center">
              <span className="font-mono text-[11px] text-espresso-600">
                End of Editorial
              </span>
              <Button
                variant="pink"
                size="default"
                onClick={() => setActivePost(null)}
                className="gap-2 px-6"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Stories</span>
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
