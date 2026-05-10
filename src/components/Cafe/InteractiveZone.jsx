import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

import { useCafeStore } from '../../hooks/useCafeStore.js';

// A reusable wrapper that gives any cluster of 3D meshes:
//   • hover detection (sets store + scales group slightly)
//   • a soft purple bloom-y rim (a back-facing emissive mesh, optional)
//   • click handling that opens the matching overlay panel
//
// Children should be local to the group (its origin = the zone's position).
export default function InteractiveZone({
  id,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  hoverScale = 1.04,
  cursor = 'pointer',
  /** Passed to `openZone(id, zoneOptions)` — e.g. `{ recipeSlug: 'rajma' }` for Recipes. */
  zoneOptions = {},
  children,
}) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const openZone = useCafeStore((s) => s.openZone);
  const setHoveredGlobal = useCafeStore((s) => s.setHovered);

  const targetScale = hovered ? hoverScale : 1;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Smoothly interpolate the entire zone's scale toward the target.
    const next = groupRef.current.scale.x + (targetScale - groupRef.current.scale.x) * Math.min(delta * 8, 1);
    groupRef.current.scale.setScalar(next);
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setHoveredGlobal(id);
        document.body.style.cursor = cursor;
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        setHoveredGlobal(null);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        openZone(id, zoneOptions);
      }}
    >
      {typeof children === 'function' ? children({ hovered }) : children}
    </group>
  );
}
