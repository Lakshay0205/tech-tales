import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../components/Hero'
import OurProcess from '../components/OurProcess'
import CTABanner from '../components/CTABanner'

gsap.registerPlugin(ScrollTrigger)

/* ── Tokens ─────────────────────────────────────────────────── */
const H2 = {
  fontFamily: "'Fraunces', Georgia, serif",
  fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
  fontWeight: 400, lineHeight: 1.15,
  letterSpacing: '-0.03em', color: '#F5F3EF', margin: 0,
}
const BODY = {
  fontFamily: "'Geist', system-ui, sans-serif",
  fontSize: 'clamp(1rem, 1.3vw, 1.1875rem)',
  lineHeight: 1.78, color: '#6B7280', margin: 0, fontWeight: 300,
}

const strategyServices = ['Digital Marketing Strategy','SEO & Organic Growth','Paid Advertising','Analytics & Performance']
const creativeServices  = ['Social Media Marketing','Content Creation','Branding & Creative Design','Video & Motion']
const digitalServices   = ['Website Design & Development','E-commerce Solutions','Marketing Automation','AI & Chatbot Solutions']

const whyItems = [
  { n: '01', title: 'Strategy Before Spend', desc: 'We don’t chase trends or burn budgets. Every campaign starts with a clear strategy built around your business goals.', rot: '-4deg', icon: 'target' },
  { n: '02', title: 'Creative Meets Performance', desc: 'Great ideas mean more when they deliver results. We bring creativity and data together to build marketing that performs.', rot: '3deg', icon: 'lightbulb' },
  { n: '03', title: 'One Team. One Direction.', desc: 'Strategy, content, media, SEO and creative work together under one roof, keeping your brand consistent at every touchpoint.', rot: '-3deg', icon: 'users' },
  { n: '04', title: 'Clear, Honest & Accountable', desc: 'No confusing reports. No empty promises. Just clear communication, transparent insights and work you can measure.', rot: '4deg', icon: 'shield' },
  { n: '05', title: 'Built for Momentum', desc: 'Every decision creates useful progress now and a stronger foundation for what comes next.', rot: '-2deg', icon: 'spark' },
]

const projects = [
  { name: 'Terravik',   category: 'Tech Platform', result: '3× inquiry growth in 60 days', img: '/terravik.jpeg', url: 'https://terravik-1m5m.vercel.app/terravik/' },
  { name: 'Hawai Agro', category: 'E-commerce',    result: '40% organic traffic in 3 months', img: '/hawaiagro.jpeg', url: 'https://terravik-1m5m.vercel.app/hawai-agro' },
  { name: 'TAAR',       category: 'Branding',      result: '2× Instagram engagement rate', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80' },
]

/* ── Arrow link ─────────────────────────────────────────────── */
function ArrowLink({ to, children }) {
  return (
    <Link
      to={to}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        fontFamily: "'Geist', system-ui, sans-serif",
        fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.15em',
        textTransform: 'uppercase', color: '#D4AF37', textDecoration: 'none',
        transition: 'gap 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}
      onMouseEnter={e => { e.currentTarget.style.gap = '18px' }}
      onMouseLeave={e => { e.currentTarget.style.gap = '8px' }}
    >
      {children}
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <path d="M1 10L10 1M10 1H3.5M10 1V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>
  )
}

/* ── Service icon renderer ───────────────────────────────────── */
function ServiceIcon({ label }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.55,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true'
  }

  const iconMap = {
    'Digital Marketing Strategy': (
      <svg {...common}><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/><path d="M12 4l8 8M12 20l-8-8"/></svg>
    ),
    'SEO & Organic Growth': (
      <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/><path d="M11 7v8M8 11h6"/></svg>
    ),
    'Paid Advertising': (
      <svg {...common}><path d="M4 12h8"/><path d="M4 8h11"/><path d="M4 16h7"/><path d="M17 3l3 6 3-6"/><path d="M17 21l3-6 3 6"/></svg>
    ),
    'Analytics & Performance': (
      <svg {...common}><path d="M4 19h16"/><path d="M5 15V9"/><path d="M10 15V5"/><path d="M15 15v-4"/></svg>
    ),
    'Social Media Marketing': (
      <svg {...common}><circle cx="6" cy="12" r="3"/><circle cx="18" cy="9" r="3"/><circle cx="18" cy="16" r="3"/><path d="M8.5 10.7l7-2.2M8.7 13.1l7 2.1"/></svg>
    ),
    'Content Creation': (
      <svg {...common}><path d="M4 20h12"/><path d="M5 4h14v12H5z"/><path d="M8 14l3-3 2 2 4-5"/></svg>
    ),
    'Branding & Creative Design': (
      <svg {...common}><path d="M12 3l9 9-9 9-9-9 9-9Z"/><path d="M12 6.5l5.5 5.5-5.5 5.5-5.5-5.5 5.5-5.5Z"/></svg>
    ),
    'Video & Motion': (
      <svg {...common}><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 9 5-3v13l-5-3"/></svg>
    ),
    'Website Design & Development': (
      <svg {...common}><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M3 10h18"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
    ),
    'E-commerce Solutions': (
      <svg {...common}><circle cx="6" cy="19" r="1"/><circle cx="17" cy="19" r="1"/><path d="M3 5h2l2 11h11l3-7H7"/></svg>
    ),
    'Marketing Automation': (
      <svg {...common}><path d="M3 12h6l3-7 3 14 3-7h6"/><path d="M4 21h16"/></svg>
    ),
    'AI & Chatbot Solutions': (
      <svg {...common}><path d="M6 13h4l3-5 3 10 2-5h2"/><path d="M4 21h16"/><path d="M7 4h10"/><path d="M10 4v2"/><path d="M14 4v2"/></svg>
    ),
  }

  const icon = iconMap[label] || (
    <svg {...common}><path d="M4 13h16"/><path d="M6 7h12"/><path d="M8 19h8"/></svg>
  )

  return (
    <span className="svc-icon" aria-hidden="true" style={{
      width: '26px', height: '26px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      color: '#BDB7AA', flexShrink: 0, transition: 'color 0.2s ease, transform 0.2s ease, opacity 0.2s ease'
    }}>
      {icon}
    </span>
  )
}

/* ── Service item ───────────────────────────────────────────── */
function ServiceItem({ label, index }) {
  const ref = useRef(null)
  return (
    <div
      ref={ref}
      style={{
        display: 'flex', alignItems: 'center', gap: '14px',
        padding: '18px 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        transition: 'padding-left 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s ease, background-color 0.35s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.paddingLeft = '14px'
        e.currentTarget.style.borderBottomColor = 'rgba(212,175,55,0.24)'
        e.currentTarget.querySelector('.svc-label').style.color = '#F5F3EF'
        e.currentTarget.querySelector('.svc-icon').style.color = '#D4AF37'
        e.currentTarget.querySelector('.svc-icon').style.transform = 'scale(1.08)'
        e.currentTarget.querySelector('.svc-arrow').style.opacity = '0.9'
        e.currentTarget.querySelector('.svc-arrow').style.transform = 'translateX(3px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.paddingLeft = '0'
        e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.06)'
        e.currentTarget.querySelector('.svc-label').style.color = '#F0EDE6'
        e.currentTarget.querySelector('.svc-icon').style.color = '#BDB7AA'
        e.currentTarget.querySelector('.svc-icon').style.transform = 'scale(1)'
        e.currentTarget.querySelector('.svc-arrow').style.opacity = '0.4'
        e.currentTarget.querySelector('.svc-arrow').style.transform = 'translateX(0)'
      }}
    >
      <span style={{
        fontFamily: "'Geist', system-ui, sans-serif",
        fontSize: '0.5625rem', fontWeight: 600, letterSpacing: '0.22em',
        color: 'rgba(212,175,55,0.32)', width: '24px', flexShrink: 0,
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <ServiceIcon label={label} />
      <span className="svc-label" style={{
        fontFamily: "'Geist', system-ui, sans-serif",
        fontSize: 'clamp(1rem, 1.3vw, 1.1875rem)',
        color: '#F0EDE6', fontWeight: 500, flex: 1, lineHeight: 1.75,
        transition: 'color 0.2s ease', letterSpacing: '-0.01em'
      }}>
        {label}
      </span>
      <svg className="svc-arrow" width="10" height="10" viewBox="0 0 10 10" fill="none"
        style={{ opacity: 0.4, flexShrink: 0, transition: 'opacity 0.2s ease, transform 0.2s ease' }} aria-hidden="true">
        <path d="M1 9L9 1M9 1H3M9 1V7" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

/* ── Why card — 3D tilt ─────────────────────────────────────── */
function WhyCard({ item, index, allRefs, itemsRef }) {
  const cardRef = useRef(null)
  const frameRef = useRef(null)
  const motionRef = useRef({ x: 0, y: 0 })

  const applyTilt = (x, y) => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px) scale(1.02)`
    el.style.boxShadow = `
      ${x * -12}px ${y * -12}px 40px rgba(0,0,0,0.4),
      0 0 0 1px rgba(212,175,55,0.2),
      0 0 60px rgba(212,175,55,0.08)
    `
  }

  const handleMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    motionRef.current = {
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    }

    if (frameRef.current !== null) return
    frameRef.current = requestAnimationFrame(() => {
      const { x, y } = motionRef.current
      applyTilt(x, y)
      frameRef.current = null
    })
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
    el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px) scale(1)'
    el.style.boxShadow = 'none'
    allRefs.current.forEach(r => { if (r) gsap.to(r, { opacity: 1, duration: 0.4, ease: 'power2.out' }) })
  }

  const handleMouseEnter = () => {
    allRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.to(el, i !== index
        ? { opacity: 0.35, duration: 0.3, ease: 'power2.out' }
        : { opacity: 1, duration: 0.1 }
      )
    })
  }

  const iconMap = {
    target: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2.5 21 12 12 21 3 12Z" />
      </svg>
    ),
    lightbulb: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M9 14c-2.8-1.3-3.7-4.7-1.9-7.2C8.2 5 10 4 12 4s3.8 1 4.9 2.8C18.8 9.3 17.8 12.7 15 14" />
      </svg>
    ),
    users: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    shield: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3 4 6v7c0 6 4 9 8 10 4-1 8-4 8-10V6Z" />
        <path d="m9.5 12 2 2 4.5-5" />
      </svg>
    ),
    spark: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
        <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
      </svg>
    )
  }

  return (
    <div
      ref={el => { cardRef.current = el; allRefs.current[index] = el; itemsRef.current[index] = el }}
      className={`why-card-shell why-card-shell--${index + 1}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        padding: '44px 40px',
        background: [
          'radial-gradient(circle at 100% 0%, rgba(212,175,55,0.24), transparent 44%), linear-gradient(135deg, rgba(212,175,55,0.10), transparent 46%), linear-gradient(150deg, rgba(28,38,54,0.98), rgba(9,14,23,1))',
          'radial-gradient(circle at 100% 0%, rgba(230,60,109,0.28), transparent 44%), linear-gradient(135deg, rgba(230,60,109,0.12), transparent 46%), linear-gradient(150deg, rgba(48,27,47,0.98), rgba(12,14,24,1))',
          'radial-gradient(circle at 100% 0%, rgba(78,205,196,0.27), transparent 44%), linear-gradient(135deg, rgba(78,205,196,0.11), transparent 46%), linear-gradient(150deg, rgba(18,48,55,0.98), rgba(8,16,24,1))',
          'radial-gradient(circle at 100% 0%, rgba(167,139,250,0.27), transparent 44%), linear-gradient(135deg, rgba(167,139,250,0.11), transparent 46%), linear-gradient(150deg, rgba(42,32,68,0.98), rgba(12,13,25,1))',
          'radial-gradient(circle at 100% 0%, rgba(244,180,0,0.28), transparent 44%), linear-gradient(135deg, rgba(244,180,0,0.11), transparent 46%), linear-gradient(150deg, rgba(52,43,22,0.98), rgba(15,14,21,1))',
        ][index],
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.08)',
        position: 'relative', overflow: 'hidden',
        cursor: 'default',
        transition: 'transform 0.55s cubic-bezier(.22,1,.36,1), box-shadow 0.55s cubic-bezier(.22,1,.36,1), border-color 0.55s ease, background 0.55s ease',
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="why-card-radial" style={{ position: 'absolute', inset: '-25%', opacity: 0, pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 48%)' }} />
      <span style={{
        position: 'absolute', top: '-24px', right: '12px',
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: 'clamp(5.5rem, 9vw, 8rem)', fontWeight: 700, lineHeight: 1,
        background: 'linear-gradient(135deg, rgba(212,175,55,0.18), rgba(212,175,55,0.03))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        pointerEvents: 'none', userSelect: 'none', zIndex: 0,
        transform: `rotate(${item.rot})`,
        display: 'inline-block',
      }}>
        {item.n}
      </span>

      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)',
      }} />
      <div style={{ width: '28px', height: '2px', marginBottom: '32px', background: 'linear-gradient(90deg, #D4AF37, transparent)', borderRadius: '1px' }} />
      <div style={{ width: '100%', height: '1px', marginBottom: '22px', background: 'linear-gradient(90deg, #E63C6D, transparent)', opacity: 0.9 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <span style={{ width: '46px', height: '46px', borderRadius: '50%', border: '1px solid rgba(212,175,55,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212,175,55,0.06)', color: '#D4AF37' }}>
            {iconMap[item.icon]}
          </span>
        </div>
        <h3 style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: '1.3rem', fontWeight: 500, color: '#F5F3EF',
          margin: '0 0 14px 0', lineHeight: 1.3, letterSpacing: '-0.015em',
        }}>
          {item.title}
        </h3>
        <p style={{ ...BODY, fontSize: '0.9375rem', lineHeight: 1.75 }}>{item.desc}</p>
      </div>
    </div>
  )
}

/* ── Project card — clip-path wipe + glass info panel ──────── */
function ProjectCard({ p, cardRef, large = false }) {
  const imgRef     = useRef(null)
  const panelRef   = useRef(null)
  const tagRef     = useRef(null)

  return (
    <a href={p.url || '#'} target={p.url ? '_blank' : undefined} rel={p.url ? 'noopener noreferrer' : undefined} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div
        ref={cardRef}
        style={{
          height: '400px',
          borderRadius: '20px', overflow: 'hidden',
          position: 'relative',
          clipPath: 'inset(0 100% 0 0)',
          border: '1px solid rgba(255,255,255,0.07)',
          flexShrink: 0,
          cursor: p.url ? 'pointer' : 'default',
        }}
        onMouseEnter={() => {
          gsap.to(imgRef.current,   { scale: 1.08, filter: 'saturate(1.2) brightness(1.06)', duration: 0.7, ease: 'power2.out' })
          gsap.to(panelRef.current, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' })
          gsap.to(tagRef.current,   { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' })
        }}
        onMouseLeave={() => {
          gsap.to(imgRef.current,   { scale: 1.0, filter: 'saturate(1.08) brightness(0.95)', duration: 0.7, ease: 'power2.out' })
          gsap.to(panelRef.current, { y: 20, opacity: 0, duration: 0.35 })
          gsap.to(tagRef.current,   { opacity: 0, y: 10, duration: 0.25 })
        }}
      >
        <img ref={imgRef} src={p.img} alt={p.name} loading="eager" decoding="async" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: p.name === 'Terravik' ? 'center 35%' : 'center center',
          transformOrigin: 'center',
          filter: 'saturate(1.08) brightness(0.95)',
          transition: 'filter 0.5s ease, transform 0.5s ease',
          boxShadow: `0 20px 60px -10px ${p.name === 'Terravik' ? 'rgba(78,205,196,0.35)' : p.name === 'Hawai Agro' ? 'rgba(74,222,128,0.34)' : 'rgba(230,60,109,0.28)'}`,
          borderRadius: '24px 24px 24px 4px',
        }} />

        {/* Permanent gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,14,20,0.95) 0%, rgba(10,14,20,0.2) 50%, transparent 100%)',
        }} />

        {/* Tag — fades in on hover */}
        <div ref={tagRef} style={{ position: 'absolute', top: '24px', left: '24px', opacity: 0, transform: 'translateY(10px)' }}>
          <span className="tag">{p.category}</span>
        </div>

        {/* Glass info panel — slides up on hover */}
        <div
          ref={panelRef}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '28px 32px',
            background: 'rgba(18,22,31,0.75)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            opacity: 0, transform: 'translateY(20px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
            <div>
              <span style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: large ? '1.875rem' : '1.375rem',
                fontWeight: 500, color: '#F5F3EF', display: 'block',
                letterSpacing: '-0.02em', marginBottom: '6px',
              }}>
                {p.name}
              </span>
              <span style={{
                fontFamily: "'Geist', system-ui, sans-serif",
                fontSize: '0.8125rem', color: '#D4AF37', fontWeight: 400,
              }}>
                {p.result}
              </span>
            </div>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
              background: 'rgba(212,175,55,0.12)',
              border: '1px solid rgba(212,175,55,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="12" height="12" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path d="M1 10L10 1M10 1H3.5M10 1V7.5" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

/* ── Home ───────────────────────────────────────────────────── */
export default function Home() {
  const techColRef     = useRef(null)
  const creativeColRef = useRef(null)
  const digitalColRef  = useRef(null)
  const whyItemsRef    = useRef([])
  const whyCardRefs    = useRef([])
  const cardRefs       = useRef([])
  const whatHeadRef    = useRef(null)
  const whyHeadRef     = useRef(null)
  const workHeadRef    = useRef(null)

  useEffect(() => {
    const triggers = []

    const reveal = (el, delay = 0) => {
      if (!el) return
      gsap.set(el, { opacity: 0, y: 40 })
      triggers.push(ScrollTrigger.create({
        trigger: el, start: 'top 82%', once: true,
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay, clearProps: 'transform' }),
      }))
    }

    reveal(whatHeadRef.current)
    reveal(whyHeadRef.current)
    reveal(workHeadRef.current)

    gsap.set([techColRef.current, creativeColRef.current, digitalColRef.current], { opacity: 0, y: 48 })
    triggers.push(ScrollTrigger.create({
      trigger: techColRef.current, start: 'top 80%', once: true,
      onEnter: () => gsap.to([techColRef.current, creativeColRef.current, digitalColRef.current], {
        opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', stagger: 0.16, clearProps: 'transform',
      }),
    }))

    const whyEls = whyItemsRef.current.filter(Boolean)
    if (whyEls.length) {
      gsap.set(whyEls, { opacity: 0, y: 44, scale: 0.97 })
      triggers.push(ScrollTrigger.create({
        trigger: whyEls[0], start: 'top 82%', once: true,
        onEnter: () => gsap.to(whyEls, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.9, ease: 'back.out(1.2)', stagger: 0.1, clearProps: 'transform',
        }),
      }))
    }

    cardRefs.current.forEach((card, i) => {
      if (!card) return
      triggers.push(ScrollTrigger.create({
        trigger: card, start: 'top 80%', once: true,
        onEnter: () => gsap.to(card, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.inOut', delay: i * 0.15 }),
      }))
    })

    return () => triggers.forEach(t => t.kill())
  }, [])

  return (
    <main>
      <Hero />

      {/* ── WHAT WE DO ── */}
      <section className="section-wrap" style={{ backgroundColor: '#0D1219', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
        <div className="page-ambient-orb page-ambient-orb--cyan" style={{ left: '-8%', top: '10%', width: '280px', height: '280px', opacity: 0.34 }} />
        <div className="page-ambient-orb page-ambient-orb--coral" style={{ right: '6%', bottom: '8%', width: '260px', height: '260px', opacity: 0.24 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          <div ref={whatHeadRef} style={{ marginBottom: '78px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#D4AF37', display: 'inline-flex', boxShadow: '0 0 10px rgba(212,175,55,0.9)' }} />
              <span className="eyebrow" style={{ display: 'inline-flex', fontSize: '0.61rem', color: '#D4AF37' }}>OUR EXPERTISE</span>
            </div>
            <div style={{ maxWidth: '900px', display: 'grid', gridTemplateColumns: 'minmax(420px, 1fr)', alignItems: 'end', gap: '24px' }}>
              <h2 style={{ ...H2, fontSize: 'clamp(2.6rem, 5vw, 4rem)', lineHeight: 1.08, maxWidth: '740px', fontWeight: 300, letterSpacing: '-0.032em' }}>
                Everything your brand needs to <em className="supporting-word">grow.</em>
              </h2>
              <p style={{ ...BODY, maxWidth: '620px', fontSize: 'clamp(1rem, 1.18vw, 1.12rem)', lineHeight: 1.72, fontWeight: 300, color: '#B6B1A8' }}>
                Strategy, creativity, technology and content working together to make your brand more visible, more trusted, and easier to choose.
              </p>
            </div>
          </div>

          <div className="home-expertise-grid" style={{ display: 'grid', gap: '52px', marginBottom: '54px' }}>
            {/* Strategy & Growth column */}
            <div ref={techColRef}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px',
                paddingBottom: '18px', borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}>
                <span style={{ width: '36px', height: '36px', borderRadius: '999px', border: '1px solid rgba(212,175,55,0.34)', color: '#D4AF37', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212,175,55,0.06)', boxShadow: 'inset 0 0 12px rgba(212,175,55,0.12), 0 0 12px rgba(212,175,55,0.10)', animation: 'pulse-glow 2.6s ease-in-out infinite' }}>
                  <ServiceIcon label="Digital Marketing Strategy" />
                </span>
                <span className="home-service-heading home-service-heading--growth" style={{ fontFamily: "'Geist', system-ui, sans-serif", fontSize: 'clamp(0.68rem, 1.1vw, 0.78rem)', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>01 — STRATEGY & GROWTH</span>
              </div>
              <div style={{ padding: '28px 28px 24px', borderRadius: '20px', background: 'linear-gradient(145deg, rgba(17,21,32,0.94) 0%, rgba(11,15,26,0.98) 100%)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 0 40px rgba(212,175,55,0.08), inset 0 1px 0 rgba(255,255,255,0.04)', transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease' }}>
                {strategyServices.map((s, i) => <ServiceItem key={s} label={s} index={i} />)}
              </div>
            </div>

            {/* Creative & Content column */}
            <div ref={creativeColRef}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px',
                paddingBottom: '18px', borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}>
                <span style={{ width: '36px', height: '36px', borderRadius: '999px', border: '1px solid rgba(230,60,109,0.34)', color: '#E63C6D', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(230,60,109,0.06)', boxShadow: 'inset 0 0 12px rgba(230,60,109,0.12), 0 0 12px rgba(230,60,109,0.10)', animation: 'pulse-glow 2.6s ease-in-out infinite' }}>
                  <ServiceIcon label="Social Media Marketing" />
                </span>
                <span className="home-service-heading home-service-heading--creative" style={{ fontFamily: "'Geist', system-ui, sans-serif", fontSize: 'clamp(0.68rem, 1.1vw, 0.78rem)', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>02 — CREATIVE & CONTENT</span>
              </div>
              <div style={{ padding: '28px 28px 24px', borderRadius: '20px', background: 'linear-gradient(145deg, rgba(17,21,32,0.94) 0%, rgba(11,15,26,0.98) 100%)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 0 40px rgba(230,60,109,0.08), inset 0 1px 0 rgba(255,255,255,0.04)', transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease' }}>
                {creativeServices.map((s, i) => <ServiceItem key={s} label={s} index={i} />)}
              </div>
            </div>
          </div>

          {/* Digital & Technology strip */}
          <div ref={digitalColRef} style={{
            marginBottom: '50px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <span style={{ width: '36px', height: '36px', borderRadius: '999px', border: '1px solid rgba(78,205,196,0.34)', color: '#4ECDC4', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(78,205,196,0.06)', boxShadow: 'inset 0 0 12px rgba(78,205,196,0.12), 0 0 12px rgba(78,205,196,0.10)', animation: 'pulse-glow 2.6s ease-in-out infinite' }}>
                <ServiceIcon label="Website Design & Development" />
              </span>
              <span className="home-service-heading home-service-heading--digital eyebrow" style={{ display: 'inline-flex', fontSize: 'clamp(0.68rem, 1.1vw, 0.78rem)', fontWeight: 700, letterSpacing: '0.22em' }}>03 — DIGITAL & TECHNOLOGY</span>
            </div>
            <div style={{ padding: '28px 28px 24px', borderRadius: '20px', background: 'linear-gradient(145deg, rgba(17,21,32,0.94) 0%, rgba(11,15,26,0.98) 100%)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 0 40px rgba(78,205,196,0.08), inset 0 1px 0 rgba(255,255,255,0.04)', transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease' }}>
              <div className="home-digital-strip" style={{ display: 'grid', gap: '0' }}>
                {digitalServices.map((label, i) => (
                  <ServiceItem key={label} label={label} index={i} />
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <ArrowLink to="/services">EXPLORE OUR SERVICES</ArrowLink>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section-wrap" style={{ backgroundColor: '#080B12', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
        <div className="page-ambient-orb page-ambient-orb--gold" style={{ right: '-3%', top: '-5%', width: '260px', height: '260px', opacity: 0.34 }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', inset: '-12%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.09)' }} />
          <div style={{ position: 'absolute', inset: '-20%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={whyHeadRef} style={{ marginBottom: '80px' }}>
            <span className="eyebrow" style={{ display: 'inline-flex', fontSize: '0.68rem', color: '#C9A84C', letterSpacing: '0.20em' }}>WHY CHOOSE US</span>
            <h2 style={{ ...H2, marginTop: '28px', fontSize: 'clamp(2.7rem, 5vw, 4rem)', lineHeight: 1.12 }}>
              One partner.<br />
              <em className="supporting-word">Everything</em> aligned.
            </h2>
            <p style={{ ...BODY, maxWidth: '700px', marginTop: '30px', fontSize: 'clamp(1rem, 1.4vw, 1.08rem)', lineHeight: 1.78, color: '#B8B3AA' }}>
              We bring strategy, creativity and technology together<br />
              to drive meaningful growth for your brand.
            </p>
          </div>

          <div className="home-why-grid" style={{ display: 'grid', gap: '16px' }}>
            {whyItems.map((item, i) => (
              <WhyCard key={item.n} item={item} index={i} allRefs={whyCardRefs} itemsRef={whyItemsRef} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED WORK ── */}
      <section className="section-wrap" style={{ backgroundColor: '#0D1219', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
        {/* Watermark */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 'clamp(8rem, 22vw, 20rem)', fontWeight: 700,
          color: 'rgba(212,175,55,0.025)', whiteSpace: 'nowrap',
          pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.05em', zIndex: 0,
        }}>
          WORK
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={workHeadRef} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '32px', marginBottom: '72px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span className="eyebrow" style={{ display: 'inline-flex' }}>Featured Work</span>
              <h2 style={{ ...H2, marginTop: '28px', marginBottom: '0' }}>Work that moved the <span className="supporting-word">needle</span>.</h2>
              <p style={{ ...BODY, maxWidth: '340px', marginTop: '18px', marginLeft: 'auto', fontSize: 'clamp(1rem, 1.2vw, 1.08rem)', lineHeight: 1.78, fontWeight: 300, textAlign: 'right' }}>
                Real brands. Real work. Real results.
              </p>
            </div>
          </div>

          {/* Asymmetric grid: 1 large left + 2 smaller right */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', alignItems: 'start' }}>
            <ProjectCard p={projects[0]} cardRef={el => { cardRefs.current[0] = el }} />
            <ProjectCard p={projects[1]} cardRef={el => { cardRefs.current[1] = el }} />
            <ProjectCard p={projects[2]} cardRef={el => { cardRefs.current[2] = el }} />
          </div>

          <div style={{ marginTop: '64px' }}>
            <ArrowLink to="/portfolio">View All Work</ArrowLink>
          </div>
        </div>
      </section>

      <OurProcess />
      <CTABanner />
    </main>
  )
}
