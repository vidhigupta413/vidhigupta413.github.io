import React, { useRef } from 'react';
import { Text, RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import InteractiveZone from '../InteractiveZone.jsx';
import { awards, certifications } from '../../../data/portfolio.js';

// Tall glass display case standing next to the coffee counter (opposite the
// chalkboard menu). Two sections inside:
//   • TOP    — floating trophies for each entry in `awards`.
//   • BOTTOM — parchment certificate "scrolls" laid out across the lower
//     shelves, one per entry in `certifications`. Clicking the case opens
//     the Leadership panel where the full list (with credential IDs) lives.

function Trophy({ y, accent, x = 0 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime + (x + y) * 1.2;
    ref.current.position.y = y + Math.sin(t * 1.3) * 0.04;
    ref.current.rotation.y = t * 0.6;
  });
  return (
    <group ref={ref} position={[x, y, 0]}>
      <mesh>
        <cylinderGeometry args={[0.16, 0.1, 0.28, 16]} />
        <meshStandardMaterial color="#ffd591" emissive={accent} emissiveIntensity={0.5} metalness={0.7} roughness={0.3} toneMapped={false} />
      </mesh>
      <mesh position={[-0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.06, 0.022, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#ffd591" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.18, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[0.06, 0.022, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#ffd591" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.14, 12]} />
        <meshStandardMaterial color="#ffd591" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.08, 16]} />
        <meshStandardMaterial color="#3a2418" roughness={0.85} />
      </mesh>
    </group>
  );
}

// Certificate icon — a parchment-style rolled certificate with a wax seal,
// resting flat on its shelf. Slowly rocks back and forth. The label below
// the seal (issuer/year) makes each cert easily identifiable from the
// camera distance.
function CertificateIcon({ x, label, sub }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime + x * 0.7;
    ref.current.rotation.y = Math.sin(t * 0.6) * 0.18;
    ref.current.position.y = 0.04 + Math.sin(t * 1.2) * 0.012;
  });
  return (
    <group ref={ref} position={[x, 0.04, 0]}>
      {/* Parchment body — rounded box for a "rolled certificate" look */}
      <RoundedBox args={[0.5, 0.02, 0.38]} radius={0.02} smoothness={3} castShadow>
        <meshStandardMaterial color="#fbf2da" roughness={0.85} />
      </RoundedBox>
      {/* Faint ruled "text" lines on the parchment */}
      {[-0.06, -0.02, 0.02, 0.06].map((dz) => (
        <mesh key={dz} position={[0, 0.012, dz]}>
          <planeGeometry args={[0.36, 0.005]} />
          <meshBasicMaterial color="#7b5a2c" transparent opacity={0.55} />
        </mesh>
      ))}
      {/* Seal (wax circle) */}
      <mesh position={[-0.16, 0.014, 0.11]}>
        <cylinderGeometry args={[0.035, 0.035, 0.012, 16]} />
        <meshStandardMaterial color="#a01a3c" emissive="#a01a3c" emissiveIntensity={0.4} toneMapped={false} />
      </mesh>
      {/* Seal ribbon */}
      <mesh position={[-0.14, 0.013, 0.155]} rotation={[0, 0.5, 0]}>
        <planeGeometry args={[0.035, 0.1]} />
        <meshBasicMaterial color="#a01a3c" />
      </mesh>
      {/* Title ribbon across the top */}
      <mesh position={[0, 0.013, -0.12]}>
        <planeGeometry args={[0.38, 0.06]} />
        <meshBasicMaterial color="#5b3a26" />
      </mesh>
      <Text
        position={[0, 0.018, -0.12]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.045}
        color="#ffd591"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.36}
      >
        {label}
      </Text>
      {sub ? (
        <Text
          position={[0, 0.018, 0.0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.032}
          color="#5b3a26"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.34}
        >
          {sub}
        </Text>
      ) : null}
    </group>
  );
}

export default function AwardsCase({ position = [6.8, 0, 3.4], rotation = -0.25 }) {
  // Case dimensions
  const W = 2.4;
  const TOTAL_H = 3.3;
  const D = 1.4;
  const PLINTH_H = 0.7;
  const CASE_BOTTOM_Y = PLINTH_H;            // 0.7
  const CASE_TOP_Y = PLINTH_H + TOTAL_H;     // 4.0
  const CASE_MID_Y = CASE_BOTTOM_Y + TOTAL_H / 2; // 2.35

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Wood plinth */}
      <mesh position={[0, PLINTH_H / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[W, PLINTH_H, D]} />
        <meshStandardMaterial color="#3a2418" roughness={0.9} />
      </mesh>
      <mesh position={[0, PLINTH_H + 0.02, 0]}>
        <boxGeometry args={[W - 0.1, 0.04, D - 0.1]} />
        <meshStandardMaterial color="#7b4f2c" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Engraved nameplate on the front of the plinth */}
      <RoundedBox args={[1.6, 0.34, 0.04]} radius={0.04} smoothness={3} position={[0, 0.4, D / 2 + 0.005]}>
        <meshStandardMaterial color="#5b3a26" roughness={0.7} metalness={0.4} />
      </RoundedBox>
      <Text
        position={[0, 0.4, D / 2 + 0.035]}
        fontSize={0.12}
        color="#ffd6a5"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.16}
      >
        AWARDS & CERTS
      </Text>

      {/* Glass case — shared click target */}
      <InteractiveZone id="leadership" position={[0, 0, 0]} hoverScale={1.02}>
        {({ hovered }) => (
          <group>
            {/* Six glass panes for the vitrine silhouette */}
            <mesh position={[0, CASE_MID_Y, D / 2]}>
              <planeGeometry args={[W, TOTAL_H]} />
              <meshStandardMaterial color="#d6b4ff" transparent opacity={hovered ? 0.22 : 0.14} roughness={0.05} metalness={0.1} />
            </mesh>
            <mesh position={[0, CASE_MID_Y, -D / 2]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[W, TOTAL_H]} />
              <meshStandardMaterial color="#d6b4ff" transparent opacity={hovered ? 0.22 : 0.14} roughness={0.05} metalness={0.1} />
            </mesh>
            {[-W / 2, W / 2].map((x) => (
              <mesh key={x} position={[x, CASE_MID_Y, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[D, TOTAL_H]} />
                <meshStandardMaterial color="#d6b4ff" transparent opacity={hovered ? 0.22 : 0.14} roughness={0.05} metalness={0.1} />
              </mesh>
            ))}
            <mesh position={[0, CASE_TOP_Y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <planeGeometry args={[W, D]} />
              <meshStandardMaterial color="#d6b4ff" transparent opacity={hovered ? 0.32 : 0.2} roughness={0.05} metalness={0.1} />
            </mesh>

            {/* Frame edges — vertical struts */}
            {[
              [-W / 2, -D / 2],
              [W / 2, -D / 2],
              [-W / 2, D / 2],
              [W / 2, D / 2],
            ].map(([x, z], i) => (
              <mesh key={i} position={[x, CASE_MID_Y, z]}>
                <boxGeometry args={[0.04, TOTAL_H, 0.04]} />
                <meshStandardMaterial color="#ffb56a" emissive="#ff8a3c" emissiveIntensity={0.6} toneMapped={false} />
              </mesh>
            ))}

            {/* Mid divider shelf — splits Awards (above) from Certifications (below) */}
            <mesh position={[0, CASE_MID_Y, 0]}>
              <boxGeometry args={[W - 0.06, 0.04, D - 0.06]} />
              <meshStandardMaterial color="#5b3a26" roughness={0.85} />
            </mesh>

            {/* === TOP HALF — Awards (trophies) === */}
            <Text
              position={[0, CASE_TOP_Y - 0.18, D / 2 + 0.02]}
              fontSize={0.1}
              color="#ffb56a"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.18}
            >
              ── AWARDS ──
            </Text>
            {awards.map((a, i) => {
              // Two awards → wider spacing so each trophy + label has room.
              const stride = awards.length <= 2 ? 0.85 : 0.55;
              const x = (i - (awards.length - 1) / 2) * stride;
              return (
                <group key={a.title} position={[0, 0, 0]}>
                  <Trophy x={x} y={CASE_MID_Y + 0.7} accent={a.accent} />
                  <Text
                    position={[x, CASE_MID_Y + 0.3, 0]}
                    fontSize={0.07}
                    color="#fff7ec"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={0.78}
                    textAlign="center"
                  >
                    {a.title}
                  </Text>
                  <Text
                    position={[x, CASE_MID_Y + 0.16, 0]}
                    fontSize={0.05}
                    color="#ffb56a"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={0.78}
                    textAlign="center"
                  >
                    {a.org}
                  </Text>
                  <Text
                    position={[x, CASE_MID_Y + 0.08, 0]}
                    fontSize={0.05}
                    color="#ffd591"
                    anchorX="center"
                    anchorY="middle"
                  >
                    {a.year}
                  </Text>
                </group>
              );
            })}

            {/* === BOTTOM HALF — Certifications ===
                7 certs across 2 staggered rows: 4 in the front row, 3 in
                the back row. Both rows sit on the same lower shelf with a
                small extra plinth between them so the back row reads as a
                separate "step" through the glass. */}
            <Text
              position={[0, CASE_MID_Y - 0.12, D / 2 + 0.02]}
              fontSize={0.1}
              color="#a4c46a"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.18}
            >
              ── CERTIFICATIONS ──
            </Text>
            {(() => {
              const front = certifications.slice(0, 4);
              const back = certifications.slice(4);
              const stride = 0.55;
              return (
                <>
                  {/* Step shelf for the back row */}
                  <mesh position={[0, CASE_BOTTOM_Y + 0.32, -0.3]}>
                    <boxGeometry args={[W - 0.18, 0.04, 0.55]} />
                    <meshStandardMaterial color="#5b3a26" roughness={0.85} />
                  </mesh>
                  {/* FRONT ROW (4 certs) */}
                  <group position={[0, CASE_BOTTOM_Y + 0.22, 0.28]}>
                    {front.map((c, i) => {
                      const x = (i - (front.length - 1) / 2) * stride;
                      return (
                        <CertificateIcon
                          key={c.title}
                          x={x}
                          label={c.short || c.title}
                          sub={c.issued}
                        />
                      );
                    })}
                  </group>
                  {/* BACK ROW (3 certs) */}
                  <group position={[0, CASE_BOTTOM_Y + 0.36, -0.3]}>
                    {back.map((c, i) => {
                      const x = (i - (back.length - 1) / 2) * stride;
                      return (
                        <CertificateIcon
                          key={c.title}
                          x={x}
                          label={c.short || c.title}
                          sub={c.issued}
                        />
                      );
                    })}
                  </group>
                </>
              );
            })()}

            {/* Subtle interior glow */}
            <pointLight position={[0, CASE_MID_Y, 0]} intensity={0.7} distance={3.6} color="#ffd591" />
          </group>
        )}
      </InteractiveZone>
    </group>
  );
}
