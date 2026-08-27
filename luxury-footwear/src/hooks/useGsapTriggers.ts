import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapTriggers(dependency?: any) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Precise Section-wise Background & Text Color Transitions
      const sections = document.querySelectorAll<HTMLElement>('[data-section-color]');
      sections.forEach((section) => {
        const bgColor = section.dataset.sectionColor;
        const textColor = section.dataset.sectionText;

        if (!bgColor) return;

        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => {
            gsap.to('body', {
              backgroundColor: bgColor,
              color: textColor || undefined,
              duration: 0.7,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          },
          onEnterBack: () => {
            gsap.to('body', {
              backgroundColor: bgColor,
              color: textColor || undefined,
              duration: 0.7,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          },
        });
      });

      // 2. Silky Staggered Reveals for Cards & Headings (Emil Design Engineering Curve)
      const sectionsList = document.querySelectorAll<HTMLElement>('section');
      sectionsList.forEach((section) => {
        const revealItems = section.querySelectorAll('.product-card, .group, h2, h3');
        if (revealItems.length > 0) {
          gsap.fromTo(
            revealItems,
            { y: 32, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.06,
              duration: 0.8,
              ease: 'power3.out',
              clearProps: 'transform', // Clears inline transform after animation completes for 100% sharp rendering
              scrollTrigger: {
                trigger: section,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });

      // 3. Ultra-Smooth Parallax Scrub for Pinned Promo
      const promoImage = document.querySelector('.promo-parallax-img');
      if (promoImage) {
        gsap.to(promoImage, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: promoImage.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2, // Smooth 1.2s lag scrub
          },
        });
      }
    });

    // Refresh ScrollTrigger after layout calculation
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [dependency]);
}
