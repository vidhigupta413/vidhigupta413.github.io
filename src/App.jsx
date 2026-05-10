import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import CafeScene from './components/Cafe/CafeScene.jsx';
import HeroTitle from './components/UI/HeroTitle.jsx';
import NavChalkboard from './components/UI/NavChalkboard.jsx';
import OverlayRouter from './components/UI/OverlayRouter.jsx';
import FooterStrip from './components/UI/FooterStrip.jsx';

// Vidhi's Cafe — the entire site lives inside one isometric scene.
// Two layers stack here:
//   1. <Canvas> — the 3D coffee shop with clickable zones.
//   2. HTML overlays — the navigation, hero title, and per-zone glassmorphism panels.
export default function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden cafe-backdrop">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [22, 16, 26], fov: 34, near: 0.1, far: 220 }}
        gl={{ antialias: true, alpha: true, localClippingEnabled: true }}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = true;
        }}
      >
        <color attach="background" args={[0.025, 0.018, 0.045]} />
        {/* Fog pushed back to fit the larger room. */}
        <fog attach="fog" args={['#0b0610', 60, 160]} />

        {/* CafeScene must not sit behind a single Suspense: drei's <Environment> loads
            remote HDRs and suspends — that would hide every mesh until the fetch completes. */}
        <CafeScene />

        {/* Free-roam-ish camera so the user can sweep into corners.
            Generous zoom range + near-full rotation; mild pan keeps the target reachable. */}
        <OrbitControls
          enablePan
          panSpeed={0.6}
          screenSpacePanning
          enableZoom
          zoomSpeed={1.1}
          minDistance={4}
          maxDistance={80}
          minPolarAngle={Math.PI / 10}
          maxPolarAngle={Math.PI / 2.05}
          minAzimuthAngle={-Math.PI * 0.85}
          maxAzimuthAngle={Math.PI * 0.85}
          target={[0, 3, 1]}
        />
      </Canvas>

      {/* HTML overlay layer */}
      <HeroTitle />
      <NavChalkboard />
      <OverlayRouter />
      <FooterStrip />
    </div>
  );
}
