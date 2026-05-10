import React from 'react';

import { aboutMe } from '../../data/portfolio.js';

// "Vidhi's Cafe" lockup pinned to the top-left, replicating the image.
export default function HeroTitle() {
  return (
    <div className="pointer-events-none absolute left-6 top-5 z-30 select-none">
      <h1
        className="text-4xl md:text-5xl text-cafe-neon-glow glow-text"
        style={{ fontFamily: '"Caveat", cursive', lineHeight: 1 }}
      >
        {aboutMe.handle}
        <span className="ml-1 text-cafe-neon-pink">☕</span>
      </h1>
      <p
        className="mt-1 text-sm md:text-base text-cafe-neon-purple/90 tracking-wide"
        style={{ fontFamily: '"Caveat", cursive' }}
      >
        {aboutMe.tagline}
        <span className="ml-1 text-cafe-neon-pink">♡</span>
      </p>
    </div>
  );
}
