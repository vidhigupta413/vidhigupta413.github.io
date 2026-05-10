import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Seated customer near the window/recipes area. She subtly leans, raises
// her right arm in an "eating/writing" rhythm, and her head tilts in time.
// Renders the chair with her so the composition reads as one prop in space.
export default function SeatedCustomer({ position = [-13.0, 0, -1.0] }) {
  const torsoRef = useRef();
  const armRef = useRef();
  const headRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (torsoRef.current) {
      torsoRef.current.rotation.z = Math.sin(t * 0.85) * 0.05;
      torsoRef.current.rotation.x = Math.sin(t * 0.6) * 0.03;
    }
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 1.1 + 0.5) * 0.07;
    }
    if (armRef.current) {
      const lift = Math.sin(t * 1.6) * 0.4;
      armRef.current.rotation.x = -1.0 + lift;
    }
  });

  return (
    <group position={position}>
      {/* Bench */}
      <mesh position={[0, 0.45, -0.1]} castShadow>
        <boxGeometry args={[0.7, 0.1, 0.7]} />
        <meshStandardMaterial color="#3a2418" roughness={0.95} />
      </mesh>
      <mesh position={[0, 1.0, -0.4]} castShadow>
        <boxGeometry args={[0.7, 1.0, 0.1]} />
        <meshStandardMaterial color="#3a2418" roughness={0.95} />
      </mesh>
      {/* Bench legs */}
      {[
        [-0.3, 0.2, 0.2],
        [0.3, 0.2, 0.2],
        [-0.3, 0.2, -0.4],
        [0.3, 0.2, -0.4],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 6]} />
          <meshStandardMaterial color="#1a0e08" />
        </mesh>
      ))}

      {/* Seated body — sits forward of the bench with knees out */}
      <group ref={torsoRef} position={[0, 0.85, 0]}>
        {/* Torso */}
        <mesh castShadow>
          <cylinderGeometry args={[0.32, 0.36, 0.85, 14]} />
          <meshStandardMaterial color="#5b3a90" roughness={0.85} />
        </mesh>
        {/* Scarf */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.12, 14]} />
          <meshStandardMaterial color="#a677ff" roughness={0.85} />
        </mesh>

        {/* Head */}
        <group ref={headRef} position={[0, 0.7, 0.0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.27, 24, 24]} />
            <meshStandardMaterial color="#a16b46" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.06, -0.04]} scale={[1.05, 0.95, 1.05]}>
            <sphereGeometry args={[0.27, 16, 16]} />
            <meshStandardMaterial color="#1a0e08" roughness={1} />
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

        {/* Right arm — animated (eating gesture) */}
        <group position={[0.32, 0.2, 0.15]}>
          <group ref={armRef}>
            <mesh position={[0, -0.25, 0]} castShadow>
              <capsuleGeometry args={[0.07, 0.45, 4, 8]} />
              <meshStandardMaterial color="#5b3a90" roughness={0.85} />
            </mesh>
            <mesh position={[0, -0.55, 0]}>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial color="#a16b46" roughness={0.85} />
            </mesh>
          </group>
        </group>
        {/* Left arm — relaxed on lap */}
        <group position={[-0.32, 0.2, 0.18]} rotation={[-1.3, 0, 0.2]}>
          <mesh position={[0, -0.25, 0]} castShadow>
            <capsuleGeometry args={[0.07, 0.45, 4, 8]} />
            <meshStandardMaterial color="#5b3a90" roughness={0.85} />
          </mesh>
        </group>
      </group>

      {/* Knees / lap (legs pointing forward) */}
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
