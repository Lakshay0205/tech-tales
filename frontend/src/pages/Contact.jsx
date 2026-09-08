import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ContactHeroVisual from '../components/ContactHeroVisual'

gsap.registerPlugin(ScrollTrigger)

const LABEL = {
  fontFamily: "'Geist', system-ui, sans-serif",
  fontSize: '0.5625rem', fontWeight: 600, letterSpacing: '0.2em',
  textTransform: 'uppercase', color: '#374151',
  display: 'block', marginBottom: '10px',
}

const INPUT_BASE = {
  width: '100%', boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px', padding: '16px 20px',
  color: '#F0EDE8', fontSize: '0.9375rem',
  fontFamily: "'Geist', system-ui, sans-serif",
  fontWeight: 300,
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
  outline: 'none',
}

const onFocus = (e) => {
  e.target.style.borderColor = 'rgba(212,175,55,0.4)'
  e.target.style.background  = 'rgba(212,175,55,0.02)'
  e.target.style.boxShadow   = '0 0 0 3px rgba(212,175,55,0.07)'
}
const onBlur = (e) => {
  e.target.style.borderColor = 'rgba(255,255,255,0.08)'
  e.target.style.background  = 'rgba(255,255,255,0.03)'
  e.target.style.boxShadow   = 'none'
}

function reveal(el, delay = 0) {
  if (!el) return null
  gsap.set(el, { opacity: 0, y: 48 })
  return ScrollTrigger.create({
    trigger: el, start: 'top 86%', once: true,
    onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1.0, ease: 'back.out(1.2)', delay, clearProps: 'transform' }),
  })
}

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', company: '', message: '', service: '' })
  const [status, setStatus] = useState('idle')

  const heroRef    = useRef(null)
  const formRef    = useRef(null)
  const sidebarRef = useRef(null)

  useEffect(() => {
    const triggers = []
    ;[heroRef, formRef, sidebarRef].forEach((r, i) => { const t = reveal(r.current, i * 0.1); if (t) triggers.push(t) })
    return () => triggers.forEach(t => t.kill())
  }, [])

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setStatus('sent'); setForm({ name: '', email: '', company: '', message: '', service: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <main>
      {/* ── Hero ── */}
      <section className="page-hero-section" style={{ backgroundColor: '#060810', padding: '160px 40px 120px', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-page-orb" style={{ right: '-2vw', top: '58%', width: '360px', height: '360px', opacity: 0.42 }} />
        <div className="page-ambient-orb page-ambient-orb--coral" style={{ left: '10%', bottom: '8%', width: '220px', height: '220px', opacity: 0.16 }} />
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
        }}>CONTACT</div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={heroRef} className="page-hero-layout" style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
            <div style={{ flex: '1 1 0', minWidth: 0 }}>
              <span className="eyebrow" style={{ marginBottom: '32px', display: 'inline-flex' }}>Contact</span>
              <h1 style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 'clamp(2rem, 7vw, 6.5rem)', fontWeight: 600,
                lineHeight: 0.95, letterSpacing: '-0.035em', color: '#F0EDE8',
                margin: '28px 0 32px 0', maxWidth: '720px',
              }}>
                Ready to be <span className="supporting-word">unforgettable</span>?
              </h1>
              <p className="supporting-line" style={{
                fontFamily: "'Geist', system-ui, sans-serif",
                maxWidth: '440px', margin: 0,
              }}>
                Got an idea? We'll turn it into something people can't ignore.
              </p>
            </div>
            <ContactHeroVisual />
          </div>
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section style={{ backgroundColor: '#080B12', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '120px 40px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: [
            'linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 30% 50%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 30% 50%, black 20%, transparent 80%)',
        }} />
        <div style={{
          position: 'absolute', top: '20%', right: '-5%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 65%)',
          filter: 'blur(70px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: '6%', top: '14%', width: '220px', height: '220px', borderRadius: '36% 64% 58% 42% / 30% 42% 58% 70%',
          background: 'linear-gradient(135deg, rgba(78,205,196,0.16), rgba(230,60,109,0.12))',
          filter: 'blur(12px)', opacity: 0.55, pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '88px', alignItems: 'start' }}>

            {/* Form */}
            <div ref={formRef}>
              {status === 'sent' ? (
                <>
                <div style={{
                  padding: '80px 52px', textAlign: 'center',
                  background: 'linear-gradient(145deg, rgba(17,21,32,0.88) 0%, rgba(11,15,26,0.94) 100%)',
                  borderRadius: '24px',
                  border: '1px solid rgba(212,175,55,0.2)',
                  boxShadow: '0 0 80px rgba(212,175,55,0.06)',
                }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 28px',
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M4 10l4 4 8-8" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '2rem', fontWeight: 400, color: '#F0EDE8', margin: '0 0 14px 0', letterSpacing: '-0.02em' }}>
                    Message received.
                  </p>
                  <p style={{ fontFamily: "'Geist', system-ui, sans-serif", fontSize: '0.9375rem', color: '#6B7280', margin: 0, fontWeight: 300 }}>
                    We'll be in touch within 24 hours.
                  </p>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <p className="supporting-line" style={{ textAlign: 'left' }}>
                    Prefer to talk directly? <a href="mailto:hello@techtales.in" style={{ color: '#E91E8C', textDecoration: 'none' }}>hello@techtales.in</a> · +91 9999999999
                  </p>
                </div>
                </>
              ) : (
                /* Glass form panel */
                <div style={{
                  padding: '48px 44px',
                  background: 'linear-gradient(145deg, rgba(17,21,32,0.7) 0%, rgba(11,15,26,0.8) 100%)',
                  borderRadius: '24px',
                  border: '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 0 60px rgba(212,175,55,0.04)',
                }}>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '22px' }}>
                      <div>
                        <label style={LABEL} htmlFor="name">Name *</label>
                        <input id="name" name="name" value={form.name} onChange={handleChange} required
                          placeholder="Your name" style={INPUT_BASE} onFocus={onFocus} onBlur={onBlur} />
                      </div>
                      <div>
                        <label style={LABEL} htmlFor="email">Email *</label>
                        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required
                          placeholder="your@email.com" style={INPUT_BASE} onFocus={onFocus} onBlur={onBlur} />
                      </div>
                    </div>

                    <div>
                      <label style={LABEL} htmlFor="company">Company / Brand</label>
                      <input id="company" name="company" value={form.company} onChange={handleChange}
                        placeholder="Your company name" style={INPUT_BASE} onFocus={onFocus} onBlur={onBlur} />
                    </div>

                    <div>
                      <label style={LABEL} htmlFor="service">Service Interested In</label>
                      <select id="service" name="service" value={form.service} onChange={handleChange}
                        style={{ ...INPUT_BASE, appearance: 'none' }} onFocus={onFocus} onBlur={onBlur}>
                        <option value="" style={{ background: '#080B12' }}>Select a service</option>
                        {['Website Development','E-commerce Setup','SEO','Analytics & Tracking','Chatbot Development','Automation','Branding','Social Media Management','Meta Ads','Video Editing','Full Package / Not Sure'].map(s => (
                          <option key={s} value={s} style={{ background: '#080B12' }}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={LABEL} htmlFor="message">Message *</label>
                      <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={5}
                        placeholder="Tell us about your project, goals, and timeline."
                        style={{ ...INPUT_BASE, resize: 'none' }} onFocus={onFocus} onBlur={onBlur} />
                    </div>

                    {status === 'error' && (
                      <p style={{ fontFamily: "'Geist', system-ui, sans-serif", fontSize: '0.8125rem', color: '#F87171', fontWeight: 400 }}>
                        Something went wrong. Try WhatsApp or email below.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-primary"
                      style={{
                        width: '100%', justifyContent: 'center',
                        opacity: status === 'sending' ? 0.6 : 1,
                        cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                        fontSize: '0.6875rem',
                      }}
                    >
                      {status === 'sending' ? 'Sending...' : 'START A CONVERSATION'}
                      {status !== 'sending' && (
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                          <path d="M1 10L10 1M10 1H3.5M10 1V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* Google Form fallback */}
              <div style={{ marginTop: '32px', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ ...LABEL, marginBottom: '14px' }}>Prefer Google Forms?</p>
                <a
                  href="https://forms.google.com"
                  target="_blank" rel="noreferrer"
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
                  Fill out our Google Form
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                    <path d="M1 10L10 1M10 1H3.5M10 1V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <div ref={sidebarRef} style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>

              {[
                {
                  label: 'Email',
                    content: (
                    <a href="mailto:hello@techtales.in" style={{
                      fontFamily: "'Geist', system-ui, sans-serif",
                      fontSize: '1rem', color: '#9CA3AF', textDecoration: 'none',
                      fontWeight: 300, transition: 'color 0.2s ease',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#D4AF37' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#9CA3AF' }}
                    >
                      hello@techtales.in
                    </a>
                  ),
                },
                {
                  label: 'WhatsApp',
                  content: (
                    <a
                      href="https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project."
                      target="_blank" rel="noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        fontFamily: "'Geist', system-ui, sans-serif",
                        fontSize: '1rem', color: '#9CA3AF', textDecoration: 'none',
                        fontWeight: 300, transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#D4AF37' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#9CA3AF' }}
                    >
                      Message us on WhatsApp
                      <svg width="10" height="10" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                        <path d="M1 10L10 1M10 1H3.5M10 1V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ),
                },
              ].map(({ label, content }) => (
                <div key={label}>
                  <span className="eyebrow" style={{ marginBottom: '14px', display: 'inline-flex', fontSize: '0.5625rem' }}>{label}</span>
                  <div style={{ marginTop: '14px' }}>{content}</div>
                </div>
              ))}

              <div style={{
                marginTop: '28px', padding: '24px 24px 26px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.22 }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <span className="eyebrow" style={{ marginBottom: '12px', display: 'inline-flex', fontSize: '0.5625rem' }}>Studio Note</span>
                  <p style={{ fontFamily: "'Geist', system-ui, sans-serif", fontSize: '0.875rem', color: '#F0EDE8', lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
                    We keep communication calm, clear, and direct — so your project feels supported from day one.
                  </p>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '44px' }}>
                <span className="eyebrow" style={{ marginBottom: '14px', display: 'inline-flex', fontSize: '0.5625rem' }}>Response Time</span>
                <p style={{
                  fontFamily: "'Geist', system-ui, sans-serif",
                  fontSize: '0.9375rem', color: '#6B7280', lineHeight: 1.78, margin: '14px 0 0 0', fontWeight: 300,
                }}>
                  We reply to all inquiries within 24 hours on business days. For urgent projects, WhatsApp is fastest.
                </p>
              </div>

              {/* Availability card — glass */}
              <div style={{
                padding: '32px 36px',
                background: 'linear-gradient(145deg, rgba(17,21,32,0.7) 0%, rgba(11,15,26,0.8) 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(212,175,55,0.12)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 0 40px rgba(212,175,55,0.04)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, right: 0, width: '120px', height: '120px',
                  background: 'radial-gradient(circle at 100% 0%, rgba(212,175,55,0.07) 0%, transparent 65%)',
                  pointerEvents: 'none',
                }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <span className="dot-live" />
                  <span className="eyebrow" style={{ fontSize: '0.5625rem' }}>Currently Available</span>
                </div>
                <p style={{
                  fontFamily: "'Geist', system-ui, sans-serif",
                  fontSize: '0.9375rem', color: '#F0EDE8', margin: 0, fontWeight: 300,
                }}>
                  Taking on 2 new clients this month.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
