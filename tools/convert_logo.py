#!/usr/bin/env python3
"""
Convert `logo.jpeg` (with white background) into transparent PNGs and favicons.

Usage: python tools/convert_logo.py

Looks for `logo.jpeg` in the project root. Outputs to `public/`:
- logo.png (transparent, full mark)
- logo-icon.png (square, tightly cropped to mark)
- favicons: favicon-16.png, favicon-32.png, apple-touch-icon.png, favicon.ico

This script uses Pillow. If Pillow is not installed it will attempt to install it.
"""
import os
import sys
from math import sqrt

try:
    from PIL import Image
except Exception:
    print('Pillow not found. Installing...')
    os.system(f"{sys.executable} -m pip install --user pillow")
    from PIL import Image


ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC = os.path.join(ROOT, 'logo.jpeg')
OUT_DIR = os.path.join(ROOT, 'public')

if not os.path.exists(SRC):
    print('Source logo not found at', SRC)
    print('Please place your original logo.jpeg at the project root and re-run.')
    sys.exit(1)

os.makedirs(OUT_DIR, exist_ok=True)


def make_transparent(src_path, dst_path, threshold=240):
    img = Image.open(src_path).convert('RGBA')
    datas = img.getdata()
    new_data = []
    for item in datas:
        r, g, b, a = item
        # compute distance from white
        dist = sqrt((255 - r) ** 2 + (255 - g) ** 2 + (255 - b) ** 2)
        if r >= threshold and g >= threshold and b >= threshold:
            # fully transparent for near-white
            new_data.append((r, g, b, 0))
        elif dist < 40:
            # soft edge: scale alpha down slightly
            alpha = int(max(0, (dist / 40.0) * 255))
            new_data.append((r, g, b, alpha))
        else:
            new_data.append((r, g, b, a))
    img.putdata(new_data)
    img.save(dst_path)
    print('Saved', dst_path)
    return dst_path


def make_icon(src_png, dst_icon, size=256, padding=12):
    img = Image.open(src_png).convert('RGBA')
    # compute bbox of non-transparent
    bbox = img.split()[-1].getbbox()
    if not bbox:
        # fallback to full image
        bbox = (0, 0, img.width, img.height)
    left, upper, right, lower = bbox
    w = right - left
    h = lower - upper
    # make square crop centered around bbox
    side = max(w, h)
    cx = left + w // 2
    cy = upper + h // 2
    new_left = max(0, cx - side // 2 - padding)
    new_upper = max(0, cy - side // 2 - padding)
    new_right = min(img.width, cx + side // 2 + padding)
    new_lower = min(img.height, cy + side // 2 + padding)
    crop = img.crop((new_left, new_upper, new_right, new_lower))
    icon = crop.resize((size, size), Image.LANCZOS)
    icon.save(dst_icon)
    print('Saved', dst_icon)
    return dst_icon


def make_favicons(src_png):
    sizes = [(16, 'favicon-16.png'), (32, 'favicon-32.png'), (180, 'apple-touch-icon.png')]
    for s, name in sizes:
        out = os.path.join(OUT_DIR, name)
        img = Image.open(src_png).convert('RGBA')
        img = img.resize((s, s), Image.LANCZOS)
        img.save(out)
        print('Saved', out)

    # Create multi-size favicon.ico
    ico_path = os.path.join(OUT_DIR, 'favicon.ico')
    ico_img = Image.open(src_png).convert('RGBA')
    ico_sizes = [(16,16), (32,32), (48,48)]
    icons = [ico_img.resize(s, Image.LANCZOS) for s in ico_sizes]
    icons[0].save(ico_path, format='ICO', sizes=ico_sizes)
    print('Saved', ico_path)


def main():
    dst_png = os.path.join(OUT_DIR, 'logo.png')
    dst_icon_png = os.path.join(OUT_DIR, 'logo-icon.png')

    make_transparent(SRC, dst_png)
    make_icon(dst_png, dst_icon_png, size=256, padding=10)
    make_favicons(dst_icon_png)


if __name__ == '__main__':
    main()
