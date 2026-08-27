# GSAP + Lenis Scroll Recipes

Production-ready code patterns for GSAP ScrollTrigger + Lenis smooth scroll integration. Copy these recipes directly into React components.

---

## Setup: Lenis + GSAP ScrollTrigger Bridge

This is the foundation. Initialize ONCE at the app level.

```typescript
// hooks/useLenis.ts
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let globalLenisInstance: Lenis | null = null;

// Helper to immediately reset scroll on page transition or category navigation
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
    // Respect reduced motion
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

      // Bridge Lenis → GSAP ScrollTrigger
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
```

**Usage in App.tsx**:
```tsx
function App() {
  useLenis(); // Initialize once
  return <>{/* ... */}</>;
}
```

---

## Recipe 1: Section-Wise Background Color Transition

The signature effect. Body background smoothly transitions between section colors as user scrolls.

> **CRITICAL**: Do NOT add `transition: background-color` on `body` in CSS. Let GSAP own `body` background color transitions 100% to prevent frame stutters.

```typescript
// hooks/useSectionColors.ts
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useSectionColors() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-section-color]');

    sections.forEach((section) => {
      const bgColor = section.dataset.sectionColor;
      const textColor = section.dataset.sectionText || '';

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

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
}
```

**Usage in JSX**:
```tsx
<section data-section-color="#FAF6F0" data-section-text="#1F1713">
  {/* cream section */}
</section>
<section data-section-color="#EEF3EB" data-section-text="#1F1713">
  {/* sage section */}
</section>
<section data-section-color="#8B1A3A" data-section-text="#FFFFFF">
  {/* dark accent section with white text */}
</section>
```

---

## Recipe 2: Staggered Section Reveal with `clearProps`

Elements fade up with stagger as section enters viewport. `clearProps: 'transform'` ensures text renders crisp at 100% sharp resolution after reveal.

```typescript
// hooks/useReveal.ts
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useReveal() {
  useEffect(() => {
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
            clearProps: 'transform',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, []);
}
```

---

## Recipe 3: Parallax Image Scrub

```typescript
// Smooth 1.2s lag scrub on hero or promo image
gsap.to('.promo-parallax-img', {
  yPercent: -12,
  ease: 'none',
  scrollTrigger: {
    trigger: '.promo-parallax-img',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1.2,
  },
});
```

---

## Reduced Motion

Always wrap GSAP setup with this check:

```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  gsap.globalTimeline.progress(1);
  ScrollTrigger.getAll().forEach(t => t.kill());
}
```
