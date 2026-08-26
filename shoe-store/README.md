# Shoe Store - Premium Sneaker Platform

A modern shoe store with elegant animations powered by GSAP ScrollTrigger for smooth scrolling effects.

## Features

- **Elegant Hero Section**: Interactive 3D shoe visualization with parallax effects
- **Smooth Scrolling Animations**: Scroll-based animations using GSAP ScrollTrigger
- **Product Grid with Staggered Animations**: Each product card animates on scroll
- **Testimonial Carousel**: Auto-rotating testimonials with smooth transitions
- **Responsive Design**: Mobile-friendly with touch support
- **Cool Color Palette**: Modern purple-to-cyan gradients
- **Accessibility**: Reduced motion support and hover-aware interactions

## Animation Philosophy

Following Emil Kowalski's design engineering principles:

- **Purpose-driven animations**: Every animation serves a functional purpose
- **Custom easing curves**: Using `cubic-bezier(0.23, 1, 0.32, 1)` for strong ease-out
- **Duration under 300ms**: UI animations stay snappy and responsive
- **Hardware acceleration**: Animating `transform` and `opacity` for smooth performance
- **Interruptibility**: Using GSAP timelines that can be interrupted mid-animation

## Technical Stack

- **GSAP 3.12**: High-performance animations
- **ScrollTrigger**: Scroll-based animation control
- **CSS Variables**: Design tokens for consistent theming
- **Vanilla JavaScript**: No framework dependencies

## Installation

```bash
npx serve shoe-store
```

Or open `index.html` directly in a browser.

## Animation Structure

### Hero Section
- ParalParallax effect on 3D shoe model
- Entrance animations triggered on page load
- Dynamic scaling based on scroll position

### Product Cards
- Staggered entrance (100ms delay between each)
- Scale transform on hover (1.03x)
- Rotation effect with scroll position

### Feature Section
- Staggered item entrance
- Infinite rotation on icons
- Sticky interaction effects

### Testimonials
- Auto-scroll carousel (infinite loop)
- Staggered entrance on scroll
- Smooth entry animations

## CSS Architecture

```
styles.css
├── :root (design tokens)
├── Base styles
├── Navigation
├── Hero section
├── Features section
├── Products section
├── About section
├── Testimonials section
└── Footer
```

## Key Animations

| Component | Effect | Duration | Easing |
|-----------|--------|----------|--------|
| Button press | Scale(0.97) | 150ms | power2.out |
| Product Card | Y translation + Opacity | 800ms | stagger |
| Hero Title | Scale/opacity | 1s | none (scrub) |
| Testimonial | X slide + opacity | 800ms | stagger |

## Customization

Modify colors in `:root`:

```css
--primary: #8b5cf6;          /* Purple */
--secondary: #06b6d4;        /* Cyan */
--accent: #ec4899;           /* Pink */
--gradient-primary: linear-gradient(135deg, var(--primary), var(--secondary));
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development Tips

1. Use browser DevTools to slow down animations (30-50% speed)
2. Test hover effects on desktop
3. Check reduced motion settings
4. Verify touch interactions on mobile devices

## License

MIT