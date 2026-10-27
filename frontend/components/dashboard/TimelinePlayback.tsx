"use client";

import { useEffect, useRef, useState } from "react";
import { PlayIcon } from "@/components/ui/icons";

/** Timeline scrubber with play/pause for brain-activity playback. */
export function TimelinePlayback({ durationSec = 30 }: { durationSec?: number }) {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const raf = useRef<number | null>(null);
  const last = useRef<number>(0);

  useEffect(() => {
    if (!playing) return;
    last.current = performance.now();
    const tick = (now: number) => {
      const dt = (now - last.current) / 1000;
      last.current = now;
      setT((prev) => {
        const next = prev + dt;
        if (next >= durationSec) {
          setPlaying(false);
          return durationSec;
        }
        return next;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [playing, durationSec]);

  const pct = (t / durationSec) * 100;
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label={playing ? "Pause" : "Play"}
        onClick={() => setPlaying((p) => !p)}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-intelligence-gradient text-white"
      >
        {playing ? <span className="text-xs">⏸</span> : <PlayIcon className="h-4 w-4" />}
      </button>
      <span className="w-12 font-mono text-xs text-slate-500">{fmt(t)}</span>
      <input
        type="range"
        min={0}
        max={durationSec}
        step={0.1}
        value={t}
        onChange={(e) => setT(Number(e.target.value))}
        aria-label="Timeline position"
        className="h-1.5 flex-1 cursor-pointer appearance-none rounded-pill bg-slate-200 accent-[var(--color-neural-blue)]"
        style={{
          background: `linear-gradient(to right, var(--color-neural-blue) ${pct}%, var(--color-slate-200) ${pct}%)`,
        }}
      />
      <span className="w-12 font-mono text-xs text-slate-500">{fmt(durationSec)}</span>
    </div>
  );
}
