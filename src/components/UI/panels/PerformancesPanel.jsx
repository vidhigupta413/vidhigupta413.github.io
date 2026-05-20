import React, { useState } from 'react';

import OverlayShell from '../OverlayShell.jsx';
import { performances } from '../../../data/portfolio.js';

export default function PerformancesPanel() {
  const [active, setActive] = useState(0);
  const video = performances.videos[active];

  return (
    <OverlayShell
      title={performances.group}
      subtitle="Performances on stage."
      accent="Wall Screen — Live"
    >
      <p className="mb-5 max-w-prose text-sm leading-relaxed text-white/80">
        {performances.blurb}
      </p>

      <div className="overflow-hidden rounded-2xl border border-cafe-neon-purple/40 bg-black shadow-glow-purple">
        <div className="relative aspect-video">
          <iframe
            key={video.youtubeId}
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Per-video caption (e.g. timestamps to look out for) — shown under the
          iframe, only when the active video defines one. */}
      {video.caption ? (
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-cafe-neon-glow/85">
          {video.caption}
        </p>
      ) : null}

      {/* Picker only shows when there's more than one video — with a single
          entry the row would just be a stray non-interactive pill. */}
      {performances.videos.length > 1 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {performances.videos.map((v, i) => (
            <button
              key={v.title + i}
              onClick={() => setActive(i)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                i === active
                  ? 'border-cafe-neon-pink/60 bg-cafe-neon-pink/15 text-cafe-neon-pink'
                  : 'border-cafe-neon-purple/30 bg-cafe-neon-purple/10 text-white/75 hover:border-cafe-neon-purple/60'
              }`}
            >
              <span className="font-medium">{v.title}</span>
              <span className="ml-2 text-[10px] uppercase tracking-widest opacity-70">
                {v.role} · {v.year}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-[11px] uppercase tracking-widest text-white/55">
          {video.title} · {video.role} · {video.year}
        </p>
      )}
    </OverlayShell>
  );
}
