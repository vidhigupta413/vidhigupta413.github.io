import React, { useState } from 'react';

import { travelImageExts } from '../../data/portfolio.js';
import { publicAssetUrl } from '../../utils/publicAssetUrl.js';

/**
 * Resolves `travel/<stem>.<ext>` with the same extension order as the 3D loader.
 * Uses `publicAssetUrl` so paths work with Vite `base: './'` and GitHub Pages.
 */
export default function TravelStemImage({ stem, alt, className, loading = 'eager' }) {
  const [idx, setIdx] = useState(0);

  if (idx >= travelImageExts.length) {
    return (
      <div
        className={`grid place-items-center bg-white/5 text-xs text-white/40 ${className ?? ''}`}
        role="img"
        aria-label={alt}
      >
        No image
      </div>
    );
  }

  const ext = travelImageExts[idx];
  const src = publicAssetUrl(`travel/${stem}.${ext}`);

  return (
    <img
      key={`${stem}-${ext}`}
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => setIdx((i) => i + 1)}
    />
  );
}
