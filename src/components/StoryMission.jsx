import { motion } from 'framer-motion'

const storyCapabilities = [
  { icon: 'target', label: 'STRATEGIC THINKING' },
  { icon: 'pencil', label: 'CREATIVE STORYTELLING' },
  { icon: 'gear', label: 'SMART TECHNOLOGY' },
  { icon: 'chart', label: 'PERFORMANCE THAT GROWS' },
]

function CapabilityIcon({ type }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.45,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true'
  }

  const icons = {
    target: (
      <svg {...common}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2" /><path d="M12 2 21 12 12 22 3 12Z" /></svg>
    ),
    pencil: (
      <svg {...common}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
    ),
    gear: (
      <svg {...common}><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" /><path d="M19.4 15a7.5 7.5 0 0 0 0-1l2.2-1.7-2-3.4-2.8 1a7.5 7.5 0 0 0-1.7-1L14 2h-4l-.9 2.9a7.5 7.5 0 0 0-1.7 1L4.6 3l-2 3.4L4.8 8a7.5 7.5 0 0 0 0 1l-2.2 1.7 2 3.4 2.8-1a7.5 7.5 0 0 0 1.7 1L10 22h4l.9-2.9a7.5 7.5 0 0 0 1.7-1l2.8 1 2-3.4Z" /></svg>
    ),
    chart: (
      <svg {...common}><path d="M4 19h16" /><path d="M5 17V9" /><path d="M10 17V5" /><path d="M15 17v-6" /></svg>
    )
  }

  return <span className="about-capability-icon">{icons[type] || icons.target}</span>
}

export default function StoryMission() {
  return (
    <section className="about-story-section">
      <div className="about-story-bg-orb" />

      <div className="container about-story-grid">
        <div className="about-story-content">
          <motion.div
            className="about-story-block"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="about-section-kicker">— THE STORY</span>
            <h2 className="about-story-title">
              Tech&Tales grew from a belief that <em>everything works together.</em>
            </h2>
            <div className="about-story-copy">
              <p>
                Tech&Tales started with a simple observation: too many businesses were working with disconnected partners and getting disconnected results. Their websites looked unfinished, brand voices felt inconsistent, and marketing activity rarely connected to real commercial goals.
              </p>
              <p>
                We created a studio that brings strategy, creative, content, and technology under one roof so growing brands can move faster, communicate more clearly, and convert with more confidence.
              </p>
            </div>

            <div className="about-capability-row">
              {storyCapabilities.map((cap) => (
                <div className="about-capability" key={cap.label}>
                  <span className="about-capability-round">
                    <CapabilityIcon type={cap.icon} />
                  </span>
                  <span className="about-capability-label">{cap.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="about-mission-content">
          <motion.div
            className="about-mission-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: 0.08, ease: 'easeOut' }}
          >
            <span className="about-section-kicker">— OUR MISSION</span>
            <div className="about-mission-card-inner">
              <span className="about-mission-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3 14 11l8 2-8 2-2 8-2-8-8-2 8-2Z" />
                  <path d="M12 3l1 4 4 1-4 1-1 4-1-4-4-1 4-1Z" />
                </svg>
              </span>
              <div className="about-mission-quote">
                <h3>
                  We want to make great marketing feel simpler. We help ambitious teams build brands, products, and digital growth systems that deliver measurable business outcomes.
                </h3>
              </div>
              <div className="about-mission-rule" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
