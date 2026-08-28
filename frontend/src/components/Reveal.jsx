import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Reveal({
  children,
  y = 48,
  x = 0,
  delay = 0,
  duration = 0.9,
  stagger = false,
  className = '',
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = stagger ? Array.from(el.children) : [el]

    gsap.set(targets, { opacity: 0, y, x })

    const triggers = []

    gsap.to(targets, {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      stagger: stagger ? 0.1 : 0,
      ease: 'power3.out',
      clearProps: 'transform',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
        onToggle: self => triggers.push(self),
      },
    })

    // Only kill the ScrollTriggers this instance created
    return () => triggers.forEach(t => t.kill())
  }, [y, x, delay, duration, stagger])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
