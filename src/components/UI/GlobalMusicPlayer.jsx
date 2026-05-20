import React, { useEffect, useLayoutEffect, useRef } from 'react';

import { useMusicStore } from '../../hooks/useMusicStore.js';
import { publicAssetUrl } from '../../utils/publicAssetUrl.js';
import { resolveMusicSrc } from '../../utils/musicSrc.js';

const UI_TIME_MS = 180;

/**
 * Single <audio> for the whole app. Avoid `display:none` (Tailwind `hidden`) on
 * media — it can break playback/mute in some browsers. Use visually hidden sizing.
 */
export default function GlobalMusicPlayer() {
  const audioRef = useRef(null);
  const lastSrcRef = useRef('');

  const setAudioRef = useMusicStore((s) => s.setAudioRef);
  const tracks = useMusicStore((s) => s.tracks);
  const trackIndex = useMusicStore((s) => s.trackIndex);
  const playing = useMusicStore((s) => s.playing);
  const muted = useMusicStore((s) => s.muted);
  const setTracksPayload = useMusicStore((s) => s.setTracksPayload);
  const setCurrentTimeDisplay = useMusicStore((s) => s.setCurrentTimeDisplay);
  const setDurationDisplay = useMusicStore((s) => s.setDurationDisplay);

  const track = tracks[trackIndex] ?? null;
  const src = track ? resolveMusicSrc(track.file) : '';

  useLayoutEffect(() => {
    const el = audioRef.current;
    setAudioRef(el);
    return () => setAudioRef(null);
  }, [setAudioRef]);

  useLayoutEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    el.muted = muted;
    el.volume = muted ? 0 : 1;

    if (!src) {
      el.pause();
      lastSrcRef.current = '';
      return;
    }

    if (lastSrcRef.current !== src) {
      lastSrcRef.current = src;
      el.src = src;
      el.load();
    }

    if (playing) {
      if (el.paused) {
        void el.play().catch(() => {
          useMusicStore.setState({ playing: false });
        });
      }
    } else {
      el.pause();
      setCurrentTimeDisplay(el.currentTime);
    }
  }, [src, playing, muted, setCurrentTimeDisplay]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !src) return;

    const onMeta = () => {
      setDurationDisplay(el.duration || 0);
      const st = useMusicStore.getState();
      const t = st.tracks[st.trackIndex];
      const ls = Number.isFinite(t?.loopStart) ? t.loopStart : 0;
      if (Number.isFinite(t?.loopEnd)) {
        el.currentTime = Math.max(0, ls);
      }
    };

    el.addEventListener('loadedmetadata', onMeta);
    return () => el.removeEventListener('loadedmetadata', onMeta);
  }, [src, setDurationDisplay]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !src) return;

    let lastUi = 0;
    const onTime = () => {
      const st = useMusicStore.getState();
      const tr = st.tracks[st.trackIndex];
      const le = Number.isFinite(tr?.loopEnd) ? tr.loopEnd : null;
      const ls = Number.isFinite(tr?.loopStart) ? tr.loopStart : 0;
      if (le != null && el.currentTime >= le) {
        el.currentTime = Math.max(0, ls);
      }

      const now = performance.now();
      if (now - lastUi >= UI_TIME_MS) {
        lastUi = now;
        setCurrentTimeDisplay(el.currentTime);
      }
    };

    const onEnded = () => {
      const st = useMusicStore.getState();
      const tr = st.tracks[st.trackIndex];
      if (Number.isFinite(tr?.loopEnd)) {
        el.currentTime = Math.max(0, Number.isFinite(tr?.loopStart) ? tr.loopStart : 0);
        if (st.playing && el.paused) {
          void el.play().catch(() => {});
        }
        return;
      }
      if (st.tracks.length > 1) {
        st.nextTrack();
      } else {
        useMusicStore.setState({ playing: false });
      }
    };

    el.addEventListener('timeupdate', onTime);
    el.addEventListener('ended', onEnded);
    return () => {
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('ended', onEnded);
    };
  }, [src, setCurrentTimeDisplay]);

  useEffect(() => {
    let cancelled = false;
    fetch(publicAssetUrl('music/tracks.json'))
      .then((r) => {
        if (!r.ok) throw new Error('no json');
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        setTracksPayload(data, null);
      })
      .catch(() => {
        if (!cancelled) setTracksPayload([], 'Could not load music/tracks.json');
      });
    return () => {
      cancelled = true;
    };
  }, [setTracksPayload]);

  return (
    <audio
      ref={audioRef}
      preload="auto"
      playsInline
      className="pointer-events-none fixed left-0 top-0 h-px w-px overflow-hidden opacity-0"
      aria-hidden
    />
  );
}
