import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const OVERLAY_KEY = 'techtales_intro_played'

export default function IntroLoader() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Respect reduced motion
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      sessionStorage.setItem(OVERLAY_KEY, '1')
      return
    }
    const played = sessionStorage.getItem(OVERLAY_KEY)
    if (played) return
    // show overlay briefly
    setShow(true)
  }, [])

  const handleComplete = () => {
    try { sessionStorage.setItem(OVERLAY_KEY, '1') } catch (e) {}
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: '#0A0E14', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          onAnimationComplete={() => { /* no-op */ }}
        >
          <motion.img
            src="/logo.png"
            alt="Tech&Tales"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: 'min(36vw, 240px)', height: 'auto', display: 'block' }}
            onAnimationComplete={() => {
              // hold then fade
              setTimeout(() => handleComplete(), 650)
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
