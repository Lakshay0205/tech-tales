import { useRef } from 'react'
import { motion } from 'framer-motion'

// Tilt via direct DOM mutation — no React state re-renders on mousemove
export default function ServiceIcon3D({ icon, label, delay = 0 }) {
  const ref     = useRef(null)
  const iconRef = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    el.style.transform = `perspective(600px) rotateX(${y * -18}deg) rotateY(${x * 18}deg) translateZ(8px)`
    if (iconRef.current) iconRef.current.style.transform = 'translateZ(6px)'
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    if (iconRef.current) iconRef.current.style.transform = 'translateZ(0px)'
  }

  const handleEnter = () => {
    const el = ref.current
    if (!el) return
    el.style.background = 'linear-gradient(145deg, #1E1E38 0%, #16162A 100%)'
    el.style.boxShadow  = '0 2px 0 0 rgba(255,255,255,0.07) inset, 0 -2px 0 0 rgba(0,0,0,0.5) inset, 0 20px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.2), 0 0 24px rgba(201,168,76,0.1)'
    if (iconRef.current) {
      iconRef.current.style.background = 'linear-gradient(135deg, rgba(201,168,76,0.2) 0%, rgba(100,80,200,0.15) 100%)'
      iconRef.current.style.boxShadow  = '0 0 20px rgba(201,168,76,0.25), 0 4px 12px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.1) inset'
      iconRef.current.style.color      = '#E8C96A'
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        transition: 'transform 0.18s ease, box-shadow 0.28s ease, background 0.28s ease',
        transformStyle: 'preserve-3d',
        background: 'linear-gradient(145deg, #16162A 0%, #111120 100%)',
        borderRadius: '14px',
        boxShadow: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 -1px 0 0 rgba(0,0,0,0.4) inset, 0 8px 24px rgba(0,0,0,0.45)',
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        position: 'relative',
      }}
    >
      <div
        ref={iconRef}
        style={{
          width: 48, height: 48, borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(100,80,200,0.08) 100%)',
          boxShadow: '0 0 12px rgba(201,168,76,0.1), 0 4px 8px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.06) inset',
          transition: 'all 0.28s ease',
          color: '#C9A84C',
        }}
      >
        {icon}
      </div>

      <span style={{
        fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em',
        textAlign: 'center', lineHeight: 1.3, color: '#9090B0',
        transition: 'color 0.2s ease',
        fontFamily: 'Inter, sans-serif',
      }}>
        {label}
      </span>

      <div style={{
        position: 'absolute', bottom: 0, left: '20%', right: '20%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)',
        borderRadius: '1px',
        transition: 'all 0.3s ease',
      }} />
    </motion.div>
  )
}
