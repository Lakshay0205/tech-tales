#!/usr/bin/env python3
"""Create project showcase images as PNG files."""

from PIL import Image, ImageDraw, ImageFont
import os

def create_image(filename, title, subtitle, color):
    """Create a simple project showcase image."""
    # Create image (900x600 for good web use)
    width, height = 900, 600
    img = Image.new('RGB', (width, height), color=color)
    draw = ImageDraw.Draw(img)
    
    # Try to use system fonts
    try:
        title_font = ImageFont.truetype("arial.ttf", 72)
        subtitle_font = ImageFont.truetype("arial.ttf", 36)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    # Add gradient overlay (dark at edges)
    overlay = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    for i in range(height):
        alpha = int(100 * (i / height))
        overlay_draw.line([(0, i), (width, i)], fill=(0, 0, 0, alpha))
    img.paste(overlay, (0, 0), overlay)
    
    # Add text
    draw = ImageDraw.Draw(img)
    
    # Draw title
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = (width - title_width) // 2
    title_y = height // 3
    draw.text((title_x, title_y), title, fill='white', font=title_font)
    
    # Draw subtitle
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_x = (width - subtitle_width) // 2
    subtitle_y = title_y + 100
    draw.text((subtitle_x, subtitle_y), subtitle, fill='rgba(255,255,255,200)', font=subtitle_font)
    
    # Save as PNG
    output_path = os.path.join('public', f'{filename}.png')
    img.save(output_path, 'PNG', quality=95)
    print(f"Created {output_path}")

# Create project images
create_image('terravik', 'TERRAVIK', 'Agricultural Intelligence Platform', (20, 60, 40))
create_image('hawaiagro', 'HAWAI AGRO', 'Farm Management System', (30, 50, 70))

print("\nProject images created successfully!")
