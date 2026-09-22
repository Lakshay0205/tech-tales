import { useEffect, useLayoutEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import IntroLoader from './components/IntroLoader'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import { getSafeClickLabel, trackEvent } from './analytics'

gsap.registerPlugin(ScrollTrigger)

const GA_MEASUREMENT_ID = 'G-1FRMZRZ1ZC'

function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target.closest?.('a, button')
      if (!target) return

      const href = target.getAttribute('href') || ''
      const label = getSafeClickLabel(target)
      const currentPage = window.location.pathname

      if (href.includes('wa.me')) {
        trackEvent('whatsapp_click', { page_path: currentPage, link_label: label })
      } else if (href.startsWith('mailto:')) {
        trackEvent('email_click', { page_path: currentPage, link_label: label })
      } else if (target.classList.contains('btn-primary')) {
        trackEvent('cta_click', { page_path: currentPage, cta_label: label })
      } else if (href.startsWith('http')) {
        trackEvent('external_link_click', { page_path: currentPage, link_label: label })
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    if (typeof window.gtag !== 'function') return

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: `${location.pathname}${location.search}`,
    })

    const startedAt = Date.now()
    const reached = new Set()
    let maxScrollDepth = 0
    let exitTracked = false
    const thresholds = [25, 50, 75, 90, 100]

    const sendExit = () => {
      if (exitTracked) return
      exitTracked = true
      trackEvent('page_exit', {
        page_path: location.pathname,
        engagement_time_seconds: Math.round((Date.now() - startedAt) / 1000),
        max_scroll_depth: maxScrollDepth,
      })
    }

    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const depth = scrollable > 0 ? Math.min(100, Math.round((window.scrollY / scrollable) * 100)) : 100
      maxScrollDepth = Math.max(maxScrollDepth, depth)
      thresholds.forEach(threshold => {
        if (depth >= threshold && !reached.has(threshold)) {
          reached.add(threshold)
          trackEvent('scroll_depth', { page_path: location.pathname, percent: threshold })
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('pagehide', sendExit)
    handleScroll()

    return () => {
      sendExit()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('pagehide', sendExit)
    }
  }, [location.pathname, location.search])

  return null
}

function ScrollManager() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      const previous = window.history.scrollRestoration
      window.history.scrollRestoration = 'manual'

      const resetScroll = () => {
        const root = document.scrollingElement || document.documentElement || document.body
        if (root) {
          root.scrollTop = 0
          root.scrollLeft = 0
        }
        document.documentElement.style.scrollBehavior = 'auto'
        document.body.style.scrollBehavior = 'auto'
        window.scrollTo(0, 0)
      }

      resetScroll()
      requestAnimationFrame(resetScroll)
      const timeoutId = window.setTimeout(() => {
        resetScroll()
        ScrollTrigger.getAll().forEach(instance => instance.refresh())
      }, 120)

      return () => {
        window.history.scrollRestoration = previous
        document.documentElement.style.scrollBehavior = ''
        document.body.style.scrollBehavior = ''
        window.clearTimeout(timeoutId)
      }
    }
  }, [pathname])

  return null
}

/* Static background — no CSS animations, no will-change on all 4 orbs */
function PageBackground() {
  return (
    <div className="page-bg">
      <div className="page-bg-orb-1" />
      <div className="page-bg-orb-2" />
      <div className="page-bg-grid" />
      <div className="page-bg-grain" />
    </div>
  )
}

const pageVariants = {
  initial: { opacity: 0 },
  enter:   { opacity: 1, transition: { duration: 0.16, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.08, ease: 'easeIn' } },
}

function PageFallback() {
  return <div style={{ minHeight: '100vh', backgroundColor: '#0A0E14' }} />
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ minHeight: '100vh' }}
      >
        <Routes location={location}>
          <Route path="/"          element={<Home />} />
          <Route path="/about"     element={<About />} />
          <Route path="/services"  element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pricing"   element={<Pricing />} />
          <Route path="/contact"   element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <IntroLoader />
      <PageBackground />
      <ScrollManager />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  )
}
