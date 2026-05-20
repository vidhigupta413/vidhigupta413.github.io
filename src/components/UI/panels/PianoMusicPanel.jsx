import React, { useCallback } from 'react';

import OverlayShell from '../OverlayShell.jsx';
import { useMusicStore } from '../../../hooks/useMusicStore.js';

export default function PianoMusicPanel() {
  const tracks = useMusicStore((s) => s.tracks);
  const loadError = useMusicStore((s) => s.loadError);
  const trackIndex = useMusicStore((s) => s.trackIndex);
  const playing = useMusicStore((s) => s.playing);
  const currentTime = useMusicStore((s) => s.currentTime);
  const duration = useMusicStore((s) => s.duration);
  const togglePlay = useMusicStore((s) => s.togglePlay);
  const prevTrack = useMusicStore((s) => s.prevTrack);
  const nextTrack = useMusicStore((s) => s.nextTrack);
  const setTrackIndex = useMusicStore((s) => s.setTrackIndex);
  const seek = useMusicStore((s) => s.seek);

  const track = tracks[trackIndex] ?? null;
  const loopActive = Number.isFinite(track?.loopEnd);
  const rangeMin = loopActive ? (Number.isFinite(track.loopStart) ? track.loopStart : 0) : 0;
  const rangeMax = loopActive ? track.loopEnd : duration || 1;
  const sliderMax = rangeMax > rangeMin ? rangeMax : rangeMin + 0.01;
  const sliderValue = Math.min(Math.max(currentTime, rangeMin), rangeMax);

  const onSeek = useCallback(
    (e) => {
      const t = Number(e.target.value);
      seek(t);
    },
    [seek],
  );

  return (
    <OverlayShell
      title="Grand piano"
      subtitle="Play music from your cafe library"
      accent="Music corner"
      maxWidthClass="max-w-lg"
    >
      <p className="mb-4 text-sm text-white/70">
        Tracks live in <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">public/music/</code>. Optional{' '}
        <code className="text-xs">loopStart</code> / <code className="text-xs">loopEnd</code> (seconds) in{' '}
        <code className="text-xs">tracks.json</code> repeats that slice until you pause or change track. Use the music
        icon (top right) to mute anytime.
      </p>

      {loadError && tracks.length === 0 ? (
        <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100/90">
          {loadError}
        </p>
      ) : null}

      {tracks.length > 0 ? (
        <>
          <div className="rounded-2xl border border-cafe-neon-purple/35 bg-black/40 p-5">
            <p className="text-xs uppercase tracking-widest text-cafe-neon-purple">Now playing</p>
            <p className="mt-1 text-lg font-semibold text-cafe-neon-glow">{track?.title}</p>
            <p className="mt-0.5 text-[11px] text-white/45">{track?.file}</p>
            {loopActive ? (
              <p className="mt-2 text-[11px] text-cafe-neon-purple/90">
                Looping {formatTime(rangeMin)} – {formatTime(rangeMax)}
              </p>
            ) : null}

            <input
              type="range"
              min={rangeMin}
              max={sliderMax}
              step={0.05}
              value={sliderValue}
              onChange={onSeek}
              className="mt-4 w-full accent-cafe-neon-pink"
            />
            <div className="mt-1 flex justify-between text-[10px] text-white/50">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => prevTrack()}
                className="rounded-full border border-cafe-neon-purple/50 px-4 py-2 text-xs text-cafe-neon-glow transition hover:bg-cafe-neon-purple/20"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => togglePlay()}
                className="grid h-12 w-12 place-items-center rounded-full border-2 border-cafe-neon-pink/70 bg-cafe-neon-pink/20 text-lg text-cafe-neon-pink transition hover:bg-cafe-neon-pink/35"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? '❚❚' : '▶'}
              </button>
              <button
                type="button"
                onClick={() => nextTrack()}
                className="rounded-full border border-cafe-neon-purple/50 px-4 py-2 text-xs text-cafe-neon-glow transition hover:bg-cafe-neon-purple/20"
              >
                Next
              </button>
            </div>
          </div>

          <div className="mt-4 max-h-48 overflow-y-auto rounded-xl border border-white/10 bg-black/25">
            <ul className="divide-y divide-white/10 text-sm">
              {tracks.map((t, i) => (
                <li key={`${t.file}-${i}`}>
                  <button
                    type="button"
                    onClick={() => setTrackIndex(i)}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left transition hover:bg-white/5 ${
                      i === trackIndex ? 'bg-cafe-neon-pink/10 text-cafe-neon-pink' : 'text-white/80'
                    }`}
                  >
                    <span>{t.title}</span>
                    {i === trackIndex ? <span className="text-[10px]">●</span> : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </OverlayShell>
  );
}

function formatTime(sec) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
