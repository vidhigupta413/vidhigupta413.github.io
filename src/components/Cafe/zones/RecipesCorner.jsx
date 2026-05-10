import React from 'react';
import { Text, RoundedBox } from '@react-three/drei';

import InteractiveZone from '../InteractiveZone.jsx';
import { recipes } from '../../../data/portfolio.js';
import { ROOM } from '../RoomShell.jsx';

// Big illustrative recipe board mounted on the LEFT WALL. Replaces the old
// floor "Recipes" sign and sketchbook → all recipe content is wall-mounted.
// The board itself is one Recipes zone; click anywhere to open the panel.

function RecipeCard({ recipe, accent }) {
  return (
    <group>
      <RoundedBox args={[3.0, 1.5, 0.08]} radius={0.05} smoothness={3}>
        <meshStandardMaterial color="#1f1018" roughness={0.85} />
      </RoundedBox>
      <RoundedBox args={[2.85, 1.35, 0.09]} radius={0.04} smoothness={3} position={[0, 0, 0.02]}>
        <meshStandardMaterial
          color="#2a1820"
          emissive={accent}
          emissiveIntensity={0.35}
          toneMapped={false}
        />
      </RoundedBox>
      <Text
        position={[-1.25, 0.42, 0.06]}
        fontSize={0.42}
        color="#ffd6a5"
        anchorX="left"
        anchorY="middle"
      >
        {recipe.emoji}
      </Text>
      <Text
        position={[-0.6, 0.3, 0.06]}
        fontSize={0.18}
        color="#fff5d8"
        anchorX="left"
        anchorY="middle"
      >
        {recipe.name}
      </Text>
      <Text
        position={[-0.6, 0.05, 0.06]}
        fontSize={0.1}
        color="#ffb56a"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.12}
      >
        {recipe.note}
      </Text>
      <Text
        position={[-0.6, -0.3, 0.06]}
        fontSize={0.095}
        color="#d6b4ff"
        anchorX="left"
        anchorY="middle"
        maxWidth={2.1}
      >
        {recipe.description}
      </Text>
    </group>
  );
}

export default function RecipesCorner() {
  // The board hangs flat on the left wall; rotated so its "front" faces +X.
  // Local +X on this board therefore points along the room's depth (Z).
  const accents = ['#ffb56a', '#a4c46a', '#ff7be0', '#7b4dd6'];

  return (
    <group
      position={[ROOM.leftWallX + 0.12, 4.6, ROOM.floorCenterZ + 1.5]}
      rotation={[0, Math.PI / 2, 0]}
    >
      <InteractiveZone id="recipes" hoverScale={1.02}>
        {({ hovered }) => (
          <group>
            {/* Wood backboard */}
            <RoundedBox args={[10.5, 5.6, 0.12]} radius={0.1} smoothness={3}>
              <meshStandardMaterial color="#3a2418" roughness={0.9} />
            </RoundedBox>
            {/* Inner panel */}
            <RoundedBox args={[10.0, 5.2, 0.13]} radius={0.08} smoothness={3} position={[0, 0, 0.015]}>
              <meshStandardMaterial color="#1f1018" roughness={1} />
            </RoundedBox>

            {/* Header */}
            <Text
              position={[0, 2.15, 0.08]}
              fontSize={0.5}
              color="#fff1c8"
              anchorX="center"
              anchorY="middle"
            >
              RECIPES
            </Text>
            <Text
              position={[0, 1.7, 0.08]}
              fontSize={0.2}
              color="#ffb56a"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.16}
            >
              ✦ I made & tried ✦
            </Text>

            {/* 2x2 grid of recipe cards */}
            {recipes.slice(0, 4).map((r, i) => {
              const col = i % 2;
              const row = Math.floor(i / 2);
              const x = (col - 0.5) * 3.4;
              const y = -0.1 - row * 1.65;
              return (
                <group key={r.name} position={[x, y, 0.06]}>
                  <RecipeCard recipe={r} accent={accents[i]} />
                </group>
              );
            })}

            {/* Hover glow rim */}
            {hovered && (
              <mesh position={[0, 0, -0.02]}>
                <planeGeometry args={[10.8, 5.8]} />
                <meshBasicMaterial color="#ffb56a" transparent opacity={0.12} />
              </mesh>
            )}
          </group>
        )}
      </InteractiveZone>

      {/* Small shelf below the board with three jars (decoration) */}
      <group position={[0, -3.2, 0.12]}>
        <mesh>
          <boxGeometry args={[10.5, 0.1, 0.6]} />
          <meshStandardMaterial color="#3a2418" roughness={0.9} />
        </mesh>
        {[
          [-3.5, '#a4632a'],
          [-1.5, '#7b3f1c'],
          [0.5, '#a4632a'],
          [2.5, '#7b3f1c'],
          [4.0, '#a4632a'],
        ].map(([x, c], i) => (
          <group key={i} position={[x, 0.25, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.18, 0.18, 0.32, 14]} />
              <meshStandardMaterial color="#f6e3c5" transparent opacity={0.45} />
            </mesh>
            <mesh>
              <cylinderGeometry args={[0.15, 0.15, 0.22, 14]} />
              <meshStandardMaterial color={c} roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.22, 0]}>
              <cylinderGeometry args={[0.17, 0.17, 0.04, 14]} />
              <meshStandardMaterial color="#3a2418" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
