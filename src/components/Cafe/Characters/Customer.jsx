import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import { walkObstacles } from '../../../data/portfolio.js';

// Walker body radius (used for obstacle pushback). Slightly bigger than the
// visible torso so we keep some breathing room between the walker and props.
const WALKER_BODY_R = 0.45;

// Generic stylized customer — primitive blob person with swinging arms/legs
// and a head bob. Two presentation modes:
//   • kind="loop" — walks around an elliptical path on the floor, with
//     per-frame obstacle pushback so it never clips through tables/counter.
//   • kind="watcher" — stands in place and gently sways (used for the kids
//     watching the wall TV in the reference image).
export default function Customer({
  kind = 'loop',
  palette,
  speed = 0.3,
  offset = 0,
  radius = { rx: 4, rz: 2, cx: 0, cz: 4 },
  position = [0, 0, 0],
  facing = 0,
  height = 1.8,
}) {
  const root = useRef();
  const armL = useRef();
  const armR = useRef();
  const legL = useRef();
  const legR = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset;

    if (root.current) {
      if (kind === 'loop') {
        let x = Math.cos(t) * radius.rx + radius.cx;
        let z = Math.sin(t) * radius.rz + radius.cz;
        // Tangent gives the direction of motion → face that direction.
        const tx = -Math.sin(t) * radius.rx;
        const tz = Math.cos(t) * radius.rz;

        // === OBSTACLE PUSHBACK ===
        // Push the walker out of any prop circle it currently overlaps so it
        // physically can't clip through tables, the counter, or other props.
        // We iterate a couple of times so multi-obstacle pinch points still
        // resolve cleanly.
        for (let pass = 0; pass < 3; pass += 1) {
          let moved = false;
          for (let i = 0; i < walkObstacles.length; i += 1) {
            const o = walkObstacles[i];
            const dx = x - o.cx;
            const dz = z - o.cz;
            const minDist = o.r + WALKER_BODY_R;
            const distSq = dx * dx + dz * dz;
            if (distSq < minDist * minDist && distSq > 1e-6) {
              const dist = Math.sqrt(distSq);
              const push = (minDist - dist) / dist;
              x += dx * push;
              z += dz * push;
              moved = true;
            }
          }
          if (!moved) break;
        }

        root.current.position.set(x, Math.abs(Math.sin(t * 6)) * 0.05, z);
        root.current.rotation.y = Math.atan2(tx, tz);
      } else {
        // watcher — energetic CHEERING pose with a bouncing body, gentle
        // sway, and a tiny rotation jitter for an excited crowd vibe.
        const cheerT = clock.elapsedTime * 2.2 + offset;
        const bounce = Math.abs(Math.sin(cheerT * 1.05)) * 0.18;
        root.current.position.set(
          position[0] + Math.sin(clock.elapsedTime * 0.8 + offset) * 0.05,
          position[1] + bounce,
          position[2] + Math.cos(clock.elapsedTime * 0.6 + offset) * 0.03,
        );
        root.current.rotation.y = facing * (Math.PI / 2) + Math.sin(cheerT * 1.7) * 0.06;
      }
    }

    if (kind === 'watcher') {
      // Both arms raised high and pumping — "raise the roof" cheer.
      const cheerT = clock.elapsedTime * 2.2 + offset;
      const pump = Math.abs(Math.sin(cheerT)) * 0.55;
      const baseUp = -2.55;
      if (armL.current) armL.current.rotation.x = baseUp + pump * 0.7;
      if (armR.current) armR.current.rotation.x = baseUp + pump;
      // Slight outward fan on the arms so they don't pin straight up.
      if (armL.current) armL.current.rotation.z = -0.18;
      if (armR.current) armR.current.rotation.z = 0.18;
      if (legL.current) legL.current.rotation.x = 0;
      if (legR.current) legR.current.rotation.x = 0;
    } else {
      // Real walking gait: arm and OPPOSITE leg swing together.
      //   left arm  ↔ right leg
      //   right arm ↔ left  leg
      const swing = Math.sin(t * 6) * 0.7;
      if (armL.current) armL.current.rotation.x = swing;
      if (armR.current) armR.current.rotation.x = -swing;
      if (legL.current) legL.current.rotation.x = -swing * 0.6;
      if (legR.current) legR.current.rotation.x = swing * 0.6;
    }
  });

  // Slightly scale the whole character so children read as smaller.
  const scaleY = height / 1.8;

  return (
    <group ref={root} scale={[scaleY, scaleY, scaleY]}>
      {/* Body */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 1.1, 14]} />
        <meshStandardMaterial color={palette.body} roughness={0.85} />
      </mesh>
      {/* Body accent stripe (collar/scarf) */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.31, 0.31, 0.1, 14]} />
        <meshStandardMaterial color={palette.accent} roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.85, 0]} castShadow>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial color={palette.skin} roughness={0.85} />
      </mesh>
      {/* Hair shell on top/back of the head */}
      <mesh position={[0, 1.95, -0.04]} scale={[1.06, 0.85, 1.06]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color={palette.hair} roughness={1} />
      </mesh>
      {/* Eyes (front) */}
      <mesh position={[-0.09, 1.86, 0.25]}>
        <sphereGeometry args={[0.022, 8, 8]} />
        <meshBasicMaterial color="#0a0510" />
      </mesh>
      <mesh position={[0.09, 1.86, 0.25]}>
        <sphereGeometry args={[0.022, 8, 8]} />
        <meshBasicMaterial color="#0a0510" />
      </mesh>

      {/* Legs — pivot at top so rotation.x swings the leg forward/back */}
      <group position={[-0.13, 0.5, 0]}>
        <group ref={legL}>
          <mesh position={[0, -0.3, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
            <meshStandardMaterial color="#1a0e08" roughness={0.95} />
          </mesh>
        </group>
      </group>
      <group position={[0.13, 0.5, 0]}>
        <group ref={legR}>
          <mesh position={[0, -0.3, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
            <meshStandardMaterial color="#1a0e08" roughness={0.95} />
          </mesh>
        </group>
      </group>

      {/* Arms */}
      <group position={[-0.4, 1.45, 0]}>
        <group ref={armL}>
          <mesh position={[0, -0.3, 0]} castShadow>
            <capsuleGeometry args={[0.08, 0.5, 4, 8]} />
            <meshStandardMaterial color={palette.body} roughness={0.85} />
          </mesh>
        </group>
      </group>
      <group position={[0.4, 1.45, 0]}>
        <group ref={armR}>
          <mesh position={[0, -0.3, 0]} castShadow>
            <capsuleGeometry args={[0.08, 0.5, 4, 8]} />
            <meshStandardMaterial color={palette.body} roughness={0.85} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
