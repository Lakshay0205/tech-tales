/* PricingHeroVisual — 3 floating tier cards in perspective stack
   Represents: transparent pricing, value tiers, clear investment
   Distinct from: Home crystal, About sphere-rings, Services triskelion, Portfolio film-strip
*/
export default function PricingHeroVisual() {
  const tiers = [
    { name: 'Launch',   tagline: 'From clarity to go-live.',       accent: '#E63C6D', rgb: '230,60,109', icon: 'rocket',  z: 1 },
    { name: 'Growth',   tagline: 'Strategy + execution.',          accent: '#D4AF37', rgb: '212,175,55', icon: 'chart',   z: 3, featured: true },
    { name: 'Retainer', tagline: 'Ongoing momentum.',              accent: '#4ECDC4', rgb: '78,205,196', icon: 'refresh', z: 2 },
  ]

  const icons = {
    rocket: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
    chart: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    refresh: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
        <path d="M8 16H3v5"/>
      </svg>
    ),
  }

  return (
    <aside className="prvhv-col" aria-hidden="true">
      <style>{`
        .prvhv-col {
          flex: 0 0 460px; width: 460px;
          display: flex; align-items: center; justify-content: center;
        }
        @media (max-width: 1100px) { .prvhv-col { flex: 0 0 360px; width: 360px; } }
        @media (max-width: 860px)  { .prvhv-col { display: none; } }

        .prvhv-wrap {
          position: relative;
          width: clamp(300px, 36vw, 420px);
          height: clamp(360px, 44vw, 480px);
          display: flex; align-items: center; justify-content: center;
        }

        .prvhv-ambient {
          position: absolute; inset: -15%; border-radius: 50%;
          background: radial-gradient(ellipse at 50% 50%,
            rgba(212,175,55,0.11) 0%,
            rgba(230,60,109,0.06) 40%,
            transparent 70%);
          filter: blur(48px); pointer-events: none;
          animation: prvhv-ambient 7s ease-in-out infinite;
        }

        .prvhv-floater {
          animation: prvhv-float 6s ease-in-out infinite;
          position: relative; width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
        }

        /* Perspective stack container */
        .prvhv-stack {
          position: relative; width: 100%; height: 100%;
          perspective: 900px;
          display: flex; align-items: center; justify-content: center;
        }

        /* Individual tier cards */
        .prvhv-card {
          position: absolute;
          width: 72%;
          border-radius: 18px;
          padding: 22px 24px;
          display: flex; flex-direction: column; gap: 12px;
          border: 1px solid rgba(255,255,255,0.07);
          background: linear-gradient(145deg, rgba(17,21,32,0.92), rgba(11,15,26,0.96));
          overflow: hidden;
        }
        .prvhv-card--left {
          left: 2%; top: 50%;
          transform: translateY(-50%) rotateY(18deg) rotateX(4deg) translateZ(-40px) translateX(-8px);
          opacity: 0.65;
          border-color: rgba(230,60,109,0.18);
          animation: prvhv-card-left 6s ease-in-out infinite;
          z-index: 1;
        }
        .prvhv-card--center {
          left: 50%; top: 50%;
          transform: translateX(-50%) translateY(-50%) rotateX(6deg) translateZ(20px);
          border-color: rgba(212,175,55,0.32);
          box-shadow: 0 32px 80px rgba(0,0,0,0.55), 0 0 60px rgba(212,175,55,0.08);
          z-index: 3;
          animation: prvhv-card-center 6s ease-in-out infinite 0.5s;
        }
        .prvhv-card--right {
          right: 2%; top: 50%;
          transform: translateY(-50%) rotateY(-18deg) rotateX(4deg) translateZ(-40px) translateX(8px);
          opacity: 0.65;
          border-color: rgba(78,205,196,0.18);
          animation: prvhv-card-right 6s ease-in-out infinite 0.25s;
          z-index: 2;
        }

        /* Card inner elements */
        .prvhv-card-icon {
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .prvhv-card-name {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.1rem; font-weight: 500;
          letter-spacing: -0.02em; color: #F0EDE8;
          margin: 0;
        }
        .prvhv-card-tagline {
          font-family: 'Geist', system-ui, sans-serif;
          font-size: 0.55rem; font-weight: 400;
          letter-spacing: 0.04em; color: #4B5563;
          margin: 0;
        }
        .prvhv-card-price {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.6rem; font-weight: 300;
          letter-spacing: -0.03em;
          margin: 4px 0 0;
        }
        .prvhv-card-divider {
          height: 1px; border: none; margin: 4px 0;
        }
        .prvhv-card-dots {
          display: flex; flex-direction: column; gap: 7px;
        }
        .prvhv-card-dot-row {
          display: flex; align-items: center; gap: 8px;
        }
        .prvhv-card-dot {
          width: 4px; height: 4px; border-radius: 50%; flex-shrink: 0;
        }
        .prvhv-card-dot-text {
          font-family: 'Geist', system-ui, sans-serif;
          font-size: 0.55rem; font-weight: 300;
          color: #6B7280; letter-spacing: 0.02em;
        }
        /* Featured badge */
        .prvhv-featured-badge {
          position: absolute; top: -1px; right: 16px;
          font-family: 'Geist', system-ui, sans-serif;
          font-size: 0.42rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 0 0 8px 8px;
          background: rgba(212,175,55,0.15);
          border: 1px solid rgba(212,175,55,0.3);
          border-top: none;
          color: #D4AF37;
        }
        /* Top accent line */
        .prvhv-top-line {
          position: absolute; top: 0; left: 15%; right: 15%; height: 2px;
          border-radius: 0 0 2px 2px;
        }

        /* Floating "Custom" pill */
        .prvhv-pill {
          position: absolute; bottom: 4%; left: 50%;
          transform: translateX(-50%);
          background: rgba(8,11,18,0.82);
          border: 1px solid rgba(212,175,55,0.22);
          border-radius: 100px; padding: 8px 18px;
          backdrop-filter: blur(14px);
          display: flex; align-items: center; gap: 8px;
          white-space: nowrap; z-index: 5;
          animation: prvhv-pill-drift 5.5s ease-in-out infinite 1s;
        }
        .prvhv-pill-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #D4AF37;
          box-shadow: 0 0 8px rgba(212,175,55,0.9);
          animation: prvhv-blink 2s ease-in-out infinite;
        }
        .prvhv-pill-text {
          font-family: 'Geist', system-ui, sans-serif;
          font-size: 0.48rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #6B7280;
        }

        /* Corner brackets */
        .prvhv-bracket {
          position: absolute; width: 16px; height: 16px; pointer-events: none; z-index: 6;
        }
        .prvhv-bracket--tl { top: 10px; left: 10px; border-top: 1px solid rgba(212,175,55,0.28); border-left: 1px solid rgba(212,175,55,0.28); }
        .prvhv-bracket--tr { top: 10px; right: 10px; border-top: 1px solid rgba(212,175,55,0.28); border-right: 1px solid rgba(212,175,55,0.28); }
        .prvhv-bracket--bl { bottom: 10px; left: 10px; border-bottom: 1px solid rgba(212,175,55,0.28); border-left: 1px solid rgba(212,175,55,0.28); }
        .prvhv-bracket--br { bottom: 10px; right: 10px; border-bottom: 1px solid rgba(212,175,55,0.28); border-right: 1px solid rgba(212,175,55,0.28); }

        /* ── Keyframes ── */
        @keyframes prvhv-float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes prvhv-ambient {
          0%,100% { opacity: 0.7; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.06); }
        }
        @keyframes prvhv-card-left {
          0%,100% { transform: translateY(-50%) rotateY(18deg) rotateX(4deg) translateZ(-40px) translateX(-8px); }
          50%      { transform: translateY(-52%) rotateY(16deg) rotateX(3deg) translateZ(-36px) translateX(-6px); }
        }
        @keyframes prvhv-card-center {
          0%,100% { transform: translateX(-50%) translateY(-50%) rotateX(6deg) translateZ(20px); }
          50%      { transform: translateX(-50%) translateY(-53%) rotateX(5deg) translateZ(24px); }
        }
        @keyframes prvhv-card-right {
          0%,100% { transform: translateY(-50%) rotateY(-18deg) rotateX(4deg) translateZ(-40px) translateX(8px); }
          50%      { transform: translateY(-52%) rotateY(-16deg) rotateX(3deg) translateZ(-36px) translateX(6px); }
        }
        @keyframes prvhv-pill-drift {
          0%,100% { transform: translateX(-50%) translateY(0px); }
          50%      { transform: translateX(-50%) translateY(-6px); }
        }
        @keyframes prvhv-blink {
          0%,100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }
      `}</style>

      <div className="prvhv-wrap">
        <div className="prvhv-ambient" />

        {/* Corner brackets */}
        <div className="prvhv-bracket prvhv-bracket--tl" />
        <div className="prvhv-bracket prvhv-bracket--tr" />
        <div className="prvhv-bracket prvhv-bracket--bl" />
        <div className="prvhv-bracket prvhv-bracket--br" />

        <div className="prvhv-floater">
          <div className="prvhv-stack">

            {/* Left card — Launch */}
            <div className="prvhv-card prvhv-card--left">
              <div className="prvhv-top-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(230,60,109,0.5), transparent)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="prvhv-card-icon" style={{ background: 'rgba(230,60,109,0.1)', color: '#E63C6D' }}>
                  {icons.rocket}
                </div>
                <div>
                  <p className="prvhv-card-name">Launch</p>
                  <p className="prvhv-card-tagline">From clarity to go-live.</p>
                </div>
              </div>
              <p className="prvhv-card-price" style={{ background: 'linear-gradient(135deg, #FF6B95, #E63C6D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Custom</p>
              <hr className="prvhv-card-divider" style={{ background: 'linear-gradient(90deg, transparent, rgba(230,60,109,0.3), transparent)' }} />
              <div className="prvhv-card-dots">
                {['Website / landing page', 'Brand alignment', 'Launch support'].map(t => (
                  <div key={t} className="prvhv-card-dot-row">
                    <div className="prvhv-card-dot" style={{ background: '#E63C6D', boxShadow: '0 0 6px rgba(230,60,109,0.7)' }} />
                    <span className="prvhv-card-dot-text">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Center card — Growth (featured) */}
            <div className="prvhv-card prvhv-card--center">
              <div className="prvhv-top-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)' }} />
              <div className="prvhv-featured-badge">Most Popular</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="prvhv-card-icon" style={{ background: 'rgba(212,175,55,0.1)', color: '#D4AF37' }}>
                  {icons.chart}
                </div>
                <div>
                  <p className="prvhv-card-name">Growth Systems</p>
                  <p className="prvhv-card-tagline">Strategy + execution.</p>
                </div>
              </div>
              <p className="prvhv-card-price" style={{ background: 'linear-gradient(135deg, #F4E5B2, #D4AF37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Custom</p>
              <hr className="prvhv-card-divider" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)' }} />
              <div className="prvhv-card-dots">
                {['Growth strategy workshop', 'Creative & technical', 'Delivery roadmap'].map(t => (
                  <div key={t} className="prvhv-card-dot-row">
                    <div className="prvhv-card-dot" style={{ background: '#D4AF37', boxShadow: '0 0 6px rgba(212,175,55,0.7)' }} />
                    <span className="prvhv-card-dot-text">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right card — Retainer */}
            <div className="prvhv-card prvhv-card--right">
              <div className="prvhv-top-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(78,205,196,0.5), transparent)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="prvhv-card-icon" style={{ background: 'rgba(78,205,196,0.1)', color: '#4ECDC4' }}>
                  {icons.refresh}
                </div>
                <div>
                  <p className="prvhv-card-name">Retainer</p>
                  <p className="prvhv-card-tagline">Ongoing momentum.</p>
                </div>
              </div>
              <p className="prvhv-card-price" style={{ background: 'linear-gradient(135deg, #A8F0EC, #4ECDC4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Custom</p>
              <hr className="prvhv-card-divider" style={{ background: 'linear-gradient(90deg, transparent, rgba(78,205,196,0.3), transparent)' }} />
              <div className="prvhv-card-dots">
                {['Content & campaigns', 'SEO & reporting', 'Priority sessions'].map(t => (
                  <div key={t} className="prvhv-card-dot-row">
                    <div className="prvhv-card-dot" style={{ background: '#4ECDC4', boxShadow: '0 0 6px rgba(78,205,196,0.7)' }} />
                    <span className="prvhv-card-dot-text">{t}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Custom quote pill */}
        <div className="prvhv-pill">
          <span className="prvhv-pill-dot" />
          <span className="prvhv-pill-text">All plans · Custom scoped</span>
        </div>
      </div>
    </aside>
  )
}
