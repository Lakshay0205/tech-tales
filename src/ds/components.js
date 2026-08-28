/**
 * Tech&Tales Design System — Primitive Components
 *
 * Rules:
 * - Every component is a thin wrapper. No business logic.
 * - All visual decisions live here, not in page files.
 * - Props control variants, not inline overrides.
 */

import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { color, radius, space, shadow, gradient, ease, duration } from './tokens'
import { btnLabel, eyebrow as eyebrowStyle, body, bodySmall, caption } from './typography'

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────

/**
 * SectionWrap — consistent vertical rhythm for every section.
 * @param {string} size - 'lg' | 'md' | 'sm'
 * @param {boolean} border - top border divider
 */
export function SectionWrap({ children, size = 'lg', border = false, className = '', style = {} }) {
  const padding = {
    lg: `${space.section} ${space[10]}`,
    md: `${space.sectionMd} ${space[10]}`,
    sm: `${space.sectionSm} ${space[10]}`,
  }[size]

  return (
    <section
      className={className}
      style={{
        padding,
        position: 'relative',
        borderTop: border ? `1px solid ${color.border}` : undefined,
        ...style,
      }}
    >
      {children}
    </section>
  )
}

/**
 * Container — max-width centering.
 * @param {string} size - 'wide' | 'normal' | 'narrow' | 'tight'
 */
export function Container({ children, size = 'normal', style = {} }) {
  const maxWidth = {
    wide:   '1440px',
    normal: '1280px',
    narrow: '960px',
    tight:  '720px',
  }[size]

  return (
    <div style={{ maxWidth, margin: '0 auto', width: '100%', ...style }}>
      {children}
    </div>
  )
}

// ─── TYPOGRAPHY PRIMITIVES ────────────────────────────────────────────────────

/**
 * Eyebrow — small uppercase label above section titles.
 * Renders with the gold line prefix automatically.
 */
export function Eyebrow({ children, style = {} }) {
  return (
    <span className="eyebrow" style={{ ...eyebrowStyle, ...style }}>
      {children}
    </span>
  )
}

/**
 * GoldText — wraps text in the gold gradient.
 */
export function GoldText({ children, as: Tag = 'span' }) {
  return (
    <Tag style={{
      background:           gradient.goldText,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor:  'transparent',
      backgroundClip:       'text',
    }}>
      {children}
    </Tag>
  )
}

/**
 * ItalicAccent — italic light weight, gold color. Used inside headlines.
 */
export function ItalicAccent({ children }) {
  return (
    <em style={{ fontStyle: 'italic', fontWeight: 300, color: color.gold }}>
      {children}
    </em>
  )
}

// ─── BUTTON SYSTEM ────────────────────────────────────────────────────────────

const arrowIcon = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
    <path d="M1 10L10 1M10 1H3.5M10 1V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/**
 * Btn — the single button primitive.
 * @param {string} variant - 'primary' | 'ghost' | 'text'
 * @param {string} to - React Router link
 * @param {string} href - external link
 * @param {boolean} arrow - show arrow icon
 * @param {string} size - 'sm' | 'md' | 'lg'
 */
export const Btn = forwardRef(function Btn(
  { children, variant = 'primary', to, href, arrow = false, size = 'md', style = {}, onClick, ...rest },
  ref
) {
  const padding = { sm: '10px 22px', md: '16px 36px', lg: '20px 48px' }[size]
  const fontSize = { sm: '0.5625rem', md: '0.625rem', lg: '0.6875rem' }[size]

  const base = {
    ...btnLabel,
    fontSize,
    position:       'relative',
    display:        'inline-flex',
    alignItems:     'center',
    gap:            '10px',
    padding,
    borderRadius:   radius.pill,
    textDecoration: 'none',
    cursor:         'pointer',
    border:         'none',
    overflow:       'hidden',
    transition:     `box-shadow ${duration.slow}s cubic-bezier(${ease.out}), transform ${duration.slow}s cubic-bezier(${ease.out})`,
  }

  const variants = {
    primary: {
      color:      color.bg,
      background: gradient.gold,
      boxShadow:  shadow.btnPrimary,
    },
    ghost: {
      color:           color.text2,
      background:      'rgba(255,255,255,0.025)',
      border:          `1px solid ${color.border2}`,
      backdropFilter:  'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    },
    text: {
      color:      color.gold,
      background: 'transparent',
      padding:    '0',
    },
  }

  const hoverVariants = {
    primary: { boxShadow: shadow.btnPrimaryHover, y: -3, scale: 1.01 },
    ghost:   { borderColor: color.borderGold, background: color.goldGlow, color: color.text, boxShadow: shadow.glow, y: -3 },
    text:    { x: 4 },
  }

  const combinedStyle = { ...base, ...variants[variant], ...style }

  const content = (
    <>
      {children}
      {arrow && arrowIcon}
    </>
  )

  const motionProps = {
    whileHover: hoverVariants[variant],
    whileTap:   { scale: 0.97 },
    transition: { duration: duration.slow, ease: ease.out },
    style:      combinedStyle,
    ref,
    onClick,
    ...rest,
  }

  if (to)   return <motion.div {...motionProps}><Link to={to} style={{ all: 'unset', display: 'contents' }}>{content}</Link></motion.div>
  if (href) return <motion.a href={href} {...motionProps}>{content}</motion.a>
  return <motion.button type="button" {...motionProps}>{content}</motion.button>
})

// ─── CARD SYSTEM ──────────────────────────────────────────────────────────────

/**
 * Card — premium interactive surface.
 * @param {string} variant - 'default' | 'glass' | 'dark'
 * @param {boolean} hover - enable hover lift
 */
export function Card({ children, variant = 'default', hover = true, style = {}, className = '' }) {
  const variants = {
    default: {
      background:  gradient.surface,
      border:      `1px solid ${color.border}`,
      borderRadius: radius.xl,
      boxShadow:   shadow.card,
    },
    glass: {
      background:  'rgba(17,21,32,0.85)',
      border:      `1px solid ${color.border2}`,
      borderRadius: radius.xl,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    },
    dark: {
      background:  gradient.surfaceDark,
      border:      `1px solid rgba(255,255,255,0.04)`,
      borderRadius: radius.lg,
      boxShadow:   '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,0,0.4)',
    },
  }

  return (
    <motion.div
      className={className}
      style={{ ...variants[variant], ...style }}
      whileHover={hover ? {
        y: -8,
        boxShadow: shadow.cardHover,
        borderColor: color.borderGold,
      } : undefined}
      transition={{ duration: duration.slow, ease: ease.out }}
    >
      {children}
    </motion.div>
  )
}

// ─── TAG / BADGE ──────────────────────────────────────────────────────────────

/**
 * Tag — small label pill.
 * @param {string} variant - 'gold' | 'success' | 'warning' | 'error' | 'neutral'
 */
export function Tag({ children, variant = 'gold', dot = false }) {
  const variants = {
    gold:    { color: color.gold,    bg: 'rgba(201,168,76,0.07)',  border: 'rgba(201,168,76,0.22)' },
    success: { color: color.success, bg: color.successBg,          border: color.successBd },
    warning: { color: color.warning, bg: color.warningBg,          border: 'rgba(251,191,36,0.2)' },
    error:   { color: color.error,   bg: color.errorBg,            border: 'rgba(248,113,113,0.2)' },
    neutral: { color: color.text2,   bg: 'rgba(255,255,255,0.04)', border: color.border },
  }
  const v = variants[variant]

  return (
    <span style={{
      display:       'inline-flex',
      alignItems:    'center',
      gap:           '6px',
      padding:       '5px 14px',
      fontFamily:    "'Geist', system-ui, sans-serif",
      fontSize:      '0.5625rem',
      fontWeight:    700,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color:         v.color,
      background:    v.bg,
      border:        `1px solid ${v.border}`,
      borderRadius:  radius.pill,
      boxShadow:     'inset 0 1px 0 rgba(255,255,255,0.06)',
    }}>
      {dot && <span style={{
        width: '5px', height: '5px', borderRadius: '50%',
        background: v.color, flexShrink: 0,
        boxShadow: `0 0 6px ${v.color}`,
        animation: 'pulse-glow 2s ease-in-out infinite',
      }} />}
      {children}
    </span>
  )
}

// ─── DIVIDERS ─────────────────────────────────────────────────────────────────

/** Gold gradient divider with center glow */
export function Divider({ style = {} }) {
  return <div className="divider-gold" style={style} />
}

/** Subtle section border */
export function SectionBorder({ style = {} }) {
  return (
    <div style={{
      height: '1px',
      background: `linear-gradient(90deg, transparent, ${color.border} 20%, ${color.border} 80%, transparent)`,
      ...style,
    }} />
  )
}

// ─── STAT BLOCK ───────────────────────────────────────────────────────────────

/** Single stat — number + label */
export function Stat({ value, label }) {
  return (
    <div>
      <div style={{
        fontFamily:    "'Fraunces', Georgia, serif",
        fontSize:      'clamp(1.75rem, 3vw, 2.5rem)',
        fontWeight:    400,
        lineHeight:    1,
        letterSpacing: '-0.03em',
        background:    gradient.goldSubtle,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor:  'transparent',
        backgroundClip: 'text',
        marginBottom:  '8px',
      }}>
        {value}
      </div>
      <div style={{
        fontFamily:    "'Geist', system-ui, sans-serif",
        fontSize:      '0.5625rem',
        fontWeight:    600,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color:         color.subtle,
      }}>
        {label}
      </div>
    </div>
  )
}

// ─── AVAILABILITY DOT ─────────────────────────────────────────────────────────

/** Pulsing green availability indicator */
export function LiveDot({ label = 'Available for projects' }) {
  return (
    <div style={{
      display:     'inline-flex',
      alignItems:  'center',
      gap:         '8px',
      padding:     '8px 14px',
      background:  color.successBg,
      border:      `1px solid ${color.successBd}`,
      borderRadius: radius.pill,
    }}>
      <span className="dot-live" />
      <span style={{
        fontFamily:    "'Geist', system-ui, sans-serif",
        fontSize:      '0.625rem',
        fontWeight:    600,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color:         'rgba(74,222,128,0.8)',
      }}>
        {label}
      </span>
    </div>
  )
}

// ─── GRADIENT BORDER WRAPPER ──────────────────────────────────────────────────

/** Wraps children with a subtle gradient border */
export function GradientBorder({ children, style = {} }) {
  return (
    <div className="gradient-border" style={{ borderRadius: radius.xl, ...style }}>
      {children}
    </div>
  )
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────

/**
 * SectionHeader — eyebrow + headline + optional body.
 * Standardizes the top of every section.
 */
export function SectionHeader({ eyebrow: eyebrowText, headline, body: bodyText, align = 'left', maxWidth = '560px', style = {} }) {
  const textAlign = align === 'center' ? 'center' : 'left'
  const margin    = align === 'center' ? '0 auto' : undefined

  return (
    <div style={{ textAlign, maxWidth, margin, ...style }}>
      {eyebrowText && (
        <div style={{ marginBottom: space[4] }}>
          <Eyebrow>{eyebrowText}</Eyebrow>
        </div>
      )}
      <h2 style={{
        fontFamily:    "'Fraunces', Georgia, serif",
        fontSize:      'clamp(2rem, 4vw, 3.5rem)',
        fontWeight:    300,
        lineHeight:    1.1,
        letterSpacing: '-0.025em',
        color:         color.text,
        margin:        0,
      }}>
        {headline}
      </h2>
      {bodyText && (
        <p style={{
          ...body,
          marginTop:  space[5],
          marginBottom: 0,
        }}>
          {bodyText}
        </p>
      )}
    </div>
  )
}
