/**
 * Static stand-in for the WebGL hero.
 *
 * Rendered instead of the canvas when the visitor has asked for reduced
 * motion, is on a data saver connection, has no WebGL context available, or is
 * on very low-powered hardware. It is deliberately motionless and ships as
 * inline SVG, so it costs nothing beyond the markup.
 */

type Node = { x: number; y: number; r: number; o: number };

const CX = 300;
const CY = 300;

const RINGS = [
  { rx: 108, ry: 42, rotate: -16, count: 7, phase: 0.15 },
  { rx: 168, ry: 66, rotate: 22, count: 9, phase: 0.42 },
  { rx: 232, ry: 92, rotate: -40, count: 11, phase: 0.78 },
];

function ringNodes(ring: (typeof RINGS)[number]): Node[] {
  const rad = (ring.rotate * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return Array.from({ length: ring.count }, (_, i) => {
    const t = ((i + ring.phase) / ring.count) * Math.PI * 2;
    const ex = Math.cos(t) * ring.rx;
    const ey = Math.sin(t) * ring.ry;
    return {
      // Rounded so server and client serialize the same string.
      x: Math.round((CX + ex * cos - ey * sin) * 100) / 100,
      y: Math.round((CY + ex * sin + ey * cos) * 100) / 100,
      r: i % 4 === 0 ? 4.2 : 2.8,
      o: 0.45 + ((i * 37) % 10) / 20,
    };
  });
}

export function OrbitFallback({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      role="img"
      aria-label="Illustration of prospect nodes orbiting and connecting to a central business"
    >
      <defs>
        <radialGradient id="so-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="22%" stopColor="#bcdcff" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#4da3ff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#4da3ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="so-node" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e8f4ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#4da3ff" stopOpacity="0.15" />
        </radialGradient>
        <linearGradient id="so-link" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4da3ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#4da3ff" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      <circle cx={CX} cy={CY} r={250} fill="url(#so-core)" opacity="0.7" />

      {RINGS.map((ring, ri) => (
        <g key={ri}>
          <ellipse
            cx={CX}
            cy={CY}
            rx={ring.rx}
            ry={ring.ry}
            transform={`rotate(${ring.rotate} ${CX} ${CY})`}
            fill="none"
            stroke="#4da3ff"
            strokeOpacity={0.16}
            strokeWidth={1}
          />
          {ringNodes(ring).map((node, ni) => (
            <g key={ni}>
              <line
                x1={CX}
                y1={CY}
                x2={node.x}
                y2={node.y}
                stroke="url(#so-link)"
                strokeWidth={0.9}
                strokeOpacity={0.5}
              />
              <circle cx={node.x} cy={node.y} r={node.r * 3.4} fill="url(#so-node)" opacity={0.18} />
              <circle cx={node.x} cy={node.y} r={node.r} fill="#cfe6ff" opacity={node.o} />
            </g>
          ))}
        </g>
      ))}

      <circle cx={CX} cy={CY} r={44} fill="none" stroke="#4da3ff" strokeOpacity={0.28} strokeWidth={1} />
      <circle cx={CX} cy={CY} r={62} fill="none" stroke="#4da3ff" strokeOpacity={0.14} strokeWidth={1} />
      <circle cx={CX} cy={CY} r={11} fill="#dbeeff" />
    </svg>
  );
}
