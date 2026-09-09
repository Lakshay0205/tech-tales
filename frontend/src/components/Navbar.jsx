import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/',          label: 'Home'      },
  { to: '/about',     label: 'About'     },
  { to: '/services',  label: 'Services'  },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/pricing',   label: 'Pricing'   },
  { to: '/contact',   label: 'Contact'   },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { pathname }            = useLocation()
  const progressRef             = useRef(null)

  useEffect(() => {
    let ticking = false
    const fn = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        setScrolled(scrollY > 48)
        if (progressRef.current) {
          const docH = document.documentElement.scrollHeight - window.innerHeight
          const progress = docH > 0 ? scrollY / docH : 0
          progressRef.current.style.transform = `scaleX(${progress})`
        }
        ticking = false
      })
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
    }}>
      {/* Scroll progress */}
      <div ref={progressRef} className="nav-progress" />

      {/* Main bar */}
      <div className="site-nav-bar" style={{
        margin: scrolled ? '0' : '16px 24px 0',
        borderRadius: scrolled ? '0' : '20px',
        backgroundColor: scrolled ? 'rgba(6,8,16,0.95)' : 'rgba(6,8,16,0.72)',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'blur(14px)',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'blur(14px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
        border: scrolled ? undefined : '1px solid rgba(255,255,255,0.07)',
        boxShadow: scrolled
          ? '0 1px 0 rgba(255,255,255,0.03)'
          : '0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <nav className="site-nav" style={{
          maxWidth: '1280px', margin: '0 auto', padding: '0 28px',
          height: scrolled ? '64px' : '68px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'height 0.4s ease',
        }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            <img src="/logo-icon.png" alt="Tech&Tales Logo" style={{ height: scrolled ? 40 : 44, width: 'auto', display: 'block' }} />
            <span style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: '1.38rem', fontWeight: 500,
              color: '#F0EDE8', letterSpacing: '-0.02em', lineHeight: 1,
            }}>
              Tech<span style={{
                background: 'linear-gradient(135deg, #E8D5A3, #C9A84C)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>&Tales</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden-mobile" style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            listStyle: 'none', margin: 0, padding: 0,
          }}>
            {links.map(({ to, label }) => {
              const active = pathname === to
              return (
                <li key={to}>
                  <Link
                    to={to}
                    style={{
                      position: 'relative',
                      display: 'inline-flex', alignItems: 'center',
                      padding: '8px 14px',
                      fontFamily: "'Geist', system-ui, sans-serif",
                      fontSize: '0.8125rem', fontWeight: active ? 500 : 400,
                      color: active ? '#F0EDE8' : '#6B7280',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      transition: 'color 0.2s ease, background 0.2s ease',
                      background: active ? 'rgba(255,255,255,0.05)' : 'transparent',
                    }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.color = '#C8C4BC'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' } }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.background = 'transparent' } }}
                  >
                    {label}
                    {active && (
                      <span style={{
                        position: 'absolute', bottom: '4px', left: '50%',
                        transform: 'translateX(-50%)',
                        width: '16px', height: '1px',
                        background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
                        borderRadius: '1px',
                      }} />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Desktop CTA */}
          <Link
            to="/contact"
            className="hidden-mobile btn-primary"
            style={{ fontSize: '0.625rem', padding: '12px 24px' }}
          >
            Book Free Call
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="show-mobile"
            style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column',
              gap: '4px', cursor: 'pointer', width: '44px', height: '44px',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 5 : 0 }}
              style={{ display: 'block', width: '16px', height: '1px', backgroundColor: '#F0EDE8', transformOrigin: 'center' }} />
            <motion.span animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
              style={{ display: 'block', width: '16px', height: '1px', backgroundColor: '#F0EDE8' }} />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -5 : 0 }}
              style={{ display: 'block', width: '16px', height: '1px', backgroundColor: '#F0EDE8', transformOrigin: 'center' }} />
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 40,
                border: 'none', background: 'rgba(3, 5, 10, 0.6)',
                backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
                cursor: 'pointer',
              }}
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(82vw, 320px)',
                zIndex: 45, background: 'rgba(7,10,17,0.98)',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '-24px 0 60px rgba(0,0,0,0.45)',
                padding: '96px 18px 24px',
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}
            >
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {links.map(({ to, label }, i) => (
                  <motion.li
                    key={to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <Link
                      to={to}
                      onClick={() => setOpen(false)}
                      style={{
                        display: 'block', padding: '14px 14px', borderRadius: '12px',
                        fontFamily: "'Geist', system-ui, sans-serif",
                        fontSize: '0.9375rem', fontWeight: 400,
                        color: pathname === to ? '#C9A84C' : '#D6D1C8',
                        textDecoration: 'none',
                        background: pathname === to ? 'rgba(201,168,76,0.06)' : 'transparent',
                        border: pathname === to ? '1px solid rgba(201,168,76,0.18)' : '1px solid transparent',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                style={{ marginTop: '18px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '18px' }}
              >
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.625rem' }}
                >
                  Book Free Call
                </Link>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
