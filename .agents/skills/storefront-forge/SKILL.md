---
name: storefront-forge
description: >-
  The all-in-one, anti-AI-slop web design & e-commerce skill. Systematically builds Dribbble/Awwwards-level
  websites with GSAP + Lenis scroll animations, section-wise color transitions, 8 hero section patterns,
  6 navbar patterns, Shopify-style shop architecture, product pages, color palette generation with WCAG
  contrast verification, curated typography systems, shadcn/ui components, and a final interface review
  quality gate. Triggers on /website, "build me a site", "make a store", "landing page", "e-commerce",
  "fashion site", "portfolio", or any request for a premium, motion-rich, anti-slop website.
---

# Storefront Forge

Build premium, motion-rich websites that look like they belong on Dribbble's front page — not like AI generated them. This skill orchestrates the entire process from prompt analysis to final quality review, one disciplined step at a time.

**Stack**: React 18 + TypeScript + Vite + Tailwind CSS + GSAP + Lenis + shadcn/ui

---

## The Pipeline

When a user triggers this skill (via `/website <prompt>`, or any request for a website/store/landing page), execute these phases in exact order. Never skip a phase. Never jump ahead.

```
┌─────────────────────────────────────────────────────┐
│  PHASE 1 → Parse the Prompt (understand intent)     │
│  PHASE 2 → Art Direction (palette, type, mood)      │
│  PHASE 3 → Architecture (pages, sections, data)     │
│  PHASE 4 → Scaffold (Vite + deps + file structure)  │
│  PHASE 5 → Build Sections (hero → footer, top-down) │
│  PHASE 6 → Wire GSAP + Lenis (motion layer)         │
│  PHASE 7 → Polish (UI details, states, responsive)  │
│  PHASE 8 → Review (anti-slop quality gate)           │
│  PHASE 9 → Build & Validate (tsc + vite build)      │
└─────────────────────────────────────────────────────┘
```

---

## Phase 1: Parse the Prompt

Read the user's request and extract these decisions before writing any code:

### 1.1 Website Type Detection
| Signal in Prompt | Type | Default Hero | Default Navbar |
|-----------------|------|-------------|----------------|
| "fashion", "clothing", "apparel", "luxury" | Fashion Store | Editorial Split | Mega Menu |
| "food", "restaurant", "café", "bakery" | Food & Beverage | Full-Bleed Image | Transparent Overlay |
| "tech", "SaaS", "app", "startup" | Tech/SaaS | Text-Only Statement | Minimal Clean |
| "portfolio", "agency", "creative" | Portfolio | Asymmetric Collage | Sidebar Hamburger |
| "beauty", "skincare", "cosmetics" | Beauty Store | Full-Bleed Image | Centered Logo |
| "shoes", "sneakers", "footwear" | Shoe Store | Interactive Slider | Sticky Transform |
| "furniture", "home", "interior" | Home Store | Parallax Scroll | Minimal Clean |
| "general store", "marketplace" | General E-commerce | Bento Grid | Mega Menu |

If the type is ambiguous, ask once. Never guess wrong and build the whole thing.

### 1.2 Extract Requirements Checklist
Before proceeding, confirm or infer:
- [ ] **Brand Name** — if not given, suggest 3 options matching the mood
- [ ] **Audience / Region** — determines currency, language, cultural tone
- [ ] **Color Mood** — luxury/warm/cool/earthy/bold/minimal/street (extract from adjectives)
- [ ] **Categories** — for shops: what departments? (Men/Women/Kids/Unisex, etc.)
- [ ] **Sub-categories** — what product types per department?
- [ ] **Price Range & Currency** — ₹ for India, $ for US, etc.
- [ ] **Pages Needed** — Home, Shop, Product Detail, Collections, Journal/Blog, About, Contact
- [ ] **Hero Preference** — user may specify via reference images; match to one of 8 patterns
- [ ] **Special Features** — wishlist? search? newsletter? Instagram feed?

### 1.3 Reference Image Analysis
If the user provides reference images or screenshots:
1. Do NOT copy them. Extract only: layout structure, color temperature, typography weight, spacing density, motion hints.
2. Map the reference to the closest hero pattern and navbar pattern from [hero-patterns.md](references/hero-patterns.md) and [navbar-patterns.md](references/navbar-patterns.md).
3. Note specific elements the user explicitly calls out (e.g., "this type of navbar", "this hero layout").

---

## Phase 2: Art Direction

### 2.1 Color System
Follow the rules in [color-palettes.md](references/color-palettes.md). The system is:

1. **Pick a mood** from the prompt analysis.
2. **Generate or select a palette** with these mandatory roles:
   - `--bg-primary` — main page background (light: cream/white, dark: near-black)
   - `--bg-secondary` — alternate section background
   - `--bg-tertiary` — third section variant
   - `--bg-accent` — highlight section or banner
   - `--text-primary` — main body text (must pass WCAG AA on bg-primary)
   - `--text-secondary` — muted/supporting text
   - `--accent` — primary action color (buttons, links, badges)
   - `--accent-hover` — darker/lighter variant for hover
   - `--border` — subtle borders and dividers
   - `--surface` — card backgrounds
3. **Verify contrast** by running `scripts/check_contrast.py` or manually confirming:
   - Text on every background ≥ 4.5:1 (AA normal text)
   - Large text on every background ≥ 3:1 (AA large text)
   - Interactive elements ≥ 3:1 against adjacent colors
4. **Map section colors** — create a section-wise color progression:
   ```
   Hero:           bg-primary    (cream #FAF6F0)
   Shop by Cat:    bg-secondary  (sage #EEF3EB)
   New Arrivals:   bg-primary    (cream #FAF6F0)
   Banner/CTA:     bg-accent     (deep rose #8B1A3A)
   Bestsellers:    bg-tertiary   (blush #FAF0F2)
   Brand Story:    bg-primary    (cream #FAF6F0)
   Journal:        bg-secondary  (sage #EEF3EB)
   Newsletter:     bg-accent     (deep rose #8B1A3A)
   Footer:         text-primary  (espresso #1F1713)
   ```

### 2.2 Typography System
Follow [typography-system.md](references/typography-system.md):

1. **Pick one display font** for headings (bold, distinctive character).
2. **Pick one body font** for running text (readable, neutral).
3. **Define the type scale** with semantic names:
   ```css
   --text-display:   clamp(3rem, 5vw + 1rem, 6rem);    /* Hero headline */
   --text-h1:        clamp(2.25rem, 3vw + 1rem, 3.5rem); /* Page titles */
   --text-h2:        clamp(1.75rem, 2vw + 0.5rem, 2.5rem); /* Section titles */
   --text-h3:        clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem); /* Card titles */
   --text-body:      1rem;                               /* 16px body */
   --text-body-sm:   0.875rem;                           /* 14px small body */
   --text-caption:   0.75rem;                            /* 12px labels */
   --text-overline:  0.6875rem;                          /* 11px uppercase labels */
   ```
4. **Line-height**: Headings 1.1, Body 1.6, Captions 1.4
5. **Letter-spacing**: Display headings -0.02em, Overlines +0.1em, Body 0
6. **Text-wrap**: `balance` on headings, `pretty` on descriptions

### 2.3 Spacing & Radius System
```css
--space-xs:   0.25rem;   /* 4px */
--space-sm:   0.5rem;    /* 8px */
--space-md:   1rem;      /* 16px */
--space-lg:   1.5rem;    /* 24px */
--space-xl:   2rem;      /* 32px */
--space-2xl:  3rem;      /* 48px */
--space-3xl:  4rem;      /* 64px */
--space-4xl:  6rem;      /* 96px */
--section-y:  clamp(4rem, 8vw, 8rem); /* Section vertical padding */

--radius-sm:  0.375rem;  /* 6px — buttons, badges */
--radius-md:  0.75rem;   /* 12px — cards, inputs */
--radius-lg:  1rem;      /* 16px — modals, panels */
--radius-xl:  1.5rem;    /* 24px — hero cards */
--radius-full: 9999px;   /* pills */
```

### 2.4 Write the Art Direction Brief
Before any code, write a compact brief (5-10 lines) that captures:
- Visual thesis (one sentence: what this site *feels* like)
- Hero pattern name (from the 8 options)
- Navbar pattern name (from the 6 options)
- Font pairing (Display + Body)
- Primary palette (5 key colors with hex)
- Section color sequence
- Motion narrative (what the scroll journey feels like)

---

## Phase 3: Architecture

### 3.1 Page Structure
Based on the website type, define all pages. A fashion store needs:

```
📁 src/
├── App.tsx                    # Router + layout wrapper
├── main.tsx                   # Entry point
├── index.css                  # Design tokens + global styles
├── lib/
│   └── utils.ts               # cn() helper
├── types/
│   └── store.ts               # TypeScript types
├── data/
│   ├── products.ts            # Product catalog
│   ├── categories.ts          # Category taxonomy
│   └── content.ts             # Copy, articles, testimonials
├── hooks/
│   ├── useLenis.ts            # Lenis smooth scroll hook
│   ├── useGsap.ts             # GSAP animation hooks
│   └── useCart.ts              # Cart state management
├── components/
│   ├── ui/                    # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── sheet.tsx          # For cart drawer
│   │   ├── dialog.tsx         # For quick view
│   │   ├── badge.tsx
│   │   └── input.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── PageTransition.tsx
│   ├── sections/              # Landing page sections
│   │   ├── HeroSection.tsx
│   │   ├── MarqueeBanner.tsx
│   │   ├── ShopByCategory.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── PromoBanner.tsx
│   │   ├── BestSellers.tsx
│   │   ├── BrandStory.tsx
│   │   ├── Testimonials.tsx
│   │   ├── JournalPreview.tsx
│   │   └── NewsletterSignup.tsx
│   ├── shop/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── FilterSidebar.tsx
│   │   ├── SortDropdown.tsx
│   │   └── ProductQuickView.tsx
│   ├── product/
│   │   ├── ProductDetail.tsx
│   │   ├── ImageGallery.tsx
│   │   ├── SizeColorPicker.tsx
│   │   ├── ProductInfo.tsx
│   │   └── RelatedProducts.tsx
│   └── cart/
│       ├── CartDrawer.tsx
│       ├── CartItem.tsx
│       └── CartSummary.tsx
└── pages/                     # Page compositions
    ├── HomePage.tsx
    ├── ShopPage.tsx
    ├── ProductPage.tsx
    ├── CollectionsPage.tsx
    ├── JournalPage.tsx
    └── AboutPage.tsx
```

### 3.2 Data Architecture
Define product and category types BEFORE building components:
```typescript
type Gender = 'Men' | 'Women' | 'Unisex';
type Department = 'Shirts' | 'T-Shirts' | 'Pants' | 'Outerwear' | 'Dresses' | 'Accessories' | 'Shoes';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  gender: Gender;
  department: Department;
  images: string[];       // Unsplash URLs or generated
  colors: string[];
  sizes: string[];
  description: string;
  tags: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  discount?: number;      // percentage
}
```

### 3.3 Section Sequence
Map each section to its background color, animation trigger, and content:
```
| # | Section          | Background    | GSAP Trigger          | Content Source     |
|---|-----------------|---------------|-----------------------|-------------------|
| 1 | Hero            | bg-primary    | Intro timeline        | content.ts        |
| 2 | Marquee Banner  | accent        | Horizontal loop       | content.ts        |
| 3 | Shop by Category| bg-secondary  | Stagger fade-up       | categories.ts     |
| 4 | New Arrivals    | bg-primary    | Card stagger          | products.ts       |
| 5 | Promo Banner    | bg-accent     | Pin + parallax        | content.ts        |
| 6 | Bestsellers     | bg-tertiary   | Horizontal scroll     | products.ts       |
| 7 | Brand Story     | bg-primary    | Split text reveal     | content.ts        |
| 8 | Testimonials    | bg-secondary  | Fade carousel         | content.ts        |
| 9 | Journal Preview | bg-primary    | Card stagger          | content.ts        |
| 10| Newsletter      | bg-accent     | Scale-in              | -                 |
| 11| Footer          | dark          | Reveal from behind    | -                 |
```

---

## Phase 4: Scaffold

### 4.1 Initialize Project
```bash
npx -y create-vite@latest ./ --template react-ts
npm install
npm install gsap @studio-freight/lenis framer-motion clsx tailwind-merge
npm install -D tailwindcss @tailwindcss/vite
```

### 4.2 Configure Tailwind
In `vite.config.ts`:
```typescript
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### 4.3 Write Design Tokens
In `src/index.css`, define ALL tokens from Phase 2 as CSS custom properties. Use `@theme` for Tailwind integration. Include:
- Color tokens (with section-wise variants)
- Typography tokens
- Spacing tokens
- Border radius tokens
- Shadow system (3 elevation levels)
- Transition tokens

### 4.4 Create Type Definitions
Write ALL TypeScript interfaces before any component code.

### 4.5 Create Data Files
Populate products, categories, and content with REAL data (not Lorem ipsum). Use Indian pricing if audience is India. Minimum:
- 16 products (8 Men, 8 Women for fashion)
- 4-6 categories with images
- 3 journal articles
- 3 testimonials
- Brand story copy

---

## Phase 5: Build Sections (Top-Down)

Build each section in this exact order. For each section:
1. Read the pattern from the references
2. Build the JSX structure
3. Add Tailwind styling with design tokens
4. Prepare animation-ready markup (data attributes, refs)

### 5.1 Navbar
Select from [navbar-patterns.md](references/navbar-patterns.md). Must include:
- Logo/brand name (left or center)
- Navigation links: Home, Shop (with dropdown), Collections, Journal, About
- Right-side: Search icon, Cart icon with count
- Mobile: hamburger → full-screen or slide-out menu
- Scroll behavior: transparent → solid, or shrink, or color change

### 5.2 Hero Section
Select from [hero-patterns.md](references/hero-patterns.md). Must include:
- A primary message (brand tagline or seasonal headline)
- At least one CTA button
- A hero image or visual element
- The hero must be **different every time** — never the same layout twice
- GSAP intro timeline prepared (animated in Phase 6)

### 5.3 Remaining Sections
Build in the order from Phase 3.3's section sequence. Each section:
- Uses its assigned background color
- Has semantic HTML structure
- Has `ref` hooks for GSAP ScrollTrigger
- Has responsive grid/flex layout
- Uses real content from data files

### 5.4 Shop Pages
Follow [shop-architecture.md](references/shop-architecture.md):
- **Shop Page**: Category filter sidebar + product grid + sort + pagination
- **Product Detail Page**: Image gallery + info panel + size/color pickers + add to cart + related products
- **Cart**: Slide-out drawer (shadcn Sheet) with item list, quantity controls, subtotal

### 5.5 Footer
Full footer with:
- Brand description
- Navigation columns (Shop, Company, Support)
- Social media links (icons, not text)
- Payment method icons
- Copyright line

---

## Phase 6: Wire GSAP + Lenis Motion

This is where the site comes alive. Follow [gsap-recipes.md](references/gsap-recipes.md).

### 6.1 Lenis Smooth Scroll
```typescript
// hooks/useLenis.ts
import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lenis.destroy();
      return;
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);
}
```

### 6.2 Section-Wise Color Transitions
The signature effect — background color smoothly transitions as user scrolls:
```typescript
// In App.tsx or a dedicated hook
useEffect(() => {
  const sections = document.querySelectorAll('[data-bg-color]');
  sections.forEach((section) => {
    const color = section.getAttribute('data-bg-color');
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => gsap.to('body', { backgroundColor: color, duration: 0.8, ease: 'power2.inOut' }),
      onEnterBack: () => gsap.to('body', { backgroundColor: color, duration: 0.8, ease: 'power2.inOut' }),
    });
  });
}, []);
```

### 6.3 Hero Intro Timeline
A composed GSAP timeline that plays on page load:
```typescript
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
tl.from('.hero-overline', { y: 30, opacity: 0, duration: 0.6 })
  .from('.hero-heading span', { y: 100, opacity: 0, stagger: 0.08, duration: 0.8 }, '-=0.3')
  .from('.hero-cta', { y: 20, opacity: 0, duration: 0.5 }, '-=0.4')
  .from('.hero-image', { scale: 1.1, opacity: 0, duration: 1.2 }, '-=0.8');
```

### 6.4 Scroll-Triggered Section Reveals
Every section gets a staggered entrance:
```typescript
gsap.utils.toArray('.reveal-section').forEach((section) => {
  const children = section.querySelectorAll('.reveal-child');
  gsap.from(children, {
    y: 60,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
});
```

### 6.5 Marquee/Ticker Banner
Infinite horizontal scroll:
```typescript
const marquee = gsap.to('.marquee-track', {
  xPercent: -50,
  repeat: -1,
  duration: 20,
  ease: 'none',
});
```

### 6.6 Product Card Hovers
```css
.product-card:hover .product-image {
  transform: scale(1.05);
  transition: transform 0.6s cubic-bezier(0.2, 0, 0, 1);
}
.product-card:hover .product-overlay {
  opacity: 1;
  transition: opacity 0.3s ease;
}
```

### 6.7 Pin & Parallax (for Promo Banner)
```typescript
ScrollTrigger.create({
  trigger: '.promo-banner',
  start: 'top top',
  end: '+=100%',
  pin: true,
  scrub: 1,
});
gsap.to('.promo-bg-image', {
  yPercent: -20,
  scrollTrigger: {
    trigger: '.promo-banner',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
});
```

### 6.8 Reduced Motion
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  gsap.globalTimeline.progress(1); // Jump to end state
  ScrollTrigger.getAll().forEach(t => t.kill());
}
```

---

## Phase 7: Polish

Follow [anti-slop-checklist.md](references/anti-slop-checklist.md) and the `better-*` skill principles.

### 7.1 Border Radius (from better-ui)
- Outer radius = inner radius + padding. Always.
- Cards: `--radius-md` (12px)
- Buttons inside cards: `--radius-sm` (6px) with adequate padding

### 7.2 Shadows (from better-ui)
Three elevation levels:
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06);
--shadow-md: 0 4px 6px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.06);
--shadow-lg: 0 10px 25px rgba(0,0,0,0.06), 0 4px 10px rgba(0,0,0,0.04);
```

### 7.3 Image Treatment
- Every `<img>` gets a `1px` outline at `rgba(0,0,0,0.06)` in light mode
- All product images: consistent aspect ratio (3:4 for fashion)
- `object-fit: cover` with deliberate `object-position`
- Lazy loading below the fold

### 7.4 Interactive States
Every interactive element MUST have:
- `:hover` — subtle scale or color shift
- `:focus-visible` — visible outline (2px solid accent, 2px offset)
- `:active` — pressed state (scale 0.98 or darker background)
- `:disabled` — reduced opacity + no pointer events
- Touch: adequate tap targets (44x44px minimum)

### 7.5 Responsive
- Mobile-first: default styles → `md:` → `lg:` → `xl:`
- Navigation: hamburger below `lg:`
- Product grid: 1 col → 2 col → 3 col → 4 col
- Hero: stack vertically on mobile
- Typography: `clamp()` for fluid sizing (already in tokens)

### 7.6 Accessibility
- Semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- `aria-label` on icon-only buttons
- Skip-to-content link
- Color contrast verified (Phase 2)
- `prefers-reduced-motion` respected (Phase 6)

---

## Phase 8: Interface Review (Quality Gate)

Before declaring done, run through this checklist. Every item must pass.

### 8.1 Anti-Slop Check
Refer to [anti-slop-checklist.md](references/anti-slop-checklist.md). Automated scan:
- [ ] No indigo/purple gradient backgrounds
- [ ] No emoji used as icons
- [ ] No Lorem ipsum or placeholder text anywhere
- [ ] No generic stock card layouts repeated identically
- [ ] No fake testimonials with AI-generated names
- [ ] No default Tailwind colors (blue-500, indigo-600)
- [ ] No glass/blur applied to everything
- [ ] No decorative bento grid with no information hierarchy
- [ ] No gradient blob backgrounds
- [ ] No "AI-generated" looking symmetric layouts

### 8.2 Design Quality Check
- [ ] Hero section has a distinctive, memorable visual idea
- [ ] Each section has a different layout rhythm (no monotony)
- [ ] Color palette is harmonious with verified contrast
- [ ] Typography hierarchy is clear: display > h1 > h2 > h3 > body > caption
- [ ] Spacing is consistent and uses the token system
- [ ] Border radius follows the concentric rule
- [ ] Shadows create depth without heaviness
- [ ] Images have intentional crops and treatments
- [ ] Hover states are designed, not default browser states
- [ ] Motion has narrative purpose, not random decoration

### 8.3 Functional Check
- [ ] All navigation links work (hash routing or page state)
- [ ] Browser back/forward buttons work
- [ ] Cart add/remove/update works
- [ ] Product filtering works
- [ ] Quick view modal opens and closes
- [ ] Mobile menu opens and closes
- [ ] Escape key closes modals
- [ ] All buttons have visible, high-contrast text
- [ ] Page scrolls smoothly with Lenis
- [ ] GSAP animations play correctly on scroll

### 8.4 Build Check
```bash
npx tsc --noEmit        # Type check
npm run build           # Production build
# Both must exit with code 0
```

---

## Phase 9: Build & Validate

1. Run `npm run build` — fix ALL errors
2. Start dev server — visually verify in browser
3. Test at desktop (1440px), tablet (768px), and mobile (375px)
4. Verify scroll animations play
5. Test keyboard navigation
6. Report results to user

---

## Pattern References

These files contain the exact code patterns and implementation details:

| Reference | Purpose |
|-----------|---------|
| [hero-patterns.md](references/hero-patterns.md) | 8 hero section layouts with GSAP timelines |
| [navbar-patterns.md](references/navbar-patterns.md) | 6 navbar patterns with scroll behavior |
| [gsap-recipes.md](references/gsap-recipes.md) | GSAP + Lenis integration recipes |
| [shop-architecture.md](references/shop-architecture.md) | Complete shop page patterns |
| [product-page-patterns.md](references/product-page-patterns.md) | Product detail page layouts |
| [color-palettes.md](references/color-palettes.md) | Palette system + curated collections |
| [typography-system.md](references/typography-system.md) | Type pairings + scale |
| [shadcn-components.md](references/shadcn-components.md) | Component usage guide |
| [anti-slop-checklist.md](references/anti-slop-checklist.md) | Quality gate checklist |

## Script Tools

| Script | Usage |
|--------|-------|
| `scripts/check_contrast.py` | `python check_contrast.py "#FAF6F0" "#1F1713" "#E11D48"` — prints contrast matrix |
| `scripts/generate_palette.py` | `python generate_palette.py --mood luxury` — generates verified palette |
| `scripts/extract_palette.py` | `python extract_palette.py image.jpg` — extracts palette from reference |

---

## Rules for the Agent

1. **Never skip phases.** Even if you "know" what to build, follow the pipeline.
2. **Data before components.** Define types and data before writing JSX.
3. **Tokens before styles.** CSS custom properties before component styling.
4. **Real content only.** No Lorem ipsum, no placeholder names, no fake data.
5. **One smooth-scroll engine.** Lenis only. Never Locomotive + Lenis together.
6. **GSAP for scroll, CSS for interaction.** ScrollTrigger for scroll animations, CSS transitions for hover/focus/active.
7. **No emoji as icons.** Use Lucide React or SVG icons.
8. **Test what you build.** Run `tsc && vite build` before saying you're done.
9. **Section colors flow.** Every section has an assigned background from the palette — they must alternate and transition.
10. **The hero is never the same twice.** Choose a different hero pattern for each new project.
