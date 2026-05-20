import React from 'react';

import { publicAssetUrl } from '../../utils/publicAssetUrl.js';

/**
 * Stylized world map with pins. `coords` use the same normalized space as
 * `travelPlaces`: x,y in [0,1], y measured from the bottom edge.
 */
export default function TravelWorldMap({
  places,
  highlightedId = null,
  onPinClick,
  className = '',
}) {
  const interactive = typeof onPinClick === 'function';
  const mapSrc = publicAssetUrl('world-map-silhouette.svg');

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-cafe-neon-purple/25 bg-[#ebebf0] ${className}`}>
      <img
        src={mapSrc}
        alt="World map"
        className="pointer-events-none absolute inset-0 h-full w-full object-contain"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#ebebf0]/40 via-transparent to-white/25" />

      {[20, 40, 60, 80].map((p) => (
        <div
          key={`h-${p}`}
          className="pointer-events-none absolute left-0 right-0 border-t border-indigo-900/10"
          style={{ top: `${p}%` }}
        />
      ))}
      {[20, 40, 60, 80].map((p) => (
        <div
          key={`v-${p}`}
          className="pointer-events-none absolute bottom-0 top-0 border-l border-indigo-900/10"
          style={{ left: `${p}%` }}
        />
      ))}

      {places.map((pin) => {
        const isHi = highlightedId && pin.id === highlightedId;
        const isDim = highlightedId && pin.id !== highlightedId;
        const style = {
          left: `${pin.coords.x * 100}%`,
          bottom: `${pin.coords.y * 100}%`,
        };
        const dotClass = `block rounded-full transition-all ${
          isHi
            ? 'h-4 w-4 bg-cafe-neon-pink shadow-[0_0_14px_rgba(200,40,120,0.95)] ring-2 ring-[#1a1a5e]/50'
            : 'h-2.5 w-2.5 bg-[#1a1a5e] shadow-[0_1px_4px_rgba(0,0,0,0.35)] ring-1 ring-white/70'
        } ${interactive && !isHi ? 'hover:scale-125 hover:bg-cafe-neon-pink' : ''}`;

        if (interactive) {
          return (
            <button
              key={pin.id}
              type="button"
              onClick={() => onPinClick(pin.id)}
              className={`absolute z-10 -translate-x-1/2 translate-y-1/2 cursor-pointer ${
                isDim ? 'opacity-40' : 'opacity-100'
              }`}
              style={style}
              aria-label={`${pin.name}, ${pin.country}`}
            >
              <span className={dotClass} />
            </button>
          );
        }

        return (
          <div
            key={pin.id}
            className={`absolute z-10 -translate-x-1/2 translate-y-1/2 ${isDim ? 'opacity-40' : 'opacity-100'}`}
            style={style}
          >
            <span className={dotClass} />
          </div>
        );
      })}
    </div>
  );
}
