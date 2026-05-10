import React, { useEffect, useMemo, useState } from 'react';
import { Html, RoundedBox } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import { ROOM } from '../RoomShell.jsx';

// Big grand piano (Steinway-style, lid OPEN and propped up) tucked into the
// BACK-RIGHT corner of the cafe. Mounted on the piano body — between the
// keyboard and the open lid — is a flute stand holding the user-supplied
// silver concert flute photo upright (matching the reference image). Click
// the piano body or the flute for a small floating note about my musical
// history.

function GrandPiano({ onClick, hovered, setHovered }) {
  const pianoBlack = '#0a070a';
  const pianoSheen = '#1a1018';
  const lidUnderside = '#7a4a1a'; // warm wood interior visible when lid is open
  const ivory = '#fdf6ec';

  const NUM_WHITE = 18;
  const KEY_AREA_W = 3.0;
  const WHITE_KEY_W = KEY_AREA_W / NUM_WHITE;
  const BLACK_KEY_PATTERN = [1, 1, 0, 1, 1, 1, 0];

  // Open the lid by rotating it back from its hinged edge (z = -0.95 in piano
  // local coords). ~62° gives the iconic Steinway "propped-open" silhouette.
  const lidOpenAngle = -Math.PI / 2.9;

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={onClick}
    >
      {/* === LEGS (front + 2 back) === */}
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

      {/* === MAIN BODY === */}
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

      {/* === GRAND-PIANO TAIL CURVE === */}
      <mesh position={[1.3, 0.95, -0.1]} rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.85, 0.85, 0.5, 28, 1, false, -Math.PI / 2, Math.PI]} />
        <meshStandardMaterial color={pianoBlack} roughness={0.4} metalness={0.4} />
      </mesh>

      {/* === RIM (top frame around the open soundboard cavity) === a thin
          ring of polished wood that sits on top of the body so the open lid
          appears to be hinged onto a real grand-piano rim. */}
      <mesh position={[0, 1.205, -0.1]}>
        <boxGeometry args={[2.95, 0.04, 1.75]} />
        <meshStandardMaterial color={pianoBlack} roughness={0.3} metalness={0.6} />
      </mesh>

      {/* === SOUNDBOARD (visible interior wood, replaces the flat top now
          that the lid is open) === */}
      <mesh position={[0, 1.215, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.78, 1.55]} />
        <meshStandardMaterial color="#3a2410" roughness={0.85} metalness={0.05} />
      </mesh>
      {/* Cast-iron golden plate suggestion */}
      <mesh position={[-0.2, 1.219, -0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 0.9]} />
        <meshStandardMaterial color="#a87d2a" roughness={0.55} metalness={0.7} />
      </mesh>

      {/* === LID (open, hinged on the back edge z=-0.95) ===
          The lid group is anchored at the hinge, so rotation.x lifts it up
          while the front edge (closer to the keyboard) rises into the air. */}
      <group position={[0, 1.24, -0.95]} rotation={[lidOpenAngle, 0, 0]}>
        {/* Outer (top) lid surface — glossy black */}
        <RoundedBox
          args={[2.95, 0.08, 1.75]}
          radius={0.09}
          smoothness={4}
          position={[0, 0.04, 0.875]}
          castShadow
        >
          <meshStandardMaterial color={pianoSheen} roughness={0.22} metalness={0.6} />
        </RoundedBox>
        {/* Lid curve teardrop (matches body tail) */}
        <mesh position={[1.3, 0.04, 0.875]} castShadow>
          <cylinderGeometry args={[0.88, 0.88, 0.08, 28, 1, false, -Math.PI / 2, Math.PI]} />
          <meshStandardMaterial color={pianoSheen} roughness={0.22} metalness={0.6} />
        </mesh>
        {/* Underside glow (warm wood you see when the lid is up) */}
        <mesh position={[0, -0.005, 0.875]} rotation={[Math.PI, 0, 0]}>
          <planeGeometry args={[2.78, 1.55]} />
          <meshStandardMaterial color={lidUnderside} roughness={0.85} side={THREE.DoubleSide} />
        </mesh>
        {/* Highlight stripe along the polished outer edge */}
        <mesh position={[-0.4, 0.085, 1.5]} rotation={[0, 0.06, 0]}>
          <planeGeometry args={[1.5, 0.04]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.45} />
        </mesh>
      </group>

      {/* === KEYBOARD === */}
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

      {/* === FALLBOARD with Steinway-style logo === in front of the soundboard,
          right behind the keys, where the player would read sheet music. */}
      <mesh position={[0, 1.0, 0.7]} rotation={[Math.PI / 18, 0, 0]}>
        <boxGeometry args={[2.9, 0.34, 0.04]} />
        <meshStandardMaterial color={pianoBlack} roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Tiny brand plaque */}
      <mesh position={[0, 1.0, 0.722]} rotation={[Math.PI / 18, 0, 0]}>
        <planeGeometry args={[0.7, 0.06]} />
        <meshBasicMaterial color="#cfa46a" />
      </mesh>

      {/* === BRASS PEDAL CLUSTER === */}
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

/**
 * The user supplied a silver concert flute photo (white background, flute
 * oriented horizontally). We render the silhouette UPRIGHT on a small black
 * flute stand sitting on the piano body — exactly like the reference image.
 *
 * Steps:
 *   1. Custom shader discards near-white pixels (so the silver flute reads
 *      cleanly against the dark piano interior).
 *   2. The plane is rotated 90° around Z so the image's wide axis becomes the
 *      vertical axis → flute now stands tall.
 *   3. A small base + thin pole + cradle pegs supports the flute visually.
 */
function FluteOnStand({ onClick, hovered, setHovered }) {
  const tex = useLoader(THREE.TextureLoader, '/assets/flute.png');

  useEffect(() => {
    if (!tex) return;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
  }, [tex]);

  // Source image is wide (flute drawn horizontally). We keep the natural
  // aspect on the plane and rotate the plane 90° around Z to make the flute
  // appear vertical without squishing pixels.
  const { planeW, planeH } = useMemo(() => {
    if (!tex || !tex.image) return { planeW: 1.6, planeH: 0.4 };
    const aspect = tex.image.width / tex.image.height;
    // Visible HEIGHT of the upright flute (after Z-rotation) = planeW.
    const visibleHeight = 1.45;
    return { planeW: visibleHeight, planeH: visibleHeight / aspect };
  }, [tex]);

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        map: { value: tex },
        uHover: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        uniform float uHover;
        varying vec2 vUv;
        void main() {
          vec4 t = texture2D(map, vUv);
          float lum = (t.r + t.g + t.b) / 3.0;
          // Soft cutoff: pixels brighter than 0.93 fully transparent.
          float a = 1.0 - smoothstep(0.83, 0.93, lum);
          if (a < 0.02) discard;
          // Boost silver/cool tones; subtle warm tint when hovered.
          vec3 rgb = mix(t.rgb, t.rgb * vec3(1.05, 0.95, 1.15), uHover);
          gl_FragColor = vec4(rgb, a);
        }
      `,
      transparent: true,
      depthWrite: false,
    }),
    [tex],
  );

  // Stand geometry constants
  const POLE_HEIGHT = 0.55;
  const BASE_RADIUS = 0.18;
  const CRADLE_Y = 0.04 + POLE_HEIGHT; // top of the pole

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={onClick}
    >
      {/* === STAND BASE — small disc with three subtle feet === */}
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[BASE_RADIUS, BASE_RADIUS * 1.15, 0.04, 24]} />
        <meshStandardMaterial color="#0a070a" metalness={0.6} roughness={0.35} />
      </mesh>
      {[0, 2.094, 4.188].map((angle, i) => (
        <mesh
          key={`foot-${i}`}
          position={[Math.cos(angle) * BASE_RADIUS * 0.95, 0.015, Math.sin(angle) * BASE_RADIUS * 0.95]}
        >
          <cylinderGeometry args={[0.025, 0.03, 0.03, 8]} />
          <meshStandardMaterial color="#0a070a" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}

      {/* === STAND POLE === */}
      <mesh position={[0, 0.04 + POLE_HEIGHT / 2, 0]} castShadow>
        <cylinderGeometry args={[0.013, 0.013, POLE_HEIGHT, 12]} />
        <meshStandardMaterial color="#101010" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* === CRADLE PEGS at the top of the pole === two short angled pegs that
          hold the body of the flute, plus a small backing block. */}
      <group position={[0, CRADLE_Y, 0]}>
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.12, 0.04, 0.05]} />
          <meshStandardMaterial color="#0a070a" metalness={0.6} roughness={0.35} />
        </mesh>
        {/* angled rubber-tipped pegs, cradling the flute */}
        <mesh position={[-0.07, 0.06, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.012, 0.012, 0.13, 8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.6} />
        </mesh>
        <mesh position={[0.07, 0.06, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.012, 0.012, 0.13, 8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.6} />
        </mesh>
      </group>

      {/* === FLUTE PHOTO === rotated 90° around Z so the wide image becomes a
          tall silhouette. Sits centered on the cradle and rises along Y. */}
      <group
        position={[0, CRADLE_Y + planeW / 2 - 0.05, 0.012]}
        rotation={[0, 0, Math.PI / 2]}
      >
        {/* Hit volume (wider than the visible silhouette so it's easy to click) */}
        <mesh position={[0, 0, -0.002]}>
          <planeGeometry args={[planeW * 1.05, planeH * 2.4]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        {/* Flute texture */}
        <mesh>
          <planeGeometry args={[planeW, planeH]} />
          <shaderMaterial
            attach="material"
            args={[shaderArgs]}
            uniforms-uHover-value={hovered ? 1 : 0}
            transparent
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

// Piano + flute in the BACK-RIGHT corner. Click anywhere on the piano body
// to show the piano blurb; click the flute for the flute blurb.
export default function MusicCorner({
  position = [ROOM.rightWallX - 3.5, 0, ROOM.backWallZ + 3.5],
}) {
  const [pianoTip, setPianoTip] = useState(false);
  const [fluteTip, setFluteTip] = useState(false);
  const [pianoHover, setPianoHover] = useState(false);
  const [fluteHover, setFluteHover] = useState(false);

  useEffect(() => {
    if (!pianoTip) return;
    const t = setTimeout(() => setPianoTip(false), 3500);
    return () => clearTimeout(t);
  }, [pianoTip]);
  useEffect(() => {
    if (!fluteTip) return;
    const t = setTimeout(() => setFluteTip(false), 4500);
    return () => clearTimeout(t);
  }, [fluteTip]);

  return (
    <group position={position} rotation={[0, -Math.PI / 4, 0]}>
      <GrandPiano
        hovered={pianoHover}
        setHovered={setPianoHover}
        onClick={(e) => {
          e.stopPropagation();
          setPianoTip(true);
          setFluteTip(false);
        }}
      />

      {/* Flute on its stand — sits on the soundboard between the keys and the
          open lid (around z = 0.0 in piano-local coords, slightly off-center
          on the bass side just like the reference image). The stand's base
          rests on the rim at y = 1.225. */}
      <group position={[0.05, 1.225, 0.0]}>
        <FluteOnStand
          hovered={fluteHover}
          setHovered={setFluteHover}
          onClick={(e) => {
            e.stopPropagation();
            setFluteTip(true);
            setPianoTip(false);
          }}
        />
      </group>

      {/* Tooltip: piano blurb */}
      {pianoTip && (
        <Html position={[0, 2.4, 0.4]} center distanceFactor={9}>
          <div className="pointer-events-none max-w-[240px] rounded-2xl border border-cafe-neon-purple/50 bg-[#100a1a]/92 px-3 py-2 text-xs text-cafe-neon-glow shadow-glow-purple backdrop-blur-md">
            I've been playing the piano since the 3rd grade!
          </div>
        </Html>
      )}
      {/* Tooltip: flute blurb */}
      {fluteTip && (
        <Html position={[0.7, 2.4, 0.2]} center distanceFactor={9}>
          <div className="pointer-events-none max-w-[260px] rounded-2xl border border-cafe-neon-purple/50 bg-[#100a1a]/92 px-3 py-2 text-xs text-cafe-neon-glow shadow-glow-purple backdrop-blur-md">
            I've played the flute for over 7 years! Check out the glass display case to see my awards.
          </div>
        </Html>
      )}
    </group>
  );
}
