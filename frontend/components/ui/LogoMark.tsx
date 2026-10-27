import { cn } from "@/lib/utils";

/**
 * SynapseX logo mark — an "S" formed from a spiking neural network of
 * glossy nodes connected by synaptic links, in the brand cyan→blue→violet
 * gradient. Scalable vector (brand logo rule). Used standalone or inside
 * the <Logo /> wordmark lockup.
 */

type NodeColor = "cyan" | "blue" | "violet";

const NODES: { x: number; y: number; c: NodeColor; r: number }[] = [
  { x: 30, y: 15, c: "blue", r: 5 }, // 0 top-center
  { x: 48, y: 13, c: "cyan", r: 4.6 }, // 1 top-right
  { x: 14, y: 23, c: "violet", r: 5 }, // 2 upper-left
  { x: 43, y: 26, c: "cyan", r: 4.6 }, // 3 mid-right
  { x: 18, y: 36, c: "violet", r: 5 }, // 4 lower-left
  { x: 48, y: 36, c: "blue", r: 5.6 }, // 5 right (largest)
  { x: 14, y: 49, c: "cyan", r: 5 }, // 6 bottom-left
  { x: 39, y: 49, c: "blue", r: 5 }, // 7 bottom-center
];

// bright synaptic links that trace the "S"
const LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [2, 3],
  [3, 5],
  [4, 5],
  [4, 6],
  [6, 7],
];

// faint backbone struts (the slanted frame behind the nodes)
const BACKBONE: [number, number][] = [
  [1, 5],
  [2, 4],
  [5, 7],
];

const FILL: Record<NodeColor, string> = {
  cyan: "url(#sx-cyan)",
  blue: "url(#sx-blue)",
  violet: "url(#sx-violet)",
};

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 62 64"
      className={cn("block", className)}
      role="img"
      aria-label="SynapseX"
    >
      <defs>
        <linearGradient id="sx-link" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <radialGradient id="sx-cyan" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#a5f3fc" />
          <stop offset="55%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#06b6d4" />
        </radialGradient>
        <radialGradient id="sx-blue" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="55%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#2563eb" />
        </radialGradient>
        <radialGradient id="sx-violet" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#d8b4fe" />
          <stop offset="55%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </radialGradient>
      </defs>

      {/* faint backbone struts */}
      <g
        stroke="#3b5bdb"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.28"
        fill="none"
      >
        {BACKBONE.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
          />
        ))}
      </g>

      {/* bright synaptic links */}
      <g
        stroke="url(#sx-link)"
        strokeWidth="4.4"
        strokeLinecap="round"
        fill="none"
      >
        {LINKS.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
          />
        ))}
      </g>

      {/* glossy nodes */}
      <g>
        {NODES.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r} fill={FILL[n.c]} />
            <circle
              cx={n.x - n.r * 0.32}
              cy={n.y - n.r * 0.36}
              r={n.r * 0.32}
              fill="#ffffff"
              opacity="0.65"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
