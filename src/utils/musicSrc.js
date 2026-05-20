import { publicAssetUrl } from './publicAssetUrl.js';

/** Resolve `public/music/<file>` URL; append `.mp3` when no extension. */
export function resolveMusicSrc(file) {
  if (!file || typeof file !== 'string') return '';
  const trimmed = file.trim();
  if (!trimmed) return '';
  if (/\.(mp3|ogg|wav|m4a|aac|opus|webm)$/i.test(trimmed)) {
    return publicAssetUrl(`music/${trimmed}`);
  }
  return publicAssetUrl(`music/${trimmed}.mp3`);
}
