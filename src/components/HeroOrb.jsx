import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function fibonacciSphere(n, r) {
  const pts = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = golden * i
    pts.push({ x: Math.cos(theta) * radius * r, y: y * r, z: Math.sin(theta) * radius * r })
  }
  return pts
}

function project(x, y, z, cx, cy, fov = 420) {
  const scale = fov / (fov + z)
  return { px: cx + x * scale, py: cy + y * scale, scale }
}

function rotateY(x, y, z, a) {
  return { x: x * Math.cos(a) + z * Math.sin(a), y, z: -x * Math.sin(a) + z * Math.cos(a) }
}
function rotateX(x, y, z, a) {
  return { x, y: y * Math.cos(a) - z * Math.sin(a), z: y * Math.sin(a) + z * Math.cos(a) }
}

// Pre-compute static sphere points — reduced from 120 to 72 dots
const PTS3D = fibonacciSphere(72, 130)

// Pre-compute static particles
const PARTICLES = Array.from({ length: 40 }, () => ({
  x: Math.random() * 500,
  y: Math.random() * 500,
  r: Math.random() * 1.2 + 0.3,
  speed: Math.random() * 0.3 + 0.1,
  phase: Math.random() * Math.PI * 2,
}))

// Pre-compute ring points (static angles, only rotate on draw)
const RING_ANGLES = Array.from({ length: 60 }, (_, i) => (i / 60) * Math.PI * 2)

export default function HeroOrb() {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)
  const angleRef  = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    const W = canvas.width
    const H = canvas.height
    const cx = W / 2
    const cy = H / 2

    // Pre-allocate projected array to avoid GC pressure
    const projected = new Array(PTS3D.length)

    let lastTime = 0
    const TARGET_FPS = 30 // Orb only needs 30fps — imperceptible at this complexity
    const FRAME_MS = 1000 / TARGET_FPS

    const tick = (t) => {
      rafRef.current = requestAnimationFrame(tick)
      if (t - lastTime < FRAME_MS) return
      lastTime = t

      const time = t * 0.001
      angleRef.current = time * 0.18
      const tilt = Math.sin(time * 0.12) * 0.18

      ctx.clearRect(0, 0, W, H)

      // Particles — simple, no radial gradient per particle
      for (let i = 0; i < PARTICLES.length; i++) {
        const p = PARTICLES[i]
        const py = p.y + Math.sin(time * p.speed + p.phase) * 4
        const alpha = 0.12 + Math.sin(time * p.speed + p.phase) * 0.06
        ctx.beginPath()
        ctx.arc(p.x, py, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,168,76,${alpha.toFixed(2)})`
        ctx.fill()
      }

      const ang = angleRef.current

      // Ring 1
      ctx.beginPath()
      for (let i = 0; i < RING_ANGLES.length; i++) {
        const a = RING_ANGLES[i]
        let { x, y, z } = { x: Math.cos(a) * 155, y: 0, z: Math.sin(a) * 155 }
        ;({ x, y, z } = rotateX(x, y, z, 0.35))
        ;({ x, y, z } = rotateY(x, y, z, ang * 0.6))
        ;({ x, y, z } = rotateX(x, y, z, tilt))
        const p = project(x, y, z, cx, cy)
        if (i === 0) ctx.moveTo(p.px, p.py); else ctx.lineTo(p.px, p.py)
      }
      ctx.closePath()
      ctx.strokeStyle = 'rgba(201,168,76,0.18)'
      ctx.lineWidth = 0.8
      ctx.stroke()

      // Ring 2
      ctx.beginPath()
      for (let i = 0; i < RING_ANGLES.length; i++) {
        const a = RING_ANGLES[i]
        let { x, y, z } = { x: Math.cos(a) * 170, y: 0, z: Math.sin(a) * 170 }
        ;({ x, y, z } = rotateX(x, y, z, 1.1))
        ;({ x, y, z } = rotateY(x, y, z, -ang * 0.4))
        ;({ x, y, z } = rotateX(x, y, z, tilt))
        const p = project(x, y, z, cx, cy)
        if (i === 0) ctx.moveTo(p.px, p.py); else ctx.lineTo(p.px, p.py)
      }
      ctx.closePath()
      ctx.strokeStyle = 'rgba(120,100,220,0.12)'
      ctx.lineWidth = 0.6
      ctx.stroke()

      // Sphere dots — project and sort
      for (let i = 0; i < PTS3D.length; i++) {
        let { x, y, z } = PTS3D[i]
        ;({ x, y, z } = rotateY(x, y, z, ang))
        ;({ x, y, z } = rotateX(x, y, z, tilt))
        const proj = project(x, y, z, cx, cy)
        projected[i] = { ...proj, z }
      }
      projected.sort((a, b) => a.z - b.z)

      for (let i = 0; i < projected.length; i++) {
        const { px, py, scale, z } = projected[i]
        const depth = (z + 130) / 260
        const alpha = 0.08 + depth * 0.55
        const r = Math.max((0.8 + depth * 1.6) * scale, 0.5)

        // Only draw glow for top 20% front-facing dots (skip radial gradient for most)
        if (depth > 0.8) {
          const grd = ctx.createRadialGradient(px, py, 0, px, py, r * 3)
          grd.addColorStop(0, `rgba(201,168,76,${(alpha * 0.3).toFixed(2)})`)
          grd.addColorStop(1, 'rgba(201,168,76,0)')
          ctx.beginPath()
          ctx.arc(px, py, r * 3, 0, Math.PI * 2)
          ctx.fillStyle = grd
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fillStyle = depth > 0.6
          ? `rgba(232,201,106,${alpha.toFixed(2)})`
          : `rgba(201,168,76,${(alpha * 0.6).toFixed(2)})`
        ctx.fill()
      }

      // Wireframe lines — only draw between close dots, skip O(n²) for all pairs
      // Use spatial bucketing: only check neighbors within same depth band
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          // Early exit: if z difference is too large, skip (sorted by z)
          if (projected[j].z - projected[i].z > 40) break
          const dx = projected[i].px - projected[j].px
          const dy = projected[i].py - projected[j].py
          const dist2 = dx * dx + dy * dy
          if (dist2 < 38 * 38) {
            const dist = Math.sqrt(dist2)
            ctx.beginPath()
            ctx.moveTo(projected[i].px, projected[i].py)
            ctx.lineTo(projected[j].px, projected[j].py)
            ctx.strokeStyle = `rgba(201,168,76,${((1 - dist / 38) * 0.12).toFixed(2)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Glowing core
      const coreGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60)
      coreGrd.addColorStop(0, 'rgba(201,168,76,0.06)')
      coreGrd.addColorStop(0.5, 'rgba(100,80,200,0.04)')
      coreGrd.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, 60, 0, Math.PI * 2)
      ctx.fillStyle = coreGrd
      ctx.fill()
    }

    // Only start RAF when canvas is visible
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!rafRef.current) rafRef.current = requestAnimationFrame(tick)
      } else {
        if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
      }
    }, { threshold: 0 })
    observer.observe(canvas)

    return () => {
      observer.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full flex items-center justify-center"
      style={{ height: '500px' }}
    >
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.05) 0%, rgba(80,60,180,0.04) 40%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
    </motion.div>
  )
}
