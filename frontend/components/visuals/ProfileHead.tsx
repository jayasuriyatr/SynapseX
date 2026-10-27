import { cn } from "@/lib/utils";

/**
 * Human profile silhouette overlaid with a neural network — used in the
 * final CTA section. Communicates "human understanding" + neural intelligence.
 */
export function ProfileHead({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={cn("w-full", className)}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="headFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id="headGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="120" cy="115" r="115" fill="url(#headGlow)" />

      {/* profile silhouette */}
      <path
        d="M70 210 V150 q-18-8-18-40 q0-58 56-66 q54-8 70 40 q8 24-6 40 l8 22 -16 6 4 26 -38 4 V210 Z"
        fill="url(#headFill)"
        opacity="0.18"
        stroke="url(#headFill)"
        strokeWidth="1.5"
      />

      {/* neural overlay inside the head */}
      <g stroke="#ffffff" strokeWidth="1" opacity="0.55">
        <path d="M86 96 110 88 132 104 120 128 96 124 86 96Z" />
        <path d="M132 104 150 92M120 128 138 142M96 124 84 140" />
      </g>
      <g fill="#ffffff">
        {[
          [86, 96], [110, 88], [132, 104], [120, 128], [96, 124], [150, 92], [138, 142], [84, 140],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={2.6}
            style={{
              animation: "var(--animate-pulse-soft)",
              animationDelay: `${(i % 4) * 0.4}s`,
            }}
          />
        ))}
      </g>
    </svg>
  );
}
