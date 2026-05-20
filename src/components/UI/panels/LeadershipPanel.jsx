import React from 'react';

import OverlayShell from '../OverlayShell.jsx';
import { leadership, awards, certifications } from '../../../data/portfolio.js';

export default function LeadershipPanel() {
  return (
    <OverlayShell
      title="Leadership & Impact"
      subtitle="Awards, certifications, communities, and the rooms I show up for."
      accent="05 — On the Shelf"
    >
      <section className="mb-8">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-cafe-neon-purple">
          Leadership
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {leadership.map((item) => (
            <div
              key={item.title + item.org}
              className={`rounded-2xl border border-cafe-neon-purple/30 bg-gradient-to-br ${item.accent} p-5 transition hover:shadow-glow-purple`}
            >
              <div className="mb-3 inline-flex items-center gap-1 rounded-full border border-cafe-neon-purple/40 bg-black/30 px-2 py-0.5 text-[10px] uppercase tracking-widest text-cafe-neon-glow">
                <span className="h-1 w-1 rounded-full bg-cafe-neon-pink" /> Plaque
              </div>
              <h4 className="text-lg font-semibold text-white">{item.title}</h4>
              <p className="text-xs uppercase tracking-wider text-cafe-neon-purple">{item.org}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{item.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-300/80">
          Awards
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          {awards.map((a) => (
            <div
              key={a.id}
              className="rounded-2xl border border-amber-300/30 bg-black/35 p-4 transition hover:border-amber-300/60"
            >
              <div className="mb-1 flex items-center justify-between">
                <span
                  className="text-[10px] uppercase tracking-widest"
                  style={{ color: a.accent }}
                >
                  Award
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/50">
                  {a.year}
                </span>
              </div>
              <h4 className="text-base font-semibold text-white">{a.title}</h4>
              <p className="text-xs text-cafe-neon-purple">{a.org}</p>
              {a.detail ? (
                <p className="mt-2 text-xs leading-relaxed text-white/65">{a.detail}</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-300/80">
          Certifications
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          {certifications.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-emerald-300/25 bg-black/35 p-4 transition hover:border-emerald-300/60"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-emerald-300/80">
                  Cert
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/50">
                  {c.issued}
                </span>
              </div>
              <h4 className="text-sm font-semibold leading-snug text-white">{c.title}</h4>
              <p className="mt-0.5 text-xs text-cafe-neon-purple">{c.org}</p>
              {c.credentialId ? (
                <p className="mt-2 break-all text-[10px] text-white/40">
                  ID: <span className="text-white/60">{c.credentialId}</span>
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </OverlayShell>
  );
}
