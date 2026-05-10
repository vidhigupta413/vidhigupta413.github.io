import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Secondary baristas. Two animation modes simulate "making drinks":
//   • mode="pour"  — right arm holds a milk pitcher and tilts up/down on a slow sine.
//   • mode="grind" — both arms move in a horizontal stir/grind motion + slight torso bob.
export default function Barista({
  position = [0, 0, 0],
  rotation = 0,
  palette = { body: '#1f1018', skin: '#a16b46', hair: '#1a0e08', accent: '#5b3a26' },
  mode = 'pour',
  offset = 0,
}) {
  const torsoRef = useRef();
  const armRRef = useRef();
  const armLRef = useRef();
  const headRef = useRef();
  const pitcherRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + offset;

    if (torsoRef.current) torsoRef.current.scale.y = 1 + Math.sin(t * 1.6) * 0.012;
    if (headRef.current) headRef.current.rotation.y = Math.sin(t * 0.5) * 0.18;

    if (mode === 'pour') {
      // Right arm tilted forward, oscillates as if pouring.
      if (armRRef.current) {
        armRRef.current.rotation.x = -1.0 + Math.sin(t * 1.4) * 0.25;
        armRRef.current.rotation.z = -0.3;
      }
      if (armLRef.current) {
        armLRef.current.rotation.x = -0.6 + Math.sin(t * 1.4 + 0.3) * 0.1;
      }
      if (pitcherRef.current) {
        pitcherRef.current.rotation.x = Math.sin(t * 1.4) * 0.4;
      }
    } else if (mode === 'grind') {
      // Both arms make a circular motion as if grinding/stirring.
      if (armRRef.current) {
        armRRef.current.rotation.x = -0.9 + Math.sin(t * 3) * 0.15;
        armRRef.current.rotation.z = -0.2 + Math.cos(t * 3) * 0.15;
      }
      if (armLRef.current) {
        armLRef.current.rotation.x = -0.9 + Math.sin(t * 3 + Math.PI) * 0.15;
        armLRef.current.rotation.z = 0.2 + Math.cos(t * 3 + Math.PI) * 0.15;
      }
    }
  });

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Legs */}
      <mesh position={[-0.16, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1.0, 10]} />
        <meshStandardMaterial color="#1a0e08" roughness={0.95} />
      </mesh>
      <mesh position={[0.16, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1.0, 10]} />
        <meshStandardMaterial color="#1a0e08" roughness={0.95} />
      </mesh>

      {/* Torso */}
      <group ref={torsoRef} position={[0, 1.4, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.4, 0.5, 1.4, 18]} />
          <meshStandardMaterial color={palette.body} roughness={0.85} />
        </mesh>
        {/* Apron */}
        <mesh position={[0, -0.05, 0.05]}>
          <cylinderGeometry args={[0.42, 0.52, 1.2, 18, 1, true]} />
          <meshStandardMaterial color={palette.accent} roughness={0.95} side={2} />
        </mesh>
      </group>

      {/* Head */}
      <group ref={headRef} position={[0, 2.3, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.32, 24, 24]} />
          <meshStandardMaterial color={palette.skin} roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.05, -0.05]} scale={[1.05, 1.0, 1.05]}>
          <sphereGeometry args={[0.32, 16, 16]} />
          <meshStandardMaterial color={palette.hair} roughness={1} />
        </mesh>
        <mesh position={[-0.1, 0.04, 0.29]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshBasicMaterial color="#0a0510" />
        </mesh>
        <mesh position={[0.1, 0.04, 0.29]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshBasicMaterial color="#0a0510" />
        </mesh>
      </group>

      {/* Right arm — pivots from shoulder. Carries a pitcher in pour mode. */}
      <group position={[0.45, 1.85, 0]}>
        <group ref={armRRef}>
          <mesh position={[0, -0.32, 0]}>
            <capsuleGeometry args={[0.1, 0.55, 4, 10]} />
            <meshStandardMaterial color={palette.body} roughness={0.85} />
          </mesh>
          <group position={[0, -0.66, 0]}>
            <mesh>
              <sphereGeometry args={[0.11, 12, 12]} />
              <meshStandardMaterial color={palette.skin} />
            </mesh>
            {/* Milk pitcher (only meaningful in pour mode) */}
            {mode === 'pour' && (
              <group ref={pitcherRef} position={[0.05, -0.05, 0.18]}>
                <mesh>
                  <cylinderGeometry args={[0.08, 0.1, 0.22, 14]} />
                  <meshStandardMaterial color="#cfa46a" metalness={0.85} roughness={0.3} />
                </mesh>
                <mesh position={[0.1, 0.04, 0]}>
                  <coneGeometry args={[0.04, 0.08, 4]} />
                  <meshStandardMaterial color="#cfa46a" metalness={0.85} roughness={0.3} />
                </mesh>
              </group>
            )}
          </group>
        </group>
      </group>

      {/* Left arm */}
      <group position={[-0.45, 1.85, 0]}>
        <group ref={armLRef} rotation={[-0.5, 0, 0.18]}>
          <mesh position={[0, -0.32, 0]}>
            <capsuleGeometry args={[0.1, 0.55, 4, 10]} />
            <meshStandardMaterial color={palette.body} roughness={0.85} />
          </mesh>
          <mesh position={[0, -0.66, 0]}>
            <sphereGeometry args={[0.11, 12, 12]} />
            <meshStandardMaterial color={palette.skin} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
