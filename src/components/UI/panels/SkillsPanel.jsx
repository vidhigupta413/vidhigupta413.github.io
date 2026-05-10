import React from 'react';

import OverlayShell from '../OverlayShell.jsx';
import { skills } from '../../../data/portfolio.js';

export default function SkillsPanel() {
  return (
    <OverlayShell
      title="Skills"
      subtitle="The toolkit I keep on the shelf behind the bar."
      accent="03 — AI Corner"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((group) => (
          <div
            key={group.category}
            className="rounded-2xl border border-cafe-neon-purple/30 bg-black/35 p-5"
          >
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-cafe-neon-pink">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-cafe-neon-purple/30 bg-cafe-neon-purple/15 px-3 py-1 text-xs text-cafe-neon-glow"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </OverlayShell>
  );
}
