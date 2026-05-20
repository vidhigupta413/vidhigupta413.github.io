import React, { useState, useEffect } from 'react';

import OverlayShell from '../OverlayShell.jsx';
import TravelStemImage from '../TravelStemImage.jsx';
import TravelWorldMap from '../TravelWorldMap.jsx';
import { travelPlaces } from '../../../data/portfolio.js';
import { useCafeStore } from '../../../hooks/useCafeStore.js';

export default function JourneyPanel() {
  const activeTravelPlaceId = useCafeStore((s) => s.activeTravelPlaceId);
  const openZone = useCafeStore((s) => s.openZone);

  const [active, setActive] = useState(travelPlaces[0]?.id ?? null);

  useEffect(() => {
    if (activeTravelPlaceId) setActive(activeTravelPlaceId);
  }, [activeTravelPlaceId]);

  const detailPlace = activeTravelPlaceId
    ? travelPlaces.find((p) => p.id === activeTravelPlaceId)
    : null;

  if (detailPlace) {
    return <JourneyPlaceDetail place={detailPlace} onBack={() => openZone('journey')} />;
  }

  const activePin = travelPlaces.find((p) => p.id === active) ?? travelPlaces[0];

  return (
    <OverlayShell
      title="Places I've Explored"
      subtitle={`${travelPlaces.length} destinations on the wall and counting.`}
      accent="07 — Travel Wall"
      maxWidthClass="max-w-5xl"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <TravelWorldMap
          places={travelPlaces}
          highlightedId={activePin.id}
          onPinClick={(id) => setActive(id)}
          className="min-h-[280px] w-full lg:min-h-[320px]"
        />

        <aside className="rounded-2xl border border-cafe-neon-purple/30 bg-black/35 p-5">
          <p className="text-[10px] uppercase tracking-widest text-cafe-neon-purple">Selected stop</p>
          <h3 className="mt-1 text-2xl font-semibold text-cafe-neon-glow glow-text">{activePin.name}</h3>
          <p className="text-sm text-white/70">{activePin.country}</p>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
            <TravelStemImage stem={activePin.wallStem} alt="" className="h-44 w-full object-cover" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/75">{activePin.description}</p>
        </aside>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {travelPlaces.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(p.id)}
            className={`rounded-full border px-2.5 py-1 text-[11px] transition ${
              p.id === active
                ? 'border-cafe-neon-pink/70 bg-cafe-neon-pink/15 text-cafe-neon-pink'
                : 'border-cafe-neon-purple/30 bg-cafe-neon-purple/10 text-white/75 hover:border-cafe-neon-purple/60'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
    </OverlayShell>
  );
}

function JourneyPlaceDetail({ place, onBack }) {
  const allStems = [place.wallStem, ...(place.extraStems ?? [])];
  const [heroStem, setHeroStem] = useState(place.wallStem);

  useEffect(() => {
    setHeroStem(place.wallStem);
  }, [place.id, place.wallStem]);

  return (
    <OverlayShell
      title={place.name}
      subtitle={place.country}
      accent="07 — Travel Wall"
      maxWidthClass="max-w-5xl"
    >
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-cafe-neon-purple/40 bg-cafe-neon-purple/10 px-4 py-1.5 text-xs font-medium text-cafe-neon-glow transition hover:border-cafe-neon-pink/60 hover:bg-cafe-neon-pink/10"
        >
          All destinations
        </button>
        <span className="text-[11px] text-white/45">Tip: click a polaroid on the cafe wall to jump here.</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-widest text-cafe-neon-purple">Photos</p>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
            <TravelStemImage
              key={heroStem}
              stem={heroStem}
              alt={`${place.name} travel photo`}
              className="max-h-[min(420px,50vh)] w-full object-contain"
            />
          </div>
          {allStems.length > 1 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {allStems.map((stem) => (
                <button
                  key={stem}
                  type="button"
                  onClick={() => setHeroStem(stem)}
                  className={`overflow-hidden rounded-lg border-2 transition ${
                    stem === heroStem
                      ? 'border-cafe-neon-pink shadow-[0_0_12px_rgba(255,123,224,0.45)]'
                      : 'border-transparent opacity-80 hover:border-cafe-neon-purple/50 hover:opacity-100'
                  }`}
                  aria-label={`Show photo ${stem}`}
                >
                  <TravelStemImage key={stem} stem={stem} alt="" className="h-16 w-24 object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <p className="mb-2 text-[10px] uppercase tracking-widest text-cafe-neon-purple">World map</p>
          <TravelWorldMap
            places={travelPlaces}
            highlightedId={place.id}
            className="min-h-[280px] w-full lg:min-h-[320px]"
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-cafe-neon-purple/25 bg-black/25 p-5">
        <p className="text-[10px] uppercase tracking-widest text-cafe-neon-purple">About this stop</p>
        <p className="mt-2 text-sm leading-relaxed text-white/82">{place.description}</p>
      </div>
    </OverlayShell>
  );
}
