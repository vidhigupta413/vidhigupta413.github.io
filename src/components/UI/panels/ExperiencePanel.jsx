import React from 'react';

import OverlayShell from '../OverlayShell.jsx';
import { experience } from '../../../data/portfolio.js';

export default function ExperiencePanel() {
  return (
    <OverlayShell
      title="Experience"
      subtitle="Fueling ideas with coffee & data."
      accent="04 — At the Table"
    >
      <ol className="relative space-y-5 border-l border-cafe-neon-purple/30 pl-6">
        {experience.map((job) => (
          <li key={`${job.company}-${job.dates}`} className="relative">
            <span className="absolute -left-[31px] top-1 grid h-4 w-4 place-items-center rounded-full border border-cafe-neon-purple/60 bg-cafe-neon-purple/30 shadow-glow-purple">
              <span className="h-1.5 w-1.5 rounded-full bg-cafe-neon-glow" />
            </span>
            <div className="rounded-2xl border border-cafe-neon-purple/25 bg-black/35 p-5">
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-cafe-neon-glow">{job.title}</h3>
                <span className="text-[10px] uppercase tracking-widest text-cafe-neon-purple">
                  {job.dates}
                </span>
              </div>
              <p className="mb-3 text-xs uppercase tracking-wider text-white/55">{job.company}</p>
              <ul className="space-y-2 text-sm leading-relaxed text-white/80">
                {job.description.map((d, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-cafe-neon-pink">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </OverlayShell>
  );
}
