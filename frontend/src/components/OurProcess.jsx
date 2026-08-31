import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Step icons — inline SVG, stroke-based */
const ICONS = [
  /* Discovery — magnifier */
  <svg key="d" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  /* Strategy — target */
  <svg key="s" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  /* Execution — zap */
  <svg key="e" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  /* Launch — rocket */
  <svg key="l" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  /* Growth — trending up */
  <svg key="g" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
]

const workflowImage = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80'

const steps = [
  { n: '01', title: 'Discover', desc: 'We learn your business, audience, goals, and current gaps so the work begins with clarity.' },
  { n: '02', title: 'Strategize', desc: 'We define the path forward, the priorities, and the creative and technical roadmap.' },
  { n: '03', title: 'Create', desc: 'We shape the assets, systems, and digital experience that bring your strategy to life.' },
  { n: '04', title: 'Launch', desc: 'We prepare and release your work with the quality, structure, and confidence to go live.' },
  { n: '05', title: 'Grow', desc: 'We track what is working, refine what matters, and support your next stage of momentum.' },
]

export default function OurProcess() {
  const sectionRef  = useRef(null)
  const lineFillRef = useRef(null)
  const dotRefs     = useRef([])
  const numRefs     = useRef([])
  const iconRefs    = useRef([])
  const cardRefs    = useRef([])
  const headRef     = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.set(lineFillRef.current, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(headRef.current, { opacity: 0, y: 36 })
    gsap.set(cardRefs.current.filter(Boolean), { opacity: 0, y: 48 })
    gsap.set(iconRefs.current.filter(Boolean), { opacity: 0, scale: 0.5 })

    ScrollTrigger.create({
      trigger: headRef.current, start: 'top 82%', once: true,
      onEnter: () => gsap.to(headRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', clearProps: 'transform' }),
    })

    ScrollTrigger.create({
      trigger: sectionRef.current, start: 'top 80%', once: true,
      onEnter: () => gsap.to(cardRefs.current.filter(Boolean), {
        opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.2)', stagger: 0.1, clearProps: 'transform',
      }),
    })

    let lastProgress = -1
    let rafId = null
    let pendingProgress = -1

    const applyProgress = (p) => {
      const mobile = window.innerWidth <= 767
      if (mobile) {
        lineFillRef.current.style.transform = `scaleY(${p})`
        lineFillRef.current.style.width = '3px'
        lineFillRef.current.style.height = '100%'
        lineFillRef.current.style.left = '20px'
        lineFillRef.current.style.top = '0'
      } else {
        lineFillRef.current.style.transform = `scaleX(${p})`
        lineFillRef.current.style.width = '100%'
        lineFillRef.current.style.height = '2px'
        lineFillRef.current.style.left = '0'
        lineFillRef.current.style.top = '0'
      }

      dotRefs.current.forEach((el, i) => {
        if (!el) return
        const active    = p >= i / (steps.length - 1) - 0.05
        const wasActive = el.dataset.active === '1'
        if (active === wasActive) return
        el.dataset.active = active ? '1' : '0'
        el.style.background = active
          ? 'radial-gradient(circle, #F4E5B2, #D4AF37)'
          : 'rgba(255,255,255,0.15)'
        el.style.boxShadow  = active ? '0 0 16px rgba(212,175,55,0.8), 0 0 32px rgba(212,175,55,0.3)' : 'none'
        el.style.transform  = active ? (mobile ? 'translateY(-50%) scale(1.4)' : 'translate(-50%, -50%) scale(1.4)') : (mobile ? 'translateY(-50%) scale(1)' : 'translate(-50%, -50%) scale(1)')

        const icon = iconRefs.current[i]
        if (icon && active && icon.dataset.shown !== '1') {
          icon.dataset.shown = '1'
          gsap.to(icon, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' })
        }
      })

      numRefs.current.forEach((el, i) => {
        if (!el) return
        const threshold = i / (steps.length - 1)
        const proximity = 1 - Math.min(Math.abs(p - threshold) / 0.22, 1)
        el.style.opacity   = String((0.05 + proximity * 0.65).toFixed(2))
        el.style.transform = `scale(${(1 + proximity * 0.18).toFixed(3)})`
        el.style.filter    = proximity > 0.05
          ? `drop-shadow(0 0 ${Math.round(proximity * 28)}px rgba(212,175,55,${(proximity * 0.55).toFixed(2)}))`
          : 'none'
      })
    }

    const t = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%', end: 'bottom 55%',
      scrub: 2,
      onUpdate: (self) => {
        const p = self.progress
        if (Math.abs(p - lastProgress) < 0.008) return
        lastProgress = p
        pendingProgress = p

        if (rafId !== null) return
        rafId = requestAnimationFrame(() => {
          applyProgress(pendingProgress)
          rafId = null
        })
      },
    })

    const handleResize = () => {
      if (window.innerWidth <= 767) {
        dotRefs.current.forEach((el, i) => {
          if (!el) return
          el.style.left = '20px'
          el.style.top = `${20 + i * 18}%`
          el.style.transform = 'translateY(-50%)'
        })
        if (lineFillRef.current) {
          lineFillRef.current.style.width = '3px'
          lineFillRef.current.style.height = '100%'
          lineFillRef.current.style.left = '20px'
          lineFillRef.current.style.top = '0'
        }
      } else {
        dotRefs.current.forEach((el, i) => {
          if (!el) return
          el.style.left = `${(i / (steps.length - 1)) * 100}%`
          el.style.top = '50%'
          el.style.transform = 'translate(-50%, -50%)'
        })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      t.kill()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-wrap"
      style={{ backgroundColor: '#0A0E14', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(120deg, rgba(4,6,8,0.9), rgba(10,14,20,0.82)), url(${workflowImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12, pointerEvents: 'none' }} />

      {/* Watermark */}
      <div style={{
        position: 'absolute', bottom: '-4%', right: '-2%',
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: 'clamp(7rem, 18vw, 16rem)', fontWeight: 700,
        color: 'rgba(212,175,55,0.022)', whiteSpace: 'nowrap',
        pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.04em', lineHeight: 1, zIndex: 0,
      }}>
        PROCESS
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={headRef} style={{ marginBottom: '96px' }}>
          <span className="eyebrow" style={{ display: 'inline-flex' }}>Our Process</span>
          <h2 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)', fontWeight: 400,
            lineHeight: 1.0, letterSpacing: '-0.03em', color: '#F5F3EF', margin: '28px 0 0 0',
          }}>
            How we{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#E63C6D' }}>work.</em>
          </h2>
        </div>

        {/* Progress line */}
        <div className="process-track" style={{ position: 'relative', height: '2px', marginBottom: '72px' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '1px' }} />
          <div ref={lineFillRef} style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, #E63C6D 0%, #D4AF37 60%, #F4E5B2 100%)',
            borderRadius: '1px',
            boxShadow: '0 0 16px rgba(212,175,55,0.55)',
            transformOrigin: 'left center',
            willChange: 'transform',
          }} />
          {steps.map((_, i) => (
            <div
              key={i}
              ref={el => { dotRefs.current[i] = el }}
              style={{
                position: 'absolute', top: '50%',
                left: `${(i / (steps.length - 1)) * 100}%`,
                transform: 'translate(-50%, -50%)',
                width: '12px', height: '12px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                transition: 'background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Step cards */}
        <div className="process-step-container" style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="process-step-card"
              ref={el => { cardRefs.current[i] = el }}
              style={{ flex: '1 1 160px', position: 'relative', paddingTop: '16px' }}
            >
              {/* Large number watermark */}
              <span
                ref={el => { numRefs.current[i] = el }}
                style={{
                  position: 'absolute', top: '-32px', left: '-10px',
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', fontWeight: 700, lineHeight: 1,
                  background: 'linear-gradient(135deg, #D4AF37, #F4E5B2)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  opacity: 0.05, display: 'inline-block',
                  pointerEvents: 'none', userSelect: 'none', zIndex: 0,
                  willChange: 'transform, opacity, filter',
                  transformOrigin: 'center bottom',
                }}
              >
                {s.n}
              </span>

              <div style={{ position: 'relative', zIndex: 1, paddingTop: '52px' }}>
                {/* Icon — fades in when step activates */}
                <div
                  ref={el => { iconRefs.current[i] = el }}
                  style={{
                    width: '44px', height: '44px', borderRadius: '14px',
                    background: 'linear-gradient(135deg, rgba(78,205,196,0.16), rgba(230,60,109,0.12))',
                    border: '1px solid rgba(78,205,196,0.22)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#4ECDC4', marginBottom: '20px',
                    boxShadow: '0 0 24px rgba(78,205,196,0.12)',
                    opacity: 0, transform: 'scale(0.5)',
                    willChange: 'transform, opacity',
                  }}
                >
                  {ICONS[i]}
                </div>

                <h3 style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '1.125rem', fontWeight: 500, color: '#F5F3EF',
                  margin: '0 0 12px 0', letterSpacing: '-0.01em',
                }}>
                  {s.title}
                </h3>
                <p style={{
                  fontFamily: "'Geist', system-ui, sans-serif",
                  fontSize: '0.875rem', color: '#9CA3AF', lineHeight: 1.78, margin: 0, fontWeight: 300,
                }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
