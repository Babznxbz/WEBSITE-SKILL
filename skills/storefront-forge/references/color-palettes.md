# Color Palettes

Rules, curated palettes, and generation process for creating distinctive, WCAG-verified color systems.

---

## Golden Rules

1. **A palette is roles, not a list of colors.** Every color has a job. No orphan colors.
2. **Verify contrast before shipping.** Run `check_contrast.py` or manually verify 4.5:1 for body text, 3:1 for large text.
3. **One accent hue per project.** Two accents only when items must be distinguishable at a glance.
4. **No default Tailwind.** Never use `blue-500`, `indigo-600`, `purple-500`. These are AI-slop markers.
5. **No pure black on white.** Use near-black (#1A1A1A–#2D2D2D) and off-white (#FAFAFA–#F5F5F5).
6. **Section colors alternate.** Cream → sage → cream → accent → blush → cream → sage → dark.

---

## Palette Roles

Every project must define these 10 roles:

| Token | Role | Example (Luxury Warm) |
|-------|------|----------------------|
| `--bg-primary` | Main page background | `#FAF6F0` (cream) |
| `--bg-secondary` | Alternate section bg | `#EEF3EB` (sage) |
| `--bg-tertiary` | Third section variant | `#FAF0F2` (blush) |
| `--bg-accent` | Highlight/banner bg | `#8B1A3A` (wine) |
| `--text-primary` | Body text | `#1F1713` (espresso) |
| `--text-secondary` | Muted text | `#6B5E54` (warm gray) |
| `--accent` | Buttons, links, badges | `#E11D48` (rose) |
| `--accent-hover` | Hover state of accent | `#BE123C` (deep rose) |
| `--border` | Borders, dividers | `#E5DDD3` (sand) |
| `--surface` | Card backgrounds | `#FFFFFF` (white) |

---

## 10 Curated Palettes

### 1. Luxury Warm (Fashion, High-End)
```
bg-primary:    #FAF6F0  (Cream)
bg-secondary:  #EEF3EB  (Sage)
bg-tertiary:   #FAF0F2  (Rose Blush)
bg-accent:     #8B1A3A  (Wine)
text-primary:  #1F1713  (Espresso)
text-secondary:#6B5E54  (Warm Taupe)
accent:        #E11D48  (Rose)
accent-hover:  #BE123C  (Deep Rose)
border:        #E5DDD3  (Sand)
surface:       #FFFFFF  (White)
```

### 2. Nordic Minimal (Furniture, Interior)
```
bg-primary:    #F7F5F2  (Warm White)
bg-secondary:  #EDE8E3  (Linen)
bg-tertiary:   #E8ECE6  (Soft Sage)
bg-accent:     #2C3630  (Forest)
text-primary:  #1C1C1C  (Near Black)
text-secondary:#787878  (Cool Gray)
accent:        #B8734A  (Terracotta)
accent-hover:  #9A5F3A  (Dark Terra)
border:        #D9D3CC  (Stone)
surface:       #FFFFFF  (White)
```

### 3. Streetwear Bold (Sneakers, Urban)
```
bg-primary:    #F5F5F0  (Off White)
bg-secondary:  #EAEAE5  (Light Gray)
bg-tertiary:   #F0EDE8  (Warm Beige)
bg-accent:     #1A1A1A  (Near Black)
text-primary:  #0A0A0A  (Black)
text-secondary:#666666  (Gray)
accent:        #FF4D00  (Electric Orange)
accent-hover:  #E04400  (Deep Orange)
border:        #D4D4D4  (Light Border)
surface:       #FFFFFF  (White)
```

### 4. Beauty Rose (Skincare, Cosmetics)
```
bg-primary:    #FFF8F5  (Soft Peach)
bg-secondary:  #F5EDE8  (Warm Blush)
bg-tertiary:   #FFF0EB  (Light Coral)
bg-accent:     #2D1F1F  (Dark Cocoa)
text-primary:  #2D1F1F  (Dark Cocoa)
text-secondary:#8C7A73  (Dusty Mauve)
accent:        #C45B5B  (Muted Rose)
accent-hover:  #A44848  (Deep Rose)
border:        #E8DDD8  (Blush Border)
surface:       #FFFFFF  (White)
```

### 5. Emerald Luxury (Jewelry, Premium)
```
bg-primary:    #F8F7F4  (Ivory)
bg-secondary:  #EBF0EB  (Mist Green)
bg-tertiary:   #F4F2ED  (Warm Ivory)
bg-accent:     #1B3A2D  (Deep Emerald)
text-primary:  #1A1A1A  (Near Black)
text-secondary:#707068  (Olive Gray)
accent:        #2D7A5F  (Emerald)
accent-hover:  #236549  (Deep Emerald)
border:        #D8D5CE  (Sage Border)
surface:       #FFFFFF  (White)
```

### 6. Monochrome Editorial (Portfolio, Agency)
```
bg-primary:    #FAFAFA  (Light Gray)
bg-secondary:  #F0F0F0  (Lighter Gray)
bg-tertiary:   #E8E8E8  (Mid Gray)
bg-accent:     #1A1A1A  (Near Black)
text-primary:  #1A1A1A  (Near Black)
text-secondary:#666666  (Gray)
accent:        #1A1A1A  (Black)
accent-hover:  #333333  (Dark Gray)
border:        #E0E0E0  (Border Gray)
surface:       #FFFFFF  (White)
```

### 7. Ocean Calm (Wellness, Spa)
```
bg-primary:    #F5F8F7  (Sea Mist)
bg-secondary:  #E8F0EE  (Soft Teal)
bg-tertiary:   #F0F5F8  (Ice Blue)
bg-accent:     #1A3A4A  (Deep Ocean)
text-primary:  #1A2830  (Dark Teal)
text-secondary:#5A7A7A  (Muted Teal)
accent:        #2A8A7A  (Teal)
accent-hover:  #1E6E60  (Deep Teal)
border:        #D0DDD8  (Sea Border)
surface:       #FFFFFF  (White)
```

### 8. Warm Earth (Food, Coffee, Organic)
```
bg-primary:    #FAF5EE  (Oat)
bg-secondary:  #F0E8DB  (Wheat)
bg-tertiary:   #EDE3D3  (Toast)
bg-accent:     #3A2820  (Dark Roast)
text-primary:  #2A1E18  (Espresso)
text-secondary:#7A6A5A  (Mocha)
accent:        #C4742A  (Amber)
accent-hover:  #A55E20  (Deep Amber)
border:        #D8CCBA  (Grain Border)
surface:       #FFFFFF  (White)
```

### 9. Lavender Dream (Kids, Playful, Lifestyle)
```
bg-primary:    #FAF8FC  (Soft Lavender)
bg-secondary:  #F2EEF8  (Light Purple)
bg-tertiary:   #FFF5F7  (Soft Pink)
bg-accent:     #4A2D6A  (Deep Purple)
text-primary:  #2A1E3A  (Dark Purple)
text-secondary:#7A6A8A  (Muted Violet)
accent:        #8B5CF6  (Violet)
accent-hover:  #7C3AED  (Deep Violet)
border:        #E0D8EA  (Lavender Border)
surface:       #FFFFFF  (White)
```

### 10. Midnight Gold (Watches, Luxury Tech)
```
bg-primary:    #0A0A0A  (Near Black)
bg-secondary:  #141414  (Dark Gray)
bg-tertiary:   #1A1A1A  (Charcoal)
bg-accent:     #C9A84C  (Gold)
text-primary:  #F0EDE8  (Warm White)
text-secondary:#8A8580  (Muted Gray)
accent:        #C9A84C  (Gold)
accent-hover:  #DDB94E  (Light Gold)
border:        #2A2A2A  (Dark Border)
surface:       #1E1E1E  (Dark Surface)
```

---

## Section Color Mapping Strategy

For a light-themed site, alternate between 3-4 backgrounds to create visual rhythm:

```
Section 1 (Hero):          bg-primary    cream
Section 2 (Marquee):       bg-accent     dark/accent
Section 3 (Categories):    bg-secondary  sage/alternate
Section 4 (New Arrivals):  bg-primary    cream
Section 5 (Promo Banner):  bg-accent     dark/accent
Section 6 (Bestsellers):   bg-tertiary   blush/third
Section 7 (Brand Story):   bg-primary    cream
Section 8 (Testimonials):  bg-secondary  sage/alternate
Section 9 (Journal):       bg-primary    cream
Section 10 (Newsletter):   bg-accent     dark/accent
Section 11 (Footer):       dark          near-black
```

**Rule**: Never place two sections with the same background adjacent to each other. The alternation creates visual breathing room and a sense of journey.

---

## Palette Selection from Prompt

```
"luxury", "premium", "haute"     → Luxury Warm or Emerald Luxury
"minimal", "clean", "scandinavian" → Nordic Minimal
"street", "urban", "bold"        → Streetwear Bold
"beauty", "skincare", "natural"  → Beauty Rose
"creative", "portfolio", "agency" → Monochrome Editorial
"wellness", "spa", "calm"        → Ocean Calm
"food", "coffee", "organic"      → Warm Earth
"playful", "fun", "lifestyle"    → Lavender Dream
"watches", "tech", "dark"        → Midnight Gold
"jewelry", "emerald", "gemstone" → Emerald Luxury
```
