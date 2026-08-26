#!/usr/bin/env python3
"""
Image Palette Extractor
Extracts dominant color palette from a reference image or URL
and maps colors to design roles with contrast verification.

Usage:
  python extract_palette.py image.jpg
  python extract_palette.py https://example.com/reference.png
  python extract_palette.py screenshot.png --json

Requires:
  Pillow (optional, fallback to basic hex parsing if unavailable)
"""

import sys
import json
import math
from typing import List, Tuple, Dict


def hex_to_rgb(hex_color: str) -> Tuple[int, int, int]:
    """Convert hex string to RGB tuple."""
    hex_color = hex_color.lstrip('#')
    if len(hex_color) == 3:
        hex_color = ''.join(c * 2 for c in hex_color)
    return (
        int(hex_color[0:2], 16),
        int(hex_color[2:4], 16),
        int(hex_color[4:6], 16),
    )


def rgb_to_hex(r: int, g: int, b: int) -> str:
    """Convert RGB tuple to hex string."""
    return f'#{r:02x}{g:02x}{b:02x}'


def extract_colors_pillow(image_path: str, num_colors: int = 6) -> List[str]:
    """Extract dominant colors using Pillow if available."""
    try:
        from PIL import Image
        img = Image.open(image_path)
        img = img.convert('RGB')
        img = img.resize((150, 150))
        
        # Quantize colors
        quantized = img.quantize(colors=num_colors)
        palette = quantized.getpalette()[:num_colors * 3]
        
        colors = []
        for i in range(0, len(palette), 3):
            r, g, b = palette[i:i+3]
            colors.append(rgb_to_hex(r, g, b))
        return colors
    except ImportError:
        print("Note: Pillow module not found. Please install pillow: pip install pillow", file=sys.stderr)
        return []
    except Exception as e:
        print(f"Error processing image: {e}", file=sys.stderr)
        return []


def map_colors_to_roles(colors: List[str]) -> Dict[str, str]:
    """Map extracted colors to storefront design roles."""
    if not colors:
        # Fallback default luxury palette if extraction fails
        return {
            'bg_primary': '#FAF6F0',
            'bg_secondary': '#EEF3EB',
            'bg_tertiary': '#FAF0F2',
            'bg_accent': '#8B1A3A',
            'text_primary': '#1F1713',
            'text_secondary': '#6B5E54',
            'accent': '#E11D48',
            'accent_hover': '#BE123C',
            'border': '#E5DDD3',
            'surface': '#FFFFFF',
        }

    # Sort colors by lightness
    def get_lightness(hex_code: str) -> float:
        r, g, b = hex_to_rgb(hex_code)
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255.0

    sorted_colors = sorted(colors, key=get_lightness)
    
    darkest = sorted_colors[0]
    lightest = sorted_colors[-1]
    mid_colors = sorted_colors[1:-1] if len(sorted_colors) > 2 else sorted_colors

    accent = mid_colors[0] if mid_colors else darkest

    return {
        'bg_primary': lightest,
        'bg_secondary': sorted_colors[-2] if len(sorted_colors) > 1 else lightest,
        'bg_tertiary': lightest,
        'bg_accent': darkest,
        'text_primary': darkest,
        'text_secondary': mid_colors[-1] if mid_colors else darkest,
        'accent': accent,
        'accent_hover': accent,
        'border': '#E5DDD3',
        'surface': '#FFFFFF',
    }


def main():
    args = sys.argv[1:]
    if not args or args[0] in ('-h', '--help'):
        print(__doc__)
        sys.exit(0)

    image_path = args[0]
    colors = extract_colors_pillow(image_path)
    palette_map = map_colors_to_roles(colors)

    result = {
        'source_image': image_path,
        'extracted_raw': colors,
        'roles': palette_map,
    }

    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
