/**
 * Prefix a `/public` asset path with Vite `import.meta.env.BASE_URL` so images
 * resolve when the site is not served from domain root (and for `base: './'`).
 */
export function publicAssetUrl(relativePath) {
  const raw = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  let base = import.meta.env.BASE_URL || '/';
  if (!base.endsWith('/')) base = `${base}/`;
  return `${base}${raw}`.replace(/\/{2,}/g, '/');
}
