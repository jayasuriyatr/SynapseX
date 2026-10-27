"use client";

import { useEffect, useRef, useState } from "react";
import type { BrainRegion } from "@/types";
import { cn } from "@/lib/utils";

interface Hotspot {
  id: string;
  cx: number;
  cy: number;
  r: number;
}

const HOTSPOTS: Hotspot[] = [
  { id: "frontal", cx: 104, cy: 110, r: 26 },
  { id: "central", cx: 150, cy: 86, r: 22 },
  { id: "parietal", cx: 200, cy: 100, r: 22 },
  { id: "temporal", cx: 150, cy: 168, r: 24 },
  { id: "occipital", cx: 232, cy: 142, r: 20 },
];

function heatColor(c: number) {
  // blue (low) -> violet (high)
  return `color-mix(in srgb, var(--color-signal-violet) ${Math.round(
    c * 100,
  )}%, var(--color-neural-blue))`;
}

/**
 * Interactive pseudo-3D brain. Auto-rotates (rotateY), supports manual
 * rotate / zoom / reset camera controls, and highlights cortical regions
 * shaded by their contribution to the current prediction.
 */
export function InteractiveBrain({
  regions,
  compact = false,
  className,
}: {
  regions: BrainRegion[];
  compact?: boolean;
  className?: string;
}) {
  const [angle, setAngle] = useState(-18);
  const [zoom, setZoom] = useState(1);
  const [spinning, setSpinning] = useState(!compact);
  const [selected, setSelected] = useState<string | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!spinning) return;
    const tick = () => {
      setAngle((a) => (a + 0.25) % 360);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [spinning]);

  const byId = (id: string) => regions.find((r) => r.id === id);

  return (
    <div className={cn("flex flex-col", className)}>
      <div
        className="relative flex-1 overflow-hidden rounded-lg bg-gradient-to-b from-slate-50 to-white"
        style={{ perspective: "900px" }}
      >
        <div
          className="mx-auto transition-transform duration-100"
          style={{
            transform: `rotateY(${angle}deg) scale(${zoom})`,
            transformStyle: "preserve-3d",
          }}
        >
          <svg viewBox="0 0 300 270" className="mx-auto w-full max-w-sm" role="img" aria-label="Interactive brain region map">
            <defs>
              <radialGradient id="ib-aura" cx="50%" cy="42%" r="60%">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ib-body" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c7d2fe" />
                <stop offset="100%" stopColor="#a5b4fc" />
              </linearGradient>
            </defs>

            <ellipse cx="150" cy="120" rx="140" ry="120" fill="url(#ib-aura)" />

            <path
              d="M96 70 C120 44 168 40 196 56 C214 50 236 60 240 82 C258 88 262 112 248 126 C256 142 246 164 228 166 C224 186 200 196 180 188 C166 202 138 202 124 188 C102 192 82 178 82 158 C64 152 58 128 72 112 C62 96 74 74 96 70 Z"
              fill="url(#ib-body)"
              stroke="#818cf8"
              strokeWidth="1.5"
            />

            {HOTSPOTS.map((h) => {
              const region = byId(h.id);
              const c = region?.contribution ?? 0;
              const isSel = selected === h.id;
              return (
                <g key={h.id} className="cursor-pointer" onClick={() => setSelected(h.id)}>
                  <circle
                    cx={h.cx}
                    cy={h.cy}
                    r={h.r}
                    fill={heatColor(c)}
                    opacity={isSel ? 0.92 : 0.62}
                    stroke={isSel ? "#0f172a" : "white"}
                    strokeWidth={isSel ? 2 : 1}
                  />
                  <text x={h.cx} y={h.cy + 3} textAnchor="middle" fontSize="9" fontWeight="600" fill="white">
                    {Math.round(c * 100)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Camera controls */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-pill border border-slate-200 bg-white/90 px-1.5 py-1 backdrop-blur">
          <CamButton label="Rotate left" onClick={() => setAngle((a) => a - 15)}>↺</CamButton>
          <CamButton label={spinning ? "Pause rotation" : "Auto rotate"} onClick={() => setSpinning((s) => !s)}>
            {spinning ? "⏸" : "▶"}
          </CamButton>
          <CamButton label="Rotate right" onClick={() => setAngle((a) => a + 15)}>↻</CamButton>
          <span className="mx-1 h-4 w-px bg-slate-200" />
          <CamButton label="Zoom out" onClick={() => setZoom((z) => Math.max(0.8, z - 0.1))}>−</CamButton>
          <CamButton label="Zoom in" onClick={() => setZoom((z) => Math.min(1.6, z + 0.1))}>+</CamButton>
          <CamButton
            label="Reset camera"
            onClick={() => {
              setAngle(-18);
              setZoom(1);
            }}
          >
            ⟲
          </CamButton>
        </div>
      </div>

      {/* Selected region detail */}
      {!compact ? (
        <div className="mt-4 rounded-md border border-slate-200 bg-white p-4">
          {selected ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">{byId(selected)?.name}</p>
                <p className="text-xs text-slate-500">Contribution to current prediction</p>
              </div>
              <span className="font-display text-xl font-bold text-signal-violet">
                {Math.round((byId(selected)?.contribution ?? 0) * 100)}%
              </span>
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              Select a highlighted region to inspect its contribution.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}

function CamButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid h-7 w-7 place-items-center rounded-pill text-sm text-slate-700 hover:bg-slate-100"
    >
      {children}
    </button>
  );
}
