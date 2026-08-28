// FloatingMesh — static SVG with a single CSS animation (no Framer Motion per-element)
// Replaced 43 individual motion.line/motion.circle with plain SVG + one CSS keyframe

const phi = (1 + Math.sqrt(5)) / 2
const verts3d = [
  [0, 1, phi], [0, -1, phi], [0, 1, -phi], [0, -1, -phi],
  [1, phi, 0], [-1, phi, 0], [1, -phi, 0], [-1, -phi, 0],
  [phi, 0, 1], [-phi, 0, 1], [phi, 0, -1], [-phi, 0, -1],
]

const edges = [
  [0,1],[0,4],[0,5],[0,8],[0,9],
  [1,6],[1,7],[1,8],[1,9],
  [2,3],[2,4],[2,5],[2,10],[2,11],
  [3,6],[3,7],[3,10],[3,11],
  [4,5],[4,8],[4,10],
  [5,9],[5,11],
  [6,7],[6,8],[6,10],
  [7,9],[7,11],
  [8,10],[9,11],
]

const tiltX = 0.3
const tiltY = 0.5

function buildVerts(size) {
  const cx = size / 2
  const cy = size / 2
  const r  = size * 0.38
  return verts3d.map(([x, y, z]) => {
    const len = Math.sqrt(x * x + y * y + z * z)
    let nx = x / len, ny = y / len, nz = z / len
    const ny2 = ny * Math.cos(tiltX) - nz * Math.sin(tiltX)
    const nz2 = ny * Math.sin(tiltX) + nz * Math.cos(tiltX)
    const nx3 = nx * Math.cos(tiltY) + nz2 * Math.sin(tiltY)
    const nz3 = -nx * Math.sin(tiltY) + nz2 * Math.cos(tiltY)
    const fov = 3.5
    const scale = fov / (fov + nz3)
    return { px: cx + nx3 * r * scale, py: cy + ny2 * r * scale, depth: (nz3 + 1) / 2 }
  })
}

export default function FloatingMesh({ size = 220 }) {
  const cx = size / 2
  const cy = size / 2
  const r  = size * 0.38
  const verts2d = buildVerts(size)

  return (
    <div
      style={{
        width: size, height: size, position: 'relative',
        animation: 'mesh-float 6s ease-in-out infinite',
      }}
    >
      <style>{`
        @keyframes mesh-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-12px) rotate(1.5deg); }
        }
      `}</style>

      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <circle cx={cx} cy={cy} r={r * 1.15} stroke="rgba(201,168,76,0.06)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={r * 1.35} stroke="rgba(201,168,76,0.03)" strokeWidth="0.5" strokeDasharray="4 8" />

        {edges.map(([a, b], i) => {
          const va = verts2d[a]
          const vb = verts2d[b]
          const avgDepth = (va.depth + vb.depth) / 2
          const alpha = (0.06 + avgDepth * 0.28).toFixed(2)
          return (
            <line
              key={i}
              x1={va.px} y1={va.py}
              x2={vb.px} y2={vb.py}
              stroke={`rgba(201,168,76,${alpha})`}
              strokeWidth={0.6 + avgDepth * 0.6}
            />
          )
        })}

        {verts2d.map((v, i) => (
          <circle
            key={i}
            cx={v.px} cy={v.py}
            r={1.2 + v.depth * 2.2}
            fill={`rgba(201,168,76,${(0.15 + v.depth * 0.55).toFixed(2)})`}
          />
        ))}

        {verts2d.filter(v => v.depth > 0.65).map((v, i) => (
          <circle
            key={`glow-${i}`}
            cx={v.px} cy={v.py}
            r={8}
            fill={`rgba(201,168,76,${(v.depth * 0.08).toFixed(2)})`}
          />
        ))}
      </svg>

      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.07) 0%, rgba(80,60,180,0.05) 40%, transparent 70%)',
        filter: 'blur(16px)', pointerEvents: 'none',
      }} />
    </div>
  )
}
