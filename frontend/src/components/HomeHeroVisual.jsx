/* HomeHeroVisual — 3-D Floating Polyhedron / Crystal Tech Figure
   Completely different from About's sphere-rings graphic.
   Built with SVG + CSS animations, zero external deps.
*/
export default function HomeHeroVisual() {
  return (
    <aside className="hhv-col" aria-hidden="true">
      <style>{`
        .hhv-crystal-wrap {
          position: relative;
          width: clamp(340px, 42vw, 520px);
          height: clamp(340px, 42vw, 520px);
          display: flex; align-items: center; justify-content: center;
        }
        /* Ambient glow layers */
        .hhv-bg-glow {
          position: absolute; inset: -20%; border-radius: 50%;
          background: radial-gradient(circle, rgba(78,205,196,0.13) 0%, rgba(212,175,55,0.07) 40%, transparent 70%);
          filter: blur(40px); pointer-events: none;
          animation: hhv-pulse-bg 6s ease-in-out infinite;
        }
        .hhv-bg-glow2 {
          position: absolute; inset: 5%; border-radius: 50%;
          background: radial-gradient(circle at 60% 40%, rgba(230,60,109,0.10) 0%, transparent 60%);
          filter: blur(32px); pointer-events: none;
          animation: hhv-pulse-bg 8s ease-in-out infinite reverse;
        }
        /* Floating animation wrapper */
        .hhv-floater {
          animation: hhv-float 5.5s ease-in-out infinite;
          position: relative; display: flex; align-items: center; justify-content: center;
        }
        /* Main SVG */
        .hhv-svg {
          width: clamp(280px, 36vw, 440px);
          height: clamp(280px, 36vw, 440px);
          overflow: visible;
          filter: drop-shadow(0 0 32px rgba(78,205,196,0.18)) drop-shadow(0 0 64px rgba(212,175,55,0.10));
        }
        /* Polyhedron spin */
        .hhv-poly-group {
          transform-origin: 200px 200px;
          animation: hhv-poly-spin 22s linear infinite;
        }
        .hhv-poly-group-inner {
          transform-origin: 200px 200px;
          animation: hhv-poly-tilt 14s ease-in-out infinite;
        }
        /* Outer hex ring */
        .hhv-hex-ring {
          transform-origin: 200px 200px;
          animation: hhv-hex-spin 18s linear infinite reverse;
        }
        /* Data flow lines */
        .hhv-flow-line {
          stroke-dasharray: 8 14;
          animation: hhv-dash-flow 2.4s linear infinite;
        }
        .hhv-flow-line--slow { animation-duration: 3.8s; }
        /* Scan line */
        .hhv-scan-line {
          animation: hhv-scan 4s ease-in-out infinite;
          transform-origin: 200px 200px;
        }
        /* Node pulse */
        .hhv-node-pulse {
          animation: hhv-node-blink 2.8s ease-in-out infinite;
        }
        .hhv-node-pulse--b { animation-delay: 0.9s; }
        .hhv-node-pulse--c { animation-delay: 1.7s; }
        .hhv-node-pulse--d { animation-delay: 0.4s; }
        /* Floating metric cards */
        .hhv-metric {
          position: absolute;
          background: rgba(10,14,20,0.82);
          border: 1px solid rgba(78,205,196,0.22);
          border-radius: 10px;
          padding: 10px 14px;
          backdrop-filter: blur(12px);
          display: flex; flex-direction: column; gap: 3px;
          min-width: 90px;
        }
        .hhv-metric--tl {
          top: 8%; left: -2%;
          border-color: rgba(212,175,55,0.28);
          animation: hhv-card-drift 6.2s ease-in-out infinite;
        }
        .hhv-metric--br {
          bottom: 10%; right: -2%;
          border-color: rgba(230,60,109,0.28);
          animation: hhv-card-drift 7s ease-in-out infinite 1.1s;
        }
        .hhv-metric--bl {
          bottom: 22%; left: -4%;
          border-color: rgba(78,205,196,0.22);
          animation: hhv-card-drift 5.8s ease-in-out infinite 0.5s;
        }
        .hhv-metric-icon {
          width: 22px; height: 22px; border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 4px;
        }
        .hhv-metric-icon--gold  { background: rgba(212,175,55,0.12); color: #D4AF37; }
        .hhv-metric-icon--coral { background: rgba(230,60,109,0.12); color: #E63C6D; }
        .hhv-metric-icon--teal  { background: rgba(78,205,196,0.12);  color: #4ECDC4; }
        .hhv-metric-val {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.15rem; font-weight: 500; line-height: 1;
          letter-spacing: -0.02em; color: #F5F3EF;
        }
        .hhv-metric-lbl {
          font-family: 'Geist', system-ui, sans-serif;
          font-size: 0.48rem; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: #4B5563;
        }
        /* Status pill */
        .hhv-pill {
          position: absolute; top: 6%; right: 4%;
          display: flex; align-items: center; gap: 7px;
          background: rgba(10,14,20,0.78);
          border: 1px solid rgba(78,205,196,0.22);
          border-radius: 100px; padding: 6px 12px;
          backdrop-filter: blur(10px);
          animation: hhv-card-drift 6.8s ease-in-out infinite 0.7s;
        }
        .hhv-pill-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #4ECDC4;
          box-shadow: 0 0 8px rgba(78,205,196,0.9);
          animation: hhv-node-blink 1.8s ease-in-out infinite;
        }
        .hhv-pill-text {
          font-family: 'Geist', system-ui, sans-serif;
          font-size: 0.48rem; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: #6B7280;
        }
        /* Corner brackets */
        .hhv-bracket {
          position: absolute; width: 18px; height: 18px; pointer-events: none;
        }
        .hhv-bracket--tl { top: 14px; left: 14px; border-top: 1px solid rgba(212,175,55,0.35); border-left: 1px solid rgba(212,175,55,0.35); }
        .hhv-bracket--tr { top: 14px; right: 14px; border-top: 1px solid rgba(212,175,55,0.35); border-right: 1px solid rgba(212,175,55,0.35); }
        .hhv-bracket--bl { bottom: 14px; left: 14px; border-bottom: 1px solid rgba(212,175,55,0.35); border-left: 1px solid rgba(212,175,55,0.35); }
        .hhv-bracket--br { bottom: 14px; right: 14px; border-bottom: 1px solid rgba(212,175,55,0.35); border-right: 1px solid rgba(212,175,55,0.35); }

        /* ── Keyframes ── */
        @keyframes hhv-float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes hhv-pulse-bg {
          0%,100% { opacity: 0.7; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.08); }
        }
        @keyframes hhv-poly-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes hhv-poly-tilt {
          0%,100% { transform: rotateX(0deg) scaleY(1); }
          50%      { transform: rotateX(8deg) scaleY(0.96); }
        }
        @keyframes hhv-hex-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes hhv-dash-flow {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -44; }
        }
        @keyframes hhv-scan {
          0%,100% { transform: translateY(-80px); opacity: 0; }
          20%      { opacity: 1; }
          80%      { opacity: 1; }
          100%     { transform: translateY(80px); opacity: 0; }
        }
        @keyframes hhv-node-blink {
          0%,100% { opacity: 0.4; r: 4; }
          50%      { opacity: 1;   r: 6; }
        }
        @keyframes hhv-card-drift {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }

        @media (max-width: 767px) {
          .hhv-crystal-wrap {
            width: min(100%, 300px) !important;
            height: min(100%, 300px) !important;
          }
          .hhv-svg {
            width: min(74vw, 240px) !important;
            height: min(74vw, 240px) !important;
          }
          .hhv-floater {
            animation-duration: 9s !important;
          }
          .hhv-poly-group,
          .hhv-poly-group-inner,
          .hhv-hex-ring,
          .hhv-flow-line,
          .hhv-flow-line--slow,
          .hhv-scan-line,
          .hhv-node-pulse,
          .hhv-node-pulse--b,
          .hhv-node-pulse--c,
          .hhv-node-pulse--d {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
          .hhv-metric {
            transform: scale(0.82);
            min-width: 74px;
            padding: 8px 10px;
          }
          .hhv-pill {
            transform: scale(0.82);
            top: 4% !important;
            right: 0 !important;
          }
        }
      `}</style>

      <div className="hhv-crystal-wrap">
        {/* Ambient glows */}
        <div className="hhv-bg-glow" />
        <div className="hhv-bg-glow2" />

        {/* Corner brackets */}
        <div className="hhv-bracket hhv-bracket--tl" />
        <div className="hhv-bracket hhv-bracket--tr" />
        <div className="hhv-bracket hhv-bracket--bl" />
        <div className="hhv-bracket hhv-bracket--br" />

        {/* Floating wrapper */}
        <div className="hhv-floater">
          <svg className="hhv-svg" viewBox="0 0 400 400">
            <defs>
              {/* Teal glow filter */}
              <filter id="hhv-glow-teal" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              {/* Gold glow filter */}
              <filter id="hhv-glow-gold" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              {/* Coral glow */}
              <filter id="hhv-glow-coral" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              {/* Radial gradient for face fills */}
              <radialGradient id="hhv-face-gold" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.12"/>
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="hhv-face-teal" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.10"/>
                <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="hhv-face-coral" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E63C6D" stopOpacity="0.09"/>
                <stop offset="100%" stopColor="#E63C6D" stopOpacity="0"/>
              </radialGradient>
              {/* Scan line gradient */}
              <linearGradient id="hhv-scan-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent"/>
                <stop offset="30%" stopColor="rgba(78,205,196,0.5)"/>
                <stop offset="70%" stopColor="rgba(78,205,196,0.5)"/>
                <stop offset="100%" stopColor="transparent"/>
              </linearGradient>
            </defs>

            {/* ── Outer hex ring (slow reverse spin) ── */}
            <g className="hhv-hex-ring">
              <polygon
                points="200,62 310,131 310,269 200,338 90,269 90,131"
                fill="none"
                stroke="rgba(212,175,55,0.08)"
                strokeWidth="1"
              />
              {/* Tick marks at hex vertices */}
              {[
                [200,62],[310,131],[310,269],[200,338],[90,269],[90,131]
              ].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r="3"
                  fill="none" stroke="rgba(212,175,55,0.25)" strokeWidth="1"/>
              ))}
            </g>

            {/* ── Data flow lines (diagonal streaks) ── */}
            <line x1="90" y1="131" x2="200" y2="200"
              stroke="rgba(78,205,196,0.18)" strokeWidth="1"
              className="hhv-flow-line"/>
            <line x1="310" y1="131" x2="200" y2="200"
              stroke="rgba(212,175,55,0.15)" strokeWidth="1"
              className="hhv-flow-line hhv-flow-line--slow"/>
            <line x1="200" y1="338" x2="200" y2="200"
              stroke="rgba(230,60,109,0.14)" strokeWidth="1"
              className="hhv-flow-line"/>

            {/* ── Main polyhedron group (spinning) ── */}
            <g className="hhv-poly-group">
              <g className="hhv-poly-group-inner">

                {/* ── Icosahedron-inspired diamond/crystal faces ── */}
                {/* Top cap faces */}
                <polygon points="200,80 155,148 200,148"
                  fill="url(#hhv-face-gold)" stroke="rgba(212,175,55,0.45)" strokeWidth="0.8"/>
                <polygon points="200,80 200,148 245,148"
                  fill="url(#hhv-face-teal)" stroke="rgba(78,205,196,0.35)" strokeWidth="0.8"/>
                <polygon points="200,80 245,148 270,120"
                  fill="url(#hhv-face-coral)" stroke="rgba(230,60,109,0.28)" strokeWidth="0.8"/>
                <polygon points="200,80 130,120 155,148"
                  fill="url(#hhv-face-coral)" stroke="rgba(230,60,109,0.28)" strokeWidth="0.8"/>

                {/* Mid belt faces */}
                <polygon points="155,148 130,200 155,252"
                  fill="url(#hhv-face-teal)" stroke="rgba(78,205,196,0.30)" strokeWidth="0.8"/>
                <polygon points="155,148 155,252 200,252"
                  fill="url(#hhv-face-gold)" stroke="rgba(212,175,55,0.38)" strokeWidth="0.8"/>
                <polygon points="200,148 245,148 245,252"
                  fill="url(#hhv-face-teal)" stroke="rgba(78,205,196,0.30)" strokeWidth="0.8"/>
                <polygon points="200,148 245,252 200,252"
                  fill="url(#hhv-face-gold)" stroke="rgba(212,175,55,0.38)" strokeWidth="0.8"/>
                <polygon points="245,148 270,200 245,252"
                  fill="url(#hhv-face-coral)" stroke="rgba(230,60,109,0.25)" strokeWidth="0.8"/>
                <polygon points="130,200 155,148 155,252"
                  fill="url(#hhv-face-coral)" stroke="rgba(230,60,109,0.25)" strokeWidth="0.8"/>

                {/* Bottom cap faces */}
                <polygon points="200,320 155,252 200,252"
                  fill="url(#hhv-face-gold)" stroke="rgba(212,175,55,0.45)" strokeWidth="0.8"/>
                <polygon points="200,320 200,252 245,252"
                  fill="url(#hhv-face-teal)" stroke="rgba(78,205,196,0.35)" strokeWidth="0.8"/>
                <polygon points="200,320 245,252 270,280"
                  fill="url(#hhv-face-coral)" stroke="rgba(230,60,109,0.28)" strokeWidth="0.8"/>
                <polygon points="200,320 130,280 155,252"
                  fill="url(#hhv-face-coral)" stroke="rgba(230,60,109,0.28)" strokeWidth="0.8"/>

                {/* ── Bright edge highlights (front-facing edges) ── */}
                <line x1="200" y1="80" x2="200" y2="148"
                  stroke="rgba(212,175,55,0.7)" strokeWidth="1.2"
                  filter="url(#hhv-glow-gold)"/>
                <line x1="155" y1="148" x2="245" y2="148"
                  stroke="rgba(78,205,196,0.55)" strokeWidth="1"
                  filter="url(#hhv-glow-teal)"/>
                <line x1="155" y1="252" x2="245" y2="252"
                  stroke="rgba(78,205,196,0.55)" strokeWidth="1"
                  filter="url(#hhv-glow-teal)"/>
                <line x1="200" y1="252" x2="200" y2="320"
                  stroke="rgba(212,175,55,0.7)" strokeWidth="1.2"
                  filter="url(#hhv-glow-gold)"/>
                {/* Vertical spine */}
                <line x1="200" y1="80" x2="200" y2="320"
                  stroke="rgba(212,175,55,0.18)" strokeWidth="0.6"
                  strokeDasharray="4 8"/>

                {/* ── Vertex nodes ── */}
                {/* Top apex */}
                <circle cx="200" cy="80" r="5"
                  fill="#D4AF37" filter="url(#hhv-glow-gold)"
                  className="hhv-node-pulse"/>
                {/* Bottom apex */}
                <circle cx="200" cy="320" r="5"
                  fill="#D4AF37" filter="url(#hhv-glow-gold)"
                  className="hhv-node-pulse hhv-node-pulse--b"/>
                {/* Mid-left */}
                <circle cx="130" cy="200" r="4"
                  fill="#4ECDC4" filter="url(#hhv-glow-teal)"
                  className="hhv-node-pulse hhv-node-pulse--c"/>
                {/* Mid-right */}
                <circle cx="270" cy="200" r="4"
                  fill="#4ECDC4" filter="url(#hhv-glow-teal)"
                  className="hhv-node-pulse hhv-node-pulse--d"/>
                {/* Upper belt nodes */}
                <circle cx="155" cy="148" r="3.5"
                  fill="#E63C6D" filter="url(#hhv-glow-coral)" opacity="0.8"/>
                <circle cx="245" cy="148" r="3.5"
                  fill="#E63C6D" filter="url(#hhv-glow-coral)" opacity="0.8"/>
                {/* Lower belt nodes */}
                <circle cx="155" cy="252" r="3.5"
                  fill="#E63C6D" filter="url(#hhv-glow-coral)" opacity="0.8"/>
                <circle cx="245" cy="252" r="3.5"
                  fill="#E63C6D" filter="url(#hhv-glow-coral)" opacity="0.8"/>

                {/* ── Central core glow ── */}
                <circle cx="200" cy="200" r="18"
                  fill="radial-gradient(circle, rgba(78,205,196,0.3), transparent)"
                  opacity="0.6"/>
                <circle cx="200" cy="200" r="10"
                  fill="rgba(78,205,196,0.15)"
                  filter="url(#hhv-glow-teal)"/>
                <circle cx="200" cy="200" r="4"
                  fill="#4ECDC4" opacity="0.9"
                  filter="url(#hhv-glow-teal)"/>

              </g>
            </g>

            {/* ── Scan line (sweeps vertically, outside spin group) ── */}
            <rect
              x="130" y="198" width="140" height="1.5"
              fill="url(#hhv-scan-grad)"
              className="hhv-scan-line"
              rx="1"
            />

            {/* ── Outer decorative circle ── */}
            <circle cx="200" cy="200" r="168"
              fill="none"
              stroke="rgba(212,175,55,0.05)"
              strokeWidth="1"
              strokeDasharray="3 9"/>

            {/* ── Corner crosshair marks ── */}
            {[
              { x: 32,  y: 32  },
              { x: 368, y: 32  },
              { x: 32,  y: 368 },
              { x: 368, y: 368 },
            ].map(({x,y},i) => (
              <g key={i}>
                <line x1={x-8} y1={y} x2={x+8} y2={y}
                  stroke="rgba(212,175,55,0.22)" strokeWidth="1"/>
                <line x1={x} y1={y-8} x2={x} y2={y+8}
                  stroke="rgba(212,175,55,0.22)" strokeWidth="1"/>
              </g>
            ))}

            {/* ── Coordinate label ── */}
            <text x="32" y="26"
              fontFamily="'Geist', monospace" fontSize="7"
              fill="rgba(212,175,55,0.28)" letterSpacing="1.5">
              X:200 Y:200 Z:0
            </text>
          </svg>
        </div>

        {/* ── Floating metric cards ── */}
        <div className="hhv-metric hhv-metric--tl">
          <div className="hhv-metric-icon hhv-metric-icon--gold">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
              <polyline points="16 7 22 7 22 13"/>
            </svg>
          </div>
          <div className="hhv-metric-val">3×</div>
          <div className="hhv-metric-lbl">Growth</div>
        </div>

        <div className="hhv-metric hhv-metric--br">
          <div className="hhv-metric-icon hhv-metric-icon--coral">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div className="hhv-metric-val">14d</div>
          <div className="hhv-metric-lbl">Delivery</div>
        </div>

        <div className="hhv-metric hhv-metric--bl">
          <div className="hhv-metric-icon hhv-metric-icon--teal">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="hhv-metric-val">100%</div>
          <div className="hhv-metric-lbl">Satisfaction</div>
        </div>

        {/* ── Live status pill ── */}
        <div className="hhv-pill">
          <span className="hhv-pill-dot"/>
          <span className="hhv-pill-text">LIVE · TECH&TALES</span>
        </div>
      </div>
    </aside>
  )
}
