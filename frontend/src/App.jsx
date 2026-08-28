import { useEffect } from 'react'
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

gsap.registerPlugin(ScrollTrigger)

function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      const refresh = () => ScrollTrigger.refresh(true)
      if ('requestIdleCallback' in window) {
        const idleId = window.requestIdleCallback(refresh)
        return () => window.cancelIdleCallback?.(idleId)
      }
      const timeoutId = window.setTimeout(refresh, 80)
      return () => window.clearTimeout(timeoutId)
    })
    return () => cancelAnimationFrame(frame)
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
  enter:   { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.2,  ease: 'easeIn'  } },
}

function PageFallback() {
  return <div style={{ minHeight: '100vh', backgroundColor: '#0A0E14' }} />
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="sync">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="enter" exit="exit">
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
      <IntroLoader />
      <PageBackground />
      <ScrollManager />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  )
}
