import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TICKER_ITEMS = [
  'Website Development', 'SEO', 'E-commerce', 'Meta Ads', 'Branding',
  'Automation', 'Chatbots', 'Social Media', 'Analytics', 'Video Editing',
  'Website Development', 'SEO', 'E-commerce', 'Meta Ads', 'Branding',
  'Automation', 'Chatbots', 'Social Media', 'Analytics', 'Video Editing',
]

export default function CTABanner() {
  const glowRef = useRef(null)
  const headRef = useRef(null)
  const subRef  = useRef(null)
  const btnRef  = useRef(null)
  const track1  = useRef(null)
  const track2  = useRef(null)
  const xTo     = useRef(null)
  const yTo     = useRef(null)

  useEffect(() => {
    // Breathing glow — opacity only, compositor-only
    const glowTween = gsap.to(glowRef.current, {
      opacity: 0.65, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1,
    })

    // Entrance
    gsap.set([headRef.current, subRef.current, btnRef.current], { opacity: 0, y: 28 })
    gsap.to([headRef.current, subRef.current, btnRef.current], {
      opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: headRef.current, start: 'top 80%', once: true },
    })

    // Marquee — RAF-based, gated by IntersectionObserver
    const speed = 36
    let rafId = null
    let paused = false
    let pos1 = 0
    let pos2 = 0
    let lastTime = 0
    const TARGET_FPS = 30
    const FRAME_MS = 1000 / TARGET_FPS
    const t1 = track1.current
    const t2 = track2.current
    if (!t1 || !t2) return

    const w = t1.scrollWidth
    pos2 = -w

    const tick = (time) => {
      if (time - lastTime < FRAME_MS) {
        rafId = requestAnimationFrame(tick)
        return
      }
      lastTime = time

      if (!paused) {
        pos1 -= speed / 30
        pos2 -= speed / 30
        if (pos1 <= -w) pos1 = 0
        if (pos2 <= -w) pos2 = 0
        t1.style.transform = `translateX(${pos1}px)`
        t2.style.transform = `translateX(${pos2}px)`
      }
      rafId = requestAnimationFrame(tick)
    }

    const section = t1.closest('section') || t1
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { if (!rafId) rafId = requestAnimationFrame(tick) }
      else { if (rafId) { cancelAnimationFrame(rafId); rafId = null } }
    }, { threshold: 0 })
    observer.observe(section)

    const container = t1.parentElement
    const pause  = () => { paused = true }
    const resume = () => { paused = false }
    container.addEventListener('mouseenter', pause,  { passive: true })
    container.addEventListener('mouseleave', resume, { passive: true })

    // Magnetic CTA
    const btn = btnRef.current?.querySelector('a')
    let btnMoveHandler, btnLeaveHandler
    if (btn) {
      xTo.current = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' })
      yTo.current = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' })
      btnMoveHandler = (e) => {
        const rect = btn.getBoundingClientRect()
        const dx = e.clientX - (rect.left + rect.width  / 2)
        const dy = e.clientY - (rect.top  + rect.height / 2)
        if (Math.hypot(dx, dy) < 100) { xTo.current(dx * 0.3); yTo.current(dy * 0.3) }
      }
      btnLeaveHandler = () => { xTo.current(0); yTo.current(0) }
      btn.addEventListener('mousemove',  btnMoveHandler,  { passive: true })
      btn.addEventListener('mouseleave', btnLeaveHandler, { passive: true })
    }

    return () => {
      glowTween.kill()
      if (rafId) cancelAnimationFrame(rafId)
      observer.disconnect()
      container.removeEventListener('mouseenter', pause)
      container.removeEventListener('mouseleave', resume)
      if (btn && btnMoveHandler) {
        btn.removeEventListener('mousemove',  btnMoveHandler)
        btn.removeEventListener('mouseleave', btnLeaveHandler)
      }
    }
  }, [])

  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      backgroundColor: '#060810',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      backgroundImage: 'linear-gradient(135deg, rgba(4,6,8,0.92), rgba(10,14,20,0.9)), url(https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80)',
      backgroundSize: 'cover', backgroundPosition: 'center',
    }} className="section-wrap cta-section">

      {/* Breathing glow */}
      <div ref={glowRef} style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.35,
        background: 'radial-gradient(ellipse 90% 80% at 50% 100%, rgba(201,168,76,0.14) 0%, rgba(99,102,241,0.04) 50%, transparent 70%)',
      }} />

      {/* Architectural grid */}
      <div className="cta-ticker" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: [
          'linear-gradient(rgba(201,168,76,0.022) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(201,168,76,0.022) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 60% 60% at 50% 100%, black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 100%, black 0%, transparent 100%)',
      }} />

      {/* Marquee ticker */}
      <div style={{
        position: 'relative', zIndex: 1, overflow: 'hidden',
        marginBottom: '104px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        padding: '20px 0',
        contain: 'layout style',
      }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', userSelect: 'none' }}>
          <div ref={track1} style={{ display: 'flex', flexShrink: 0, willChange: 'transform' }}>
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} style={{
                fontFamily: "'Geist', system-ui, sans-serif",
                fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase',
                color: i % 2 === 0 ? 'rgba(201,168,76,0.55)' : 'rgba(240,237,232,0.13)',
                padding: '0 28px',
                display: 'inline-flex', alignItems: 'center', gap: '28px',
              }}>
                {item}
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(201,168,76,0.22)', flexShrink: 0 }} />
              </span>
            ))}
          </div>
          <div ref={track2} style={{ display: 'flex', flexShrink: 0, willChange: 'transform' }}>
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} style={{
                fontFamily: "'Geist', system-ui, sans-serif",
                fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase',
                color: i % 2 === 0 ? 'rgba(201,168,76,0.55)' : 'rgba(240,237,232,0.13)',
                padding: '0 28px',
                display: 'inline-flex', alignItems: 'center', gap: '28px',
              }}>
                {item}
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(201,168,76,0.22)', flexShrink: 0 }} />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '28px' }}>
          <div style={{ height: '1px', width: '28px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5))' }} />
          <span className="eyebrow" style={{ color: '#E63C6D' }}>Ready to start?</span>
          <div style={{ height: '1px', width: '28px', background: 'linear-gradient(90deg, rgba(201,168,76,0.5), transparent)' }} />
        </div>

        <h2 ref={headRef} className="cta-heading" style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 'clamp(2.75rem, 6vw, 5.5rem)', fontWeight: 400,
          lineHeight: 1.0, letterSpacing: '-0.035em',
          color: '#F0EDE8', margin: '0 0 28px 0',
          maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto',
        }}>
          Let’s build something worth talking about.
        </h2>

        <p ref={subRef} className="cta-copy" style={{
          fontFamily: "'Geist', system-ui, sans-serif",
          fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)', lineHeight: 1.75,
          color: '#6B7280', maxWidth: '440px', margin: '0 auto 52px',
          fontWeight: 300,
        }}>
          Tell us where you are, where you want to go, and we will help you map the way forward.
        </p>

        <div ref={btnRef}>
          <Link to="/contact" className="btn-primary cta-button" style={{ fontSize: '0.6875rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <img className="cta-button-logo" src="/logo-icon.png" alt="Tech&Tales" style={{ height: 18, width: 'auto', opacity: 0.95 }} />
            LET’S START A CONVERSATION →
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M1 10L10 1M10 1H3.5M10 1V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
