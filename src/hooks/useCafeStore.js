import { create } from 'zustand';

// Tiny global store so any 3D zone or 2D overlay can ask
// "which panel is open?" without prop drilling.
export const useCafeStore = create((set) => ({
  activeZone: null,
  /** When opening Recipes from a specific dish plate, which card to highlight. */
  activeRecipeSlug: null,
  hoveredZone: null,
  hasIntroPlayed: false,

  openZone: (id, options = {}) =>
    set({
      activeZone: id,
      activeRecipeSlug: options.recipeSlug ?? null,
    }),
  openRecipesWithDish: (recipeSlug) => set({ activeZone: 'recipes', activeRecipeSlug: recipeSlug }),
  closeZone: () => set({ activeZone: null, activeRecipeSlug: null }),
  setHovered: (id) => set({ hoveredZone: id }),
  markIntroPlayed: () => set({ hasIntroPlayed: true }),
}));
