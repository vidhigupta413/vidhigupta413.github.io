import React from 'react';
import { Text, RoundedBox } from '@react-three/drei';

import InteractiveZone from '../InteractiveZone.jsx';
import { aboutMe } from '../../../data/portfolio.js';

// U-shaped counter, FLIPPED so the customer-facing main bar is closest to the
// camera and the wings extend back toward the rear wall:
//   • Main bar at the FRONT (closest to user) with the laptop + nameplate on
//     the customer-facing side.
//   • LEFT wing extends BACK (-Z) — espresso machine, grinder, cup stack live here.
//   • RIGHT wing extends BACK (-Z) — milk cartons, syrups, and bar tools live here.
// Baristas (rendered in CharactersGroup) stand inside the U opening, between
// the wings, in -Z space behind the main bar.
//
// Interactive zones inside the counter:
//   • The open laptop → Projects.
//   • The bar nameplate → About.
export default function BaristaCounter() {
  // Geometry constants kept here so wings + props share the same numbers.
  const MAIN_W = 7.6;
  const MAIN_H = 1.7;
  const MAIN_D = 1.6;
  const WING_W = 1.5;
  const WING_H = MAIN_H;
  const WING_D = 2.6;

  // Wings live BEHIND the main bar (at -Z). Main bar front at z = +MAIN_D/2,
  // back at z = -MAIN_D/2. Wing centers at z = -(MAIN_D/2 + WING_D/2) = -2.1.
  const WING_Z = -(MAIN_D / 2 + WING_D / 2);
  const WING_X = MAIN_W / 2 - WING_W / 2;
  const COUNTER_TOP_Y = MAIN_H + 0.06;

  return (
    <group position={[0, 0.2, 0.34]}>
      <group scale={[1.18, 1.05, 1.25]}>
        <group position={[0, 0, 0.0]}>
          {/* === MAIN BAR (back) === */}
          <RoundedBox
            args={[MAIN_W, MAIN_H, MAIN_D]}
            radius={0.22}
            smoothness={4}
            position={[0, MAIN_H / 2, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#5b3a26" roughness={0.85} />
          </RoundedBox>
          <mesh position={[0, COUNTER_TOP_Y - 0.02, 0]} castShadow>
            <boxGeometry args={[MAIN_W + 0.1, 0.12, MAIN_D + 0.1]} />
            <meshStandardMaterial color="#2a160b" roughness={0.45} metalness={0.18} />
          </mesh>
          <mesh position={[0, COUNTER_TOP_Y + 0.04, 0]}>
            <boxGeometry args={[MAIN_W + 0.06, 0.005, MAIN_D + 0.06]} />
            <meshStandardMaterial color="#7b4f2c" roughness={0.4} metalness={0.2} />
          </mesh>
          {/* Lower lip detail */}
          <mesh position={[0, 0.15, MAIN_D / 2 + 0.01]}>
            <boxGeometry args={[MAIN_W - 0.1, 0.08, 0.04]} />
            <meshStandardMaterial color="#3a2418" />
          </mesh>
          {/* Warm amber band wrapping the front lip */}
          <mesh position={[0, 0.32, MAIN_D / 2 + 0.015]}>
            <boxGeometry args={[MAIN_W - 0.1, 0.04, 0.02]} />
            <meshStandardMaterial color="#ffb56a" emissive="#ff8a3c" emissiveIntensity={1.4} toneMapped={false} />
          </mesh>

          {/* === LEFT WING (extends forward) === */}
          <RoundedBox
            args={[WING_W, WING_H, WING_D]}
            radius={0.18}
            smoothness={3}
            position={[-WING_X, WING_H / 2, WING_Z]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#5b3a26" roughness={0.85} />
          </RoundedBox>
          <mesh position={[-WING_X, COUNTER_TOP_Y - 0.02, WING_Z]} castShadow>
            <boxGeometry args={[WING_W + 0.1, 0.12, WING_D + 0.1]} />
            <meshStandardMaterial color="#2a160b" roughness={0.45} metalness={0.18} />
          </mesh>

          {/* === RIGHT WING (extends forward) === */}
          <RoundedBox
            args={[WING_W, WING_H, WING_D]}
            radius={0.18}
            smoothness={3}
            position={[WING_X, WING_H / 2, WING_Z]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#5b3a26" roughness={0.85} />
          </RoundedBox>
          <mesh position={[WING_X, COUNTER_TOP_Y - 0.02, WING_Z]} castShadow>
            <boxGeometry args={[WING_W + 0.1, 0.12, WING_D + 0.1]} />
            <meshStandardMaterial color="#2a160b" roughness={0.45} metalness={0.18} />
          </mesh>

          {/* Engraved cafe nameplate on main bar (clickable → About) */}
          <InteractiveZone id="about" position={[0, 0.85, MAIN_D / 2 + 0.025]} hoverScale={1.03}>
            {({ hovered }) => (
              <group>
                <RoundedBox args={[3.4, 0.9, 0.04]} radius={0.05} smoothness={3}>
                  <meshStandardMaterial
                    color="#3a2418"
                    emissive={hovered ? '#a4632a' : '#3a1f0f'}
                    emissiveIntensity={hovered ? 0.7 : 0.25}
                    toneMapped={false}
                  />
                </RoundedBox>
                <Text position={[0, 0.18, 0.04]} fontSize={0.32} color="#ffd6a5" anchorX="center" anchorY="middle">
                  {aboutMe.handle}
                </Text>
                <Text
                  position={[0, -0.18, 0.04]}
                  fontSize={0.13}
                  color="#ffb56a"
                  anchorX="center"
                  anchorY="middle"
                  letterSpacing={0.08}
                >
                  {aboutMe.tagline}
                </Text>
              </group>
            )}
          </InteractiveZone>

          {/* === LAPTOP — Projects zone === Sits in the middle of the main bar */}
          <InteractiveZone id="projects" position={[0, COUNTER_TOP_Y + 0.06, -0.05]}>
            {({ hovered }) => (
              <group>
                <RoundedBox args={[1.7, 0.06, 1.1]} radius={0.04} smoothness={3} castShadow>
                  <meshStandardMaterial color="#1a1024" roughness={0.45} metalness={0.5} />
                </RoundedBox>
                <group position={[0, 0.55, -0.5]} rotation={[-Math.PI / 9, 0, 0]}>
                  <RoundedBox args={[1.7, 1.1, 0.06]} radius={0.04} smoothness={3} castShadow>
                    <meshStandardMaterial color="#0e0818" roughness={0.4} metalness={0.5} />
                  </RoundedBox>
                  <mesh position={[0, 0, 0.04]}>
                    <planeGeometry args={[1.55, 0.95]} />
                    <meshStandardMaterial
                      color="#1d1330"
                      emissive={hovered ? '#c79bff' : '#7d4dd6'}
                      emissiveIntensity={hovered ? 1.4 : 0.9}
                      toneMapped={false}
                    />
                  </mesh>
                  <Text
                    position={[0, 0.02, 0.045]}
                    fontSize={0.085}
                    color="#f6d8ff"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={1.4}
                  >
                    {`</>  view projects`}
                  </Text>
                </group>
                {hovered && (
                  <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[1.0, 1.2, 32]} />
                    <meshBasicMaterial color="#ffb56a" transparent opacity={0.45} />
                  </mesh>
                )}
              </group>
            )}
          </InteractiveZone>

          {/* Coffee mug next to the laptop */}
          <group position={[1.0, COUNTER_TOP_Y + 0.13, 0.4]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.13, 0.11, 0.18, 16]} />
              <meshStandardMaterial color="#fff5e9" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.115, 0.115, 0.02, 16]} />
              <meshStandardMaterial color="#3a1f10" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0.32, 0]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial
                color="#fff5e9"
                transparent
                opacity={0.35}
                emissive="#fff5e9"
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>

          {/* Tip jar on the main bar (front-right corner) */}
          <group position={[-MAIN_W / 2 + 0.6, COUNTER_TOP_Y + 0.18, 0.5]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.16, 0.16, 0.3, 16]} />
              <meshStandardMaterial color="#f6e3c5" transparent opacity={0.4} />
            </mesh>
            <mesh>
              <cylinderGeometry args={[0.13, 0.13, 0.18, 14]} />
              <meshStandardMaterial color="#a4632a" />
            </mesh>
            <Text position={[0, 0.22, 0]} fontSize={0.06} color="#ffd6a5" anchorX="center" anchorY="middle">
              tips ♡
            </Text>
          </group>

          {/* === LEFT WING TOP — espresso machine + grinder + cup stack === */}
          <group position={[-WING_X, COUNTER_TOP_Y + 0.04, WING_Z]}>
            {/* Espresso machine */}
            <group position={[0, 0.4, 0.35]}>
              <RoundedBox args={[1.1, 0.8, 0.85]} radius={0.06} smoothness={3} castShadow>
                <meshStandardMaterial color="#2a1820" roughness={0.45} metalness={0.55} />
              </RoundedBox>
              <mesh position={[0, 0.45, 0]}>
                <boxGeometry args={[1.05, 0.04, 0.82]} />
                <meshStandardMaterial color="#cfa46a" roughness={0.3} metalness={0.85} />
              </mesh>
              {[-0.22, 0.22].map((x) => (
                <group key={x} position={[x, -0.05, 0.45]}>
                  <mesh>
                    <cylinderGeometry args={[0.09, 0.1, 0.25, 14]} />
                    <meshStandardMaterial color="#cfa46a" roughness={0.3} metalness={0.8} />
                  </mesh>
                  <mesh position={[0, -0.18, 0]}>
                    <cylinderGeometry args={[0.04, 0.05, 0.1, 12]} />
                    <meshStandardMaterial color="#3a2418" />
                  </mesh>
                </group>
              ))}
              <mesh position={[0, 0.0, 0.43]}>
                <circleGeometry args={[0.1, 24]} />
                <meshStandardMaterial color="#fff5e9" emissive="#ffb469" emissiveIntensity={0.6} toneMapped={false} />
              </mesh>
              <mesh position={[0, 0.18, 0.43]}>
                <planeGeometry args={[0.5, 0.1]} />
                <meshStandardMaterial color="#1a0e22" emissive="#b475ff" emissiveIntensity={0.8} toneMapped={false} />
              </mesh>
            </group>
            {/* Grinder — placed in front of the espresso machine */}
            <group position={[0, 0.3, -0.4]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.18, 0.22, 0.5, 18]} />
                <meshStandardMaterial color="#1f120b" roughness={0.5} metalness={0.4} />
              </mesh>
              <mesh position={[0, 0.32, 0]} castShadow>
                <cylinderGeometry args={[0.13, 0.15, 0.22, 14]} />
                <meshStandardMaterial color="#3a2418" />
              </mesh>
              <mesh position={[0, -0.25, 0.18]}>
                <boxGeometry args={[0.16, 0.12, 0.07]} />
                <meshStandardMaterial color="#ffb56a" emissive="#ff8a3c" emissiveIntensity={0.8} toneMapped={false} />
              </mesh>
            </group>
            {/* Cup stack on top of espresso machine */}
            {[-0.36, -0.1, 0.18, 0.4].map((x, i) => (
              <group key={i} position={[x, 0.92, 0.3]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.09, 0.075, 0.12, 14]} />
                  <meshStandardMaterial color="#fff5e9" roughness={0.6} />
                </mesh>
                <mesh position={[0, 0.075, 0]}>
                  <cylinderGeometry args={[0.085, 0.085, 0.01, 14]} />
                  <meshStandardMaterial color="#7b3f1c" roughness={0.6} />
                </mesh>
              </group>
            ))}
          </group>

          {/* === RIGHT WING TOP — milk + syrup bottles + tools === */}
          <group position={[WING_X, COUNTER_TOP_Y + 0.04, WING_Z]}>
            {/* Milk cartons (back of wing) */}
            <group position={[0, 0.18, -0.7]}>
              {[-0.18, 0.0, 0.18].map((x, i) => (
                <mesh key={i} castShadow position={[x, 0, 0]}>
                  <boxGeometry args={[0.16, 0.34, 0.16]} />
                  <meshStandardMaterial
                    color={['#f6f6f6', '#e8ecf5', '#f9efe1'][i]}
                    roughness={0.78}
                  />
                </mesh>
              ))}
              {/* Spouts */}
              {[-0.18, 0.0, 0.18].map((x, i) => (
                <mesh key={`spout-${i}`} position={[x, 0.21, 0]}>
                  <coneGeometry args={[0.07, 0.08, 4]} />
                  <meshStandardMaterial color={['#f6f6f6', '#e8ecf5', '#f9efe1'][i]} />
                </mesh>
              ))}
            </group>

            {/* Syrup bottles (mid wing) — out of laptop's path now */}
            <group position={[0, 0.16, 0.0]}>
              {[
                ['#8b1538', -0.32],
                ['#1a5c2e', -0.08],
                ['#5c3d1a', 0.16],
                ['#4a2a6b', 0.4],
              ].map(([color, x], i) => (
                <group key={i} position={[x, 0, 0]}>
                  <mesh castShadow position={[0, 0.1, 0]}>
                    <cylinderGeometry args={[0.05, 0.06, 0.2, 14]} />
                    <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
                  </mesh>
                  <mesh position={[0, 0.22, 0]}>
                    <cylinderGeometry args={[0.035, 0.04, 0.06, 12]} />
                    <meshStandardMaterial color="#1a0e08" roughness={0.5} />
                  </mesh>
                </group>
              ))}
            </group>

            {/* Espresso bar tools (front of wing) */}
            <group position={[0, 0.06, 0.7]}>
              <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.06, 0.06, 0.14, 20]} />
                <meshStandardMaterial color="#2a1820" roughness={0.35} metalness={0.65} />
              </mesh>
              <mesh castShadow position={[0.22, 0.02, 0]}>
                <cylinderGeometry args={[0.08, 0.1, 0.06, 16]} />
                <meshStandardMaterial color="#cfa46a" roughness={0.25} metalness={0.8} />
              </mesh>
              <mesh castShadow position={[-0.22, 0.01, 0.06]} rotation={[0, 0.4, 0.15]}>
                <boxGeometry args={[0.24, 0.07, 0.13]} />
                <meshStandardMaterial color="#3a2418" roughness={0.85} />
              </mesh>
              {/* Knock box (tube) */}
              <mesh castShadow position={[0, 0.02, -0.18]}>
                <cylinderGeometry args={[0.07, 0.07, 0.12, 14]} />
                <meshStandardMaterial color="#1a0e08" roughness={0.7} />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
