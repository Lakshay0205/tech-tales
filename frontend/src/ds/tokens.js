/**
 * Tech&Tales Design System — Tokens
 * Single source of truth. Every value used in the UI must trace back here.
 * Never hard-code a color, size, or duration anywhere else.
 */

// ─── COLOR ────────────────────────────────────────────────────────────────────

export const color = {
  // Backgrounds — layered depth system (darkest → lightest surface)
  bg:        '#060810',
  bg1:       '#080B12',
  bg2:       '#0A0E18',
  bg3:       '#0D1220',
  surface:   '#111520',
  surface2:  '#161B28',
  card:      '#111827',

  // Text hierarchy
  text:      '#F0EDE8',   // primary — warm white
  text2:     '#C8C4BC',   // secondary
  muted:     '#6B7280',   // supporting
  subtle:    '#374151',   // captions, metadata
  ghost:     '#1F2937',   // barely visible

  // Gold — primary accent
  gold:      '#C9A84C',
  goldLt:    '#E8D5A3',
  goldDk:    '#8B6914',
  goldMid:   '#D4A843',
  goldGlow:  'rgba(201,168,76,0.15)',

  // Semantic
  success:   '#4ADE80',
  successBg: 'rgba(74,222,128,0.06)',
  successBd: 'rgba(74,222,128,0.15)',
  warning:   '#FBBF24',
  warningBg: 'rgba(251,191,36,0.06)',
  error:     '#F87171',
  errorBg:   'rgba(248,113,113,0.06)',

  // Accent (indigo — used sparingly for depth only)
  accent:    '#6366F1',
  accentBg:  'rgba(99,102,241,0.05)',

  // Borders
  border:    'rgba(255,255,255,0.06)',
  border2:   'rgba(255,255,255,0.10)',
  borderGold:'rgba(201,168,76,0.18)',
  borderGoldHover: 'rgba(201,168,76,0.35)',
}

// ─── TYPOGRAPHY ───────────────────────────────────────────────────────────────

export const font = {
  display: "'Fraunces', Georgia, serif",
  sans:    "'Geist', system-ui, sans-serif",
}

// Fluid type scale — clamp(min, preferred, max)
export const type = {
  hero:    'clamp(3.75rem, 9.5vw, 8.5rem)',   // 60–136px
  h1:      'clamp(2.75rem, 6vw, 5.5rem)',      // 44–88px
  h2:      'clamp(2rem, 4vw, 3.5rem)',         // 32–56px
  h3:      'clamp(1.375rem, 2.5vw, 2rem)',     // 22–32px
  h4:      'clamp(1.125rem, 1.8vw, 1.375rem)',// 18–22px
  body:    'clamp(0.9375rem, 1.2vw, 1.0625rem)', // 15–17px
  small:   '0.875rem',   // 14px
  xs:      '0.8125rem',  // 13px
  xxs:     '0.75rem',    // 12px
  caption: '0.6875rem',  // 11px
  label:   '0.625rem',   // 10px — eyebrows, tags, buttons
  micro:   '0.5625rem',  // 9px
}

export const weight = {
  thin:    200,
  light:   300,
  regular: 400,
  medium:  500,
  semibold:600,
  bold:    700,
}

export const leading = {
  tight:   0.92,
  snug:    1.1,
  normal:  1.5,
  relaxed: 1.7,
  loose:   1.9,
}

export const tracking = {
  tight:   '-0.04em',
  snug:    '-0.025em',
  normal:  '0em',
  wide:    '0.08em',
  wider:   '0.15em',
  widest:  '0.25em',
  ultra:   '0.35em',
}

// ─── SPACING ──────────────────────────────────────────────────────────────────
// Mathematical scale: base 4px, ratio ~1.618 (golden ratio)

export const space = {
  1:   '4px',
  2:   '8px',
  3:   '12px',
  4:   '16px',
  5:   '20px',
  6:   '24px',
  7:   '28px',
  8:   '32px',
  10:  '40px',
  12:  '48px',
  14:  '56px',
  16:  '64px',
  20:  '80px',
  24:  '96px',
  28:  '112px',
  32:  '128px',
  36:  '144px',
  40:  '160px',   // section padding
  section:    '160px',
  sectionMd:  '120px',
  sectionSm:  '80px',
}

// ─── RADIUS ───────────────────────────────────────────────────────────────────
// One consistent system. Never deviate.

export const radius = {
  sm:   '8px',
  md:   '12px',
  lg:   '16px',
  xl:   '20px',
  xxl:  '28px',
  pill: '100px',
  full: '9999px',
}

// ─── SHADOW ───────────────────────────────────────────────────────────────────

export const shadow = {
  sm:   '0 2px 8px rgba(0,0,0,0.3)',
  md:   '0 8px 32px rgba(0,0,0,0.4)',
  lg:   '0 16px 56px rgba(0,0,0,0.5)',
  xl:   '0 32px 80px rgba(0,0,0,0.6)',
  card: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
  cardHover: [
    '0 0 0 1px rgba(201,168,76,0.14)',
    '0 0 80px rgba(201,168,76,0.07)',
    '0 32px 80px rgba(0,0,0,0.7)',
    'inset 0 1px 0 rgba(255,255,255,0.04)',
  ].join(', '),
  btnPrimary: [
    '0 0 0 1px rgba(201,168,76,0.4)',
    '0 0 40px rgba(201,168,76,0.25)',
    '0 8px 40px rgba(0,0,0,0.5)',
    'inset 0 1px 0 rgba(255,255,255,0.3)',
    'inset 0 -1px 0 rgba(0,0,0,0.2)',
  ].join(', '),
  btnPrimaryHover: [
    '0 0 0 1px rgba(201,168,76,0.6)',
    '0 0 80px rgba(201,168,76,0.4)',
    '0 16px 56px rgba(0,0,0,0.6)',
    'inset 0 1px 0 rgba(255,255,255,0.35)',
    'inset 0 -1px 0 rgba(0,0,0,0.25)',
  ].join(', '),
  glow: '0 0 32px rgba(201,168,76,0.12), 0 8px 40px rgba(0,0,0,0.4)',
  goldDot: '0 0 10px rgba(201,168,76,0.8)',
}

// ─── GRADIENT ─────────────────────────────────────────────────────────────────

export const gradient = {
  gold:        'linear-gradient(135deg, #F0E0B0 0%, #D4A843 45%, #9A7020 100%)',
  goldText:    'linear-gradient(135deg, #E8D5A3 0%, #C9A84C 45%, #8B6914 100%)',
  goldSubtle:  'linear-gradient(135deg, #E8D5A3 0%, #C9A84C 100%)',
  goldDivider: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.3) 30%, rgba(201,168,76,0.5) 50%, rgba(201,168,76,0.3) 70%, transparent 100%)',
  surface:     'linear-gradient(145deg, rgba(17,21,32,0.92) 0%, rgba(11,15,26,0.96) 100%)',
  surfaceDark: 'linear-gradient(145deg, #16162A 0%, #111120 100%)',
  bgRadial:    'radial-gradient(circle at 35% 40%, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.05) 40%, rgba(99,102,241,0.05) 65%, transparent 75%)',
}

// ─── MOTION ───────────────────────────────────────────────────────────────────

export const ease = {
  out:     [0.16, 1, 0.3, 1],    // expo out — snappy, premium
  in:      [0.7, 0, 0.84, 0],    // expo in
  inOut:   [0.87, 0, 0.13, 1],   // expo in-out
  spring:  [0.22, 1, 0.36, 1],   // spring-like
  gentle:  [0.25, 0.46, 0.45, 0.94],
}

export const duration = {
  instant: 0.15,
  fast:    0.3,
  normal:  0.5,
  slow:    0.8,
  enter:   0.55,
  exit:    0.3,
}

// ─── BREAKPOINTS ──────────────────────────────────────────────────────────────

export const bp = {
  sm:  '640px',
  md:  '768px',
  lg:  '1024px',
  xl:  '1280px',
  xxl: '1536px',
}

// ─── LAYOUT ───────────────────────────────────────────────────────────────────

export const layout = {
  maxWidth:       '1280px',
  maxWidthNarrow: '960px',
  maxWidthTight:  '720px',
  navHeight:      '68px',
  navHeightScrolled: '64px',
}

// ─── Z-INDEX ──────────────────────────────────────────────────────────────────

export const z = {
  bg:      0,
  base:    1,
  content: 2,
  sticky:  10,
  nav:     50,
  modal:   100,
  toast:   200,
}
