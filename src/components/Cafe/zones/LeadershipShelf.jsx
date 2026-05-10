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

function FramedPlaque({ title, org, accent, dark = false, size = [3.2, 1.7], imageBase }) {
  const [w, h] = size;
  const photoW = w - 0.1;
  const photoH = h - 0.5;
  const photoTex = useFirstAvailableTexture(imageBase);
  return (
    <group>
      {/* Outer wood frame */}
      <RoundedBox args={[w + 0.18, h + 0.18, 0.1]} radius={0.05} smoothness={3}>
        <meshStandardMaterial color="#5b3a26" roughness={0.9} />
      </RoundedBox>
      {/* Inner mat */}
      <RoundedBox args={[w + 0.04, h + 0.04, 0.11]} radius={0.04} smoothness={3} position={[0, 0, 0.02]}>
        <meshStandardMaterial color="#3a2418" roughness={0.95} />
      </RoundedBox>
      {/* "Photo" — real image when available, otherwise colored accent. */}
      {photoTex ? (
        <mesh position={[0, 0.05, 0.07]}>
          <planeGeometry args={[photoW, photoH]} />
          <meshBasicMaterial map={photoTex} toneMapped={false} />
        </mesh>
      ) : (
        <mesh position={[0, 0.05, 0.07]}>
          <planeGeometry args={[photoW, photoH]} />
          <meshStandardMaterial
            color={dark ? '#1a0e22' : '#231533'}
            emissive={accent}
            emissiveIntensity={0.45}
            toneMapped={false}
          />
        </mesh>
      )}
      <Text
        position={[0, -0.45, 0.08]}
        fontSize={0.18}
        color="#fff7ec"
        anchorX="center"
        anchorY="middle"
        maxWidth={w - 0.1}
        textAlign="center"
      >
        {title}
      </Text>
      <Text
        position={[0, -0.7, 0.08]}
        fontSize={0.11}
        color="#ffd6a5"
        anchorX="center"
        anchorY="middle"
        maxWidth={w - 0.1}
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

  return (
    <group position={groupPosition}>
      {/* === Section header === */}
      <Text
        position={[0, 2.65, 0.05]}
        fontSize={0.34}
        color="#ffd6a5"
        anchorX="center"
        anchorY="middle"
      >
        Leadership & Experience
      </Text>
      <mesh position={[0, 2.4, 0.05]}>
        <planeGeometry args={[12, 0.02]} />
        <meshStandardMaterial color="#ffb56a" emissive="#ff8a3c" emissiveIntensity={0.9} toneMapped={false} />
      </mesh>

      {/* === Leadership row → opens Leadership panel === */}
      <InteractiveZone id="leadership" position={[0, 1.2, 0]} hoverScale={1.02}>
        {({ hovered }) => (
          <group>
            <Text
              position={[-5.6, 0.9, 0.05]}
              fontSize={0.16}
              color="#ffb56a"
              anchorX="left"
              anchorY="middle"
              letterSpacing={0.18}
            >
              ── LEADERSHIP ──
            </Text>
            {leadership.map((item, i) => (
              <group key={item.title} position={[(i - 1) * 4.0, 0, 0]}>
                <FramedPlaque
                  title={item.title}
                  org={item.org}
                  accent={leadershipAccents[i]}
                  imageBase={item.imageBase}
                />
                {hovered && (
                  <mesh position={[0, 0, -0.02]}>
                    <planeGeometry args={[3.6, 2.1]} />
                    <meshBasicMaterial color="#ffb56a" transparent opacity={0.18} />
                  </mesh>
                )}
              </group>
            ))}
          </group>
        )}
      </InteractiveZone>

      {/* === Experience row → opens Experience panel === */}
      <InteractiveZone id="experience" position={[0, -1.5, 0]} hoverScale={1.02}>
        {({ hovered }) => (
          <group>
            <Text
              position={[-5.6, 0.9, 0.05]}
              fontSize={0.16}
              color="#ffb56a"
              anchorX="left"
              anchorY="middle"
              letterSpacing={0.18}
            >
              ── EXPERIENCE ──
            </Text>
            {experienceForWall.map((item, i) => (
              <group key={item.company + i} position={[(i - 1) * 4.0, 0, 0]}>
                <FramedPlaque
                  title={item.title}
                  org={item.company}
                  accent={experienceAccents[i]}
                  imageBase={item.imageBase}
                  dark
                />
                {hovered && (
                  <mesh position={[0, 0, -0.02]}>
                    <planeGeometry args={[3.6, 2.1]} />
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
