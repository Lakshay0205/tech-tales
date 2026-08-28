/* ContactHeroVisual — Signal broadcast tower + message envelope
   Represents: communication, connection, reaching out
   Distinct from: Home crystal, About sphere-rings, Services triskelion,
                  Portfolio film-strip, Pricing tier-stack
*/
export default function ContactHeroVisual() {
  return (
    <aside className="chv-col" aria-hidden="true">
      <style>{`
        .chv-col {
          flex: 0 0 460px; width: 460px;
          display: flex; align-items: center; justify-content: center;
        }
        @media (max-width: 1100px) { .chv-col { flex: 0 0 360px; width: 360px; } }
        @media (max-width: 860px)  { .chv-col { display: none; } }

        .chv-wrap {
          position: relative;
          width: clamp(300px, 36vw, 420px);
          height: clamp(320px, 40vw, 460px);
          display: flex; align-items: center; justify-content: center;
        }

        .chv-ambient {
          position: absolute; inset: -15%; border-radius: 50%;
          background: radial-gradient(ellipse at 50% 60%,
            rgba(212,175,55,0.10) 0%,
            rgba(78,205,196,0.07) 45%,
            transparent 70%);
          filter: blur(44px); pointer-events: none;
          animation: chv-ambient 7s ease-in-out infinite;
        }

        .chv-floater {
          animation: chv-float 5.5s ease-in-out infinite;
          position: relative;
        }

        .chv-svg {
          width: clamp(280px, 34vw, 400px);
          height: clamp(280px, 34vw, 400px);
          overflow: visible;
          filter: drop-shadow(0 0 24px rgba(212,175,55,0.10))
                  drop-shadow(0 0 48px rgba(78,205,196,0.07));
        }

        /* Ripple waves */
        .chv-wave-1 { animation: chv-ripple 3s ease-out infinite; }
        .chv-wave-2 { animation: chv-ripple 3s ease-out infinite 0.8s; }
        .chv-wave-3 { animation: chv-ripple 3s ease-out infinite 1.6s; }

        /* Tower pulse */
        .chv-tower-glow { animation: chv-tower-pulse 2.4s ease-in-out infinite; }

        /* Signal dots travelling up the tower */
        .chv-signal-dot-1 { animation: chv-signal-travel 2.2s ease-in-out infinite; }
        .chv-signal-dot-2 { animation: chv-signal-travel 2.2s ease-in-out infinite 0.7s; }
        .chv-signal-dot-3 { animation: chv-signal-travel 2.2s ease-in-out infinite 1.4s; }

        /* Envelope float */
        .chv-envelope {
          animation: chv-envelope-drift 5s ease-in-out infinite 0.5s;
        }
        .chv-envelope-2 {
          animation: chv-envelope-drift 6.5s ease-in-out infinite 1.5s;
        }
        .chv-envelope-3 {
          animation: chv-envelope-drift 4.8s ease-in-out infinite 2.5s;
        }

        /* Floating info chips */
        .chv-chip {
          position: absolute;
          background: rgba(8,11,18,0.82);
          border-radius: 10px; padding: 8px 12px;
          backdrop-filter: blur(14px);
          display: flex; align-items: center; gap: 7px;
          pointer-events: none; z-index: 5;
        }
        .chv-chip--tl {
          top: 4%; left: -2%;
          border: 1px solid rgba(212,175,55,0.25);
          animation: chv-chip-drift 6s ease-in-out infinite;
        }
        .chv-chip--br {
          bottom: 6%; right: -2%;
          border: 1px solid rgba(78,205,196,0.22);
          animation: chv-chip-drift 7s ease-in-out infinite 1.2s;
        }
        .chv-chip-dot {
          width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
        }
        .chv-chip-dot--gold  { background: #D4AF37; box-shadow: 0 0 8px rgba(212,175,55,0.9); animation: chv-blink 1.8s ease-in-out infinite; }
        .chv-chip-dot--teal  { background: #4ECDC4; box-shadow: 0 0 8px rgba(78,205,196,0.9); animation: chv-blink 2.2s ease-in-out infinite 0.6s; }
        .chv-chip-label {
          font-family: 'Geist', system-ui, sans-serif;
          font-size: 0.48rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase; color: #6B7280;
        }
        .chv-chip-val {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 0.95rem; font-weight: 500;
          letter-spacing: -0.02em; color: #F5F3EF;
        }

        /* Corner brackets */
        .chv-bracket {
          position: absolute; width: 16px; height: 16px; pointer-events: none; z-index: 6;
        }
        .chv-bracket--tl { top: 10px; left: 10px; border-top: 1px solid rgba(212,175,55,0.28); border-left: 1px solid rgba(212,175,55,0.28); }
        .chv-bracket--tr { top: 10px; right: 10px; border-top: 1px solid rgba(212,175,55,0.28); border-right: 1px solid rgba(212,175,55,0.28); }
        .chv-bracket--bl { bottom: 10px; left: 10px; border-bottom: 1px solid rgba(212,175,55,0.28); border-left: 1px solid rgba(212,175,55,0.28); }
        .chv-bracket--br { bottom: 10px; right: 10px; border-bottom: 1px solid rgba(212,175,55,0.28); border-right: 1px solid rgba(212,175,55,0.28); }

        /* ── Keyframes ── */
        @keyframes chv-float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes chv-ambient {
          0%,100% { opacity: 0.7; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.06); }
        }
        @keyframes chv-ripple {
          0%   { r: 60; opacity: 0.5; }
          100% { r: 160; opacity: 0; }
        }
        @keyframes chv-tower-pulse {
          0%,100% { opacity: 0.6; filter: drop-shadow(0 0 4px rgba(212,175,55,0.5)); }
          50%      { opacity: 1;   filter: drop-shadow(0 0 14px rgba(212,175,55,1)); }
        }
        @keyframes chv-signal-travel {
          0%   { cy: 260; opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { cy: 100; opacity: 0; }
        }
        @keyframes chv-envelope-drift {
          0%,100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.7; }
          33%      { transform: translate(6px, -10px) rotate(3deg); opacity: 1; }
          66%      { transform: translate(-4px, -6px) rotate(-2deg); opacity: 0.85; }
        }
        @keyframes chv-chip-drift {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-7px); }
        }
        @keyframes chv-blink {
          0%,100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }
      `}</style>

      <div className="chv-wrap">
        <div className="chv-ambient" />

        {/* Corner brackets */}
        <div className="chv-bracket chv-bracket--tl" />
        <div className="chv-bracket chv-bracket--tr" />
        <div className="chv-bracket chv-bracket--bl" />
        <div className="chv-bracket chv-bracket--br" />

        <div className="chv-floater">
          <svg className="chv-svg" viewBox="0 0 400 400">
            <defs>
              <filter id="chv-glow-gold" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="4" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="chv-glow-teal" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="chv-glow-coral" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="chv-glow-soft" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="8" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <radialGradient id="chv-base-grad" cx="50%" cy="100%" r="50%">
                <stop offset="0%" stopColor="rgba(212,175,55,0.15)"/>
                <stop offset="100%" stopColor="transparent"/>
              </radialGradient>
              <linearGradient id="chv-tower-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2"/>
              </linearGradient>
            </defs>

            {/* ── Ground base glow ── */}
            <ellipse cx="200" cy="295" rx="90" ry="12"
              fill="url(#chv-base-grad)"
              filter="url(#chv-glow-soft)"/>

            {/* ── Ripple waves from base ── */}
            <circle cx="200" cy="270" r="60"
              fill="none" stroke="rgba(212,175,55,0.35)" strokeWidth="1"
              className="chv-wave-1"/>
            <circle cx="200" cy="270" r="60"
              fill="none" stroke="rgba(212,175,55,0.25)" strokeWidth="1"
              className="chv-wave-2"/>
            <circle cx="200" cy="270" r="60"
              fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="1"
              className="chv-wave-3"/>

            {/* ── Tower base platform ── */}
            <rect x="168" y="280" width="64" height="8" rx="4"
              fill="rgba(212,175,55,0.12)"
              stroke="rgba(212,175,55,0.30)" strokeWidth="1"/>
            {/* Platform legs */}
            <line x1="178" y1="288" x2="172" y2="300"
              stroke="rgba(212,175,55,0.25)" strokeWidth="1.5"/>
            <line x1="222" y1="288" x2="228" y2="300"
              stroke="rgba(212,175,55,0.25)" strokeWidth="1.5"/>
            <line x1="172" y1="300" x2="228" y2="300"
              stroke="rgba(212,175,55,0.20)" strokeWidth="1"/>

            {/* ── Tower main shaft ── */}
            <line x1="200" y1="100" x2="200" y2="280"
              stroke="url(#chv-tower-grad)" strokeWidth="3"
              className="chv-tower-glow"
              filter="url(#chv-glow-gold)"/>

            {/* Tower cross-braces */}
            {[200, 230, 260].map((y, i) => (
              <g key={i}>
                <line x1={200 - (i+1)*8} y1={y} x2={200 + (i+1)*8} y2={y}
                  stroke="rgba(212,175,55,0.30)" strokeWidth="1"/>
                <line x1={200 - (i+1)*8} y1={y} x2={200} y2={y - 30}
                  stroke="rgba(212,175,55,0.15)" strokeWidth="0.8"/>
                <line x1={200 + (i+1)*8} y1={y} x2={200} y2={y - 30}
                  stroke="rgba(212,175,55,0.15)" strokeWidth="0.8"/>
              </g>
            ))}

            {/* ── Signal dots travelling up shaft ── */}
            <circle cx="200" cy="200" r="3.5"
              fill="#D4AF37" filter="url(#chv-glow-gold)"
              className="chv-signal-dot-1"/>
            <circle cx="200" cy="200" r="3"
              fill="#4ECDC4" filter="url(#chv-glow-teal)"
              className="chv-signal-dot-2"/>
            <circle cx="200" cy="200" r="2.5"
              fill="#E63C6D" filter="url(#chv-glow-coral)"
              className="chv-signal-dot-3"/>

            {/* ── Tower tip antenna ── */}
            <line x1="200" y1="100" x2="200" y2="72"
              stroke="rgba(212,175,55,0.6)" strokeWidth="2"/>
            <circle cx="200" cy="68" r="6"
              fill="rgba(212,175,55,0.15)"
              stroke="#D4AF37" strokeWidth="1.5"
              filter="url(#chv-glow-gold)"
              className="chv-tower-glow"/>
            <circle cx="200" cy="68" r="3" fill="#D4AF37"/>

            {/* ── Broadcast arc lines from tip ── */}
            {[1, 2, 3].map(i => (
              <g key={i}>
                {/* Left arc */}
                <path
                  d={`M ${200 - i*22} ${68 + i*18} Q ${200 - i*30} ${68} ${200 - i*22} ${68 - i*18}`}
                  fill="none"
                  stroke={`rgba(212,175,55,${0.35 - i*0.08})`}
                  strokeWidth="1.2"
                  strokeLinecap="round"/>
                {/* Right arc */}
                <path
                  d={`M ${200 + i*22} ${68 + i*18} Q ${200 + i*30} ${68} ${200 + i*22} ${68 - i*18}`}
                  fill="none"
                  stroke={`rgba(212,175,55,${0.35 - i*0.08})`}
                  strokeWidth="1.2"
                  strokeLinecap="round"/>
              </g>
            ))}

            {/* ── Floating envelope 1 (main, gold) ── */}
            <g className="chv-envelope" transform="translate(280, 130)">
              <rect x="-22" y="-14" width="44" height="30" rx="5"
                fill="rgba(10,14,20,0.85)"
                stroke="rgba(212,175,55,0.40)" strokeWidth="1.2"/>
              {/* Envelope flap */}
              <path d="M-22,-14 L0,4 L22,-14"
                fill="none" stroke="rgba(212,175,55,0.40)" strokeWidth="1.2"/>
              {/* Envelope bottom fold */}
              <line x1="-22" y1="16" x2="0" y2="4"
                stroke="rgba(212,175,55,0.20)" strokeWidth="0.8"/>
              <line x1="22" y1="16" x2="0" y2="4"
                stroke="rgba(212,175,55,0.20)" strokeWidth="0.8"/>
              {/* Glow dot */}
              <circle cx="0" cy="0" r="3"
                fill="#D4AF37" opacity="0.6"
                filter="url(#chv-glow-gold)"/>
            </g>

            {/* ── Floating envelope 2 (small, teal) ── */}
            <g className="chv-envelope-2" transform="translate(110, 160)">
              <rect x="-16" y="-10" width="32" height="22" rx="4"
                fill="rgba(10,14,20,0.80)"
                stroke="rgba(78,205,196,0.35)" strokeWidth="1"/>
              <path d="M-16,-10 L0,3 L16,-10"
                fill="none" stroke="rgba(78,205,196,0.35)" strokeWidth="1"/>
              <circle cx="0" cy="0" r="2.5"
                fill="#4ECDC4" opacity="0.5"
                filter="url(#chv-glow-teal)"/>
            </g>

            {/* ── Floating envelope 3 (tiny, coral) ── */}
            <g className="chv-envelope-3" transform="translate(310, 210)">
              <rect x="-13" y="-8" width="26" height="18" rx="3"
                fill="rgba(10,14,20,0.78)"
                stroke="rgba(230,60,109,0.30)" strokeWidth="1"/>
              <path d="M-13,-8 L0,2 L13,-8"
                fill="none" stroke="rgba(230,60,109,0.30)" strokeWidth="1"/>
              <circle cx="0" cy="0" r="2"
                fill="#E63C6D" opacity="0.5"
                filter="url(#chv-glow-coral)"/>
            </g>

            {/* ── Dashed connection lines from envelopes to tower ── */}
            <line x1="258" y1="130" x2="210" y2="120"
              stroke="rgba(212,175,55,0.15)" strokeWidth="1"
              strokeDasharray="4 6"/>
            <line x1="126" y1="160" x2="192" y2="140"
              stroke="rgba(78,205,196,0.12)" strokeWidth="1"
              strokeDasharray="4 6"/>
            <line x1="297" y1="210" x2="210" y2="180"
              stroke="rgba(230,60,109,0.12)" strokeWidth="1"
              strokeDasharray="4 6"/>

            {/* ── Corner crosshairs ── */}
            {[{x:28,y:28},{x:372,y:28},{x:28,y:372},{x:372,y:372}].map(({x,y},i)=>(
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
              SIGNAL · LIVE
            </text>
          </svg>
        </div>

        {/* Floating info chips */}
        <div className="chv-chip chv-chip--tl">
          <span className="chv-chip-dot chv-chip-dot--gold" />
          <span className="chv-chip-label">Response</span>
          <span className="chv-chip-val">&lt; 24h</span>
        </div>
        <div className="chv-chip chv-chip--br">
          <span className="chv-chip-dot chv-chip-dot--teal" />
          <span className="chv-chip-label">Available</span>
          <span className="chv-chip-val">Now</span>
        </div>
      </div>
    </aside>
  )
}
