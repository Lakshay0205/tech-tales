# Tech&Tales — Design System Reference

> **Rule**: Every visual decision traces back to this document.
> When in doubt: Simplicity > Decoration. Elegance > Complexity.

---

## Fonts

| Role    | Family    | Weight | Usage |
|---------|-----------|--------|-------|
| Display | Fraunces  | 300–500 | Hero, H1, H2, H3, stat numbers |
| Sans    | Geist     | 200–700 | Body, nav, buttons, labels, captions |

**Pairing rule**: Display for emotion. Sans for clarity. Never mix within the same text block.

---

## Type Scale

| Token       | Size (fluid)              | Usage |
|-------------|---------------------------|-------|
| `text-hero` | clamp(60px → 136px)       | Hero headline only |
| `text-h1`   | clamp(44px → 88px)        | Page titles |
| `text-h2`   | clamp(32px → 56px)        | Section headlines |
| `text-h3`   | clamp(22px → 32px)        | Sub-section titles |
| `text-h4`   | clamp(18px → 22px)        | Card titles |
| `text-body` | clamp(15px → 17px)        | Paragraphs |
| `text-small`| 14px                      | Supporting text |
| `text-caption` | 11px                   | Metadata, timestamps |
| `text-label`| 10px                      | Eyebrows, buttons, tags |
| `text-micro`| 9px                       | Stat labels |

**Line height**: Tight (0.92) for headlines. Relaxed (1.7) for body.
**Letter spacing**: Tight (-0.025em) for headlines. Wide (0.25em) for labels.

---

## Color System

### Backgrounds (darkest → lightest)
```
bg       #060810   ← page background
bg1      #080B12
bg2      #0A0E18
bg3      #0D1220
surface  #111520   ← card backgrounds
surface2 #161B28
```

### Text (most → least prominent)
```
text     #F0EDE8   ← primary — warm white
text2    #C8C4BC   ← secondary
muted    #6B7280   ← body copy
subtle   #374151   ← captions
ghost    #1F2937   ← barely visible metadata
```

### Gold (primary accent — use sparingly)
```
goldLt   #E8D5A3   ← highlights
gold     #C9A84C   ← primary accent
goldMid  #D4A843   ← mid tone
goldDk   #8B6914   ← shadows
```

### Semantic
```
success  #4ADE80
warning  #FBBF24
error    #F87171
accent   #6366F1   ← depth only, never primary
```

**Rule**: Gold is the only accent color used prominently. Indigo/sky are depth-only — used in background glows, never in UI elements.

---

## Spacing

Mathematical scale. Base 4px. Never use arbitrary values.

```
4 → 8 → 12 → 16 → 20 → 24 → 32 → 40 → 48 → 64 → 80 → 96 → 128 → 160
```

Section padding: **160px** desktop / **120px** tablet / **80px** mobile.

---

## Border Radius

One system. Used everywhere.

```
sm   8px    ← small elements (inputs, chips)
md   12px   ← inputs, small cards
lg   16px   ← medium cards
xl   20px   ← large cards (default)
xxl  28px   ← hero cards
pill 100px  ← buttons, tags, badges
```

---

## Buttons

| Variant   | Use case | Rule |
|-----------|----------|------|
| `btn-primary` | Main CTA | One per section maximum |
| `btn-ghost`   | Secondary CTA | Alongside primary only |
| Text link | Inline navigation | Never for primary actions |

**Hover**: Lift (-3px) + glow intensifies. Never color change on primary.
**Active**: Scale down (0.99) for tactile feedback.

---

## Cards

| Variant     | Use case |
|-------------|----------|
| `.card`     | Default — services, portfolio, pricing |
| `.card-glass` | Overlaid on imagery or gradients |
| `.card-dark`  | Service clusters, feature lists |

**Hover**: Lift (-8px) + gold border glow. Transition: 0.6s expo-out.

---

## Motion

| Property | Value | Rule |
|----------|-------|------|
| Ease     | `cubic-bezier(0.16, 1, 0.3, 1)` | All UI transitions |
| Enter    | 0.55s | Page/section entrances |
| Normal   | 0.5s  | Hover states |
| Fast     | 0.3s  | Micro-interactions |
| Exit     | 0.3s  | Always faster than enter |

**Rules**:
- Opacity + transform only. Never animate layout properties.
- Scroll-triggered reveals: `y: 40px → 0, opacity: 0 → 1`
- Stagger: 0.06–0.1s between siblings
- Never animate more than 3 elements simultaneously

---

## Background Depth System

Every page has 5 layers (bottom → top):

1. **Base** `#060810` — solid dark
2. **Glows** — radial gradients (gold top, indigo bottom-right, sky left)
3. **Dot grid** — 48px, gold 7% opacity, masked to center
4. **Grain** — 4% opacity film texture
5. **Content** — all UI elements

---

## Section Structure

Every section follows this exact pattern:

```
<section>
  ├── Eyebrow label        ← "What We Do"
  ├── Section headline     ← Fraunces, light weight
  ├── Optional body        ← 1–2 sentences max
  └── Content grid/list
```

**One purpose per section. Never mix.**

---

## Grid

- Desktop: 12-column, 1280px max-width, 40px gutters
- Tablet: 8-column, 32px gutters
- Mobile: 4-column, 20px gutters

Common layouts:
- `1 col` — hero text, CTA sections
- `2 col` — service clusters, about split
- `3 col` — service cards, team
- `4 col` — stats, small feature grid

---

## Icon System

Use inline SVGs only. No icon library dependency.
- Stroke width: **1.5px**
- Size: **12–16px** in UI, **20–24px** in cards
- Color: inherit from parent (never hardcoded)
- Style: rounded linecaps, minimal, geometric

---

## Image Treatment

- Aspect ratios: `16:9` (hero), `4:3` (cards), `1:1` (avatars)
- Always use `object-fit: cover`
- Overlay: `linear-gradient(to bottom, transparent 40%, rgba(6,8,16,0.8))`
- Border radius: matches card radius (20px default)
- Never stretch, never distort

---

## Premium Rules

1. **White space is the most important design element** — more than color, more than animation
2. **Gold is used for emphasis, not decoration** — one gold element per visual cluster
3. **Every animation has a purpose** — if it doesn't communicate something, remove it
4. **Typography does the heavy lifting** — large, confident, minimal
5. **Backgrounds are felt, not seen** — subtle depth, never distracting
6. **Consistency creates luxury** — same radius, same spacing, same motion everywhere
