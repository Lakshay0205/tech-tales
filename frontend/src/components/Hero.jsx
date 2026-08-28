import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import HomeHeroVisual from './HomeHeroVisual'

/* ── Magnetic button ─────────────────────────────────────────── */
function MagneticBtn({ to, href, className, style, children, onClick }) {
  const ref = useRef(null)
  const xTo = useRef(null)
  const yTo = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    xTo.current = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' })
    yTo.current = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' })
    const onMove  = (e) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top  + r.height / 2)
      if (Math.hypot(dx, dy) < 80) { xTo.current(dx * 0.38); yTo.current(dy * 0.38) }
    }
    const onLeave = () => { xTo.current(0); yTo.current(0) }
    el.addEventListener('mousemove',  onMove,  { passive: true })
    el.addEventListener('mouseleave', onLeave, { passive: true })
    return () => {
      el.removeEventListener('mousemove',  onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  /* Ripple on click */
  const handleClick = (e) => {
    const el = ref.current
    if (!el) return
    const ripple = document.createElement('span')
    const rect   = el.getBoundingClientRect()
    const size   = Math.max(rect.width, rect.height) * 2
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      background:rgba(255,255,255,0.18);
      animation:ripple 0.6s ease-out forwards;
    `
    el.appendChild(ripple)
    setTimeout(() => ripple.remove(), 700)
    onClick?.()
  }

  const props = { ref, className, style, onClick: handleClick }
  if (to)   return <Link to={to} {...props}>{children}</Link>
  return <a href={href} {...props}>{children}</a>
}

/* ── Glowing sphere ──────────────────────────────────────────── */
function HeroSphere({ mouseX, mouseY, scrollY }) {
  const sphereRef = useRef(null)

  useEffect(() => {
    const el = sphereRef.current
    if (!el) return
    let cx = 0, cy = 0
    let rafId
    let tx = 0, ty = 0
    let running = false
    let baseY = 0
    const unsub1 = mouseX.on('change', v => { cx = v })
    const unsub2 = mouseY.on('change', v => { cy = v })
    const unsub3 = scrollY.on('change', v => {
      if (!el) return
      baseY = v * 0.25
      el.style.transform = `translate3d(${tx}px, calc(-50% + ${baseY}px), 0) translateY(${ty}px)`
    })
    let lastTime = 0
    const TARGET_FPS = 30
    const FRAME_MS = 1000 / TARGET_FPS

    const tick = (time) => {
      if (time - lastTime < FRAME_MS) {
        rafId = requestAnimationFrame(tick)
        return
      }
      lastTime = time

      tx += (cx * 28 - tx) * 0.06
      ty += (cy * 18 - ty) * 0.06
      if (el) {
        el.style.transform = `translate3d(${tx}px, calc(-50% + ${baseY}px), 0) translateY(${ty}px)`
      }
      rafId = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true
        lastTime = 0
        rafId = requestAnimationFrame(tick)
      } else if (!entry.isIntersecting && running) {
        running = false
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }, { threshold: 0 })
    observer.observe(el)

    return () => {
      unsub1(); unsub2(); unsub3()
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [mouseX, mouseY, scrollY])

  return (
    <div
      ref={sphereRef}
      style={{
        position: 'absolute',
        right: '-12vw', top: '50%',
        transform: 'translateY(-50%)',
        width: 'clamp(520px, 62vw, 920px)',
        height: 'clamp(520px, 62vw, 920px)',
        pointerEvents: 'none', zIndex: 0,
        willChange: 'transform',
      }}
    >
      {/* Core sphere — layered radials */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: [
          'radial-gradient(circle at 38% 38%, rgba(244,229,178,0.22) 0%, rgba(212,175,55,0.14) 25%, transparent 55%)',
          'radial-gradient(circle at 65% 65%, rgba(30,58,95,0.18) 0%, transparent 50%)',
          'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)',
        ].join(', '),
        filter: 'blur(2px)',
        animation: 'sphere-pulse 8s ease-in-out infinite',
      }} />

      {/* Outer glow halo */}
      <div style={{
        position: 'absolute', inset: '-15%', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.04) 40%, transparent 65%)',
        filter: 'blur(48px)',
      }} />

      {/* Coral accent glow — bottom left of sphere */}
      <div style={{
        position: 'absolute', bottom: '10%', left: '5%',
        width: '40%', height: '40%', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(230,60,109,0.12) 0%, transparent 65%)',
        filter: 'blur(40px)',
      }} />

      {/* Concentric rings */}
      {[
        { size: '100%', opacity: 0.07, dash: 'none', anim: 'none' },
        { size: '78%',  opacity: 0.1,  dash: 'none', anim: 'ring-rotate 60s linear infinite' },
        { size: '58%',  opacity: 0.12, dash: 'none', anim: 'ring-rotate-rev 45s linear infinite' },
        { size: '40%',  opacity: 0.15, dash: 'none', anim: 'none' },
      ].map(({ size, opacity, anim }, i) => (
        <div key={i} style={{
          position: 'absolute', top: '50%', left: '50%',
          width: size, height: size,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: `1px solid rgba(212,175,55,${opacity})`,
          animation: anim,
          willChange: anim !== 'none' ? 'transform' : 'auto',
        }} />
      ))}

      {/* Dashed orbit ring */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: '88%', height: '88%',
        transform: 'translate(-50%, -50%) rotate(25deg)',
        borderRadius: '50%',
        border: '1px dashed rgba(212,175,55,0.08)',
      }} />

      {/* Bright highlight dot */}
      <div style={{
        position: 'absolute', top: '22%', left: '28%',
        width: '12%', height: '12%', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
        filter: 'blur(8px)',
      }} />
    </div>
  )
}

const stats = [
  { value: '3×',   label: 'Avg. inquiry growth' },
  { value: '14d',  label: 'Avg. delivery time'  },
  { value: '100%', label: 'Client satisfaction' },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headRef    = useRef(null)
  const headLineRefs = useRef([])
  const decoRef    = useRef(null)
  const ruleRef    = useRef(null)
  const subRef     = useRef(null)
  const btnsRef    = useRef(null)
  const statsRef   = useRef(null)
  const availRef   = useRef(null)
  const gridRef    = useRef(null)



  useEffect(() => {
    gsap.set(gridRef.current, { opacity: 0 })
    gsap.set([eyebrowRef.current, decoRef.current, subRef.current, btnsRef.current, availRef.current, statsRef.current], { opacity: 0, y: 32 })
    gsap.set(headLineRefs.current, { opacity: 0, y: 42, filter: 'blur(18px)' })
    gsap.set(ruleRef.current,  { scaleX: 0, transformOrigin: 'left center' })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.08 })
    tl.to(gridRef.current,    { opacity: 1, duration: 2.8, ease: 'power2.out' }, 0)
    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 1.0 }, 0.15)
    tl.to(headLineRefs.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.16 }, '-=0.75')
    tl.to(decoRef.current,    { opacity: 1, y: 0, duration: 1.0 }, '-=1.0')
    tl.to(ruleRef.current,    { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, '-=0.8')
    tl.to(subRef.current,     { opacity: 1, y: 0, duration: 1.0 }, '-=0.65')
    tl.to(btnsRef.current,    { opacity: 1, y: 0, duration: 0.9 }, '-=0.55')
    tl.to(statsRef.current,   { opacity: 1, y: 0, duration: 0.9 }, '-=0.45')
    tl.to(availRef.current,   { opacity: 1, y: 0, duration: 0.8 }, '-=0.35')
    return () => tl.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        backgroundColor: '#060810',
        display: 'flex', alignItems: 'center',
        padding: '160px 40px 120px',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Architectural line grid */}
      <div ref={gridRef} style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: [
          'linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 65% 50%, black 10%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 65% 50%, black 10%, transparent 75%)',
      }} />

      {/* Horizon line */}
      <div style={{
        position: 'absolute', left: 0, top: '50%',
        width: '100%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.07) 20%, rgba(212,175,55,0.07) 80%, transparent)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div className="hero-page-orb" style={{ right: '-4vw', top: '54%', opacity: 0.8, zIndex: 0 }} />
      <div className="page-ambient-orb page-ambient-orb--cyan" style={{ right: '16%', bottom: '18%', width: '220px', height: '220px', opacity: 0.16, zIndex: 0 }} />

      {/* Content + right visual */}
      <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '48px' }}>
        <div style={{ position: 'relative', flex: '1 1 0', minWidth: 0 }}>
          <div ref={eyebrowRef} style={{ marginBottom: '44px' }}>
            <span className="eyebrow">Digital Agency — 2025</span>
          </div>

          <div ref={decoRef} className="hero-deco-network" aria-hidden="true">
            <span className="hero-deco-dot" style={{ top: '12%', left: '8%' }} />
            <span className="hero-deco-dot" style={{ top: '24%', left: '42%' }} />
            <span className="hero-deco-dot" style={{ top: '68%', left: '18%' }} />
            <span className="hero-deco-dot" style={{ top: '54%', left: '62%' }} />
            <span className="hero-deco-line" style={{ top: '18%', left: '12%', width: '28%' }} />
            <span className="hero-deco-line" style={{ top: '27%', left: '46%', width: '20%' }} />
            <span className="hero-deco-line" style={{ top: '58%', left: '22%', width: '40%' }} />
            <span className="hero-deco-line" style={{ top: '66%', left: '58%', width: '24%' }} />
          </div>

          <h1 ref={headRef} style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(3.5rem, 6.5vw, 6rem)',
            fontWeight: 600,
            lineHeight: 1.18,
            letterSpacing: '-0.03em',
            color: '#F5F3EF',
            margin: '0 0 52px 0',
            maxWidth: '820px',
            willChange: 'transform, opacity, filter',
          }}>
            <span ref={el => { if (el) headLineRefs.current[0] = el }} className="hero-headline-line char-wrap" style={{ marginBottom: '0.34em' }}>
              <span className="char-inner" style={{ display: 'inline-block' }}>
                <span style={{ color: '#F5F3EF' }}>Make your brand</span>
                <span className="supporting-word" style={{ marginLeft: '0.22ch' }}>unforgettable.</span>
              </span>
            </span>
            <span ref={el => { if (el) headLineRefs.current[1] = el }} className="hero-headline-line char-wrap" style={{ display: 'block', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, color: '#D9D5C7', lineHeight: 1.20, letterSpacing: '-0.018em', paddingTop: '4px' }}>
              <span className="char-inner" style={{ display: 'inline-block' }}><span style={{ color: '#FAF7EA' }}>Seen.</span></span>{' '}
              <span className="char-inner" style={{ display: 'inline-block' }}><span style={{ color: '#CFC8B8' }}>Desired.</span></span>{' '}
              <span className="char-inner supporting-word" style={{ display: 'inline-block' }}><span>Chosen.</span></span>
            </span>
          </h1>

          {/* Gold rule */}
          <div ref={ruleRef} style={{
            width: '64px', height: '2px', marginBottom: '44px',
            background: 'linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.1))',
            borderRadius: '1px',
          }} />

          <p ref={subRef} style={{
            fontFamily: "'Geist', system-ui, sans-serif",
            fontSize: 'clamp(1rem, 1.3vw, 1.1875rem)',
            lineHeight: 1.78, color: '#6B7280',
            margin: '0 0 64px 0', maxWidth: '560px', fontWeight: 300,
          }}>
            We help growing brands go from scattered digital presence to a sharper story, stronger systems, and consistently better customer decisions.
          </p>

          <div ref={btnsRef} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '88px' }}>
            <MagneticBtn to="/contact" className="btn-primary">
              LET’S GROW TOGETHER
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path d="M1 10L10 1M10 1H3.5M10 1V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </MagneticBtn>
            <MagneticBtn to="/portfolio" className="btn-ghost">
              EXPLORE OUR WORK
            </MagneticBtn>
          </div>

          {/* Stats */}
          <div ref={statsRef} style={{
            display: 'flex', gap: '60px', flexWrap: 'wrap',
            paddingTop: '44px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            marginBottom: '44px',
          }}>
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 400, lineHeight: 1, letterSpacing: '-0.03em',
                  background: 'linear-gradient(135deg, #F4E5B2, #D4AF37)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  marginBottom: '10px',
                }}>
                  {value}
                </div>
                <div style={{
                  fontFamily: "'Geist', system-ui, sans-serif",
                  fontSize: '0.5625rem', fontWeight: 600,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: '#4B5563',
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          <p ref={availRef} style={{
            fontFamily: "'Geist', system-ui, sans-serif",
            fontSize: '0.75rem', color: '#4B5563', margin: 0,
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <span className="dot-live" />
            Currently available — taking on new clients this month
          </p>

        </div>

        {/* Right-column 3-D visual */}
        <div className="hhv-col">
          <HomeHeroVisual />
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '50%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        zIndex: 1, animation: 'scroll-bob 2.5s ease-in-out infinite',
      }}>
        <span style={{
          fontFamily: "'Geist', system-ui, sans-serif",
          fontSize: '0.5rem', letterSpacing: '0.32em', textTransform: 'uppercase',
          color: '#4B5563', writingMode: 'vertical-rl',
        }}>Scroll</span>
        <div style={{
          width: '1px', height: '52px',
          background: 'linear-gradient(180deg, rgba(212,175,55,0.55), transparent)',
        }} />
      </div>
    </section>
  )
}
