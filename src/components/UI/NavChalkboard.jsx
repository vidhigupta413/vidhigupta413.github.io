import React from 'react';

import { NAV_ITEMS } from '../../data/portfolio.js';
import { useCafeStore } from '../../hooks/useCafeStore.js';

// Top-bar navigation that mirrors the chalkboard inside the cafe.
// Click any item to open the matching glassmorphism overlay.
const ICONS = {
  about: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  aiResearch: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 3a4 4 0 0 1 6 0c1 1 1 2 1 3v10a4 4 0 0 1-8 0V6c0-1 0-2 1-3z" />
      <path d="M12 9v6" />
      <path d="M9 12h6" />
    </svg>
  ),
  skills: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 3a4 4 0 0 0-4 4v3l-2 2 2 2v3a4 4 0 0 0 4 4" />
      <path d="M15 3a4 4 0 0 1 4 4v3l2 2-2 2v3a4 4 0 0 1-4 4" />
    </svg>
  ),
  experience: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  leadership: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9V5l6-3 6 3v4" />
      <path d="M5 9h14l-1 12H6L5 9z" />
    </svg>
  ),
  journey: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  ),
};

export default function NavChalkboard() {
  const { activeZone, openZone } = useCafeStore();

  return (
    <nav className="pointer-events-auto absolute left-1/2 top-5 z-30 -translate-x-1/2">
      <ul className="flex items-center gap-1 rounded-full border border-cafe-neon-purple/30 bg-[#0d0717]/70 px-2 py-1 backdrop-blur-md shadow-glow-soft">
        {NAV_ITEMS.map((item) => {
          const active = activeZone === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => openZone(item.id)}
                className={`group flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? 'bg-cafe-neon-purple/20 text-cafe-neon-glow shadow-glow-purple'
                    : 'text-white/70 hover:bg-cafe-neon-purple/10 hover:text-cafe-neon-glow'
                }`}
              >
                <span className="text-cafe-neon-purple">{ICONS[item.id]}</span>
                <span className="hidden md:inline">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
