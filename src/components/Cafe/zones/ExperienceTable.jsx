import React, { useRef } from 'react';
import { Text, RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import InteractiveZone from '../InteractiveZone.jsx';

// Far-left "working corner". The seated character is the primary user persona
// (this is me!) — clicking her opens the Contact panel. The laptop on the
// table opens Experience. There's also an INVITING empty chair on the
// near-side of the table, suggesting the user can come "sit and chat".

// === Reusable wooden chair ===
function Chair({ position = [0, 0, 0], rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[0.78, 0.08, 0.78]} />
        <meshStandardMaterial color="#3a2418" roughness={0.95} />
      </mesh>
      {/* Backrest — sits at -Z relative to chair, so the chair "faces" +Z */}
      <mesh position={[0, 1.0, -0.36]} castShadow>
        <boxGeometry args={[0.78, 1.05, 0.08]} />
        <meshStandardMaterial color="#3a2418" roughness={0.95} />
      </mesh>
      {[
        [-0.33, 0.21, 0.33],
        [0.33, 0.21, 0.33],
        [-0.33, 0.21, -0.33],
        [0.33, 0.21, -0.33],
      ].map((p, i) => (
        <mesh key={i} position={p}>
          <cylinderGeometry args={[0.045, 0.045, 0.42, 6]} />
          <meshStandardMaterial color="#1a0e08" />
        </mesh>
      ))}
    </group>
  );
}

function PersonaCharacter({ hovered }) {
  const headRef = useRef();
  const waveArmRef = useRef();
  const waveHandRef = useRef();
  const restArmRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.45) * 0.16;
      headRef.current.rotation.z = Math.sin(t * 0.7) * 0.04;
    }
    // Wave loop: she waves continuously while seated (a friendly invitation).
    // Upper-arm pinned at ~-2.55 rad (raised straight up to side of head).
    // Hand pivots back-and-forth so the silhouette clearly reads as a wave.
    if (waveArmRef.current) {
      const target = -2.55 + Math.sin(t * 4.5) * 0.18;
      waveArmRef.current.rotation.z += (target - waveArmRef.current.rotation.z) * 0.2;
    }
    if (waveHandRef.current) {
      waveHandRef.current.rotation.z = Math.sin(t * 7.5) * 0.55;
    }
    if (restArmRef.current) {
      restArmRef.current.rotation.x = -1.0 + Math.sin(t * 0.7) * 0.04;
    }
  });

  // Color palette
  const skin = '#c89875';
  const blazer = '#22324f';
  const blouse = '#fbf2e2';
  const skirt = '#1a2740';
  const hair = '#1a0e08';
  const lip = '#c44a55';

  return (
    <group>
      {/* === Wooden chair under her === */}
      <Chair />

      {/* === Pencil skirt / dress (hides upper legs cleanly — no chair clipping) === */}
      <mesh position={[0, 0.66, 0.05]} castShadow>
        <cylinderGeometry args={[0.32, 0.42, 0.55, 20]} />
        <meshStandardMaterial color={skirt} roughness={0.88} />
      </mesh>
      {/* Skirt hem accent */}
      <mesh position={[0, 0.4, 0.05]}>
        <cylinderGeometry args={[0.42, 0.43, 0.025, 20]} />
        <meshStandardMaterial color="#0e1424" roughness={0.85} />
      </mesh>

      {/* === Calves + shoes peek out below the skirt, in FRONT of the chair === */}
      <mesh position={[-0.13, 0.2, 0.5]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.34, 10]} />
        <meshStandardMaterial color={skin} roughness={0.85} />
      </mesh>
      <mesh position={[0.13, 0.2, 0.5]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.34, 10]} />
        <meshStandardMaterial color={skin} roughness={0.85} />
      </mesh>
      {/* Heeled flats */}
      <mesh position={[-0.13, 0.045, 0.55]} castShadow>
        <boxGeometry args={[0.13, 0.07, 0.22]} />
        <meshStandardMaterial color="#1a0e08" roughness={0.85} />
      </mesh>
      <mesh position={[0.13, 0.045, 0.55]} castShadow>
        <boxGeometry args={[0.13, 0.07, 0.22]} />
        <meshStandardMaterial color="#1a0e08" roughness={0.85} />
      </mesh>

      {/* === Torso (slim blazer) — narrower waist than shoulders to read feminine === */}
      <group position={[0, 1.1, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.34, 0.27, 0.85, 18]} />
          <meshStandardMaterial color={blazer} roughness={0.85} />
        </mesh>
        {/* Blouse triangle peeking through the lapels */}
        <mesh position={[0, 0.16, 0.3]}>
          <planeGeometry args={[0.34, 0.36]} />
          <meshStandardMaterial color={blouse} roughness={0.7} />
        </mesh>
        {/* Lapels */}
        <mesh position={[-0.16, 0.18, 0.31]} rotation={[0, 0, 0.32]}>
          <planeGeometry args={[0.13, 0.42]} />
          <meshStandardMaterial color="#0e1424" roughness={0.85} />
        </mesh>
        <mesh position={[0.16, 0.18, 0.31]} rotation={[0, 0, -0.32]}>
          <planeGeometry args={[0.13, 0.42]} />
          <meshStandardMaterial color="#0e1424" roughness={0.85} />
        </mesh>
        {/* Necklace pendant */}
        <mesh position={[0, 0.28, 0.32]}>
          <sphereGeometry args={[0.024, 12, 12]} />
          <meshStandardMaterial color="#cfa46a" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Bust subtle definition */}
        <mesh position={[-0.13, 0.04, 0.3]}>
          <sphereGeometry args={[0.085, 14, 14]} />
          <meshStandardMaterial color={blazer} roughness={0.85} />
        </mesh>
        <mesh position={[0.13, 0.04, 0.3]}>
          <sphereGeometry args={[0.085, 14, 14]} />
          <meshStandardMaterial color={blazer} roughness={0.85} />
        </mesh>
      </group>

      {/* === Head + long hair === */}
      <group ref={headRef} position={[0, 1.78, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.27, 28, 28]} />
          <meshStandardMaterial color={skin} roughness={0.8} />
        </mesh>
        {/* Hair crown */}
        <mesh position={[0, 0.04, -0.04]} scale={[1.07, 0.98, 1.1]}>
          <sphereGeometry args={[0.27, 22, 22]} />
          <meshStandardMaterial color={hair} roughness={1} />
        </mesh>
        {/* Soft bangs across the forehead */}
        <mesh position={[0, 0.16, 0.2]} scale={[1.0, 0.32, 0.55]}>
          <sphereGeometry args={[0.27, 16, 16]} />
          <meshStandardMaterial color={hair} roughness={1} />
        </mesh>
        {/* Short face-framing locks — kept jaw-length so they read as hair
            tendrils rather than dangling extra arms next to the body. */}
        <mesh position={[-0.26, -0.08, 0.04]} rotation={[0, 0, 0.06]}>
          <boxGeometry args={[0.08, 0.38, 0.12]} />
          <meshStandardMaterial color={hair} roughness={1} />
        </mesh>
        <mesh position={[0.26, -0.08, 0.04]} rotation={[0, 0, -0.06]}>
          <boxGeometry args={[0.08, 0.38, 0.12]} />
          <meshStandardMaterial color={hair} roughness={1} />
        </mesh>
        {/* Long back hair (down past mid-back) */}
        <mesh position={[0, -0.55, -0.18]}>
          <boxGeometry args={[0.5, 1.15, 0.13]} />
          <meshStandardMaterial color={hair} roughness={1} />
        </mesh>
        {/* Hair tip taper */}
        <mesh position={[0, -1.18, -0.18]}>
          <coneGeometry args={[0.24, 0.22, 12]} />
          <meshStandardMaterial color={hair} roughness={1} />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.09, 0.0, 0.24]}>
          <sphereGeometry args={[0.024, 8, 8]} />
          <meshBasicMaterial color="#0a0510" />
        </mesh>
        <mesh position={[0.09, 0.0, 0.24]}>
          <sphereGeometry args={[0.024, 8, 8]} />
          <meshBasicMaterial color="#0a0510" />
        </mesh>
        {/* Eyelashes (tiny dark slashes above the eyes) */}
        <mesh position={[-0.09, 0.04, 0.245]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.05, 0.005, 0.005]} />
          <meshBasicMaterial color="#0a0510" />
        </mesh>
        <mesh position={[0.09, 0.04, 0.245]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.05, 0.005, 0.005]} />
          <meshBasicMaterial color="#0a0510" />
        </mesh>
        {/* Lipstick smile */}
        <mesh position={[0, -0.085, 0.235]}>
          <torusGeometry args={[0.058, 0.011, 8, 18, Math.PI]} />
          <meshBasicMaterial color={lip} />
        </mesh>
        {/* Cheek blush */}
        <mesh position={[-0.16, -0.05, 0.22]}>
          <circleGeometry args={[0.038, 14]} />
          <meshBasicMaterial color="#e29185" transparent opacity={0.55} />
        </mesh>
        <mesh position={[0.16, -0.05, 0.22]}>
          <circleGeometry args={[0.038, 14]} />
          <meshBasicMaterial color="#e29185" transparent opacity={0.55} />
        </mesh>
        {/* Pearl earrings */}
        <mesh position={[-0.27, -0.05, 0.05]}>
          <sphereGeometry args={[0.025, 10, 10]} />
          <meshStandardMaterial color="#fff5e9" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh position={[0.27, -0.05, 0.05]}>
          <sphereGeometry args={[0.025, 10, 10]} />
          <meshStandardMaterial color="#fff5e9" metalness={0.7} roughness={0.2} />
        </mesh>
      </group>

      {/* === Resting (left) arm — across her lap === */}
      <group position={[-0.34, 1.36, 0.05]}>
        <group ref={restArmRef} rotation={[-1.0, 0, 0.25]}>
          <mesh position={[0, -0.27, 0]} castShadow>
            <capsuleGeometry args={[0.075, 0.5, 4, 10]} />
            <meshStandardMaterial color={blazer} roughness={0.85} />
          </mesh>
          <mesh position={[0, -0.55, 0]}>
            <sphereGeometry args={[0.085, 14, 14]} />
            <meshStandardMaterial color={skin} roughness={0.85} />
          </mesh>
        </group>
      </group>

      {/* === Waving (right) arm — raised straight up beside her head === */}
      <group position={[0.34, 1.36, 0.06]}>
        {/* Initial Z-rotation matches the lerp target so the arm doesn't
            briefly hang down at the resting pose on first paint. */}
        <group ref={waveArmRef} rotation={[0, 0, -2.55]}>
          {/* Upper arm */}
          <mesh position={[0, -0.3, 0]} castShadow>
            <capsuleGeometry args={[0.075, 0.55, 4, 10]} />
            <meshStandardMaterial color={blazer} roughness={0.85} />
          </mesh>
          {/* Hand at the end of the arm — pivots about Z so the wave is obvious */}
          <group position={[0, -0.62, 0]}>
            <group ref={waveHandRef}>
              <mesh>
                <sphereGeometry args={[0.1, 14, 14]} />
                <meshStandardMaterial color={skin} roughness={0.85} />
              </mesh>
              {/* Five finger nubs to reinforce the "waving palm" silhouette */}
              {[-0.06, -0.03, 0, 0.03, 0.06].map((dx, i) => (
                <mesh key={i} position={[dx, 0.09, 0]}>
                  <sphereGeometry args={[0.022, 10, 10]} />
                  <meshStandardMaterial color={skin} roughness={0.85} />
                </mesh>
              ))}
            </group>
          </group>
        </group>
      </group>

      {/* "Hi!" speech bubble — depthTest off so it always renders on top */}
      <group position={[0.85, 2.55, 0.2]} renderOrder={1000}>
        <mesh>
          <planeGeometry args={[0.62, 0.36]} />
          <meshBasicMaterial color="#fff7ec" depthTest={false} />
        </mesh>
        <Text
          position={[0, 0, 0.001]}
          fontSize={0.18}
          color="#3a2418"
          anchorX="center"
          anchorY="middle"
          renderOrder={1001}
          material-depthTest={false}
        >
          Hi! 👋
        </Text>
        {/* Bubble tail */}
        <mesh position={[-0.28, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
          <coneGeometry args={[0.07, 0.16, 3]} />
          <meshBasicMaterial color="#fff7ec" depthTest={false} />
        </mesh>
      </group>

      {/* Hover indicator — glow above her head */}
      {hovered && (
        <mesh position={[0, 2.4, 0]}>
          <sphereGeometry args={[0.09, 14, 14]} />
          <meshStandardMaterial
            color="#ffb56a"
            emissive="#ffb56a"
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>
      )}
    </group>
  );
}

export default function ExperienceTable() {
  // Local frame: persona group + chair are placed BEHIND the table (-Z), the
  // empty inviting chair is placed IN FRONT of the table (+Z). The whole
  // table-group rotation gives the camera a 3/4 view.
  return (
    <group position={[-12.5, 0, 1.0]} rotation={[0, 0.32, 0]}>
      {/* Table top */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[3.0, 0.1, 1.6]} />
        <meshStandardMaterial color="#3a2418" roughness={0.85} />
      </mesh>
      {/* Table legs */}
      {[
        [-1.3, -0.65],
        [1.3, -0.65],
        [-1.3, 0.65],
        [1.3, 0.65],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.55, z]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 1.1, 8]} />
          <meshStandardMaterial color="#1a0e08" roughness={0.9} />
        </mesh>
      ))}

      {/* Laptop on the table (facing camera-side) — opens Experience */}
      <InteractiveZone id="experience" position={[0.55, 1.18, 0.2]} hoverScale={1.04}>
        {({ hovered }) => (
          <group rotation={[0, Math.PI, 0]}>
            <RoundedBox args={[1.2, 0.05, 0.8]} radius={0.03} castShadow>
              <meshStandardMaterial color="#1a1024" roughness={0.4} metalness={0.6} />
            </RoundedBox>
            <group position={[0, 0.55, -0.4]} rotation={[-Math.PI / 9, 0, 0]}>
              <RoundedBox args={[1.2, 0.7, 0.05]} radius={0.03} castShadow>
                <meshStandardMaterial color="#0e0818" roughness={0.4} metalness={0.6} />
              </RoundedBox>
              <mesh position={[0, 0, 0.03]}>
                <planeGeometry args={[1.1, 0.6]} />
                <meshStandardMaterial
                  color="#1d1330"
                  emissive={hovered ? '#c79bff' : '#7b4dd6'}
                  emissiveIntensity={hovered ? 1.4 : 0.8}
                  toneMapped={false}
                />
              </mesh>
              <Text position={[0, 0, 0.04]} fontSize={0.07} color="#f6d8ff" anchorX="center" anchorY="middle">
                {`>>  experience.log`}
              </Text>
            </group>
          </group>
        )}
      </InteractiveZone>

      {/* Coffee mug on the table */}
      <mesh position={[-0.9, 1.2, 0.0]} castShadow>
        <cylinderGeometry args={[0.1, 0.08, 0.18, 16]} />
        <meshStandardMaterial color="#fff5e9" />
      </mesh>

      {/* Persona — seated on a chair BEHIND the table, facing the user */}
      <InteractiveZone id="contact" position={[0, 0, -1.25]} hoverScale={1.04}>
        {({ hovered }) => (
          <group>
            {/* Generous transparent hit box covering chair + persona */}
            <mesh position={[0, 1.2, 0]}>
              <boxGeometry args={[1.3, 2.5, 1.4]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
            <PersonaCharacter hovered={hovered} />
          </group>
        )}
      </InteractiveZone>

      {/* Empty INVITING chair on the near side of the table — facing the table */}
      <Chair position={[0, 0, 1.35]} rotation={Math.PI} />
      {/* Floating "sit with me" hint above the empty chair */}
      <group position={[0, 1.85, 1.35]} renderOrder={1000}>
        <mesh>
          <planeGeometry args={[1.4, 0.34]} />
          <meshBasicMaterial color="#fff7ec" depthTest={false} transparent opacity={0.9} />
        </mesh>
        <Text
          position={[0, 0, 0.001]}
          fontSize={0.13}
          color="#3a2418"
          anchorX="center"
          anchorY="middle"
          renderOrder={1001}
          material-depthTest={false}
        >
          Pull up a chair! ☕
        </Text>
      </group>
    </group>
  );
}
