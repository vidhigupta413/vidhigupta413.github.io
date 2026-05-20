import { create } from 'zustand';

// Tiny global store so any 3D zone or 2D overlay can ask
// "which panel is open?" without prop drilling.
export const useCafeStore = create((set) => ({
  activeZone: null,
  /** When opening Recipes from a specific dish plate, which card to highlight. */
  activeRecipeSlug: null,
  /** When opening Journey from a polaroid, which place detail to show (matches `travelPlaces[].id`). */
  activeTravelPlaceId: null,
  hoveredZone: null,
  hasIntroPlayed: false,
  /** Set by FloorHotspots — CameraVantageRig animates then clears via `clearPendingVantage`. */
  pendingVantageId: null,
  /** The last vantage the user committed to — drives the "Back to overview" pill. */
  activeVantageId: 'overview',

  openZone: (id, options = {}) =>
    set({
      activeZone: id,
      activeRecipeSlug: options.recipeSlug ?? null,
      activeTravelPlaceId:
        id !== 'journey'
          ? null
          : Object.prototype.hasOwnProperty.call(options, 'travelPlaceId')
            ? options.travelPlaceId ?? null
            : null,
    }),
  openRecipesWithDish: (recipeSlug) =>
    set({ activeZone: 'recipes', activeRecipeSlug: recipeSlug, activeTravelPlaceId: null }),
  closeZone: () => set({ activeZone: null, activeRecipeSlug: null, activeTravelPlaceId: null }),
  setHovered: (id) => set({ hoveredZone: id }),
  markIntroPlayed: () => set({ hasIntroPlayed: true }),
  requestVantage: (id) => set({ pendingVantageId: id, activeVantageId: id }),
  clearPendingVantage: () => set({ pendingVantageId: null }),
}));
