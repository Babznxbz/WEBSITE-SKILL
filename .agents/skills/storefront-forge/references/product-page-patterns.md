# Product Page Patterns

Complete product detail page layouts and interaction patterns.

---

## Layout: Classic Two-Column

The most common and proven e-commerce PDP layout.

```
┌────────────────────────────────────────────────────────┐
│  Home  →  Shop  →  Women  →  Dresses  →  Product Name │
├────────────────────────────┬───────────────────────────┤
│                            │                           │
│  ┌──────────────────────┐  │  BRAND NAME               │
│  │                      │  │                           │
│  │                      │  │  Product Name              │
│  │    MAIN IMAGE        │  │  ★★★★☆ (42 reviews)       │
│  │    (zoomable)        │  │                           │
│  │                      │  │  ₹48,000                  │
│  │                      │  │  ₹64,000  (25% OFF)       │
│  │                      │  │                           │
│  └──────────────────────┘  │  COLOR                    │
│                            │  ● ● ● ○                  │
│  ┌────┐ ┌────┐ ┌────┐    │  Black Sage Rose Ivory     │
│  │ t1 │ │ t2 │ │ t3 │    │                           │
│  └────┘ └────┘ └────┘    │  SIZE                     │
│  ┌────┐ ┌────┐           │  [XS] [S] [■M] [L] [XL]  │
│  │ t4 │ │ t5 │           │                           │
│  └────┘ └────┘           │  ┌─────────┐              │
│                            │  │  -  2  + │              │
│                            │  └─────────┘              │
│                            │                           │
│                            │  ┌────────────────────┐   │
│                            │  │  ADD TO BAG — ₹48K  │   │
│                            │  └────────────────────┘   │
│                            │  ┌────────────────────┐   │
│                            │  │  ♡  ADD TO WISHLIST │   │
│                            │  └────────────────────┘   │
│                            │                           │
│                            │  ▸ Product Details        │
│                            │  ▸ Size Guide             │
│                            │  ▸ Shipping & Returns     │
├────────────────────────────┴───────────────────────────┤
│                                                        │
│  YOU MAY ALSO LIKE                                     │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                         │
│  │    │ │    │ │    │ │    │                         │
│  └────┘ └────┘ └────┘ └────┘                         │
└────────────────────────────────────────────────────────┘
```

---

## Image Gallery Component

### Desktop
- Main image: takes 50-55% width, sticky on scroll
- Thumbnails: vertical strip on left of main image, or horizontal below
- Click thumbnail: update main image with crossfade (opacity 0→1, 200ms)
- Hover main image: subtle zoom or lens effect (optional)
- Total images: 4-6 per product

### Mobile
- Full-width horizontal swipeable gallery
- Dot indicators below
- Pinch to zoom supported natively

```typescript
function ImageGallery({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2 w-16">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              'aspect-square rounded-md overflow-hidden border-2 transition-colors',
              i === activeIndex ? 'border-accent' : 'border-transparent'
            )}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 aspect-[3/4] rounded-xl overflow-hidden">
        <img
          src={images[activeIndex]}
          alt="Product"
          className="w-full h-full object-cover transition-opacity duration-300"
          key={activeIndex}
        />
      </div>
    </div>
  );
}
```

---

## Size & Color Pickers

### Color Picker
```tsx
function ColorPicker({ colors, selected, onChange }: ColorPickerProps) {
  return (
    <div className="flex gap-3">
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => onChange(color.name)}
          className={cn(
            'w-8 h-8 rounded-full border-2 transition-all',
            selected === color.name
              ? 'border-text-primary scale-110'
              : 'border-transparent hover:scale-105'
          )}
          style={{ backgroundColor: color.hex }}
          aria-label={color.name}
          title={color.name}
        >
          {selected === color.name && (
            <svg className="w-4 h-4 mx-auto text-white" /* checkmark */ />
          )}
        </button>
      ))}
    </div>
  );
}
```

### Size Picker
```tsx
function SizePicker({ sizes, selected, onChange }: SizePickerProps) {
  return (
    <div className="flex gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onChange(size)}
          className={cn(
            'h-10 min-w-[44px] px-4 rounded-md text-sm font-medium transition-all',
            selected === size
              ? 'bg-text-primary text-bg-primary'
              : 'bg-surface border border-border hover:border-text-primary'
          )}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
```

---

## Accordion Details

Use shadcn Accordion or native `<details>`:

```tsx
const details = [
  {
    title: 'Product Details',
    content: 'Crafted from 100% organic cotton with a relaxed fit...'
  },
  {
    title: 'Size Guide',
    content: 'Model is 5\'10" wearing size M. Chest: 38", Waist: 30"...'
  },
  {
    title: 'Shipping & Returns',
    content: 'Free shipping on orders over ₹5,000. 14-day returns...'
  },
];
```

---

## Add to Cart Flow

1. User selects color → size → quantity
2. "Add to Bag" button is disabled until both color and size selected
3. On click: item added, button text changes to "Added ✓" for 2 seconds
4. Cart drawer opens automatically after adding
5. Cart icon in navbar updates count

```typescript
function handleAddToCart() {
  if (!selectedColor || !selectedSize) {
    setError('Please select a color and size');
    return;
  }

  addToCart({
    product,
    selectedColor,
    selectedSize,
    quantity,
  });

  setAddedFeedback(true);
  setTimeout(() => setAddedFeedback(false), 2000);
  openCartDrawer();
}
```

---

## Related Products

Show 4 products from the same category, excluding the current product:
```typescript
const relatedProducts = products
  .filter(p => p.department === product.department && p.id !== product.id)
  .slice(0, 4);
```

Display as a horizontal scroll or 4-column grid.

---

## Mobile Product Page

On mobile, the layout stacks:
1. Image gallery (full-width horizontal swipe)
2. Product info section
3. Sticky bottom bar with "Add to Bag" button (always visible)

```css
@media (max-width: 1023px) {
  .product-page {
    flex-direction: column;
  }

  .sticky-add-to-cart {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: white;
    border-top: 1px solid var(--border);
    z-index: 50;
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }
}
```
