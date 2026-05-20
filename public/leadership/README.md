# Leadership Wall Images

Drop logo / photo files here to populate the **Leadership** plaques on the
back wall of the cafe (left-half gallery). Each slot is bound to a slug
defined in `src/data/portfolio.js → leadership[].imageBase`.

## How it works

`LeadershipShelf.jsx` uses `useFirstAvailableTexture` to dynamically attempt
loading each plaque's image from this folder. The loader tries these
extensions in order, taking the first one that exists:

`jpg`, `jpeg`, `JPG`, `JPEG`, `png`, `webp` (case variants cover files like `data-science-gt.JPEG`).

If no file is found for a slug, the plaque falls back to a glowing card
with the org name (no errors thrown).

> ⚠️ Keep files small — under ~1 MB each. Multi-megapixel phone photos
> make the scene hang while textures upload to the GPU. Resize down to
> ~1600 px wide before adding (`sips -Z 1600 yourphoto.jpg`).

## Current slugs

| Plaque | Slug | Drop a file at |
| ------ | ---- | -------------- |
| Director of External Affairs — Data Science @ GT | `data-science-gt` | `public/leadership/data-science-gt.jpg` (or .png/.jpeg/.webp) |
| Finance Officer — GT Nazaaqat | `gt-nazaaqat` | `public/leadership/gt-nazaaqat.jpg` |
| Waystar Hack the SDLC — 3rd Place | `waystar-hackathon` | `public/leadership/waystar-hackathon.jpg` |

## Recommended sizing

The plaque "photo" panel is rendered as a wide rectangle (~3.1 × 1.2 units
in 3D space). For clean results, use images that are roughly **3:1 wide**
and at least **800 × 320 px**. Logos / club crests work great.

## Adding new entries

1. Add a new object to `leadership[]` in `src/data/portfolio.js` with an
   `imageBase: '/leadership/<your-slug>'` field.
2. Drop a matching `<your-slug>.jpg` (or other supported ext) into this
   folder.
3. Adjust `LeadershipShelf.jsx` row spacing if you exceed 3 entries.
