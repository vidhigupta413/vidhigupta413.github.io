import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import InteractiveZone from '../InteractiveZone.jsx';
import { travelPlaces, travelImageExts } from '../../../data/portfolio.js';
import { ROOM } from '../RoomShell.jsx';
import useFirstAvailableTexture from '../../../hooks/useFirstAvailableTexture.js';
import { useCafeStore } from '../../../hooks/useCafeStore.js';

// Scrolling polaroids strictly on the BACK WALL *right* half (world x ≥ 0).
// A world-space clipping plane at x = 0 removes any geometry that drifts into
// the left half where Leadership & Experience live. Requires
// `gl.localClippingEnabled = true` on the Canvas (see App.jsx).

const POLAROID_W = 1.25;
const SPACING = 1.55;
const SCROLL_SPEED = 0.48;

/** Clips away everything with world-space x < 0 (keeps only the right half). */
const CLIP_RIGHT_HALF = () => [new THREE.Plane(new THREE.Vector3(1, 0, 0), 0)];

const PHOTO_MAX_W = POLAROID_W * 0.82;
const PHOTO_MAX_H = POLAROID_W * 0.58;

function Polaroid({ place, tilt, accent, hovered, imageBase }) {
  const openZone = useCafeStore((s) => s.openZone);
  const clip = useMemo(CLIP_RIGHT_HALF, []);
  const clipProps = { clippingPlanes: clip, clipShadows: false };
  const photoTex = useFirstAvailableTexture(imageBase, travelImageExts);
  const [photoSize, setPhotoSize] = useState([PHOTO_MAX_W, PHOTO_MAX_H]);

  const openDetail = useCallback(
    (e) => {
      e.stopPropagation();
      openZone('journey', { travelPlaceId: place.id });
    },
    [openZone, place.id],
  );

  useEffect(() => {
    const img = photoTex?.image;
    if (!img?.width) {
      setPhotoSize([PHOTO_MAX_W, PHOTO_MAX_H]);
      return;
    }
    const iw = img.width;
    const ih = img.height;
    const ia = iw / ih;
    const boxa = PHOTO_MAX_W / PHOTO_MAX_H;
    if (ia > boxa) {
      setPhotoSize([PHOTO_MAX_W, PHOTO_MAX_W / ia]);
    } else {
      setPhotoSize([PHOTO_MAX_H * ia, PHOTO_MAX_H]);
    }
  }, [photoTex]);

  const [pw, ph] = photoSize;

  return (
    <group rotation={[0, 0, tilt]}>
      {/* White polaroid card */}
      <mesh raycast={() => null}>
        <planeGeometry args={[POLAROID_W, POLAROID_W * 1.12]} />
        <meshBasicMaterial color="#fff7ec" {...clipProps} />
      </mesh>

      {/* Photo frame — aspect preserved (letterboxed inside max frame). */}
      <mesh position={[0, 0.16, 0.006]} raycast={() => null}>
        <planeGeometry args={[pw, ph]} />
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
        raycast={() => null}
      >
        {place.name}
      </Text>
      <Text
        position={[0, -0.64, 0.015]}
        fontSize={0.09}
        color="#7b3f1c"
        anchorX="center"
        anchorY="middle"
        raycast={() => null}
      >
        {place.country}
      </Text>
      <mesh position={[POLAROID_W * 0.3, POLAROID_W * 0.48, 0.012]} raycast={() => null}>
        <circleGeometry args={[0.065, 16]} />
        <meshStandardMaterial
          color="#ff7be0"
          emissive="#ff7be0"
          emissiveIntensity={1.4}
          toneMapped={false}
          {...clipProps}
        />
      </mesh>

      {/* Click target — covers card + captions */}
      <mesh position={[0, -0.08, 0.11]} onClick={openDetail}>
        <planeGeometry args={[POLAROID_W * 1.02, POLAROID_W * 1.38]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} {...clipProps} />
      </mesh>
    </group>
  );
}

function JourneyBackdropOpen({ clip }) {
  const openZone = useCafeStore((s) => s.openZone);
  return (
    <mesh
      position={[0, -0.2, 0.02]}
      onClick={(e) => {
        e.stopPropagation();
        openZone('journey');
      }}
    >
      <planeGeometry args={[ROOM.floorWidth / 2 - 0.6, 6.2]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} clippingPlanes={clip} clipShadows={false} />
    </mesh>
  );
}

export default function WorldMapWall() {
  const stripRef = useRef();
  const clip = useMemo(CLIP_RIGHT_HALF, []);
  const openZone = useCafeStore((s) => s.openZone);

  const accents = ['#5a3a90', '#7b4dd6', '#a677ff', '#ff7be0', '#ffb56a', '#5a7d3a'];
  const tilts = useMemo(
    () => travelPlaces.map((_, i) => ((i * 1374) % 9 - 4) * 0.016),
    [],
  );

  const setWidth = travelPlaces.length * SPACING;

  useFrame((_, delta) => {
    if (!stripRef.current) return;
    stripRef.current.position.x -= delta * SCROLL_SPEED;
    if (stripRef.current.position.x <= -setWidth) {
      stripRef.current.position.x += setWidth;
    }
  });

  const cx = ROOM.floorWidth / 4;

  return (
    <group position={[cx, 5.15, ROOM.backWallZ + 0.08]}>
      <InteractiveZone id="journey" hoverScale={1.01} openPanelOnClick={false}>
        {({ hovered }) => (
          <group>
            <JourneyBackdropOpen clip={clip} />

            <mesh
              position={[0, -0.35, 0.03]}
              onClick={(e) => {
                e.stopPropagation();
                openZone('journey');
              }}
            >
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
                  travelPlaces.map((p, i) => (
                    <group
                      key={`${dup}-${p.id}`}
                      position={[(i + dup * travelPlaces.length) * SPACING, 0, 0]}
                    >
                      <Polaroid
                        place={p}
                        tilt={tilts[i]}
                        accent={accents[i % accents.length]}
                        hovered={hovered}
                        imageBase={`/travel/${p.wallStem}`}
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
