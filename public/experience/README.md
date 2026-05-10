# Experience Wall Images

Drop logo / photo files here to populate the **Experience** plaques on the
back wall of the cafe (left-half gallery). Each slot is bound to a slug
defined in `src/data/portfolio.js → experience[].imageBase`.

## How it works

`LeadershipShelf.jsx` uses `useFirstAvailableTexture` to dynamically attempt
loading each plaque's image from this folder. The loader tries these
extensions in order, taking the first one that exists:

1. `.jpg`
2. `.jpeg`
3. `.png`
4. `.webp`

If no file is found for a slug, the plaque falls back to its painted
accent-glow color (no errors thrown).

## Current slugs

| Plaque | Slug | Drop a file at |
| ------ | ---- | -------------- |
| Software Engineering Intern — Elevance Health | `elevance-health` | `public/experience/elevance-health.jpg` |
| Undergraduate Researcher — GT Responsible AI VIP | `gt-vip-medical-ai` | `public/experience/gt-vip-medical-ai.jpg` |
| HELP Session Leader — GT College of Computing | `gt-coc-help-session` | `public/experience/gt-coc-help-session.jpg` |
| Machine Learning Consultant — Blue AI Labs | `blue-ai-labs` | `public/experience/blue-ai-labs.jpg` |
| Code Coach — theCoderSchool | `the-coder-school` | `public/experience/the-coder-school.jpg` |

> Only the **first three** entries are rendered as plaques on the back wall
> (to keep the gallery from spilling past the left half). All five still
> show up inside the Experience overlay panel.

## Recommended sizing

The plaque "photo" panel is rendered as a wide rectangle (~3.1 × 1.2 units
in 3D space). For clean results, use images that are roughly **3:1 wide**
and at least **800 × 320 px**. Company logos work great.

## Adding new entries

1. Add a new object to `experience[]` in `src/data/portfolio.js` with an
   `imageBase: '/experience/<your-slug>'` field.
2. Drop a matching `<your-slug>.jpg` (or other supported ext) into this
   folder.
3. Update `LeadershipShelf.jsx` row spacing or `slice(0, 3)` if you want to
   surface more than three entries on the wall.
