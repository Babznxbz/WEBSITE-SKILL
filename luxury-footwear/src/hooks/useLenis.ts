import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let globalLenisInstance: Lenis | null = null;

export function scrollToTop(immediate = true) {
  if (globalLenisInstance) {
    globalLenisInstance.scrollTo(0, { immediate });
  }
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function useLenis() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let lenis: Lenis | null = null;
    let updateRaf: ((time: number) => void) | null = null;

    try {
      // Butter-smooth Lenis configuration (Apple & Awwwards tuned lerp physics)
      lenis = new Lenis({
        lerp: 0.08,           // Silky smooth interpolation
        wheelMultiplier: 1.0,  // Natural 1:1 wheel response
        touchMultiplier: 1.5,
        smoothWheel: true,
      });

      globalLenisInstance = lenis;

      // Synchronize Lenis scroll updates directly with GSAP ScrollTrigger
      lenis.on('scroll', () => {
        ScrollTrigger.update();
      });

      // Frame-rate independent RAF ticker loop
      updateRaf = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(updateRaf);
      gsap.ticker.lagSmoothing(0);
    } catch (e) {
      console.warn('Lenis scroll initialization skipped:', e);
    }

    return () => {
      if (updateRaf) gsap.ticker.remove(updateRaf);
      if (lenis) lenis.destroy();
      globalLenisInstance = null;
    };
  }, []);
}
