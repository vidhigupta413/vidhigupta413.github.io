import React from 'react';

import { useMusicStore } from '../../hooks/useMusicStore.js';

/** Fixed top-right: mute / unmute the global cafe music (same audio as the piano player). */
export default function MusicHudButton() {
  const muted = useMusicStore((s) => s.muted);
  const toggleMuted = useMusicStore((s) => s.toggleMuted);
  const tracks = useMusicStore((s) => s.tracks);
  const loadError = useMusicStore((s) => s.loadError);

  const disabled = !tracks.length;

  return (
    <div className="pointer-events-auto fixed right-4 top-4 z-[100] md:right-6 md:top-5">
      <button
        type="button"
        disabled={disabled}
        onClick={() => toggleMuted()}
        title={
          disabled
            ? loadError || 'Add tracks in public/music/tracks.json'
            : muted
              ? 'Unmute cafe music'
              : 'Mute cafe music'
        }
        aria-label={muted ? 'Unmute cafe music' : 'Mute cafe music'}
        className={`flex h-10 w-10 items-center justify-center rounded-full border border-cafe-neon-purple/45 bg-[#0a0612]/85 text-cafe-neon-glow shadow-glow-purple backdrop-blur-md transition hover:border-cafe-neon-pink/60 hover:bg-cafe-neon-purple/25 ${
          disabled ? 'cursor-not-allowed opacity-40' : ''
        }`}
      >
        {muted ? <IconMusicMuted /> : <IconMusic />}
      </button>
    </div>
  );
}

function IconMusic() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function IconMusicMuted() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
      <path d="M2 2l20 20" strokeLinecap="round" />
    </svg>
  );
}
