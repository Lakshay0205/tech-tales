import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PLACEHOLDERS = [
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
  'linear-gradient(135deg, #0d1b2a 0%, #1b2838 40%, #2d4a22 100%)',
  'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 40%, #4a1942 100%)',
]

const projects = [
  {
    name: 'Terravik',
    built: 'Brand identity + full website with lead capture system',
    bg: PLACEHOLDERS[0],
  },
  {
    name: 'Hawai Agro',
    built: 'E-commerce store + SEO foundation + WhatsApp automation',
    bg: PLACEHOLDERS[1],
  },
  {
    name: 'TAAR',
    built: 'Unified brand system + social media content engine',
    bg: PLACEHOLDERS[2],
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    // Set clipPath via GSAP — NOT as inline style — so the card occupies full layout space always
    gsap.set(card, { clipPath: 'inset(0 100% 0 0)' })

    gsap.to(card, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.9,
      ease: 'power3.inOut',
      delay: index * 0.18,
      clearProps: 'clipPath',
      scrollTrigger: { trigger: card, start: 'top 85%', once: true },
    })
  }, [index])

  return (
    <div
      ref={cardRef}
      data-cursor="view"
      className="group relative overflow-hidden rounded-xl"
      style={{ aspectRatio: '4/3' }}
    >
      {/* Background image / placeholder */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
        style={{ background: project.bg }}
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Project name badge */}
      <div className="absolute top-6 left-6 z-10">
        <span
          className="text-[10px] font-semibold tracking-[0.25em] uppercase px-2.5 py-1"
          style={{
            background: 'rgba(0,0,0,0.4)',
            color: '#C9A84C',
            borderRadius: '4px',
            border: '1px solid rgba(201,168,76,0.2)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {project.name}
        </span>
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-7"
        style={{
          background: 'linear-gradient(to top, rgba(5,5,15,0.95) 0%, rgba(5,5,15,0.6) 50%, transparent 100%)',
        }}
      >
        <h3 className="font-display text-2xl font-semibold text-[#F0EDE6] mb-1.5">{project.name}</h3>
        <p className="text-[#9A9AB8] text-sm leading-snug mb-4">{project.built}</p>
        <Link
          to="/portfolio"
          data-cursor="hover"
          className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest uppercase text-[#C9A84C] group/link w-fit"
        >
          View Project
          <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  )
}

export default function FeaturedWork() {
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
    <section className="py-28 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div ref={headRef} className="flex items-end justify-between mb-14">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C9A84C] mb-3">Featured Work</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#F0EDE6]">Recent projects.</h2>
          </div>
          <Link
            to="/portfolio"
            data-cursor="hover"
            className="hidden md:block text-[12px] font-medium tracking-widest uppercase text-[#7A7A9A] hover:text-[#C9A84C] transition-colors duration-200"
          >
            View all →
          </Link>
        </div>

        {/* Grid — cards always occupy their layout space, clip-path only affects visibility */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
