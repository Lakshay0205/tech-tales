import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ULink({ to, href, children, external = false }) {
  const ref = useRef(null)
  const props = {
    ref,
    'data-cursor': 'hover',
    style: {
      fontFamily: "'Geist', system-ui, sans-serif",
      fontSize: '0.875rem', fontWeight: 300,
      color: '#6B7280', textDecoration: 'none',
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      transition: 'color 0.2s ease',
    },
    onMouseEnter: e => { e.currentTarget.style.color = '#C9A84C' },
    onMouseLeave: e => { e.currentTarget.style.color = '#6B7280' },
  }
  if (href) return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} {...props}>{children}</a>
  return <Link to={to} {...props}>{children}</Link>
}

const navLinks = [['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/portfolio', 'Portfolio'], ['/pricing', 'Pricing'], ['/contact', 'Contact']]

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    if (!footerRef.current) return
    gsap.set(footerRef.current, { opacity: 0 })
    ScrollTrigger.create({
      trigger: footerRef.current, start: 'top 92%', once: true,
      onEnter: () => gsap.to(footerRef.current, { opacity: 1, duration: 0.8, ease: 'power2.out' }),
    })
  }, [])

  return (
    <footer ref={footerRef} style={{
      position: 'relative', overflow: 'hidden',
      backgroundColor: '#040608',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      opacity: 0,
    }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.12, backgroundImage: 'url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(1)', pointerEvents: 'none' }} />

      {/* Glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '900px', height: '500px',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.09) 0%, rgba(99,102,241,0.03) 40%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Big background text */}
      <div style={{
        position: 'absolute', bottom: '-8%', left: '50%', transform: 'translateX(-50%)',
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: 'clamp(8rem, 22vw, 22rem)', fontWeight: 700,
        color: 'rgba(201,168,76,0.025)', whiteSpace: 'nowrap',
        pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.05em', lineHeight: 1,
        zIndex: 0,
      }}>
        Tech&Tales
      </div>

      <div className="container footer-shell" style={{ position: 'relative', zIndex: 1, padding: '100px 40px 0' }}>

        {/* Top section */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '64px', marginBottom: '80px' }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <img className="footer-brand-logo" src="/logo.png" alt="Tech&Tales" style={{ height: 72, width: 'auto', display: 'block' }} />
              <div>
                <span style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '1.375rem', fontWeight: 500, color: '#F0EDE8', letterSpacing: '-0.02em',
                }}>
                  Tech<span style={{
                    background: 'linear-gradient(135deg, #E8D5A3, #C9A84C)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>&Tales</span>
                </span>
                <div style={{
                  width: '5px', height: '5px', borderRadius: '50%',
                  background: 'radial-gradient(circle, #E8D5A3, #C9A84C)',
                  boxShadow: '0 0 8px rgba(201,168,76,0.7)', flexShrink: 0,
                  marginTop: '6px'
                }} />
              </div>
            </div>
            <p style={{
              fontFamily: "'Geist', system-ui, sans-serif",
              fontSize: '0.875rem', color: '#374151', lineHeight: 1.7,
              maxWidth: '240px', fontWeight: 300,
            }}>
              A two-founder studio that builds and markets — engineering meets creativity, under one roof.
            </p>

            {/* Availability badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              marginTop: '24px', padding: '8px 14px',
              background: 'rgba(74,222,128,0.06)',
              border: '1px solid rgba(74,222,128,0.15)',
              borderRadius: '100px',
            }}>
              <span className="dot-live" />
              <span style={{
                fontFamily: "'Geist', system-ui, sans-serif",
                fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'rgba(74,222,128,0.8)',
              }}>
                Available for projects
              </span>
            </div>
          </div>

          {/* Pages */}
          <div>
            <span style={{
              fontFamily: "'Geist', system-ui, sans-serif",
              fontSize: '0.5625rem', fontWeight: 600, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#374151',
              display: 'block', marginBottom: '24px',
            }}>
              Pages
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {navLinks.map(([to, label]) => (
                <li key={to}><ULink to={to}>{label}</ULink></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span style={{
              fontFamily: "'Geist', system-ui, sans-serif",
              fontSize: '0.5625rem', fontWeight: 600, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#374151',
              display: 'block', marginBottom: '24px',
            }}>
              Get in Touch
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li><ULink href="mailto:slakshay1002@gmail.com">slakshay1002@gmail.com</ULink></li>
              <li>
                <ULink href="https://wa.me/919910882929" external>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.6 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </ULink>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <span style={{
              fontFamily: "'Geist', system-ui, sans-serif",
              fontSize: '0.5625rem', fontWeight: 600, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#374151',
              display: 'block', marginBottom: '24px',
            }}>
              Follow
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li>
                <ULink href="https://instagram.com/techtales.in" external>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                  Instagram
                </ULink>
              </li>
              <li>
                <ULink href="https://linkedin.com/company/techtales-in" external>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </ULink>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)', marginBottom: '32px' }} />

        {/* Bottom bar */}
        <div className="footer-bottom" style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: '16px',
          paddingBottom: '40px',
        }}>
          <p style={{
            fontFamily: "'Geist', system-ui, sans-serif",
            fontSize: '0.6875rem', fontWeight: 400,
            letterSpacing: '0.08em', color: '#1F2937',
          }}>
            © 2025 Ashnalakshay. All rights reserved.
          </p>
          <p style={{
            fontFamily: "'Geist', system-ui, sans-serif",
            fontSize: '0.6875rem', fontWeight: 400,
            letterSpacing: '0.08em', color: '#1F2937',
          }}>
            Built by the founders.
          </p>
        </div>
      </div>
    </footer>
  )
}
