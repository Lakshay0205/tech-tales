import { Link } from 'react-router-dom'
import { Lightbulb, Megaphone, Camera, Target, Code2, ShoppingCart, Search, Settings, Sparkles } from 'lucide-react'
import HeroAbout from '../components/HeroAbout'
import StoryMission from '../components/StoryMission'
import Reveal from '../components/Reveal'
import AashnaPhoto from '../../aashnaa.jpeg'
import LakshayPhoto from '../../lakshay.jpeg'

const BODY = {
  fontFamily: "'Geist', system-ui, sans-serif",
  fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)',
  lineHeight: 1.8, color: '#6B7280', margin: 0, fontWeight: 300,
}

const team = [
  {
    name: 'Lakshay Sharma',
    role: 'Technology & Digital',
    accent: '#D4AF37',
    accentSoft: 'rgba(212,175,55,0.14)',
    avatar: LakshayPhoto,
    bio: 'Product-focused engineer who builds websites, e-commerce systems and automation that keep creative strategy moving fast and measurable for growing businesses.',
    skills: [
      { label: 'Website Development', Icon: Code2 },
      { label: 'E-commerce', Icon: ShoppingCart },
      { label: 'SEO & Analytics', Icon: Search },
      { label: 'Automation', Icon: Settings },
    ],
  },
  {
    name: 'Aashna Agarwal',
    role: 'Creative & Digital Marketing',
    accent: '#E63C6D',
    accentSoft: 'rgba(230,60,109,0.14)',
    avatar: AashnaPhoto,
    bio: 'Creative strategist and digital marketer who turns brand positioning into visual systems, social content and customer-facing campaigns that build trust and momentum for ambitious brands.',
    skills: [
      { label: 'Creative Direction', Icon: Lightbulb },
      { label: 'Digital Marketing', Icon: Megaphone },
      { label: 'Social Media', Icon: Camera },
      { label: 'Brand Strategy', Icon: Target },
    ],
  },
]

export default function About() {
  return (
    <main>
      <HeroAbout />
      {/* Decorative low-opacity logo watermark behind About hero */}
      <div style={{ position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 0 }}>
        <img src="/logo.png" alt="" style={{ width: 'min(60vw, 520px)', opacity: 0.06, display: 'block' }} />
      </div>
      <StoryMission />

      {/* ── Founders ── */}
      <section className="about-team-section">
        <div className="about-team-decor" aria-hidden="true" />

        <div className="container about-team-wrapper">
          <div className="about-team-eyebrow-row">
            <span className="about-team-eyebrow">— MEET THE FOUNDERS</span>
            <span className="about-team-eyebrow-rule" />
          </div>

          <h2 className="about-team-headline">
            <span>The people behind </span>
            <span className="about-team-headline-accent">the ideas, the strategy,</span>
            <span> and the work.</span>
          </h2>

          <p className="about-team-intro">
            Lakshay turns every concept into websites, automation and measurable growth engines, while Aashna brings creative systems, campaigns and customer-facing storytelling. Together they keep strategy, design and technology aligned so the work feels beautiful and performs from day one.
          </p>

          <Reveal stagger className="about-founders-grid">
            {team.map((member) => (
              <div key={member.name} className="about-founder-card" style={{ borderColor: member.accentSoft, boxShadow: `0 0 0 1px ${member.accentSoft}, 0 32px 90px rgba(0,0,0,0.45)` }}>
                <div className="about-founder-photo" style={{ backgroundImage: `url(${member.avatar})` }}>
                  <div className="about-founder-photo-overlay" />
                </div>
                <div className="about-founder-text" style={{ borderLeftColor: member.accentSoft }}>
                  <div>
                    <h3>{member.name}</h3>
                    <span style={{ color: member.accent }}>{member.role}</span>
                  </div>
                  <div className="about-founder-divider" />
                  <p style={BODY}>{member.bio}</p>
                  <div className="about-founder-skill-grid">
                    {member.skills.map(({ label, Icon }) => (
                      <div key={label} className="about-founder-tag" style={{ borderColor: member.accent, color: member.accent }}>
                        <Icon size={16} />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="about-team-tagline" delay={0.1}>
            <div className="about-team-tagline-inner">
              <div className="about-team-tagline-icon"><Sparkles size={20} /></div>
              <h3>Two different strengths. One shared goal.</h3>
              <p>Building digital work that makes a real difference to your brand.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" style={{ backgroundColor: '#080B12', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '120px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 65%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <span className="eyebrow" style={{ marginBottom: '28px', display: 'inline-flex', justifyContent: 'center' }}>Work With Us</span>
            <h2 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300,
              lineHeight: 1.1, letterSpacing: '-0.025em', color: '#F0EDE8',
              maxWidth: '680px', margin: '20px auto 20px',
            }}>
              Think we could build something Great together?
            </h2>
            <p className="supporting-line" style={{ maxWidth: '520px', margin: '0 auto 44px', fontFamily: "'Geist', system-ui, sans-serif" }}>
              Bring us your goals, challenges, or even just an idea. We’ll bring the strategy, creativity, and expertise to move it forward.
            </p>
            <Link to="/contact" className="btn-primary">
              LET’S TALK →
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path d="M1 10L10 1M10 1H3.5M10 1V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
