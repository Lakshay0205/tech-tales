/* PortfolioHeroVisual — Stacked gallery reel / film strip
   Represents: showcased work, results, creative output
   Distinct from: Home crystal, About sphere-rings, Services triskelion
*/
export default function PortfolioHeroVisual() {
  return (
    <aside className="phv-col" aria-hidden="true">
      <style>{`
        .phv-col {
          flex: 0 0 460px; width: 460px;
          display: flex; align-items: center; justify-content: center;
        }
        @media (max-width: 1100px) { .phv-col { flex: 0 0 360px; width: 360px; } }
        @media (max-width: 860px)  { .phv-col { display: none; } }

        .phv-wrap {
          position: relative;
          width: clamp(300px, 36vw, 420px);
          height: clamp(360px, 44vw, 500px);
          display: flex; align-items: center; justify-content: center;
        }

        /* Ambient glow */
        .phv-ambient {
          position: absolute; inset: -10%; border-radius: 50%;
          background: radial-gradient(ellipse at 50% 60%,
            rgba(230,60,109,0.12) 0%,
            rgba(78,205,196,0.07) 45%,
            transparent 70%);
          filter: blur(44px); pointer-events: none;
          animation: phv-ambient 8s ease-in-out infinite;
        }

        /* Float */
        .phv-floater {
          animation: phv-float 5.8s ease-in-out infinite;
          position: relative; width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
        }

        /* ── Film strip frames ── */
        .phv-strip {
          position: relative;
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
        }

        /* Back frame */
        .phv-frame {
          position: absolute;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .phv-frame--back {
          width: 72%; height: 58%;
          top: 2%; left: 50%; transform: translateX(-50%) rotate(-6deg) translateY(8px);
          background: linear-gradient(145deg, rgba(14,18,28,0.9), rgba(9,12,20,0.95));
          border-color: rgba(78,205,196,0.15);
          animation: phv-frame-back 6s ease-in-out infinite;
          z-index: 1;
        }
        .phv-frame--mid {
          width: 76%; height: 60%;
          top: 8%; left: 50%; transform: translateX(-50%) rotate(3deg) translateY(4px);
          background: linear-gradient(145deg, rgba(17,21,32,0.92), rgba(11,15,26,0.96));
          border-color: rgba(230,60,109,0.18);
          animation: phv-frame-mid 6s ease-in-out infinite 0.4s;
          z-index: 2;
        }
        .phv-frame--front {
          width: 80%; height: 62%;
          top: 14%; left: 50%; transform: translateX(-50%) rotate(-1deg);
          background: linear-gradient(145deg, rgba(20,24,36,0.95), rgba(13,17,28,0.98));
          border-color: rgba(212,175,55,0.28);
          box-shadow: 0 24px 64px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.06);
          animation: phv-frame-front 6s ease-in-out infinite 0.8s;
          z-index: 3;
        }

        /* Frame inner content */
        .phv-frame-inner {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
        }
        .phv-frame-img {
          flex: 1;
          background-size: cover; background-position: center;
          position: relative; overflow: hidden;
        }
        .phv-frame-img::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(8,11,18,0.85) 100%);
        }
        .phv-frame-bar {
          padding: 10px 14px;
          display: flex; align-items: center; justify-content: space-between;
          border-top: 1px solid rgba(255,255,255,0.06);
          background: rgba(8,11,18,0.7);
          backdrop-filter: blur(8px);
          flex-shrink: 0;
        }
        .phv-frame-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 0.85rem; font-weight: 500;
          letter-spacing: -0.01em; color: #F0EDE8;
        }
        .phv-frame-tag {
          font-family: 'Geist', system-ui, sans-serif;
          font-size: 0.42rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 3px 8px; border-radius: 100px;
          background: rgba(212,175,55,0.1);
          border: 1px solid rgba(212,175,55,0.25);
          color: #D4AF37;
        }

        /* Result badge on front frame */
        .phv-badge {
          position: absolute; bottom: 52px; left: 12px; right: 12px;
          background: rgba(8,11,18,0.78);
          border: 1px solid rgba(212,175,55,0.22);
          border-radius: 10px; padding: 10px 12px;
          backdrop-filter: blur(12px);
          z-index: 4;
          animation: phv-badge-drift 5s ease-in-out infinite 1.2s;
        }
        .phv-badge-eyebrow {
          font-family: 'Geist', system-ui, sans-serif;
          font-size: 0.42rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #4B5563; display: block; margin-bottom: 4px;
        }
        .phv-badge-result {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 0.9rem; font-weight: 500;
          letter-spacing: -0.01em; color: #D4AF37;
        }

        /* Film perforations strip */
        .phv-perfs {
          position: absolute; top: 0; bottom: 0;
          width: 18px; display: flex; flex-direction: column;
          justify-content: space-evenly; align-items: center;
          z-index: 5; pointer-events: none;
        }
        .phv-perfs--left  { left: 2%; }
        .phv-perfs--right { right: 2%; }
        .phv-perf {
          width: 10px; height: 8px; border-radius: 2px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
        }

        /* Floating stat chips */
        .phv-chip {
          position: absolute;
          background: rgba(8,11,18,0.82);
          border-radius: 10px; padding: 8px 12px;
          backdrop-filter: blur(14px);
          display: flex; align-items: center; gap: 7px;
          pointer-events: none; z-index: 6;
        }
        .phv-chip--tl {
          top: 0; left: -4%;
          border: 1px solid rgba(78,205,196,0.25);
          animation: phv-chip-drift 6s ease-in-out infinite;
        }
        .phv-chip--br {
          bottom: 2%; right: -4%;
          border: 1px solid rgba(230,60,109,0.25);
          animation: phv-chip-drift 7s ease-in-out infinite 1s;
        }
        .phv-chip-dot {
          width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
        }
        .phv-chip-dot--teal  { background: #4ECDC4; box-shadow: 0 0 8px rgba(78,205,196,0.9); }
        .phv-chip-dot--coral { background: #E63C6D; box-shadow: 0 0 8px rgba(230,60,109,0.9); }
        .phv-chip-label {
          font-family: 'Geist', system-ui, sans-serif;
          font-size: 0.48rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase; color: #6B7280;
        }
        .phv-chip-val {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1rem; font-weight: 500;
          letter-spacing: -0.02em; color: #F5F3EF;
        }

        /* Corner brackets */
        .phv-bracket {
          position: absolute; width: 16px; height: 16px; pointer-events: none; z-index: 7;
        }
        .phv-bracket--tl { top: 10px; left: 10px; border-top: 1px solid rgba(212,175,55,0.28); border-left: 1px solid rgba(212,175,55,0.28); }
        .phv-bracket--tr { top: 10px; right: 10px; border-top: 1px solid rgba(212,175,55,0.28); border-right: 1px solid rgba(212,175,55,0.28); }
        .phv-bracket--bl { bottom: 10px; left: 10px; border-bottom: 1px solid rgba(212,175,55,0.28); border-left: 1px solid rgba(212,175,55,0.28); }
        .phv-bracket--br { bottom: 10px; right: 10px; border-bottom: 1px solid rgba(212,175,55,0.28); border-right: 1px solid rgba(212,175,55,0.28); }

        /* ── Keyframes ── */
        @keyframes phv-float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes phv-ambient {
          0%,100% { opacity: 0.7; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.05); }
        }
        @keyframes phv-frame-back {
          0%,100% { transform: translateX(-50%) rotate(-6deg) translateY(8px); }
          50%      { transform: translateX(-50%) rotate(-5deg) translateY(4px); }
        }
        @keyframes phv-frame-mid {
          0%,100% { transform: translateX(-50%) rotate(3deg) translateY(4px); }
          50%      { transform: translateX(-50%) rotate(2.5deg) translateY(0px); }
        }
        @keyframes phv-frame-front {
          0%,100% { transform: translateX(-50%) rotate(-1deg); }
          50%      { transform: translateX(-50%) rotate(-0.5deg) translateY(-4px); }
        }
        @keyframes phv-badge-drift {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-5px); }
        }
        @keyframes phv-chip-drift {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-7px); }
        }
      `}</style>

      <div className="phv-wrap">
        <div className="phv-ambient" />

        {/* Corner brackets */}
        <div className="phv-bracket phv-bracket--tl" />
        <div className="phv-bracket phv-bracket--tr" />
        <div className="phv-bracket phv-bracket--bl" />
        <div className="phv-bracket phv-bracket--br" />

        {/* Film perforations */}
        <div className="phv-perfs phv-perfs--left">
          {Array.from({length:7}).map((_,i) => <div key={i} className="phv-perf"/>)}
        </div>
        <div className="phv-perfs phv-perfs--right">
          {Array.from({length:7}).map((_,i) => <div key={i} className="phv-perf"/>)}
        </div>

        <div className="phv-floater">
          <div className="phv-strip">

            {/* Back frame — Branding project */}
            <div className="phv-frame phv-frame--back">
              <div className="phv-frame-inner">
                <div className="phv-frame-img" style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=60)',
                  opacity: 0.5,
                }} />
                <div className="phv-frame-bar">
                  <span className="phv-frame-title">TAAR</span>
                  <span className="phv-frame-tag" style={{ background: 'rgba(78,205,196,0.1)', borderColor: 'rgba(78,205,196,0.25)', color: '#4ECDC4' }}>Branding</span>
                </div>
              </div>
            </div>

            {/* Mid frame — E-commerce project */}
            <div className="phv-frame phv-frame--mid">
              <div className="phv-frame-inner">
                <div className="phv-frame-img" style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=60)',
                  opacity: 0.6,
                }} />
                <div className="phv-frame-bar">
                  <span className="phv-frame-title">Hawai Agro</span>
                  <span className="phv-frame-tag" style={{ background: 'rgba(230,60,109,0.1)', borderColor: 'rgba(230,60,109,0.25)', color: '#E63C6D' }}>E-commerce</span>
                </div>
              </div>
            </div>

            {/* Front frame — Website project */}
            <div className="phv-frame phv-frame--front">
              <div className="phv-frame-inner">
                <div className="phv-frame-img" style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=70)',
                }} />
                <div className="phv-frame-bar">
                  <span className="phv-frame-title">Terravik</span>
                  <span className="phv-frame-tag">Website</span>
                </div>
              </div>
              {/* Result badge */}
              <div className="phv-badge">
                <span className="phv-badge-eyebrow">Featured result</span>
                <span className="phv-badge-result">3× inquiry growth in 60 days</span>
              </div>
            </div>

          </div>
        </div>

        {/* Floating stat chips */}
        <div className="phv-chip phv-chip--tl">
          <span className="phv-chip-dot phv-chip-dot--teal" />
          <span className="phv-chip-label">Projects</span>
          <span className="phv-chip-val">3+</span>
        </div>
        <div className="phv-chip phv-chip--br">
          <span className="phv-chip-dot phv-chip-dot--coral" />
          <span className="phv-chip-label">Avg. growth</span>
          <span className="phv-chip-val">2–3×</span>
        </div>
      </div>
    </aside>
  )
}
