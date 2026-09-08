import { motion } from 'framer-motion'
import HeroVisual from './HeroVisual'

const stats = [
  { value: '01', label: 'UNIFIED TEAM' },
  { value: '360°', label: 'DIGITAL EXPERTISE' },
  { value: '100%', label: 'FOCUSED ON RESULTS' },
]

export default function HeroAbout() {
  return (
    <section className="about-hero-section">
      <div className="about-hero-orb about-hero-orb-one" />
      <div className="about-hero-orb about-hero-orb-two" />
      <div className="about-watermark">ABOUT</div>

      <div className="container about-hero-content">
        <div className="about-hero-layout">
          <div className="about-hero-copy">
            <motion.div
              className="about-kicker-wrap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            >
              <span className="about-kicker-rule" />
              <span className="about-kicker">ABOUT US</span>
            </motion.div>

            <motion.h1
              className="about-hero-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.78, ease: 'easeOut' }}
            >
              <span className="about-hero-title-gold about-hero-title-remembered about-hero-title-line">It's about being remembered.</span>
            </motion.h1>

            <motion.p
              className="about-hero-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.72, delay: 0.06, ease: 'easeOut' }}
            >
              We pair creative clarity with digital execution so the right people recognise your brand, trust it, and choose it.
            </motion.p>

            <motion.div
              className="about-hero-stats"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.82, delay: 0.1, ease: 'easeOut' }}
            >
              {stats.map((s, index) => (
                <div className="about-stat" key={s.label}>
                  <div className="about-stat-value">{s.value}</div>
                  <div className="about-stat-label">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="page-hero-visual"
            initial={{ opacity: 0, scale: 0.96, y: 28 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <HeroVisual />
          </motion.div>
        </div>

        <motion.div
          className="about-scroll-cue"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.62, delay: 0.3, ease: 'easeOut' }}
        >
          <span className="about-scroll-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14M5 16l7 7 7-7" />
            </svg>
          </span>
          <span className="about-scroll-line" />
        </motion.div>
      </div>
    </section>
  )
}
