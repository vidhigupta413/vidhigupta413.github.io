import React, { useMemo, useRef } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import { aboutMe } from '../../data/portfolio.js';

// Room dimensions for the EXPANDED cafe (~1.5x the previous footprint).
// Other components import these constants so wall-mounted props always sit
// flush against the new walls — no more guessing magic numbers.
export const ROOM = {
  floorWidth: 39, // x
  floorDepth: 27, // z
  floorCenterZ: 1.5,
  wallHeight: 12,
  backWallZ: -12, // back wall sits on x-y plane at this z
  leftWallX: -19.5,
  rightWallX: 19.5,
  ceilingY: 7.6,
  /** World-space X of the plane that splits the back wall into left/right halves. */
  backWallSplitX: 0,
};

// Edison-style bulb with a softly pulsing pointLight.
function EdisonBulb({ position, scale = 1, ropeLength = 0.55 }) {
  const lightRef = useRef();
  useFrame(({ clock }) => {
    if (!lightRef.current) return;
    const t = clock.elapsedTime + position[0] * 0.6;
    lightRef.current.intensity = 0.55 + Math.sin(t * 1.7) * 0.07;
  });
  return (
    <group position={position}>
      <mesh position={[0, ropeLength / 2, 0]}>
        <cylinderGeometry args={[0.015, 0.015, ropeLength, 6]} />
        <meshStandardMaterial color="#1a0e08" />
      </mesh>
      <mesh position={[0, -0.04, 0]} scale={scale}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#fff1c8"
          emissive="#ff9a45"
          emissiveIntensity={2.4}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0.06, 0]} scale={scale * 0.6}>
        <cylinderGeometry args={[0.05, 0.05, 0.06, 12]} />
        <meshStandardMaterial color="#1a0e08" metalness={0.6} roughness={0.4} />
      </mesh>
      <pointLight
        ref={lightRef}
        position={[0, -0.05, 0]}
        intensity={0.55}
        distance={5}
        color="#ffb46a"
        decay={2}
      />
    </group>
  );
}

function HangingPlant({ position, ropeLength = 1.2 }) {
  return (
    <group position={position}>
      <mesh position={[0, ropeLength / 2, 0]}>
        <cylinderGeometry args={[0.012, 0.012, ropeLength, 6]} />
        <meshStandardMaterial color="#3a2418" />
      </mesh>
      <mesh position={[0, -0.05, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.28, 14]} />
        <meshStandardMaterial color="#7b3f1c" roughness={0.85} />
      </mesh>
      <mesh position={[0, -0.22, 0]}>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshStandardMaterial color="#5a7d3a" roughness={1} />
      </mesh>
      {[
        [0.18, -0.42, 0.05, 0.3],
        [-0.16, -0.5, 0.08, -0.25],
        [0.05, -0.62, -0.1, 0.0],
        [-0.05, -0.55, 0.12, 0.15],
        [0.22, -0.7, -0.05, -0.4],
      ].map(([dx, dy, dz, tilt], i) => (
        <mesh
          key={i}
          position={[dx, dy, dz]}
          rotation={[tilt, i * 0.7, dx * 1.5]}
          scale={[0.6, 1.6, 0.6]}
          castShadow
        >
          <coneGeometry args={[0.09, 0.32, 6]} />
          <meshStandardMaterial color="#36502a" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function FairyDot({ position }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime + position[0] * 1.7;
    ref.current.material.emissiveIntensity = 1.6 + Math.sin(t * 3.5) * 0.6;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial
        color="#fff5c8"
        emissive="#ffd591"
        emissiveIntensity={1.8}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function RoomShell() {
  const pendantPositions = useMemo(() => {
    const xs = [];
    for (let x = -14; x <= 14; x += 2.6) xs.push(x);
    return xs.map((x) => ({ position: [x, 6.5, -2], scale: 1 + ((x + 14) % 3) * 0.05 }));
  }, []);

  const fairyDots = useMemo(() => {
    const dots = [];
    for (let i = -ROOM.floorWidth / 2 + 1; i <= ROOM.floorWidth / 2 - 1; i += 0.85) {
      const sag = Math.sin((i + ROOM.floorWidth) * 0.35) * 0.18;
      dots.push([i, 6.9 + sag, ROOM.backWallZ + 0.4]);
    }
    return dots;
  }, []);

  const hangingPlants = useMemo(
    () => [
      { position: [-13.5, 7.0, -3.6], ropeLength: 0.9 },
      { position: [-9.5, 7.0, -4.2], ropeLength: 1.3 },
      { position: [-5.0, 7.0, -3.6], ropeLength: 0.8 },
      { position: [-1.0, 7.0, -4.0], ropeLength: 1.1 },
      { position: [3.5, 7.0, -3.6], ropeLength: 1.2 },
      { position: [8.0, 7.0, -4.2], ropeLength: 0.9 },
      { position: [12.5, 7.0, -3.6], ropeLength: 1.0 },
      // Side-wall plants
      { position: [-18.6, 7.0, 4.0], ropeLength: 0.9 },
      { position: [-18.6, 7.0, 8.0], ropeLength: 1.1 },
      { position: [18.6, 7.0, 6.0], ropeLength: 1.0 },
    ],
    [],
  );

  return (
    <group>
      {/* === FLOOR === */}
      <mesh
        receiveShadow
        position={[0, -0.05, ROOM.floorCenterZ]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[ROOM.floorWidth, ROOM.floorDepth]} />
        <meshStandardMaterial color="#4a2a18" roughness={0.95} metalness={0.04} />
      </mesh>
      {[-9, -6, -3, 0, 3, 6, 9, 12].map((z) => (
        <mesh
          key={`seam-${z}`}
          position={[0, -0.045, z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[ROOM.floorWidth, 0.04]} />
          <meshBasicMaterial color="#1a0e08" transparent opacity={0.45} />
        </mesh>
      ))}
      {/* Floor uplights */}
      <pointLight position={[0, 0.4, 5]} intensity={0.55} distance={11} color="#ffb46a" />
      <pointLight position={[-12, 0.4, 4]} intensity={0.35} distance={8} color="#ffb46a" />
      <pointLight position={[12, 0.4, 4]} intensity={0.35} distance={8} color="#ffb46a" />

      {/* === BACK WALL (z = ROOM.backWallZ) === */}
      <mesh receiveShadow position={[0, ROOM.wallHeight / 2, ROOM.backWallZ]}>
        <planeGeometry args={[ROOM.floorWidth, ROOM.wallHeight]} />
        <meshStandardMaterial color="#241308" roughness={1} side={2} />
      </mesh>
      {[1.4, 3.2, 5.0, 6.8].map((y) => (
        <mesh key={`bp-${y}`} position={[0, y, ROOM.backWallZ + 0.04]}>
          <planeGeometry args={[ROOM.floorWidth, 0.06]} />
          <meshStandardMaterial color="#3a2418" />
        </mesh>
      ))}
      <mesh position={[0, 0.25, ROOM.backWallZ + 0.05]}>
        <boxGeometry args={[ROOM.floorWidth, 0.5, 0.1]} />
        <meshStandardMaterial color="#3d2515" roughness={0.7} />
      </mesh>

      {/* === LEFT WALL (faces +X) === */}
      <mesh
        receiveShadow
        position={[ROOM.leftWallX, ROOM.wallHeight / 2, ROOM.floorCenterZ]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry args={[ROOM.floorDepth, ROOM.wallHeight]} />
        <meshStandardMaterial color="#1d0e06" roughness={1} side={2} />
      </mesh>
      <mesh position={[ROOM.leftWallX + 0.05, 0.25, ROOM.floorCenterZ]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[ROOM.floorDepth, 0.5, 0.1]} />
        <meshStandardMaterial color="#3d2515" roughness={0.7} />
      </mesh>

      {/* Night-sky window on the LEFT wall (moved from back wall) */}
      <group position={[ROOM.leftWallX + 0.12, 5.0, ROOM.floorCenterZ + 5.5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[2.6, 2.0, 0.12]} />
          <meshStandardMaterial color="#3a2418" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.07]}>
          <planeGeometry args={[2.3, 1.7]} />
          <meshStandardMaterial
            color="#1b2a4d"
            emissive="#3a4f80"
            emissiveIntensity={0.55}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[0.06, 1.7]} />
          <meshStandardMaterial color="#3a2418" />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[2.3, 0.06]} />
          <meshStandardMaterial color="#3a2418" />
        </mesh>
        {[
          [-0.8, 0.4],
          [-0.4, 0.6],
          [0.2, 0.5],
          [0.7, 0.3],
          [0.9, -0.2],
          [-0.3, -0.4],
          [0.4, -0.6],
          [-0.9, -0.6],
        ].map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.09]}>
            <circleGeometry args={[0.022, 8]} />
            <meshBasicMaterial color="#fff5e9" />
          </mesh>
        ))}
        <mesh position={[0, -1.05, 0.18]}>
          <boxGeometry args={[2.7, 0.1, 0.3]} />
          <meshStandardMaterial color="#3a2418" />
        </mesh>
      </group>

      {/* === RIGHT WALL (faces -X) === */}
      <mesh
        receiveShadow
        position={[ROOM.rightWallX, ROOM.wallHeight / 2, ROOM.floorCenterZ]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <planeGeometry args={[ROOM.floorDepth, ROOM.wallHeight]} />
        <meshStandardMaterial color="#1d0e06" roughness={1} side={2} />
      </mesh>
      <mesh position={[ROOM.rightWallX - 0.05, 0.25, ROOM.floorCenterZ]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[ROOM.floorDepth, 0.5, 0.1]} />
        <meshStandardMaterial color="#3d2515" roughness={0.7} />
      </mesh>

      {/* === Ceiling beams (run length-wise) === */}
      <mesh position={[0, ROOM.ceilingY - 0.1, -2]}>
        <boxGeometry args={[ROOM.floorWidth - 3, 0.4, 0.6]} />
        <meshStandardMaterial color="#2a160b" roughness={0.85} />
      </mesh>
      <mesh position={[0, ROOM.ceilingY - 0.3, -2]}>
        <boxGeometry args={[ROOM.floorWidth - 3, 0.08, 0.62]} />
        <meshStandardMaterial color="#5b3a26" roughness={0.8} />
      </mesh>

      {/* Edison-bulb pendants */}
      {pendantPositions.map((p, i) => (
        <EdisonBulb key={i} position={p.position} scale={p.scale} ropeLength={0.55} />
      ))}

      {/* Fairy lights along the back wall */}
      {fairyDots.map((p, i) => (
        <FairyDot key={i} position={p} />
      ))}

      {/* Hanging plants */}
      {hangingPlants.map((p, i) => (
        <HangingPlant key={i} position={p.position} ropeLength={p.ropeLength} />
      ))}

      {/* === Doormat in front of the counter === */}
      <group position={[0, 0.02, 5]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[5.5, 2.6]} />
          <meshStandardMaterial color="#3a1f10" roughness={1} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
          <ringGeometry args={[2.35, 2.55, 48]} />
          <meshBasicMaterial color="#ffb56a" transparent opacity={0.55} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
          <planeGeometry args={[5.2, 2.3]} />
          <meshBasicMaterial color="#5a3a26" transparent opacity={0.85} />
        </mesh>
        {aboutMe.identityChips.map((chip, i) => (
          <Text
            key={chip}
            position={[0, 0.01, -0.85 + i * 0.5]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.22}
            color="#ffd6a5"
            anchorX="center"
            anchorY="middle"
          >
            {chip}
          </Text>
        ))}
        <Text
          position={[0, 0.01, 1.05]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.16}
          color="#ffb56a"
          anchorX="center"
          anchorY="middle"
        >
          {'</>'}
        </Text>
      </group>
    </group>
  );
}
