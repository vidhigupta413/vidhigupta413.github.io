import React from 'react';
import { Text, RoundedBox } from '@react-three/drei';

import InteractiveZone from '../InteractiveZone.jsx';
import { NAV_ITEMS } from '../../../data/portfolio.js';

// Standing A-frame chalkboard listing the menu (8 items, mirrors the top-bar nav).
// Each row is its OWN clickable zone — clicking a row opens that panel directly.
// The "MENU" header is the About zone (so clicking the header still feels right).
export default function MenuChalkboard() {
  return (
    <group position={[-7.5, 1.85, 3.0]} rotation={[0, 0.35, 0]}>
      {/* Wood frame */}
      <RoundedBox
        args={[2.5, 3.5, 0.14]}
        radius={0.07}
        smoothness={3}
        castShadow
      >
        <meshStandardMaterial color="#5b3a26" roughness={0.85} />
      </RoundedBox>
      {/* Inner border */}
      <RoundedBox
        args={[2.32, 3.32, 0.12]}
        radius={0.05}
        smoothness={3}
        position={[0, 0, 0.02]}
      >
        <meshStandardMaterial color="#3a2418" roughness={0.95} />
      </RoundedBox>
      {/* Slate */}
      <mesh position={[0, 0, 0.075]}>
        <planeGeometry args={[2.16, 3.18]} />
        <meshStandardMaterial color="#0e0a14" roughness={1} />
      </mesh>

      {/* Header row → About */}
      <InteractiveZone id="about" position={[0, 1.4, 0.085]} hoverScale={1.05}>
        {({ hovered }) => (
          <group>
            <Text
              fontSize={0.26}
              color={hovered ? '#fff5d8' : '#ffd6a5'}
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.18}
            >
              MENU
            </Text>
            <mesh position={[0, -0.18, 0]}>
              <planeGeometry args={[1.55, 0.012]} />
              <meshBasicMaterial color="#ffb56a" />
            </mesh>
          </group>
        )}
      </InteractiveZone>

      {/* Menu rows — each row opens its own zone */}
      {NAV_ITEMS.map((item, i) => (
        <InteractiveZone
          key={item.id}
          id={item.id}
          position={[0, 1.0 - i * 0.27, 0.085]}
          hoverScale={1.04}
        >
          {({ hovered }) => (
            <group>
              <Text
                position={[-0.95, 0, 0]}
                fontSize={0.14}
                color={hovered ? '#ffe6b3' : '#ffd6a5'}
                anchorX="left"
                anchorY="middle"
              >
                {`${item.number}.`}
              </Text>
              <Text
                position={[-0.7, 0, 0]}
                fontSize={0.14}
                color={hovered ? '#ffffff' : '#f6e3c5'}
                anchorX="left"
                anchorY="middle"
              >
                {item.label}
              </Text>
              {/* invisible hit-target so the whole row is clickable */}
              <mesh position={[0, 0, -0.005]}>
                <planeGeometry args={[2.0, 0.22]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>
            </group>
          )}
        </InteractiveZone>
      ))}

      {/* Hand-lettered footer */}
      <Text
        position={[0, -1.35, 0.085]}
        fontSize={0.11}
        color="#ffb56a"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        ✦ click any row ✦
      </Text>

      {/* Easel legs */}
      <mesh position={[-0.85, -2.1, 0.45]} rotation={[0.2, 0, 0.05]}>
        <cylinderGeometry args={[0.045, 0.045, 1.7, 8]} />
        <meshStandardMaterial color="#3a2418" roughness={0.9} />
      </mesh>
      <mesh position={[0.85, -2.1, 0.45]} rotation={[0.2, 0, -0.05]}>
        <cylinderGeometry args={[0.045, 0.045, 1.7, 8]} />
        <meshStandardMaterial color="#3a2418" roughness={0.9} />
      </mesh>
      {/* Cross brace */}
      <mesh position={[0, -2.5, 0.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 1.7, 6]} />
        <meshStandardMaterial color="#3a2418" />
      </mesh>
    </group>
  );
}
