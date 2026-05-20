import React, { useMemo, useRef } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import InteractiveZone from '../InteractiveZone.jsx';
import { skills } from '../../../data/portfolio.js';
import { ROOM } from '../RoomShell.jsx';

// Tall wooden bookshelf in the BACK-LEFT corner, against the left wall.
// Four shelves PACKED with 3D books for the Skills zone, plus the rotating AI
// Research orb on the top shelf's right side.

// A single 3D book — outer cover slab, inset cream "page" block, an embossed
// spine plate with the title, and two thin spine bands.
function Book({ x, y, z, width, height, depth, color, label, tilt = 0 }) {
  const halfH = height / 2;
  const halfD = depth / 2;
  return (
    <group position={[x, y, z]} rotation={[0, 0, tilt]}>
      <mesh castShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.78} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width * 0.94, height - 0.05, depth - 0.05]} />
        <meshStandardMaterial color="#f3dfbe" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0, halfD + 0.0005]}>
        <planeGeometry args={[width * 0.96, height - 0.05]} />
        <meshStandardMaterial color={color} roughness={0.55} metalness={0.08} />
      </mesh>
      <mesh position={[0, halfH - 0.045, halfD + 0.001]}>
        <planeGeometry args={[width * 0.96, 0.025]} />
        <meshStandardMaterial color="#1a0e08" roughness={1} />
      </mesh>
      <mesh position={[0, -halfH + 0.045, halfD + 0.001]}>
        <planeGeometry args={[width * 0.96, 0.025]} />
        <meshStandardMaterial color="#1a0e08" roughness={1} />
      </mesh>
      <Text
        position={[0, 0, halfD + 0.002]}
        rotation={[0, 0, -Math.PI / 2]}
        fontSize={0.05}
        color="#fff7ec"
        anchorX="center"
        anchorY="middle"
        maxWidth={height - 0.15}
      >
        {label.length > 12 ? `${label.slice(0, 11)}…` : label}
      </Text>
    </group>
  );
}

// A pair of horizontally-stacked books — adds variety and fills wider gaps.
function StackedBooks({ x, y, z, width, color1, color2 }) {
  return (
    <group position={[x, y, z]}>
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[width, 0.1, 0.32]} />
        <meshStandardMaterial color={color1} roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 0.11, 0]}>
        <boxGeometry args={[width * 0.92, 0.1, 0.3]} />
        <meshStandardMaterial color={color2} roughness={0.8} />
      </mesh>
    </group>
  );
}

// Floating, rotating wireframe orb. Used to mark the Research zone — sits
// up on the crown moulding of the bookshelf so it's visible from across the
// cafe.
function AIShelfOrb({ radius = 0.34 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.position.y = 0.4 + Math.sin(t * 1.4) * 0.06;
    ref.current.rotation.y = t * 0.45;
  });
  return (
    <group ref={ref} position={[0, 0.4, 0]}>
      <mesh>
        <sphereGeometry args={[radius, 28, 28]} />
        <meshStandardMaterial
          color="#1a0e22"
          emissive="#7b4dd6"
          emissiveIntensity={0.9}
          roughness={0.35}
          toneMapped={false}
        />
      </mesh>
      <mesh scale={1.08}>
        <sphereGeometry args={[radius, 18, 18]} />
        <meshStandardMaterial
          color="#b475ff"
          emissive="#b475ff"
          emissiveIntensity={1.2}
          toneMapped={false}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
      <pointLight intensity={0.9} distance={4.5} color="#b475ff" />
    </group>
  );
}

export default function BookshelfSkills() {
  // Larger palette so adjacent books have varied colors.
  const spineColors = [
    '#7b3f1c', '#5b3a26', '#a4632a', '#3a2418', '#5b3a90', '#2a4a3a',
    '#6b3a55', '#8b1538', '#1f3360', '#3d6b3a', '#9b4a2c', '#4a3260',
    '#b25b1f', '#2c5a8b', '#722f48', '#8a6c1d', '#3b6a4a', '#5e2a55',
  ];

  // Width in local X (becomes Z along the wall after rotation). Depth in local
  // Z (becomes X protruding from the wall).
  const W = 4.4;
  const H = 4.6;
  const D = 0.74;
  const SHELVES_Y = [0.35, 1.45, 2.55, 3.65];

  // Build a generous list of "books" — repeat skills until every shelf is
  // edge-to-edge full. With usableW=4.22 and avg width≈0.16, each shelf packs
  // ~24 books. We over-generate (140) so the greedy packer never runs out
  // before all four rows are stuffed.
  const books = useMemo(() => {
    const flat = [];
    skills.forEach((cat) => {
      cat.items.forEach((item) => flat.push(item));
    });
    const out = [];
    let idx = 0;
    const desired = 140;
    while (out.length < desired) {
      const item = flat[out.length % flat.length];
      out.push({
        label: item,
        color: spineColors[idx % spineColors.length],
        // Vary width a bit; keep the spread tight so spines pack neatly.
        width: 0.12 + ((idx * 7) % 6) * 0.012,
        // Vary height — tall, medium, short — to break up the row visually.
        height: 0.74 + ((idx * 11) % 6) * 0.06,
        tilt: ((idx % 5) - 2) * 0.01,
      });
      idx += 1;
    }
    return out;
  }, []);

  // Greedy layout: pack each shelf's bay with as many books as fit.
  // Stacked-book accents and the AI orb get reserved gaps so they never
  // collide with spines. Packer skips reserved x-ranges per shelf.
  const stacked = useMemo(
    () => [
      // x is the CENTER of the stack, w is the horizontal width it occupies.
      { x: 1.05, shelf: 0, w: 0.46, c1: '#7b3f1c', c2: '#3d6b3a' },
      { x: -1.35, shelf: 1, w: 0.5, c1: '#5b3a90', c2: '#a4632a' },
      { x: 1.4, shelf: 2, w: 0.46, c1: '#8a6c1d', c2: '#2c5a8b' },
    ],
    [],
  );

  const placedBooks = useMemo(() => {
    const placed = [];
    let cursorIdx = 0;
    const usableW = W - 0.18;
    // Reserved windows per shelf: stacks + AI orb on shelf 3 (top).
    const reserved = [[], [], [], []];
    stacked.forEach((s) => {
      reserved[s.shelf].push([s.x - s.w / 2 - 0.04, s.x + s.w / 2 + 0.04]);
    });
    // (The Research orb now sits on TOP of the bookshelf, not on shelf 3,
    // so the top shelf can be packed edge-to-edge with books.)

    const isReserved = (shelf, x0, x1) =>
      reserved[shelf].some(([r0, r1]) => !(x1 < r0 || x0 > r1));

    for (let shelf = 0; shelf < 4; shelf += 1) {
      let cursor = -usableW / 2;
      const shelfStop = usableW / 2;
      while (cursorIdx < books.length && cursor < shelfStop) {
        const b = books[cursorIdx];
        const x0 = cursor;
        const x1 = cursor + b.width + 0.012;
        if (x1 > shelfStop) break;
        if (isReserved(shelf, x0, x1)) {
          // Hop the cursor to just past the reserved window we collided with.
          const hit = reserved[shelf].find(
            ([r0, r1]) => !(x1 < r0 || x0 > r1),
          );
          cursor = hit[1] + 0.02;
          continue;
        }
        placed.push({ ...b, shelf, x: cursor + b.width / 2 });
        cursor = x1;
        cursorIdx += 1;
      }
    }
    return placed;
  }, [books, stacked]);

  // World position: back-left corner, against the left wall.
  // Rotated so the books face +X (into the room).
  const position = [ROOM.leftWallX + 0.45, 0, -7.0];
  const rotation = Math.PI / 2;

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <InteractiveZone id="skills" position={[0, 0, 0]} hoverScale={1.01}>
        {({ hovered }) => (
          <group>
            {/* Outer wooden case */}
            <mesh position={[0, H / 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[W, H, D]} />
              <meshStandardMaterial color="#3a2418" roughness={0.92} />
            </mesh>
            {/* Inset back panel */}
            <mesh position={[0, H / 2, -D / 2 + 0.012]}>
              <planeGeometry args={[W - 0.08, H - 0.08]} />
              <meshStandardMaterial color="#1a0e08" roughness={1} />
            </mesh>
            {/* Crown moulding */}
            <mesh position={[0, H + 0.05, 0]}>
              <boxGeometry args={[W + 0.16, 0.14, D + 0.16]} />
              <meshStandardMaterial color="#5b3a26" roughness={0.85} />
            </mesh>
            {/* Bottom plinth */}
            <mesh position={[0, 0.07, 0]}>
              <boxGeometry args={[W + 0.12, 0.14, D + 0.12]} />
              <meshStandardMaterial color="#5b3a26" roughness={0.85} />
            </mesh>
            {/* Side dividers */}
            {[-W / 2 + 0.03, W / 2 - 0.03].map((x) => (
              <mesh key={x} position={[x, H / 2, D / 2 - 0.02]}>
                <boxGeometry args={[0.06, H - 0.05, 0.08]} />
                <meshStandardMaterial color="#5b3a26" roughness={0.85} />
              </mesh>
            ))}
            {/* Horizontal shelves */}
            {SHELVES_Y.map((y) => (
              <mesh key={y} position={[0, y, 0.02]}>
                <boxGeometry args={[W - 0.08, 0.06, D - 0.06]} />
                <meshStandardMaterial color="#5b3a26" roughness={0.85} />
              </mesh>
            ))}

            {/* Books — each shelf packed full */}
            {placedBooks.map((b, i) => {
              const shelfY = SHELVES_Y[b.shelf];
              const bookY = shelfY + 0.03 + b.height / 2;
              return (
                <Book
                  key={b.label + i}
                  x={b.x}
                  y={bookY}
                  z={D / 6}
                  width={b.width}
                  height={b.height}
                  depth={D - 0.18}
                  color={b.color}
                  label={b.label}
                  tilt={b.tilt}
                />
              );
            })}

            {/* Decorative stacked-book accents */}
            {stacked.map((s, i) => (
              <StackedBooks
                key={i}
                x={s.x}
                y={SHELVES_Y[s.shelf] + 0.09}
                z={D / 6}
                width={s.w}
                color1={s.c1}
                color2={s.c2}
              />
            ))}

            {/* Header above the case */}
            <Text
              position={[0, H + 0.4, D / 2 + 0.02]}
              fontSize={0.24}
              color="#ffd6a5"
              anchorX="center"
              anchorY="middle"
            >
              Skills & Tools
            </Text>

            {hovered && (
              <mesh position={[0, H / 2, D / 2 + 0.03]}>
                <planeGeometry args={[W + 0.1, H + 0.1]} />
                <meshBasicMaterial color="#ffb56a" transparent opacity={0.06} />
              </mesh>
            )}
          </group>
        )}
      </InteractiveZone>

      {/* Research orb perched on the CROWN MOULDING — visible from across
          the cafe and clearly clickable to open the Research panel. */}
      <InteractiveZone
        id="aiResearch"
        position={[0, H + 0.18, 0]}
        hoverScale={1.08}
      >
        {() => (
          <group>
            {/* Pedestal that sits on the crown moulding */}
            <mesh position={[0, 0.05, 0]} castShadow>
              <cylinderGeometry args={[0.4, 0.45, 0.1, 28]} />
              <meshStandardMaterial color="#3a1f5a" emissive="#7b4dd6" emissiveIntensity={0.45} toneMapped={false} />
            </mesh>
            <AIShelfOrb radius={0.34} />
            <Text
              position={[0, 1.18, 0]}
              fontSize={0.22}
              color="#d6b4ff"
              outlineWidth={0.012}
              outlineColor="#0a0612"
              anchorX="center"
              anchorY="middle"
            >
              Research
            </Text>
          </group>
        )}
      </InteractiveZone>
    </group>
  );
}
