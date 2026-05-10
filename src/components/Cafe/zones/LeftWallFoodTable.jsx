import React from 'react';
import { Text } from '@react-three/drei';

import InteractiveZone from '../InteractiveZone.jsx';
import { recipes, recipePlates } from '../../../data/portfolio.js';
import { ROOM } from '../RoomShell.jsx';

// Rectangular tasting table flush to the left wall with four plated dishes.
// Each plate is a flat ceramic disc with stylized 3D fake food on top, and
// clicking opens the Recipes modal with that dish highlighted.

// Per-dish 3D garnish meshes — kept simple but recognizable.
function FoodForDish({ slug }) {
  if (slug === 'rajma') {
    // Mound of stewed kidney beans on a plate of rice (cream base).
    return (
      <group>
        {/* Rice base */}
        <mesh position={[0, 0.012, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.024, 24]} />
          <meshStandardMaterial color="#fff5e9" roughness={0.95} />
        </mesh>
        {/* Beans cluster */}
        {[
          [-0.05, 0.04, 0.0],
          [0.05, 0.04, 0.02],
          [0.0, 0.04, -0.05],
          [-0.07, 0.06, -0.04],
          [0.07, 0.06, -0.04],
          [0.0, 0.07, 0.05],
          [-0.04, 0.05, 0.06],
          [0.04, 0.05, 0.06],
          [0.0, 0.09, 0.0],
        ].map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.034, 12, 12]} />
            <meshStandardMaterial color="#7a2418" roughness={0.85} />
          </mesh>
        ))}
        {/* Sauce drizzle */}
        <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.05, 0.16, 24]} />
          <meshStandardMaterial color="#a4321a" emissive="#a4321a" emissiveIntensity={0.4} toneMapped={false} />
        </mesh>
        {/* Cilantro flecks */}
        {[
          [-0.08, 0.07, -0.02],
          [0.08, 0.075, 0.02],
          [0.0, 0.1, 0.04],
        ].map((p, i) => (
          <mesh key={`c-${i}`} position={p}>
            <boxGeometry args={[0.025, 0.005, 0.012]} />
            <meshStandardMaterial color="#5a8a3a" />
          </mesh>
        ))}
      </group>
    );
  }
  if (slug === 'pulav') {
    // Pile of yellow basmati rice with peas + carrots.
    return (
      <group>
        <mesh position={[0, 0.04, 0]}>
          <coneGeometry args={[0.2, 0.1, 24]} />
          <meshStandardMaterial color="#f6dca0" roughness={0.95} />
        </mesh>
        {/* Peas */}
        {[
          [-0.07, 0.06, 0.04],
          [0.05, 0.07, -0.05],
          [-0.03, 0.09, -0.02],
          [0.07, 0.06, 0.04],
          [0.0, 0.1, 0.03],
        ].map((p, i) => (
          <mesh key={`p-${i}`} position={p}>
            <sphereGeometry args={[0.018, 10, 10]} />
            <meshStandardMaterial color="#5a8a3a" roughness={0.85} />
          </mesh>
        ))}
        {/* Carrot dice */}
        {[
          [-0.05, 0.06, -0.05],
          [0.04, 0.08, 0.05],
          [-0.06, 0.09, 0.02],
        ].map((p, i) => (
          <mesh key={`ca-${i}`} position={p}>
            <boxGeometry args={[0.02, 0.02, 0.02]} />
            <meshStandardMaterial color="#e07a1a" />
          </mesh>
        ))}
        {/* Bay leaf */}
        <mesh position={[0.06, 0.105, 0.0]} rotation={[0, 0.4, 0.1]}>
          <boxGeometry args={[0.07, 0.005, 0.025]} />
          <meshStandardMaterial color="#3a5a2a" />
        </mesh>
      </group>
    );
  }
  if (slug === 'paneer') {
    // Skewered cubes of paneer, lightly charred.
    return (
      <group>
        {/* Sauce smear under */}
        <mesh position={[0, 0.014, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.006, 24]} />
          <meshStandardMaterial color="#d97a3a" emissive="#d97a3a" emissiveIntensity={0.25} toneMapped={false} />
        </mesh>
        {/* Skewer */}
        <mesh position={[0, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.005, 0.005, 0.34, 8]} />
          <meshStandardMaterial color="#5a3a1a" />
        </mesh>
        {/* Paneer cubes */}
        {[-0.1, -0.03, 0.04, 0.11].map((x, i) => (
          <mesh key={i} position={[x, 0.06, 0]}>
            <boxGeometry args={[0.06, 0.06, 0.06]} />
            <meshStandardMaterial color="#fff1d6" roughness={0.85} />
          </mesh>
        ))}
        {/* Char marks (small dark squares on top of cubes) */}
        {[-0.1, -0.03, 0.04, 0.11].map((x, i) => (
          <mesh key={`ch-${i}`} position={[x, 0.091, 0]}>
            <boxGeometry args={[0.05, 0.002, 0.05]} />
            <meshStandardMaterial color="#5a2a1a" />
          </mesh>
        ))}
        {/* Bell pepper between cubes */}
        <mesh position={[-0.065, 0.06, 0]}>
          <boxGeometry args={[0.04, 0.04, 0.04]} />
          <meshStandardMaterial color="#5a8a3a" />
        </mesh>
        <mesh position={[0.075, 0.06, 0]}>
          <boxGeometry args={[0.04, 0.04, 0.04]} />
          <meshStandardMaterial color="#a01a3c" />
        </mesh>
      </group>
    );
  }
  if (slug === 'banana-bread') {
    // Two thick slices of banana bread with a butter dollop.
    return (
      <group>
        {[
          [-0.06, 0.03, 0.0, 0.05],
          [0.06, 0.03, 0.0, -0.05],
        ].map(([x, y, z, rot], i) => (
          <group key={i} position={[x, y, z]} rotation={[0, rot, 0]}>
            <mesh>
              <boxGeometry args={[0.16, 0.07, 0.18]} />
              <meshStandardMaterial color="#a4632a" roughness={0.85} />
            </mesh>
            {/* Crust top a touch darker */}
            <mesh position={[0, 0.036, 0]}>
              <boxGeometry args={[0.16, 0.005, 0.18]} />
              <meshStandardMaterial color="#6a3a18" roughness={0.95} />
            </mesh>
            {/* Walnut chunk */}
            <mesh position={[0.02, 0.04, -0.03]}>
              <sphereGeometry args={[0.018, 8, 8]} />
              <meshStandardMaterial color="#7a4a2a" />
            </mesh>
            <mesh position={[-0.04, 0.04, 0.04]}>
              <sphereGeometry args={[0.014, 8, 8]} />
              <meshStandardMaterial color="#7a4a2a" />
            </mesh>
          </group>
        ))}
        {/* Pat of butter */}
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.04, 0.018, 0.04]} />
          <meshStandardMaterial color="#fbe9a1" emissive="#fbe9a1" emissiveIntensity={0.2} toneMapped={false} />
        </mesh>
        {/* Banana coin garnish */}
        <mesh position={[-0.0, 0.075, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.005, 16]} />
          <meshStandardMaterial color="#fbe390" />
        </mesh>
      </group>
    );
  }
  return null;
}

function FoodPlate({ slug, x, z, hoverAccent }) {
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) return null;
  // Plate top surface sits at local Y = 0 (the InteractiveZone's position is on
  // top of the table). All food meshes are positioned in the +Y half-space so
  // they appear ON the plate, not floating.
  return (
    <InteractiveZone
      id="recipes"
      position={[x, 0.62, z]}
      zoneOptions={{ recipeSlug: slug }}
      hoverScale={1.05}
    >
      {({ hovered }) => (
        <group>
          {/* Flat ceramic plate (slightly raised rim) */}
          <mesh receiveShadow castShadow>
            <cylinderGeometry args={[0.34, 0.34, 0.018, 32]} />
            <meshStandardMaterial color="#fdf6ec" roughness={0.65} />
          </mesh>
          {/* Plate rim (thin torus on top for the lip) */}
          <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.32, 0.012, 12, 36]} />
            <meshStandardMaterial color="#f1e5d2" roughness={0.7} />
          </mesh>
          {/* Hover glow ring */}
          {hovered && (
            <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.36, 0.42, 32]} />
              <meshBasicMaterial color={hoverAccent} transparent opacity={0.5} />
            </mesh>
          )}
          {/* Fake food */}
          <FoodForDish slug={slug} />
          {/* Tiny floating dish-name label when hovered */}
          {hovered && (
            <Text
              position={[0, 0.42, 0]}
              fontSize={0.1}
              color="#ffd6a5"
              anchorX="center"
              anchorY="middle"
            >
              {recipe.name}
            </Text>
          )}
        </group>
      )}
    </InteractiveZone>
  );
}

export default function LeftWallFoodTable() {
  // Table runs along +Z on the left wall; wall normal is +X.
  const baseX = ROOM.leftWallX + 1.15;
  const baseZ = ROOM.floorCenterZ - 1.2;

  const dishes = [
    { slug: recipePlates[0], x: -0.55, z: -0.45, hoverAccent: '#a4321a' },
    { slug: recipePlates[1], x: 0.55, z: -0.45, hoverAccent: '#ffb56a' },
    { slug: recipePlates[2], x: -0.55, z: 0.45, hoverAccent: '#ff8a3c' },
    { slug: recipePlates[3], x: 0.55, z: 0.45, hoverAccent: '#a4632a' },
  ];

  return (
    <group position={[baseX, 0, baseZ]} rotation={[0, Math.PI / 2, 0]}>
      {/* Table top — slightly bigger so all four plates sit comfortably */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.08, 1.6]} />
        <meshStandardMaterial color="#5b3a26" roughness={0.88} />
      </mesh>
      {/* Tablecloth runner accent */}
      <mesh position={[0, 0.642, 0]}>
        <boxGeometry args={[2.3, 0.005, 0.5]} />
        <meshStandardMaterial color="#a4632a" roughness={0.9} />
      </mesh>
      {/* Legs */}
      {[
        [-1.05, 0.3, -0.7],
        [1.05, 0.3, -0.7],
        [-1.05, 0.3, 0.7],
        [1.05, 0.3, 0.7],
      ].map((p, i) => (
        <mesh key={i} position={p}>
          <cylinderGeometry args={[0.045, 0.045, 0.6, 8]} />
          <meshStandardMaterial color="#1a0e08" />
        </mesh>
      ))}

      {dishes.map((d) => (
        <FoodPlate key={d.slug} slug={d.slug} x={d.x} z={d.z} hoverAccent={d.hoverAccent} />
      ))}

      <Text
        position={[0, 1.1, 0]}
        fontSize={0.16}
        color="#ffd6a5"
        anchorX="center"
        anchorY="middle"
      >
        Tasting table
      </Text>
    </group>
  );
}
