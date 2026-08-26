# Shop Architecture

Complete Shopify-style e-commerce page architecture for any store type.

---

## Page Map

```
Home Page (landing)
├── Hero Section
├── Marquee Banner
├── Shop by Category
├── New Arrivals (4-8 products)
├── Promotional Banner
├── Bestsellers / Trending
├── Brand Story
├── Testimonials
├── Journal Preview
├── Newsletter Signup
└── Footer

Shop Page (/shop)
├── Breadcrumb (Home → Shop → Category)
├── Page Title + Product Count
├── Filter Bar (top or sidebar)
│   ├── Gender Filter (Men / Women / All)
│   ├── Category Filter (Shirts, Pants, etc.)
│   ├── Price Range
│   ├── Color Filter (swatches)
│   ├── Size Filter
│   └── Sort (Price ↑↓, Newest, Bestseller)
├── Product Grid (responsive: 1→2→3→4 cols)
│   └── Product Card (repeated)
│       ├── Image (3:4 ratio, hover: second image or zoom)
│       ├── Quick View button (on hover)
│       ├── Brand/Category tag
│       ├── Product Name
│       ├── Price (with strike-through if discounted)
│       └── Color swatches (dots)
├── Load More / Pagination
└── Footer

Product Detail Page (/product/:slug)
├── Breadcrumb
├── Two-Column Layout
│   ├── Left: Image Gallery
│   │   ├── Main Image (large, zoomable)
│   │   └── Thumbnail Strip (4-6 images)
│   └── Right: Product Info
│       ├── Brand / Category
│       ├── Product Name (h1)
│       ├── Price (+ discount badge)
│       ├── Short Description
│       ├── Color Picker (swatches)
│       ├── Size Picker (pills/buttons)
│       ├── Quantity Selector
│       ├── [Add to Cart] button (full width, prominent)
│       ├── [Add to Wishlist] button
│       ├── Shipping & Returns (accordion)
│       └── Product Details (accordion)
├── Related Products (4 cards)
└── Footer

Collections Page (/collections)
├── Page Title
├── Collection Cards Grid
│   └── Collection Card
│       ├── Full-bleed image
│       ├── Collection Name
│       ├── Item Count
│       └── [Shop Now] CTA
└── Footer

Journal Page (/journal)
├── Page Title
├── Featured Article (hero-width)
├── Article Grid (2-3 columns)
│   └── Article Card
│       ├── Image (16:9)
│       ├── Category Tag
│       ├── Title
│       ├── Excerpt (2-3 lines)
│       └── Date + Read Time
└── Footer

About Page (/about)
├── Hero Image / Brand Banner
├── Brand Story (long-form text + images)
├── Values / Pillars (3-4 cards)
├── Team / Founder Section
├── Press / Awards
└── Footer
```

---

## Category Taxonomy

### Fashion Store
```
├── Men
│   ├── Shirts
│   ├── T-Shirts
│   ├── Pants & Trousers
│   ├── Outerwear & Coats
│   ├── Knitwear
│   ├── Accessories
│   └── Shoes
└── Women
    ├── Dresses
    ├── Blouses & Tops
    ├── T-Shirts
    ├── Pants & Trousers
    ├── Outerwear & Coats
    ├── Knitwear
    ├── Accessories
    ├── Bags
    └── Shoes
```

### Beauty Store
```
├── Skincare
│   ├── Cleansers
│   ├── Serums
│   ├── Moisturizers
│   ├── Masks
│   └── Eye Care
├── Makeup
│   ├── Foundation
│   ├── Lips
│   ├── Eyes
│   └── Cheeks
└── Body
    ├── Body Wash
    ├── Lotions
    └── Fragrance
```

### Shoe Store
```
├── Men
│   ├── Sneakers
│   ├── Boots
│   ├── Loafers
│   ├── Sandals
│   └── Formal
└── Women
    ├── Sneakers
    ├── Heels
    ├── Boots
    ├── Flats
    ├── Sandals
    └── Mules
```

---

## Product Card Component Spec

```
┌─────────────────────────────┐
│  ┌───────────────────────┐  │
│  │                       │  │  ← 3:4 aspect ratio
│  │     PRODUCT IMAGE     │  │  ← overflow-hidden
│  │                       │  │  ← hover: scale(1.05)
│  │   ┌─────────────┐    │  │
│  │   │ QUICK VIEW  │    │  │  ← appears on hover
│  │   └─────────────┘    │  │
│  │                  NEW  │  │  ← badge top-right
│  └───────────────────────┘  │
│                             │
│  Category Name              │  ← text-caption, muted
│  Product Name               │  ← text-body, medium weight
│  ₹48,000                   │  ← text-body, bold
│  ● ● ●                     │  ← color swatches (3-4)
└─────────────────────────────┘
```

**Interactions**:
- Hover: image zooms 1.05, quick view fades in, card lifts -4px
- Click card: navigate to product detail page
- Click quick view: open modal without page change
- Click swatch: change preview image color

---

## Filter Implementation

### Desktop: Sidebar or Top Bar
```
┌──────────┬──────────────────────────────────────┐
│ FILTERS  │                                      │
│          │     PRODUCT GRID                      │
│ Gender   │                                      │
│ ○ All    │  ┌────┐ ┌────┐ ┌────┐ ┌────┐       │
│ ○ Men    │  │    │ │    │ │    │ │    │       │
│ ○ Women  │  │    │ │    │ │    │ │    │       │
│          │  └────┘ └────┘ └────┘ └────┘       │
│ Category │                                      │
│ □ Shirts │  ┌────┐ ┌────┐ ┌────┐ ┌────┐       │
│ □ Pants  │  │    │ │    │ │    │ │    │       │
│ □ Shoes  │  │    │ │    │ │    │ │    │       │
│          │  └────┘ └────┘ └────┘ └────┘       │
│ Price    │                                      │
│ ₹0-50K   │                                      │
│          │  Showing 8 of 16 products            │
│ [Clear]  │  [Load More]                         │
└──────────┴──────────────────────────────────────┘
```

### Mobile: Bottom sheet or slide-out panel
- Trigger: "Filters" button at top of product grid
- Opens as a shadcn Sheet from bottom
- Apply button at bottom
- Shows active filter count on trigger button

---

## Cart Architecture

### Cart State (React useState or useReducer)
```typescript
interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// Actions
type CartAction =
  | { type: 'ADD_ITEM'; product: Product; color: string; size: string }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; delta: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' };
```

### Cart Drawer (shadcn Sheet)
```
┌──────────────────────────────────┐
│  Shopping Bag (3)          ✕     │
├──────────────────────────────────┤
│  ┌─────┐                        │
│  │ img │  Product Name           │
│  │     │  Color: Black           │
│  │     │  Size: M                │
│  └─────┘  [-] 2 [+]    ₹48,000  │
│  ─────────────────────────────── │
│  ┌─────┐                        │
│  │ img │  Product Name           │
│  │     │  Color: Sage            │
│  │     │  Size: S                │
│  └─────┘  [-] 1 [+]    ₹32,000  │
├──────────────────────────────────┤
│  Subtotal          ₹1,28,000    │
│  Shipping          Calculated    │
│                    at checkout   │
│  ─────────────────────────────── │
│  [   Proceed to Checkout   →  ] │
│  [   Continue Shopping         ] │
└──────────────────────────────────┘
```
