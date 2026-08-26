# shadcn/ui Components Guide

Which shadcn components to use and when. Only install what you need.

---

## Core Components for E-Commerce

### Essential (Install Always)
| Component | Usage | Install |
|-----------|-------|---------|
| **Button** | CTAs, add to cart, filters | `npx shadcn@latest add button` |
| **Sheet** | Cart drawer, mobile menu, filter panel | `npx shadcn@latest add sheet` |
| **Dialog** | Quick view modal, size guide | `npx shadcn@latest add dialog` |
| **Badge** | New, Sale, Bestseller tags | `npx shadcn@latest add badge` |
| **Input** | Search, newsletter email | `npx shadcn@latest add input` |

### Recommended (Install as Needed)
| Component | Usage | Install |
|-----------|-------|---------|
| **Accordion** | Product details, FAQ, size guide | `npx shadcn@latest add accordion` |
| **Select** | Sort dropdown, country picker | `npx shadcn@latest add select` |
| **Separator** | Dividers between sections | `npx shadcn@latest add separator` |
| **Skeleton** | Loading states for images/products | `npx shadcn@latest add skeleton` |
| **Toast** | Add to cart confirmation, errors | `npx shadcn@latest add toast` |
| **Tooltip** | Icon button labels | `npx shadcn@latest add tooltip` |
| **Tabs** | Product description tabs, shop gender tabs | `npx shadcn@latest add tabs` |
| **Carousel** | Product image gallery, testimonials | `npx shadcn@latest add carousel` |
| **Dropdown Menu** | User menu, more options | `npx shadcn@latest add dropdown-menu` |
| **Scroll Area** | Cart drawer product list | `npx shadcn@latest add scroll-area` |

---

## Customization Rules

### 1. Always Override Default Colors
shadcn ships with a blue/zinc palette. Replace with your design tokens:

```css
/* In index.css or globals.css */
@layer base {
  :root {
    --primary: /* your accent color HSL */;
    --primary-foreground: /* text on primary */;
    --secondary: /* your bg-secondary HSL */;
    --secondary-foreground: /* text on secondary */;
    --accent: /* hover bg */;
    --accent-foreground: /* text on accent */;
    --destructive: /* error red */;
    --destructive-foreground: /* text on error */;
    --muted: /* muted bg */;
    --muted-foreground: /* muted text */;
    --card: /* card bg */;
    --card-foreground: /* card text */;
    --border: /* border color */;
    --ring: /* focus ring */;
    --radius: 0.75rem; /* default border radius */;
  }
}
```

### 2. Button Variants for E-Commerce
```tsx
// Primary CTA (Add to Cart)
<Button size="lg" className="w-full bg-accent text-white hover:bg-accent-hover">
  Add to Bag — ₹48,000
</Button>

// Secondary CTA (Wishlist, Continue Shopping)
<Button variant="outline" size="lg" className="w-full">
  ♡ Add to Wishlist
</Button>

// Ghost (Filters, nav actions)
<Button variant="ghost" size="sm">
  Clear Filters
</Button>

// Icon (Cart, search, hamburger)
<Button variant="ghost" size="icon" aria-label="Shopping bag">
  <ShoppingBag className="h-5 w-5" />
</Button>
```

### 3. Sheet for Cart Drawer
```tsx
<Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
  <SheetContent side="right" className="w-full sm:max-w-md">
    <SheetHeader>
      <SheetTitle>Shopping Bag ({cartCount})</SheetTitle>
    </SheetHeader>
    {/* Cart items */}
    <SheetFooter>
      {/* Checkout button */}
    </SheetFooter>
  </SheetContent>
</Sheet>
```

### 4. Dialog for Quick View
```tsx
<Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
  <DialogContent className="max-w-3xl">
    <div className="grid grid-cols-2 gap-6">
      <img src={product.images[0]} alt={product.name} />
      <div>
        <DialogTitle>{product.name}</DialogTitle>
        {/* Price, size/color pickers, add to cart */}
      </div>
    </div>
  </DialogContent>
</Dialog>
```

---

## Icons

Use **Lucide React** (already a shadcn dependency):

```tsx
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Heart,
  ChevronDown,
  ChevronRight,
  Minus,
  Plus,
  Star,
  ArrowRight,
  Instagram,
  Twitter,
} from 'lucide-react';
```

**Rule**: Never use emoji as icons. Always use Lucide components.

---

## cn() Utility

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
