# ⚡ WEBSITE SKILL (Storefront Forge & Awwwards Engine)

> An all-in-one, anti-AI-slop web design and e-commerce skill for AI coding agents (**Antigravity, OpenCode, Claude Code, Windsurf, Cursor, Gemini CLI**).
> Systematically builds Dribbble / Awwwards-level websites with GSAP + Lenis scroll animations, Shopify-style shop architecture, dynamic hero patterns, color palette generation, and WCAG contrast verification.

---

## 🚀 1-Line CLI Install (OpenCode, Claude Code, Cursor, Windsurf)

Install into your project or globally using `npx skills`:

### 🔷 For OpenCode:
```bash
npx skills add Babznxbz/WEBSITE-SKILL --agent opencode --yes
```
*(Add `-g` for global installation across all projects: `npx skills add Babznxbz/WEBSITE-SKILL -g --agent opencode --yes`)*

### 🧡 For Claude Code:
```bash
npx skills add Babznxbz/WEBSITE-SKILL --agent claude-code --yes
```

### 🌐 Universal (All Agents):
```bash
npx skills add Babznxbz/WEBSITE-SKILL -g --yes
```

---

## ⚡ Manual Installation Options

### Option A: Per-Project Installation
Copy `.agents` or `skills` into your target web project root:

```bash
cp -r .agents /path/to/your-project/
```

### Option B: Global Agent Installation

#### 🌐 For Antigravity (Google DeepMind Agent):
```bash
# Windows (PowerShell)
xcopy /E /I skills\storefront-forge %USERPROFILE%\.gemini\config\skills\storefront-forge

# macOS / Linux
mkdir -p ~/.gemini/config/skills && cp -r skills/storefront-forge ~/.gemini/config/skills/
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
| **Contrast Checker** | `python skills/storefront-forge/scripts/check_contrast.py "#FAF6F0" "#1F1713" "#E11D48"` | Calculates WCAG AA/AAA matrix for palette |
| **Palette Generator** | `python skills/storefront-forge/scripts/generate_palette.py --mood luxury --verify` | Generates verified palette for mood |
| **Palette Extractor** | `python skills/storefront-forge/scripts/extract_palette.py reference.jpg` | Samples dominant colors from reference image |

---

## 📜 License

MIT License. Free to use in open-source and commercial projects.
