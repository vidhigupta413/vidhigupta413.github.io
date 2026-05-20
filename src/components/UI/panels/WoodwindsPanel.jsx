import React from 'react';

import OverlayShell from '../OverlayShell.jsx';
import { woodwindsVideos } from '../../../data/portfolio.js';

export default function WoodwindsPanel() {
  return (
    <OverlayShell
      title="Flute & piccolo"
      subtitle="Woodwinds in the cafe display case"
      accent="Music corner"
      maxWidthClass="max-w-4xl"
    >
      <p className="mb-6 text-sm leading-relaxed text-white/75">
        I have played flute for over seven years. Here are a few performances and clips you can watch
        right in the player below.
      </p>
      <div className="grid gap-5 md:grid-cols-1">
        {woodwindsVideos.map((v) => (
          <div key={v.youtubeId} className="overflow-hidden rounded-2xl border border-cafe-neon-purple/35 bg-black/40">
            <div className="border-b border-white/10 px-4 py-3">
              <p className="text-xs font-medium text-cafe-neon-glow">{v.title}</p>
              {v.caption ? (
                <p className="mt-1 text-[13px] leading-snug text-white/70">{v.caption}</p>
              ) : null}
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                title={v.title}
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${v.youtubeId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        ))}
      </div>
    </OverlayShell>
  );
}
