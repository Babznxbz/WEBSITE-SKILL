# ⚡ WEBSITE SKILL (Storefront Forge & Awwwards Engine)

> An all-in-one, anti-AI-slop web design and e-commerce skill for AI coding agents (Claude Code, Antigravity, Windsurf, Gemini CLI, OpenCode).
> Systematically builds Dribbble / Awwwards-level websites with GSAP + Lenis scroll animations, Shopify-style shop architecture, dynamic hero patterns, color palette generation, and WCAG contrast verification.

---

## 🌟 What Is Included

This repository contains curated skills and agent configurations for building high-end websites:

```
.agents/
└── skills/
    ├── storefront-forge/           # 🔥 The Master Skill (9-phase web design engine)
    │   ├── SKILL.md                # Main orchestrator (/website trigger)
    │   ├── AGENTS.md               # Execution rules & agent guidance
    │   ├── references/             # Hero, navbar, GSAP, typography, shop patterns
    │   └── scripts/                # Contrast checker & palette generator scripts
    ├── build-awwwards-quality-sites/
    ├── animate/
    ├── emil-design-eng/
    ├── improve-animations/
    └── review-animations/
```

---

## 🚀 Quick Start

### For Claude Code / Antigravity / Windsurf / OpenCode

Copy or clone the `.agents` folder into your project or global skills directory:

```bash
# Global installation for Claude Code / Antigravity
cp -r .agents/skills/storefront-forge ~/.claude/skills/
```

### Triggering the Skill in Conversation

Simply invoke the `/website` trigger or ask your AI coding assistant:

- `/website build a luxury fashion store for Indian audience with INR prices`
- `/website make an Awwwards-style portfolio for a design agency`
- `Build a minimal furniture e-commerce store with Lenis smooth scroll`

---

## 🎨 Storefront Forge Architecture

When triggered, Storefront Forge executes a disciplined **9-Phase Pipeline**:

1. **Phase 1: Parse Prompt** — Detect site type, audience, currency, and select hero/navbar patterns.
2. **Phase 2: Art Direction** — Pick curated font pairing & generate WCAG-verified color tokens.
3. **Phase 3: Architecture** — Define page map, product taxonomy, and section sequence.
4. **Phase 4: Scaffold** — Setup Vite + React + TypeScript + Tailwind CSS + GSAP + Lenis.
5. **Phase 5: Build Sections** — Construct hero, navbar, shop by category, product grids, cart drawer.
6. **Phase 6: Wire Motion** — Lenis smooth scroll, section-wise color transitions (`data-section-color`), stagger reveals.
7. **Phase 7: Polish** — Concentric border radius, layered shadows, hover states, image outlines.
8. **Phase 8: Review** — Run anti-AI-slop quality check & contrast verification.
9. **Phase 9: Build & Validate** — Type check and production build (`npm run build`).

---

## 🛠️ Included Python Tools

| Script | Command | Purpose |
|--------|---------|---------|
| **Contrast Checker** | `python .agents/skills/storefront-forge/scripts/check_contrast.py "#FAF6F0" "#1F1713" "#E11D48"` | Calculates WCAG AA/AAA matrix for palette |
| **Palette Generator** | `python .agents/skills/storefront-forge/scripts/generate_palette.py --mood luxury --verify` | Generates verified palette for mood |
| **Palette Extractor** | `python .agents/skills/storefront-forge/scripts/extract_palette.py reference.jpg` | Samples dominant colors from reference image |

---

## 📜 License

MIT License. Free to use in open-source and commercial projects.
