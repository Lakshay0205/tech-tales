import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ServicesHeroVisual from '../components/ServicesHeroVisual'

gsap.registerPlugin(ScrollTrigger)

/* ── Data ─────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'growth',
    label: 'Growth & Performance',
    color: '#D4AF37',
    rgb: '212,175,55',
    bg: '#080B12',
    tagline: 'Visibility. Reach. Revenue.',
    services: [
      { title: 'Strategy & Consulting', desc: 'Clarify where your brand is going and the highest-leverage actions to improve visibility and conversion.', tags: ['Audit', 'Positioning', 'Roadmap'] },
      { title: 'Performance Marketing', desc: 'Launch and refine campaigns with clear measurement, landing-page fit, and creative direction.', tags: ['Meta Ads', 'Audience', 'Optimisation'] },
      { title: 'SEO & Content', desc: 'Technical foundations, on-page systems, and topic strategy that brings search traffic and brand clarity together.', tags: ['On-page', 'Technical', 'Content plan'] },
      { title: 'Social Media', desc: 'Plan, create, schedule, and report on content that helps your audience understand your brand and act.', tags: ['Calendar', 'Publishing', 'Analytics'] },
    ],
  },
  {
    id: 'creative',
    label: 'Creative & Content',
    color: '#E63C6D',
    rgb: '230,60,109',
    bg: '#060810',
    tagline: 'Identity. Story. Craft.',
    services: [
      { title: 'Branding & Identity', desc: 'Visual and verbal foundations that make your brand feel consistent, premium, and instantly recognisable.', tags: ['Identity', 'Color system', 'Guidelines'] },
      { title: 'Logo Design', desc: 'A logo system that sharpens your visual identity and keeps assets usable across every touchpoint.', tags: ['Logo mark', 'Icon suite', 'Files'] },
      { title: 'Content Creation', desc: 'Educational, brand-building, and campaign content your team can publish with confidence.', tags: ['Copy', 'Visuals', 'Calendar'] },
      { title: 'Video Production', desc: 'Short-form video for launch moments, social storytelling, product education, and campaign support.', tags: ['Reels', 'Captions', 'Colour grade'] },
    ],
  },
  {
    id: 'digital',
    label: 'Digital & Technology',
    color: '#4ECDC4',
    rgb: '78,205,196',
    bg: '#080B12',
    tagline: 'Build. Automate. Scale.',
    services: [
      { title: 'Website Development', desc: 'A high-performing website that communicates your offer clearly and supports conversion goals on every device.', tags: ['React / WP', 'Responsive', 'Launch'] },
      { title: 'E-commerce', desc: 'Online store flows so your products, payments, and customer journeys are easier to use and easier to trust.', tags: ['Razorpay', 'Catalog', 'Checkout'] },
      { title: 'Automation & Integration', desc: 'Automate handoffs between your website, CRM, WhatsApp, email, and internal workflows so nothing gets lost.', tags: ['CRM', 'WhatsApp', 'Workflows'] },
      { title: 'Analytics & Reporting', desc: 'Connect data sources, track meaningful actions, and turn performance patterns into practical decisions.', tags: ['GA4', 'Dashboard', 'Insights'] },
    ],
  },
]

/* ── Service card ─────────────────────────────────────────────── */
function ServiceCard({ service, color, rgb, index }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateZ(6px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
    setHovered(false)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        position: 'relative', overflow: 'hidden',
        padding: '36px 32px 32px',
        background: `linear-gradient(145deg, rgba(14,18,28,0.95) 0%, rgba(9,12,20,0.98) 100%)`,
        borderRadius: '20px',
        border: `1px solid ${hovered ? `rgba(${rgb},0.28)` : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered ? `0 0 60px rgba(${rgb},0.1), 0 20px 60px rgba(0,0,0,0.5)` : 'none',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.18s ease',
        transformStyle: 'preserve-3d',
        cursor: 'default',
        display: 'flex', flexDirection: 'column', gap: '20px',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: hovered ? '10%' : '40%', right: hovered ? '10%' : '40%', height: '2px',
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        transition: 'left 0.5s cubic-bezier(0.16,1,0.3,1), right 0.5s cubic-bezier(0.16,1,0.3,1)',
        borderRadius: '1px',
      }} />

      {/* Corner glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '140px', height: '140px',
        background: `radial-gradient(circle at 100% 0%, rgba(${rgb},${hovered ? '0.12' : '0.05'}) 0%, transparent 65%)`,
        transition: 'background 0.35s ease',
        pointerEvents: 'none',
      }} />

      {/* Index + title row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <span style={{
            fontFamily: "'Geist', system-ui, sans-serif",
            fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.28em',
            color: `rgba(${rgb},0.45)`, display: 'block', marginBottom: '10px',
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
            fontWeight: 500, lineHeight: 1.15,
            letterSpacing: '-0.025em',
            color: hovered ? '#F5F3EF' : '#C8C4BC',
            margin: 0,
            transition: 'color 0.25s ease',
          }}>
            {service.title}
          </h3>
        </div>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
          border: `1px solid rgba(${rgb},${hovered ? '0.5' : '0.15'})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: hovered ? color : '#4B5563',
          transition: 'all 0.3s ease',
          transform: hovered ? 'rotate(-45deg)' : 'rotate(0deg)',
        }}>
          <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
            <path d="M1 10L10 1M10 1H3.5M10 1V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <p style={{
        fontFamily: "'Geist', system-ui, sans-serif",
        fontSize: '0.875rem', lineHeight: 1.75,
        color: hovered ? '#6B7280' : '#374151',
        margin: 0, fontWeight: 300,
        transition: 'color 0.3s ease',
      }}>
        {service.desc}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
        {service.tags.map(t => (
          <span key={t} style={{
            fontFamily: "'Geist', system-ui, sans-serif",
            fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.18em',
            textTransform: 'uppercase',
            padding: '4px 10px', borderRadius: '100px',
            background: hovered ? `rgba(${rgb},0.1)` : 'rgba(255,255,255,0.03)',
            border: `1px solid ${hovered ? `rgba(${rgb},0.3)` : 'rgba(255,255,255,0.07)'}`,
            color: hovered ? color : '#374151',
            transition: 'all 0.3s ease',
          }}>
            {t}
          </span>
        ))}
      </div>

      <div style={{
        position: 'absolute', bottom: '-12px', right: '16px',
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: '6rem', fontWeight: 700, lineHeight: 1,
        color: `rgba(${rgb},${hovered ? '0.06' : '0.025'})`,
        pointerEvents: 'none', userSelect: 'none',
        transition: 'color 0.35s ease',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  )
}

/* ── Category section ─────────────────────────────────────────── */
function CategorySection({ cat, sectionRef: externalRef }) {
  const headRef  = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const triggers = []

    gsap.set(headRef.current, { opacity: 0, y: 40 })
    triggers.push(ScrollTrigger.create({
      trigger: headRef.current, start: 'top 87%', once: true,
      onEnter: () => gsap.to(headRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform' }),
    }))

    const cards = cardsRef.current.filter(Boolean)
    gsap.set(cards, { opacity: 0, y: 52, scale: 0.97 })
    triggers.push(ScrollTrigger.create({
      trigger: cards[0], start: 'top 88%', once: true,
      onEnter: () => gsap.to(cards, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.85, ease: 'back.out(1.15)', stagger: 0.1, clearProps: 'transform',
      }),
    }))

    return () => triggers.forEach(t => t.kill())
  }, [])

  return (
    <section
      ref={externalRef}
      style={{
        backgroundColor: cat.bg,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '120px 40px',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: '-5%',
        ...(cat.id === 'creative' ? { right: '-5%' } : { left: '-5%' }),
        width: '600px', height: '600px', borderRadius: '50%',
        background: `radial-gradient(circle, rgba(${cat.rgb},0.07) 0%, transparent 65%)`,
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, rgba(${cat.rgb},0.07) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
        maskImage: `radial-gradient(ellipse 60% 60% at ${cat.id === 'creative' ? '80%' : '20%'} 50%, black 20%, transparent 80%)`,
        WebkitMaskImage: `radial-gradient(ellipse 60% 60% at ${cat.id === 'creative' ? '80%' : '20%'} 50%, black 20%, transparent 80%)`,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={headRef} style={{ marginBottom: '72px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: cat.color,
              boxShadow: `0 0 16px rgba(${cat.rgb},0.9), 0 0 32px rgba(${cat.rgb},0.4)`,
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "'Geist', system-ui, sans-serif",
              fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: cat.color,
            }}>
              {cat.label}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <h2 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
              fontWeight: 400, lineHeight: 1.15,
              letterSpacing: '-0.035em', color: '#F0EDE8',
              margin: 0,
            }}>
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: cat.color }}>
                {cat.tagline.split('.')[0]}.
              </em>
              <br />
              <span style={{ color: 'rgba(240,237,232,0.35)', fontSize: '0.55em', fontWeight: 300, letterSpacing: '-0.01em' }}>
                {cat.tagline.split('.').slice(1).join('.').trim()}
              </span>
            </h2>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px 24px', borderRadius: '100px',
              background: `rgba(${cat.rgb},0.07)`,
              border: `1px solid rgba(${cat.rgb},0.2)`,
              boxShadow: `0 0 24px rgba(${cat.rgb},0.08)`,
            }}>
              <span style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: '2rem', fontWeight: 300, lineHeight: 1,
                color: cat.color,
              }}>
                {cat.services.length}
              </span>
              <span style={{
                fontFamily: "'Geist', system-ui, sans-serif",
                fontSize: '0.5625rem', fontWeight: 600, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#4B5563', lineHeight: 1.4,
              }}>
                Services<br />available
              </span>
            </div>
          </div>

          <div style={{
            marginTop: '36px', height: '1px',
            background: `linear-gradient(90deg, rgba(${cat.rgb},0.5) 0%, rgba(${cat.rgb},0.1) 40%, transparent 70%)`,
          }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {cat.services.map((s, i) => (
            <div key={s.title} ref={el => { cardsRef.current[i] = el }}>
              <ServiceCard service={s} color={cat.color} rgb={cat.rgb} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Hero ─────────────────────────────────────────────────────── */
function reveal(el, delay = 0) {
  if (!el) return null
  gsap.set(el, { opacity: 0, y: 48 })
  return ScrollTrigger.create({
    trigger: el, start: 'top 86%', once: true,
    onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1.0, ease: 'back.out(1.2)', delay, clearProps: 'transform' }),
  })
}

export default function Services() {
  const heroRef = useRef(null)
  const ctaRef  = useRef(null)

  useEffect(() => {
    const triggers = []
    ;[heroRef, ctaRef].forEach(r => { const t = reveal(r.current); if (t) triggers.push(t) })
    return () => triggers.forEach(t => t.kill())
  }, [])

  return (
    <main>
      {/* ── Hero ── */}
      <section style={{ backgroundColor: '#060810', padding: '160px 40px 120px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 65%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '0', left: '30%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30,58,95,0.15) 0%, transparent 65%)',
          filter: 'blur(70px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-5%', right: '-2%',
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 'clamp(7rem, 18vw, 18rem)', fontWeight: 700,
          color: 'rgba(212,175,55,0.025)', whiteSpace: 'nowrap',
          pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.05em', lineHeight: 1, zIndex: 0,
        }}>SERVICES</div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={heroRef} className="page-hero-layout" style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>

            {/* ── Left copy ── */}
            <div style={{ flex: '1 1 0', minWidth: 0 }}>
              <span className="eyebrow" style={{ marginBottom: '40px', display: 'inline-flex' }}>Services</span>

              <h1 style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 'clamp(2.2rem, 6.5vw, 6rem)',
                fontWeight: 600,
                lineHeight: 1.18,
                letterSpacing: '-0.03em',
                color: '#F0EDE8',
                margin: '28px 0 52px 0',
                maxWidth: '820px',
                position: 'relative',
                zIndex: 1,
              }}>
                <span style={{ display: 'block' }}>Everything your brand</span>
                <span style={{ display: 'block' }}>
                  needs{' '}
                    <em className="supporting-word" style={{ fontWeight: 600 }}>to grow.</em>
                </span>
              </h1>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '48px', flexWrap: 'wrap' }}>
                <div style={{
                  width: '2px', flexShrink: 0, alignSelf: 'stretch', minHeight: '80px',
                  background: 'linear-gradient(180deg, #D4AF37 0%, rgba(212,175,55,0.08) 100%)',
                  borderRadius: '1px',
                }} />
                <p className="supporting-line" style={{
                  fontFamily: "'Geist', system-ui, sans-serif",
                  maxWidth: '520px', margin: 0,
                }}>
                  Strategy, content, creative, and performance systems designed to help your brand become{' '}
                  <span style={{ color: '#C8C4BC', fontWeight: 400 }}>clearer, stronger,</span>{' '}and easier to choose.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '64px' }}>
                {CATEGORIES.map(({ label, color, rgb, tagline, services }) => (
                  <div key={label} style={{
                    padding: '28px 28px 24px',
                    background: 'linear-gradient(145deg, rgba(17,21,32,0.9) 0%, rgba(11,15,26,0.95) 100%)',
                    borderRadius: '20px',
                    border: `1px solid rgba(${rgb},0.18)`,
                    boxShadow: `0 0 40px rgba(${rgb},0.07), inset 0 1px 0 rgba(255,255,255,0.04)`,
                    position: 'relative', overflow: 'hidden',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                    cursor: 'default',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `rgba(${rgb},0.38)`
                      e.currentTarget.style.boxShadow = `0 0 60px rgba(${rgb},0.14), 0 16px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)`
                      e.currentTarget.style.transform = 'translateY(-4px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = `rgba(${rgb},0.18)`
                      e.currentTarget.style.boxShadow = `0 0 40px rgba(${rgb},0.07), inset 0 1px 0 rgba(255,255,255,0.04)`
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: 0, right: 0, width: '100px', height: '100px',
                      background: `radial-gradient(circle at 100% 0%, rgba(${rgb},0.14) 0%, transparent 65%)`,
                      pointerEvents: 'none',
                    }} />
                    <div style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: '3.5rem', fontWeight: 300, lineHeight: 1,
                      letterSpacing: '-0.04em', color,
                      marginBottom: '8px',
                      textShadow: `0 0 40px rgba(${rgb},0.5)`,
                    }}>{services.length}</div>
                    <div style={{
                      fontFamily: "'Geist', system-ui, sans-serif",
                      fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.2em',
                      textTransform: 'uppercase', color: '#4B5563',
                    }}>{label}</div>
                    <div style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: '0.8125rem', fontStyle: 'italic', fontWeight: 300,
                      color: `rgba(${rgb},0.5)`, marginTop: '8px',
                    }}>{tagline}</div>
                    <div style={{
                      position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '1px',
                      background: `linear-gradient(90deg, transparent, rgba(${rgb},0.4), transparent)`,
                    }} />
                  </div>
                ))}
              </div>
            </div>{/* end left col */}

            {/* ── Right visual ── */}
            <ServicesHeroVisual />

          </div>{/* end flex row */}
        </div>
      </section>

      {/* ── Category sections ── */}
      {CATEGORIES.map(cat => (
        <CategorySection key={cat.id} cat={cat} />
      ))}

      {/* ── CTA ── */}
      <section style={{ backgroundColor: '#060810', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '120px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 65%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={ctaRef}>
            <span className="eyebrow" style={{ marginBottom: '28px', display: 'inline-flex', justifyContent: 'center' }}>Ready?</span>
            <h2 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400,
              lineHeight: 1.15, letterSpacing: '-0.035em', color: '#F0EDE8',
              margin: '20px auto 24px', maxWidth: '640px',
            }}>
              Let's build something{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#D4AF37' }}>worth showing off.</em>
            </h2>
            <p style={{
              fontFamily: "'Geist', system-ui, sans-serif",
              fontSize: '1rem', color: '#6B7280', margin: '0 auto 48px',
              maxWidth: '400px', fontWeight: 300, lineHeight: 1.75,
            }}>
              Tell us what you want your next chapter to look like.
            </p>
            <Link to="/contact" className="btn-primary">
              Start a Conversation
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
