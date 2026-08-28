/* ServicesHeroVisual — Tri-arm orbit dashboard
   3 glowing arms = 3 service pillars (Growth/Creative/Digital)
   Distinct from: Home's crystal polyhedron & About's sphere-rings
*/
export default function ServicesHeroVisual() {
  return (
    <aside className="shv-col" aria-hidden="true">
      <style>{`
        .shv-col {
          flex: 0 0 480px; width: 480px;
          display: flex; align-items: center; justify-content: center;
        }
        @media (max-width: 1100px) { .shv-col { flex: 0 0 360px; width: 360px; } }
        @media (max-width: 860px)  { .shv-col { display: none; } }

        .shv-wrap {
          position: relative;
          width: clamp(320px, 38vw, 460px);
          height: clamp(320px, 38vw, 460px);
          display: flex; align-items: center; justify-content: center;
        }

        /* Ambient glow */
        .shv-ambient {
          position: absolute; inset: -15%; border-radius: 50%;
          background: radial-gradient(circle,
            rgba(212,175,55,0.10) 0%,
            rgba(230,60,109,0.06) 35%,
            rgba(78,205,196,0.08) 60%,
            transparent 75%);
          filter: blur(48px); pointer-events: none;
          animation: shv-ambient-pulse 7s ease-in-out infinite;
        }

        /* Float */
        .shv-floater {
          animation: shv-float 6s ease-in-out infinite;
          position: relative;
        }

        /* SVG */
        .shv-svg {
          width: clamp(300px, 36vw, 440px);
          height: clamp(300px, 36vw, 440px);
          overflow: visible;
          filter:
            drop-shadow(0 0 24px rgba(212,175,55,0.12))
            drop-shadow(0 0 48px rgba(78,205,196,0.08));
        }

        /* Outer ring slow spin */
        .shv-outer-ring {
          transform-origin: 220px 220px;
          animation: shv-ring-spin 40s linear infinite;
        }
        /* Inner ring reverse */
        .shv-inner-ring {
          transform-origin: 220px 220px;
          animation: shv-ring-spin 28s linear infinite reverse;
        }
        /* Tri-arm group spin */
        .shv-arms {
          transform-origin: 220px 220px;
          animation: shv-arms-spin 18s linear infinite;
        }
        /* Counter-spin labels so they stay upright */
        .shv-label-g1 {
          transform-origin: 220px 80px;
          animation: shv-counter-spin 18s linear infinite;
        }
        .shv-label-g2 {
          transform-origin: 340px 295px;
          animation: shv-counter-spin 18s linear infinite;
        }
        .shv-label-g3 {
          transform-origin: 100px 295px;
          animation: shv-counter-spin 18s linear infinite;
        }

        /* Orbiting dot tracks */
        .shv-dot-track-1 {
          transform-origin: 220px 220px;
          animation: shv-ring-spin 8s linear infinite;
        }
        .shv-dot-track-2 {
          transform-origin: 220px 220px;
          animation: shv-ring-spin 12s linear infinite reverse;
        }
        .shv-dot-track-3 {
          transform-origin: 220px 220px;
          animation: shv-ring-spin 10s linear infinite;
          animation-delay: -3s;
        }

        /* Pulse nodes */
        .shv-node-gold  { animation: shv-node-pulse-gold  2.6s ease-in-out infinite; }
        .shv-node-coral { animation: shv-node-pulse-coral 2.6s ease-in-out infinite 0.85s; }
        .shv-node-teal  { animation: shv-node-pulse-teal  2.6s ease-in-out infinite 1.7s; }
        .shv-core-pulse { animation: shv-core-glow 3s ease-in-out infinite; }

        /* Scan arc */
        .shv-scan-arc {
          transform-origin: 220px 220px;
          animation: shv-scan-arc 4s ease-in-out infinite;
        }

        /* Floating label cards */
        .shv-tag {
          position: absolute;
          background: rgba(8,11,18,0.85);
          border-radius: 8px;
          padding: 8px 12px;
          backdrop-filter: blur(14px);
          display: flex; align-items: center; gap: 7px;
          white-space: nowrap;
          pointer-events: none;
        }
        .shv-tag--growth {
          top: 4%; left: 50%; transform: translateX(-50%);
          border: 1px solid rgba(212,175,55,0.30);
          animation: shv-tag-drift 5.8s ease-in-out infinite;
        }
        .shv-tag--creative {
          bottom: 12%; right: -2%;
          border: 1px solid rgba(230,60,109,0.28);
          animation: shv-tag-drift 6.5s ease-in-out infinite 1s;
        }
        .shv-tag--digital {
          bottom: 12%; left: -2%;
          border: 1px solid rgba(78,205,196,0.26);
          animation: shv-tag-drift 7s ease-in-out infinite 0.5s;
        }
        .shv-tag-dot {
          width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
        }
        .shv-tag-dot--gold  { background: #D4AF37; box-shadow: 0 0 8px rgba(212,175,55,0.9); }
        .shv-tag-dot--coral { background: #E63C6D; box-shadow: 0 0 8px rgba(230,60,109,0.9); }
        .shv-tag-dot--teal  { background: #4ECDC4; box-shadow: 0 0 8px rgba(78,205,196,0.9); }
        .shv-tag-label {
          font-family: 'Geist', system-ui, sans-serif;
          font-size: 0.5rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #6B7280;
        }
        .shv-tag-val {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 0.95rem; font-weight: 500;
          letter-spacing: -0.02em; color: #F5F3EF;
          margin-left: 2px;
        }

        /* Corner brackets */
        .shv-bracket {
          position: absolute; width: 16px; height: 16px; pointer-events: none;
        }
        .shv-bracket--tl { top: 12px; left: 12px; border-top: 1px solid rgba(212,175,55,0.3); border-left: 1px solid rgba(212,175,55,0.3); }
        .shv-bracket--tr { top: 12px; right: 12px; border-top: 1px solid rgba(212,175,55,0.3); border-right: 1px solid rgba(212,175,55,0.3); }
        .shv-bracket--bl { bottom: 12px; left: 12px; border-bottom: 1px solid rgba(212,175,55,0.3); border-left: 1px solid rgba(212,175,55,0.3); }
        .shv-bracket--br { bottom: 12px; right: 12px; border-bottom: 1px solid rgba(212,175,55,0.3); border-right: 1px solid rgba(212,175,55,0.3); }

        /* ── Keyframes ── */
        @keyframes shv-float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes shv-ambient-pulse {
          0%,100% { opacity: 0.7; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.06); }
        }
        @keyframes shv-ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes shv-arms-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes shv-counter-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes shv-node-pulse-gold {
          0%,100% { opacity: 0.7; filter: drop-shadow(0 0 4px rgba(212,175,55,0.6)); }
          50%      { opacity: 1;   filter: drop-shadow(0 0 12px rgba(212,175,55,1)); }
        }
        @keyframes shv-node-pulse-coral {
          0%,100% { opacity: 0.7; filter: drop-shadow(0 0 4px rgba(230,60,109,0.6)); }
          50%      { opacity: 1;   filter: drop-shadow(0 0 12px rgba(230,60,109,1)); }
        }
        @keyframes shv-node-pulse-teal {
          0%,100% { opacity: 0.7; filter: drop-shadow(0 0 4px rgba(78,205,196,0.6)); }
          50%      { opacity: 1;   filter: drop-shadow(0 0 12px rgba(78,205,196,1)); }
        }
        @keyframes shv-core-glow {
          0%,100% { opacity: 0.6; r: 14; }
          50%      { opacity: 1;   r: 18; }
        }
        @keyframes shv-scan-arc {
          0%,100% { transform: rotate(-30deg); opacity: 0; }
          15%      { opacity: 0.7; }
          85%      { opacity: 0.7; }
          100%     { transform: rotate(330deg); opacity: 0; }
        }
        @keyframes shv-tag-drift {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-7px); }
        }
        .shv-tag--growth { animation-name: shv-tag-drift-center; }
        @keyframes shv-tag-drift-center {
          0%,100% { transform: translateX(-50%) translateY(0px); }
          50%      { transform: translateX(-50%) translateY(-7px); }
        }
      `}</style>

      <div className="shv-wrap">
        <div className="shv-ambient" />

        {/* Corner brackets */}
        <div className="shv-bracket shv-bracket--tl" />
        <div className="shv-bracket shv-bracket--tr" />
        <div className="shv-bracket shv-bracket--bl" />
        <div className="shv-bracket shv-bracket--br" />

        <div className="shv-floater">
          <svg className="shv-svg" viewBox="0 0 440 440">
            <defs>
              <filter id="shv-glow-gold" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="4" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="shv-glow-coral" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3.5" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="shv-glow-teal" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3.5" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="shv-glow-core" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="8" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>

              {/* Arm gradients */}
              <linearGradient id="shv-arm-gold" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1"/>
              </linearGradient>
              <linearGradient id="shv-arm-coral" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E63C6D" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#E63C6D" stopOpacity="0.1"/>
              </linearGradient>
              <linearGradient id="shv-arm-teal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0.1"/>
              </linearGradient>

              {/* Scan arc gradient */}
              <linearGradient id="shv-scan-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent"/>
                <stop offset="50%" stopColor="rgba(212,175,55,0.4)"/>
                <stop offset="100%" stopColor="transparent"/>
              </linearGradient>

              {/* Radial face fills for triangles */}
              <radialGradient id="shv-tri-gold" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.10"/>
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="shv-tri-coral" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E63C6D" stopOpacity="0.09"/>
                <stop offset="100%" stopColor="#E63C6D" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="shv-tri-teal" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.09"/>
                <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0"/>
              </radialGradient>
            </defs>

            {/* ── Outermost dashed orbit ring ── */}
            <g className="shv-outer-ring">
              <circle cx="220" cy="220" r="195"
                fill="none" stroke="rgba(212,175,55,0.06)"
                strokeWidth="1" strokeDasharray="4 10"/>
              {/* 12 tick marks */}
              {Array.from({length:12},(_,i)=>{
                const a = (i/12)*Math.PI*2
                const r1=190, r2=198
                return (
                  <line key={i}
                    x1={220+Math.cos(a)*r1} y1={220+Math.sin(a)*r1}
                    x2={220+Math.cos(a)*r2} y2={220+Math.sin(a)*r2}
                    stroke="rgba(212,175,55,0.20)" strokeWidth="1"/>
                )
              })}
            </g>

            {/* ── Mid orbit ring ── */}
            <g className="shv-inner-ring">
              <circle cx="220" cy="220" r="148"
                fill="none" stroke="rgba(255,255,255,0.05)"
                strokeWidth="1" strokeDasharray="2 8"/>
            </g>

            {/* ── Scan arc sweep ── */}
            <g className="shv-scan-arc">
              <path
                d="M220,220 L220,60 A160,160 0 0,1 358,300 Z"
                fill="rgba(212,175,55,0.03)"
                stroke="none"/>
              <line x1="220" y1="220" x2="220" y2="62"
                stroke="rgba(212,175,55,0.25)" strokeWidth="1"/>
            </g>

            {/* ── Tri-arm triskelion (spinning) ── */}
            <g className="shv-arms">

              {/* ── ARM 1: Growth (Gold) — points UP (270°) ── */}
              {/* Arm shaft */}
              <line x1="220" y1="220" x2="220" y2="80"
                stroke="url(#shv-arm-gold)" strokeWidth="2.5"
                filter="url(#shv-glow-gold)"/>
              {/* Arm triangle fill */}
              <polygon points="220,80 200,160 240,160"
                fill="url(#shv-tri-gold)"
                stroke="rgba(212,175,55,0.20)" strokeWidth="0.8"/>
              {/* Side whiskers */}
              <line x1="220" y1="130" x2="205" y2="145"
                stroke="rgba(212,175,55,0.25)" strokeWidth="1" strokeDasharray="3 5"/>
              <line x1="220" y1="130" x2="235" y2="145"
                stroke="rgba(212,175,55,0.25)" strokeWidth="1" strokeDasharray="3 5"/>
              {/* Tip node */}
              <circle cx="220" cy="80" r="9"
                fill="rgba(212,175,55,0.15)"
                stroke="#D4AF37" strokeWidth="1.5"
                className="shv-node-gold"
                filter="url(#shv-glow-gold)"/>
              <circle cx="220" cy="80" r="4" fill="#D4AF37"/>
              {/* Counter-spin label group */}
              <g className="shv-label-g1">
                <rect x="178" y="56" width="84" height="20" rx="4"
                  fill="rgba(8,11,18,0.80)"
                  stroke="rgba(212,175,55,0.25)" strokeWidth="0.8"/>
                <text x="220" y="70"
                  textAnchor="middle"
                  fontFamily="'Geist',system-ui,sans-serif"
                  fontSize="7.5" fontWeight="700" letterSpacing="1.8"
                  fill="rgba(212,175,55,0.85)">GROWTH</text>
              </g>

              {/* ── ARM 2: Creative (Coral) — points bottom-right (30°) ── */}
              <line x1="220" y1="220" x2="341" y2="291"
                stroke="url(#shv-arm-coral)" strokeWidth="2.5"
                filter="url(#shv-glow-coral)"/>
              <polygon points="341,291 270,240 300,310"
                fill="url(#shv-tri-coral)"
                stroke="rgba(230,60,109,0.20)" strokeWidth="0.8"/>
              <line x1="295" y1="262" x2="285" y2="278"
                stroke="rgba(230,60,109,0.25)" strokeWidth="1" strokeDasharray="3 5"/>
              <line x1="295" y1="262" x2="308" y2="268"
                stroke="rgba(230,60,109,0.25)" strokeWidth="1" strokeDasharray="3 5"/>
              <circle cx="341" cy="291" r="9"
                fill="rgba(230,60,109,0.15)"
                stroke="#E63C6D" strokeWidth="1.5"
                className="shv-node-coral"
                filter="url(#shv-glow-coral)"/>
              <circle cx="341" cy="291" r="4" fill="#E63C6D"/>
              <g className="shv-label-g2">
                <rect x="299" y="300" width="84" height="20" rx="4"
                  fill="rgba(8,11,18,0.80)"
                  stroke="rgba(230,60,109,0.25)" strokeWidth="0.8"/>
                <text x="341" y="314"
                  textAnchor="middle"
                  fontFamily="'Geist',system-ui,sans-serif"
                  fontSize="7.5" fontWeight="700" letterSpacing="1.8"
                  fill="rgba(230,60,109,0.85)">CREATIVE</text>
              </g>

              {/* ── ARM 3: Digital (Teal) — points bottom-left (150°) ── */}
              <line x1="220" y1="220" x2="99" y2="291"
                stroke="url(#shv-arm-teal)" strokeWidth="2.5"
                filter="url(#shv-glow-teal)"/>
              <polygon points="99,291 140,240 170,310"
                fill="url(#shv-tri-teal)"
                stroke="rgba(78,205,196,0.20)" strokeWidth="0.8"/>
              <line x1="145" y1="262" x2="132" y2="268"
                stroke="rgba(78,205,196,0.25)" strokeWidth="1" strokeDasharray="3 5"/>
              <line x1="145" y1="262" x2="155" y2="278"
                stroke="rgba(78,205,196,0.25)" strokeWidth="1" strokeDasharray="3 5"/>
              <circle cx="99" cy="291" r="9"
                fill="rgba(78,205,196,0.15)"
                stroke="#4ECDC4" strokeWidth="1.5"
                className="shv-node-teal"
                filter="url(#shv-glow-teal)"/>
              <circle cx="99" cy="291" r="4" fill="#4ECDC4"/>
              <g className="shv-label-g3">
                <rect x="57" y="300" width="84" height="20" rx="4"
                  fill="rgba(8,11,18,0.80)"
                  stroke="rgba(78,205,196,0.25)" strokeWidth="0.8"/>
                <text x="99" y="314"
                  textAnchor="middle"
                  fontFamily="'Geist',system-ui,sans-serif"
                  fontSize="7.5" fontWeight="700" letterSpacing="1.8"
                  fill="rgba(78,205,196,0.85)">DIGITAL</text>
              </g>

            </g>{/* end .shv-arms */}

            {/* ── Orbiting dots on mid ring ── */}
            <g className="shv-dot-track-1">
              <circle cx="220" cy="72" r="4"
                fill="#D4AF37"
                filter="url(#shv-glow-gold)" opacity="0.7"/>
            </g>
            <g className="shv-dot-track-2">
              <circle cx="220" cy="72" r="3"
                fill="#E63C6D"
                filter="url(#shv-glow-coral)" opacity="0.6"/>
            </g>
            <g className="shv-dot-track-3">
              <circle cx="368" cy="220" r="3.5"
                fill="#4ECDC4"
                filter="url(#shv-glow-teal)" opacity="0.65"/>
            </g>

            {/* ── Central hub ── */}
            {/* Outer halo */}
            <circle cx="220" cy="220" r="32"
              fill="none"
              stroke="rgba(212,175,55,0.12)"
              strokeWidth="1" strokeDasharray="3 6"/>
            {/* Hub ring */}
            <circle cx="220" cy="220" r="22"
              fill="rgba(10,14,20,0.9)"
              stroke="rgba(212,175,55,0.30)"
              strokeWidth="1.5"/>
            {/* Core glow */}
            <circle cx="220" cy="220" r="14"
              fill="rgba(212,175,55,0.08)"
              className="shv-core-pulse"
              filter="url(#shv-glow-core)"/>
            {/* Core dot */}
            <circle cx="220" cy="220" r="6"
              fill="#D4AF37" opacity="0.9"
              filter="url(#shv-glow-gold)"/>
            {/* Hub crosshair */}
            <line x1="208" y1="220" x2="232" y2="220"
              stroke="rgba(212,175,55,0.35)" strokeWidth="0.8"/>
            <line x1="220" y1="208" x2="220" y2="232"
              stroke="rgba(212,175,55,0.35)" strokeWidth="0.8"/>

            {/* ── Corner crosshairs ── */}
            {[{x:28,y:28},{x:412,y:28},{x:28,y:412},{x:412,y:412}].map(({x,y},i)=>(
              <g key={i}>
                <line x1={x-7} y1={y} x2={x+7} y2={y}
                  stroke="rgba(212,175,55,0.18)" strokeWidth="0.8"/>
                <line x1={x} y1={y-7} x2={x} y2={y+7}
                  stroke="rgba(212,175,55,0.18)" strokeWidth="0.8"/>
              </g>
            ))}

            {/* ── Coordinate readout ── */}
            <text x="28" y="22"
              fontFamily="'Geist',monospace" fontSize="7"
              fill="rgba(212,175,55,0.25)" letterSpacing="1.5">
              SVC:3 · ACTIVE
            </text>
          </svg>
        </div>

        {/* ── Floating service-count tags ── */}
        <div className="shv-tag shv-tag--growth">
          <span className="shv-tag-dot shv-tag-dot--gold"/>
          <span className="shv-tag-label">Growth</span>
          <span className="shv-tag-val">4 services</span>
        </div>

        <div className="shv-tag shv-tag--creative">
          <span className="shv-tag-dot shv-tag-dot--coral"/>
          <span className="shv-tag-label">Creative</span>
          <span className="shv-tag-val">4 services</span>
        </div>

        <div className="shv-tag shv-tag--digital">
          <span className="shv-tag-dot shv-tag-dot--teal"/>
          <span className="shv-tag-label">Digital</span>
          <span className="shv-tag-val">4 services</span>
        </div>
      </div>
    </aside>
  )
}
