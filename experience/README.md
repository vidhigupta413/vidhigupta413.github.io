# Experience Wall Images

Drop logo / photo files here to populate the **Experience** plaques on the
back wall of the cafe (left-half gallery). Each slot is bound to a slug
defined in `src/data/portfolio.js → experience[].imageBase`.

## How it works

`LeadershipShelf.jsx` uses `useFirstAvailableTexture` to dynamically attempt
loading each plaque's image from this folder. The loader tries these
extensions in order, taking the first one that exists:

`jpg`, `jpeg`, `JPG`, `JPEG`, `png`, `webp`

If no file is found for a slug, the plaque falls back to a glowing card
with the company name (no errors thrown), so the wall always reads as
intentional.

> ⚠️ Keep files small — under ~1 MB each. Multi-megapixel photos make
> the scene hang while textures upload to the GPU. Resize to ~1600 px
> wide before adding (`sips -Z 1600 yourphoto.jpg`).

## Current slugs

| Role | Slug | Example file |
| ---- | ---- | -------------- |
| Software Engineer Intern — Elevance Health | `elevance-health` | `elevance-health.jpg` |
| Peer Coach — College of Computing | `gt-peer-coach` | `gt-peer-coach.png` |
| Undergraduate Researcher — VIP | `gt-vip-medical-ai` | `gt-vip-medical-ai.jpg` |
| HELP Session Leader — CS 1332 & 3600 | `gt-coc-help-session` | `gt-coc-help-session.jpg` |
| Machine Learning Consultant — Blue AI Labs | `blue-ai-labs` | `blue-ai-labs.jpg` |
| AI Engineer — Outlier | `outlier` | `outlier.png` |
| Software Engineer — Radical AI | `radical-ai` | `radical-ai.jpg` |
| Code Coach — theCoderSchool | `the-coder-school` | `the-coder-school.jpg` |
| Braathe Enterprises (intern + team lead) | `braathe-enterprises` | `braathe-enterprises.jpg` |

Only the **first three** entries in `experience[]` render as plaques on the
wall; the Experience overlay lists the full timeline.

## Recommended sizing

Roughly **3:1 wide** images, at least **800 × 320 px**, work well on the plaques.
