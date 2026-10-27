import { cn } from "@/lib/utils";

/**
 * EEG topographic scalp map — head outline (nose + ears) with an interpolated
 * activity heat field (blue→cyan→green→yellow→red) and electrode dots.
 * Dependency-free SVG.
 */
export function TopoMap({ className }: { className?: string }) {
  // electrode positions within the head circle (cx=100, cy=100, r=70)
  const electrodes = [
    [100, 40], [70, 52], [130, 52], [55, 80], [100, 75], [145, 80],
    [45, 110], [75, 108], [125, 108], [155, 110], [70, 140], [100, 140],
    [130, 140], [85, 162], [115, 162],
  ];

  return (
    <svg viewBox="0 0 200 200" className={cn("h-full w-full", className)} role="img" aria-label="Topographic signal quality map">
      <defs>
        <radialGradient id="topo-hot" cx="38%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="20%" stopColor="#f97316" />
          <stop offset="42%" stopColor="#eab308" />
          <stop offset="64%" stopColor="#22c55e" />
          <stop offset="82%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#2563eb" />
        </radialGradient>
        <clipPath id="topo-head">
          <circle cx="100" cy="100" r="70" />
        </clipPath>
      </defs>

      {/* nose */}
      <path d="M92 32 L100 18 L108 32 Z" fill="none" stroke="#94a3b8" strokeWidth="2" />
      {/* ears */}
      <path d="M30 90 q-12 10 0 20" fill="none" stroke="#94a3b8" strokeWidth="2" />
      <path d="M170 90 q12 10 0 20" fill="none" stroke="#94a3b8" strokeWidth="2" />

      {/* heat field */}
      <g clipPath="url(#topo-head)">
        <rect x="30" y="30" width="140" height="140" fill="url(#topo-hot)" />
      </g>

      {/* head outline */}
      <circle cx="100" cy="100" r="70" fill="none" stroke="#64748b" strokeWidth="2" />

      {/* electrodes */}
      <g>
        {electrodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.4" fill="#0f172a" fillOpacity="0.35" stroke="#fff" strokeWidth="0.8" />
        ))}
      </g>
    </svg>
  );
}
