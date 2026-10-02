/**
 * Static stand-in for the WebGL hero on reduced-motion / low-power clients.
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
      x: Math.round((CX + ex * cos - ey * sin) * 100) / 100,
      y: Math.round((CY + ex * sin + ey * cos) * 100) / 100,
      r: i % 4 === 0 ? 4.6 : 3,
      o: 0.55 + ((i * 37) % 10) / 22,
    };
  });
}

export function OrbitFallback({
  className = "",
  theme = "dark",
}: {
  className?: string;
  theme?: "dark" | "light";
}) {
  const accent = theme === "dark" ? "#b33a2b" : "#1662c4";
  const core = theme === "dark" ? "#f7f4ef" : "#0b1a2e";
  const washOpacity = theme === "dark" ? 0.18 : 0.14;

  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      role="img"
      aria-label="Illustration of prospect nodes orbiting and connecting to a central business"
    >
      <defs>
        <radialGradient id="so-wash" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity={washOpacity} />
          <stop offset="60%" stopColor={accent} stopOpacity={washOpacity * 0.35} />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="so-link" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accent} stopOpacity="0.85" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <circle cx={CX} cy={CY} r={250} fill="url(#so-wash)" />

      {RINGS.map((ring, ri) => (
        <g key={ri}>
          <ellipse
            cx={CX}
            cy={CY}
            rx={ring.rx}
            ry={ring.ry}
            transform={`rotate(${ring.rotate} ${CX} ${CY})`}
            fill="none"
            stroke={accent}
            strokeOpacity={0.28}
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
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={ni % 4 === 0 ? core : accent}
                opacity={node.o}
              />
            </g>
          ))}
        </g>
      ))}

      <circle cx={CX} cy={CY} r={44} fill="none" stroke={accent} strokeOpacity={0.35} strokeWidth={1} />
      <circle cx={CX} cy={CY} r={62} fill="none" stroke={accent} strokeOpacity={0.2} strokeWidth={1} />
      <circle cx={CX} cy={CY} r={9} fill={core} />
    </svg>
  );
}
