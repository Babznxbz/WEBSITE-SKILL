# ⚡ WEBSITE SKILL (Storefront Forge & Awwwards Engine)

> An all-in-one, anti-AI-slop web design and e-commerce skill for AI coding agents (**Antigravity, Claude Code, Windsurf, Cursor, Gemini CLI, OpenCode**).
> Systematically builds Dribbble / Awwwards-level websites with GSAP + Lenis scroll animations, Shopify-style shop architecture, dynamic hero patterns, color palette generation, and WCAG contrast verification.

---

## ⚡ 1-Step Universal Skill Installation

### Option A: Per-Project Installation (Recommended for All Agents)
Simply copy the `.agents` folder into your target website repository root:

```bash
# Works in Antigravity, Claude Code, Windsurf, Cursor, OpenCode out of the box!
cp -r .agents /path/to/your-project/
```

---

### Option B: Global Installation (Available in Every Workspace)

#### 🌐 For Antigravity (Google DeepMind Agent):
```bash
# Windows (PowerShell)
xcopy /E /I .agents\skills\storefront-forge %USERPROFILE%\.gemini\config\skills\storefront-forge

# macOS / Linux
mkdir -p ~/.gemini/config/skills && cp -r .agents/skills/storefront-forge ~/.gemini/config/skills/
```

#### 🌐 For Claude Code:
```bash
mkdir -p ~/.claude/skills && cp -r .agents/skills/storefront-forge ~/.claude/skills/
```

#### 🌐 For Windsurf / Cursor / OpenCode:
```bash
# OpenCode / Windsurf standard agents path
mkdir -p ~/.agents/skills && cp -r .agents/skills/storefront-forge ~/.agents/skills/
```

---

## 🚀 How to Run (`/website`)

Once installed, open your AI coding assistant in your project and type:

```text
/website build a luxury fashion store for Indian audience with INR prices
```

Or simply ask in plain English:

```text
Build a motion-rich Awwwards quality shoe store with Lenis smooth scroll and section color transitions
```

The agent will automatically read `storefront-forge/SKILL.md` and execute the full **9-Phase Pipeline**:

```
┌─────────────────────────────────────────────────────┐
│  PHASE 1 → Parse Prompt & Select Hero/Navbar        │
│  PHASE 2 → Art Direction (Font pairing & Colors)    │
│  PHASE 3 → Architecture (Page map & Taxonomy)       │
│  PHASE 4 → Scaffold Vite + React + TS + Tailwind    │
│  PHASE 5 → Build Sections (Hero, Shop, Cards, Cart) │
│  PHASE 6 → Wire GSAP + Lenis Motion & Transitions   │
│  PHASE 7 → UI Polish (Concentric radius, Shadows)   │
│  PHASE 8 → Anti-AI-Slop Quality Gate Review         │
│  PHASE 9 → Build & Validate (tsc + vite build)      │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Included Python Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| **Contrast Checker** | `python .agents/skills/storefront-forge/scripts/check_contrast.py "#FAF6F0" "#1F1713" "#E11D48"` | Calculates WCAG AA/AAA matrix for palette |
| **Palette Generator** | `python .agents/skills/storefront-forge/scripts/generate_palette.py --mood luxury --verify` | Generates verified palette for mood |
| **Palette Extractor** | `python .agents/skills/storefront-forge/scripts/extract_palette.py reference.jpg` | Samples dominant colors from reference image |

---

## 📜 License

MIT License. Free to use in open-source and commercial projects.
