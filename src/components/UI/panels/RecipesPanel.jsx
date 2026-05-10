import React, { useEffect, useRef } from 'react';

import OverlayShell from '../OverlayShell.jsx';
import { useCafeStore } from '../../../hooks/useCafeStore.js';
import { recipes } from '../../../data/portfolio.js';

export default function RecipesPanel() {
  const activeRecipeSlug = useCafeStore((s) => s.activeRecipeSlug);
  const cardRefs = useRef({});

  useEffect(() => {
    if (!activeRecipeSlug) return;
    const el = cardRefs.current[activeRecipeSlug];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeRecipeSlug]);

  return (
    <OverlayShell
      title="Recipes I made & tried"
      subtitle="Off-duty experiments from the cafe kitchen."
      accent="Window Corner"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {recipes.map((r) => {
          const slug = r.slug ?? r.name;
          const isActive = activeRecipeSlug && activeRecipeSlug === slug;
          return (
            <div
              key={slug}
              ref={(node) => {
                if (node) cardRefs.current[slug] = node;
              }}
              className={`rounded-2xl border bg-black/35 p-5 transition hover:shadow-glow-purple ${
                isActive
                  ? 'border-cafe-neon-pink/70 shadow-glow-purple ring-1 ring-cafe-neon-pink/40'
                  : 'border-cafe-neon-purple/30 hover:border-cafe-neon-pink/50'
              }`}
            >
              <div className="mb-2 flex items-center gap-3">
                <span className="text-3xl">{r.emoji}</span>
                <div>
                  <h3 className="text-base font-semibold text-cafe-neon-glow">{r.name}</h3>
                  <p className="text-[11px] uppercase tracking-widest text-cafe-neon-purple">{r.note}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/75">{r.description}</p>
            </div>
          );
        })}
      </div>
    </OverlayShell>
  );
}
