import React from 'react';

import { useCafeStore } from '../../hooks/useCafeStore.js';
import { vantagePoints } from '../../data/portfolio.js';

// Floating pill that flies the camera back to the wide-shot Overview vantage.
// Only shown after the user has zoomed into a specific vantage (i.e. not the
// default overview view). Lives in the HTML overlay so it stays visible no
// matter where the camera ends up.
export default function BackToOverview() {
  const activeVantageId = useCafeStore((s) => s.activeVantageId);
  const pendingVantageId = useCafeStore((s) => s.pendingVantageId);
  const activeZone = useCafeStore((s) => s.activeZone);
  const requestVantage = useCafeStore((s) => s.requestVantage);

  // Hide whenever a panel is open — the overlay handles its own close affordance,
  // and stacking the pill underneath it just looks like a stray button.
  if (activeZone) return null;
  if (activeVantageId === 'overview' || !activeVantageId) return null;

  const current = vantagePoints.find((v) => v.id === activeVantageId);
  const stripped = current?.label?.replace(/^[↻↺]\s*/, '') ?? '';
  const animating = pendingVantageId && pendingVantageId !== 'overview';

  return (
    <div className="pointer-events-auto fixed bottom-24 left-1/2 z-40 -translate-x-1/2">
      <button
        type="button"
        onClick={() => requestVantage('overview')}
        className="group flex items-center gap-2 rounded-full border border-cafe-neon-purple/45 bg-[#0a0612]/88 px-4 py-2 text-xs font-medium text-cafe-neon-glow shadow-glow-purple backdrop-blur-md transition hover:border-cafe-neon-pink/70 hover:bg-cafe-neon-purple/20"
      >
        <span className="text-base leading-none text-cafe-neon-purple group-hover:text-cafe-neon-pink">
          ↻
        </span>
        <span>Back to overview</span>
        {stripped ? (
          <span className="hidden text-[10px] uppercase tracking-widest text-white/55 sm:inline">
            {animating ? 'flying back…' : `from ${stripped}`}
          </span>
        ) : null}
      </button>
    </div>
  );
}
