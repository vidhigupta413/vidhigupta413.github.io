import React, { useState } from 'react';

import OverlayShell from '../OverlayShell.jsx';
import { travelPins } from '../../../data/portfolio.js';

export default function JourneyPanel() {
  const [active, setActive] = useState(travelPins[0].id);
  const activePin = travelPins.find((p) => p.id === active);

  return (
    <OverlayShell
      title="Places I've Explored"
      subtitle={`${travelPins.length} cities & islands and counting.`}
      accent="06 — Travel Wall"
    >
      <div className="grid gap-5 md:grid-cols-[1fr_18rem]">
        {/* Mini map preview */}
        <div className="relative h-64 overflow-hidden rounded-2xl border border-cafe-neon-purple/30 bg-gradient-to-br from-[#1a1030] to-[#0a0612]">
          <div className="absolute inset-0 bg-glass-radial opacity-80" />

          {/* Lat/lon grid */}
          {[20, 40, 60, 80].map((p) => (
            <div
              key={`h-${p}`}
              className="absolute left-0 right-0 border-t border-cafe-neon-purple/15"
              style={{ top: `${p}%` }}
            />
          ))}
          {[20, 40, 60, 80].map((p) => (
            <div
              key={`v-${p}`}
              className="absolute bottom-0 top-0 border-l border-cafe-neon-purple/15"
              style={{ left: `${p}%` }}
            />
          ))}

          {travelPins.map((pin) => {
            const isActive = pin.id === active;
            return (
              <button
                key={pin.id}
                onClick={() => setActive(pin.id)}
                className="group absolute -translate-x-1/2 translate-y-1/2"
                style={{
                  left: `${pin.coords.x * 100}%`,
                  bottom: `${pin.coords.y * 100}%`,
                }}
                aria-label={pin.name}
              >
                <span
                  className={`block h-2.5 w-2.5 rounded-full transition-all ${
                    isActive
                      ? 'bg-cafe-neon-pink shadow-[0_0_14px_rgba(255,123,224,0.9)] scale-150'
                      : 'bg-cafe-neon-glow/80 shadow-[0_0_8px_rgba(214,180,255,0.65)] group-hover:scale-125'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Active pin detail */}
        <aside className="rounded-2xl border border-cafe-neon-purple/30 bg-black/35 p-5">
          <p className="text-[10px] uppercase tracking-widest text-cafe-neon-purple">Now showing</p>
          <h3 className="mt-1 text-2xl font-semibold text-cafe-neon-glow glow-text">
            {activePin.name}
          </h3>
          <p className="text-sm text-white/70">{activePin.country}</p>
          <p className="mt-4 text-sm italic text-white/55">
            “Travel notes coming soon — favorite cafe, best meal, and one weird story per stop.”
          </p>
        </aside>
      </div>

      {/* All-pins quick picker */}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {travelPins.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={`rounded-full border px-2.5 py-1 text-[11px] transition ${
              p.id === active
                ? 'border-cafe-neon-pink/70 bg-cafe-neon-pink/15 text-cafe-neon-pink'
                : 'border-cafe-neon-purple/30 bg-cafe-neon-purple/10 text-white/75 hover:border-cafe-neon-purple/60'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
    </OverlayShell>
  );
}
