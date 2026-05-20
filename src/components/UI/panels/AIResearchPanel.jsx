import React from 'react';

import OverlayShell from '../OverlayShell.jsx';
import { aiResearch } from '../../../data/portfolio.js';

export default function AIResearchPanel() {
  return (
    <OverlayShell
      title={aiResearch.headline}
      subtitle={`${aiResearch.lab} · ${aiResearch.role}`}
      accent="03 — Research"
    >
      <p className="mb-5 leading-relaxed text-white/85">{aiResearch.summary}</p>

      <div className="grid gap-3 md:grid-cols-3">
        {aiResearch.highlights.map((h) => (
          <div
            key={h.title}
            className="rounded-2xl border border-cafe-neon-purple/30 bg-black/35 p-4"
          >
            <p className="mb-2 text-[10px] uppercase tracking-widest text-cafe-neon-pink">
              Highlight
            </p>
            <h3 className="text-sm font-semibold text-cafe-neon-glow">{h.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/75">{h.detail}</p>
          </div>
        ))}
      </div>

      <section className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-cafe-neon-purple/30 bg-black/30 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-cafe-neon-pink">
            Research interests
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {aiResearch.interests.map((i) => (
              <span key={i} className="glass-chip">
                {i}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-cafe-neon-purple/30 bg-black/30 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-cafe-neon-pink">
            Currently reading
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            {aiResearch.reading.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="text-cafe-neon-purple">▸</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </OverlayShell>
  );
}
