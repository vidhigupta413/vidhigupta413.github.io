import React, { useMemo, useRef } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import InteractiveZone from '../InteractiveZone.jsx';
import { travelPins, travelImageExts } from '../../../data/portfolio.js';
import { ROOM } from '../RoomShell.jsx';
import useFirstAvailableTexture from '../../../hooks/useFirstAvailableTexture.js';

// Scrolling polaroids strictly on the BACK WALL *right* half (world x ≥ 0).
// A world-space clipping plane at x = 0 removes any geometry that drifts into
// the left half where Leadership & Experience live. Requires
// `gl.localClippingEnabled = true` on the Canvas (see App.jsx).

const POLAROID_W = 1.25;
const SPACING = 1.55;
const SCROLL_SPEED = 0.48;

/** Clips away everything with world-space x < 0 (keeps only the right half). */
const CLIP_RIGHT_HALF = () => [new THREE.Plane(new THREE.Vector3(1, 0, 0), 0)];

function Polaroid({ city, country, tilt, accent, hovered, imageBase }) {
  const clip = useMemo(CLIP_RIGHT_HALF, []);
  const clipProps = { clippingPlanes: clip, clipShadows: false };
  const photoTex = useFirstAvailableTexture(imageBase, travelImageExts);

  return (
    <group rotation={[0, 0, tilt]}>
      {/* White polaroid card */}
      <mesh>
        <planeGeometry args={[POLAROID_W, POLAROID_W * 1.12]} />
        <meshBasicMaterial color="#fff7ec" {...clipProps} />
      </mesh>

      {/* Photo frame — uses the loaded texture when available, else the
          original glowy accent color. */}
      <mesh position={[0, 0.16, 0.006]}>
        <planeGeometry args={[POLAROID_W * 0.82, POLAROID_W * 0.58]} />
        {photoTex ? (
          <meshBasicMaterial
            map={photoTex}
            toneMapped={false}
            {...clipProps}
          />
        ) : (
          <meshStandardMaterial
            color="#23304a"
            emissive={accent}
            emissiveIntensity={hovered ? 0.9 : 0.45}
            toneMapped={false}
            {...clipProps}
          />
        )}
      </mesh>

      <Text
        position={[0, -0.46, 0.015]}
        fontSize={0.15}
        color="#3a2418"
        anchorX="center"
        anchorY="middle"
      >
        {city}
      </Text>
      <Text
        position={[0, -0.64, 0.015]}
        fontSize={0.09}
        color="#7b3f1c"
        anchorX="center"
        anchorY="middle"
      >
        {country}
      </Text>
      <mesh position={[POLAROID_W * 0.3, POLAROID_W * 0.48, 0.012]}>
        <circleGeometry args={[0.065, 16]} />
        <meshStandardMaterial
          color="#ff7be0"
          emissive="#ff7be0"
          emissiveIntensity={1.4}
          toneMapped={false}
          {...clipProps}
        />
      </mesh>
    </group>
  );
}

export default function WorldMapWall() {
  const stripRef = useRef();
  const clip = useMemo(CLIP_RIGHT_HALF, []);

  const items = useMemo(() => travelPins.slice(0, 14), []);
  const accents = ['#5a3a90', '#7b4dd6', '#a677ff', '#ff7be0', '#ffb56a', '#5a7d3a'];
  const tilts = useMemo(
    () => items.map((_, i) => ((i * 1374) % 9 - 4) * 0.016),
    [items],
  );

  const setWidth = items.length * SPACING;

  useFrame((_, delta) => {
    if (!stripRef.current) return;
    stripRef.current.position.x -= delta * SCROLL_SPEED;
    if (stripRef.current.position.x <= -setWidth) {
      stripRef.current.position.x += setWidth;
    }
  });

  // Origin at the centre of the *right* half of the back wall: x = +W/4.
  const cx = ROOM.floorWidth / 4;

  return (
    <group position={[cx, 5.15, ROOM.backWallZ + 0.08]}>
      <InteractiveZone id="journey" hoverScale={1.01}>
        {({ hovered }) => (
          <group>
            {/* Invisible hit surface for the whole right-half travel panel */}
            <mesh position={[0, -0.2, 0.02]}>
              <planeGeometry args={[ROOM.floorWidth / 2 - 0.6, 6.2]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>

            {/* Dark backing card so the strip reads as a contained gallery */}
            <mesh position={[0, -0.35, 0.03]}>
              <planeGeometry args={[ROOM.floorWidth / 2 - 0.8, 4.2]} />
              <meshStandardMaterial
                color="#120a08"
                emissive="#1a0e14"
                emissiveIntensity={0.35}
                clippingPlanes={clip}
                clipShadows={false}
              />
            </mesh>

            <Text
              position={[-6.5, 2.15, 0.06]}
              fontSize={0.38}
              color="#ffd6a5"
              anchorX="left"
              anchorY="middle"
            >
              Travel Wall ✈
            </Text>
            <Text
              position={[-6.5, 1.82, 0.06]}
              fontSize={0.16}
              color="#ffb56a"
              anchorX="left"
              anchorY="middle"
            >
              Places I've Explored
            </Text>

            <mesh position={[0, -1.35, 0.055]}>
              <planeGeometry args={[16, 0.022]} />
              <meshStandardMaterial
                color="#ffb56a"
                emissive="#ff8a3c"
                emissiveIntensity={hovered ? 1.5 : 0.85}
                toneMapped={false}
                clippingPlanes={clip}
                clipShadows={false}
              />
            </mesh>

            <group position={[-6.2, -0.15, 0.05]}>
              <group ref={stripRef}>
                {[0, 1].map((dup) =>
                  items.map((p, i) => (
                    <group
                      key={`${dup}-${p.id}`}
                      position={[(i + dup * items.length) * SPACING, 0, 0]}
                    >
                      <Polaroid
                        city={p.name}
                        country={p.country}
                        tilt={tilts[i]}
                        accent={accents[i % accents.length]}
                        hovered={hovered}
                        imageBase={p.imageBase}
                      />
                    </group>
                  )),
                )}
              </group>
            </group>
          </group>
        )}
      </InteractiveZone>
    </group>
  );
}
