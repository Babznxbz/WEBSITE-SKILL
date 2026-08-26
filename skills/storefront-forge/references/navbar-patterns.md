# Navbar Patterns

6 navigation patterns. Select based on the website type and hero pattern.

---

## 1. Minimal Clean

**When**: Skincare, portfolio, minimal brands. Works with any hero.

```
┌────────────────────────────────────────────────────┐
│  Veroné          Shop   Journal   About    🔍 👤 🛒 │
└────────────────────────────────────────────────────┘
```

**Behavior**:
- Fixed at top, white/cream background
- Subtle bottom border (`1px solid var(--border)`)
- On scroll: adds `box-shadow: var(--shadow-sm)`
- Logo left, links center-right, icons far right
- Mobile: hamburger → full-screen overlay with staggered link reveal

**Height**: 64px desktop, 56px mobile

---

## 2. Mega Menu

**When**: Fashion stores, multi-category shops. Shopify-style.

```
┌────────────────────────────────────────────────────┐
│  BRAND       Home  Shop▾  Collections  Blog  About  🔍 🛒(2) │
├────────────────────────────────────────────────────┤
│  (dropdown on Shop hover)                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────┐ │
│  │ MEN      │ │ WOMEN    │ │ NEW IN   │ │      │ │
│  │ Shirts   │ │ Dresses  │ │ SS '26   │ │ IMG  │ │
│  │ T-Shirts │ │ Blouses  │ │ Lookbook │ │      │ │
│  │ Pants    │ │ Pants    │ │          │ │      │ │
│  │ Outerwear│ │ Outerwear│ │          │ │      │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────┘ │
└────────────────────────────────────────────────────┘
```

**Behavior**:
- Shop link triggers dropdown panel (not a small popup — a full-width mega menu)
- Dropdown: 3-4 columns of category links + 1 column with a featured image
- Opens on hover (desktop) or tap (mobile)
- GSAP: dropdown slides down with `clipPath: inset(0 0 100% 0)` → `inset(0)`, 0.3s
- Mobile: full-screen slide-out with nested accordions for categories

---

## 3. Transparent Overlay

**When**: Full-bleed hero, immersive brands. Text over the hero image.

```
┌────────────────────────────────────────────────────┐
│  ☰  BRAND                              🔍 🛒     │  ← transparent
│                                                    │
│     (hero image fills behind)                      │
└────────────────────────────────────────────────────┘

After scroll ↓↓↓

┌────────────────────────────────────────────────────┐
│  ☰  BRAND     Home  Shop  Blog  About   🔍 🛒     │  ← solid bg
└────────────────────────────────────────────────────┘
```

**Behavior**:
- Initially transparent with white text over the hero
- On scroll past hero height: solid background + dark text
- Transition: `background-color 0.3s, color 0.3s`
- Logo appears on scroll (was hidden while transparent, or stays)
- Hamburger always visible on left

**GSAP ScrollTrigger**:
```typescript
ScrollTrigger.create({
  trigger: '.hero-section',
  start: 'bottom 80px',
  onEnter: () => navbar.classList.add('navbar--solid'),
  onLeaveBack: () => navbar.classList.remove('navbar--solid'),
});
```

---

## 4. Sidebar Hamburger

**When**: Portfolio, agency, creative brands. Dramatic navigation experience.

```
Default:
┌────────────────────────────────────────────────────┐
│  ☰                BRAND                       🛒   │
└────────────────────────────────────────────────────┘

Open state (full-screen overlay):
┌────────────────────────────────────────────────────┐
│  ✕                BRAND                       🛒   │
├────────────────────────────────────────────────────┤
│                                                    │
│           HOME                                     │
│           SHOP                                     │
│           COLLECTIONS                              │
│           JOURNAL                                  │
│           ABOUT                                    │
│                                                    │
│           ─────────                                │
│           Instagram  Twitter  Pinterest            │
│                                                    │
└────────────────────────────────────────────────────┘
```

**GSAP**:
```typescript
const menuTl = gsap.timeline({ paused: true });
menuTl
  .to('.menu-overlay', { clipPath: 'inset(0)', duration: 0.6, ease: 'power4.inOut' })
  .from('.menu-link', { y: 60, opacity: 0, stagger: 0.08, duration: 0.5 }, '-=0.2')
  .from('.menu-social', { y: 20, opacity: 0, duration: 0.4 }, '-=0.2');
```

---

## 5. Centered Logo

**When**: Beauty, luxury, editorial brands. Symmetrical elegance.

```
┌────────────────────────────────────────────────────┐
│  Home  Shop          BRAND          About  🔍 🛒   │
└────────────────────────────────────────────────────┘
```

**Behavior**:
- Logo absolutely centered
- Links split: 2-3 on left, 2-3 on right
- Icons on far right
- On scroll: slight scale-down of logo (0.85)
- Mobile: logo stays centered, hamburger left, cart right

---

## 6. Sticky Transform

**When**: Shoe stores, streetwear, bold brands. Dynamic scroll behavior.

```
Initial (full width, inside hero):
┌────────────────────────────────────────────────────┐
│  BRAND    Home  Shop  Blog  About         🔍 🛒   │
│  ─────────────────────────────────────────────────  │
│  CATEGORIES ▾   NEW PRODUCT ▾   SEARCH...          │
└────────────────────────────────────────────────────┘

After scroll (compact, floating):
    ┌──────────────────────────────────────┐
    │  BRAND   Home Shop Blog About  🔍 🛒 │
    └──────────────────────────────────────┘
```

**GSAP**:
```typescript
ScrollTrigger.create({
  start: 100,
  onEnter: () => {
    gsap.to('.navbar', {
      width: '90%', borderRadius: 16,
      y: 8, boxShadow: 'var(--shadow-lg)',
      duration: 0.4, ease: 'power2.out'
    });
    gsap.to('.navbar-secondary', { height: 0, opacity: 0, duration: 0.3 });
  },
  onLeaveBack: () => {
    gsap.to('.navbar', {
      width: '100%', borderRadius: 0,
      y: 0, boxShadow: 'none',
      duration: 0.4
    });
    gsap.to('.navbar-secondary', { height: 'auto', opacity: 1, duration: 0.3 });
  },
});
```

---

## Mobile Navigation Rules (All Patterns)

1. Below `1024px`, collapse to hamburger (or keep centered logo visible)
2. Hamburger icon: three lines, animated to X on open
3. Menu container: full-screen overlay or slide-from-right panel
4. Links: large text (24-32px), stacked vertically, generous tap targets
5. Cart icon always visible (not inside the menu)
6. Close on: X button, Escape key, clicking outside, navigating to a page
7. Body scroll lock while open (`overflow: hidden` on `<body>`)
