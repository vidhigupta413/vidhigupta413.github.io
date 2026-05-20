import React from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

import InteractiveZone from '../InteractiveZone.jsx';
import { ROOM } from '../RoomShell.jsx';

// Grand piano in the back-right corner. Click opens the piano music player.
// Beside it: a glass display case with flute + piccolo on stands — opens woodwinds panel.

const glassProps = {
  color: '#e8f4ff',
  metalness: 0.05,
  roughness: 0.12,
  transmission: 0.92,
  thickness: 0.18,
  transparent: true,
  envMapIntensity: 0.6,
  clearcoat: 0.35,
  clearcoatRoughness: 0.2,
};

function GrandPiano({ hovered }) {
  const pianoBlack = '#0a070a';
  const pianoSheen = '#1a1018';
  const lidUnderside = '#7a4a1a';
  const ivory = '#fdf6ec';

  const NUM_WHITE = 18;
  const KEY_AREA_W = 3.0;
  const WHITE_KEY_W = KEY_AREA_W / NUM_WHITE;
  const BLACK_KEY_PATTERN = [1, 1, 0, 1, 1, 1, 0];
  const lidOpenAngle = -Math.PI / 2.9;

  return (
    <group>
      <mesh position={[0, 0.35, 0.7]} castShadow>
        <cylinderGeometry args={[0.07, 0.1, 0.7, 12]} />
        <meshStandardMaterial color={pianoBlack} roughness={0.5} metalness={0.25} />
      </mesh>
      <mesh position={[-1.25, 0.35, -0.55]} castShadow>
        <cylinderGeometry args={[0.07, 0.1, 0.7, 12]} />
        <meshStandardMaterial color={pianoBlack} roughness={0.5} metalness={0.25} />
      </mesh>
      <mesh position={[1.25, 0.35, -0.55]} castShadow>
        <cylinderGeometry args={[0.07, 0.1, 0.7, 12]} />
        <meshStandardMaterial color={pianoBlack} roughness={0.5} metalness={0.25} />
      </mesh>

      <RoundedBox
        args={[2.9, 0.5, 1.7]}
        radius={0.12}
        smoothness={4}
        position={[0, 0.95, -0.1]}
        castShadow
      >
        <meshStandardMaterial
          color={pianoBlack}
          emissive={hovered ? '#3a1f4a' : '#000000'}
          emissiveIntensity={hovered ? 0.45 : 0.0}
          toneMapped={false}
          roughness={0.4}
          metalness={0.4}
        />
      </RoundedBox>

      <mesh position={[1.3, 0.95, -0.1]} rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.85, 0.85, 0.5, 28, 1, false, -Math.PI / 2, Math.PI]} />
        <meshStandardMaterial color={pianoBlack} roughness={0.4} metalness={0.4} />
      </mesh>

      <mesh position={[0, 1.205, -0.1]}>
        <boxGeometry args={[2.95, 0.04, 1.75]} />
        <meshStandardMaterial color={pianoBlack} roughness={0.3} metalness={0.6} />
      </mesh>

      <mesh position={[0, 1.215, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.78, 1.55]} />
        <meshStandardMaterial color="#3a2410" roughness={0.85} metalness={0.05} />
      </mesh>
      <mesh position={[-0.2, 1.219, -0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 0.9]} />
        <meshStandardMaterial color="#a87d2a" roughness={0.55} metalness={0.7} />
      </mesh>

      <group position={[0, 1.24, -0.95]} rotation={[lidOpenAngle, 0, 0]}>
        <RoundedBox
          args={[2.95, 0.08, 1.75]}
          radius={0.09}
          smoothness={4}
          position={[0, 0.04, 0.875]}
          castShadow
        >
          <meshStandardMaterial color={pianoSheen} roughness={0.22} metalness={0.6} />
        </RoundedBox>
        <mesh position={[1.3, 0.04, 0.875]} castShadow>
          <cylinderGeometry args={[0.88, 0.88, 0.08, 28, 1, false, -Math.PI / 2, Math.PI]} />
          <meshStandardMaterial color={pianoSheen} roughness={0.22} metalness={0.6} />
        </mesh>
        <mesh position={[0, -0.005, 0.875]} rotation={[Math.PI, 0, 0]}>
          <planeGeometry args={[2.78, 1.55]} />
          <meshStandardMaterial color={lidUnderside} roughness={0.85} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[-0.4, 0.085, 1.5]} rotation={[0, 0.06, 0]}>
          <planeGeometry args={[1.5, 0.04]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.45} />
        </mesh>
      </group>

      <group position={[0, 0.78, 0.95]}>
        <mesh castShadow>
          <boxGeometry args={[KEY_AREA_W + 0.16, 0.08, 0.45]} />
          <meshStandardMaterial color="#1a0e08" roughness={0.7} />
        </mesh>
        {Array.from({ length: NUM_WHITE }).map((_, i) => {
          const x = -KEY_AREA_W / 2 + WHITE_KEY_W * (i + 0.5);
          return (
            <mesh key={`w-${i}`} position={[x, 0.06, 0.02]}>
              <boxGeometry args={[WHITE_KEY_W * 0.9, 0.04, 0.4]} />
              <meshStandardMaterial color={ivory} roughness={0.35} />
            </mesh>
          );
        })}
        {Array.from({ length: NUM_WHITE - 1 }).map((_, i) => {
          if (!BLACK_KEY_PATTERN[i % BLACK_KEY_PATTERN.length]) return null;
          const x = -KEY_AREA_W / 2 + WHITE_KEY_W * (i + 1);
          return (
            <mesh key={`b-${i}`} position={[x, 0.085, -0.06]}>
              <boxGeometry args={[WHITE_KEY_W * 0.6, 0.05, 0.26]} />
              <meshStandardMaterial color="#0a0510" roughness={0.4} />
            </mesh>
          );
        })}
      </group>

      <mesh position={[0, 1.0, 0.7]} rotation={[Math.PI / 18, 0, 0]}>
        <boxGeometry args={[2.9, 0.34, 0.04]} />
        <meshStandardMaterial color={pianoBlack} roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 1.0, 0.722]} rotation={[Math.PI / 18, 0, 0]}>
        <planeGeometry args={[0.7, 0.06]} />
        <meshBasicMaterial color="#cfa46a" />
      </mesh>

      <group position={[0, 0.05, 0.55]}>
        <mesh>
          <boxGeometry args={[0.32, 0.04, 0.16]} />
          <meshStandardMaterial color="#cfa46a" metalness={0.85} roughness={0.25} />
        </mesh>
        {[-0.1, 0, 0.1].map((x) => (
          <mesh key={x} position={[x, 0.05, 0.05]}>
            <boxGeometry args={[0.05, 0.08, 0.04]} />
            <meshStandardMaterial color="#cfa46a" metalness={0.85} roughness={0.25} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** Glass case: tall narrow vitrine; flute + piccolo on stands. */
function GlassInstrumentCase({ hovered }) {
  const w = 0.68;
  const d = 0.34;
  const h = 1.52;
  const baseY = 0.06;
  const floorY = baseY * 2 + 0.01;
  const silver = '#c8d4e8';
  const silverDark = '#9aa8bc';

  return (
    <group>
      <RoundedBox args={[w + 0.1, baseY * 2, d + 0.08]} radius={0.035} position={[0, baseY, 0]} castShadow>
        <meshStandardMaterial color="#2a1810" roughness={0.75} metalness={0.15} />
      </RoundedBox>
      <mesh position={[0, floorY, 0]}>
        <boxGeometry args={[w - 0.05, 0.022, d - 0.05]} />
        <meshStandardMaterial color="#1a0f18" roughness={0.95} />
      </mesh>

      <mesh position={[0, floorY + h / 2, -d / 2]} castShadow={false}>
        <boxGeometry args={[w, h, 0.02]} />
        <meshPhysicalMaterial {...glassProps} opacity={hovered ? 0.98 : 0.92} />
      </mesh>
      <mesh position={[-w / 2, floorY + h / 2, 0]} castShadow={false}>
        <boxGeometry args={[0.02, h, d]} />
        <meshPhysicalMaterial {...glassProps} opacity={hovered ? 0.98 : 0.92} />
      </mesh>
      <mesh position={[w / 2, floorY + h / 2, 0]} castShadow={false}>
        <boxGeometry args={[0.02, h, d]} />
        <meshPhysicalMaterial {...glassProps} opacity={hovered ? 0.98 : 0.92} />
      </mesh>
      <mesh position={[0, floorY + h, 0]} castShadow={false}>
        <boxGeometry args={[w, 0.024, d]} />
        <meshPhysicalMaterial {...glassProps} opacity={hovered ? 0.98 : 0.92} />
      </mesh>

      <mesh position={[0, floorY + h + 0.01, 0]}>
        <boxGeometry args={[w + 0.03, 0.018, d + 0.03]} />
        <meshStandardMaterial color="#b8955e" metalness={0.8} roughness={0.25} />
      </mesh>

      <group position={[-0.1, floorY, 0.015]}>
        <mesh position={[0, 0.016, 0]} castShadow>
          <cylinderGeometry args={[0.048, 0.054, 0.032, 18]} />
          <meshStandardMaterial color="#0a0a0c" metalness={0.65} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.009, 0.38, 10]} />
          <meshStandardMaterial color="#1a1a20" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.68, 0.01]} castShadow>
          <cylinderGeometry args={[0.017, 0.017, 0.88, 16]} />
          <meshStandardMaterial color={silver} metalness={0.85} roughness={0.22} />
        </mesh>
        {[0.24, 0.34, 0.44, 0.54].map((dy, i) => (
          <mesh key={i} position={[0.019, 0.4 + dy, 0.01]} castShadow>
            <boxGeometry args={[0.012, 0.036, 0.048]} />
            <meshStandardMaterial color={silverDark} metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
        <mesh position={[0, 0.2, 0.01]} castShadow>
          <cylinderGeometry args={[0.019, 0.021, 0.15, 12]} />
          <meshStandardMaterial color={silver} metalness={0.8} roughness={0.25} />
        </mesh>
      </group>

      <group position={[0.1, floorY, -0.02]}>
        <mesh position={[0, 0.016, 0]} castShadow>
          <cylinderGeometry args={[0.036, 0.042, 0.028, 14]} />
          <meshStandardMaterial color="#0a0a0c" metalness={0.65} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.14, 0]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.26, 8]} />
          <meshStandardMaterial color="#1a1a20" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.4, 0.008]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.42, 14]} />
          <meshStandardMaterial color="#121418" roughness={0.55} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.68, 0.008]} castShadow>
          <cylinderGeometry args={[0.014, 0.013, 0.16, 12]} />
          <meshStandardMaterial color={silver} metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.8, 0.008]} castShadow>
          <cylinderGeometry args={[0.012, 0.011, 0.09, 10]} />
          <meshStandardMaterial color={silver} metalness={0.8} roughness={0.22} />
        </mesh>
      </group>
    </group>
  );
}

export default function MusicCorner({
  position = [ROOM.rightWallX - 3.5, 0, ROOM.backWallZ + 3.5],
}) {
  return (
    <group position={position} rotation={[0, -Math.PI / 4, 0]}>
      <InteractiveZone id="pianoMusic" hoverScale={1.015}>
        {({ hovered }) => <GrandPiano hovered={hovered} />}
      </InteractiveZone>

      <InteractiveZone
        id="woodwindsDisplay"
        position={[-2.38, 0, 0.12]}
        rotation={[0, -0.52, 0]}
        hoverScale={1.03}
      >
        {({ hovered }) => (
          <group>
            <mesh position={[0, 0.88, 0.2]}>
              <boxGeometry args={[0.82, 1.68, 0.48]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
            <GlassInstrumentCase hovered={hovered} />
          </group>
        )}
      </InteractiveZone>
    </group>
  );
}
