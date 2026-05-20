import React from 'react';
import { Text, RoundedBox } from '@react-three/drei';

import InteractiveZone from '../InteractiveZone.jsx';
import { leadership, experience } from '../../../data/portfolio.js';
import { ROOM } from '../RoomShell.jsx';
import useFirstAvailableTexture from '../../../hooks/useFirstAvailableTexture.js';

// Static gallery on the BACK WALL LEFT HALF.
// Top row → Leadership plaques (3).
// Bottom row → Experience frames (3 — slice of the full experience list).
// Each row has its OWN zone: top opens Leadership, bottom opens Experience.
//
// Each plaque optionally shows a real image when one exists in
// `public/leadership/<slug>.jpg` / `public/experience/<slug>.jpg`. If no
// file is found, we fall back to the painted accent-glow panel.

// Local Z in front of the inner mat's front face (~0.075) so the image
// never z-fights the RoundedBox depth. Caption text sits slightly farther out.
const PHOTO_Z = 0.102;
const CAPTION_Z = 0.118;

// Frame is taller than wide so a 16:9 photo lands at the top with a clear
// caption area underneath. Photo aspect ~1.78 (close to 16:9) so landscape
// group photos don't get stretched out horizontally.
const FRAME_W = 3.0;
const FRAME_H = 2.0;
const PHOTO_W = 2.85;
const PHOTO_H = 1.45;
const PHOTO_Y = 0.2;
const TITLE_Y = -0.62;
const ORG_Y = -0.86;

function FramedPlaque({ title, org, accent, dark = false, imageBase, placeholderLabel }) {
  const photoTex = useFirstAvailableTexture(imageBase);
  return (
    <group>
      {/* Outer wood frame */}
      <RoundedBox args={[FRAME_W + 0.18, FRAME_H + 0.18, 0.1]} radius={0.05} smoothness={3}>
        <meshStandardMaterial color="#5b3a26" roughness={0.9} />
      </RoundedBox>
      {/* Inner mat */}
      <RoundedBox
        args={[FRAME_W + 0.04, FRAME_H + 0.04, 0.11]}
        radius={0.04}
        smoothness={3}
        position={[0, 0, 0.02]}
      >
        <meshStandardMaterial color="#3a2418" roughness={0.95} />
      </RoundedBox>
      {/* "Photo" — real image when available, otherwise a styled glow card
          with the company/org name big so the plaque still feels intentional. */}
      {photoTex ? (
        <mesh position={[0, PHOTO_Y, PHOTO_Z]}>
          <planeGeometry args={[PHOTO_W, PHOTO_H]} />
          <meshBasicMaterial
            map={photoTex}
            toneMapped={false}
            depthWrite
            polygonOffset
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>
      ) : (
        <group position={[0, PHOTO_Y, PHOTO_Z]}>
          <mesh>
            <planeGeometry args={[PHOTO_W, PHOTO_H]} />
            <meshStandardMaterial
              color={dark ? '#1a0e22' : '#231533'}
              emissive={accent}
              emissiveIntensity={0.45}
              toneMapped={false}
              polygonOffset
              polygonOffsetFactor={-1}
              polygonOffsetUnits={-1}
            />
          </mesh>
          {/* Big "logo-style" placeholder text inside the photo area. */}
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.26}
            color="#fff7ec"
            anchorX="center"
            anchorY="middle"
            maxWidth={PHOTO_W - 0.18}
            textAlign="center"
            outlineWidth={0.012}
            outlineColor="#0a0612"
          >
            {placeholderLabel ?? org}
          </Text>
        </group>
      )}
      <Text
        position={[0, TITLE_Y, CAPTION_Z]}
        fontSize={0.18}
        color="#fff7ec"
        anchorX="center"
        anchorY="middle"
        maxWidth={FRAME_W - 0.2}
        textAlign="center"
      >
        {title}
      </Text>
      <Text
        position={[0, ORG_Y, CAPTION_Z]}
        fontSize={0.115}
        color="#ffd6a5"
        anchorX="center"
        anchorY="middle"
        maxWidth={FRAME_W - 0.2}
        textAlign="center"
      >
        {org}
      </Text>
    </group>
  );
}

export default function LeadershipShelf() {
  // Center the gallery on the LEFT half of the back wall.
  const groupPosition = [-9.75, 4.2, ROOM.backWallZ + 0.08];

  const leadershipAccents = ['#a677ff', '#7b4dd6', '#ffb56a'];
  const experienceAccents = ['#5a7d3a', '#ff7be0', '#a4632a'];

  // Only the first three experience entries fit on the wall (the panel still
  // shows the full list). Tweak `slice` if you want different ones.
  const experienceForWall = experience.slice(0, 3);

  // Hover glow + row spacing track FRAME_W/FRAME_H so the layout breathes if
  // we ever tweak frame proportions again.
  const hoverGlow = [FRAME_W + 0.4, FRAME_H + 0.4];

  return (
    <group position={groupPosition}>
      {/* === Section header === */}
      <Text
        position={[0, 2.9, 0.05]}
        fontSize={0.34}
        color="#ffd6a5"
        anchorX="center"
        anchorY="middle"
      >
        Leadership & Experience
      </Text>
      <mesh position={[0, 2.65, 0.05]}>
        <planeGeometry args={[12, 0.02]} />
        <meshStandardMaterial color="#ffb56a" emissive="#ff8a3c" emissiveIntensity={0.9} toneMapped={false} />
      </mesh>

      {/* === Leadership row → opens Leadership panel === */}
      <InteractiveZone id="leadership" position={[0, 1.4, 0]} hoverScale={1.02}>
        {({ hovered }) => (
          <group>
            <Text
              position={[-5.6, 1.1, 0.05]}
              fontSize={0.16}
              color="#ffb56a"
              anchorX="left"
              anchorY="middle"
              letterSpacing={0.18}
            >
              ── LEADERSHIP ──
            </Text>
            {leadership.map((item, i) => (
              <group key={item.title} position={[(i - 1) * 3.6, 0, 0]}>
                <FramedPlaque
                  title={item.title}
                  org={item.org}
                  accent={leadershipAccents[i]}
                  imageBase={item.imageBase}
                />
                {hovered && (
                  <mesh position={[0, 0, -0.02]}>
                    <planeGeometry args={hoverGlow} />
                    <meshBasicMaterial color="#ffb56a" transparent opacity={0.18} />
                  </mesh>
                )}
              </group>
            ))}
          </group>
        )}
      </InteractiveZone>

      {/* === Experience row → opens Experience panel === */}
      <InteractiveZone id="experience" position={[0, -1.7, 0]} hoverScale={1.02}>
        {({ hovered }) => (
          <group>
            <Text
              position={[-5.6, 1.1, 0.05]}
              fontSize={0.16}
              color="#ffb56a"
              anchorX="left"
              anchorY="middle"
              letterSpacing={0.18}
            >
              ── EXPERIENCE ──
            </Text>
            {experienceForWall.map((item, i) => (
              <group key={item.company + i} position={[(i - 1) * 3.6, 0, 0]}>
                <FramedPlaque
                  title={item.title}
                  org={item.company}
                  accent={experienceAccents[i]}
                  imageBase={item.imageBase}
                  dark
                />
                {hovered && (
                  <mesh position={[0, 0, -0.02]}>
                    <planeGeometry args={hoverGlow} />
                    <meshBasicMaterial color="#ffb56a" transparent opacity={0.18} />
                  </mesh>
                )}
              </group>
            ))}
          </group>
        )}
      </InteractiveZone>
    </group>
  );
}
