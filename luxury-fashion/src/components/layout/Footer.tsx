import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-cashmere-950 border-t border-cashmere-300/20 pt-20 pb-12 px-6 text-foreground">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Col 1: Brand */}
        <div>
          <span className="font-serif text-2xl tracking-[0.22em] text-foreground uppercase block mb-1">
            MAISON ÉCRU
          </span>
          <span className="font-mono text-[9px] tracking-[0.35em] text-cashmere-300 uppercase block mb-4">
            HAUTE COUTURE & LUXURY APPAREL
          </span>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Preserving classical European craftsmanship through contemporary architectural silhouettes, 100% Mongolian cashmere, and noble Como silks.
          </p>
        </div>

        {/* Col 2: Salons */}
        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cashmere-300 mb-4 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>Boutiques & Salons</span>
          </h4>
          <ul className="space-y-2.5 text-xs text-muted-foreground font-light">
            <li><strong className="text-foreground font-normal">New Delhi:</strong> The Chanakya, Chanakyapuri</li>
            <li><strong className="text-foreground font-normal">Mumbai:</strong> Jio World Plaza, BKC</li>
            <li><strong className="text-foreground font-normal">Paris:</strong> 28 Rue Saint-Honoré, 75001</li>
            <li><strong className="text-foreground font-normal">London:</strong> 42 New Bond Street</li>
          </ul>
        </div>

        {/* Col 3: Navigation */}
        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cashmere-300 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li><a href="#hero" className="hover:text-cashmere-200 transition-colors">Home</a></li>
            <li><a href="#shop" className="hover:text-cashmere-200 transition-colors">Shop All Garments</a></li>
            <li><a href="#categories" className="hover:text-cashmere-200 transition-colors">Shop by Category</a></li>
            <li><a href="#palette" className="hover:text-cashmere-200 transition-colors">Cashmere Brand DNA</a></li>
            <li><a href="#blog" className="hover:text-cashmere-200 transition-colors">Fashion Journal</a></li>
            <li><a href="#about" className="hover:text-cashmere-200 transition-colors">About Our Heritage</a></li>
          </ul>
        </div>

        {/* Col 4: Newsletter Gazette */}
        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cashmere-300 mb-4 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            <span>The Maison Gazette</span>
          </h4>
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            Subscribe for private invitations to seasonal trunk shows and new capsule debuts across India.
          </p>

          {subscribed ? (
            <div className="p-3 bg-cashmere-300/10 border border-cashmere-300 text-cashmere-200 text-xs font-mono">
              ✓ You are registered with the Maison Gazette.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="patron@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-cashmere-900 border border-cashmere-300/20 px-3 py-2 text-xs font-sans text-foreground w-full rounded-none outline-none focus:border-cashmere-300"
              />
              <Button type="submit" variant="cashmere" size="sm" className="px-4">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          )}

          <div className="mt-4 flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-cashmere-300" />
            <span>Strict Patron Privacy Guarantee</span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-cashmere-300/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-muted-foreground">
        <div>© 2026 MAISON ÉCRU. All Rights Reserved. (All prices in INR ₹)</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Terms of Service</a>
          <a href="#" className="hover:text-foreground">Shipping & Returns (India)</a>
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};
