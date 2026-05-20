import { useEffect, useState } from 'react';
import * as THREE from 'three';

import { publicAssetUrl } from '../utils/publicAssetUrl.js';

// Default candidate extensions — same set the travel polaroids use, so any
// image file works without re-encoding.
export const DEFAULT_IMAGE_EXTS = ['jpg', 'jpeg', 'JPG', 'JPEG', 'png', 'webp'];

function resolveTextureUrl(imageBase, ext) {
  if (!imageBase) return '';
  if (/^https?:\/\//i.test(imageBase)) return `${imageBase}.${ext}`;
  const path = imageBase.startsWith('/') ? imageBase.slice(1) : imageBase;
  return publicAssetUrl(`${path}.${ext}`);
}

/**
 * Try to load `<imageBase>.jpg`, then `.jpeg`, `.png`, `.webp` (or whatever
 * extension list is passed) in order, resolving with the first one that
 * succeeds. Returns `null` when every option 404s — caller falls back to a
 * painted accent or other default.
 *
 *   const tex = useFirstAvailableTexture('/leadership/data-science-gt');
 *   if (tex) ...else fallback
 */
export default function useFirstAvailableTexture(imageBase, exts = DEFAULT_IMAGE_EXTS) {
  const [texture, setTexture] = useState(null);
  useEffect(() => {
    if (!imageBase) return undefined;
    const loader = new THREE.TextureLoader();
    let cancelled = false;
    let i = 0;
    const tryNext = () => {
      if (cancelled || i >= exts.length) return;
      const url = resolveTextureUrl(imageBase, exts[i]);
      i += 1;
      loader.load(
        url,
        (tex) => {
          if (cancelled) return;
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = 8;
          setTexture(tex);
        },
        undefined,
        () => tryNext(),
      );
    };
    tryNext();
    return () => {
      cancelled = true;
    };
  }, [imageBase, exts]);
  return texture;
}
