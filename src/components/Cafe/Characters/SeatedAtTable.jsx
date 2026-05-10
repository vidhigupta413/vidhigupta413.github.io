import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Simple seated character used at customer tables. Local origin = the chair
// position. The character faces +Z (out from the chair back) and animates a
// gentle torso/head sway plus a hand lift toward the drink.
export default function SeatedAtTable({
  palette,
  height = 1.6,
  offset = 0,
  drinkSide = 'right',
}) {
  const torsoRef = useRef();
  const headRef = useRef();
  const armDrinkRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + offset;
    if (torsoRef.current) {
      torsoRef.current.rotation.z = Math.sin(t * 0.85) * 0.04;
      torsoRef.current.rotation.x = Math.sin(t * 0.6) * 0.025;
    }
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.45) * 0.18;
      headRef.current.rotation.z = Math.sin(t * 1.1 + 0.3) * 0.06;
    }
    if (armDrinkRef.current) {
      // Reach for the drink every ~5s.
      const cycle = (t % 5) / 5;
      const lift = cycle < 0.4 ? Math.sin(cycle * Math.PI / 0.4) * 0.6 : 0;
      armDrinkRef.current.rotation.x = -1.2 + lift;
    }
  });

  const scale = height / 1.8;
  const xSign = drinkSide === 'left' ? -1 : 1;

  return (
    <group scale={scale}>
      {/* Torso (seated — origin sits at the chair seat height) */}
      <group ref={torsoRef} position={[0, 0.95, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.32, 0.36, 0.85, 14]} />
          <meshStandardMaterial color={palette.body} roughness={0.85} />
        </mesh>
        {/* Collar */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.1, 14]} />
          <meshStandardMaterial color={palette.accent} roughness={0.85} />
        </mesh>

        {/* Head */}
        <group ref={headRef} position={[0, 0.7, 0.02]}>
          <mesh castShadow>
            <sphereGeometry args={[0.27, 24, 24]} />
            <meshStandardMaterial color={palette.skin} roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.06, -0.04]} scale={[1.05, 0.9, 1.05]}>
            <sphereGeometry args={[0.27, 16, 16]} />
            <meshStandardMaterial color={palette.hair} roughness={1} />
          </mesh>
          <mesh position={[-0.09, 0.0, 0.24]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshBasicMaterial color="#0a0510" />
          </mesh>
          <mesh position={[0.09, 0.0, 0.24]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshBasicMaterial color="#0a0510" />
          </mesh>
        </group>

        {/* Drink-side arm (animated reach) */}
        <group position={[xSign * 0.32, 0.2, 0.15]}>
          <group ref={armDrinkRef}>
            <mesh position={[0, -0.25, 0]} castShadow>
              <capsuleGeometry args={[0.07, 0.45, 4, 8]} />
              <meshStandardMaterial color={palette.body} roughness={0.85} />
            </mesh>
            <mesh position={[0, -0.55, 0]}>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial color={palette.skin} />
            </mesh>
          </group>
        </group>

        {/* Resting arm */}
        <group position={[-xSign * 0.32, 0.2, 0.18]} rotation={[-1.3, 0, -xSign * 0.2]}>
          <mesh position={[0, -0.25, 0]} castShadow>
            <capsuleGeometry args={[0.07, 0.45, 4, 8]} />
            <meshStandardMaterial color={palette.body} roughness={0.85} />
          </mesh>
        </group>
      </group>

      {/* Knees */}
      <group position={[0, 0.5, 0.2]} rotation={[Math.PI / 2.6, 0, 0]}>
        <mesh position={[-0.13, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.6, 8]} />
          <meshStandardMaterial color="#1a0e08" />
        </mesh>
        <mesh position={[0.13, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.6, 8]} />
          <meshStandardMaterial color="#1a0e08" />
        </mesh>
      </group>
    </group>
  );
}
