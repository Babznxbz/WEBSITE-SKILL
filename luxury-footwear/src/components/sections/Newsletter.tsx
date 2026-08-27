import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section
      className="py-24 px-4 md:px-12 bg-[#FF4D00] text-white text-center"
      data-section-color="#FF4D00"
      data-section-text="#FFFFFF"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <span className="text-xs font-mono font-bold uppercase tracking-widest bg-white/20 text-white px-3 py-1 rounded-full">
          PRIVATE ATELIER INVITATION
        </span>

        <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white">
          Join the VÉLOCE Private Drop Circle
        </h2>

        <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto">
          Receive priority 24-hour early access to limited edition drops, bespoke trunk show invitations in Mumbai & Delhi, and private sample sales.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] font-bold px-6 py-4 rounded-md shadow-lg animate-in zoom-in-95">
            <CheckCircle className="w-5 h-5 text-[#FF4D00]" />
            <span>YOU ARE ON THE PRIVATE LIST. WELCOME TO VÉLOCE.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-4 rounded-md bg-white text-[#0A0A0A] placeholder:text-[#666666] text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-[#1A1A1A] text-white font-bold text-sm tracking-wider uppercase rounded-md hover:bg-black transition-all flex items-center justify-center gap-2"
            >
              <span>SUBSCRIBE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
