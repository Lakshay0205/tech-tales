/**
 * Tech&Tales Design System — Typography
 * Rules for every text element on the site.
 * Import and use these style objects directly in components.
 */

import { font, type, weight, leading, tracking, color } from './tokens'

// ─── DISPLAY / HERO ───────────────────────────────────────────────────────────

/** Hero headline — the largest text on any page */
export const heroHeadline = {
  fontFamily:    font.display,
  fontSize:      type.hero,
  fontWeight:    weight.medium,
  lineHeight:    leading.tight,
  letterSpacing: tracking.snug,
  color:         color.text,
}

/** Section headline — h2 level */
export const sectionHeadline = {
  fontFamily:    font.display,
  fontSize:      type.h2,
  fontWeight:    weight.light,
  lineHeight:    leading.snug,
  letterSpacing: tracking.snug,
  color:         color.text,
}

/** Sub-section headline — h3 level */
export const subHeadline = {
  fontFamily:    font.display,
  fontSize:      type.h3,
  fontWeight:    weight.light,
  lineHeight:    leading.snug,
  letterSpacing: tracking.snug,
  color:         color.text,
}

/** Card / item headline — h4 level */
export const cardHeadline = {
  fontFamily:    font.sans,
  fontSize:      type.h4,
  fontWeight:    weight.medium,
  lineHeight:    leading.snug,
  letterSpacing: tracking.tight,
  color:         color.text,
}

// ─── BODY ─────────────────────────────────────────────────────────────────────

/** Primary body copy */
export const body = {
  fontFamily:  font.sans,
  fontSize:    type.body,
  fontWeight:  weight.light,
  lineHeight:  leading.relaxed,
  color:       color.muted,
}

/** Secondary / supporting body */
export const bodySmall = {
  fontFamily:  font.sans,
  fontSize:    type.small,
  fontWeight:  weight.light,
  lineHeight:  leading.relaxed,
  color:       color.muted,
}

// ─── LABELS / META ────────────────────────────────────────────────────────────

/** Eyebrow label — above section titles */
export const eyebrow = {
  fontFamily:    font.sans,
  fontSize:      type.label,
  fontWeight:    weight.semibold,
  letterSpacing: tracking.widest,
  textTransform: 'uppercase',
  color:         color.gold,
}

/** Navigation link */
export const navLink = {
  fontFamily:  font.sans,
  fontSize:    type.xs,
  fontWeight:  weight.regular,
  color:       color.muted,
  textDecoration: 'none',
}

/** Button label */
export const btnLabel = {
  fontFamily:    font.sans,
  fontSize:      type.label,
  fontWeight:    weight.bold,
  letterSpacing: tracking.wider,
  textTransform: 'uppercase',
}

/** Caption / metadata */
export const caption = {
  fontFamily:    font.sans,
  fontSize:      type.caption,
  fontWeight:    weight.regular,
  letterSpacing: tracking.wide,
  color:         color.ghost,
}

/** Stat number — large display number */
export const statNumber = {
  fontFamily:    font.display,
  fontSize:      'clamp(1.75rem, 3vw, 2.5rem)',
  fontWeight:    weight.regular,
  lineHeight:    1,
  letterSpacing: tracking.snug,
}

/** Stat label — below stat number */
export const statLabel = {
  fontFamily:    font.sans,
  fontSize:      type.micro,
  fontWeight:    weight.semibold,
  letterSpacing: tracking.wider,
  textTransform: 'uppercase',
  color:         color.subtle,
}

// ─── GRADIENT TEXT HELPERS ────────────────────────────────────────────────────

/** Apply gold gradient to any text element */
export const goldTextStyle = {
  background:              'linear-gradient(135deg, #E8D5A3 0%, #C9A84C 45%, #8B6914 100%)',
  WebkitBackgroundClip:    'text',
  WebkitTextFillColor:     'transparent',
  backgroundClip:          'text',
}

/** Italic accent — used inside headlines */
export const italicAccent = {
  fontStyle:   'italic',
  fontWeight:  weight.light,
  color:       color.gold,
}
