import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const tech = [
  'Website Development & Maintenance',
  'E-commerce Setup',
  'SEO (On-Page + Technical)',
  'Analytics & Tracking',
  'Chatbot Development',
  'Automation (Email / WhatsApp)',
]

const creative = [
  'Branding & Creative Design',
  'Social Media Management',
  'Meta Ads',
  'Video Editing',
]

const showcaseImage = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80'

function ServiceLine({ label }) {
  return (
    <div
      className="group flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200"
      style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(201,168,76,0.06)'
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.18)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
      }}
    >
      <span className="text-[#D8D8E8] text-sm leading-snug transition-transform duration-200 group-hover:translate-x-1">
        {label}
      </span>
      <span className="text-[#C9A84C] text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-3 flex-shrink-0">
        →
      </span>
    </div>
  )
}

function Cluster({ label, services, fromX, linkTo }) {
  const cardRef = useRef(null)
  const linesRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const lines = linesRef.current
    if (!card || !lines) return

    // Set initial state explicitly before ScrollTrigger fires
    gsap.set(card, { opacity: 0, x: fromX, rotate: fromX > 0 ? 2 : -2 })

    gsap.to(card, {
      opacity: 1, x: 0, rotate: 0,
      duration: 0.9, ease: 'power3.out',
      // clearProps resets transform after animation so layout is clean
      clearProps: 'transform',
      scrollTrigger: { trigger: card, start: 'top 85%', once: true },
    })

    // Set service lines initial state
    const lineEls = Array.from(lines.children)
    gsap.set(lineEls, { opacity: 0, y: 14 })

    gsap.to(lineEls, {
      opacity: 1, y: 0,
      duration: 0.5, ease: 'power2.out',
      stagger: 0.06,
      clearProps: 'transform',
      scrollTrigger: { trigger: lines, start: 'top 82%', once: true },
    })
  }, [fromX])

  return (
    <div
      ref={cardRef}
      className="p-8 flex flex-col gap-5"
      style={{
        background: 'linear-gradient(145deg, #16162A 0%, #111120 100%)',
        borderRadius: '12px',
        boxShadow: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#E63C6D]">{label}</p>
      <div ref={linesRef} className="flex flex-col gap-2">
        {services.map(s => <ServiceLine key={s} label={s} />)}
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          data-cursor="hover"
          className="relative inline-block mt-2 text-[12px] font-semibold tracking-widest uppercase text-[#C9A84C] w-fit group"
        >
          See All Services →
          <span
            className="absolute left-0 bottom-0 h-px bg-[#C9A84C] w-0 group-hover:w-full"
            style={{ transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)' }}
          />
        </Link>
      )}
    </div>
  )
}

export default function WhatWeDo() {
  const headRef = useRef(null)

  useEffect(() => {
    if (!headRef.current) return
    gsap.set(headRef.current, { opacity: 0, y: 32 })
    gsap.to(headRef.current, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      clearProps: 'transform',
      scrollTrigger: { trigger: headRef.current, start: 'top 88%', once: true },
    })
  }, [])

  return (
    <section className="py-28 border-t border-white/[0.05] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(230,60,109,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(78,205,196,0.12),transparent_32%)]" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div ref={headRef} className="mb-14">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#E63C6D] mb-3">What We Do</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-[#F0EDE6] max-w-xl">
            Nine services. Two founders. Zero middlemen.
          </h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6 items-start">
          <div className="rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <div className="relative overflow-hidden rounded-[22px]">
              <img src={showcaseImage} alt="Workspace with laptop and design materials" className="h-[420px] w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(4,6,8,0.1),rgba(4,6,8,0.5))]" />
              <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4ECDC4] backdrop-blur">
                Live workspace
              </div>
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#F4E5B2]">Included in every engagement</p>
                <p className="mt-2 text-sm text-[#F0EDE6]">Design, build, launch, and optimize — all under one roof.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <Cluster label="Tech & Development" services={tech} fromX={-80} />
            <Cluster label="Creative & Marketing" services={creative} fromX={80} linkTo="/services" />
          </div>
        </div>
      </div>
    </section>
  )
}
