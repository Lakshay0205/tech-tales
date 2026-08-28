export default function HeroVisual() {
  return (
    <aside className="hv-wrap" aria-hidden="true">
      {/* Ambient glow layer behind everything */}
      <div className="hv-glow" />

      {/* Floating container */}
      <div className="hv-float">
        {/* Masked image wrapper */}
        <div className="hv-mask">
          {/* ── 3-D geometric scene built entirely in CSS ── */}
          <div className="hv-scene">

            {/* Outer slow-spin ring */}
            <div className="hv-ring hv-ring--outer" />

            {/* Mid dashed orbit */}
            <div className="hv-ring hv-ring--mid" />

            {/* Inner solid ring */}
            <div className="hv-ring hv-ring--inner" />

            {/* Tilted equatorial band */}
            <div className="hv-band" />

            {/* Central sphere */}
            <div className="hv-sphere">
              <div className="hv-sphere-gloss" />
              <div className="hv-sphere-core" />
            </div>

            {/* Orbiting dot — ring 1 */}
            <div className="hv-orbit hv-orbit--a">
              <div className="hv-dot hv-dot--gold" />
            </div>

            {/* Orbiting dot — ring 2 */}
            <div className="hv-orbit hv-orbit--b">
              <div className="hv-dot hv-dot--coral" />
            </div>

            {/* Orbiting dot — ring 3 */}
            <div className="hv-orbit hv-orbit--c">
              <div className="hv-dot hv-dot--teal" />
            </div>

            {/* Corner accent nodes */}
            <div className="hv-node hv-node--tl" />
            <div className="hv-node hv-node--tr" />
            <div className="hv-node hv-node--bl" />
            <div className="hv-node hv-node--br" />

            {/* Crosshair lines */}
            <div className="hv-cross hv-cross--h" />
            <div className="hv-cross hv-cross--v" />

            {/* Tick marks on outer ring */}
            {[0,45,90,135,180,225,270,315].map(deg => (
              <div
                key={deg}
                className="hv-tick"
                style={{ transform: `rotate(${deg}deg) translateY(-148px)` }}
              />
            ))}

            {/* Data-readout chips */}
            <div className="hv-chip hv-chip--top">
              <span className="hv-chip-dot" />
              <span className="hv-chip-label">SYSTEM ACTIVE</span>
            </div>
            <div className="hv-chip hv-chip--bot">
              <span className="hv-chip-dot hv-chip-dot--coral" />
              <span className="hv-chip-label">SIGNAL 100%</span>
            </div>

          </div>
        </div>
      </div>
    </aside>
  )
}
