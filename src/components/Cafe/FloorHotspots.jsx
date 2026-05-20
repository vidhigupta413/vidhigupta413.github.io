import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';

import { vantagePoints } from '../../data/portfolio.js';
import { useCafeStore } from '../../hooks/useCafeStore.js';

// Pulsing ring + floating label sitting flat on the floor. Clicking the
// disc triggers a smooth camera fly-to via CameraVantageRig. The Overview
// hotspot uses a warmer accent so it reads as "reset to wide shot".
function FloorHotspot({ vantage }) {
  const ringRef = useRef();
  const discRef = useRef();
  const requestVantage = useCafeStore((s) => s.requestVantage);
  const pendingVantageId = useCafeStore((s) => s.pendingVantageId);
  const [hovered, setHovered] = useState(false);

  const [floorX, floorZ] = vantage.floor;
  const isOverview = vantage.id === 'overview';
  const accent = isOverview ? '#ffd591' : '#a677ff';
  const isPending = pendingVantageId === vantage.id;

  useFrame(({ clock }) => {
    if (!ringRef.current || !discRef.current) return;
    const t = clock.elapsedTime + floorX * 0.3 + floorZ * 0.2;
    const pulse = 0.5 + Math.sin(t * 2.4) * 0.5;
    const baseRingOpacity = hovered ? 0.95 : 0.55;
    ringRef.current.material.opacity = baseRingOpacity + pulse * 0.3;
    discRef.current.material.opacity = (hovered ? 0.32 : 0.16) + pulse * 0.18;
    const scale = (hovered ? 1.1 : 1) + pulse * 0.06;
    ringRef.current.scale.setScalar(scale);
  });

  return (
    <group position={[floorX, 0.02, floorZ]}>
      {/* Solid translucent disc — primary click target */}
      <mesh
        ref={discRef}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          requestVantage(vantage.id);
        }}
      >
        <circleGeometry args={[0.82, 36]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.18}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
      {/* Animated outer ring — purely decorative */}
      <mesh
        ref={ringRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.005, 0]}
        raycast={() => null}
      >
        <ringGeometry args={[0.78, 0.98, 56]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.65}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
      {/* Floor label — billboard always faces the camera so it stays
          readable from any vantage. Kept low so it doesn't overlap props. */}
      <Billboard position={[0, hovered ? 0.7 : 0.55, 0]}>
        <Text
          fontSize={hovered ? 0.32 : 0.26}
          color={hovered || isPending ? '#fff7ec' : accent}
          outlineWidth={0.02}
          outlineColor="#0a0612"
          anchorX="center"
          anchorY="middle"
          raycast={() => null}
        >
          {vantage.label}
        </Text>
      </Billboard>
    </group>
  );
}

/**
 * Click-on-the-floor camera router. Renders a small pulsing ring at each
 * vantage's approach point on the floor; clicking flies the camera in.
 * Replaces the old `VantageBar` HTML tab.
 */
export default function FloorHotspots() {
  return (
    <group>
      {vantagePoints.map((v) => (
        <FloorHotspot key={v.id} vantage={v} />
      ))}
    </group>
  );
}
