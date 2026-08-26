# Anti-Slop Checklist

The quality gate. Every item must pass before a site ships. This is what separates a Dribbble-featured site from "ChatGPT built my website."

---

## What is "AI Slop"?

AI-generated UI that is technically correct but visually indistinguishable from every other AI-generated UI. It is the uncanny valley of web design: competent but soulless. The patterns below are AI tells — signals that a human designer was not in the loop.

---

## The Checklist

Run this against every page before declaring it done. Mark each item PASS or FAIL.

### Color Crimes
- [ ] **No indigo-to-purple gradient hero.** This is the #1 AI tell. If your hero has `bg-gradient-to-r from-indigo-500 to-purple-600`, start over.
- [ ] **No default Tailwind blue/indigo/purple.** `blue-500`, `indigo-600`, `violet-500` are the default AI palette. Use a curated palette from [color-palettes.md](color-palettes.md).
- [ ] **No gradient blobs as decoration.** Floating gradient circles with blur are the second most common AI tell.
- [ ] **No pure #000000 on #FFFFFF.** Use near-black on off-white. Pure B&W feels stark and undesigned.
- [ ] **Colors have verified contrast.** Every text-on-background pair passes WCAG AA (4.5:1 normal, 3:1 large).

### Layout Crimes
- [ ] **No generic bento grid without hierarchy.** A bento grid where every card is equally sized with no focal point is a layout crime. Vary card sizes deliberately.
- [ ] **No identical cards repeated 3+ times.** Every card section should have visual variety — different image ratios, alternating layouts, or staggered reveals.
- [ ] **No centered-everything layout.** Not every section should be centered. Mix left-aligned, right-aligned, and asymmetric layouts.
- [ ] **Sections have different rhythms.** If section 1 is a 3-column grid, section 2 should NOT also be a 3-column grid.

### Content Crimes
- [ ] **No Lorem ipsum or placeholder text.** Every piece of text should be real, relevant copy.
- [ ] **No "John Doe" or "Jane Smith" testimonials.** If you need testimonials, use culturally appropriate names matching the brand's audience.
- [ ] **No emoji used as icons.** Use Lucide React, Heroicons, or SVG icons. Emoji is a dead giveaway.
- [ ] **No invented partnerships or awards.** Never display logos of companies that aren't real partners.
- [ ] **No "Lorem ipsum" in any form** — including translated versions, "dummy text", or `...`.

### Typography Crimes
- [ ] **Font pairing is intentional.** Not just "whatever Google Fonts auto-suggested." One display, one body, chosen for contrast and harmony.
- [ ] **Heading hierarchy descends.** H1 > H2 > H3 visually. No H3 that looks bigger than an H2.
- [ ] **Letter-spacing exists on uppercase.** Uppercase text without added letter-spacing looks amateur.
- [ ] **Line height varies by role.** Headings tight (1.1), body comfortable (1.6).

### Motion Crimes
- [ ] **No animation without purpose.** Every animation should communicate something: entrance, hierarchy, relationship, or state change.
- [ ] **No bounce on everything.** Bounce easing used everywhere makes the site feel toy-like. Reserve bounce for playful brands.
- [ ] **No 2-second delay animations.** If something takes 2+ seconds to animate in, it's annoying, not premium.
- [ ] **Animations play once.** ScrollTrigger animations should `play` on enter, not replay on every scroll direction change (unless intentional).

### Component Crimes
- [ ] **Buttons are visible.** Text on button backgrounds passes at least 4.5:1 contrast ratio. This is the most common functional failure.
- [ ] **Hover states exist and are designed.** Not just `opacity: 0.8` — a deliberate color shift, shadow, or scale.
- [ ] **Focus states are visible.** Keyboard users can see where they are. `outline: none` without a replacement is an accessibility crime.
- [ ] **Images load.** No broken images, no missing sources, no placeholder gray boxes.
- [ ] **Mobile navigation works.** Hamburger opens, links work, menu closes properly.

### Image Crimes
- [ ] **No generic stock photos.** If using images, they should match the brand's aesthetic and color palette.
- [ ] **Images have consistent treatment.** Same aspect ratio in a grid, consistent color temperature, matching editing style.
- [ ] **No images with visible AI artifacts.** Extra fingers, merged objects, uncanny skin.
- [ ] **Images have alt text.** Every meaningful image has a descriptive `alt` attribute.

---

## The Positive Checklist (What SHOULD be present)

### Must-Haves for Dribbble Quality
- [ ] **A distinctive hero.** First viewport should stop the scroll and make someone think "that's different."
- [ ] **Curated color palette.** 5-10 intentional colors, not random picks.
- [ ] **Section-wise color variation.** Background colors alternate as user scrolls, creating a visual journey.
- [ ] **Smooth scroll.** Lenis or equivalent, not default browser scroll.
- [ ] **Staggered reveals.** Elements enter viewport with stagger, not all at once.
- [ ] **Consistent spacing system.** Uses design tokens, not arbitrary pixel values.
- [ ] **Type scale.** Sizes follow a scale, not random values.
- [ ] **Card hover effects.** Product cards lift, images zoom, overlay fades in.
- [ ] **Responsive layout.** Works at 375px, 768px, 1024px, 1440px.
- [ ] **Fast page load.** Images lazy-loaded, fonts preloaded, no layout shift.

---

## How to Fix Common AI Slop

| AI Default | Fix |
|-----------|-----|
| `bg-gradient-to-r from-blue-500 to-purple-600` | Use a curated solid color or subtle gradient from the palette |
| Same card layout × 6 | Vary sizes: 2 large + 4 small, or 1 hero card + 3 regular |
| `border-rounded-2xl shadow-lg` everywhere | Use concentric radius (outer = inner + padding) and layered shadows |
| `opacity-80` hover | Design a proper hover: darker bg, lifted shadow, subtle scale |
| Emoji icons 🛒 📦 ✨ | Replace with Lucide React components: `<ShoppingBag />` `<Package />` `<Sparkles />` |
| `text-gray-500` for everything muted | Use a warm gray from the palette that has the same undertone as the accent |
| `Lorem ipsum dolor sit amet` | Write actual copy that matches the brand voice |
