import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PortfolioHeroVisual from '../components/PortfolioHeroVisual'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    name: 'Terravik', category: 'Website', tags: ['Website', 'Branding'],
    problem: 'No digital presence. Leads were going to competitors with basic websites.',
    solution: 'Built a custom React site with SEO foundation, brand identity, and lead capture form.',
    result: '3× inquiry rate within 60 days of launch.', year: '2024',
    accent: '#D4AF37', image: '/terravik.jpeg', glow: 'rgba(78,205,196,0.32)', url: 'https://terravik-1m5m.vercel.app/terravik/',
  },
  {
    name: 'Hawai Agro', category: 'Website', tags: ['Website', 'E-commerce'],
    problem: 'Manual order process via WhatsApp. Zero organic search visibility.',
    solution: 'Full e-commerce setup with Razorpay, product catalog, and on-page SEO.',
    result: 'Online store live in 2 weeks. 40% organic traffic growth in 3 months.', year: '2024',
    accent: '#E63C6D', image: '/hawaiagro.jpeg', glow: 'rgba(74,222,128,0.32)', url: 'https://terravik-1m5m.vercel.app/hawai-agro',
  },
  {
    name: 'TAAR', category: 'Branding', tags: ['Branding', 'Social Media'],
    problem: 'Inconsistent visual identity across Instagram, website, and print materials.',
    solution: 'Complete brand system — logo, color palette, typography, and social media templates.',
    result: 'Unified brand across all channels. 2× engagement rate on Instagram.', year: '2024',
    accent: '#D4AF37', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80', glow: 'rgba(230,60,109,0.28)',
  },
]

const filters = ['All', 'Website', 'Branding', 'Social Media', 'SEO', 'Performance']

function ProjectCard({ project }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(12px)`
    el.style.boxShadow = `${-x * 24}px ${-y * 24}px 60px rgba(0,0,0,0.5), 0 0 80px ${project.accent}0f`
  }
  const handleLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
      ref.current.style.boxShadow = 'none'
    }
  }

  return (
    <a href={project.url || '#'} target={project.url ? '_blank' : undefined} rel={project.url ? 'noopener noreferrer' : undefined} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <motion.div
        layout
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{
            padding: '44px 40px',
            background: 'linear-gradient(145deg, rgba(17,21,32,0.88) 0%, rgba(11,15,26,0.94) 100%)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.06)',
            height: '100%', display: 'flex', flexDirection: 'column', gap: '28px',
            transition: 'transform 0.2s ease, border-color 0.4s ease',
            transformStyle: 'preserve-3d',
            position: 'relative', overflow: 'hidden',
            cursor: project.url ? 'pointer' : 'default',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = `${project.accent}29` }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
        >
          {/* Corner glow */}
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '180px', height: '180px',
            background: `radial-gradient(circle at 100% 0%, ${project.accent}0d 0%, transparent 65%)`,
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '8px' }}>
            <img src={project.image} alt={project.name} loading="eager" decoding="async" style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${project.glow} 0%, transparent 70%)` }} />
            <div style={{ position: 'absolute', inset: 'auto 14px 14px 14px', borderRadius: '12px', padding: '12px 14px', background: 'rgba(4,6,8,0.55)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
              <p style={{ fontFamily: "'Geist', system-ui, sans-serif", fontSize: '0.625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F4E5B2', margin: 0 }}>Featured result</p>
              <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1rem', color: '#F0EDE8', margin: '4px 0 0', letterSpacing: '-0.01em' }}>{project.result}</p>
            </div>
          </div>

          {/* Number watermark */}
          <div style={{
            position: 'absolute', bottom: '-8px', right: '20px',
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: '7rem', fontWeight: 700, lineHeight: 1,
            color: 'rgba(212,175,55,0.03)', pointerEvents: 'none', userSelect: 'none',
          }}>{projects.indexOf(project) + 1}</div>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <h3 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: '1.75rem', fontWeight: 400, color: '#F0EDE8', margin: 0,
              letterSpacing: '-0.025em',
            }}>
              {project.name}
            </h3>
            <span style={{
              fontFamily: "'Geist', system-ui, sans-serif",
              fontSize: '0.6875rem', color: '#374151', flexShrink: 0, marginLeft: '12px',
              fontWeight: 300,
            }}>
              {project.year}
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', flex: 1 }}>
            {[['Problem', project.problem], ['Solution', project.solution]].map(([label, text]) => (
              <div key={label}>
                <p style={{
                  fontFamily: "'Geist', system-ui, sans-serif",
                  fontSize: '0.5625rem', fontWeight: 600, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: '#374151', margin: '0 0 10px 0',
                }}>
                  {label}
                </p>
                <p style={{
                  fontFamily: "'Geist', system-ui, sans-serif",
                  fontSize: '0.9375rem', lineHeight: 1.75, color: '#6B7280', margin: 0, fontWeight: 300,
                }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Result — highlighted */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px',
            background: `linear-gradient(135deg, ${project.accent}08 0%, transparent 100%)`,
            margin: '0 -40px -44px', padding: '24px 40px 36px',
          }}>
            <span className="eyebrow" style={{ marginBottom: '10px', display: 'inline-flex', fontSize: '0.5625rem' }}>Result</span>
            <p style={{
              fontFamily: "'Geist', system-ui, sans-serif",
              fontSize: '0.9375rem', fontWeight: 500,
              color: project.accent,
              margin: '10px 0 0 0',
            }}>
              {project.result}
            </p>
          </div>
        </div>
      </motion.div>
    </a>
  )
}

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const heroRef = useRef(null)
  const gridRef = useRef(null)
  const ctaRef  = useRef(null)

  const filtered = active === 'All' ? projects : projects.filter(p => p.tags.includes(active))

  useEffect(() => {
    const triggers = []
    ;[heroRef, gridRef, ctaRef].forEach(r => {
      if (!r.current) return
      gsap.set(r.current, { opacity: 0, y: 48 })
      triggers.push(ScrollTrigger.create({
        trigger: r.current, start: 'top 86%', once: true,
        onEnter: () => gsap.to(r.current, { opacity: 1, y: 0, duration: 1.0, ease: 'back.out(1.2)', clearProps: 'transform' }),
      }))
    })
    return () => triggers.forEach(t => t.kill())
  }, [])

  return (
    <main>
      {/* ── Hero ── */}
      <section className="page-hero-section" style={{ backgroundColor: '#060810', padding: '160px 40px 120px', position: 'relative', overflow: 'hidden' }}>
        <div className="portfolio-blob" style={{ left: '8%', top: '15%', background: 'radial-gradient(circle, rgba(78,205,196,0.28) 0%, transparent 72%)' }} />
        <div className="portfolio-blob" style={{ right: '4%', bottom: '10%', background: 'radial-gradient(circle, rgba(230,60,109,0.24) 0%, transparent 72%)' }} />
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 65%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '0', left: '20%',
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
        }}>WORK</div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={heroRef} className="page-hero-layout" style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
            <div style={{ flex: '1 1 0', minWidth: 0 }}>
              <span className="eyebrow" style={{ marginBottom: '32px', display: 'inline-flex' }}>Portfolio</span>
              <h1 style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontWeight: 400,
                lineHeight: 0.95, letterSpacing: '-0.035em', color: '#F0EDE8',
                margin: '28px 0 32px 0', maxWidth: '640px',
              }}>
                Work that <em className="supporting-word">moved</em> the needle.
              </h1>
              <p className="supporting-line" style={{
                fontFamily: "'Geist', system-ui, sans-serif",
                maxWidth: '440px', margin: 0,
              }}>
                Real brands. Real work. Real results.
              </p>
            </div>
            <PortfolioHeroVisual />
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section style={{ backgroundColor: '#080B12', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '120px 40px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: [
            'linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 30%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 30%, black 20%, transparent 80%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={gridRef}>
            {/* Filter pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '72px' }}>
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  style={{
                    fontFamily: "'Geist', system-ui, sans-serif",
                    fontSize: '0.5625rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
                    padding: '10px 22px', borderRadius: '100px', cursor: 'pointer',
                    background: active === f ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.03)',
                    color: active === f ? '#D4AF37' : '#6B7280',
                    border: active === f ? '1px solid rgba(212,175,55,0.3)' : '1px solid rgba(255,255,255,0.07)',
                    boxShadow: active === f ? '0 0 24px rgba(212,175,55,0.12)' : 'none',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
              <AnimatePresence mode="popLayout">
                {filtered.map(p => <ProjectCard key={p.name} project={p} />)}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '96px 0' }}>
                <p style={{
                  fontFamily: "'Geist', system-ui, sans-serif",
                  fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: '#374151',
                }}>
                  No projects in this category yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: '#060810', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '120px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 65%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={ctaRef}>
              <h1 style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontWeight: 400,
                lineHeight: 0.95, letterSpacing: '-0.035em', color: '#F0EDE8',
                margin: '28px 0 12px 0', maxWidth: '640px',
              }}>
                Work that <span className="supporting-word">moved</span> the needle.
              </h1>
              <p className="supporting-line" style={{
                fontFamily: "'Geist', system-ui, sans-serif",
                maxWidth: '440px', margin: 0,
              }}>
                Real brands. Real work. Real results.
              </p>
          </div>
        </div>
      </section>
    </main>
  )
}
