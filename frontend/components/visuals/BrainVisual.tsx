import { cn } from "@/lib/utils";

/**
 * Anatomical brain illustration (left-facing profile) rendered in the brand
 * intelligence gradient with a soft aura and pedestal — mirrors the hero
 * visual in the reference mockup. Subtle synaptic nodes pulse over the
 * surface to keep it on-brand (neural pathways, not literal medical imagery).
 */
export function BrainVisual({ className }: { className?: string }) {
  // synaptic nodes positioned over the cortex
  const nodes = [
    [120, 96], [150, 80], [180, 92], [205, 116], [168, 120],
    [134, 128], [196, 150], [150, 158], [118, 150], [176, 178],
  ];

  return (
    <div className={cn("relative", className)}>
      <svg viewBox="0 0 300 270" className="w-full" aria-hidden="true">
        <defs>
          <radialGradient id="brainAura" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
            <stop offset="55%" stopColor="#2563eb" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="brainBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="brainSheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* aura */}
        <ellipse cx="150" cy="120" rx="140" ry="120" fill="url(#brainAura)" />

        {/* ---- Brain body ---- */}
        <g>
          {/* cerebrum outline */}
          <path
            d="M96 70
               C120 44 168 40 196 56
               C214 50 236 60 240 82
               C258 88 262 112 248 126
               C256 142 246 164 228 166
               C224 186 200 196 180 188
               C166 202 138 202 124 188
               C102 192 82 178 82 158
               C64 152 58 128 72 112
               C62 96 74 74 96 70 Z"
            fill="url(#brainBody)"
          />

          {/* brain stem */}
          <path
            d="M150 186 C150 198 146 210 138 218 C150 222 164 218 168 206 C170 196 166 188 162 184 Z"
            fill="url(#brainBody)"
            opacity="0.92"
          />

          {/* cerebellum hint */}
          <path
            d="M196 168 C214 170 226 182 222 196 C214 206 196 204 188 192 C184 182 188 172 196 168 Z"
            fill="#4f46e5"
            opacity="0.85"
          />

          {/* sulci / gyri fold lines */}
          <g
            stroke="#c4b5fd"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          >
            <path d="M104 78 C124 72 130 92 116 100 C104 108 112 124 128 120" />
            <path d="M150 60 C150 78 138 84 142 100 C146 114 134 120 138 134" />
            <path d="M188 66 C182 82 196 88 190 104 C184 118 198 124 192 138" />
            <path d="M224 86 C214 96 226 106 218 118 C210 128 222 138 214 148" />
            <path d="M96 120 C112 118 116 134 104 142" />
            <path d="M150 150 C164 146 168 162 156 170" />
            <path d="M120 158 C134 154 138 170 126 176" />
          </g>

          {/* central fissure highlight */}
          <path
            d="M150 58 C152 92 150 130 148 184"
            stroke="#ede9fe"
            strokeWidth="1.4"
            fill="none"
            opacity="0.5"
          />

          {/* top sheen */}
          <path
            d="M96 70 C120 44 168 40 196 56 C214 50 236 60 240 82 C210 70 150 64 110 82 C100 86 92 80 96 70 Z"
            fill="url(#brainSheen)"
          />

          {/* synaptic nodes pulsing over the cortex */}
          {nodes.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i % 3 === 0 ? 3.4 : 2.4}
              fill="#ffffff"
              opacity="0.9"
              style={{
                animation: "var(--animate-pulse-soft)",
                animationDelay: `${(i % 5) * 0.4}s`,
              }}
            />
          ))}
        </g>
      </svg>

      {/* pedestal / platform */}
      <div className="mx-auto -mt-2 h-2 w-3/5 rounded-pill bg-intelligence-gradient opacity-70 blur-[2px]" />
      <div className="mx-auto h-10 w-3/4 rounded-[50%] bg-signal-violet/10 blur-xl" />
    </div>
  );
}
