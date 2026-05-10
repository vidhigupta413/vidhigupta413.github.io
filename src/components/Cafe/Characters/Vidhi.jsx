import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

// Generic barista behind the counter (staff). Same friendly animations as
// before, but no longer a special click target — About is opened from the
// chalkboard / nameplate instead.
export default function Vidhi() {
  const torsoRef = useRef();
  const headRef = useRef();
  const armRef = useRef();
  const handRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (torsoRef.current) {
      torsoRef.current.scale.y = 1 + Math.sin(t * 1.6) * 0.012;
    }
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 0.7) * 0.04;
      headRef.current.rotation.y = Math.sin(t * 0.45) * 0.12;
    }

    // Wave gesture: 2s burst every 7s.
    const waveCycle = t % 7;
    const isWaving = waveCycle < 2.4;
    if (armRef.current) {
      const target = isWaving ? -2.2 + Math.sin(waveCycle * 6) * 0.25 : -0.15;
      armRef.current.rotation.z += (target - armRef.current.rotation.z) * 0.15;
    }
    if (handRef.current) {
      handRef.current.rotation.z = isWaving
        ? Math.sin(waveCycle * 9) * 0.5
        : 0;
    }
  });

  return (
    <group>
      <group>
            {/* Legs (peek below counter line, visible only from low angles) */}
            <mesh position={[-0.16, 0.5, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.1, 1.0, 10]} />
              <meshStandardMaterial color="#1a0e08" roughness={0.95} />
            </mesh>
            <mesh position={[0.16, 0.5, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.1, 1.0, 10]} />
              <meshStandardMaterial color="#1a0e08" roughness={0.95} />
            </mesh>

            {/* Torso — black t-shirt with the cafe logo */}
            <group ref={torsoRef} position={[0, 1.4, 0]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.4, 0.5, 1.4, 18]} />
                <meshStandardMaterial color="#1f1018" roughness={0.85} />
              </mesh>
              {/* Apron overlay (slight color shift) */}
              <mesh position={[0, -0.05, 0.05]}>
                <cylinderGeometry args={[0.42, 0.52, 1.2, 18, 1, true]} />
                <meshStandardMaterial color="#291222" roughness={0.95} side={2} />
              </mesh>
              {/* Cafe logo box on the chest */}
              <mesh position={[0, 0.05, 0.42]}>
                <planeGeometry args={[0.6, 0.45]} />
                <meshStandardMaterial
                  color="#1a0e22"
                  emissive="#5b3a90"
                  emissiveIntensity={0.35}
                  toneMapped={false}
                />
              </mesh>
              <Text
                position={[0, 0.16, 0.43]}
                fontSize={0.13}
                color="#ffd6a5"
                anchorX="center"
                anchorY="middle"
              >
                STAFF
              </Text>
              <Text
                position={[0, -0.02, 0.43]}
                fontSize={0.11}
                color="#ffb56a"
                anchorX="center"
                anchorY="middle"
              >
                Vidhi's Cafe
              </Text>
              <Text
                position={[0, -0.18, 0.43]}
                fontSize={0.08}
                color="#d6b4ff"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.15}
              >
                {'</>'}
              </Text>
            </group>

            {/* Head + hair */}
            <group ref={headRef} position={[0, 2.3, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.32, 28, 28]} />
                <meshStandardMaterial color="#a16b46" roughness={0.85} />
              </mesh>
              {/* Hair frame (back/top) */}
              <mesh position={[0, 0.05, -0.05]} scale={[1.05, 1.0, 1.05]}>
                <sphereGeometry args={[0.32, 18, 18]} />
                <meshStandardMaterial color="#1a0e08" roughness={1} />
              </mesh>
              {/* Curly volume on top */}
              {[
                [0, 0.32, -0.05],
                [-0.18, 0.27, 0.0],
                [0.18, 0.27, 0.0],
                [-0.1, 0.32, -0.18],
                [0.1, 0.32, -0.18],
              ].map(([x, y, z], i) => (
                <mesh key={i} position={[x, y, z]}>
                  <sphereGeometry args={[0.16, 14, 14]} />
                  <meshStandardMaterial color="#1a0e08" roughness={1} />
                </mesh>
              ))}
              {/* Eyes */}
              <mesh position={[-0.1, 0.04, 0.29]}>
                <sphereGeometry args={[0.024, 8, 8]} />
                <meshBasicMaterial color="#0a0510" />
              </mesh>
              <mesh position={[0.1, 0.04, 0.29]}>
                <sphereGeometry args={[0.024, 8, 8]} />
                <meshBasicMaterial color="#0a0510" />
              </mesh>
              {/* Smile */}
              <mesh position={[0, -0.08, 0.29]} rotation={[0, 0, 0]}>
                <torusGeometry args={[0.05, 0.008, 8, 16, Math.PI]} />
                <meshBasicMaterial color="#5a2a1a" />
              </mesh>
            </group>

            {/* Left arm (static, leaning) */}
            <group position={[-0.45, 1.85, 0]} rotation={[0.1, 0, 0.18]}>
              <mesh position={[0, -0.32, 0]}>
                <capsuleGeometry args={[0.1, 0.55, 4, 10]} />
                <meshStandardMaterial color="#1f1018" roughness={0.85} />
              </mesh>
              <mesh position={[0, -0.66, 0]}>
                <sphereGeometry args={[0.11, 12, 12]} />
                <meshStandardMaterial color="#a16b46" roughness={0.85} />
              </mesh>
            </group>

            {/* Right arm — pivots from shoulder for the wave gesture */}
            <group position={[0.45, 1.85, 0]}>
              <group ref={armRef}>
                <mesh position={[0, -0.32, 0]}>
                  <capsuleGeometry args={[0.1, 0.55, 4, 10]} />
                  <meshStandardMaterial color="#1f1018" roughness={0.85} />
                </mesh>
                {/* Hand pivots a bit at the wrist */}
                <group position={[0, -0.66, 0]}>
                  <group ref={handRef}>
                    <mesh>
                      <sphereGeometry args={[0.12, 12, 12]} />
                      <meshStandardMaterial color="#a16b46" roughness={0.85} />
                    </mesh>
                  </group>
                </group>
              </group>
            </group>
          </group>

      {/* Staff chatter bubble — depthTest off + high renderOrder so the
          laptop / espresso machine never occlude it. */}
      <group position={[1.4, 3.5, 0.2]} renderOrder={1000}>
        <mesh renderOrder={1000}>
          <planeGeometry args={[2.0, 1.2]} />
          <meshBasicMaterial color="#fff7ec" depthTest={false} />
        </mesh>
        <Text
          position={[0, 0.2, 0.01]}
          fontSize={0.16}
          color="#3a2418"
          anchorX="center"
          anchorY="middle"
          renderOrder={1001}
          material-depthTest={false}
        >
          Orders up!
        </Text>
        <Text
          position={[0, -0.15, 0.01]}
          fontSize={0.12}
          color="#7b3f1c"
          anchorX="center"
          anchorY="middle"
          renderOrder={1001}
          material-depthTest={false}
        >
          Fresh pull on the way ~
        </Text>
        <mesh position={[-0.65, -0.65, 0]} rotation={[0, 0, Math.PI / 4]} renderOrder={1000}>
          <coneGeometry args={[0.16, 0.35, 3]} />
          <meshBasicMaterial color="#fff7ec" depthTest={false} />
        </mesh>
      </group>
    </group>
  );
}
