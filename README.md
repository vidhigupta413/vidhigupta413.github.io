# Vidhi's Cafe — Personal Website

An isometric **3D coffee shop portfolio** for Vaidehi Gupta, built with **React Three Fiber**, **Three.js**, **drei**, and **Tailwind CSS**.

The entire site is one cozy diorama: each clickable corner of the cafe opens a "dark glassmorphism" overlay with the matching content (Projects, Travel, Performances, Leadership, Recipes, Sketches, About, Skills, Experience, Contact).

## Quick start

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## How the scene is wired

- `src/App.jsx` — boots the `<Canvas>` plus the HTML overlay layer.
- `src/components/Cafe/CafeScene.jsx` — composes the room shell + every interactive zone.
- `src/components/Cafe/InteractiveZone.jsx` — reusable wrapper that adds hover scale + click → opens an overlay.
- `src/components/Cafe/zones/*` — individual zones (counter, world map, TV, shelf, mailbox, etc.).
- `src/components/UI/OverlayRouter.jsx` — picks the matching panel based on the active zone.
- `src/components/UI/panels/*` — the cute glassmorphism panels.
- `src/data/portfolio.js` — single source of truth for everything rendered (projects, travel pins, leadership, etc.).
- `src/hooks/useCafeStore.js` — tiny Zustand store for "which zone is open".

## Clickable zones

| Zone in the cafe | Opens panel |
|---|---|
| Barista's laptop | Projects |
| Barista character & menu chalkboard | About |
| World map back wall | Journey (34 cities) |
| Wall TV | Performances (GT Nazaaqat) |
| Right-hand shelf with plaques | Leadership |
| "Recipes" sign by the window | Recipes |
| Sketchbook | Sketch & Ideas |
| Bookshelf "AI Corner" | Skills |
| Dining table with laptop | Experience |
| Mailbox by the door | Contact |

## Legacy

The previous flat HTML portfolio is preserved at [`legacy/index.html`](legacy/index.html) for reference.
