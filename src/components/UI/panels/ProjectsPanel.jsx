import React from 'react';

import OverlayShell from '../OverlayShell.jsx';
import { projects } from '../../../data/portfolio.js';

export default function ProjectsPanel() {
  return (
    <OverlayShell
      title="Projects"
      subtitle="Things I've built and broken at the bar."
      accent="02 — On the Laptop"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-cafe-neon-purple/30 bg-black/35 p-5 transition hover:border-cafe-neon-pink/60 hover:shadow-glow-purple"
          >
            <div className="mb-3 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-cafe-neon-purple/25 bg-cafe-neon-purple/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-cafe-neon-glow"
                >
                  {t}
                </span>
              ))}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-cafe-neon-glow">
              {project.title}
            </h3>
            <p className="text-sm leading-relaxed text-white/70">{project.description}</p>
            <div className="mt-4 flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-cafe-neon-purple">
              View source
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </OverlayShell>
  );
}
