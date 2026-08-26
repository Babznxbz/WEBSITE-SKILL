# Hero Section Patterns

8 distinct hero layouts. Pick one per project based on prompt analysis. Never reuse the same pattern in the same project. Each pattern includes the JSX structure, GSAP timeline, and when to use it.

---

## 1. Editorial Split

**When**: Fashion, luxury, editorial brands. User wants elegance + model imagery.

```
┌────────────────────────────────────────────────┐
│  ┌─────────────────┐  ┌──────────────────────┐ │
│  │  OVERLINE        │  │                      │ │
│  │                  │  │                      │ │
│  │  BOLD            │  │     MODEL IMAGE      │ │
│  │  HEADLINE        │  │     (portrait        │ │
│  │                  │  │      3:4 ratio)       │ │
│  │  Subtitle text   │  │                      │ │
│  │                  │  │                      │ │
│  │  [CTA]  [CTA]   │  │                      │ │
│  └─────────────────┘  └──────────────────────┘ │
└────────────────────────────────────────────────┘
```

**Structure**: Two-column grid (55/45 or 60/40 split). Left: stacked text. Right: single tall image.

**GSAP Timeline**:
```typescript
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
tl.from('.hero-overline', { y: 20, opacity: 0, duration: 0.5 })
  .from('.hero-heading .word', { y: 80, opacity: 0, stagger: 0.06, duration: 0.7 }, '-=0.2')
  .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
  .from('.hero-cta-group', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
  .from('.hero-image-wrapper', { clipPath: 'inset(100% 0 0 0)', duration: 1.2, ease: 'power4.inOut' }, 0.2);
```

**Mobile**: Stack vertically. Image first (shorter, 16:9), then text.

---

## 2. Full-Bleed Image

**When**: Food, beauty, restaurants, brands with strong photography.

```
┌────────────────────────────────────────────────┐
│ ╔══════════════════════════════════════════════╗ │
│ ║                                              ║ │
│ ║    FULL-WIDTH IMAGE / VIDEO                  ║ │
│ ║    (with dark overlay gradient)              ║ │
│ ║                                              ║ │
│ ║         LARGE HEADLINE                       ║ │
│ ║         Subtitle                             ║ │
│ ║         [CTA Button]                         ║ │
│ ║                                              ║ │
│ ╚══════════════════════════════════════════════╝ │
└────────────────────────────────────────────────┘
```

**Structure**: Full-viewport height. Background image with `linear-gradient(to top, rgba(0,0,0,0.6), transparent)` overlay. Centered text.

**GSAP Timeline**:
```typescript
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
tl.from('.hero-bg', { scale: 1.15, duration: 1.5, ease: 'power2.out' })
  .from('.hero-headline', { y: 60, opacity: 0, duration: 0.8 }, 0.5)
  .from('.hero-sub', { y: 30, opacity: 0, duration: 0.6 }, 0.8)
  .from('.hero-cta', { y: 20, opacity: 0, duration: 0.5 }, 1.0);
```

**Scroll**: Parallax on background image (yPercent -20 over scroll range).

---

## 3. Bento Grid

**When**: General stores, marketplaces, multi-product brands. Strong stats/social proof.

```
┌────────────────────────────────────────────────┐
│ ┌──────────────────────┐ ┌─────────┐ ┌──────┐ │
│ │                      │ │ PRODUCT │ │ STAT │ │
│ │   BOLD HEADLINE      │ │  IMAGE  │ │ 14K  │ │
│ │   with mixed-weight  │ │  + dots │ │items │ │
│ │   typography         │ ├─────────┤ ├──────┤ │
│ │                      │ │ 50% OFF │ │ 8.9K │ │
│ │   [EXPLORE NOW →]    │ │ BANNER  │ │users │ │
│ └──────────────────────┘ └─────────┘ └──────┘ │
│ ┌─────────────────────────────────────────────┐ │
│ │  #newcollection  #trending  #style  #2026   │ │
│ └─────────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘
```

**Structure**: CSS Grid with mixed card sizes. Main headline card (2-col span), product preview card, stats card, promo card, tags bar.

**GSAP Timeline**:
```typescript
const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
tl.from('.bento-card', {
  y: 40, opacity: 0, scale: 0.96,
  stagger: { each: 0.1, from: 'start' },
  duration: 0.7
});
```

---

## 4. Parallax Scroll

**When**: Furniture, interior, lifestyle brands. Creates depth and luxury feel.

```
┌────────────────────────────────────────────────┐
│    LAYER 1 (far): subtle texture/pattern       │
│  ┌────────────────────────────────────────┐     │
│  │  LAYER 2 (mid): product / model image  │     │
│  │                                        │     │
│  │        LAYER 3 (front):                │     │
│  │        HEADLINE TEXT                   │     │
│  │        overlapping the image           │     │
│  │                                        │     │
│  │        [Explore →]                     │     │
│  └────────────────────────────────────────┘     │
└────────────────────────────────────────────────┘
```

**GSAP**: Three layers moving at different speeds via ScrollTrigger scrub.
```typescript
gsap.to('.parallax-bg', { yPercent: -30, scrollTrigger: { trigger: '.hero', scrub: true } });
gsap.to('.parallax-mid', { yPercent: -15, scrollTrigger: { trigger: '.hero', scrub: true } });
gsap.to('.parallax-front', { yPercent: -5, scrollTrigger: { trigger: '.hero', scrub: true } });
```

---

## 5. Text-Only Statement

**When**: SaaS, tech, minimal brands. Bold typography is the hero visual.

```
┌────────────────────────────────────────────────┐
│                                                │
│                                                │
│        WHERE                                   │
│        — STYLE                                 │
│        LIVES — NOW                             │
│                                                │
│        /FASHION        280K                    │
│                        PEOPLE WE INSPIRE       │
│        Explore curated     [●●●]               │
│        drops and...        avatars              │
│                                                │
│        [Shop Now →]                            │
│                                                │
└────────────────────────────────────────────────┘
```

**GSAP**: Word-by-word stagger reveal is the star:
```typescript
// Split each word into spans first
const words = SplitText('.hero-text', { type: 'words' }); // or manual split
gsap.from(words, {
  y: 120, opacity: 0, rotateX: -40,
  stagger: 0.05, duration: 0.8,
  ease: 'power3.out'
});
```

---

## 6. Interactive Slider

**When**: Shoe stores, product-focused brands, seasonal campaigns.

```
┌────────────────────────────────────────────────┐
│                                                │
│   THE BEST [PRODUCT] ARE ONLY HERE             │
│                                                │
│   ┌──────────────────────────────────────┐     │
│   │                                      │     │
│   │         DRAGGABLE / SWIPEABLE        │     │
│   │         IMAGE CAROUSEL               │     │
│   │                                      │     │
│   │   ┌─────────────┐                    │     │
│   │   │ SWIPE →     │                    │     │
│   │   │ DISCOVER    │                    │     │
│   │   └─────────────┘                    │     │
│   └──────────────────────────────────────┘     │
│                                                │
│  ● ○ ○ ○ ○                                    │
└────────────────────────────────────────────────┘
```

**GSAP**: Draggable or GSAP snap-scroll carousel.
```typescript
const slides = gsap.utils.toArray('.slide');
gsap.to('.slides-track', {
  xPercent: -100 * (slides.length - 1) / slides.length,
  ease: 'none',
  scrollTrigger: {
    trigger: '.slider-container',
    pin: true,
    scrub: 1,
    snap: 1 / (slides.length - 1),
    end: () => '+=' + document.querySelector('.slides-track').offsetWidth,
  },
});
```

---

## 7. Split Screen

**When**: Dual-product brands, before/after, men vs women collections.

```
┌────────────────────────────────────────────────┐
│ ┌──────────────────┐┌──────────────────┐       │
│ │                  ││                  │       │
│ │   LEFT IMAGE     ││   RIGHT IMAGE    │       │
│ │   (Men's)        ││   (Women's)      │       │
│ │                  ││                  │       │
│ │  ┌────────────┐  ││  ┌────────────┐  │       │
│ │  │ SHOP MEN → │  ││  │SHOP WOMEN→ │  │       │
│ │  └────────────┘  ││  └────────────┘  │       │
│ │                  ││                  │       │
│ └──────────────────┘└──────────────────┘       │
└────────────────────────────────────────────────┘
```

**GSAP**: Each half slides in from opposite directions:
```typescript
gsap.from('.split-left', { xPercent: -100, duration: 1, ease: 'power3.inOut' });
gsap.from('.split-right', { xPercent: 100, duration: 1, ease: 'power3.inOut' });
```

---

## 8. Asymmetric Collage

**When**: Creative agencies, editorial, lookbooks, artistic brands.

```
┌────────────────────────────────────────────────┐
│                                                │
│    All — about                                 │
│    moments ©26      ┌──────┐                   │
│                     │ img1 │  ┌──────────┐     │
│  ┌──────────────┐   └──────┘  │          │     │
│  │              │             │  img2    │     │
│  │   img3       │   ($120)    │          │     │
│  │   large      │             └──────────┘     │
│  │              │                              │
│  └──────────────┘     ┌──────────┐             │
│                       │  img4    │             │
│   [LEARN MORE →]      │  (45%)   │             │
│                       └──────────┘             │
└────────────────────────────────────────────────┘
```

**GSAP**: Each image enters from different positions with different delays:
```typescript
const images = gsap.utils.toArray('.collage-img');
images.forEach((img, i) => {
  gsap.from(img, {
    y: gsap.utils.random(50, 150),
    x: gsap.utils.random(-40, 40),
    opacity: 0,
    rotation: gsap.utils.random(-5, 5),
    duration: 1.2,
    delay: i * 0.15,
    ease: 'power3.out',
  });
});
```

---

## Selection Logic

When analyzing the user's prompt and reference images, select the hero that best matches:

```
IF references show split layout with model → Editorial Split
IF references show full-width imagery → Full-Bleed Image
IF references show grid cards with stats → Bento Grid
IF references show layered depth → Parallax Scroll
IF references show big typography, no images → Text-Only Statement
IF references show carousel/slider → Interactive Slider
IF references show two halves → Split Screen
IF references show scattered images → Asymmetric Collage
ELSE → default to Editorial Split for fashion, Text-Only for tech
```
