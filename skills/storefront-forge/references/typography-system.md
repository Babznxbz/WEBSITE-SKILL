# Typography System

Font pairings, type scale, and spacing rules for premium web typography.

---

## Curated Font Pairings

### For Fashion / Luxury
| Display | Body | Vibe |
|---------|------|------|
| **Playfair Display** | Inter | Classic elegance |
| **Cormorant Garamond** | Work Sans | French editorial |
| **Libre Bodoni** | Source Sans 3 | Modern serif luxury |
| **DM Serif Display** | DM Sans | Contemporary luxury |

### For Minimal / Clean
| Display | Body | Vibe |
|---------|------|------|
| **Outfit** | Inter | Geometric modern |
| **Syne** | Manrope | Bold minimal |
| **Space Grotesk** | Inter | Tech-forward clean |
| **Plus Jakarta Sans** | Plus Jakarta Sans | Unified warmth |

### For Bold / Street
| Display | Body | Vibe |
|---------|------|------|
| **Bebas Neue** | Inter | All-caps impact |
| **Oswald** | Roboto | Condensed urban |
| **Anton** | Work Sans | Heavy display |
| **Archivo Black** | Archivo | Unified bold |

### For Warm / Organic
| Display | Body | Vibe |
|---------|------|------|
| **Fraunces** | Inter | Soft serif warmth |
| **Lora** | Source Sans 3 | Literary warmth |
| **Crimson Pro** | Nunito Sans | Traditional craft |

### Loading Fonts
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Always use `display=swap` to prevent invisible text during font loading.

---

## Type Scale

```css
:root {
  /* Display — Hero headlines only */
  --text-display: clamp(3rem, 5vw + 1rem, 6rem);

  /* H1 — Page-level titles */
  --text-h1: clamp(2.25rem, 3vw + 1rem, 3.5rem);

  /* H2 — Section titles */
  --text-h2: clamp(1.75rem, 2vw + 0.5rem, 2.5rem);

  /* H3 — Card titles, sub-sections */
  --text-h3: clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem);

  /* H4 — Small headings */
  --text-h4: 1.125rem; /* 18px */

  /* Body — Main reading text */
  --text-body: 1rem; /* 16px */

  /* Body Small — Secondary text */
  --text-body-sm: 0.875rem; /* 14px */

  /* Caption — Labels, meta */
  --text-caption: 0.75rem; /* 12px */

  /* Overline — Category tags, uppercase labels */
  --text-overline: 0.6875rem; /* 11px */
}
```

---

## Line Height

| Role | Line Height | Why |
|------|------------|-----|
| Display heading | `1.05 – 1.1` | Tight for impact, short text |
| H1-H2 | `1.15 – 1.2` | Comfortable for 1-2 lines |
| H3-H4 | `1.25 – 1.3` | May wrap to 2 lines |
| Body text | `1.6` | Optimal for reading paragraphs |
| Body small | `1.5` | Slightly tighter |
| Caption | `1.4` | Compact metadata |
| Overline | `1.2` | Single line, uppercase |

---

## Letter Spacing

| Role | Spacing | CSS |
|------|---------|-----|
| Display heading | Tight | `letter-spacing: -0.025em` |
| H1-H2 | Slightly tight | `letter-spacing: -0.015em` |
| H3-H4 | Normal | `letter-spacing: 0` |
| Body | Normal | `letter-spacing: 0` |
| Overline (uppercase) | Wide | `letter-spacing: 0.1em` |
| Button text | Slightly wide | `letter-spacing: 0.03em` |

---

## Text Wrap

```css
h1, h2, h3 {
  text-wrap: balance; /* Distribute words evenly across lines */
}

p, .description {
  text-wrap: pretty; /* Avoid orphan words on last line */
}
```

---

## Measure (Line Length)

Cap body text at 60-75 characters per line:
```css
.prose, .body-text, article p {
  max-width: 65ch;
}
```

---

## Font Weight Usage

| Weight | Name | Usage |
|--------|------|-------|
| 300 | Light | Display headings ≥28px ONLY |
| 400 | Regular | Body text, descriptions |
| 500 | Medium | Card titles, navigation links, buttons |
| 600 | Semibold | Section headings, product names |
| 700 | Bold | Hero headlines, prices, emphasis |
| 800 | ExtraBold | Display-only, hero statements |

**Rule**: Below 18px, never go lighter than 400. Light weights disappear at small sizes.

---

## Tabular Numbers for Prices

```css
.price, .quantity, .cart-total {
  font-variant-numeric: tabular-nums;
  /* Ensures digits align vertically in columns */
}
```

---

## Smart Punctuation

Use proper typographic characters:
- Quotes: " " and ' ' (not " " and ' ')
- Dash: — (em dash) or – (en dash), not - (hyphen)
- Ellipsis: … not ...
- Multiplication: × not x (for dimensions)
