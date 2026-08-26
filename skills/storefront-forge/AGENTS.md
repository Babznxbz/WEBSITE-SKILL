# AGENTS.md — Storefront Forge Agent Rules

Instructions for AI coding agents (Claude Code, Antigravity, Windsurf, Gemini CLI, OpenCode) executing the `storefront-forge` skill.

---

## Agent Mindset & Execution Discipline

1. **Anti-Slop First**: Never fall back to generic Tailwind default palettes (`blue-500`, `indigo-600`) or standard templates. Every design decision must look art-directed for high-end digital agency work (Dribbble/Awwwards level).
2. **Orchestrated Workflow**: Always execute the 9 phases in [SKILL.md](SKILL.md) sequentially. Do not jump straight to building UI without defining design tokens and data architecture first.
3. **GSAP + Lenis Lock**: Use Lenis for smooth scrolling and GSAP ScrollTrigger for section transitions, pin/scrub timelines, and stagger reveals. Never combine Lenis with Locomotive Scroll.
4. **WCAG Contrast Strictness**: Verify button text and readability before declaring a section complete. Run `python scripts/check_contrast.py` or test contrast math.
5. **Portability**: This skill is entirely file-based (Markdown + Python + React/TS code patterns). Keep it self-contained under `.agents/skills/storefront-forge`.

---

## Tool & Component Preferences

- **UI Components**: Use `shadcn/ui` primitives (`button`, `sheet`, `dialog`, `badge`, `input`, `accordion`).
- **Icons**: Use `lucide-react` icons. Do NOT use emoji as UI icons.
- **Styling**: Tailwind CSS + CSS custom properties in `index.css`.
- **Framework**: Vite + React 18 + TypeScript.

---

## Quality Review Before Handoff

Before concluding a task, run the full verification checklist in `references/anti-slop-checklist.md`:
- [ ] TypeScript build passes (`npx tsc --noEmit`)
- [ ] Vite build completes cleanly (`npm run build`)
- [ ] No Lorem ipsum or broken links
- [ ] Responsive navigation and cart drawer functional
- [ ] Section background color transitions active on scroll
