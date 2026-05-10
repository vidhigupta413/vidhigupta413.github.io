import React from 'react';

import OverlayShell from '../OverlayShell.jsx';
import { aboutMe, education, additionalSkills } from '../../../data/portfolio.js';

export default function AboutPanel() {
  return (
    <OverlayShell
      title="About Me"
      subtitle={`${aboutMe.name} • ${aboutMe.title}`}
      accent="01 — The Menu"
    >
      <div className="space-y-6">
        <p className="leading-relaxed text-white/85">{aboutMe.bio}</p>

        <div className="flex flex-wrap gap-2">
          {aboutMe.identityChips.map((chip) => (
            <span key={chip} className="glass-chip">
              {chip}
            </span>
          ))}
        </div>

        <section className="rounded-2xl border border-cafe-neon-purple/30 bg-black/30 p-5">
          <header className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-cafe-neon-glow">{education.school}</h3>
            <span className="text-[11px] uppercase tracking-widest text-cafe-neon-purple">
              {education.expected}
            </span>
          </header>
          <p className="text-sm text-white/80">{education.degree}</p>
          <p className="mt-1 text-xs italic text-white/55">{education.specializations}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {education.relevantCoursework.map((course) => (
              <span
                key={course}
                className="rounded-md border border-cafe-neon-purple/25 bg-cafe-neon-purple/10 px-2 py-0.5 text-[10px] text-cafe-neon-glow"
              >
                {course}
              </span>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-amber-300/25 bg-black/30 p-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-200/80">
              Certifications
            </h4>
            <ul className="space-y-1 text-xs text-white/80">
              {additionalSkills.certifications.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-cafe-neon-purple/25 bg-black/30 p-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-cafe-neon-purple">
              Interests
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {additionalSkills.interests.map((i) => (
                <span
                  key={i}
                  className="rounded-md border border-cafe-neon-purple/25 bg-cafe-neon-purple/10 px-2 py-0.5 text-[10px] text-cafe-neon-glow"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-300/25 bg-black/30 p-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-200/80">
              Languages
            </h4>
            <ul className="space-y-1 text-xs text-white/80">
              {additionalSkills.languages.map((lang) => (
                <li key={lang}>• {lang}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </OverlayShell>
  );
}
