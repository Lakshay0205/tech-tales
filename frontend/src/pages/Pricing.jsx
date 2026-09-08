import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PricingHeroVisual from '../components/PricingHeroVisual'

gsap.registerPlugin(ScrollTrigger)

const tiers = [
  {
    name: 'Growth Systems', price: 'Custom', tagline: 'Strategy, creative, and digital execution.',
    best: 'Best for businesses that want a coordinated plan and a measurable path forward.',
    includes: ['Growth strategy workshop', 'Conversion-focused customer journey', 'Creative and technical recommendations', 'Delivery roadmap and scope alignment'],
    highlight: true, accent: '#D4AF37',
  },
  {
    name: 'Launch Projects', price: 'Custom', tagline: 'From clarity to go-live.',
    best: 'Best for teams ready to build, refresh, or relaunch their digital presence.',
    includes: ['Website or landing page design and build', 'Brand and content alignment', 'Analytics and performance foundations', 'Launch support and next-step recommendations'],
    highlight: false, accent: '#E63C6D',
  },
  {
    name: 'Retainer Growth', price: 'Custom', tagline: 'Ongoing support and optimization.',
    best: 'Best for teams that need creative, reporting, SEO, and campaign momentum over time.',
    includes: ['Content and campaign support', 'Analytics and reporting cadence', 'SEO and optimization recommendations', 'Priority workshop and implementation sessions'],
    highlight: false, accent: '#D4AF37',
  },
]

function reveal(el, delay = 0) {
  if (!el) return null
  gsap.set(el, { opacity: 0, y: 48 })
  return ScrollTrigger.create({
    trigger: el, start: 'top 86%', once: true,
    onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1.0, ease: 'back.out(1.2)', delay, clearProps: 'transform' }),
  })
}

function onTilt(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateZ(8px)`
}
function offTilt(e) {
  e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
}

export default function Pricing() {
  const heroRef  = useRef(null)
  const cardsRef = useRef([])
  const noteRef  = useRef(null)

  useEffect(() => {
    const triggers = []
    ;[heroRef, noteRef].forEach(r => { const t = reveal(r.current); if (t) triggers.push(t) })
    cardsRef.current.forEach((card, i) => { const t = reveal(card, i * 0.12); if (t) triggers.push(t) })
    return () => triggers.forEach(t => t.kill())
  }, [])

  return (
    <main>
      {/* ── Hero ── */}
      <section style={{ backgroundColor: '#060810', padding: '160px 40px 120px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at top right, rgba(78,205,196,0.08), transparent 32%), linear-gradient(135deg, rgba(255,255,255,0.03), transparent)', opacity: 0.6, pointerEvents: 'none' }} />
        <div className="page-ambient-orb page-ambient-orb--gold" style={{ right: '4%', top: '12%', width: '280px', height: '280px', opacity: 0.16 }} />
        <div className="page-ambient-orb page-ambient-orb--cyan" style={{ left: '10%', bottom: '8%', width: '220px', height: '220px', opacity: 0.16 }} />
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 65%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '0', left: '10%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230,60,109,0.05) 0%, transparent 65%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-5%', right: '-2%',
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 'clamp(7rem, 18vw, 18rem)', fontWeight: 700,
          color: 'rgba(212,175,55,0.025)', whiteSpace: 'nowrap',
          pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.05em', lineHeight: 1, zIndex: 0,
        }}>PRICING</div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={heroRef} className="page-hero-layout" style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
            <div style={{ flex: '1 1 0', minWidth: 0 }}>
              <span className="eyebrow" style={{ marginBottom: '32px', display: 'inline-flex' }}>Pricing</span>
              <h1 style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontWeight: 400,
                lineHeight: 0.95, letterSpacing: '-0.035em', color: '#F0EDE8',
                margin: '28px 0 32px 0', maxWidth: '720px',
              }}>
                Let’s talk about what you <em className="supporting-word">need</em>.
              </h1>
              <p className="supporting-line" style={{
                fontFamily: "'Geist', system-ui, sans-serif",
                maxWidth: '560px', margin: 0,
              }}>
                Every business is different. Tell us what you’re looking to build, grow, or improve, and we’ll create a plan around your goals.
              </p>
            </div>
            <PricingHeroVisual />
          </div>
        </div>
      </section>

      {/* ── Tiers ── */}
      <section style={{ backgroundColor: '#080B12', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '120px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '56px 56px', opacity: 0.4, pointerEvents: 'none' }} />
        {/* Decorative grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: [
            'linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', alignItems: 'start' }}>
            {tiers.map((tier, i) => (
              <div
                key={tier.name}
                ref={el => { cardsRef.current[i] = el }}
                onMouseMove={onTilt}
                onMouseLeave={offTilt}
                style={{
                  padding: '48px 44px',
                  background: tier.highlight
                    ? 'linear-gradient(145deg, rgba(22,27,40,0.96) 0%, rgba(17,21,32,0.99) 100%)'
                    : 'linear-gradient(145deg, rgba(17,21,32,0.88) 0%, rgba(11,15,26,0.94) 100%)',
                  borderRadius: '24px',
                  border: tier.highlight
                    ? '1px solid rgba(212,175,55,0.28)'
                    : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: tier.highlight
                    ? '0 0 100px rgba(212,175,55,0.1), 0 32px 80px rgba(0,0,0,0.5)'
                    : 'none',
                  display: 'flex', flexDirection: 'column',
                  position: 'relative', overflow: 'hidden',
                  ...(tier.highlight ? { marginTop: '-20px', marginBottom: '-20px' } : {}),
                  transition: 'border-color 0.4s ease, transform 0.2s ease',
                  transformStyle: 'preserve-3d',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  if (!tier.highlight) {
                    e.currentTarget.style.borderColor = `${tier.accent}29`
                    e.currentTarget.style.boxShadow = `0 0 60px ${tier.accent}0d, 0 24px 64px rgba(0,0,0,0.4)`
                  }
                }}
                onMouseLeave={e => {
                  if (!tier.highlight) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
              >
                {/* Corner glow */}
                <div style={{
                  position: 'absolute', top: 0, right: 0, width: '220px', height: '220px',
                  background: `radial-gradient(circle at 100% 0%, ${tier.accent}${tier.highlight ? '12' : '08'} 0%, transparent 65%)`,
                  pointerEvents: 'none',
                }} />

                {/* Bottom-left coral glow for Complete tier */}
                {tier.accent === '#E63C6D' && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, width: '180px', height: '180px',
                    background: 'radial-gradient(circle at 0% 100%, rgba(230,60,109,0.07) 0%, transparent 65%)',
                    pointerEvents: 'none',
                  }} />
                )}

                {tier.highlight && (
                  <div style={{ marginBottom: '24px' }}>
                    <span className="tag">Most Popular</span>
                  </div>
                )}

                <h3 style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '2.25rem', fontWeight: 400, color: '#F0EDE8',
                  margin: '0 0 8px 0', letterSpacing: '-0.025em',
                }}>
                  {tier.name}
                </h3>
                <p style={{
                  fontFamily: "'Geist', system-ui, sans-serif",
                  fontSize: '0.9375rem', color: '#6B7280', margin: '0 0 36px 0', fontWeight: 300,
                }}>
                  {tier.tagline}
                </p>

                <div style={{ marginBottom: '36px' }}>
                  <span style={{
                    fontFamily: "'Geist', system-ui, sans-serif",
                    fontSize: '0.5625rem', fontWeight: 600, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: '#374151', display: 'block', marginBottom: '10px',
                  }}>
                    Starting from
                  </span>
                  <div style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: 'clamp(2.5rem, 4vw, 3.25rem)', fontWeight: 300,
                    lineHeight: 1, letterSpacing: '-0.03em',
                    background: `linear-gradient(135deg, ${tier.accent === '#E63C6D' ? '#FF6B95, #E63C6D' : '#F4E5B2, #D4AF37'})`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>
                    {tier.price}
                  </div>
                </div>

                <p style={{
                  fontFamily: "'Geist', system-ui, sans-serif",
                  fontSize: '0.8125rem', color: '#374151', margin: '0 0 32px 0', fontWeight: 300,
                }}>
                  {tier.best}
                </p>

                <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${tier.accent}33, transparent)`, margin: '0 0 32px 0' }} />

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                  {tier.includes.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <span style={{
                        width: '4px', height: '4px', borderRadius: '50%', flexShrink: 0, marginTop: '9px',
                        background: tier.accent,
                        boxShadow: `0 0 8px ${tier.accent}66`,
                      }} />
                      <span style={{
                        fontFamily: "'Geist', system-ui, sans-serif",
                        fontSize: '0.9375rem', color: '#9CA3AF', lineHeight: 1.65, fontWeight: 300,
                      }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={tier.highlight ? 'btn-primary' : 'btn-ghost'}
                  style={{ justifyContent: 'center', fontSize: '0.5625rem' }}
                >
                  GET YOUR CUSTOM QUOTE
                </Link>
              </div>
            ))}
          </div>

          {/* Custom scope */}
          <div
            ref={noteRef}
            style={{
              marginTop: '56px', padding: '52px 48px', textAlign: 'center',
              background: 'linear-gradient(145deg, rgba(17,21,32,0.6) 0%, rgba(11,15,26,0.7) 100%)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ height: '1px', width: '32px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4))' }} />
              <span className="eyebrow">Custom Scope</span>
              <div style={{ height: '1px', width: '32px', background: 'linear-gradient(90deg, rgba(212,175,55,0.4), transparent)' }} />
            </div>
            <p style={{
              fontFamily: "'Geist', system-ui, sans-serif",
              fontSize: '0.9375rem', color: '#6B7280', maxWidth: '440px',
              margin: '0 auto 32px', lineHeight: 1.78, fontWeight: 300,
            }}>
              Need something specific that doesn't fit a tier? We scope custom projects too. Tell us what you're building.
            </p>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontFamily: "'Geist', system-ui, sans-serif",
                fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: '#D4AF37', textDecoration: 'none',
                transition: 'gap 0.35s cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={e => { e.currentTarget.style.gap = '16px' }}
              onMouseLeave={e => { e.currentTarget.style.gap = '8px' }}
            >
              GET YOUR CUSTOM QUOTE
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path d="M1 10L10 1M10 1H3.5M10 1V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
