from PIL import Image
import os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
public = os.path.join(ROOT, 'public')
logo = os.path.join(public, 'logo.png')
if not os.path.exists(logo):
    print('logo.png not found in public/')
    raise SystemExit(1)

bg = Image.new('RGBA', (800, 400), (10, 14, 20, 255))
img = Image.open(logo).convert('RGBA')
iw, ih = img.size
bg.paste(img, ((bg.width - iw) // 2, (bg.height - ih) // 2), img)
out = os.path.join(public, '_preview_logo_on_dark.png')
bg.save(out)
print('Saved preview to', out)
