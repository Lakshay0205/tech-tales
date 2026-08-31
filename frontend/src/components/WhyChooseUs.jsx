import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = [
  { n: '01', title: 'One Team, Full Stack',       desc: 'Engineering and creative work from the same two people — no handoffs, no lost context.' },
  { n: '02', title: 'Real Engineering Depth',     desc: 'Custom chatbots and automation, not just templated tools — because one of us is a working software engineer.' },
  { n: '03', title: 'Fast, Direct Communication', desc: 'You talk to the people doing the work, not an account manager relaying messages.' },
  { n: '04', title: 'Honest Scope',               desc: 'We only offer what we can genuinely deliver — nothing overpromised.' },
]

const textureImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80'

export default function WhyChooseUs() {
  const sectionRef  = useRef(null)
  const headRef     = useRef(null)
  const itemsRef    = useRef([])
  const cardRefs    = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.set(headRef.current, { opacity: 0, y: 32 })
    gsap.set(itemsRef.current.filter(Boolean), { opacity: 0, y: 32 })

    gsap.to(headRef.current, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', clearProps: 'transform',
      scrollTrigger: { trigger: headRef.current, start: 'top 88%', once: true },
    })

    gsap.to(itemsRef.current.filter(Boolean), {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12, clearProps: 'transform',
      scrollTrigger: { trigger: section, start: 'top 80%', once: true },
    })
  }, [])

  const handleEnter = (index) => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return
      // opacity-only — no filter:blur (avoids GPU layer promotion/demotion)
      gsap.to(el, i !== index
        ? { opacity: 0.45, duration: 0.3, ease: 'power2.out' }
        : { scale: 1.02, duration: 0.3, ease: 'power2.out' }
      )
    })
  }

  const handleLeave = () => {
    cardRefs.current.forEach(el => {
      if (!el) return
      gsap.to(el, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' })
    })
  }

  return (
    <section ref={sectionRef} className="section-wrap" style={{ backgroundColor: '#0A0E14', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(135deg, rgba(4,6,8,0.92), rgba(10,14,20,0.92)), url(${textureImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12, pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={headRef}>
          <p style={{
            fontFamily: "'Geist', 'Inter', system-ui, sans-serif",
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #E63C6D 0%, #4ECDC4 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            margin: '0 0 16px 0',
          }}>
            Why Choose Us
          </p>
          <h2 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 500,
            lineHeight: 1.1, letterSpacing: '-0.02em',
            color: '#F5F3EF', margin: '0 0 48px 0',
          }}>
            One partner. Every capability.
          </h2>
        </div>

        <div className="why-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {items.map((item, i) => (
            <div
              key={item.n}
              ref={el => { itemsRef.current[i] = el; cardRefs.current[i] = el }}
              className="card why-card-item"
              style={{
                padding: '44px 36px 36px',
                display: 'flex', flexDirection: 'column', gap: '12px',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={handleLeave}
            >
              <div style={{
                position: 'absolute', top: '24px', left: '24px', width: '46px', height: '46px', borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(78,205,196,0.18), rgba(230,60,109,0.14))',
                border: '1px solid rgba(78,205,196,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ECDC4',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2v20" />
                  <path d="M2 12h20" />
                  <path d="m4.9 4.9 14.2 14.2" />
                  <path d="m4.9 19.1 14.2-14.2" />
                </svg>
              </div>

              {/* Top edge glow on hover */}
              <div style={{
                position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
                opacity: 0,
                transition: 'opacity 0.4s ease',
              }} className="card-top-line" />

              {/* Giant number watermark */}
              <span style={{
                position: 'absolute',
                top: '-12px', right: '16px',
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 'clamp(5rem, 8vw, 7rem)',
                fontWeight: 700, lineHeight: 1,
                background: 'linear-gradient(135deg, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.04) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                pointerEvents: 'none', userSelect: 'none', zIndex: 0,
              }}>
                {item.n}
              </span>

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '1.25rem', fontWeight: 500, color: '#F5F3EF', margin: 0,
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: "'Geist', 'Inter', system-ui, sans-serif",
                  fontSize: '0.9375rem', lineHeight: 1.6, color: '#9CA3AF', margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
