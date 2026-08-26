#!/usr/bin/env python3
"""
Palette Generator
Generates harmonious color palettes based on mood keywords,
with automatic WCAG contrast verification.

Usage:
  python generate_palette.py --mood luxury
  python generate_palette.py --mood street --verify
  python generate_palette.py --mood minimal --format css
  python generate_palette.py --mood warm --hue 28

Available moods:
  luxury, minimal, street, beauty, earth, ocean, lavender, midnight, emerald, editorial

Output:
  JSON object with 10 role-assigned colors + contrast verification results.
"""

import sys
import json
import math
import colorsys
import random
from typing import Dict, Tuple


# Mood → HSL base parameters
MOOD_CONFIGS = {
    'luxury': {
        'hues': [350, 355, 0, 5],      # Rose/wine family
        'saturation': (0.55, 0.75),
        'bg_warmth': 25,                 # Warm cream undertone
        'palette_name': 'Luxury Warm',
    },
    'minimal': {
        'hues': [30, 35, 40],           # Warm neutral
        'saturation': (0.15, 0.30),
        'bg_warmth': 35,
        'palette_name': 'Nordic Minimal',
    },
    'street': {
        'hues': [15, 20, 25],           # Orange family
        'saturation': (0.85, 1.0),
        'bg_warmth': 45,
        'palette_name': 'Streetwear Bold',
    },
    'beauty': {
        'hues': [0, 5, 355],            # Soft rose
        'saturation': (0.35, 0.50),
        'bg_warmth': 15,
        'palette_name': 'Beauty Rose',
    },
    'earth': {
        'hues': [28, 32, 36],           # Amber/warm
        'saturation': (0.60, 0.75),
        'bg_warmth': 30,
        'palette_name': 'Warm Earth',
    },
    'ocean': {
        'hues': [165, 170, 175],        # Teal family
        'saturation': (0.40, 0.55),
        'bg_warmth': 160,
        'palette_name': 'Ocean Calm',
    },
    'lavender': {
        'hues': [260, 265, 270],        # Violet
        'saturation': (0.50, 0.70),
        'bg_warmth': 270,
        'palette_name': 'Lavender Dream',
    },
    'midnight': {
        'hues': [40, 42, 45],           # Gold
        'saturation': (0.50, 0.65),
        'bg_warmth': 0,                  # Cool/dark
        'palette_name': 'Midnight Gold',
        'dark_mode': True,
    },
    'emerald': {
        'hues': [150, 155, 160],        # Green
        'saturation': (0.45, 0.60),
        'bg_warmth': 80,
        'palette_name': 'Emerald Luxury',
    },
    'editorial': {
        'hues': [0],                     # Achromatic
        'saturation': (0.0, 0.0),
        'bg_warmth': 0,
        'palette_name': 'Monochrome Editorial',
    },
}


def hsl_to_hex(h: float, s: float, l: float) -> str:
    """Convert HSL (0-360, 0-1, 0-1) to hex."""
    h_norm = h / 360.0
    r, g, b = colorsys.hls_to_rgb(h_norm, l, s)
    return f'#{int(r * 255):02x}{int(g * 255):02x}{int(b * 255):02x}'


def hex_to_rgb(hex_color: str) -> Tuple[int, int, int]:
    """Convert hex to RGB."""
    h = hex_color.lstrip('#')
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def relative_luminance(r: int, g: int, b: int) -> float:
    """WCAG relative luminance."""
    def lin(v):
        s = v / 255.0
        return s / 12.92 if s <= 0.04045 else ((s + 0.055) / 1.055) ** 2.4
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)


def contrast(c1: str, c2: str) -> float:
    """WCAG contrast ratio."""
    l1 = relative_luminance(*hex_to_rgb(c1))
    l2 = relative_luminance(*hex_to_rgb(c2))
    lighter, darker = max(l1, l2), min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)


def generate_palette(mood: str, custom_hue: int = None) -> Dict:
    """Generate a complete palette for a mood."""
    config = MOOD_CONFIGS.get(mood)
    if not config:
        raise ValueError(f"Unknown mood: {mood}. Available: {', '.join(MOOD_CONFIGS.keys())}")

    hue = custom_hue if custom_hue is not None else random.choice(config['hues'])
    sat_min, sat_max = config['saturation']
    sat = random.uniform(sat_min, sat_max)
    bg_hue = config['bg_warmth']
    is_dark = config.get('dark_mode', False)

    if is_dark:
        palette = {
            'bg_primary': hsl_to_hex(0, 0, 0.04),
            'bg_secondary': hsl_to_hex(0, 0, 0.08),
            'bg_tertiary': hsl_to_hex(0, 0, 0.10),
            'bg_accent': hsl_to_hex(hue, sat, 0.50),
            'text_primary': hsl_to_hex(bg_hue, 0.08, 0.93),
            'text_secondary': hsl_to_hex(0, 0, 0.52),
            'accent': hsl_to_hex(hue, sat, 0.50),
            'accent_hover': hsl_to_hex(hue, sat, 0.58),
            'border': hsl_to_hex(0, 0, 0.16),
            'surface': hsl_to_hex(0, 0, 0.12),
        }
    else:
        palette = {
            'bg_primary': hsl_to_hex(bg_hue, 0.15, 0.97),
            'bg_secondary': hsl_to_hex((bg_hue + 60) % 360, 0.12, 0.94),
            'bg_tertiary': hsl_to_hex(hue, 0.10, 0.96),
            'bg_accent': hsl_to_hex(hue, sat * 0.8, 0.32),
            'text_primary': hsl_to_hex(bg_hue, 0.20, 0.10),
            'text_secondary': hsl_to_hex(bg_hue, 0.12, 0.40),
            'accent': hsl_to_hex(hue, sat, 0.50),
            'accent_hover': hsl_to_hex(hue, sat, 0.42),
            'border': hsl_to_hex(bg_hue, 0.10, 0.88),
            'surface': '#ffffff',
        }

    return {
        'name': config['palette_name'],
        'mood': mood,
        'base_hue': hue,
        'colors': palette,
    }


def verify_palette(palette: Dict) -> Dict:
    """Verify contrast ratios for a palette."""
    colors = palette['colors']
    results = {}

    # Critical pairs: text on backgrounds
    critical_pairs = [
        ('text_primary', 'bg_primary', 'Body text on main bg'),
        ('text_primary', 'bg_secondary', 'Body text on alt bg'),
        ('text_primary', 'bg_tertiary', 'Body text on third bg'),
        ('text_primary', 'surface', 'Body text on cards'),
        ('text_secondary', 'bg_primary', 'Muted text on main bg'),
        ('text_secondary', 'surface', 'Muted text on cards'),
        ('accent', 'bg_primary', 'Accent on main bg (UI)'),
        ('accent', 'surface', 'Accent on cards (UI)'),
    ]

    all_pass = True
    for fg_key, bg_key, description in critical_pairs:
        fg = colors[fg_key]
        bg = colors[bg_key]
        ratio = contrast(fg, bg)
        min_ratio = 4.5 if 'text' in fg_key.lower() else 3.0
        passed = ratio >= min_ratio

        if not passed:
            all_pass = False

        results[f'{fg_key}_on_{bg_key}'] = {
            'fg': fg,
            'bg': bg,
            'ratio': round(ratio, 2),
            'required': min_ratio,
            'passed': passed,
            'description': description,
        }

    return {
        'all_pass': all_pass,
        'pairs': results,
    }


def format_css(palette: Dict) -> str:
    """Format palette as CSS custom properties."""
    colors = palette['colors']
    lines = [':root {']
    for key, value in colors.items():
        css_var = key.replace('_', '-')
        lines.append(f'  --{css_var}: {value};')
    lines.append('}')
    return '\n'.join(lines)


def main():
    args = sys.argv[1:]

    if not args or args[0] in ('-h', '--help'):
        print(__doc__)
        sys.exit(0)

    mood = 'luxury'
    verify = False
    fmt = 'json'
    custom_hue = None

    i = 0
    while i < len(args):
        if args[i] == '--mood' and i + 1 < len(args):
            mood = args[i + 1]
            i += 2
        elif args[i] == '--verify':
            verify = True
            i += 1
        elif args[i] == '--format' and i + 1 < len(args):
            fmt = args[i + 1]
            i += 2
        elif args[i] == '--hue' and i + 1 < len(args):
            custom_hue = int(args[i + 1])
            i += 2
        else:
            i += 1

    palette = generate_palette(mood, custom_hue)

    if verify:
        verification = verify_palette(palette)
        palette['verification'] = verification

        if not verification['all_pass']:
            print('⚠️  Some contrast pairs failed. Regenerating...', file=sys.stderr)
            # Try up to 5 times
            for attempt in range(5):
                palette = generate_palette(mood, custom_hue)
                verification = verify_palette(palette)
                palette['verification'] = verification
                if verification['all_pass']:
                    break

    if fmt == 'css':
        print(format_css(palette))
    else:
        print(json.dumps(palette, indent=2))

    if verify and not palette.get('verification', {}).get('all_pass', True):
        sys.exit(1)


if __name__ == '__main__':
    main()
