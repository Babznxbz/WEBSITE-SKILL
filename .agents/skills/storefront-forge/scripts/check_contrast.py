#!/usr/bin/env python3
"""
WCAG Contrast Matrix Checker
Checks every foreground-background combination in a palette
and reports which pairs are safe for text, UI elements, or decoration only.

Usage:
  python check_contrast.py "#FAF6F0" "#1F1713" "#E11D48" "#EEF3EB" "#8B1A3A"
  python check_contrast.py --json palette.json
  python check_contrast.py --matrix "#FAF6F0" "#1F1713" "#E11D48"

Output:
  Prints a contrast matrix showing:
  - ✅ AA (≥4.5:1) — safe for normal body text
  - ⚠️  AA-Large (≥3:1) — safe for large text (≥18px bold or ≥24px) and UI
  - ❌ Fail (<3:1) — decorative use only

Exit code:
  0 — all text pairs pass AA
  1 — at least one failure found
"""

import sys
import json
import math
from typing import List, Tuple


def hex_to_rgb(hex_color: str) -> Tuple[int, int, int]:
    """Convert hex color to RGB tuple."""
    hex_color = hex_color.lstrip('#')
    if len(hex_color) == 3:
        hex_color = ''.join(c * 2 for c in hex_color)
    return (
        int(hex_color[0:2], 16),
        int(hex_color[2:4], 16),
        int(hex_color[4:6], 16),
    )


def relative_luminance(r: int, g: int, b: int) -> float:
    """Calculate relative luminance per WCAG 2.1."""
    def linearize(val: int) -> float:
        srgb = val / 255.0
        if srgb <= 0.04045:
            return srgb / 12.92
        return math.pow((srgb + 0.055) / 1.055, 2.4)

    r_lin = linearize(r)
    g_lin = linearize(g)
    b_lin = linearize(b)
    return 0.2126 * r_lin + 0.7152 * g_lin + 0.0722 * b_lin


def contrast_ratio(color1: str, color2: str) -> float:
    """Calculate WCAG contrast ratio between two hex colors."""
    r1, g1, b1 = hex_to_rgb(color1)
    r2, g2, b2 = hex_to_rgb(color2)

    l1 = relative_luminance(r1, g1, b1)
    l2 = relative_luminance(r2, g2, b2)

    lighter = max(l1, l2)
    darker = min(l1, l2)

    return (lighter + 0.05) / (darker + 0.05)


def classify(ratio: float) -> str:
    """Classify a contrast ratio."""
    if ratio >= 7.0:
        return 'AAA'
    elif ratio >= 4.5:
        return 'AA'
    elif ratio >= 3.0:
        return 'AA-Large'
    else:
        return 'Fail'


def symbol(classification: str) -> str:
    """Get symbol for classification."""
    return {
        'AAA': '✅ AAA',
        'AA': '✅ AA',
        'AA-Large': '⚠️  Large',
        'Fail': '❌ Fail',
    }.get(classification, '?')


def print_matrix(colors: List[str]) -> bool:
    """Print a full contrast matrix. Returns True if all critical pairs pass."""
    all_pass = True

    # Header
    max_len = max(len(c) for c in colors)
    header = ' ' * (max_len + 2)
    for c in colors:
        header += f'{c:>{max_len + 2}}'
    print(header)
    print('-' * len(header))

    for fg in colors:
        row = f'{fg:>{max_len}}  '
        for bg in colors:
            if fg == bg:
                row += f'{"---":>{max_len + 2}}'
            else:
                ratio = contrast_ratio(fg, bg)
                cls = classify(ratio)
                if cls == 'Fail':
                    all_pass = False
                row += f'{ratio:>{max_len - 2}.1f}:{cls[:2]:>2}  '
        print(row)

    return all_pass


def print_report(colors: List[str]) -> bool:
    """Print a detailed report of all pairs."""
    all_pass = True
    pairs = []

    for i, fg in enumerate(colors):
        for j, bg in enumerate(colors):
            if i == j:
                continue
            ratio = contrast_ratio(fg, bg)
            cls = classify(ratio)
            pairs.append((fg, bg, ratio, cls))
            if cls == 'Fail':
                all_pass = False

    # Sort by ratio descending
    pairs.sort(key=lambda x: -x[2])

    print('\n╔═══════════════════════════════════════════════════════╗')
    print('║           WCAG CONTRAST MATRIX REPORT                ║')
    print('╚═══════════════════════════════════════════════════════╝\n')

    # Summary
    total = len(pairs)
    passing = sum(1 for _, _, _, c in pairs if c in ('AA', 'AAA'))
    large_only = sum(1 for _, _, _, c in pairs if c == 'AA-Large')
    failing = sum(1 for _, _, _, c in pairs if c == 'Fail')

    print(f'  Colors tested: {len(colors)}')
    print(f'  Total pairs:   {total}')
    print(f'  ✅ AA+ (text):  {passing}')
    print(f'  ⚠️  Large only: {large_only}')
    print(f'  ❌ Fail:        {failing}')
    print()

    # Detailed pairs
    print('  PAIR DETAILS (sorted by contrast ratio):')
    print('  ' + '-' * 55)

    for fg, bg, ratio, cls in pairs:
        sym = symbol(cls)
        print(f'  {fg} on {bg}  →  {ratio:.2f}:1  {sym}')

    print()

    if all_pass:
        print('  ✅ ALL PAIRS PASS — palette is safe for text use.')
    else:
        print('  ❌ SOME PAIRS FAIL — review the combinations above.')
        print('     Failing pairs should only be used for decorative elements,')
        print('     not for text or interactive UI components.')

    return all_pass


def main():
    args = sys.argv[1:]

    if not args or args[0] in ('-h', '--help'):
        print(__doc__)
        sys.exit(0)

    # Parse colors
    colors = []

    if args[0] == '--json':
        with open(args[1], 'r') as f:
            data = json.load(f)
            if isinstance(data, list):
                colors = data
            elif isinstance(data, dict):
                colors = list(data.values())
    elif args[0] == '--matrix':
        colors = [c for c in args[1:] if c.startswith('#')]
        all_pass = print_matrix(colors)
        sys.exit(0 if all_pass else 1)
    else:
        colors = [c for c in args if c.startswith('#')]

    if len(colors) < 2:
        print('Error: Need at least 2 colors to check contrast.')
        sys.exit(2)

    all_pass = print_report(colors)
    sys.exit(0 if all_pass else 1)


if __name__ == '__main__':
    main()
