import { cn } from "@/lib/utils";

/**
 * Stylized 3D-looking brain activation heatmap. The brain silhouette is
 * filled with a cool→warm activation gradient plus localized "hot" blobs
 * (left-temporal/frontal) to mimic seizure activity. Dependency-free SVG.
 */
export function BrainHeatmap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 280" className={cn("h-full w-full", className)} role="img" aria-label="3D brain activation map">
      <defs>
        <radialGradient id="bh-base" cx="42%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="22%" stopColor="#f97316" />
          <stop offset="42%" stopColor="#eab308" />
          <stop offset="62%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#2563eb" />
        </radialGradient>
        <radialGradient id="bh-hot1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bh-hot2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bh-glow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <clipPath id="bh-clip">
          <path d="M104 64 C132 36 184 32 214 50 C234 44 258 56 262 80 C282 88 286 116 270 132 C280 150 268 176 246 178 C242 200 214 212 192 202 C176 218 142 218 128 202 C104 206 82 190 82 168 C62 160 56 132 72 114 C60 96 76 66 104 64 Z" />
        </clipPath>
      </defs>

      <ellipse cx="160" cy="130" rx="150" ry="130" fill="url(#bh-glow)" />

      <g clipPath="url(#bh-clip)">
        <rect x="60" y="30" width="220" height="190" fill="url(#bh-base)" />
        {/* localized hot regions (left temporal / frontal) */}
        <circle cx="130" cy="120" r="48" fill="url(#bh-hot1)" />
        <circle cx="150" cy="95" r="34" fill="url(#bh-hot2)" />
        {/* gyri texture */}
        <g stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.18">
          <path d="M110 70 C130 64 136 84 122 92 C110 100 118 116 134 112" />
          <path d="M160 56 C160 74 148 80 152 96 C156 110 144 116 148 130" />
          <path d="M210 64 C204 80 218 86 212 102 C206 116 220 122 214 136" />
          <path d="M240 88 C230 98 242 108 234 120" />
          <path d="M100 140 C116 138 120 154 108 162" />
        </g>
      </g>

      {/* brain outline */}
      <path
        d="M104 64 C132 36 184 32 214 50 C234 44 258 56 262 80 C282 88 286 116 270 132 C280 150 268 176 246 178 C242 200 214 212 192 202 C176 218 142 218 128 202 C104 206 82 190 82 168 C62 160 56 132 72 114 C60 96 76 66 104 64 Z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        opacity="0.35"
      />

      {/* base ring / pedestal */}
      <ellipse cx="160" cy="232" rx="96" ry="14" fill="none" stroke="#a5b4fc" strokeWidth="1.5" opacity="0.5" strokeDasharray="3 5" />
    </svg>
  );
}
