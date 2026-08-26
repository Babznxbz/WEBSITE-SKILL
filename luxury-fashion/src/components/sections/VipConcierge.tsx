import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Sparkles, Check, Calendar, MapPin, Clock } from 'lucide-react';

interface VipConciergeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VipConcierge: React.FC<VipConciergeProps> = ({ isOpen, onClose }) => {
  const [salonLocation, setSalonLocation] = useState('Paris (Rue Saint-Honoré)');
  const [patronName, setPatronName] = useState('');
  const [patronEmail, setPatronEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-noir-900 border border-gold-400/40 rounded-sm p-8 shadow-2xl z-10 text-foreground"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gold-400/20 border border-gold-400 flex items-center justify-center mb-4 text-gold-400">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl uppercase mb-2">Salon Reservation Received</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Our Private Client Director will contact you within 4 hours to confirm your private salon fitting in {salonLocation}.
              </p>
            </div>
          ) : (
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold-400">
                  HAUTE COUTURE SALON
                </span>
              </div>

              <h3 className="font-serif text-3xl uppercase tracking-tight mb-2">
                Book a Private <span className="font-editorial gold-shimmer-text lowercase">fitting</span>
              </h3>
              <p className="text-xs text-muted-foreground mb-6">
                Experience one-on-one appointments with our master tailors and preview unreleased runway capsules.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs text-foreground uppercase tracking-wider mb-1.5">
                    Select Atelier Salon
                  </label>
                  <select
                    value={salonLocation}
                    onChange={(e) => setSalonLocation(e.target.value)}
                    className="w-full bg-noir-800 border border-white/10 px-4 py-2.5 text-xs text-foreground rounded-none outline-none focus:border-gold-400"
                  >
                    <option>Paris (Rue Saint-Honoré)</option>
                    <option>Milan (Via Montenapoleone)</option>
                    <option>London (New Bond Street)</option>
                    <option>New York (Madison Avenue)</option>
                    <option>Tokyo (Ginza 6)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-foreground uppercase tracking-wider mb-1.5">
                    Patron Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Lady / Lord / M."
                    value={patronName}
                    onChange={(e) => setPatronName(e.target.value)}
                    className="w-full bg-noir-800 border border-white/10 px-4 py-2.5 text-xs text-foreground rounded-none outline-none focus:border-gold-400 font-sans"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-foreground uppercase tracking-wider mb-1.5">
                    Private Correspondence Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="patron@domain.com"
                    value={patronEmail}
                    onChange={(e) => setPatronEmail(e.target.value)}
                    className="w-full bg-noir-800 border border-white/10 px-4 py-2.5 text-xs text-foreground rounded-none outline-none focus:border-gold-400 font-sans"
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" variant="gold" size="lg" className="w-full tracking-[0.2em]">
                    Transmit Private Appointment Request
                  </Button>
                </div>
              </form>
            </div>
          )}

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
