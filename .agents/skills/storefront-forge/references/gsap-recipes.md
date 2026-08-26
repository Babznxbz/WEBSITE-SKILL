# GSAP + Lenis Scroll Recipes

Production-ready code patterns for GSAP ScrollTrigger + Lenis smooth scroll integration. Copy these recipes directly into React components.

---

## Setup: Lenis + GSAP ScrollTrigger Bridge

This is the foundation. Initialize ONCE at the app level.

```typescript
// hooks/useLenis.ts
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false, // Don't fight native touch scroll
    });

    lenisRef.current = lenis;

    // Bridge Lenis → GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
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
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          gsap.to('body', {
            backgroundColor: bgColor,
            color: textColor || undefined,
            duration: 0.6,
            ease: 'power2.inOut',
            overwrite: 'auto',
          });
        },
        onEnterBack: () => {
          gsap.to('body', {
            backgroundColor: bgColor,
            color: textColor || undefined,
            duration: 0.6,
            ease: 'power2.inOut',
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

## Recipe 2: Staggered Section Reveal

Elements fade up with stagger as section enters viewport.

```typescript
// hooks/useReveal.ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useReveal(selector = '.reveal-child') {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const children = containerRef.current.querySelectorAll(selector);
    if (!children.length) return;

    const ctx = gsap.context(() => {
      gsap.from(children, {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selector]);

  return containerRef;
}
```

**Usage**:
```tsx
function ShopByCategory() {
  const ref = useReveal();
  return (
    <div ref={ref}>
      <h2 className="reveal-child">Shop by Category</h2>
      <div className="grid grid-cols-4 gap-6">
        <CategoryCard className="reveal-child" />
        <CategoryCard className="reveal-child" />
        <CategoryCard className="reveal-child" />
        <CategoryCard className="reveal-child" />
      </div>
    </div>
  );
}
```

---

## Recipe 3: Word-by-Word Heading Reveal

Split heading text into words and reveal with vertical stagger.

```typescript
// utils/splitText.ts
export function splitIntoWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

// Component usage:
function AnimatedHeading({ text, className }: { text: string; className?: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const words = splitIntoWords(text);

  useEffect(() => {
    if (!headingRef.current) return;
    const wordEls = headingRef.current.querySelectorAll('.word');

    const ctx = gsap.context(() => {
      gsap.from(wordEls, {
        y: 80,
        opacity: 0,
        rotationX: -15,
        stagger: 0.06,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <h2 ref={headingRef} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="word inline-block overflow-hidden">
          <span className="inline-block">{word}</span>
        </span>
      ))}
    </h2>
  );
}
```

> **Accessibility**: The `aria-label` on the heading preserves the unsplit text for screen readers. Individual word spans are decorative only.

---

## Recipe 4: Infinite Marquee / Ticker

Smooth, infinite horizontal scrolling text or logos.

```typescript
function MarqueeBanner({ items, speed = 30 }: { items: string[]; speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const width = track.scrollWidth / 2; // Content is duplicated

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -width,
        repeat: -1,
        duration: speed,
        ease: 'none',
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % width),
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div ref={trackRef} className="inline-flex">
        {/* Duplicate content for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-sm uppercase tracking-[0.2em] font-medium opacity-60">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
```

---

## Recipe 5: Pin & Scrub Section

Pin a section while content within it scrubs/animates.

```typescript
// Pinned promo banner with parallax background
useEffect(() => {
  const ctx = gsap.context(() => {
    // Pin the section
    ScrollTrigger.create({
      trigger: '.promo-section',
      start: 'top top',
      end: '+=150%',
      pin: true,
      pinSpacing: true,
    });

    // Scrubbed animation within the pinned section
    gsap.to('.promo-content', {
      y: -100,
      opacity: 1,
      scale: 1,
      scrollTrigger: {
        trigger: '.promo-section',
        start: 'top top',
        end: '+=100%',
        scrub: 1,
      },
    });

    // Parallax background
    gsap.to('.promo-bg', {
      yPercent: -30,
      scrollTrigger: {
        trigger: '.promo-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  return () => ctx.revert();
}, []);
```

---

## Recipe 6: Horizontal Scroll Gallery

Turn vertical scroll into horizontal movement for a product showcase.

```typescript
useEffect(() => {
  const container = document.querySelector('.horizontal-scroll');
  const track = document.querySelector('.horizontal-track');
  if (!container || !track) return;

  const ctx = gsap.context(() => {
    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => '+=' + (track.scrollWidth - window.innerWidth),
        invalidateOnRefresh: true,
      },
    });
  });

  return () => ctx.revert();
}, []);
```

**JSX**:
```tsx
<section className="horizontal-scroll overflow-hidden">
  <div className="horizontal-track flex gap-8 px-8" style={{ width: 'max-content' }}>
    {products.map((p) => <ProductCard key={p.id} product={p} />)}
  </div>
</section>
```

---

## Recipe 7: Footer Reveal from Behind

Footer appears to be "behind" the content, revealed as content scrolls away.

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: 'footer',
      start: 'top bottom',
      end: 'bottom bottom',
      toggleClass: { targets: '.main-content', className: 'rounded-b-3xl' },
    });
  });

  return () => ctx.revert();
}, []);
```

**CSS**:
```css
footer {
  position: sticky;
  bottom: 0;
  z-index: -1; /* Behind main content */
}
.main-content {
  position: relative;
  z-index: 1;
  background: var(--bg-primary);
  transition: border-radius 0.3s ease;
}
```

---

## Recipe 8: Product Card Hover Animation

CSS-only for performance. No GSAP needed for hover states.

```css
.product-card {
  --lift: 0px;
  --img-scale: 1;
  transition: transform 0.4s cubic-bezier(0.2, 0, 0, 1),
              box-shadow 0.4s cubic-bezier(0.2, 0, 0, 1);
}

.product-card:hover {
  --lift: -4px;
  --img-scale: 1.05;
  transform: translateY(var(--lift));
  box-shadow: var(--shadow-lg);
}

.product-card .product-image {
  transition: transform 0.6s cubic-bezier(0.2, 0, 0, 1);
  transform: scale(var(--img-scale));
}

.product-card .quick-view-btn {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.3s, transform 0.3s;
}

.product-card:hover .quick-view-btn {
  opacity: 1;
  transform: translateY(0);
}
```

---

## Reduced Motion

Always wrap GSAP setup with this check:

```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Set all animated elements to their final state
  gsap.set('.reveal-child', { opacity: 1, y: 0 });
  gsap.set('.hero-heading .word', { opacity: 1, y: 0 });
  // Do NOT initialize Lenis
  // Do NOT create ScrollTrigger instances
  return;
}
```

---

## Cleanup Pattern

Every component using GSAP MUST clean up:

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    // All GSAP animations here
  }, containerRef); // Scope to component

  return () => ctx.revert(); // Kills all animations + ScrollTriggers in scope
}, []);
```

This prevents memory leaks and conflicting animations on route changes.
