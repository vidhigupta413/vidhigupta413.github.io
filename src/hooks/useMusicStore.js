import { create } from 'zustand';

/**
 * Global cafe music: one shared <audio> (see GlobalMusicPlayer) so the HUD
 * mute control and the piano panel control the same playback.
 */
export const useMusicStore = create((set, get) => ({
  tracks: [],
  trackIndex: 0,
  playing: false,
  muted: false,
  /** After user pauses in the piano panel — cleared when they press play again. */
  userStoppedPlayback: false,
  currentTime: 0,
  duration: 0,
  loadError: null,
  audioRef: null,

  setAudioRef: (ref) => set({ audioRef: ref }),

  setTracksPayload: (list, loadError) => {
    const tracks = Array.isArray(list) ? list.filter((t) => t && t.file && t.title) : [];
    set({
      tracks,
      trackIndex: 0,
      loadError:
        loadError != null && loadError !== ''
          ? loadError
          : tracks.length
            ? null
            : 'No tracks in music/tracks.json',
      playing: tracks.length > 0 && !get().userStoppedPlayback,
      currentTime: 0,
      duration: 0,
    });
  },

  setMuted: (muted) => set({ muted: !!muted }),
  toggleMuted: () => set((s) => ({ muted: !s.muted })),

  play: () => set({ playing: true, userStoppedPlayback: false }),
  pause: () => set({ playing: false, userStoppedPlayback: true }),
  togglePlay: () => {
    const { playing } = get();
    if (playing) get().pause();
    else get().play();
  },

  setTrackIndex: (index) => {
    const { tracks } = get();
    if (!tracks.length) return;
    const i = ((index % tracks.length) + tracks.length) % tracks.length;
    set({
      trackIndex: i,
      currentTime: 0,
      playing: true,
      userStoppedPlayback: false,
    });
  },

  nextTrack: () => {
    const { tracks, trackIndex } = get();
    if (!tracks.length) return;
    get().setTrackIndex(trackIndex + 1);
  },

  prevTrack: () => {
    const { tracks, trackIndex } = get();
    if (!tracks.length) return;
    get().setTrackIndex(trackIndex - 1);
  },

  setCurrentTimeDisplay: (t) => set({ currentTime: t }),
  setDurationDisplay: (d) => set({ duration: d }),

  seek: (t) => {
    const el = get().audioRef;
    if (el && Number.isFinite(t)) {
      el.currentTime = t;
      set({ currentTime: t });
    }
  },
}));
