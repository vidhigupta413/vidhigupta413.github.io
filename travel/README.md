# Travel images

Drop photos of places you've visited into this folder and they will
automatically appear on the matching polaroid in the cafe's back-wall travel
gallery — **no code changes required**.

## How it works

Each entry in `src/data/portfolio.js` (`travelPins`) auto-derives an
`imageBase` URL like `/travel/<Name>` from its display name. When the
`<Polaroid>` mounts it tries to load the file at:

1. `<imageBase>.jpg`
2. `<imageBase>.jpeg`
3. `<imageBase>.png`
4. `<imageBase>.webp`

The first one that exists is used. If none are found, the polaroid falls
back to its painted accent color (current behavior), so missing files never
break the scene.

## Naming rules

The file name is derived from the city's display name with:

- accents stripped (`Cancún` → `Cancun`)
- spaces replaced with `_` (`New York City` → `New_York_City`)

Examples:

| City             | Drop in this file               |
| ---------------- | ------------------------------- |
| Paris            | `Paris.jpg`                     |
| New York City    | `New_York_City.jpg`             |
| Cancún           | `Cancun.jpg`                    |
| Reykjavík        | `Reykjavik.jpg`                 |

If you need a different mapping, override `imageBase` directly on the pin in
`portfolio.js`.

## Recommended specs

- Aspect ratio close to **3:2 landscape** — the polaroid window is wider than
  tall.
- Reasonable size: **800–1200 px** on the long edge keeps the bundle light
  while still looking sharp.
- Format: `.jpg` is best for photos (smallest), `.png` for transparent or
  vector-ish art, `.webp` for the smallest file size.
