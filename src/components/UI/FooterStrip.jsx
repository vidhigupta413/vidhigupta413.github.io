import React from 'react';

import { contact } from '../../data/portfolio.js';

// Bottom strip with the Alan Kay quote and the closing line, matching the image.
export default function FooterStrip() {
  return (
    <div className="pointer-events-none absolute bottom-3 left-0 z-30 flex w-full items-center justify-between px-6 text-xs text-white/55">
      <p
        className="italic text-cafe-neon-glow/80"
        style={{ fontFamily: '"Caveat", cursive', fontSize: '1rem' }}
      >
        {contact.quote}
      </p>
      <p
        className="text-cafe-neon-purple/90"
        style={{ fontFamily: '"Caveat", cursive', fontSize: '1rem' }}
      >
        {contact.closing}
      </p>
    </div>
  );
}
