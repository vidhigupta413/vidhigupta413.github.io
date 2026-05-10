import React from 'react';
import { Text, RoundedBox } from '@react-three/drei';

import InteractiveZone from '../InteractiveZone.jsx';
import { performances } from '../../../data/portfolio.js';
import { ROOM } from '../RoomShell.jsx';

// Mounted on the RIGHT wall, rotated to face the room (-X). The TV's local
// X axis becomes "depth along right wall" so the screen reads left-to-right
// when viewed from the camera's vantage point.
export default function PerformancesTV() {
  return (
    <group
      position={[ROOM.rightWallX - 0.12, 4.2, ROOM.floorCenterZ - 1.8]}
      rotation={[0, -Math.PI / 2, 0]}
    >
      <InteractiveZone id="performances">
        {({ hovered }) => (
          <group>
            {/* TV bezel */}
            <RoundedBox args={[6.0, 3.6, 0.18]} radius={0.06} smoothness={3}>
              <meshStandardMaterial color="#0a0510" roughness={0.4} metalness={0.7} />
            </RoundedBox>

            {/* Screen content */}
            <mesh position={[0, 0, 0.1]}>
              <planeGeometry args={[5.6, 3.25]} />
              <meshStandardMaterial
                color="#23163a"
                emissive={hovered ? '#a677ff' : '#7b4dd6'}
                emissiveIntensity={hovered ? 1.4 : 0.9}
                toneMapped={false}
              />
            </mesh>

            {/* Stage spotlights silhouette */}
            {[-1.8, -0.9, 0, 0.9, 1.8].map((x) => (
              <group key={x}>
                <mesh position={[x, -0.4, 0.11]}>
                  <coneGeometry args={[0.45, 1.4, 16, 1, true]} />
                  <meshBasicMaterial color="#d4a3ff" transparent opacity={0.35} side={2} />
                </mesh>
                <mesh position={[x, -1.05, 0.12]}>
                  <capsuleGeometry args={[0.13, 0.45, 4, 8]} />
                  <meshStandardMaterial color="#0a0510" />
                </mesh>
              </group>
            ))}

            {/* Title overlays */}
            <Text
              position={[-1.6, 1.25, 0.12]}
              fontSize={0.26}
              color="#ffe8ff"
              anchorX="left"
              anchorY="middle"
            >
              Performances
            </Text>
            <Text
              position={[-1.6, 0.92, 0.12]}
              fontSize={0.21}
              color="#b475ff"
              anchorX="left"
              anchorY="middle"
            >
              {performances.group}
            </Text>

            {/* YouTube play button */}
            <group position={[2.2, 1.2, 0.12]}>
              <mesh>
                <planeGeometry args={[1.0, 0.7]} />
                <meshStandardMaterial
                  color="#ff2a2a"
                  emissive="#ff2a2a"
                  emissiveIntensity={hovered ? 1.4 : 0.6}
                  toneMapped={false}
                />
              </mesh>
              <mesh position={[0.04, 0, 0.01]} rotation={[0, 0, -Math.PI / 2]}>
                <coneGeometry args={[0.2, 0.36, 3]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </group>

            {/* Bottom timeline scrubber */}
            <mesh position={[0, -1.45, 0.12]}>
              <planeGeometry args={[5.0, 0.04]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
            </mesh>
            <mesh position={[-1.0, -1.45, 0.13]}>
              <circleGeometry args={[0.06, 16]} />
              <meshBasicMaterial color="#ff7be0" />
            </mesh>
          </group>
        )}
      </InteractiveZone>

      {/* Wall plate behind the TV (slightly larger) */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[6.5, 4.0]} />
        <meshStandardMaterial color="#1a0e08" roughness={1} />
      </mesh>
    </group>
  );
}
