import React, { useEffect } from 'react';

import { useCafeStore } from '../../hooks/useCafeStore.js';

// The shared chrome around every zone's content: backdrop, glass card, header,
// close button, and ESC handling. Children render inside the scrollable body.
export default function OverlayShell({ title, subtitle, accent, children, maxWidthClass = 'max-w-3xl' }) {
  const closeZone = useCafeStore((s) => s.closeZone);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeZone();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeZone]);

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center px-4 py-12 animate-fade-in-up"
      onClick={closeZone}
    >
      {/* Smoky purple backdrop */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

      {/* Card */}
      <div
        className={`glass-card pointer-events-auto relative z-10 flex max-h-[82vh] w-full ${maxWidthClass} flex-col overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-cafe-neon-purple via-cafe-neon-pink to-cafe-neon-purple" />

        {/* Header */}
        <header className="flex items-start justify-between gap-4 px-7 pt-6 pb-3">
          <div>
            {accent && (
              <span className="glass-chip mb-2 inline-flex items-center gap-1 text-cafe-neon-pink">
                <span className="h-1.5 w-1.5 rounded-full bg-cafe-neon-pink" />
                {accent}
              </span>
            )}
            <h2
              className="text-3xl text-cafe-neon-glow glow-text"
              style={{ fontFamily: '"Caveat", cursive' }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-white/65">{subtitle}</p>
            )}
          </div>

          <button
            onClick={closeZone}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full border border-cafe-neon-purple/40 bg-cafe-neon-purple/10 text-cafe-neon-glow transition hover:bg-cafe-neon-purple/30 hover:shadow-glow-purple"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div className="neon-divider mx-7" />

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-7 py-5">{children}</div>
      </div>
    </div>
  );
}
